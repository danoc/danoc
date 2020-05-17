import { GetStaticProps } from "next";
import grayMatter from "gray-matter";
import path from "path";
import fs from "fs";
import Link from "../components/Link";

type PinboardBookmark = {
  href: string;
  description: string;
  extended: string;
  meta: string;
  hash: string;
  time: string;
  shared: string;
  toread: string;
  tags: string;
};

type Post = {
  title: string;
  date: string;
  href: string;
};

type Bookmark = {
  title: string;
  href: string;
  domain: string;
};

type HomePageProps = {
  posts: Post[];
  bookmarks: Bookmark[];
};

function HomePage({ posts, bookmarks }: HomePageProps) {
  return (
    <div className="font-sans max-w-xl mx-auto p-4">
      <header className="mb-12">
        <span className="text-4xl mb-2">👨‍💻</span>
        <h1 className="text-2xl font-medium mb-4">Daniel O’Connor</h1>
        <p className="text-lg mb-3">
          Hello! I’m a design systems and front-end infrastructure engineer in
          San Francisco. I use code and communication to improve product quality
          and developer productivity.
        </p>
        <p className="text-lg">
          Right now I build <a href="https://thumbprint.design/">Thumbprint</a>,
          the design system at{" "}
          <a href="https://www.thumbtack.com/">Thumbtack</a>. I previously
          worked at <a href="https://www.optimizely.com/">Optimizely</a> where I
          helped build and maintain{" "}
          <a href="https://github.com/optimizely/oui">OUI</a>, a React component
          library.
        </p>
      </header>

      <section>
        <a href="/writing" className="mb-4 block">
          <h2 id="writing" className="text-2xl font-medium mb-2">
            <span className="mr-2">📝</span> Writing
          </h2>
          <p className="text-lg">Thoughts and feelings on code and design</p>
        </a>
        <ul>
          <li>
            {posts.map((post) => (
              <Link to={post.href} key={post.href}>
                <span className="block">{post.title}</span>
                <time>{post.date}</time>
              </Link>
            ))}
          </li>
        </ul>
      </section>

      <section>
        <a href="/bookmarks" className="mb-4 block">
          <h2 id="bookmarks" className="text-2xl font-medium mb-2">
            <span className="mr-2">📝</span> Bookmarks
          </h2>
          <p className="text-lg">Articles and videos I like sharing</p>
        </a>
        <ul>
          <li>
            {bookmarks.map((bookmark) => (
              <a href={bookmark.href} key={bookmark.href}>
                <span className="block">{bookmark.title}</span>
                <span>{bookmark.domain}</span>
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
    .slice(0, 5)
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

  const bookmarksRequest = await fetch(
    `https://api.pinboard.in/v1/posts/recent?auth_token=${process.env.PINBOARD}&format=json&count=100&tag=danoc.me`,
  );

  const getUrlHostname = (url: string) =>
    new URL(url).hostname.replace("www.", "");

  const bookmarks = (await bookmarksRequest.json()).posts
    .map((bookmark: PinboardBookmark) => ({
      title: bookmark.description,
      href: bookmark.href,
      domain: getUrlHostname(bookmark.href),
    }))
    .slice(0, 3);

  return {
    props: {
      posts,
      bookmarks,
    },
  };
};

export default HomePage;
