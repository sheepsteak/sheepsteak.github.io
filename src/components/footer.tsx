import React, { VFC } from "react";
import styles from "./footer.module.css";

export const Footer: VFC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <div>
        <a href="https://twitter.com/chrisjshepherd">
          <img
            alt="Follow me on Twitter"
            className={styles.icon}
            src="/images/twitter.svg"
          />
        </a>
        <a href="https://github.com/sheepsteak">
          <img
            alt="See my GitHub profile"
            className={styles.icon}
            src="/images/github.svg"
          />
        </a>
        <a href="http://feeds.feedburner.com/chrisshepherd">
          <img
            alt="Subscribe to my RSS feed"
            className={styles.icon}
            src="/images/rss.svg"
          />
        </a>
      </div>
      <span className={styles.copyright}>Chris Shepherd © 2020</span>
    </div>
  </footer>
);
