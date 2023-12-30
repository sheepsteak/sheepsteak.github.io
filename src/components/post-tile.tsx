import Link from "next/link";
import type { FC } from "react";

interface Props {
  published: string;
  slug: string;
  title: string;
}

const PostTile: FC<Props> = ({ published, slug, title }) => (
  <div>
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
      className="hover:underline">
      <h3 className="text-balance text-2xl font-medium md:text-3xl xl:text-4xl">
        {title}
      </h3>
    </Link>
    <time className="text-sm font-bold uppercase" dateTime={published}>
      {new Date(published).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </time>
  </div>
);

export { PostTile };
