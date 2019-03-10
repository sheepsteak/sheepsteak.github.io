import path from "path";
import fs from "fs-extra";
import grayMatter from "gray-matter";
import rimraf from "rimraf";
import makeDir from "make-dir";
import { promisify } from "util";
import klaw from "klaw";
import renderPug from "./render-pug";
import getPosts from "./get-posts";
import { Post } from "./types";

const contentPath = path.join(__dirname, "..", "content");
const layoutsPath = path.join(contentPath, "layouts");
const pagesPath = path.join(contentPath, "pages");
const postsPath = path.join(contentPath, "posts");
const staticPath = path.join(contentPath, "static");
const publicPath = path.join(__dirname, "..", "public");

(async () => {
  // Clean public folder
  await promisify(rimraf)(publicPath);

  const posts = await getPosts(postsPath);

  await Promise.all(
    posts
      .map(p => [
        p.slug,
        renderPug(`${path.join(layoutsPath, p.layout)}.pug`, layoutsPath, p),
      ])
      .map(async ([slug, html]) => {
        const postPath = path.join(publicPath, "posts", slug);
        await makeDir(postPath);

        await fs.writeFile(path.join(postPath, "index.html"), html);
      }),
  );

  klaw(pagesPath)
    .on("data", async ({ path: itemPath, stats }) => {
      if (stats.isDirectory()) {
        return;
      }

      const filePath = path.relative(pagesPath, itemPath);
      const fileContent = renderPug(
        path.join(pagesPath, filePath),
        layoutsPath,
        { posts },
      );
      const pagePath = path.join(publicPath, filePath.replace(".pug", ""));
      await makeDir(path.dirname(pagePath));

      await fs.writeFile(pagePath, fileContent);
    })
    .on("error", err => console.error(err));

  await fs.copy(path.join(staticPath), path.join(publicPath, "static"));
  await fs.copy(
    path.join(contentPath, "CNAME"),
    path.join(publicPath, "CNAME"),
  );
  await fs.copy(
    path.join(contentPath, "README.md"),
    path.join(publicPath, "README.md"),
  );
})();
