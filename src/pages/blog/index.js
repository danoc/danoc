import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const Container = styled.div`
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
`;

const SectionHeading = styled.h2``;

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

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
      <section>
        <SectionHeading>Posts</SectionHeading>

        <ul>
          {posts.map(({ node: post }) => {
            return (
              <li>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
