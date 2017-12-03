import React from "react";
import PropTypes from "prop-types";
import Link from "../components/link";

const ArticleListItem = ({ to, children, date }) => (
  <li className="measure mb2 lh-copy">
    <h3 className="f5 di fw4">
      <Link to={to}>{children}</Link>
    </h3>
    {date && <span className="gray fw3"> – {date}</span>}
  </li>
);

ArticleListItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string,
};

ArticleListItem.defaultProps = {
  date: undefined,
};

export default ArticleListItem;
