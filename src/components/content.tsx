import type { FC, PropsWithChildren } from "react";
import styles from "./content.module.css";

type Props = PropsWithChildren;

export const Content: FC<Props> = ({ children }) => (
  <div className={styles.content}>{children}</div>
);
