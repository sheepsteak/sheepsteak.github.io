---
intro: Removing the AWS SDK from your Serverless code deployments can considerably reduce the size of your functions resulting in quicker start times and reduced costs.
layout: post
published: 2019-08-06T11:27:49.000Z
title: Excluding the AWS SDK from a Serverless Package
---

When developing your AWS Lambda functions using [Serverless](https://serverless.com) you want them to be [as small as possible to reduce cold start time](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code). Using the [`serverless-webpack`](https://github.com/serverless-heaven/serverless-webpack) plugin you can use Webpack to include everything in one minified file. This is great and will definitely help with those cold start times.

However, there is even more you can do. [AWS include the `aws-sdk`](https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html) in the Node.js runtime. This means you don’t need to include it yourself, which is good because it can easily add about 3MB on to your deployment package. This information is covered in the [README for `serverless-webpack`](https://github.com/serverless-heaven/serverless-webpack#aws-sdk) but I’ve found it doesn’t work. Instead you can apply some Webpack knowledge by using the [`externals` property](https://webpack.js.org/configuration/externals/). For a Serverless project using Babel [using the stock example from `serverless-webpack`](https://github.com/serverless-heaven/serverless-webpack/blob/master/examples/babel/webpack.config.js) your `webpack.config.js` would look something like this:

```javascript
const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  externals: [{ "aws-sdk": "commonjs aws-sdk" }], // <-- additional line
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
};
```

This will fully exclude the `aws-sdk` from your bundle and massively reduce the size of your functions. If you do `sls package` before and after adding the `externals` property you should see savings of about 3MB. One thing to bear in mind is that the version AWS provide might not always be the latest. it’s probably best to keep the [same version AWS use](https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html) in your `devDependencies` to be as close to production as possible.
