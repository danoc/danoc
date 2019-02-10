import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import isRelativeUrl from "is-relative-url";

const Link = props => {
  const { to, children, title } = props;

  if (to && isRelativeUrl(to)) {
    return <GatsbyLink {...props}>{props.children}</GatsbyLink>;
  }

  return (
    <a href={to} title={title} {...props}>
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  title: undefined,
};

export default Link;
