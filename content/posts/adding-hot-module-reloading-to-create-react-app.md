---
layout: post
published: 2016-07-23T14:51:43.190Z
title: Adding Hot Module Reloading to Create React App
---

The React team have just released [Create React App](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html). It's a quick and simple way to get started with a single-page React application and I expect it's going to be popular as it's already got over 2000 stars on GitHub in less than a day!

The focus is on zero configuration and letting you concentrate on just writing your application. As someone who enjoys the whole Babel/Webpack configuration dance to set up a new project I still think this is amazing as I quite easily get caught up in "analysis paralysis" when starting a new project. This allows you to just start and when it's time to branch out and add more configuration you can just run `npm run eject` and it will then expose the previously hidden Webpack/Babel/ESLint configuration.

Due to the focus on simplicity, there are some really good things that are missing at the moment. I think the biggest one is Hot Module Replacement (HMR). It's big productivity boost to have your application instantly re-render in the browser without a page reload. It's currently working for CSS but it hasn't been enabled for React components yet. But you can enable it by updating your `index.js` to look like this:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
```

This will just use [Webpack's HMR](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) to re-render your application anytime `App.js` (or a file it in it's dependency tree) is changed.

Take a look at [Create React App](https://github.com/facebookincubator/create-react-app) and start submitting some feedback as I think this is a great opportunity to get more people interested in using React who were previously scared away.
