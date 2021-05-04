import React, { FC } from "react";
import styles from "./content.module.css";

export const Content: FC = ({ children }) => (
  <div className={styles.content}>{children}</div>
);
