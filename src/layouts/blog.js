import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as s from "../styles/";

const Header = styled.header`
  border-bottom: 1px solid ${s.moonGray};

  a {
    text-decoration: none;
  }
`;

const HeaderContainer = styled.div`
  max-width: ${s.maxWidth8};
  margin-left: auto;
  margin-right: auto;
`;

const ContentContainer = styled.div`
  background-color: ${s.nearWhite};
  padding: 3em 1.5em;
`;

const Content = styled.div`
  max-width: ${s.measureWide};
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: ${s.fontSize3};
  color: ${s.darkGray};
`;

const BlogContainer = ({ children }) => (
  <div>
    <Header>
      <HeaderContainer>
        <Link to="/">
          <Title>Daniel O'Connor</Title>
        </Link>
      </HeaderContainer>
    </Header>
    <ContentContainer>
      <Content>{children}</Content>
    </ContentContainer>
  </div>
);

BlogContainer.propTypes = {
  children: PropTypes.node
};

export default BlogContainer;
