---
title: It’s hard to publish front-end packages
description:
date: "2019-03-06T02:34:00Z"
path: /blog/difficult-publish-package-npm/
is_featured: true
---

I've spent the past five years creating and maintaing front-end NPM packages. I've noticed two patterns in this time:

- It's increasigly easier to get started with React, Vue.js, and other frameworks. This is in large part thanks to tools like Create React App and Gatsby that abstract the complexities of webpack, Babel, and other front-end infrastructure.
- It's still hard to publish front-end packages to NPM.

This post is a collection of questions I've had along the way.

- Do I run code through Babel before publishing?
- Do I need webpack, Rollup, or another module bundler?
- What's the `module` field in `package.json`?
- Should I strip out `devDependencies` before publishing?
- How can I be confident that the published code works?
- How do I publish a package that imports a CSS module?
- Where do I put my pre-publish scripts?
