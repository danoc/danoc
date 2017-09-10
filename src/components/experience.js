import React from "react";
import styled, { css } from "styled-components";
import Link from "../components/link";
import * as s from "../styles/";

const Article = styled.li`
  margin-bottom: ${props => (props.hasDescription ? s.spacing5 : s.spacing1)};
`;

const Meta = styled.div`
  color: ${s.gray};
  font-size: ${s.fontSize6};
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: ${s.spacing1};
  letter-spacing: ${s.tracked};
`;

const Title = styled.h3`
  font-size: ${s.fontSize5};
  margin-top: ${s.spacing1};
  margin-bottom: ${s.spacing2};
  font-weight: ${props => (props.hasDescription ? 500 : 400)};
`;

const Experience = props => (
  <Article hasDescription={!!props.children}>
    <Meta>{props.meta}</Meta>
    <Title hasDescription={!!props.children}>
      {props.to ? (
        <Link to={props.to}>{props.title}</Link>
      ) : (
        <span>{props.title}</span>
      )}
    </Title>
    {props.children}
  </Article>
);

export default Experience;
