import React from "react";
import Helmet from "react-helmet";
import { graphql, Link as GatsbyLink } from "gatsby";
import Container from "../components/container";
import { css as linkCSS } from "../components/link";
import * as s from "../styles";
import "../styles/prism-ghcolors.css";

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
    <Container>
      <div itemScope itemType="http://schema.org/Article">
        <Helmet>
          <meta property="og:type" content="article" />
          {post.frontmatter.title && <title>{post.frontmatter.title}</title>}
          {post.frontmatter.title && (
            <meta property="og:title" content={post.frontmatter.title} />
          )}
          {site.siteUrl &&
            post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.src && (
              <meta
                property="og:image"
                content={
                  site.siteUrl +
                  post.frontmatter.image_src.childImageSharp.original.src
                }
              />
            )}
          {post.frontmatter.is_featured && post.frontmatter.image_src ? (
            <meta name="twitter:card" content="summary_large_image" />
          ) : (
            <meta name="twitter:card" content="summary" />
          )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.width && (
              <meta
                property="og:image:width"
                content={
                  post.frontmatter.image_src.childImageSharp.original.width
                }
              />
            )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp.original.height && (
              <meta
                property="og:image:height"
                content={
                  post.frontmatter.image_src.childImageSharp.original.height
                }
              />
            )}
          {post.frontmatter.image_src &&
            post.frontmatter.image_src.internal.mediaType && (
              <meta
                property="og:image:type"
                content={post.frontmatter.image_src.internal.mediaType}
              />
            )}
          {post.frontmatter.image_alt && (
            <meta
              property="og:image:alt"
              content={post.frontmatter.image_alt}
            />
          )}
          {post.frontmatter.date && (
            <meta
              property="article:published_time"
              content={post.frontmatter.date}
            />
          )}
          {site.siteUrl && post.frontmatter.path && (
            <meta
              property="og:url"
              content={site.siteUrl + post.frontmatter.path}
            />
          )}
          {post.frontmatter.description && (
            <meta name="description" content={post.frontmatter.description} />
          )}
          {post.frontmatter.description && (
            <meta
              property="og:description"
              content={post.frontmatter.description}
            />
          )}
          {post.frontmatter.tags && (
            <meta name="keywords" content={post.frontmatter.tags} />
          )}
          {post.frontmatter.tags && (
            <meta property="article:tag" content={post.frontmatter.tags} />
          )}
          {post.frontmatter.canonical && (
            <link rel="canonical" href={post.frontmatter.canonical} />
          )}
        </Helmet>

        <header css={{ marginBottom: s.s6 }}>
          <GatsbyLink
            to="/"
            css={{ color: "inherit", textDecoration: "inherit" }}
          >
            <h1 css={{ fontSize: s.f5, marginTop: s.s0, marginBottom: s.s3 }}>
              Daniel O’Connor
            </h1>
          </GatsbyLink>
        </header>

        <time
          dateTime={post.frontmatter.date}
          itemProp="datePublished"
          title={new Date(post.frontmatter.date).toDateString()}
          css={{ color: s.gray, fontSize: s.f6 }}
        >
          {post.frontmatter.formattedDate}
        </time>

        <h1 itemProp="headline" css={{ fontSize: s.f4 }}>
          {post.frontmatter.title}
        </h1>

        {site.siteUrl &&
          post.frontmatter.image_src &&
          post.frontmatter.image_src.childImageSharp.original.src && (
            <meta
              itemProp="image"
              content={
                site.siteUrl +
                post.frontmatter.image_src.childImageSharp.original.src
              }
            />
          )}
        <div
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
          css={{
            lineHeight: s.lhCopy,

            h1: {
              marginTop: s.s0,
            },

            "h1, h2, h3, h4": {
              margin: "1.414em 0 0.5em",
            },

            "h1, h2, h3, h4, h5, h6, p": {
              maxWidth: s.measureWide,
            },

            "p, ul, ol": {
              marginBottom: "1.3em",

              "ul, ol": {
                marginBottom: s.s0,
              },
            },

            "ul, ol": {
              maxWidth: s.measureWide,
              paddingLeft: s.s4,
            },

            li: {
              paddingLeft: s.s1,

              "p:first-child": {
                marginTop: s.s0,
              },

              "p:last-of-type": {
                marginBottom: s.s2,
              },
            },

            "li:not(:last-child)": {
              marginBottom: s.s2,
            },

            hr: {
              borderTop: `1px solid ${s.lightGray}`,
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              margin: `${s.s5} ${s.s0}`,
            },

            blockquote: {
              maxWidth: s.measureWide,
              paddingLeft: s.s3,
              marginLeft: s.s0,
              borderLeft: `1px solid ${s.lightGray}`,
            },

            code: {
              fontSize: s.f6,
            },

            img: {
              outline: `1px solid ${s.lightGray}`,
              maxWidth: "100%",
            },

            "strong, b": {
              fontWeight: 500,
            },

            ".gatsby-resp-image-link": {
              "&:focus": {
                outline: `2px dotted currentColor`,
              },

              "+ em": {
                color: s.gray,
                display: "block",
                margin: `${s.s3} ${s.s2}`,
                fontSize: s.f6,
              },

              "&:hover img": {
                outline: `1px solid ${s.moonGray}`,
              },
            },

            a: { ...linkCSS },

            ".anchor": {
              borderBottom: "none",
            },
          }}
        />
      </div>
    </Container>
  );
  /* eslint-enable react/no-danger */
};

export default Post;

// Post.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       html: PropTypes.string.isRequired,
//       frontmatter: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//         path: PropTypes.string.isRequired,
//         description: PropTypes.string,
//         tags: PropTypes.arrayOf(PropTypes.string),
//         image_src: PropTypes.string,
//         canonical: PropTypes.string,
//         is_featured: PropTypes.bool,
//         image_alt: PropTypes.string,
//       }).isRequired,
//     }).isRequired,
//     site: PropTypes.shape({
//       siteMetadata: PropTypes.shape({
//         siteUrl: PropTypes.string.isRequired,
//       }),
//     }),
//   }),
// };

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        formattedDate: date(formatString: "MMMM D, YYYY")
        path
        title
        tags
        description
        canonical
        is_featured
        image_alt
        image_src {
          internal {
            mediaType
          }
          childImageSharp {
            original {
              width
              height
              src
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
