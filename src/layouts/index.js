import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";
import * as s from "../styles/";

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
`;

const IndexLayout = ({ children }) => (
  <div>
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
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.func
};

export default IndexLayout;
