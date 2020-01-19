---
title: Easily unstyle buttons with ClickableBox
description: React component to add onClick to HTML elements without sacrificing accessibility.
date: "2018-12-09T23:20:00Z"
path: /blog/clickable-box/
image_src: ./github-readme.png
image_alt: Screenshot from the ClickableBox GitHub repo README
---

[![Screenshot from the ClickableBox GitHub repo README](./github-readme.png)](https://github.com/danoc/clickable-box)

It bothers me that there's no easy way to remove styles from a button element or properly add `onClick` to a `div`. This encourages developers to take shortcuts and hurts users navigating the web with keyboard and screen readers.

Inspired by my own frustrations, a [tweet by Micah Godbolt](https://twitter.com/micahgodbolt/status/1047218367432544257), and a follow-up [blog post by Scott O'Hara](https://www.scottohara.me/blog/2018/10/03/clickable-box-buttons.html), I've created a React component called [ClickableBox](https://github.com/danoc/clickable-box).

[ClickableBox](https://github.com/danoc/clickable-box) makes it easy to add `onClick` to arbitrary HTML elements without sacrificing accessibility.

You can install it with NPM:

```bash
npm install clickable-box
```

And use it like this:

```jsx
// import ClickableBox from 'clickable-box';

<ClickableBox
  onClick={this.closeModal}
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</ClickableBox>
```

This will render a `span` that is accessible for users navigating by screen readers, keyboard, and mouse/touch.

Take a look at [ClickableBox on GitHub](https://github.com/danoc/clickable-box) to learn more, send feedback, or ask questions.
