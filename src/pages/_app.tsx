import "highlight.js/styles/solarized-light.css";
import type { AppProps } from "next/app";
import type { VFC } from "react";
import "../styles/global.css";

const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
