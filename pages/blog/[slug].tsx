import { GetStaticPaths, GetStaticProps } from "next";
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import * as s from "../../styles";
import Link from "next/link";

interface BlogSlugProps {
  post: string;
  postDirectoryName: string;
  metadata: {
    title: string;
    description?: string;
    date: string;
    canonical?: string;
  };
}

interface MDXElement {
  className?: string;
  children: string;
}

function BlogSlug({ post, metadata }: BlogSlugProps) {
  return (
    <div className="p-5">
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metadata.title} />
        <meta property="article:published_time" content={metadata.date} />

        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}

        {metadata.description && (
          <meta property="og:description" content={metadata.description} />
        )}

        {metadata.canonical && (
          <link rel="canonical" href={metadata.canonical} />
        )}
      </Head>

      <header className="mb-8">
        <Link href="/">
          <a className="text-xl font-medium mb-2 block">
            <h1>Daniel O’Connor</h1>
          </a>
        </Link>
      </header>

      <main>
        <time
          dateTime={metadata.date}
          itemProp="datePublished"
          title={new Date(metadata.date).toDateString()}
          style={{
            color: s.gray,
            fontSize: s.f6,
            marginBottom: s.s2,
            display: "block",
          }}
        >
          {metadata.date}
        </time>

        <h2 id={metadata.title} className="text-xl font-medium mb-1">
          {metadata.title}
        </h2>

        <div dangerouslySetInnerHTML={{ __html: post }} />
      </main>
    </div>
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

  const { default: MDXContent, metadata } = await import(
    `../../posts/${postDirectoryName}/index.mdx`
  );

  const post = ReactDOMServer.renderToStaticMarkup(
    <MDXProvider
      components={{
        a: (p: MDXElement) => <a className="underline" {...p} />,
        blockquote: (p: MDXElement) => (
          <blockquote className="pl-3 my-4" {...p} />
        ),
        code: ({ className, ...p }: MDXElement) => (
          <code
            className={`mb-4 w-full block overflow-x-auto font-mono ${className}`}
            {...p}
          />
        ),
        h3: (p: MDXElement) => (
          <h3 className="mt-4 mb-1 font-medium text-xl" {...p} />
        ),
        li: (p: MDXElement) => <li className="mb-2 pl-1" {...p} />,
        inlineCode: (p: MDXElement) => <code className="font-mono" {...p} />,
        p: (p: MDXElement) => <p className="mb-4" {...p} />,
        strong: (p: MDXElement) => <strong className="font-medium" {...p} />,
        ol: (p: MDXElement) => <ol className="list-decimal pl-6 mb-5" {...p} />,
        ul: (p: MDXElement) => <ol className="list-disc pl-6 mb-5" {...p} />,
      }}
    >
      <MDXContent />
    </MDXProvider>,
  );

  return {
    props: {
      post,
      postDirectoryName,
      metadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathToPosts = path.join(process.cwd(), "posts");

  const posts = fs.readdirSync(pathToPosts).sort().reverse();

  const paths = posts.map((post) => {
    const postPath = path.join(pathToPosts, post, "index.mdx");
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
