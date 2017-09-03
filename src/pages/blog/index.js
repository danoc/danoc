import React from "react";
import Link from "gatsby-link";
import BlogContainer from "../../layouts/blog";
import styled from "styled-components";
import Section from "../../components/section";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <BlogContainer>
      <Section title="Posts" href="/blog">
        <ul>
          {posts.map(({ node: post }) => (
            <li key={post.frontmatter.path}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          ))}
        </ul>

        <Link to="/blog">View More Posts</Link>
      </Section>
    </BlogContainer>
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
