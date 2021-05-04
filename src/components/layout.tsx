import React, { FC } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import styles from "./layout.module.css";

interface Props {
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, subtitle, title }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <Header subtitle={subtitle} title={title} />
    </div>
    <main className={styles.content}>{children}</main>
    <div className={styles.footer}>
      <Footer></Footer>
    </div>
  </div>
);
