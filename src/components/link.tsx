import React from "react";
import isRelativeUrl from "is-relative-url";
import * as s from "../../styles";

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export const css = {
  color: s.darkGray,
  textDecoration: "none",
  borderBottom: `1px dotted ${s.darkGray}`,

  ":focus": {
    outline: `1px dotted currentColor`,
  },
};

const Link = (props: LinkProps) => {
  const { to, children } = props;

  if (to && isRelativeUrl(to)) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <a {...props} css={css}>
        {props.children}
      </a>
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
