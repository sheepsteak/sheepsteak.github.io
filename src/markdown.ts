import rehypeClassNames from "rehype-class-names";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { VFile } from "vfile";
import { matter } from "vfile-matter";

export type MarkdownToHTMLResult =
  | { ok: true; data: Record<string, unknown>; html: string }
  | { ok: false; error: Error };

export const markdownToHTML = async (
  markdown: string,
): Promise<MarkdownToHTMLResult> => {
  let file: VFile;

  try {
    file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(() => (_, file) => {
        matter(file);
      })
      .use(remarkGfm)
      .use(remarkRehype)
      // @ts-expect-error issue with types
      .use(rehypeClassNames, {
        pre: "not-prose",
      })
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(markdown);
  } catch (error) {
    return {
      error: new Error(`Failed to process markdown`, { cause: error }),
      ok: false,
    };
  }

  return {
    data: (file.data.matter ?? {}) as Record<string, unknown>,
    html: file.toString(),
    ok: true,
  };
};
