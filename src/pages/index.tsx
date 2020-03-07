import React from "react";
import Helmet from "react-helmet";
import { graphql, Link as GatsbyLink } from "gatsby";
import Container from "../components/container";
import Link from "../components/link";
import * as s from "../styles";
import Section, {
  SectionList,
  SectionListItem,
  SectionListItemTitle,
  SectionListItemDescription,
} from "../components/section";
import getUrlHostname from "../utils/get-url-hostname";

type SectionTitleProps = {
  children: string;
  description: string;
  emoji: string;
  to: string;
};

const SectionTitle = ({
  children,
  description,
  emoji,
  to,
}: SectionTitleProps) => (
  <GatsbyLink
    css={{
      color: "inherit",
      display: "block",
      borderBottom: `1px solid ${s.lightGray}`,
      paddingBottom: s.s3,
      textDecoration: "inherit",
    }}
    to={to}
  >
    <h2
      css={{ marginTop: s.s0, marginBottom: s.s0, fontSize: s.f4 }}
      id={children}
    >
      <span css={{ marginRight: s.s1 }}>{emoji}</span> {children}
    </h2>
    <p
      css={{
        marginBottom: 0,
        marginTop: s.s2,
        fontSize: s.f6,
        color: s.gray,
      }}
    >
      {description}
    </p>
  </GatsbyLink>
);

type SectionListMoreLinkProps = {
  to: string;
  children: string;
};

const SectionListMoreLink = ({ to, children }: SectionListMoreLinkProps) => (
  <Link
    to={to}
    css={{
      fontWeight: 400,
      borderBottom: "none",
      fontSize: s.f6,
      paddingTop: s.s2,
      paddingBottom: s.s2,
      display: "inline-block",
      paddingRight: s.s1,
    }}
  >
    {children} <span css={{ color: s.gray, marginLeft: s.s1 }}>→</span>
  </Link>
);

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              title: string;
              date: string;
              formattedDate: string;
              path: string;
            };
          };
        },
      ];
    };
    allPinboardBookmark: {
      edges: [
        {
          node: {
            href: string;
            description: string;
          };
        },
      ];
    };
    site: {
      siteMetadata: {
        description: string;
      };
    };
  };
};

const IndexPage = ({ data }: IndexPageProps) => (
  <Container header="full">
    <Helmet>
      <meta name="description" content={data.site.siteMetadata.description} />
      <meta
        property="og:description"
        content={data.site.siteMetadata.description}
      />
    </Helmet>
    <Section>
      <SectionTitle
        description="Thoughts and feelings on code and design"
        emoji="📝"
        to="/blog"
      >
        Writing
      </SectionTitle>
      <SectionList>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <SectionListItem
            to={node.frontmatter.path}
            key={node.frontmatter.path}
          >
            <SectionListItemTitle>
              {node.frontmatter.title}
            </SectionListItemTitle>
            <SectionListItemDescription title={node.frontmatter.date}>
              {node.frontmatter.formattedDate}
            </SectionListItemDescription>
          </SectionListItem>
        ))}
      </SectionList>
      <SectionListMoreLink to="/blog">View all posts</SectionListMoreLink>
    </Section>
    <Section>
      <SectionTitle
        description="Articles and videos I like sharing"
        emoji="📖"
        to="/bookmarks"
      >
        Bookmarks
      </SectionTitle>
      <SectionList>
        {data.allPinboardBookmark.edges.map(({ node }) => (
          <SectionListItem to={node.href} key={node.href}>
            <SectionListItemTitle>{node.description}</SectionListItemTitle>
            <SectionListItemDescription>
              {getUrlHostname(node.href)}
            </SectionListItemDescription>
          </SectionListItem>
        ))}
      </SectionList>
      <SectionListMoreLink to="/bookmarks">
        View all bookmarks
      </SectionListMoreLink>
    </Section>
  </Container>
);

export default IndexPage;

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
            date
            formattedDate: date(formatString: "MMMM YYYY")
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
    site {
      siteMetadata {
        description
      }
    }
  }
`;
