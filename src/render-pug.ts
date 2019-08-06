import pug from "pug";
import marked from "marked";
import highlight from "highlight.js";

const renderer = new marked.Renderer();

renderer.codespan = function codespan(text) {
  return `<code class="hljs ">${text}</code>`;
};

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
  langPrefix: "hljs ",
  renderer,
});

export default (
  filename: string,
  layoutPath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locals?: Record<string, any>,
): string =>
  pug.renderFile(filename, {
    ...locals,
    basedir: layoutPath,
    filename: filename,
    pretty: true,
    md: marked,
  });
