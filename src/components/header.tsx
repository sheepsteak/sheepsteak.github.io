import Link from "next/link";
import type { VFC } from "react";
import styles from "./header.module.css";

interface Props {
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Header: VFC<Props> = ({ subtitle, title }) => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/">
        <a className={styles.headerName}>CHRIS SHEPHERD</a>
      </Link>
      <nav className={styles.navigation} role="navigation">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={styles.title}>{title}</h1>
      {subtitle}
    </div>
  </header>
);
