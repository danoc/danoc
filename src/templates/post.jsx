import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import BlogContainer from "../layouts/blog";
import * as s from "../styles/";
import "../styles/prism-ghcolors.css";

const Text = styled.div`
  max-width: ${s.maxWidth7};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    max-width: ${s.measureWide};
  }

  hr {
    border-top: 5px solid ${s.lightGray};
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin: ${s.spacing5} 0;
  }
`;

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  /* eslint-disable react/no-danger */
  return (
    <BlogContainer>
      <Helmet
        title={post.frontmatter.title}
        meta={[
          { name: "og:title", content: post.frontmatter.title },
          { name: "og:type", content: "article" },
          { name: "article:published_time", content: post.frontmatter.date },
          { name: "article:author", content: post.frontmatter.date },
          { name: "article:tag", content: post.frontmatter.tags },
          { name: "og:image", content: post.frontmatter.image },
          { name: "og:url", content: site.siteURL + post.frontmatter.path },
          { name: "description", content: post.frontmatter.description },
          { name: "keywords", content: post.frontmatter.tags }
        ]}
      />
      <h1>{post.frontmatter.title}</h1>
      <Text dangerouslySetInnerHTML={{ __html: post.html }} />
    </BlogContainer>
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
            date: PropTypes.string,
            path: PropTypes.string,
            title: PropTypes.string,
            image: PropTypes.string,
            tags: PropTypes.string,
            description: PropTypes.string
          })
        })
      })
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteURL: PropTypes.string
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
        image
        tags
        description
      }
    }
    site {
      siteMetadata {
        siteURL
      }
    }
  }
`;
