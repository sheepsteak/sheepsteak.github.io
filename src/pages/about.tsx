// import { GetStaticPaths, GetStaticProps } from "next";
import fm from "front-matter";
import { promises } from "fs";
import { highlightAuto } from "highlight.js";
import marked from "marked";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { Content } from "../components/content";
import { Layout } from "../components/layout";

interface PostMetadata {
  title: string;
}

export const getStaticProps = async () => {
  const fileContent = await promises.readFile(
    "./content/pages/about.md",
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
      title: attributes.title,
    },
  };
};

const Post = ({
  content,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title={title}>
    <Head>
      <title>{`Chris Shepherd - ${title}`}</title>
    </Head>

    <Content>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </Content>
  </Layout>
);

export default Post;
