import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { groupBy, map, keys, sortBy, reverse } from "lodash";
import Container from "../components/container";
import Link from "../components/link";
import * as s from "../styles";

const getUrl = (url: string) => new URL(url).hostname;

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
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              title: string;
              date: string;
              year: string;
              formattedDate: string;
              path: string;
            };
          };
        },
      ];
    };
  };
};

const IndexPage = ({ data }: IndexPageProps) => {
  const posts = data.allMarkdownRemark.edges;
  const postsByYear = groupBy(posts, p => p.node.frontmatter.year);
  const years = reverse(sortBy(keys(postsByYear)));

  return (
    <Container>
      <header css={{ marginBottom: s.s6 }}>
        <GatsbyLink
          to="/"
          css={{ color: "inherit", textDecoration: "inherit" }}
        >
          <h1 css={{ fontSize: "1.6rem", marginTop: s.s0, marginBottom: s.s3 }}>
            Daniel O’Connor
          </h1>
        </GatsbyLink>
      </header>

      <Section>
        <SectionTitle
          description="Thoughts and feelings on code and design"
          emoji="📝"
        >
          Writing
        </SectionTitle>
        {years.map(year => (
          <div css={{ marginBottom: s.s5 }}>
            <h3
              id={year}
              key={year}
              css={{ fontSize: s.f4, marginTop: s.s4, marginBottom: s.s2 }}
            >
              {year}
            </h3>
            <SectionList>
              {postsByYear[year].map(post => (
                <SectionListItem
                  to={post.node.frontmatter.path}
                  key={post.node.frontmatter.path}
                >
                  <SectionListItemTitle>
                    {post.node.frontmatter.title}
                  </SectionListItemTitle>
                  <SectionListItemDescription>
                    {post.node.frontmatter.formattedDate}
                  </SectionListItemDescription>
                </SectionListItem>
              ))}
            </SectionList>
          </div>
        ))}
      </Section>
    </Container>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query Blog {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            date
            year: date(formatString: "Y")
            formattedDate: date(formatString: "MMMM D")
            path
          }
        }
      }
    }
  }
`;
