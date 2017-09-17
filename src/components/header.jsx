import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import * as s from "../styles/";

const Title = styled.h1`font-size: ${s.fontSize3};`;

const HeaderLink = styled(Link)`
  color: ${s.darkGray};
  text-decoration: none;

  &:hover {
    color: ${s.midGray};
  }
`;

const Header = props => (
  <header className={props.className}>
    <Title>
      <HeaderLink to="/" rel="author" itemProp="publisher">
        {props.title}
      </HeaderLink>
    </Title>
    {props.children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

Header.defaultProps = {
  title: "Daniel O&#8217;Connor",
  children: undefined,
  className: undefined
};

export default Header;
