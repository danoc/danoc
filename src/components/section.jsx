import React from "react";
import PropTypes from "prop-types";
import Link from "../components/link";

const sectionHeadingClasses = "db f4 pb2 bb b--light-gray measure fw6";

const Section = props => (
  <section className="mb5">
    <h2>
      {props.to ? (
        <Link
          className={`${sectionHeadingClasses} dark-gray hover-gray link`}
          to={props.to}
          title={props.callToAction}
        >
          {props.title}
        </Link>
      ) : (
        <span className={sectionHeadingClasses}>{props.title}</span>
      )}
    </h2>

    {props.children}

    {props.to &&
      props.callToAction && (
        <Link
          className="dib pv2 gray hover-dark-gray link f6 fw4 ttu tracked"
          to={props.to}
        >
          {props.callToAction} →
        </Link>
      )}
  </section>
);

Section.propTypes = {
  to: PropTypes.string,
  callToAction: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Section.defaultProps = {
  to: undefined,
  callToAction: undefined,
  children: undefined,
};

export default Section;
