import React from "react";
import PropTypes from "prop-types";
import styled, { injectGlobal } from "styled-components";
import Helmet from "react-helmet";
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

  ::selection { background: ${s.lightRed}; color: white; }
`;

const Container = styled.div`
  padding: ${s.spacing6} ${s.spacing7};

  @media (max-width: 700px) {
    padding: ${s.spacing5};
  }
`;

const IndexLayout = ({ children }) => (
  <Container>
    <Helmet
      title="Daniel O'Connor"
      meta={[
        { name: "og:title", content: "Daniel O'Connor" },
        { name: "og:type", content: "website" }
      ]}
      htmlAttributes={{
        lang: "en"
      }}
    />
    {children()}
  </Container>
);

IndexLayout.propTypes = {
  children: PropTypes.func
};

IndexLayout.defaultProps = {
  children: undefined
};

export default IndexLayout;
