import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../components/header";
import * as s from "../styles/";

const Post = styled.div`
  * {
    max-width: ${s.measureWide};
  }
`;

const HeaderSection = styled(Header)`margin-bottom: ${s.spacing6};`;

const BlogContainer = ({ children }) => (
  <div>
    <HeaderSection title="Daniel O&#8217;Connor" />
    <Post>{children}</Post>
  </div>
);

BlogContainer.propTypes = {
  children: PropTypes.node
};

BlogContainer.defaultProps = {
  children: undefined
};

export default BlogContainer;
