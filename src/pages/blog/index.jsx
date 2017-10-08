import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../../components/header";
import Section from "../../components/section";
import ArticleListItem from "../../components/article-list-item";
import BulletList from "../../components/bullet-list";
import * as s from "../../styles/";

const HeaderSection = styled(Header)`
  margin-bottom: ${s.spacing6};
`;

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <HeaderSection title="Daniel O&#8217;Connor" />
      <Section title="Posts" to="/blog/">
        <BulletList>
          {posts.map(post => (
            <ArticleListItem
              to={post.node.frontmatter.path}
              key={post.node.frontmatter.path}
              date={post.node.frontmatter.date}
            >
              {post.node.frontmatter.title}
            </ArticleListItem>
          ))}
        </BulletList>
      </Section>
    </div>
  );
};

export default BlogIndex;

BlogIndex.propTypes = {
  data: PropTypes.shape({})
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
