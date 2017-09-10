import React from "react";
import styled, { css } from "styled-components";
import * as s from "../styles/";
import Link from "gatsby-link";

const Container = styled.section`
  ul,
  ol {
    padding-left: 0;
  }
`;

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
    color: ${s.nearBlack};
  }
`;

const ViewMoreLink = styled(Link)`
  color: ${s.gray};
  font-weight: 500;
  font-size: ${s.fontSize6};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: ${s.tracked};
`;

const SectionHeadingText = styled.span`${sectionHeading};`;

const Section = props => (
  <Container className={props.className}>
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
      <ViewMoreLink to={props.to}>{props.callToAction}</ViewMoreLink>
    )}
  </Container>
);

export default Section;
