import NextLink from "next/link";
import cx from "classnames";
import isRelativeUrl from "is-relative-url";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function Link({ children, href, className }: LinkProps) {
  if (!isRelativeUrl(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a className={className}>{children}</a>
    </NextLink>
  );
}

export function DottedLink({ children, href, className }: LinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        className,
        "no-underline border-b border-dotted border-current",
      )}
    >
      {children}
    </Link>
  );
}
