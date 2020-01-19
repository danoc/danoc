import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import * as s from "../styles";
import PageTitle from "../components/page-title";
import Section, {
  SectionList,
  SectionListItem,
  SectionListItemTitle,
  SectionListItemDescription,
} from "../components/section";
import getUrlHostname from "../utils/get-url-hostname";

type BookmarksPageProps = {
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

const BookmarksPage = ({ data }: BookmarksPageProps) => (
  <Container header="condensed">
    <Section>
      <PageTitle as="h2">Bookmarks</PageTitle>
      <p
        css={{
          marginBottom: s.s5,
          marginTop: s.s2,
          fontSize: s.f5,
          color: s.gray,
        }}
      >
        Articles and videos I like sharing
      </p>

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
    </Section>
  </Container>
);

export default BookmarksPage;

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
