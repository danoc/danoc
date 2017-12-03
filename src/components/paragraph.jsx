import React from "react";
import PropTypes from "prop-types";

const Paragraph = props => (
  <p className="mid-gray f5 lh-copy measure mt0">{props.children}</p>
);

export default Paragraph;

Paragraph.propTypes = {
  children: PropTypes.string.isRequired,
};
