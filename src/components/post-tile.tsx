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
      <h3 className="text-balance text-xl font-medium sm:text-2xl lg:text-3xl">
        {title}
      </h3>
    </Link>
    <time
      className="text-xs uppercase text-gray-500 sm:text-sm lg:text-base"
      dateTime={published}>
      {new Date(published).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </time>
  </div>
);

export { PostTile };
