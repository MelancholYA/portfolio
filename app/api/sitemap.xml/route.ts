import { client } from "../../../tools/sanity/client";

export const dynamic = "force-dynamic"; // 👈 Ensures no caching

const query = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`;

export async function GET() {
  const posts = await client.fetch(query);

  const staticUrls = [
    `
    <url>
      <loc>https://yacine-ouardi.com/</loc>
      <lastmod>${new Date("01/02/2025").toISOString().split("T")[0]}</lastmod>
      <priority>1.0</priority>
    </url>`,
    `
    <url>
      <loc>https://yacine-ouardi.com/blog</loc>
      <lastmod>${new Date("01/01/2025").toISOString().split("T")[0]}</lastmod>
      <priority>0.9</priority>
    </url>`,
    `
    <url>
      <loc>https://yacine-ouardi.com/blog/posts</loc>
      <lastmod>${new Date("01/02/2025").toISOString().split("T")[0]}</lastmod>
      <priority>0.8</priority>
    </url>`,
  ];

  const postUrls = posts.map(
    (post: { slug: string; _updatedAt: string }) => `
    <url>
      <loc>https://yacine-ouardi.com/blog/posts/${post.slug}</loc>
      <lastmod>${post._updatedAt.split("T")[0]}</lastmod>
      <priority>0.8</priority>
    </url>
  `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    ${staticUrls.join("\n")}
    ${postUrls.join("\n")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
