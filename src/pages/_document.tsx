import {
  default as NextDocument,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
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
