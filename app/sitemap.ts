import { MetadataRoute } from "next";
import { client } from "../tools/sanity/client";

export const dynamic = "force-dynamic";

const query = `*[_type == "post"]{
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(query);
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: "https://yacine-ouardi.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://yacine-ouardi.com/blog",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://yacine-ouardi.com/blog/posts",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map(
    (post: { slug: string; _updatedAt?: string; publishedAt?: string }) => {
      const lastModified = post._updatedAt
        ? new Date(post._updatedAt)
        : post.publishedAt
          ? new Date(post.publishedAt)
          : now;

      const publishedDate = post.publishedAt ? new Date(post.publishedAt) : now;

      const daysSincePublished = Math.floor(
        (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        daysSincePublished < 30
          ? "weekly"
          : daysSincePublished < 90
            ? "monthly"
            : "yearly";

      return {
        url: `https://yacine-ouardi.com/blog/posts/${post.slug}`,
        lastModified,
        changeFrequency,
        priority: 0.7,
      };
    },
  );

  return [...staticUrls, ...postUrls];
}
