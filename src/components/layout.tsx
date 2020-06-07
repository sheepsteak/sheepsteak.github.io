import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export const Layout = ({ children, subtitle, title }: Props) => (
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
