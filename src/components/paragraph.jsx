import styled from "styled-components";
import * as s from "../styles/";

const Paragraph = styled.p`
  color: ${s.midGray};
  max-width: ${s.measure};

  :first-of-type {
    margin-top: ${s.spacing1};
  }
`;

export default Paragraph;
