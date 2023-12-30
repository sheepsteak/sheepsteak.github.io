import { promises } from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import Head from "next/head";
import type { FC } from "react";
import { Content } from "../components/content";
import { Layout } from "../components/layout";
import { PostTile } from "../components/post-tile";
import { markdownToHTML } from "../markdown";

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

  const preparedPosts = postsWithMetadata
    .slice(0, 5)
    .map<[string, Post]>((p) => [
      p[0],
      {
        ...p[1],
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
  <Layout
    subtitle={
      <p className="text-xl">
        {
          "I'm a software engineer from the UK writing about React, Node.js, gaming, and the web."
        }
      </p>
    }
    title="Hi! I'm Chris.">
    <Head>
      <title>Chris Shepherd - Home</title>
    </Head>
    <Content>
      <h2 className="text-balance text-4xl font-bold md:text-5xl xl:text-6xl">
        Recent posts
      </h2>
      <ul className="mt-8 space-y-8 md:mt-16">
        {posts.map(([slug, metadata]) => (
          <li key={slug}>
            <PostTile
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
