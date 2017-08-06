import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

const Container = styled.div`
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
`;

const Post = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Container>
      <header>
        <h1>
          <Link to="/">Daniel O'Connor</Link>
        </h1>
        <p>
          Hello! I'm a UI Developer at Thumbtack and I live in San Francisco.
        </p>
        <p>
          I build design systems to efficiently deliver high quality products.
          I'm a stickler for consistency and help bridge the gap between design
          and development.
        </p>
      </header>
      <Helmet
        title="Daniel O'Connor"
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" }
        ]}
      />
      <h1>
        {post.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Container>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
