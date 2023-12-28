import Image from "next/image";
import type { FC } from "react";
import styles from "./footer.module.css";

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <div>
        <a href="https://twitter.com/chrisjshepherd">
          <Image
            alt="Follow me on Twitter"
            className={styles.icon}
            src="/images/twitter.svg"
            height={26}
            width={26}
          />
        </a>
        <a href="https://github.com/sheepsteak">
          <Image
            alt="See my GitHub profile"
            className={styles.icon}
            src="/images/github.svg"
            height={26}
            width={26}
          />
        </a>
        <a href="http://feeds.feedburner.com/chrisshepherd">
          <Image
            alt="Subscribe to my RSS feed"
            className={styles.icon}
            src="/images/rss.svg"
            height={26}
            width={26}
          />
        </a>
      </div>
      <span className={styles.copyright}>Chris Shepherd © 2020</span>
    </div>
  </footer>
);
