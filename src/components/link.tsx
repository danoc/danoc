import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isRelativeUrl from "is-relative-url";
import * as s from "../styles";

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

const css = {
  color: s.darkGray,
  fontWeight: 500,
  textDecoration: "none",
  borderBottom: `1px dotted red`,

  ":focus": {
    outline: `1px dotted currentColor`,
  },

  // :hover {
  //   color: ${s.darkBlue};
  //   border-radius: 1px;
  //   background: rgba(0, 91, 159, 0.05) none repeat scroll 0% 0%;
  //   box-shadow: rgba(0, 91, 159, 0.05) 0px 0px 0px 4px;
  // }

  // :active {
  //   color: ${s.darkGray};
  // }
};

const Link = (props: LinkProps) => {
  const { to, children } = props;

  if (to && isRelativeUrl(to)) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <GatsbyLink {...props} css={css}>
        {props.children}
      </GatsbyLink>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to} {...props} css={css}>
      {children}
    </a>
  );
};

export default Link;
