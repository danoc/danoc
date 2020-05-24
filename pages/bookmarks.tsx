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
      </header>

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
  const bookmarksRequest = await fetch(
    `https://api.pinboard.in/v1/posts/recent?auth_token=${process.env.PINBOARD}&format=json&count=100&tag=danoc.me`,
  );

  const getUrlHostname = (url: string) =>
    new URL(url).hostname.replace("www.", "");

  const bookmarks = (await bookmarksRequest.json()).posts.map(
    (bookmark: PinboardBookmark) => ({
      title: bookmark.description,
      href: bookmark.href,
      domain: getUrlHostname(bookmark.href),
    }),
  );

  return {
    props: {
      bookmarks,
    },
  };
};

export default HomePage;
