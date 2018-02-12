import React from "react";
import PropTypes from "prop-types";
import GatsbyLink from "gatsby-link";
import isRelativeUrl from "is-relative-url";

const Link = props => {
  if (props.to && isRelativeUrl(props.to)) {
    return <GatsbyLink {...props}>{props.children}</GatsbyLink>;
  }

  return (
    <a href={props.to} title={props.title} {...props}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  to: PropTypes.string.isRequired
};

Link.defaultProps = {
  title: undefined
};

export default Link;
