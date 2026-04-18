import { MetadataRoute } from "next";
import { client } from "../tools/sanity/client";

const query = `*[_type == "post"]{
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`;

type Post = {
  slug: string;
  _updatedAt?: string;
  publishedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: Post[] = await client.fetch(query);
  const now = new Date();

  // ✅ Deduplicate by slug
  const uniquePosts: Post[] = Array.from(
    new Map(posts.map((p) => [p.slug, p])).values(),
  );

  // ✅ Static pages (only real, valuable ones)
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: "https://yacine-ouardi.com/",
      lastModified: now,
    },
    {
      url: "https://yacine-ouardi.com/blog",
      lastModified: now,
    },
    {
      url: "https://yacine-ouardi.com/blog/posts",
      lastModified: now,
    },
  ];

  // ✅ Blog posts
  const postUrls: MetadataRoute.Sitemap = uniquePosts.map((post) => {
    const rawDate = post._updatedAt || post.publishedAt || now.toISOString();

    let lastModified = new Date(rawDate);

    // ✅ Prevent future dates
    if (lastModified > now) {
      lastModified = now;
    }

    return {
      url: `https://yacine-ouardi.com/blog/posts/${post.slug}`,
      lastModified,
    };
  });

  return [...staticUrls, ...postUrls];
}
