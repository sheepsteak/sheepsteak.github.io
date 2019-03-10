import fs from "fs-extra";
import path from "path";
import grayMatter from "gray-matter";
import { Post, PostFrontMatter } from "./types";

const sortByPublishedDesc = (a: Post, b: Post): number => {
  if (a.published.valueOf() < b.published.valueOf()) {
    return 1;
  }
  if (a.published.valueOf() > b.published.valueOf()) {
    return -1;
  }

  return 0;
};

export default async (postsPath: string): Promise<ReadonlyArray<Post>> => {
  const postsPathContents = await fs.readdir(postsPath);
  const postContents = await Promise.all(
    postsPathContents.map(async filename => ({
      content: await fs.readFile(path.join(postsPath, filename), "utf8"),
      filename,
    })),
  );

  return postContents
    .map(pc => {
      const { content, data } = grayMatter(pc.content);
      const postData = data as PostFrontMatter;

      return {
        ...postData,
        content,
        published: new Date(postData.published),
        slug: pc.filename.replace(".md", ""),
      };
    })
    .sort(sortByPublishedDesc);
};
