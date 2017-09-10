import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import BlogContainer from "../../layouts/blog";
import Section from "../../components/section";
import Experience from "../../components/experience";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <BlogContainer>
      <Section title="Posts" to="/blog/">
        <ul>
          {posts.map(({ node: post }) => (
            <Experience
              title={post.frontmatter.title}
              to={post.frontmatter.path}
              key={post.frontmatter.path}
            />
          ))}
        </ul>
      </Section>
    </BlogContainer>
  );
};

export default BlogIndex;

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string
            })
          })
        })
      )
    })
  })
};

BlogIndex.defaultProps = {
  data: {}
};

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
