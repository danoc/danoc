import React from "react";
import PropTypes from "prop-types";
import { groupBy, map, keys, sortBy, reverse } from "lodash";
import styled from "styled-components";
import Header from "../../components/header";
import Section from "../../components/section";
import BulletList from "../../components/bullet-list";
import * as s from "../../styles";

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
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const Year = styled.div`
  margin-top: ${s.s4};
  margin-bottom: ${s.s4};
`;

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const postsByYear = groupBy(posts, p =>
    new Date(p.node.frontmatter.date).getFullYear()
  );
  const years = reverse(sortBy(keys(postsByYear)));

  return (
    <div>
      <Header isSinglePost />
      <Section title="Writing" to="/blog/">
        {map(years, year => (
          <Year id={year} key={year}>
            <h3>{year}</h3>
            <BulletList
              items={postsByYear[year].map(p => ({
                to: p.node.frontmatter.path,
                title: p.node.frontmatter.title,
                meta: formatDate(p.node.frontmatter.date)
              }))}
            />
          </Year>
        ))}
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
