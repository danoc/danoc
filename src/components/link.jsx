import React from "react";
import PropTypes from "prop-types";
import GatsbyLink from "gatsby-link";
import isRelativeUrl from "is-relative-url";

const Link = props => {
  if (props.to && isRelativeUrl(props.to)) {
    return (
      <GatsbyLink
        to={props.to}
        title={props.title}
        className={`link ${props.className}`}
      >
        {props.children}
      </GatsbyLink>
    );
  }

  return (
    <a
      href={props.to}
      title={props.title}
      className={`link ${props.className}`}
    >
      {props.children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  title: undefined,
  className: "blue hover-dark-blue underline",
};

export default Link;
