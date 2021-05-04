import "highlight.js/styles/solarized-light.css";
import { AppProps } from "next/app";
import React, { VFC } from "react";
import "../styles/global.css";

const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
