import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { groupBy, map, keys, sortBy, reverse } from "lodash";
import Container from "../components/container";
import * as s from "../styles";
import PageTitle from "../components/page-title";
import Section, {
  SectionList,
  SectionListItem,
  SectionListItemTitle,
  SectionListItemDescription,
} from "../components/section";

type BlogPageProps = {
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

const BlogPage = ({ data }: BlogPageProps) => {
  const posts = data.allMarkdownRemark.edges;
  const postsByYear = groupBy(posts, p => p.node.frontmatter.year);
  const years = reverse(sortBy(keys(postsByYear)));

  return (
    <Container header="condensed">
      <Section>
        <PageTitle as="h2">Writing</PageTitle>
        <p
          css={{
            marginBottom: s.s5,
            marginTop: s.s2,
            fontSize: s.f5,
            color: s.gray,
          }}
        >
          Thoughts and feelings on code and design
        </p>

        {years.map(year => (
          <div css={{ marginBottom: s.s5 }}>
            <h3
              id={year}
              key={year}
              css={{
                fontSize: s.f5,
                marginTop: s.s4,
                marginBottom: s.s2,
                paddingBottom: s.s2,
                borderBottom: `1px solid ${s.lightGray}`,
              }}
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

export default BlogPage;

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
