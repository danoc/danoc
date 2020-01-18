import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Link from "../components/link";
import * as s from "../styles";

type PProps = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: PProps) => (
  <p css={{ marginTop: s.s0, maxWidth: s.measure, lineHeight: s.lhCopy }}>
    {children}
  </p>
);

type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => (
  <section css={{ marginBottom: s.s5 }}>{children}</section>
);

type SectionTitleProps = {
  children: string;
  description?: string;
};

const SectionTitle = ({ children, description }: SectionTitleProps) => (
  <div
    css={{
      color: s.darkGray,
      display: "block",
      borderBottom: `1px solid ${s.lightGray}`,
      marginBottom: s.s2,
      paddingBottom: s.s3,
    }}
  >
    <h2
      css={{ marginTop: s.s0, marginBottom: s.s0, fontSize: s.f4 }}
      id={children}
    >
      {children}
    </h2>
    {description && (
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
    )}
  </div>
);

type SectionListLinkProps = {
  children: React.ReactNode;
  to: string;
};

const SectionListLink = ({ children, to }: SectionListLinkProps) => (
  <li key={to}>
    <Link
      to={to}
      css={{
        paddingTop: s.s2,
        paddingBottom: s.s2,
        display: "block",
        fontWeight: 400,
        borderBottom: "none",
      }}
    >
      {children}
    </Link>
  </li>
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
  };
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const IndexPage = ({ data }: IndexPageProps) => (
  <Container>
    <header css={{ marginBottom: s.s5 }}>
      <h1 css={{ fontSize: "1.4rem" }}>Daniel O’Connor</h1>
      <Paragraph>
        Hello! I’m a design systems engineer based in San Francisco. I use code
        and communication to improve product quality and developer productivity.
      </Paragraph>
      <Paragraph>
        Right now I build{" "}
        <Link to="https://thumbprint.design/">Thumbprint</Link>, the design
        system at <Link to="https://www.thumbtack.com/">Thumbtack</Link>. I
        previously worked at{" "}
        <Link to="https://www.optimizely.com/">Optimizely</Link> where I helped
        build and maintain{" "}
        <Link to="https://github.com/optimizely/oui">OUI</Link>, a React
        component library.
      </Paragraph>
    </header>

    <Section>
      <SectionTitle description="Thoughts and feelings on code and design">
        Writing
      </SectionTitle>
      <ul
        css={{
          listStyle: "none",
          paddingLeft: s.s0,
          marginTop: s.s0,
          marginBottom: s.s0,
        }}
      >
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <SectionListLink
            to={node.frontmatter.path}
            key={node.frontmatter.path}
          >
            <span
              css={{
                marginBottom: s.s1,
                display: "block",
                fontWeight: 500,
              }}
            >
              {node.frontmatter.title}
            </span>
            <span
              css={{
                color: s.gray,
                display: "block",
                fontSize: s.f6,
              }}
            >
              {formatDate(node.frontmatter.date)}
            </span>
          </SectionListLink>
        ))}
      </ul>
    </Section>
    <Section>
      <SectionTitle description="Articles and videos that I enjoy sharing">
        Bookmarks
      </SectionTitle>
      <p></p>
      <ul
        css={{
          listStyle: "none",
          paddingLeft: s.s0,
          marginTop: s.s0,
          marginBottom: s.s0,
        }}
      >
        {data.allPinboardBookmark.edges.map(({ node }) => (
          <SectionListLink to={node.href} key={node.href}>
            <span
              css={{
                marginBottom: s.s1,
                display: "block",
                fontWeight: 500,
              }}
            >
              {node.description}
            </span>
            <span
              css={{
                color: s.gray,
                display: "block",
                fontSize: s.f6,
              }}
            >
              {node.href}
            </span>
          </SectionListLink>
        ))}
      </ul>
    </Section>
  </Container>
);

export default IndexPage;

export const pageQuery = graphql`
  query Index {
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
