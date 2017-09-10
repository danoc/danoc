import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GatsbyLink from "gatsby-link";
import isRelativeUrl from "is-relative-url";
import * as s from "../styles/";

const LinkRelative = styled(GatsbyLink)`
  color: ${s.blue};
  transition: color 0.05s ease-in;

  &:hover {
    color: ${s.darkBlue};
  }

  &:active {
    color: ${s.red};
  }
`;
const LinkAbsolute = LinkRelative.withComponent("a");

const Link = props => {
  if (isRelativeUrl(props.to)) {
    return (
      <LinkRelative
        to={props.to}
        title={props.title}
        className={props.className}
      >
        {props.children}
      </LinkRelative>
    );
  }

  return (
    <LinkAbsolute
      href={props.to}
      title={props.title}
      className={props.className}
    >
      {props.children}
    </LinkAbsolute>
  );
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};

Link.defaultProps = {
  title: undefined,
  className: undefined
};

export default Link;
