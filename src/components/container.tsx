import React from "react";
import Helmet from "react-helmet";
import { Global, css } from "@emotion/core";

import { StaticQuery, graphql } from "gatsby";
import Link from "./link";
import * as s from "../styles";

import UntitledSansMediumWoff from "../fonts/UntitledSansWeb-Medium.woff";
import UntitledSansMediumWoff2 from "../fonts/UntitledSansWeb-Medium.woff2";
import UntitledSansRegularWoff from "../fonts/UntitledSansWeb-Regular.woff";
import UntitledSansRegularWoff2 from "../fonts/UntitledSansWeb-Regular.woff2";
import UntitledSansRegularItalicWoff from "../fonts/UntitledSansWeb-RegularItalic.woff";
import UntitledSansRegularItalicWoff2 from "../fonts/UntitledSansWeb-RegularItalic.woff2";

type IndexLayoutProps = {
  children: React.ReactNode;
};

const IndexLayout = ({ children }: IndexLayoutProps) => (
  <div
    css={{
      fontFamily: `"Untitled Sans", -apple-system, BlinkMacSystemFont, avenir next,
    avenir, helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif`,
      color: s.darkGray,
      padding: s.s3,
      maxWidth: s.measureWide,
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <Global
      styles={css`
        html {
          font-size: ${s.fontSizeBody};
        }

        body {
          margin: ${s.s0};
        }

        code, pre {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @font-face {
          font-family: 'Untitled Sans';
          font-weight: 400;
          font-style: normal;
          font-display: swap;
          src: url('${UntitledSansRegularWoff2}') format('woff2'),
                url('${UntitledSansRegularWoff}') format('woff');
        }

        @font-face {
          font-family: 'Untitled Sans';
          font-weight: 400;
          font-style: italic;
          font-display: swap;
          src: url('${UntitledSansRegularItalicWoff2}') format('woff2'),
                url('${UntitledSansRegularItalicWoff}') format('woff');
        }

        @font-face {
          font-family: 'Untitled Sans';
          font-weight: 500;
          font-style: normal;
          font-display: swap;
          src: url('${UntitledSansMediumWoff2}') format('woff2'),
                url('${UntitledSansMediumWoff}') format('woff');
        }

        h1, h2, h3, h4, h5, h6 {
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
      render={data => (
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { property: "og:title", content: data.site.siteMetadata.title },
            { property: "og:type", content: "website" },
            {
              property: "og:image",
              content: `${data.site.siteMetadata.siteUrl}/profile.jpg`,
            },
            { property: "twitter:creator", content: "_danoc" },
            { name: "theme-color", content: s.blue },
          ]}
          htmlAttributes={{
            lang: "en",
          }}
        />
      )}
    />
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
          display: "grid",
          gridGap: s.s2,
        }}
      >
        <li>
          <Link to="mailto:daniel@danoc.me">daniel@danoc.me</Link>
        </li>
        <li>
          <Link to="https://twitter.com/_danoc">Twitter</Link>
        </li>
        <li>
          <Link to="https://github.com/danoc">GitHub</Link>
        </li>
        <li>
          <Link to="https://linkedin.com/in/itsdanoc">LinkedIn</Link>
        </li>
      </ul>
    </footer>
  </div>
);

export default IndexLayout;
