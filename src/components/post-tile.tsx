import Link from "next/link";
import type { FC } from "react";
import styles from "./post-tile.module.css";

interface Props {
  published: string;
  slug: string;
  title: string;
}

const PostTile: FC<Props> = ({ published, slug, title }) => (
  <div className={styles.postTile}>
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
      className={styles.titleLink}>
      <h2 className={styles.title}>{title}</h2>
    </Link>
    <time className={styles.date} dateTime={published}>
      {new Date(published).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </time>
  </div>
);

export { PostTile };
