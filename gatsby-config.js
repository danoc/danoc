module.exports = {
  siteMetadata: {
    siteUrl: "https://danoc.me",
    siteName: "Daniel O'Connor"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-smartypants",
          "gatsby-remark-prismjs",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-5922635-10"
      }
    }
  ]
};
