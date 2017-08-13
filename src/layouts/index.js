import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled from "styled-components";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const IndexLayout = ({ children }) => {
  return (
    <Container>
      <Helmet
        title={""}
        meta={[
          { name: "og:title", content: "" },
          { name: "og:type", content: "website" },
          { name: "og:image", content: "" },
          { name: "description", content: "" }
        ]}
      />
      {children()}
    </Container>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func
};

export default IndexLayout;

// export const pageQuery = graphql`
//   query LayoutIndexQuery {
//     site {
//       siteMetadata {
//         siteURL
//       }
//     }
//   }
// `;
