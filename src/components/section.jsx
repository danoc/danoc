import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isString } from "lodash";
import Link from "./link";
import * as s from "../styles";

const SectionTitle = styled.span`
  color: ${s.darkGray};
  font-size: ${s.f4};
  text-decoration: none;
  padding-bottom: ${s.s3};
  border-bottom: 1px solid ${s.lightGray};
  display: block;

  &:hover {
    background: none;
    box-shadow: none;
    color: inherit;
  }
`;

const SectionTitleLink = SectionTitle.withComponent(Link);

const ViewMoreLink = styled(Link)`
  font-size: ${s.f6};
  color: ${s.gray};
  display: inline-block;
  text-transform: uppercase;
  text-decoration: none;
  margin-top: ${s.s3};
`;

const Container = styled.section`
  margin-bottom: ${s.s5};
`;

const H2 = styled.h2`
  margin-top: ${s.s0};
  margin-bottom: ${s.s3};
`;

const Section = props => (
  <Container
    id={
      isString(props.title)
        ? props.title.replace(/\s+/g, "-").toLowerCase()
        : null
    }
  >
    <H2>
      {props.to ? (
        <SectionTitleLink to={props.to} title={props.callToAction}>
          {props.title}
        </SectionTitleLink>
      ) : (
        <SectionTitle>{props.title}</SectionTitle>
      )}
    </H2>

    {props.children}

    {props.to &&
      props.callToAction && (
        <ViewMoreLink to={props.to}>{props.callToAction} →</ViewMoreLink>
      )}
  </Container>
);

Section.propTypes = {
  to: PropTypes.string,
  callToAction: PropTypes.string,
  title: PropTypes.node.isRequired,
  children: PropTypes.node
};

Section.defaultProps = {
  to: undefined,
  callToAction: undefined,
  children: undefined
};

export default Section;
