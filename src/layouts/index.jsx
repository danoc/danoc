import React from "react";
import PropTypes from "prop-types";
import styled, { injectGlobal } from "styled-components";
import Helmet from "react-helmet";
import Link from "../components/link";
import * as s from "../styles/";

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    font-size: 1.063em;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: ${s.darkGray};
    line-height: ${s.paragraphLineHeight};
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  ::selection { background: ${s.lightRed}; color: ${s.nearWhite}; }
`;

const Container = styled.div`
  padding: ${s.spacing6} ${s.spacing7};

  @media (max-width: 770px) {
    padding: ${s.spacing5};
  }
`;

const Footer = styled.footer`
  display: flex;
  padding-top: ${s.spacing4};
  border-top: 1px solid ${s.lightGray};
  max-width: ${s.measure};
  margin-top: ${s.spacing6};
`;

const FooterLink = styled(Link)`
  &:not(:last-child) {
    margin-right: ${s.spacing4};
  }
`;

const IndexLayout = ({ children }) => (
  <Container>
    <Helmet
      title="Daniel O'Connor"
      meta={[
        { name: "og:title", content: "Daniel O'Connor" },
        { name: "og:type", content: "website" },
        { name: "theme-color", content: s.darkGray }
      ]}
      htmlAttributes={{
        lang: "en"
      }}
    />
    {children()}
    <Footer>
      <FooterLink to="mailto:daniel@danoc.me">daniel@danoc.me</FooterLink>
      <FooterLink to="https://twitter.com/_danoc">Twitter</FooterLink>
    </Footer>
  </Container>
);

IndexLayout.propTypes = {
  children: PropTypes.func
};

IndexLayout.defaultProps = {
  children: undefined
};

export default IndexLayout;
