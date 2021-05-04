import fm from "front-matter";
import { promises } from "fs";
import { highlightAuto } from "highlight.js";
import marked from "marked";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import React, { VFC } from "react";
import { Content } from "../../components/content";
import { Layout } from "../../components/layout";
import styles from "./[slug].module.css";

type UrlQuery = {
  slug: string;
};

interface Props {
  content: string;
  published: string;
  title: string;
}

interface PostMetadata {
  published: Date;
  title: string;
}

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const posts = await promises.readdir("./content/posts");

  return {
    fallback: false,
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.md$/, ""),
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<Props, UrlQuery> = async ({
  params,
}) => {
  const fileContent = await promises.readFile(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    path.join("./content/posts", `${params!.slug}.md`),
    "utf8",
  );

  const { attributes, body } = fm<PostMetadata>(fileContent);
  const content = marked(body, {
    gfm: true,
    highlight: (code, lang) => highlightAuto(code, [lang]).value,
    langPrefix: "hljs ",
  });

  return {
    props: {
      content,
      published: attributes.published.toISOString(),
      title: attributes.title,
    },
  };
};

const Post: VFC<Props> = ({ content, published, title }) => (
  <Layout
    subtitle={
      <p className={styles.subtitle}>
        <time dateTime={published}>
          {new Date(published).toLocaleDateString("en-gb", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </p>
    }
    title={title}>
    <Head>
      <title>{`Chris Shepherd - ${title}`}</title>
    </Head>

    <Content>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </Content>
  </Layout>
);

export default Post;
