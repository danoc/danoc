import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import hexToRgba from "hex-rgba";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import { StaticQuery, graphql } from "gatsby";
import "normalize.css";
import Link from "./link";
import * as s from "../styles";

import UntitledSansMediumWoff from "../fonts/UntitledSansWeb-Medium.woff";
import UntitledSansMediumWoff2 from "../fonts/UntitledSansWeb-Medium.woff2";
import UntitledSansRegularWoff from "../fonts/UntitledSansWeb-Regular.woff";
import UntitledSansRegularWoff2 from "../fonts/UntitledSansWeb-Regular.woff2";
import UntitledSansRegularItalicWoff from "../fonts/UntitledSansWeb-RegularItalic.woff";
import UntitledSansRegularItalicWoff2 from "../fonts/UntitledSansWeb-RegularItalic.woff2";

const Container = styled.div`
  font-family: "Untitled Sans", -apple-system, BlinkMacSystemFont, avenir next,
    avenir, helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
  color: ${s.darkGray};
  padding: ${s.s4};
  max-width: ${s.measureWide};
  margin-left: auto;
  margin-right: auto;
`;

const Footer = styled.footer`
  padding-top: ${s.s3};
  border-top: 1px solid ${s.lightGray};
`;

const FooterList = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;

  > li:not(:last-child) {
    margin-right: ${s.s3};
  }
`;

const IndexLayout = ({ children }) => (
  <Container>
    <Global
      styles={css`
        html {
          font-size: ${s.fontSizeBody};
        }

        a {
          color: ${s.blue};

          :focus {
            outline: 1px dotted currentColor;
          }

          :hover {
            color: ${s.darkBlue};
            border-radius: 1px;
            background: ${hexToRgba(s.blue, 5)};
            box-shadow: 0 0 0 4px ${hexToRgba(s.blue, 5)};
          }

          :active {
            color: ${s.darkGray};
          }
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
          src: url('${UntitledSansRegularWoff2}') format('woff2'),
                url('${UntitledSansRegularWoff}') format('woff');
        }

        @font-face {
          font-family: 'Untitled Sans';
          font-weight: 400;
          font-style: italic;
          src: url('${UntitledSansRegularItalicWoff2}') format('woff2'),
                url('${UntitledSansRegularItalicWoff}') format('woff');
        }

        @font-face {
          font-family: 'Untitled Sans';
          font-weight: 500;
          font-style: normal;
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
              description
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
            { property: "fb:app_id", content: 1271463799642798 },
            { property: "twitter:creator", content: "_danoc" },
            { name: "theme-color", content: s.blue }
          ]}
          htmlAttributes={{
            lang: "en"
          }}
        />
      )}
    />
    {children}
    <Footer>
      <FooterList>
        <li>
          <Link to="mailto:daniel@danoc.me">daniel@danoc.me</Link>
        </li>
        <li>
          <Link to="https://twitter.com/_danoc">Twitter</Link>
        </li>
      </FooterList>
    </Footer>
  </Container>
);

IndexLayout.propTypes = {
  children: PropTypes.node
};

IndexLayout.defaultProps = {
  children: undefined
};

export default IndexLayout;
