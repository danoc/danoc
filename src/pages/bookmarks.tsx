import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { groupBy, map, keys, sortBy, reverse } from "lodash";
import Container from "../components/container";
import Link from "../components/link";
import * as s from "../styles";

const getUrl = (url: string) => new URL(url).hostname.replace("www.", "");

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
  <section css={{ marginBottom: s.s6 }}>{children}</section>
);

type SectionTitleProps = {
  children: string;
  description: string;
  emoji: string;
};

const SectionTitle = ({ children, description, emoji }: SectionTitleProps) => (
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
  </div>
);

type SectionListProps = {
  children: React.ReactNode;
};

const SectionList = ({ children }: SectionListProps) => (
  <ul
    css={{
      listStyle: "none",
      paddingLeft: s.s0,
      marginTop: s.s0,
      marginBottom: s.s3,
    }}
  >
    {children}
  </ul>
);

type SectionListItemProps = {
  children: React.ReactNode;
  to: string;
};

const SectionListItem = ({ children, to }: SectionListItemProps) => (
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

type SectionListItemTitleProps = {
  children: string;
};

const SectionListItemTitle = ({ children }: SectionListItemTitleProps) => (
  <span
    css={{
      marginBottom: s.s1,
      display: "block",
    }}
  >
    {children}
  </span>
);

type SectionListItemDescriptionProps = {
  children: string;
};

const SectionListItemDescription = ({
  children,
}: SectionListItemDescriptionProps) => (
  <span
    css={{
      color: s.gray,
      display: "block",
      fontSize: s.f6,
    }}
  >
    {children}
  </span>
);

type IndexPageProps = {
  data: {
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

const IndexPage = ({ data }: IndexPageProps) => (
  <Container>
    <header css={{ marginBottom: s.s6 }}>
      <GatsbyLink to="/" css={{ color: "inherit", textDecoration: "inherit" }}>
        <h1 css={{ fontSize: "1.6rem", marginTop: s.s0, marginBottom: s.s3 }}>
          Daniel O’Connor
        </h1>
      </GatsbyLink>
    </header>

    <Section>
      <SectionTitle description="Articles and videos I like sharing" emoji="📖">
        Bookmarks
      </SectionTitle>
      <SectionList>
        {data.allPinboardBookmark.edges.map(({ node }) => (
          <SectionListItem to={node.href} key={node.href}>
            <SectionListItemTitle>{node.description}</SectionListItemTitle>
            <SectionListItemDescription>
              {getUrl(node.href)}
            </SectionListItemDescription>
          </SectionListItem>
        ))}
      </SectionList>
    </Section>
  </Container>
);

export default IndexPage;

export const pageQuery = graphql`
  query Bookmarks {
    allPinboardBookmark {
      edges {
        node {
          href
          description
        }
      }
    }
  }
`;
