import Image from "next/image";
import Link from "next/link";
import { client } from "../../tools/sanity/client";
import { SanityDocument } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { MonitorXIcon } from "lucide-react";

const POSTS_QUERY = `*[
  _type == "post" && "featured" in tags[]->name && defined(slug.current)
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  image,
  publishedAt,
  tags,
  "authorName": author->name,
  "categoryTitle": category->title,
  summary
}`;
const options = { next: { revalidate: 30 } };

export async function FeaturedPosts() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const builder = ImageUrlBuilder(client);

  console.log(posts);

  if (!posts.length)
    return (
      <div
        className={`flex flex-col items-center justify-center py-16 text-center `}
      >
        <MonitorXIcon className="h-16 w-16 text-gray-400" />

        <h3 className="mt-6 text-xl font-light text-primary">
          No posts available at the moment.
        </h3>
        <p className="mt-2 max-w-md text-gray-500">
          We&apos;re working on creating new content. Please check back soon for
          updates.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/blog">Return to home</Link>

          <Link href="/#contact">Contact us</Link>
        </div>
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post._id}
          className="bg-black/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <Link href={`/blog/posts/${post?.slug.current}`} className="block">
            <div className="aspect-[16/9] overflow-hidden">
              {post?.image && (
                <Image
                  src={builder.image(post?.image).url()}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          </Link>
          <div className="p-6">
            <span className="text-xs text-primary uppercase tracking-wider">
              {post.categoryTitle}
            </span>
            <h3 className="text-lg font-medium  mt-2 mb-2 line-clamp-2">
              <Link
                href={`/blog/posts/${post?.slug.current}`}
                className=" transition-colors text-white hover:text-white/80"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-primary text-sm mb-4 line-clamp-2">
              {post.summary}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-white/70">{post.authorName}</span>{" "}
                <br />
                <span className="text-xs text-white/70">
                  {new Date(post?.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Link
                href={`/blog/posts/${post?.slug.current}`}
                className="text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                Read more
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
