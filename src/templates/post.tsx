import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Container from "../components/container";
import { css as linkCSS } from "../components/link";
import * as s from "../styles";
import "../styles/prism-ghcolors.css";
import PageTitle from "../components/page-title";

type PostProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: string;
        formattedDate: string;
        path: string;
        description?: string;
        image_src?: {
          childImageSharp: {
            original: {
              src: string;
              width: string;
              height: string;
            };
            fluid: {
              src: string;
            };
          };
          internal: {
            mediaType: string;
          };
        };
        canonical?: string;
        image_alt?: string;
      };
    };
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
  };
};

const Post = ({ data }: PostProps) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
    <Container title={post.frontmatter.title} header="condensed">
      <div itemScope itemType="http://schema.org/Article">
        <Helmet>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.frontmatter.title} />

          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp &&
            post.frontmatter.image_src.childImageSharp.original.src && (
              <meta
                property="og:image"
                content={
                  site.siteUrl +
                  post.frontmatter.image_src.childImageSharp.original.src
                }
              />
            )}

          {post.frontmatter.image_src && (
            <meta name="twitter:card" content="summary_large_image" />
          )}

          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp &&
            post.frontmatter.image_src.childImageSharp.original.width && (
              <meta
                property="og:image:width"
                content={
                  post.frontmatter.image_src.childImageSharp.original.width
                }
              />
            )}

          {post.frontmatter.image_src &&
            post.frontmatter.image_src.childImageSharp &&
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

          {post.frontmatter.canonical && (
            <link rel="canonical" href={post.frontmatter.canonical} />
          )}
        </Helmet>

        <time
          dateTime={post.frontmatter.date}
          itemProp="datePublished"
          title={new Date(post.frontmatter.date).toDateString()}
          css={{
            color: s.gray,
            fontSize: s.f6,
            marginBottom: s.s2,
            display: "block",
          }}
        >
          {post.frontmatter.formattedDate}
        </time>

        <PageTitle as="h1" itemProp="headline">
          {post.frontmatter.title}
        </PageTitle>

        {site.siteUrl &&
          post.frontmatter.image_src &&
          post.frontmatter.image_src.childImageSharp &&
          post.frontmatter.image_src.childImageSharp.original.src && (
            <meta
              itemProp="image"
              content={
                site.siteUrl +
                post.frontmatter.image_src.childImageSharp.original.src
              }
            />
          )}

        {site.siteUrl &&
          post.frontmatter.image_src &&
          post.frontmatter.image_src.childImageSharp &&
          post.frontmatter.image_src.childImageSharp.fluid.src && (
            <a href={post.frontmatter.image_src.childImageSharp.original.src}>
              <img
                src={post.frontmatter.image_src.childImageSharp.fluid.src}
                alt={post.frontmatter.image_alt}
                css={{
                  marginTop: s.s3,
                  border: `1px solid ${s.lightGray}`,
                  maxWidth: "100%",
                }}
              />
            </a>
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

            ".gatsby-resp-image-wrapper": {
              "&:focus": {
                outline: `2px dotted currentColor`,
              },

              "+ em": {
                color: s.darkGray,
                display: "block",
                margin: `${s.s2} ${s.s1}`,
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

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        formattedDate: date(formatString: "MMMM D, YYYY")
        path
        title
        description
        canonical
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
            fluid(maxWidth: 578) {
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
