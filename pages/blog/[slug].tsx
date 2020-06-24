import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import Container from "../../components/container";

function BlogSlug() {
  return <Container header="condensed">hi</Container>;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.post;

  if (!slug) {
    throw Error("Post slug not provided.");
  }

  if (typeof slug !== "string") {
    throw Error("Post slug must be a string.");
  }

  const allPosts = fs.readdirSync(path.join(process.cwd(), "posts"));
  const postDirectoryName = allPosts.find((dir) => dir.slice(11) === slug);

  if (!postDirectoryName) {
    throw Error("Post does not exist.");
  }

  const pathToPost = path.join(
    process.cwd(),
    "posts",
    postDirectoryName,
    "index.md",
  );

  const markdown = fs.readFileSync(pathToPost, "utf-8");
  const post = await remark().use(html).process(markdown);

  return {
    props: {
      post: post.contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathToPosts = path.join(process.cwd(), "posts");

  const posts = fs.readdirSync(pathToPosts).sort().reverse();

  const paths = posts.map((post) => {
    const postPath = path.join(pathToPosts, post, "index.md");
    const postContents = fs.readFileSync(postPath);
    const frontmatter = grayMatter(postContents);

    return { params: { post: frontmatter.data.slug } };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default BlogSlug;
