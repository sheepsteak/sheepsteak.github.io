import type { FC } from "react";
import styles from "./prose.module.css";

interface Props {
  children: string;
}

export const Prose: FC<Props> = ({ children }) => (
  <article
    className={`${styles.prose} prose max-w-full lg:prose-lg xl:prose-xl prose-headings:text-balance prose-blockquote:border-yellow-300`}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);
