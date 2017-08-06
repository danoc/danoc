import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const TemplateWrapper = ({ children }) =>
  <Container>
    <Helmet
      title="Daniel O'Connor"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    {children()}
  </Container>;

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
