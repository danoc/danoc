module.exports = {
  theme: {
    fontFamily: {
      sans:
        '"Untitled Sans", -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui, arial',
      mono:
        'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
  },
  purge: {
    mode: "layers",
    content: ["./posts/**/*.mdx", "./pages/**/*.tsx", "./pages/**/*.jsx"],
  },
};
