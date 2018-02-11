import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import "../styles/index.scss";
import Link from "../components/link";

const IndexLayout = ({ children }) => (
  <div className="sans-serif pa4 pv5-ns ph6-ns ph5-m">
    <Helmet
      title="Daniel O'Connor"
      meta={[
        { property: "og:title", content: "Daniel O'Connor" },
        { property: "og:type", content: "website" },
        { property: "fb:app_id", content: 1271463799642798 },
        { property: "twitter:creator", content: "_danoc" },
        { name: "theme-color", content: "#333333" }
      ]}
      htmlAttributes={{
        lang: "en"
      }}
    />
    {children()}
    <footer className="pt3 bt b--light-gray measure mt5">
      <ul className="flex list pa0">
        <li className="mr3">
          <Link to="mailto:daniel@danoc.me">daniel@danoc.me</Link>
        </li>
        <li>
          <Link to="https://twitter.com/_danoc">Twitter</Link>
        </li>
      </ul>
    </footer>
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.func
};

IndexLayout.defaultProps = {
  children: undefined
};

export default IndexLayout;
