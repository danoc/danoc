import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
import Section from "../../components/section";
import ArticleListItem from "../../components/article-list-item";
import BulletList from "../../components/bullet-list";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <Header title="Daniel O&#8217;Connor" isSinglePost />
      <Section title="Writing" to="/blog/">
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
  data: PropTypes.shape({}),
};

BlogIndex.defaultProps = {
  data: {},
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
