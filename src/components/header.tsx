import Link from "next/link";
import type { FC } from "react";
import styles from "./header.module.css";

interface Props {
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Header: FC<Props> = ({ subtitle, title }) => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.headerName}>
        CHRIS SHEPHERD
      </Link>
      <nav className={styles.navigation} role="navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h1 className={styles.title}>{title}</h1>
      {subtitle}
    </div>
  </header>
);
