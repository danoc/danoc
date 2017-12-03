import React from "react";
import PropTypes from "prop-types";
import Link from "../components/link";

const Experience = ({ children, to, title, meta }) => (
  <li className="mb4">
    <div className="gray f6 fw3 ttu mb1 tracked">{meta}</div>
    <h3 className="f5 mv1 fw5 measure lh-copy">
      <Link to={to}>{title}</Link>
    </h3>
    {children}
  </li>
);

Experience.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
};

export default Experience;
