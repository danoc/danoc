import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BlogContainer from "../../layouts/blog";
import Section from "../../components/section";
import Experience from "../../components/experience";
import ArticleList from "../../components/article-list";
import * as s from "../../styles/";

const Item = styled(Experience)`margin-bottom: ${s.spacing4};`;

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <BlogContainer>
      <Section title="Posts" to="/blog/">
        <ArticleList>
          {posts.map(({ node: post }) => (
            <Item
              title={post.frontmatter.title}
              to={post.frontmatter.path}
              key={post.frontmatter.path}
              meta={post.frontmatter.date}
            />
          ))}
        </ArticleList>
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
