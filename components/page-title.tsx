/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as s from "../styles";

type PageTitleProps = {
  as: "h1" | "h2";
  children: string;
  id?: string;
  itemProp?: React.HTMLAttributes<HTMLHeadingElement>["itemProp"];
};

const PageTitle = ({ as, id, children }: PageTitleProps) => {
  const Element = as;

  return (
    <Element
      css={{
        fontSize: "1.6rem",
        marginTop: s.s0,
        marginBottom: s.s0,
        "@media (min-width: 400px)": {
          fontSize: "2rem",
          lineHeight: 1.2,
        },
      }}
      id={id}
    >
      {children}
    </Element>
  );
};

export default PageTitle;
