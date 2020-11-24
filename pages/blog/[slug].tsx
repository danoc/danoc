import { GetStaticPaths, GetStaticProps } from "next";
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import Highlight, {
  defaultProps as prismDefaultProps,
} from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/github";
import ReactDOMServer from "react-dom/server";
import { merge } from "lodash";
import Link, { DottedLink } from "../../components/link";

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

interface MDXElementImage extends MDXElement {
  alt?: string;
  src: string;
}

interface MDXElementIframe extends MDXElement {
  src: string;
  height?: string | number;
  width?: string | number;
}

interface MDXElementA extends MDXElement {
  href: string;
}

function BlogSlug({ post, metadata }: BlogSlugProps) {
  const postDate = new Date(metadata.date);

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
        <Link href="/" className="text-xl font-medium mb-2 block">
          <h1>Daniel O’Connor</h1>
        </Link>
      </header>

      <main>
        <time
          dateTime={metadata.date}
          itemProp="datePublished"
          title={postDate.toDateString()}
          className="text-sm mb-1"
          style={{
            display: "block",
          }}
        >
          {postDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
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
        a: (p: MDXElementA) => (
          <DottedLink className="underline break-words" {...p} />
        ),
        blockquote: (p: MDXElement) => (
          <blockquote className="pl-3 my-4" {...p} />
        ),
        code: ({ className, children, ...p }: MDXElement) => {
          const language = className?.replace("language-", "");
          const codeClasses =
            "mb-4 w-full block overflow-x-auto font-mono text-sm border border-gray-300 p-3";

          if (
            language !== "markup" &&
            language !== "bash" &&
            language !== "clike" &&
            language !== "c" &&
            language !== "cpp" &&
            language !== "css" &&
            language !== "javascript" &&
            language !== "jsx" &&
            language !== "coffeescript" &&
            language !== "actionscript" &&
            language !== "css-extr" &&
            language !== "diff" &&
            language !== "git" &&
            language !== "go" &&
            language !== "graphql" &&
            language !== "handlebars" &&
            language !== "json" &&
            language !== "less" &&
            language !== "makefile" &&
            language !== "markdown" &&
            language !== "objectivec" &&
            language !== "ocaml" &&
            language !== "python" &&
            language !== "reason" &&
            language !== "sass" &&
            language !== "scss" &&
            language !== "sql" &&
            language !== "stylus" &&
            language !== "tsx" &&
            language !== "typescript" &&
            language !== "wasm" &&
            language !== "yaml"
          ) {
            return <code className={codeClasses}>{children}</code>;
          }

          return (
            <Highlight
              {...prismDefaultProps}
              code={children.trim()}
              language={language}
              theme={merge(prismTheme, {
                plain: {
                  color: "inherit",
                  backgroundColor: "white",
                },
              })}
            >
              {({
                className: prismClassName,
                style,
                tokens,
                getLineProps,
                getTokenProps,
              }) => (
                <code
                  className={`${codeClasses} ${prismClassName}`}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </code>
              )}
            </Highlight>
          );
        },
        h2: (p: MDXElement) => (
          <h3 className="mt-6 mb-2 font-medium text-2xl" {...p} />
        ),
        h3: (p: MDXElement) => (
          <h3 className="mt-4 mb-1 font-medium text-xl" {...p} />
        ),
        iframe: ({ src, height, width, ...p }: MDXElementIframe) => {
          if (src.startsWith("https://www.youtube.com/")) {
            return (
              <div
                style={{
                  paddingBottom: "56.25%",
                  position: "relative",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={src}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  {...p}
                />
              </div>
            );
          }

          return <iframe src={src} {...p} />;
        },
        img: ({ src, alt }: MDXElementImage) => (
          <img src={src} alt={alt} loading="lazy" className="border" />
        ),
        li: (p: MDXElement) => <li className="mb-2 pl-1" {...p} />,
        inlineCode: (p: MDXElement) => <code className="font-mono" {...p} />,
        p: (p: MDXElement) => <p className="mt-4 mb-5" {...p} />,
        strong: (p: MDXElement) => <strong className="font-medium" {...p} />,
        ol: (p: MDXElement) => (
          <ol className="list-decimal pl-6 mb-5 mt-4" {...p} />
        ),
        ul: (p: MDXElement) => (
          <ol className="list-disc pl-6 mb-5 mt-4" {...p} />
        ),
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
