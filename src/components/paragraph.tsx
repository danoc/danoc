import React from "react";
import * as s from "../styles";

type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: ParagraphProps) => (
  <p css={{ marginTop: s.s0, maxWidth: s.measure, lineHeight: s.lhCopy }}>
    {children}
  </p>
);

export default Paragraph;
