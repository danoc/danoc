import { GetStaticProps, GetStaticPaths } from "next";
import grayMatter from "gray-matter";
import path from "path";
import fs from "fs";
import unified from "unified";
import remark from "remark";
import html from "remark-html";
import Link from "../../components/Link";

type BlogPostPageProps = {
  post: string;
};

function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="font-sans max-w-xl mx-auto p-4">
      <header className="mb-12">
        <span className="text-4xl mb-2">👨‍💻</span>
        <h1 className="text-2xl font-medium mb-4">Daniel O’Connor</h1>
      </header>

      <main>
        <article dangerouslySetInnerHTML={{ __html: post }} />
      </main>

      <footer>
        <style jsx>{`
          .footer-grid {
            gap: 1rem 0.5rem;
          }
        `}</style>
        <ul className="inline-grid footer-grid">
          <li>
            <a href="mailto:daniel@danoc.me">daniel@danoc.me</a>
          </li>
          <li>
            <a href="https://twitter.com/_danoc">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/danoc">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/itsdanoc">LinkedIn</a>
          </li>
        </ul>
      </footer>
    </div>
  );
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

export default BlogPostPage;
