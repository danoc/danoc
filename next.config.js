const copyLinkedFiles = require("remark-copy-linked-files");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        copyLinkedFiles,
        {
          destinationDir: "./public/mdx",
          staticPath: "mdx",
        },
      ],
    ],
  },
});

module.exports = withMDX();
