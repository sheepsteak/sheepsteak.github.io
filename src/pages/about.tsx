import { promises } from "fs";
import type { GetStaticProps } from "next";
import Head from "next/head";
import type { FC } from "react";
import { Content } from "../components/content";
import { Layout } from "../components/layout";
import { Prose } from "../components/prose";
import { markdownToHTML } from "../markdown";

interface Props {
  content: string;
  title: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fileContent = await promises.readFile(
    "./content/pages/about.md",
    "utf8",
  );

  const htmlResult = await markdownToHTML(fileContent);

  if (!htmlResult.ok) {
    throw new Error(`Failed to convert about.md to HTML`, {
      cause: htmlResult.error,
    });
  }

  if (typeof htmlResult.data.title !== "string") {
    throw new Error(`Missing title in about.md`);
  }

  return {
    props: {
      content: htmlResult.html,
      title: htmlResult.data.title,
    },
  };
};

const Post: FC<Props> = ({ content, title }) => (
  <Layout title={title}>
    <Head>
      <title>{`Chris Shepherd - ${title}`}</title>
    </Head>

    <Content>
      <Prose>{content}</Prose>
    </Content>
  </Layout>
);

export default Post;
