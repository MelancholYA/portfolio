import { type SanityDocument } from "next-sanity";
import { client } from "../../../tools/sanity/client";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { CategoryFilter } from "../../../components/category-filter";
import { MonitorXIcon } from "lucide-react";
import PostsPagination from "../../../components/posts-pagination";
import { PAGE_SIZE } from "../../../constants/fetch";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const CATEGORIES_QUERY = `*[
  _type == "category"
]|order(publishedAt desc)[0...12]{name}`;

const options = { next: { revalidate: 30 } };

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, page } = (await searchParams) as {
    category: string | undefined;
    page: string | undefined;
  };
  const pageNum = parseInt(page || "1");
  const start = (pageNum - 1) * PAGE_SIZE;
  const end = pageNum + PAGE_SIZE;

  const POSTS_QUERY = `*[
  _type == "post" ${category ? `&& category->name == "${category}"` : ""}
  && defined(slug.current) 
]|order(publishedAt desc)[${start}...${end}]{_id, title, slug,image, publishedAt,"authorName":author->name, "categoryTitle": category->name,summary}`;

  console.log(POSTS_QUERY);
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const categories = await client.fetch<SanityDocument<{ name: string }>[]>(
    CATEGORIES_QUERY,
    {},
    options
  );

  const builder = ImageUrlBuilder(client);

  return (
    <main className="container pt-32 pb-6 mx-auto min-h-screen max-w-3xl ">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-4xl font-bold mb-3 text-white/80">All Articles</h1>
        <CategoryFilter categories={categories} />
      </div>
      {!posts.length && (
        <div
          className={`flex min-h-96 py-32 flex-col items-center justify-center  text-center `}
        >
          <MonitorXIcon className="h-16 w-16 text-gray-400" />

          <h3 className="mt-6 text-xl font-light text-primary">
            No posts available at the moment.
          </h3>
          <p className="mt-2 max-w-md text-gray-500">
            We&apos;re working on creating new content. Please check back soon
            for updates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/blog">Return to home</Link>

            <Link href="/#contact">Contact us</Link>
          </div>
        </div>
      )}
      <ul className="flex flex-col gap-y-4 list-none my-8">
        {posts[0] && (
          <li className="list-none hue p-6 rounded bg-primary/40 flex items-center justify-between">
            <div className="">
              <span className="p-1 px-4 capitalize bg-primary/40 text-pretty rounded-full">
                {posts[0]?.categoryTitle}
              </span>
              <div className="px-1">
                <h3 className="font-semibold capitalize my-4">
                  {posts[0]?.title}
                </h3>
                <p>{posts[0]?.summary}</p>
                <Link
                  className="mt-2 block"
                  href={`/blog/posts/${posts[0]?.slug.current}`}
                >
                  {" "}
                  Read full article{" "}
                </Link>
                <p className="md:mt-16 mt-4">
                  {posts[0]?.authorName} <br />
                  {new Date(posts[0]?.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            {posts[0]?.image && (
              <Image
                alt="alternative"
                className="w-5/12 h-auto object-cover md:block hidden"
                width={200}
                height={200}
                src={builder.image(posts[0]?.image).url()}
              />
            )}
          </li>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-12">
          {posts
            .filter((_, i) => i > 0)
            .map((post) => (
              <li
                key={`posts-${post.slug.current}`}
                className="list-none hue  p-6 rounded bg-primary/40 flex items-start justify-start"
              >
                <div className="">
                  <span className="p-1 px-4 capitalize bg-primary/40 text-pretty rounded-full">
                    {" "}
                    {post?.categoryTitle}
                  </span>
                  <div className="px-1">
                    <h3 className="font-semibold capitalize my-4">
                      {post?.title}
                    </h3>
                    <p>{post?.summary}</p>
                    <Link
                      className="mt-2 block"
                      href={`/blog/posts/${post?.slug.current}`}
                    >
                      {" "}
                      Read full article{" "}
                    </Link>
                    <p className="md:mt-16 mt-4">
                      {post?.authorName} <br />
                      {new Date(post?.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))}{" "}
        </div>
      </ul>
      <div className="ms-auto w-fit">
        <PostsPagination category={category} currentPage={pageNum} />
      </div>
    </main>
  );
}
