import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const Container = styled.div`
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
`;

const SectionHeading = styled.h2``;

const ExperienceTitle = styled.h3``;

const Section = props =>
  <section>
    <SectionHeading>
      {props.href
        ? <Link to={props.href}>
            {props.title}
          </Link>
        : <span>
            {props.title}
          </span>}
    </SectionHeading>
    {props.children}
  </section>;

const Experience = props =>
  <article>
    <ExperienceTitle>
      {props.href
        ? <a href={props.href}>
            {props.title}
          </a>
        : <span>
            {props.title}
          </span>}
    </ExperienceTitle>
    <p>
      {props.children}
    </p>
  </article>;

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Container>
      <header>
        <h1>Daniel O'Connor</h1>
        <p>
          Hello! I'm a UI Developer at Thumbtack and I live in San Francisco.
        </p>
        <p>
          I build design systems to efficiently deliver high quality products.
          I'm a stickler for consistency and help bridge the gap between design
          and development.
        </p>
      </header>

      <Section title="Posts" href="/blog">
        <ul>
          {posts.map(({ node: post }) =>
            <li>
              <Link to={post.frontmatter.path}>
                {post.frontmatter.title}
              </Link>
            </li>
          )}
        </ul>

        <Link to="/blog">View More Posts</Link>
      </Section>

      <Section title="Work">
        <Experience title="Thumbtack" href="https://www.thumbtack.com/" />

        <Experience title="Optimizely" href="https://www.optimizely.com/">
          I interned at Optimizely in 2013 and worked as a full-time UI Engineer
          on the design team. I maintained OUI, our UI library, and built design
          systems that improved UI consistency and developer productivity.
        </Experience>

        <Experience title="WePay" href="https://wepay.com/">
          Worked at WePay as a Software Engineer Intern during the 2012 summer.
          Assigned to the API team, I redesigned the application dashboard for
          developers, simplified configuration process for WePay plugins users,
          overhauled the developer documentation, and represented the company at
          eCommerceHackNY.
        </Experience>

        <Experience title="Pipe Dream" href="https://www.bupipedream.com/">
          Worked on a complete redesign of{" "}
          <a href="https://www.bupipedream.com/">bupipedream.com</a>, home of
          the student-run newspaper at Binghamton University. The new website
          runs on WordPress and features a responsive layout. I wrote{" "}
          <Link to="/blog/from-college-publisher-to-wordpress/">
            a blog post explaining the development
          </Link>
          in great detail. I also managed Pipe Dream's Facebook and Twitter
          accounts.
        </Experience>
      </Section>

      <Section title="Projects">
        <Experience title="BeatStrap" href="http://beatstrap.com/">
          Beatstrap is a tool for journalists to cover news, sports, and events
          through Twitter. I created Beatstrap and worked with
          <a href="http://www.camayak.com/">Roman Heindorff of Camayak</a> to
          help market and promote the product.
        </Experience>

        <Experience title="HackBU" href="http://club.hackbu.org/">
          Created a club at Binghamton University to promote a hacker culture on
          campus. HackBU hosted weekly{" "}
          <a href="http://club.hackbu.org/">web development workshops</a>{" "}
          <a href="https://danoc.me/blog/binghamton-university-at-mhacks/">
            organized trips to hackathons
          </a>, and held{" "}
          <a href="http://2014s.hackbu.org/">BU's first hackathon</a>.
        </Experience>

        <Experience title="Take to College" href="http://taketocollege.com/">
          Take to College began in November 2009 as a comprehensive college
          shopping list for freshmen entering college. The website became an
          instant hit, receiving over 150,000 visits in its first summer. It has
          since been redesigned to let users customize their lists.
        </Experience>
      </Section>

      <Section title="Talks">
        <Experience
          title="Ditch the App, Go Responsive!"
          href="/talks/responsive/"
        >
          Spoke about responsive web development for college newspapers at the
          2013 ACP Midwinter National College Journalism Convention in San
          Francisco.
        </Experience>
      </Section>
    </Container>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query Index {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
