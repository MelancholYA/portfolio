import { PortableText, type SanityDocument } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../tools/sanity/client";
import CodeBlock from "../../../../components/code-block";
import Image from "next/image";
import { PostType } from "../../../../constants/types";
import ShareModal from "../../../../components/share-modal";
import Link from "next/link";
import { Share2 } from "lucide-react";
import Breadcrumbs from "../../../../components/breadcrumbs";
import ReadingProgressBar from "../../../../components/reading-progressbar";
import RelatedPostsSidebar from "../../../../components/related-articles";
import { Metadata } from "next";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{...,"authorName":author->name,"categoryTitle":category->name}`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const post = await client.fetch<SanityDocument<PostType>>(
    POST_QUERY,
    await params,
    options
  );

  return {
    title: `${post.title} - Yacine Ouardi | Blog`,
    description:
      post.summary ||
      "Read this blog post on web development, career growth, and more.",
    keywords: [
      "Frontend Development",
      "React",
      "TypeScript",
      "Web Development",
      "Career Growth",
      "Tech Trends",
    ],
    openGraph: {
      title: `${post.title} - Yacine Ouardi`,
      description:
        post.summary ||
        "Read this blog post on web development, career growth, and more.",
      url: `https://yacine-ouardi.vercel.app/blog/${post.slug.current}`,
      siteName: "Yacine Ouardi Blog",
      images: [
        {
          url:
            post.image || "https://yacine-ouardi.vercel.app/default-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Yacine Ouardi`,
      description:
        post.summary ||
        "Read this blog post on web development, career growth, and more.",
      images: [
        post.image || "https://yacine-ouardi.vercel.app/default-image.png",
      ],
    },
    robots: "index, follow",
    authors: {
      url: "https://yacine-ouardi.vercel.app/",
      name: "Yacine Ouardi",
    },
  };
}

// export const metadata = (post: {
//   title: string;
//   summary: string;
//   slug: { current: string };
//   image: string;
// }): Metadata => ({
//   title: `${post.title} - Yacine Ouardi | Blog`,
//   description:
//     post.summary ||
//     "Read this blog post on web development, career growth, and more.",
//   keywords: [
//     "Frontend Development",
//     "React",
//     "TypeScript",
//     "Web Development",
//     "Career Growth",
//     "Tech Trends",
//   ],
//   openGraph: {
//     title: `${post.title} - Yacine Ouardi`,
//     description:
//       post.summary ||
//       "Read this blog post on web development, career growth, and more.",
//     url: `https://yacine-ouardi.vercel.app/blog/${post.slug.current}`,
//     siteName: "Yacine Ouardi Blog",
//     images: [
//       {
//         url: post.image || "https://yacine-ouardi.vercel.app/default-image.png",
//         width: 1200,
//         height: 630,
//         alt: post.title,
//       },
//     ],
//     type: "article",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${post.title} - Yacine Ouardi`,
//     description:
//       post.summary ||
//       "Read this blog post on web development, career growth, and more.",
//     images: [
//       post.image || "https://yacine-ouardi.vercel.app/default-image.png",
//     ],
//   },
//   robots: "index, follow",
//   authors: {
//     url: "https://yacine-ouardi.vercel.app/",
//     name: "Yacine Ouardi",
//   },
// });

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument<PostType>>(
    POST_QUERY,
    await params,
    options
  );

  const builder = ImageUrlBuilder(client);

  const url = `${process.env.BASE_URL}blog/posts/${(await params).slug}`;

  return (
    <>
      <ShareModal title={post.title} url={url} />
      <ReadingProgressBar />
      <main className="container relative  min-h-screen max-w-3xl p-6 lg:py-24">
        <Breadcrumbs />
        <div className="flex flex-col lg:flex-row w-full bg-primary/10 hue">
          <article className="flex flex-col py-16 gap-6  w-full p-3 md:p-6 rounded ">
            <div className="prose prose-lg  prose-invert mx-auto">
              <header className="mb-8">
                <h1 className=" mb-4 text-4xl text-center">{post.title}</h1>

                <div className="flex items-center justify-between border-y-[1px] py-2 border-primary/20 px-4 my-8 w-full">
                  <div>
                    <time
                      dateTime={post.publishedAt}
                      className="block text-primary text-sm"
                    >
                      Published:{" "}
                      {new Date(post?.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <p className=" text-primary text-sm my-0">
                      {post.authorName}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Link
                      href={`${url}?share=true`}
                      className="inline-flex items-center no-underline px-3 py-1.5 text-sm border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Link>
                  </div>
                </div>
              </header>
              <div className="">
                {post?.image && (
                  <figure>
                    <Image
                      src={builder.image(post?.image).url()}
                      alt={`Cover image for ${post.title}`}
                      className="aspect-video rounded-xl w-full"
                      width={550}
                      height={310}
                    />
                  </figure>
                )}

                <section className="mt-16">
                  {Array.isArray(post.body) && (
                    <PortableText
                      value={post.body}
                      components={{
                        types: {
                          code: ({ value }) => (
                            <CodeBlock
                              language={value.language}
                              code={value.code}
                            />
                          ),
                        },
                      }}
                    />
                  )}
                </section>
              </div>
            </div>
          </article>
          <div className="max-w-sm">
            <RelatedPostsSidebar
              currentSlug={post.slug.current}
              category={post.categoryTitle}
            />
          </div>
        </div>
      </main>
    </>
  );
}
