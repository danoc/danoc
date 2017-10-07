import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as s from "../styles/";
import Link from "../components/link";

const StyledCard = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  ${props =>
    props.isClickable &&
    css`
      &:hover {
        border-color: ${s.moonGray};
      }

      &:active {
        border-color: ${s.red};
      }
    `};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Card = props => {
  if (props.to) {
    return (
      <StyledLink to={props.to}>
        <StyledCard className={props.className} isClickable>
          {props.children}
        </StyledCard>
      </StyledLink>
    );
  }

  return <StyledCard className={props.className}>{props.children}</StyledCard>;
};

Card.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  /**
   * Contents within the Card
   */
  children: PropTypes.node
};

Card.defaultProps = {
  to: null,
  className: null,
  children: null
};

export default Card;
