import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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

Experience.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  meta: PropTypes.string,
  to: PropTypes.string
};

Experience.defaultProps = {
  children: undefined,
  meta: undefined,
  to: undefined
};

export default Experience;
