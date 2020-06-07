import {
  default as NextDocument,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="shortcut icon"
            href="/images/favicon.png"
            type="image/png"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href="http://feeds.feedburner.com/chrisshepherd"
          />
          <script
            async
            src="https://curly-fortnight.herokuapp.com/tracker.js"
            data-ackee-server="https://curly-fortnight.herokuapp.com"
            data-ackee-domain-id="45ad8b5b-2470-4452-9c7f-516404b72799"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
