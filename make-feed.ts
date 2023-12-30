import { promises } from "fs";
import * as path from "path";
import { markdownToHTML } from "./src/markdown";

interface Post {
  published: string;
  title: string;
}

interface PostMetadata {
  published: Date;
  title: string;
}

(async () => {
  const postListings = await promises.readdir("./content/posts");
  const postListingsWithContent = await Promise.all(
    postListings.map(async (curr) => ({
      filename: curr,
      fileContent: await promises.readFile(
        path.join("./content/posts", curr),
        "utf8",
      ),
    })),
  );

  const postsWithMetadata: [string, PostMetadata][] = [];

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

    if (typeof htmlResult.data.title !== "string") {
      throw new Error(`Missing title in ${filename}`);
    }

    postsWithMetadata.push([
      filename.replace(/\.md$/, ""),
      {
        published: new Date(htmlResult.data.published),
        title: htmlResult.data.title,
      },
    ]);
  }

  postsWithMetadata.sort(
    (a, b) => b[1].published.getTime() - a[1].published.getTime(),
  );

  const preparedPosts = postsWithMetadata.map<[string, Post]>((p) => [
    p[0],
    {
      ...p[1],
      published: p[1].published.toISOString(),
    },
  ]);

  const xml = `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Chris Shepherd's Blog</title>
        <link>https://chrisshepherd.me</link>
        <description>I'm a software engineer from the UK writing about React, Node.js,
        gaming, and the web.</description>
        <language>en-GB</language>
        <pubDate>${new Date(
          preparedPosts[0][1].published,
        ).toUTCString()}</pubDate>
        <lastBuildDate>${new Date(
          preparedPosts[0][1].published,
        ).toUTCString()}</lastBuildDate>
        ${preparedPosts
          .map(
            (post) => `
            <item>
              <title>${post[1].title}</title>
              <link>https://chrisshepherd.me/posts/${post[0]}</link>
              <pubDate>${new Date(post[1].published).toUTCString()}</pubDate>
              <guid isPermaLink="true">https://chrisshepherd.me/posts/${
                post[0]
              }</guid>
            </item>
        `,
          )
          .join("")}
    </channel>
  </rss>`;

  await promises.mkdir("./out/feed");
  await promises.writeFile("./out/feed/index.xml", xml);
})();
