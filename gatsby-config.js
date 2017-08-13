module.exports = {
  siteMetadata: {
    siteURL: "https://danoc.me",
    siteName: "Daniel O'Connorrr"
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
        plugins: []
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components"
  ]
};
