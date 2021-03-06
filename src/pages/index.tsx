// import { GetStaticPaths, GetStaticProps } from "next";
import fm from "front-matter";
import { promises } from "fs";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import path from "path";
import React from "react";
import { Content } from "../components/content";
import { Layout } from "../components/layout";
import { PostTile } from "../components/post-tile";
import styles from "./index.module.css";

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

  const preparedPosts = postsWithMetadata.slice(0, 5).map<[string, Post]>(p => [
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

const Post = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout
    subtitle={
      <p className={styles.subtitle}>
        I'm a software engineer from the UK writing about React, Node.js,
        gaming, and the web.
      </p>
    }
    title="Hi! I'm Chris.">
    <Head>
      <title>Chris Shepherd - Home</title>
    </Head>
    <Content>
      <ul className={styles.postList}>
        {posts.map(([slug, metadata]) => (
          <li className={styles.postItem}>
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
