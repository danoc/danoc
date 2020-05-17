import NextLink from "next/link";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  as?: string;
}

const Link = ({ to, as, ...rest }: LinkProps): JSX.Element => (
  <NextLink href={to} as={as} passHref>
    <a {...rest} />
  </NextLink>
);

export default Link;
