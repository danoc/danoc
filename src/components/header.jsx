import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const Header = props => (
  <header className="mb5">
    <h1 className={props.isSinglePost ? "f3" : "f2"}>
      <Link className="dark-gray hover-mid-gray link" to="/" rel="author">
        {props.title}
      </Link>
    </h1>
    {props.children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isSinglePost: PropTypes.bool,
};

Header.defaultProps = {
  title: "Daniel O&#8217;Connor",
  children: undefined,
  isSinglePost: false,
};

export default Header;
