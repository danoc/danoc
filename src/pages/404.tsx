import React from "react";
import Helmet from "react-helmet";
import { graphql, Link as GatsbyLink } from "gatsby";
import Container from "../components/container";
import Link from "../components/link";
import * as s from "../styles";
import Section from "../components/section";
import PageTitle from "../components/page-title";
import Paragraph from "../components/paragraph";

const FourOhFourPage = () => (
  <Container title="404" header="condensed">
    <Section>
      <div css={{ marginBottom: s.s4 }}>
        <PageTitle as="h2">🙈 Whoops!</PageTitle>
      </div>
      <Paragraph>You found a page that doesn't exist.</Paragraph>
      <Paragraph>Here are a few options:</Paragraph>
      <ul>
        <li css={{ marginTop: s.s2, marginBottom: s.s2 }}>
          <Link to="/">Go to homepage</Link>
        </li>
        <li css={{ marginTop: s.s2, marginBottom: s.s2 }}>
          <Link to="/blog">View all of my blog posts</Link>
        </li>
        <li css={{ marginTop: s.s2, marginBottom: s.s2 }}>
          <Link to="https://twitter.com/_danoc">Message me on Twitter</Link>
        </li>
      </ul>
    </Section>
  </Container>
);

export default FourOhFourPage;
