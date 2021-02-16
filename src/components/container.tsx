import React from "react";
import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/react";

import { StaticQuery, graphql, Link as GatsbyLink } from "gatsby";
import Link from "./link";
import * as s from "../styles";

import UntitledSansMediumWoff from "../fonts/UntitledSansWeb-Medium.woff";
import UntitledSansMediumWoff2 from "../fonts/UntitledSansWeb-Medium.woff2";
import UntitledSansRegularWoff from "../fonts/UntitledSansWeb-Regular.woff";
import UntitledSansRegularWoff2 from "../fonts/UntitledSansWeb-Regular.woff2";
import UntitledSansRegularItalicWoff from "../fonts/UntitledSansWeb-RegularItalic.woff";
import UntitledSansRegularItalicWoff2 from "../fonts/UntitledSansWeb-RegularItalic.woff2";
import Paragraph from "./paragraph";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  header: "full" | "condensed";
};

const Container = ({ children, title, header }: ContainerProps) => (
  <div
    css={{
      fontFamily: `"Untitled Sans", -apple-system, BlinkMacSystemFont, avenir next,
    avenir, helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif`,
      color: s.darkGray,
      padding: s.s4,
      maxWidth: s.measureWide,
      marginLeft: "auto",
      marginRight: "auto",

      "@media (min-width: 400px)": {
        padding: s.s5,
      },
    }}
  >
    <Global
      styles={css`
        html {
          font-size: ${s.fontSizeBody};

          @media (min-width: 560px) {
            font-size: ${s.fontSizeBodyMedium};
          }
        }

        body {
          margin: ${s.s0};
        }

        code,
        pre {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo,
            Courier, monospace;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @font-face {
          font-family: "Untitled Sans";
          font-weight: 400;
          font-style: normal;
          font-display: swap;
          src: url("${UntitledSansRegularWoff2}") format("woff2"),
            url("${UntitledSansRegularWoff}") format("woff");
        }

        @font-face {
          font-family: "Untitled Sans";
          font-weight: 400;
          font-style: italic;
          font-display: swap;
          src: url("${UntitledSansRegularItalicWoff2}") format("woff2"),
            url("${UntitledSansRegularItalicWoff}") format("woff");
        }

        @font-face {
          font-family: "Untitled Sans";
          font-weight: 500;
          font-style: normal;
          font-display: swap;
          src: url("${UntitledSansMediumWoff2}") format("woff2"),
            url("${UntitledSansMediumWoff}") format("woff");
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 500;
        }
      `}
    />
    <StaticQuery
      query={graphql`
        query Layout {
          site {
            siteMetadata {
              title
              siteUrl
            }
          }
        }
      `}
      render={(data) => {
        const metaTitle = title
          ? `${title} – ${data.site.siteMetadata.title}`
          : data.site.siteMetadata.title;

        return (
          <Helmet
            title={metaTitle}
            meta={[
              { property: "og:title", content: metaTitle },
              { property: "og:type", content: "website" },
              {
                property: "og:image",
                content: `${data.site.siteMetadata.siteUrl}/profile.jpg`,
              },
              { property: "twitter:creator", content: "_danoc" },
              { name: "theme-color", content: s.darkGray },
            ]}
            htmlAttributes={{
              lang: "en",
            }}
          />
        );
      }}
    />

    <header css={{ marginBottom: s.s6 }}>
      {header === "full" && (
        <span css={{ display: "block", marginBottom: s.s3, fontSize: "40px" }}>
          👨‍💻
        </span>
      )}
      <GatsbyLink to="/" css={{ color: "inherit", textDecoration: "inherit" }}>
        <h1
          css={{
            fontSize: header === "full" ? "1.6rem" : s.f5,
            marginTop: s.s0,
            marginBottom: s.s3,

            "@media (min-width: 400px)": {
              fontSize: header === "full" ? "1.6rem" : s.f4,
            },
          }}
        >
          Daniel O’Connor
        </h1>
      </GatsbyLink>
      {header === "full" && (
        <>
          <Paragraph>
            Hello! I’m a design systems and front-end infrastructure engineer in
            New York. I use code and communication to improve product quality
            and developer productivity.
          </Paragraph>
          <Paragraph>
            Right now I build{" "}
            <Link to="https://thumbprint.design/">Thumbprint</Link>, the design
            system at <Link to="https://www.thumbtack.com/">Thumbtack</Link>. I
            previously worked at{" "}
            <Link to="https://www.optimizely.com/">Optimizely</Link> where I
            helped build and maintain{" "}
            <Link to="https://github.com/optimizely/oui">OUI</Link>, a React
            component library.
          </Paragraph>
        </>
      )}
    </header>

    {children}
    <footer
      css={{
        paddingTop: s.s3,
        borderTop: `1px solid ${s.lightGray}`,
      }}
    >
      <ul
        css={{
          listStyleType: "none",
          paddingLeft: s.s0,
          margin: s.s0,
          display: "inline-grid",
          gridRowGap: s.s3,
          gridColumnGap: s.s2,
        }}
      >
        <li css={{ gridColumn: "1 / span 3" }}>
          <Link to="mailto:daniel@danoc.me">daniel@danoc.me</Link>
        </li>
        <li
          css={{
            fontSize: s.f6,
            "::after": {
              content: "'·'",
              paddingLeft: s.s2,
            },
          }}
        >
          <Link to="https://twitter.com/_danoc">Twitter</Link>
        </li>
        <li
          css={{
            fontSize: s.f6,
            "::after": {
              content: "'·'",
              paddingLeft: s.s2,
            },
          }}
        >
          <Link to="https://github.com/danoc">GitHub</Link>
        </li>
        <li
          css={{
            fontSize: s.f6,
          }}
        >
          <Link to="https://linkedin.com/in/itsdanoc">LinkedIn</Link>
        </li>
      </ul>
    </footer>
  </div>
);

export default Container;
