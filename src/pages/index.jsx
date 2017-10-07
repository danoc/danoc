import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as s from "../styles/";
import SectionComponent from "../components/section";
import Experience from "../components/experience";
import Link from "../components/link";
import Header from "../components/header";
import PostCard from "../components/post-card";
import Paragraph from "../components/paragraph";
import ArticleList from "../components/article-list";

const Item = styled(Experience)`
  margin-bottom: ${props => (props.children ? s.spacing5 : s.spacing4)};
`;

const sectionMargin = css`
  margin-bottom: ${s.spacing6};
`;
const Section = styled(SectionComponent)`
  ${sectionMargin};
`;
const HeaderSection = styled(Header)`
  ${sectionMargin};
`;

const CardList = styled(ArticleList)`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(${s.maxWidth5}, 1fr));
`;

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

      <Section title="Featured Posts" to="/blog/" callToAction="View All Posts">
        <CardList>
          {posts.map(({ node: post }) => {
            const { frontmatter } = post;
            const image = {
              alt: frontmatter.image_alt,
              data: frontmatter.image_src.childImageSharp.responsiveSizes
            };

            return (
              <PostCard
                to={frontmatter.path}
                key={frontmatter.path}
                image={{
                  alt: image.alt,
                  src: image.data.src,
                  srcSet: image.data.srcSet,
                  sizes: image.data.sizes
                }}
                date={frontmatter.date}
              >
                {frontmatter.title}
              </PostCard>
            );
          })}
        </CardList>
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
      limit: 4
      filter: { frontmatter: { is_featured: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            image_alt
            image_src {
              childImageSharp {
                responsiveSizes {
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
