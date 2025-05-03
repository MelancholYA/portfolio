// pages/api/sitemap.xml.ts (or /app/sitemap.xml/route.ts in App Router)

import { client } from "../../../tools/sanity/client";

const query = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`;

export async function GET() {
  const posts = await client.fetch(query);

  const urls = posts
    .map(
      (post: { slug: string; _updatedAt: string }) => `
      <url>
        <loc>https://yacine-ouardi.vercel.app/blog/${post.slug}</loc>
        <lastmod>${post._updatedAt.split("T")[0]}</lastmod>
        <priority>0.8</priority>
      </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://yacine-ouardi.vercel.app/</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
