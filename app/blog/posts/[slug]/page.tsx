import { Suspense } from "react";
import { SanityImageAssetDocument, type SanityDocument } from "next-sanity";
import { client } from "../../../../tools/sanity/client";
import { PostType } from "../../../../constants/types";
import ShareModal from "../../../../components/post/share-modal";
import Breadcrumbs from "../../../../components/post/breadcrumbs";
import ReadingProgressBar from "../../../../components/post/reading-progressbar";
import RelatedPostsSidebar from "../../../../components/blog/related-articles";
import { Metadata } from "next";
import CommentsList from "../../../../components/post/comments-list";
import AddComment from "../../../../components/post/add-comment";
import PostHeader from "../../../../components/post/post-header";
import PostContent from "../../../../components/post/post-content";
import ImageUrlBuilder from "@sanity/image-url";
import HomeLoader from "../../../../components/general/loader";

const POST_QUERY = `*[_type == "post" && slug.current == $postSlug][0]{...,"authorName":author->name,"categoryTitle":category->name}`;
const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ slug: string }>;
};

async function fetchPost(slug: string): Promise<SanityDocument<PostType>> {
  return client.fetch<SanityDocument<PostType>>(
    POST_QUERY,
    { postSlug: slug },
    options
  );
}

function buildImageUrl(image: SanityImageAssetDocument): string {
  const builder = ImageUrlBuilder(client);
  return builder.image(image).url();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  const imageUrl = buildImageUrl(post?.image);

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
          url: imageUrl || "https://yacine-ouardi.vercel.app/me.png",
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
      images: [post.image || "https://yacine-ouardi.vercel.app/me.png"],
    },
    robots: "index, follow",
    authors: {
      url: "https://yacine-ouardi.vercel.app/",
      name: "Yacine Ouardi",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<HomeLoader />}>
      <PostContentWrapper slug={slug} />
    </Suspense>
  );
}

async function PostContentWrapper({ slug }: { slug: string }) {
  const post = await fetchPost(slug);
  const imageUrl = buildImageUrl(post?.image);
  const url = `${process.env.BASE_URL}blog/posts/${slug}`;

  return (
    <>
      <ShareModal title={post.title} url={url} />
      <ReadingProgressBar />
      <main className="container relative min-h-screen max-w-3xl p-6 lg:py-24">
        <Breadcrumbs />
        <div className="flex flex-col lg:flex-row w-full bg-primary/10 hue">
          <article className="flex flex-col py-16 gap-6 w-full p-3 md:p-6 rounded">
            <div className="prose prose-lg prose-invert mx-auto">
              <PostHeader post={post} url={url} />
              <PostContent post={post} imageUrl={imageUrl} />
            </div>
            <PostComments postId={post._id} />
          </article>
          <RelatedPostsSidebar
            currentSlug={post.slug.current}
            category={post.categoryTitle}
          />
        </div>
      </main>
    </>
  );
}

function PostComments({ postId }: { postId: string }) {
  return (
    <section className=" pt-8 border-t  border-gray-800">
      <div className="bg-primary/5 border border-gray-800 rounded-lg p-6">
        <CommentsList postId={postId} />
        <AddComment postId={postId} />
      </div>
    </section>
  );
}
