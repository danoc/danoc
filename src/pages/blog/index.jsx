import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
import Section from "../../components/section";
import BulletList from "../../components/bullet-list";

const formatDate = dateString => {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ];

  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <Header isSinglePost />
      <Section title="Writing" to="/blog/">
        <BulletList
          items={posts.map(p => ({
            to: p.node.frontmatter.path,
            title: p.node.frontmatter.title,
            meta: formatDate(p.node.frontmatter.date)
          }))}
        />
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
            date
            path
          }
        }
      }
    }
  }
`;
