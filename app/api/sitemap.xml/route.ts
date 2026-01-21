import { client } from "../../../tools/sanity/client";

export const dynamic = "force-dynamic"; // Ensures no caching for fresh content

const query = `*[_type == "post"]{ "slug": slug.current, _updatedAt, publishedAt }`;

export async function GET() {
  const posts = await client.fetch(query);
  const now = new Date().toISOString().split("T")[0];

  const staticUrls = [
    {
      loc: "https://yacine-ouardi.com/",
      lastmod: now,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: "https://yacine-ouardi.com/blog",
      lastmod: now,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      loc: "https://yacine-ouardi.com/blog/posts",
      lastmod: now,
      changefreq: "daily",
      priority: "0.8",
    },
  ];

  const formatUrl = ({
    loc,
    lastmod,
    changefreq,
    priority,
  }: {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }) => `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;

  const staticUrlElements = staticUrls.map(formatUrl);

  const postUrls = posts.map(
    (post: { slug: string; _updatedAt: string; publishedAt: string }) => {
      const lastmod = post._updatedAt
        ? new Date(post._updatedAt).toISOString().split("T")[0]
        : post.publishedAt
          ? new Date(post.publishedAt).toISOString().split("T")[0]
          : now;

      // Determine change frequency based on how recent the post is
      const publishedDate = post.publishedAt
        ? new Date(post.publishedAt)
        : new Date();
      const daysSincePublished = Math.floor(
        (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const changefreq =
        daysSincePublished < 30
          ? "weekly"
          : daysSincePublished < 90
            ? "monthly"
            : "yearly";

      return formatUrl({
        loc: `https://yacine-ouardi.com/blog/posts/${post.slug}`,
        lastmod,
        changefreq,
        priority: "0.7",
      });
    }
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${staticUrlElements.join("\n")}
  ${postUrls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
