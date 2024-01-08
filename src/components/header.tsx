import Link from "next/link";
import type { FC } from "react";
import { Content } from "./content";
import { NavLink } from "./nav-link";

interface Props {
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Header: FC<Props> = ({ subtitle, title }) => (
  <header className="bg-yellow-300">
    <Content>
      <Link href="/" className="text-4xl font-bold">
        CHRIS SHEPHERD
      </Link>
      <nav className="mt-4" role="navigation">
        <ul className="flex gap-4 sm:gap-6 lg:gap-8">
          <li>
            <NavLink exact href="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink exact href="/about">
              About
            </NavLink>
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
