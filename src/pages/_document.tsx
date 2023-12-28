import type { DocumentProps } from "next/document";
import { Head, Html, Main, NextScript } from "next/document";
import type { FC } from "react";

const Document: FC<DocumentProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="http://feeds.feedburner.com/chrisshepherd"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
