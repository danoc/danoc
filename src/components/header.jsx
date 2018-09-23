import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import * as s from "../styles";

const StyledLink = styled(Link)`
  color: ${s.darkGray};
  text-decoration: none;

  &:hover {
    background: none;
    box-shadow: none;
    color: inherit;
  }
`;

const Title = styled.h1`
  font-size: ${props => (props.isSinglePost ? s.f4 : s.f2)};
  line-height: ${s.lhTitle};
`;

const Container = styled.header`
  margin-bottom: ${s.s5};
`;

const Header = props => (
  <Container>
    <Title isSinglePost={props.isSinglePost}>
      <StyledLink to="/" rel="author">
        Daniel O&#8217;Connor
      </StyledLink>
    </Title>
    {props.children}
  </Container>
);

Header.propTypes = {
  children: PropTypes.node,
  isSinglePost: PropTypes.bool
};

Header.defaultProps = {
  children: undefined,
  isSinglePost: false
};

export default Header;
