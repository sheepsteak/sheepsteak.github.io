---
intro: When writing an application in Node.js it’s best practice to lock down the version that you’re using. This doesn’t really happen out of the box and there are a few different things you can do to enable this and make it more manageable.
layout: post
published: 2022-01-12T19:19:43Z
title: Enforcing Node.js, npm, and Yarn Versions
---

When writing an application in Node.js it’s best practice to lock down the version that you’re using. This doesn’t really happen out of the box and there are a few different things you can do to enable this and make it more manageable.

> The following doesn’t really apply when writing a reusable library you’re going to publish on npm as you’ll most likely want to be checking multiple Node.js versions.

## Why do this?

First of all, it might not be clear why you’d want to fully lock this down. I’ve come across a few reasons why in my time:

- Node.js changes/deprecates APIs in major versions and sometimes introduces new APIs in minor versions so developers on different versions get inconsistent results
- npm and Yarn sometimes introduce new lockfile versions so a game of lockfile tennis starts where different developers on the team are changing it back and forth
- We should strive for [parity with production](https://12factor.net/dev-prod-parity)

## Use a version manager

The conventional way to manage versions in Node.js is through [nvm](https://github.com/nvm-sh/nvm). You add a `.nvmrc` file stating the version used to the root of your repository and then you can quickly switch to that version. The content of the file is simply the version you want:

```sh
16.13.1
```

In your terminal when entering the directory of the project you can then do `nvm use` (or `nvm install`) and nvm will pick up the version and switch to it.

## Add `engines` to your `package.json`

You can also add your Node.js version to the [`engines`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines) object in your `package.json`.

```json
"engines": {
  "node": "16.13.1",
  "npm": "^8"
},
```

Note how you can also enforce the npm version. I typically just set it approximately to the version that ships with the particular version of Node.js. You can also do the same with `yarn` here too if that’s what you’re using.

### Yarn

If in fact you’re using Yarn (I prefer to) then any time you run a Yarn command it will make sure your local version of Node.js satisfies the constraint. If it’s not a compatible version it will error and tell you why. This is great because the chance of making an error is vastly reduced.

### npm

If you use `npm` this will require a bit more work and not be as good. You’ll need to set [`engine-strict`](https://docs.npmjs.com/cli/v8/using-npm/config#engine-strict) to `true` in your `.npmrc` file:

```sh
engine-strict = true
```

You should create this `.npmrc` file in the root of the project and not put it in the one in your user directory so that it works for the whole team.

Adding this will make npm check during `npm install` only. If you run anything else like `npm start` or `npm run dev` it will not check.

## Maintenance

Now that you have versions specified you’re a bit more protected from the mistakes and pitfalls of potentially having multiple versions in use mentioned earlier. If you’re moving around to different projects during the course of your day you now have some protection from making these mistakes. You can simply do `nvm use` and be placed on the relevant Node.js version for the project.

If you want to test a new version you can typically do a search for your existing version (`16.13.1` for example) and update to the new version. You can then have your CI test that and deploy it to a test environment and get some confidence that you can upgrade successfully.

## Going further with Docker and Dev Containers

Some teams will be using Docker so it makes it less likely that differing versions around the team happens. However, I still like to use the `engines` feature in `package.json` shown above as it gives that extra bit of protection and will probably be your last line of defence.

If the team are all using Visual Studio Code you could look at using [Dev Containers](https://microsoft.github.io/code-with-engineering-playbook/developer-experience/devcontainers/). This ensures every developer has the same setup regardless of the platform they’re using. They’re also really helpful for onboarding new team members.
