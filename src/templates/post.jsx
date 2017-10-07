import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Header from "../components/header";
import * as s from "../styles/";
import "../styles/prism-ghcolors.css";

const PostTitle = styled.h1`
  max-width: ${s.measureWide};
`;
const HeaderSection = styled(Header)`
  margin-bottom: ${s.spacing6};
`;

const Text = styled.div`
  max-width: ${s.maxWidth7};

  h1 {
    margin-top: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 1.414em 0 0.5em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    max-width: ${s.measureWide};
  }

  p {
    margin-bottom: 1.3em;
  }

  ul,
  ol {
    max-width: ${s.measureWide};
    padding-left: ${s.spacing5};
  }

  hr {
    border-top: ${s.spacing3} solid ${s.lightGray};
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin: ${s.spacing5} 0;
  }

  blockquote {
    max-width: ${s.measureWide};
    padding-left: calc(${s.spacing5} - ${s.spacing3});
    margin-left: 0;
    border-left: ${s.spacing3} solid ${s.lightGray};
  }

  img {
    outline: 1px solid ${s.lightGray};
    padding: 1px;
  }

  .gatsby-resp-image-link {
    + em {
      color: ${s.gray};
      display: block;
      margin: ${s.spacing4} ${s.spacing2};
      font-size: ${s.fontSize6};
      font-style: normal;
    }

    &:hover img {
      outline-color: ${s.moonGray};
    }
  }
`;

const formatDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

const Time = styled.time`
  color: ${s.gray};
  font-weight: 400;
`;

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
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
          <meta property="og:image:alt" content={post.frontmatter.image_alt} />
        )}
        {post.frontmatter.date && (
          <meta
            property="article:published_time"
            content={post.frontmatter.date}
          />
        )}
        {site.siteUrl &&
          post.frontmatter.path && (
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

      <HeaderSection title="Daniel O&#8217;Connor" />

      <Time
        dateTime={post.frontmatter.date}
        itemProp="datePublished"
        title={new Date(post.frontmatter.date).toString()}
      >
        {formatDate(new Date(post.frontmatter.date))}
      </Time>

      <PostTitle itemProp="headline">{post.frontmatter.title}</PostTitle>

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

      <Text
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
  /* eslint-enable react/no-danger */
};

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.shape({
        node: PropTypes.shape({})
      })
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired
      })
    })
  })
};

Post.defaultProps = {
  data: {}
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
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
