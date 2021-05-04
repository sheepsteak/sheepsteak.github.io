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
          {process.env.NODE_ENV === "production" && (
            <>
              <script src="https://getinsights.io/js/insights.js"></script>
              <script
                dangerouslySetInnerHTML={{
                  __html:
                    "insights.init('h67xr3y6eHc2F1IE'); insights.trackPages();",
                }}
              />
            </>
          )}
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
