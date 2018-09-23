import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import BulletList from "../components/bullet-list";
import Section from "../components/section";

const NotFoundPage = () => (
  <Layout>
    <Header isSinglePost />

    <Section
      title={
        <span>
          <span role="img" aria-label="Emoji of monkey covering eyes">
            🙈
          </span>{" "}
          Whoops
        </span>
      }
    >
      <p>You just found a page that doesn’t exist.</p>
      <p>Here are a few options:</p>
      <BulletList
        items={[
          { title: "Go to homepage", to: "/" },
          { title: "View all of my blog posts", to: "/blog" },
          { title: "Message me on Twitter", to: "https://twitter.com/_danoc" }
        ]}
      />
    </Section>
  </Layout>
);

export default NotFoundPage;
