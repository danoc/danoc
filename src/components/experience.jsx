import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../styles/";
import Link from "../components/link";

const Experience = ({ children, to, title, meta }) => {
  const LI = styled.li`
    margin-bottom: ${s.spacing5};
  `;

  const H3 = styled.h3`
    font-size: ${s.fontSize5};
    margin-top: ${s.spacing1};
    margin-bottom: ${s.spacing2};
    font-weight: 500;
    max-width: ${s.measure};
  `;

  const Description = styled.div`
    max-width: ${s.measure};
  `;

  const Meta = styled.div`
    color: ${s.gray};
    font-size: ${s.fontSize6};
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: ${s.spacing2};
    letter-spacing: ${s.tracked};
  `;

  return (
    <LI>
      <Meta>{meta}</Meta>
      <H3>
        <Link to={to}>{title}</Link>
      </H3>
      <Description>{children}</Description>
    </LI>
  );
};

Experience.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired
};

export default Experience;
