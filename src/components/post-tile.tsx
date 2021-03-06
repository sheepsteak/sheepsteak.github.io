import Link from "next/link";
import React from "react";
import styles from "./post-tile.module.css";

interface Props {
  published: string;
  slug: string;
  title: string;
}

const PostTile = ({ published, slug, title }: Props) => (
  <div className={styles.postTile}>
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </a>
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
