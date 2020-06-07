import fm from "front-matter";
import { promises } from "fs";
import * as path from "path";

interface Post {
  published: string;
  title: string;
}

interface Props {
  posts: [string, Post][];
}

interface PostMetadata {
  published: Date;
  title: string;
}

(async () => {
  const postListings = await promises.readdir("./content/posts");
  const postListingsWithContent = await Promise.all(
    postListings.map(async curr => ({
      filename: curr,
      fileContent: await promises.readFile(
        path.join("./content/posts", curr),
        "utf8",
      ),
    })),
  );

  const postsWithMetadata = postListingsWithContent
    .reduce<[string, PostMetadata][]>((prev, { fileContent, filename }) => {
      const { attributes } = fm<PostMetadata>(fileContent);

      return [...prev, [filename.replace(/\.md$/, ""), attributes]];
    }, [])
    .sort((a, b) => b[1].published.getTime() - a[1].published.getTime());

  const preparedPosts = postsWithMetadata.map<[string, Post]>(p => [
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
            post => `
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
