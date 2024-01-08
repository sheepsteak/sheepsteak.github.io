import Link from "next/link";
import type { FC } from "react";
import { Prose } from "./prose";

interface Props {
  intro: string | null;
  published: string;
  slug: string;
  title: string;
}

const PostTile: FC<Props> = ({ intro, published, slug, title }) => (
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
      className="mt-3 inline-block text-xs uppercase text-gray-500 sm:text-sm lg:text-base"
      dateTime={published}>
      {new Date(published).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </time>
    {intro && (
      <div className="mt-3">
        <Prose>{intro}</Prose>
      </div>
    )}
    <div className="prose mt-3 lg:prose-lg xl:prose-xl">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        Read More
      </Link>
    </div>
  </div>
);

export { PostTile };
