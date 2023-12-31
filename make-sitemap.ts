import { readFile, readdir, writeFile } from "node:fs/promises";
import * as path from "path";
import { markdownToHTML } from "./src/markdown";

interface PostMetadata {
  published: Date;
  link: string;
}

(async () => {
  const postListings = await readdir("./content/posts");
  const postListingsWithContent = await Promise.all(
    postListings.map(async (curr) => ({
      filename: curr,
      fileContent: await readFile(path.join("./content/posts", curr), "utf8"),
    })),
  );

  // Add non-blog pages initially
  const pages: PostMetadata[] = [
    {
      published: new Date(),
      link: "https://chrisshepherd.me/",
    },
    {
      published: new Date(),
      link: "https://chrisshepherd.me/about",
    },
    {
      published: new Date(),
      link: "https://chrisshepherd.me/posts",
    },
  ];

  for (const { fileContent, filename } of postListingsWithContent) {
    const htmlResult = await markdownToHTML(fileContent);

    if (!htmlResult.ok) {
      throw new Error(`Failed to convert ${filename} to HTML`, {
        cause: htmlResult.error,
      });
    }

    if (typeof htmlResult.data.published !== "string") {
      throw new Error(`Missing published date in ${filename}`);
    }

    pages.push({
      link: `https://chrisshepherd.me/posts/${filename.replace(/\.md$/, "")}`,
      published: new Date(htmlResult.data.published),
    });
  }

  pages.sort((a, b) => a.link.localeCompare(b.link));

  const xml = /* XML */ `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
          <url>
            <loc>${page.link}</loc>
            <lastmod>${page.published.toISOString().split("T")[0]}</lastmod>
          </url>
      `,
        )
        .join("")}
  </urlset>`.trim();

  await writeFile("./out/sitemap.xml", xml);
})();
