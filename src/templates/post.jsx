import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Header from "../components/header";
import * as s from "../styles/";
import "../styles/prism-ghcolors.css";

const PostTitle = styled.h1`max-width: ${s.measureWide};`;
const HeaderSection = styled(Header)`margin-bottom: ${s.spacing6};`;

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

  .gatsby-resp-image-link:hover img {
    outline-color: ${s.moonGray};
  }
`;

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
    <div>
      <Helmet>
        <meta name="og:type" content="article" />
        {post.frontmatter.title && <title>{post.frontmatter.title}</title>}
        {post.frontmatter.title && (
          <meta name="og:title" content={post.frontmatter.title} />
        )}
        {post.frontmatter.date && (
          <meta name="article:published_time" content={post.frontmatter.date} />
        )}
        {post.frontmatter.siteUrl &&
          post.frontmatter.path && (
            <meta
              name="og:url"
              content={site.siteUrl + post.frontmatter.path}
            />
          )}
        {post.frontmatter.description && (
          <meta name="description" content={post.frontmatter.description} />
        )}
        {post.frontmatter.tags && (
          <meta name="keywords" content={post.frontmatter.tags} />
        )}
        {post.frontmatter.tags && (
          <meta name="article:tag" content={post.frontmatter.tags} />
        )}
        {post.frontmatter.canonical && (
          <link rel="canonical" href={post.frontmatter.canonical} />
        )}
      </Helmet>

      <HeaderSection title="Daniel O&#8217;Connor" />

      <PostTitle>{post.frontmatter.title}</PostTitle>

      <Text dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
  /* eslint-enable react/no-danger */
};

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            date: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            tags: PropTypes.string,
            description: PropTypes.string,
            canonical: PropTypes.string
          })
        })
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
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        description
        canonical
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
