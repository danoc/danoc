import React from "react";
import PropTypes from "prop-types";

const BulletList = props => <ul className="pl1">{props.children}</ul>;

export default BulletList;

BulletList.propTypes = {
  children: PropTypes.string.isRequired,
};
