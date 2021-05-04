import fm from "front-matter";
import { promises } from "fs";
import { GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import React, { VFC } from "react";
import { Content } from "../../components/content";
import { Layout } from "../../components/layout";
import { PostTile } from "../../components/post-tile";
import styles from "./index.module.css";

interface Post {
  published: string;
  title: string;
}

interface PostMetadata {
  published: Date;
  title: string;
}

type Props = {
  posts: [string, Post][];
};

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

  const postsWithMetadata = postListingsWithContent
    .reduce<[string, PostMetadata][]>((prev, { fileContent, filename }) => {
      const { attributes } = fm<PostMetadata>(fileContent);

      return [...prev, [filename.replace(/\.md$/, ""), attributes]];
    }, [])
    .sort((a, b) => b[1].published.getTime() - a[1].published.getTime());

  const preparedPosts = postsWithMetadata.map<[string, Post]>((p) => [
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

const Post: VFC<Props> = ({ posts }) => (
  <Layout title="Posts">
    <Head>
      <title>Chris Shepherd - Home</title>
    </Head>
    <Content>
      <ul className={styles.postList}>
        {posts.map(([slug, metadata]) => (
          <li className={styles.postItem} key={slug}>
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
