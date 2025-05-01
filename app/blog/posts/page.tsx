import { type SanityDocument } from "next-sanity";
import { client } from "../../../tools/sanity/client";
import Link from "next/link";
import { CategoryFilter } from "../../../components/category-filter";
import { MonitorXIcon } from "lucide-react";
import PostsPagination from "../../../components/posts-pagination";
import { PAGE_SIZE } from "../../../constants/fetch";
import Post from "../../../components/post";
import { PostType } from "../../../constants/types";
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
  const posts = await client.fetch<SanityDocument<PostType>[]>(
    POSTS_QUERY,
    {},
    options
  );
  const categories = await client.fetch<SanityDocument<{ name: string }>[]>(
    CATEGORIES_QUERY,
    {},
    options
  );

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
        {posts[0] && <Post post={posts[0]} withImage />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-12">
          {posts
            .filter((_, i) => i > 0)
            .map((post) => (
              <Post key={`posts-${post.slug.current}`} post={post} />
            ))}
        </div>
      </ul>
      <div className="ms-auto w-fit">
        <PostsPagination category={category} currentPage={pageNum} />
      </div>
    </main>
  );
}
