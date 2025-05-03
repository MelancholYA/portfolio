import Image from "next/image";
import Link from "next/link";
import { client } from "../tools/sanity/client";
import { SanityDocument } from "next-sanity";
import { PostType } from "../constants/types";
import ImageUrlBuilder from "@sanity/image-url";

interface RelatedPostsSidebarProps {
  category: string;
  currentSlug: string;
}

const options = { next: { revalidate: 30 } };

export default async function RelatedPostsSidebar({
  category,
  currentSlug,
}: RelatedPostsSidebarProps) {
  const POSTS_QUERY = `*[
        _type == "post" ${category ? `&& category->name == "${category}"` : ""}
        && defined(slug.current) && slug.current != "${currentSlug}"
      ]|order(publishedAt desc)[0...5]{_id, title, slug,image, publishedAt,"authorName":author->name, "categoryTitle": category->name,summary}`;

  const posts = await client.fetch<SanityDocument<PostType>[]>(
    POSTS_QUERY,
    {},
    options
  );

  const builder = ImageUrlBuilder(client);

  if (!posts.length) return null;

  return (
    <aside className="w-full lg:self-start lg:p-6 py-12">
      <div className="bg-primary/10   border-s-2  border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
          Related Articles
        </h2>
        <div className="space-y-6 ">
          {posts.map((post) => (
            <div
              key={post.slug.current}
              className="group pb-2 border-b border-gray-800"
            >
              <Link href={post.slug.current} className="block">
                <div className="mb-3 overflow-hidden rounded-md">
                  <Image
                    src={builder.image(post?.image).url()}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="whitespace-nowrap w-fit rounded-full text-xs bg-primary/20 text-white p-1 px-3 border-[1px] hue my-2 block border-primary">
                  {post.categoryTitle}
                </span>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {post.summary}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {" "}
                  {new Date(post?.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
