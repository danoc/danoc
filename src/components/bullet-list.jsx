import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Link from "./link";
import * as s from "../styles";

const UL = styled.ul`
  margin-top: ${s.s0};
  margin-bottom: ${s.s0};
  padding-left: ${props => (props.hasDescriptions ? s.s0 : s.s1)};

  ${props =>
    props.hasDescriptions &&
    css`
      list-style: none;
    `};
`;

const H3 = styled.h3`
  font-size: ${s.f5};
  font-weight: ${props => (props.hasDescriptions ? 500 : 400)};
  margin-top: ${s.s0};
  margin-bottom: ${s.s0};
  flex: 1;
  line-height: ${s.lhTitle};
`;

const Meta = styled.span`
  color: ${s.gray};
  display: block;
  text-align: right;
  font-size: ${s.f6};
  margin-left: ${s.s3};
`;

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${s.s2};
`;

const BulletList = props => (
  <UL hasDescriptions={props.hasDescriptions}>
    {props.items.map(item => (
      <li key={item.to}>
        <Row>
          <H3 hasDescriptions={props.hasDescriptions}>
            <Link to={item.to}>{item.title}</Link>
          </H3>
          {item.meta && <Meta>{item.meta}</Meta>}
        </Row>
        {item.children}
      </li>
    ))}
  </UL>
);

export default BulletList;

BulletList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      meta: PropTypes.string,
      children: PropTypes.node
    })
  ).isRequired,
  hasDescriptions: PropTypes.bool
};

BulletList.defaultProps = {
  hasDescriptions: false
};
