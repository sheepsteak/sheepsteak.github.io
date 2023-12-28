import "highlight.js/styles/solarized-light.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import type { FC } from "react";
import "../styles/global.css";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    {process.env.NODE_ENV === "production" && (
      <Script
        src="https://getinsights.io/js/insights.js"
        onLoad={() => {
          // @ts-expect-error external script
          insights.init("h67xr3y6eHc2F1IE");
          // @ts-expect-error external script
          insights.trackPages();
        }}
      />
    )}
    <Component {...pageProps} />
  </>
);

export default App;
