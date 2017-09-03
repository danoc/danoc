import React from "react";
import styled from "styled-components";
import * as s from "../styles/";
import Link from "gatsby-link";

const Container = styled.section`
  ul,
  ol {
    padding-left: 0;
  }
`;

const SectionHeading = styled.h2`
  font-size: ${s.fontSize3};
  padding-bottom: ${s.titleMarginBottom};
  border-bottom: 1px solid ${s.lightGray};

  a {
    color: ${s.darkGray};
    text-decoration: none;
  }
`;

const Section = props => (
  <Container className={props.className}>
    <SectionHeading>
      {props.href ? (
        <Link to={props.href}>{props.title}</Link>
      ) : (
        <span>{props.title}</span>
      )}
    </SectionHeading>
    {props.children}
  </Container>
);

export default Section;
