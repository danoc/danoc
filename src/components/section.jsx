import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Link from "gatsby-link";
import * as s from "../styles/";

const sectionHeading = css`
  display: block;
  font-size: ${s.fontSize5};
  padding-bottom: ${s.titleMarginBottom};
  border-bottom: 1px solid ${s.lightGray};
  max-width: ${s.measure};
  font-weight: 600;
`;

const SectionHeadingAnchor = styled(Link)`
  ${sectionHeading};
  color: ${s.darkGray};
  text-decoration: none;

  &:hover {
    color: ${s.midGray};
  }
`;

const ViewMoreLink = styled(Link)`
  display: inline-block;
  padding: ${s.spacing4} ${s.spacing2};
  color: ${s.gray};
  font-size: ${s.fontSize6};
  font-weight: 200;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: ${s.tracked};
`;

const SectionHeadingText = styled.span`
  ${sectionHeading};
`;

const Section = props => (
  <section className={props.className}>
    <h2>
      {props.to ? (
        <SectionHeadingAnchor to={props.to} title={props.callToAction}>
          {props.title}
        </SectionHeadingAnchor>
      ) : (
        <SectionHeadingText>{props.title}</SectionHeadingText>
      )}
    </h2>
    {props.children}

    {props.to &&
      props.callToAction && (
        <ViewMoreLink to={props.to}>{props.callToAction} →</ViewMoreLink>
      )}
  </section>
);

Section.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  callToAction: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

Section.defaultProps = {
  className: undefined,
  to: undefined,
  callToAction: undefined,
  children: undefined
};

export default Section;
