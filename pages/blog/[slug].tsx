import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Container from "../../components/container";
import ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";

interface BlogSlugProps {
  post: string;
  postDirectoryName: string;
}

function BlogSlug({ post, postDirectoryName }: BlogSlugProps) {
  const DynamicComponent = dynamic(
    () => import(`../../posts/${postDirectoryName}/index.mdx`),
    { loading: () => <div dangerouslySetInnerHTML={{ __html: post }} /> },
  );

  return (
    <Container header="condensed">
      <DynamicComponent />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

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
    "index.mdx",
  );

  const { default: MDXContent } = await import(
    `../../posts/${postDirectoryName}/index.mdx`
  );

  const post = ReactDOMServer.renderToStaticMarkup(<MDXContent />);

  return {
    props: {
      post,
      postDirectoryName,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathToPosts = path.join(process.cwd(), "posts");

  const posts = fs.readdirSync(pathToPosts).sort().reverse();

  const paths = posts.map((post) => {
    const postPath = path.join(pathToPosts, post, "index.mdx");
    const postContents = fs.readFileSync(postPath);
    const frontmatter = matter(postContents);

    const postDirSplit = postPath.split("/");
    const slug = postDirSplit[postDirSplit.length - 2].slice(11);

    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogSlug;
