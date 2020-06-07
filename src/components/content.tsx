import React from "react";
import styles from "./content.module.css";

interface Props {
  children: React.ReactNode;
}

export const Content = ({ children }: Props) => (
  <div className={styles.content}>{children}</div>
);
