import "highlight.js/styles/solarized-light.css";
import { AppProps } from "next/app";
import React from "react";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
