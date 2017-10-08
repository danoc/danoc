import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../styles/";
import Link from "../components/link";

const LI = styled.li`
  max-width: ${s.measure};
  margin-bottom: ${s.spacing3};
`;

const H3 = styled.h3`
  font-size: ${s.fontSize5};
  display: inline;
  font-weight: 400;
`;

const Meta = styled.span`
  color: ${s.gray};
  font-weight: 300;
`;

const ArticleListItem = ({ to, children, date }) => (
  <LI>
    <H3>
      <Link to={to}>{children}</Link>
    </H3>
    {date && <Meta> – {date}</Meta>}
  </LI>
);

ArticleListItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string
};

ArticleListItem.defaultProps = {
  date: undefined
};

export default ArticleListItem;
