import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../components/header";
import * as s from "../styles/";

const HeaderSection = styled(Header)`margin-bottom: ${s.spacing6};`;

const BlogContainer = ({ children }) => (
  <div>
    <HeaderSection title="Daniel O&#8217;Connor" />
    {children}
  </div>
);

BlogContainer.propTypes = {
  children: PropTypes.node
};

BlogContainer.defaultProps = {
  children: undefined
};

export default BlogContainer;
