import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Section from "../components/section";
import Link from "../components/link";
import Layout from "../components/layout";
import Header from "../components/header";
import Paragraph from "../components/paragraph";
import BulletList from "../components/bullet-list";
import months from "../utils/months";

const formatDate = dateString => {
  const date = new Date(dateString);
  return `${months[date.getMonth()]}. ${date.getFullYear()}`;
};

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const bookmarks = data.allPinboardBookmark.edges;

  return (
    <Layout>
      <Header>
        <Paragraph>
          Hello! I’m a design systems engineer based in San Francisco. I use
          code and communication to improve product quality and developer
          productivity.
        </Paragraph>
        <Paragraph>
          Right now I build{" "}
          <Link to="https://thumbprint.design/">Thumbprint</Link>, the design
          system at <Link to="https://www.thumbtack.com/">Thumbtack</Link>. I
          previously worked at{" "}
          <Link to="https://www.optimizely.com/">Optimizely</Link> where I
          helped build and maintain{" "}
          <Link to="https://github.com/optimizely/oui">OUI</Link>.
        </Paragraph>
      </Header>

      <Section title="Writing" to="/blog/" callToAction="View all posts">
        <BulletList
          items={posts.map(p => ({
            to: p.node.frontmatter.path,
            title: p.node.frontmatter.title,
            meta: formatDate(p.node.frontmatter.date),
          }))}
        />
      </Section>

      <Section title="Work">
        <BulletList
          hasDescriptions
          items={[
            {
              title: "Thumbtack",
              to: "https://www.thumbtack.com/",
              meta: "2017–Present",
              children: (
                <>
                  <Paragraph>
                    I work on{" "}
                    <Link to="https://github.com/thumbtack/thumbprint">
                      Thumbprint
                    </Link>
                    , the cross-platform design system at Thumbtack.
                  </Paragraph>
                  <Paragraph>
                    While I’ve worked on all parts of the system, I tend to
                    focus on our web and native UI components, design tokens,
                    documentation site, and infrastructure.
                  </Paragraph>
                  <Paragraph>
                    I also spend a lot of time helping folks contribute,
                    gathering user feedback, and thinking about our team’s
                    roadmap.
                  </Paragraph>
                </>
              ),
            },
            {
              title: "Optimizely",
              to: "https://www.optimizely.com/",
              meta: "2014–2017",
              children: (
                <Paragraph>
                  As a UI Engineer on the design team, I maintained{" "}
                  <Link
                    to="https://github.com/optimizely/oui"
                    title="Optimizely User Interface"
                  >
                    OUI
                  </Link>
                  , Optimizely’s UI library, and built design systems that
                  improved UI consistency and developer productivity.
                </Paragraph>
              ),
            },
          ]}
        />
      </Section>

      <Section
        title="Bookmarks"
        to="https://pinboard.in/u:danoc"
        callToAction="View all bookmarks"
      >
        <Paragraph>
          Collection of articles, videos, and talks that I enjoy sharing.
        </Paragraph>
        <BulletList
          items={bookmarks.map(p => ({
            to: p.node.href,
            title: p.node.description,
          }))}
        />
      </Section>
    </Layout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    allPinboardBookmark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        numWeeksOfRuns
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
      filter: { frontmatter: { is_featured: { eq: true } } }
    ) {
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
    allPinboardBookmark(limit: 3, filter: { shared: { eq: "yes" } }) {
      edges {
        node {
          href
          description
        }
      }
    }
  }
`;
