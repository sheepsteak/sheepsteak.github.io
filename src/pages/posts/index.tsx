import { promises } from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import Head from "next/head";
import type { FC } from "react";
import { Content } from "../../components/content";
import { Layout } from "../../components/layout";
import { PostTile } from "../../components/post-tile";
import { markdownToHTML } from "../../markdown";

interface Post {
  intro: string | null;
  published: string;
  title: string;
}

interface PostMetadata {
  intro: string | null;
  published: Date;
  title: string;
}

interface Props {
  posts: [string, Post][];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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

    if (
      htmlResult.data.intro != null &&
      typeof htmlResult.data.intro !== "string"
    ) {
      throw new Error(`Missing intro in ${filename}`);
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
        intro: htmlResult.data.intro ?? null,
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
      intro: p[1].intro ?? null,
      published: p[1].published.toISOString(),
    },
  ]);

  return {
    props: {
      posts: preparedPosts,
    },
  };
};

const Post: FC<Props> = ({ posts }) => (
  <Layout title="Posts">
    <Head>
      <title>Chris Shepherd - Home</title>
    </Head>
    <Content>
      <ul className="space-y-8">
        {posts.map(([slug, metadata]) => (
          <li key={slug}>
            <PostTile
              intro={metadata.intro}
              published={metadata.published}
              slug={slug}
              title={metadata.title}
            />
          </li>
        ))}
      </ul>
    </Content>
  </Layout>
);

export default Post;
