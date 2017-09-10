import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../styles/";
import SectionComponent from "../components/section";
import Experience from "../components/experience";
import Link from "../components/link";

const Container = styled.div`
  padding: ${s.spacing6};

  @media (max-width: 700px) {
    padding: ${s.spacing5};
  }
`;

const Title = styled.h1`font-size: ${s.fontSize3};`;

const Footer = styled.footer`
  display: flex;
  padding-top: ${s.spacing4};
  border-top: 1px solid ${s.lightGray};
  max-width: ${s.measure};
`;

const FooterLink = styled(Link)`
  &:not(:last-child) {
    margin-right: ${s.spacing4};
  }
`;

const Paragraph = styled.p`
  color: ${s.midGray};
  max-width: ${s.measure};

  :first-of-type {
    margin-top: ${s.spacing1};
  }
`;

const Section = styled(SectionComponent)`margin-bottom: ${s.spacing6};`;

const Header = Section.withComponent("header");

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Container>
      <Header>
        <Title>Daniel O&#8217;Connor</Title>
        <Paragraph>Hello! I’m a UI Engineer living in San Francisco.</Paragraph>
        <Paragraph>
          I build design systems to efficiently deliver high quality products.
          I’m a stickler for consistency and help bridge the gap between design
          and development.
        </Paragraph>
      </Header>

      <Section title="Posts" to="/blog/" callToAction="View More Posts">
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

      <Section title="Work">
        <ul>
          <Experience
            title="Thumbtack"
            to="https://www.thumbtack.com/"
            meta="2017-Present"
          >
            <Paragraph>
              I build out our design system, Thumbprint UI, and assist our
              engineering team with the move to React.
            </Paragraph>
          </Experience>
          <Experience
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
          </Experience>
        </ul>
      </Section>

      <Footer>
        <FooterLink to="mailto:daniel@danoc.me">daniel@danoc.me</FooterLink>
        <FooterLink to="https://twitter.com/_danoc">Twitter</FooterLink>
      </Footer>
    </Container>
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
