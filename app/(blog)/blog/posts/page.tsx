import { type SanityDocument } from "next-sanity";
import { client } from "../../../../tools/sanity/client";
import { PAGE_SIZE } from "../../../../constants/fetch";
import { PostType } from "../../../../constants/types";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoryFilter = dynamic(
  () => import("../../../../components/blog/category-filter"),
  { ssr: true }
);
const NoPostsAvailable = dynamic(
  () =>
    import("../../../../components/blog/not-available").then(
      (mod) => mod.default
    ),
  { ssr: true }
);
const PostsList = dynamic(
  () =>
    import("../../../../components/blog/posts-list").then((mod) => mod.default),
  { ssr: true }
);
const PostsPagination = dynamic(
  () =>
    import("../../../../components/blog/posts-pagination").then(
      (mod) => mod.default
    ),
  { ssr: true }
);

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const CATEGORIES_QUERY = `*[
  _type == "category"
]|order(publishedAt desc)[0...12]{name}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title:
    "Yacine Ouardi | All Blog Posts | Frontend Development, Career Growth, and More",
  description:
    "Browse all my blog posts on topics like frontend development, career tips, personal branding, and the latest trends in tech.",
  keywords: [
    "Frontend Development",
    "React",
    "TypeScript",
    "Career Growth",
    "Personal Branding",
    "Web Development",
    "Tech Trends",
    "All Blog Posts",
  ],
  openGraph: {
    title: "Yacine Ouardi | All Blog Posts",
    description:
      "Browse all my blog posts on topics like frontend development, career tips, personal branding, and the latest trends in tech.",
    url: "https://yacine-ouardi.vercel.app/blog/posts",
    siteName: "Yacine Ouardi Blog",
    images: [
      {
        url: "https://yacine-ouardi.vercel.app/me.png",
        width: 1200,
        height: 630,
        alt: "All Blog Posts - Yacine Ouardi",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacine Ouardi | All Blog Posts",
    description:
      "Browse all my blog posts on topics like frontend development, career tips, personal branding, and the latest trends in tech.",
    images: ["https://yacine-ouardi.vercel.app/me.png"],
  },
  robots: "index, follow",
  authors: {
    url: "https://yacine-ouardi.vercel.app/",
    name: "Yacine Ouardi",
  },
};

async function fetchPosts(
  category: string | undefined,
  start: number,
  end: number
) {
  const POSTS_QUERY = `*[
    _type == "post" ${category ? `&& category->name == "${category}"` : ""}
    && defined(slug.current) 
  ]|order(publishedAt desc)[${start}...${end}]{_id, title, slug, image, publishedAt, "authorName": author->name, "categoryTitle": category->name, summary}`;

  return client.fetch<SanityDocument<PostType>[]>(POSTS_QUERY, {}, options);
}

async function fetchCategories() {
  return client.fetch<SanityDocument<{ name: string }>[]>(
    CATEGORIES_QUERY,
    {},
    options
  );
}

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
  const end = start + PAGE_SIZE;

  const [posts, categories] = await Promise.all([
    fetchPosts(category, start, end),
    fetchCategories(),
  ]);

  console.log({ posts });

  return (
    <main className="container md:pt-32 pt-12 pb-6 mx-auto min-h-screen max-w-3xl">
      <header className="flex items-center justify-between flex-wrap">
        <h1 className="text-4xl font-bold md:mb-3 mb-7 text-white/80">
          All Articles
        </h1>
        <Suspense
          fallback={
            <div className="h-8 rounded-full bg-gradient-to-l from-primary/60 animate-pulse to-white/60 w-72" />
          }
        >
          <CategoryFilter categories={categories} />
        </Suspense>
      </header>

      <Suspense
        fallback={
          <div className="w-full bg-gradient-to-l from-primary/60 animate-pulse to-white/60 h-[70vh] my-6 rounded"></div>
        }
      >
        {!posts.length ? <NoPostsAvailable /> : <PostsList posts={posts} />}
      </Suspense>

      <div className="ms-auto w-fit">
        <Suspense fallback={<div>Loading ...</div>}>
          <PostsPagination category={category} currentPage={pageNum} />
        </Suspense>
      </div>
    </main>
  );
}
