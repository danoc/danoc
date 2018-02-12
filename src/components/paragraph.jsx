import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../styles";

const Paragraph = styled.p`
  margin-top: ${s.s0};
  max-width: ${s.measure};
  line-height: ${s.lhCopy};
`;

export default Paragraph;

Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};
