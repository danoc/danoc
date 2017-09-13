import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as s from "../styles/";
import SectionComponent from "../components/section";
import Experience from "../components/experience";
import Link from "../components/link";
import Header from "../components/header";
import Paragraph from "../components/paragraph";
import ArticleList from "../components/article-list";

const Item = styled(Experience)`
  margin-bottom: ${props => (props.children ? s.spacing5 : s.spacing4)};
`;

const sectionMargin = css`margin-bottom: ${s.spacing6};`;
const Section = styled(SectionComponent)`${sectionMargin};`;
const HeaderSection = styled(Header)`${sectionMargin};`;

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <HeaderSection title="Daniel O&#8217;Connor">
        <Paragraph>Hello! I’m a UI Engineer living in San Francisco.</Paragraph>
        <Paragraph>
          I build design systems to efficiently deliver high quality products.
          I’m a stickler for consistency and help bridge the gap between design
          and development.
        </Paragraph>
      </HeaderSection>

      <Section title="Posts" to="/blog/" callToAction="View All Posts">
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

      <Section title="Work">
        <ArticleList>
          <Item
            title="Thumbtack"
            to="https://www.thumbtack.com/"
            meta="2017-Present"
          >
            <Paragraph>
              I build out our design system, Thumbprint UI, and assist our
              engineering team with the move to React.
            </Paragraph>
          </Item>
          <Item
            title="Optimizely"
            to="https://www.optimizely.com/"
            meta="2014-2017"
          >
            <Paragraph>
              As a UI Engineer on the design team, I maintained{" "}
              <Link
                to="https://github.com/optimizely/oui"
                title="Optimizely User Interface"
              >
                OUI
              </Link>, our UI library, and built design systems that improved UI
              consistency and developer productivity.
            </Paragraph>
          </Item>
        </ArticleList>
      </Section>
    </div>
  );
};

export default IndexPage;

IndexPage.propTypes = {
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

IndexPage.defaultProps = {
  data: {}
};

export const pageQuery = graphql`
  query Index {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
    ) {
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
