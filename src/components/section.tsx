import React from "react";
import Link from "../components/link";
import * as s from "../styles";

type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => (
  <section css={{ marginBottom: s.s6 }}>{children}</section>
);

type SectionListProps = {
  children: React.ReactNode;
};

const SectionList = ({ children }: SectionListProps) => (
  <ul
    css={{
      listStyle: "none",
      paddingLeft: s.s0,
      marginTop: s.s0,
      marginBottom: s.s3,
    }}
  >
    {children}
  </ul>
);

type SectionListItemProps = {
  children: React.ReactNode;
  to: string;
};

const SectionListItem = ({ children, to }: SectionListItemProps) => (
  <li key={to}>
    <Link
      to={to}
      css={{
        paddingTop: s.s2,
        paddingBottom: s.s2,
        display: "block",
        fontWeight: 400,
        borderBottom: "none",
      }}
    >
      {children}
    </Link>
  </li>
);

type SectionListItemTitleProps = {
  children: string;
};

const SectionListItemTitle = ({ children }: SectionListItemTitleProps) => (
  <span
    css={{
      marginBottom: s.s1,
      display: "block",
    }}
  >
    {children}
  </span>
);

type SectionListItemDescriptionProps = {
  children: string;
  title?: string;
};

const SectionListItemDescription = ({
  children,
  title,
}: SectionListItemDescriptionProps) => (
  <span
    css={{
      color: s.gray,
      display: "block",
      fontSize: s.f6,
    }}
    title={title}
  >
    {children}
  </span>
);

export default Section;
export {
  SectionList,
  SectionListItem,
  SectionListItemTitle,
  SectionListItemDescription,
};
