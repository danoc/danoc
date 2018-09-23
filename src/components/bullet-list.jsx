import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Link from "./link";
import * as s from "../styles";

const UL = styled.ul`
  margin-top: ${s.s0};
  margin-bottom: ${s.s0};
  padding-left: ${props => (props.hasDescriptions ? s.s0 : s.s1)};
  // Style for the bullets
  font-size: 14px;

  ${props => props.hasDescriptions && css`list-style: none;`};
`;

const ListWrapper = styled.div`font-size: ${s.s3};`;

const H3 = styled.h3`
  font-size: ${s.f5};
  font-weight: ${props => (props.hasDescriptions ? 500 : 400)};
  margin-top: ${s.s0};
  margin-bottom: ${s.s0};
  flex: 1;
  line-height: ${s.lhCopy};
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

const Description = styled.div`margin-bottom: ${s.s4};`;

const BulletList = props => {
  const { items, hasDescriptions } = props;
  return (
    <UL hasDescriptions={hasDescriptions}>
      {items.map(item => (
        <li key={item.to}>
          <ListWrapper>
            <Row>
              <H3 hasDescriptions={hasDescriptions}>
                <Link to={item.to}>{item.title}</Link>
              </H3>
              {item.meta && <Meta>{item.meta}</Meta>}
            </Row>
            {item.children && <Description>{item.children}</Description>}
          </ListWrapper>
        </li>
      ))}
    </UL>
  );
};

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
