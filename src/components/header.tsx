import Link from "next/link";
import type { FC } from "react";
import { Content } from "./content";

interface Props {
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Header: FC<Props> = ({ subtitle, title }) => (
  <header className="bg-yellow-300">
    <Content>
      <Link href="/" className="text-4xl font-black">
        CHRIS SHEPHERD
      </Link>
      <nav className="mt-4" role="navigation">
        <ul className="flex gap-4">
          <li>
            <Link className="text-xl font-bold hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-xl font-bold hover:underline" href="/posts">
              Posts
            </Link>
          </li>
          <li>
            <Link className="text-xl font-bold hover:underline" href="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="my-3 text-balance text-5xl font-bold md:text-6xl xl:text-7xl">
        {title}
      </h1>
      {subtitle}
    </Content>
  </header>
);
