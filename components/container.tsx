/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";

import * as s from "../styles";

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
          src: url("/fonts/UntitledSansWeb-Regular.woff2") format("woff2"),
            url("/fonts/UntitledSansWeb-Regular.woff") format("woff");
        }

        @font-face {
          font-family: "Untitled Sans";
          font-weight: 400;
          font-style: italic;
          font-display: swap;
          src: url("/fonts/UntitledSansWeb-Italic.woff2") format("woff2"),
            url("/fonts/UntitledSansWeb-Italic.woff") format("woff");
        }

        @font-face {
          font-family: "Untitled Sans";
          font-weight: 500;
          font-style: normal;
          font-display: swap;
          src: url("/fonts/UntitledSansWeb-Medium.woff2") format("woff2"),
            url("/fonts/UntitledSansWeb-Medium.woff") format("woff");
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
    <header css={{ marginBottom: s.s6 }}>
      {header === "full" && (
        <span css={{ display: "block", marginBottom: s.s3, fontSize: "40px" }}>
          👨‍💻
        </span>
      )}
      <a href="/" css={{ color: "inherit", textDecoration: "inherit" }}>
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
      </a>
      {header === "full" && (
        <>
          <Paragraph>
            Hello! I’m a design systems and front-end infrastructure engineer in
            San Francisco. I use code and communication to improve product
            quality and developer productivity.
          </Paragraph>
          <Paragraph>
            Right now I build{" "}
            <a href="https://thumbprint.design/">Thumbprint</a>, the design
            system at <a href="https://www.thumbtack.com/">Thumbtack</a>. I
            previously worked at{" "}
            <a href="https://www.optimizely.com/">Optimizely</a> where I helped
            build and maintain{" "}
            <a href="https://github.com/optimizely/oui">OUI</a>, a React
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
          <a href="mailto:daniel@danoc.me">daniel@danoc.me</a>
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
          <a href="https://twitter.com/_danoc">Twitter</a>
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
          <a href="https://github.com/danoc">GitHub</a>
        </li>
        <li
          css={{
            fontSize: s.f6,
          }}
        >
          <a href="https://linkedin.com/in/itsdanoc">LinkedIn</a>
        </li>
      </ul>
    </footer>
  </div>
);

export default Container;
