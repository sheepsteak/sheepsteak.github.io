import { promises } from "fs";
import type { ParsedUrlQuery } from "node:querystring";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import type { FC } from "react";
import { Content } from "../../components/content";
import { Layout } from "../../components/layout";
import { Prose } from "../../components/prose";
import { markdownToHTML } from "../../markdown";

interface UrlQuery extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  content: string;
  published: string;
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

  const htmlResult = await markdownToHTML(fileContent);

  if (!htmlResult.ok) {
    throw new Error(`Failed to convert ${params!.slug}.md to HTML`, {
      cause: htmlResult.error,
    });
  }

  if (typeof htmlResult.data.published !== "string") {
    throw new Error(`Missing published date in ${params!.slug}.md`);
  }

  if (typeof htmlResult.data.title !== "string") {
    throw new Error(`Missing title in ${params!.slug}.md`);
  }

  return {
    props: {
      content: htmlResult.html,
      published: new Date(htmlResult.data.published).toISOString(),
      title: htmlResult.data.title,
    },
  };
};

const Post: FC<Props> = ({ content, published, title }) => (
  <Layout
    subtitle={
      <p className="font-bold uppercase max-md:text-sm">
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
      <Prose>{content}</Prose>
    </Content>
  </Layout>
);

export default Post;
