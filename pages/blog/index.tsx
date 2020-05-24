import { GetStaticProps } from "next";
import grayMatter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "../../components/Link";

type Post = {
  title: string;
  date: string;
  href: string;
};

type BlogPageProps = {
  posts: Post[];
};

function BlogPage({ posts }: BlogPageProps) {
  return (
    <div className="font-sans max-w-xl mx-auto p-4">
      <header className="mb-12">
        <span className="text-4xl mb-2">👨‍💻</span>
        <h1 className="text-2xl font-medium mb-4">Daniel O’Connor</h1>
      </header>

      <section>
        <a href="/blog" className="mb-4 block">
          <h2 id="writing" className="text-2xl font-medium mb-2">
            <span className="mr-2">📝</span> Writing
          </h2>
        </a>
        <ul>
          <li>
            {posts.map((post) => (
              <a href={post.href} key={post.href}>
                <span className="block">{post.title}</span>
                <span>{post.date}</span>
              </a>
            ))}
          </li>
        </ul>
      </section>

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

export const getStaticProps: GetStaticProps = async (context) => {
  const pathToPosts = path.join(process.cwd(), "posts");

  const posts = fs
    .readdirSync(pathToPosts)
    .sort()
    .reverse()
    .map((postDirectory) => {
      // Get the post contents, parse the front-matter, and return the data we care about.
      const postMarkdownPath = path.join(
        pathToPosts,
        postDirectory,
        "index.md",
      );

      const postContents = fs.readFileSync(postMarkdownPath);
      const frontmatter = grayMatter(postContents);

      return {
        title: frontmatter.data.title,
        date: frontmatter.data.date,
        href: frontmatter.data.path,
      };
    });

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
