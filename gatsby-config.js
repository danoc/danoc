require("dotenv").config();
const firebaseAdmin = require("firebase-admin");

const numWeeksOfRuns = 37;

const firebaseClient = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString(),
    ),
  ),
});

module.exports = {
  siteMetadata: {
    title: "Daniel O’Connor",
    description:
      "Daniel O’Connor is a front-end engineer living in New York. He does front-end infrastructure and design systems at Thumbtack.",
    siteUrl:
      process.env.VERCEL_ENV === "preview"
        ? `https://${process.env.VERCEL_URL}`
        : "https://danoc.me",
    numWeeksOfRuns,
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-pinboard",
      options: {
        authToken: process.env.PINBOARD,
        tags: "danoc.me",
      },
    },
    {
      resolve: "gatsby-source-strava-activities",
      options: {
        clientId: process.env.STRAVA_CLIENT_ID,
        clientSecret: process.env.STRAVA_CLIENT_SECRET,
        getRefreshToken: async () => {
          const doc = await firebaseClient
            .firestore()
            .collection("config")
            .doc("strava-refresh-token")
            .get();

          if (doc.exists) {
            return doc.get("value");
          }

          throw Error("Could not get `strava-refresh-token` from Fireabse.");
        },
        onRefreshTokenChanged: async (newRefreshToken) => {
          await firebaseClient
            .firestore()
            .doc("config/strava-refresh-token")
            .update({ value: newRefreshToken });
        },
        // Get data for past `numWeeksOfRuns` weeks
        after:
          Math.round(new Date().getTime() / 1000) - 604800 * numWeeksOfRuns,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 578,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: true,
              withWebp: true,
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: "Daniel O’Connor",
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                ...{
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                },
              })),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        date
                        path
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-emotion",
    "gatsby-plugin-lodash",
    "gatsby-plugin-react-helmet",
  ],
};
