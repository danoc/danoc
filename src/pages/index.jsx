import React from "react";
import PropTypes from "prop-types";
import { times, keyBy, get } from "lodash";
import Section from "../components/section";
import Link from "../components/link";
import Header from "../components/header";
import Paragraph from "../components/paragraph";
import BulletList from "../components/bullet-list";
import Heatmap from "../components/heatmap";

const formatDate = dateString => {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ];

  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatRuns = data => {
  const normalizeDate = date => date.toDateString();

  const processRun = run => ({
    id: run.node.activity.id,
    date: normalizeDate(new Date(run.node.activity.start_date)),
    miles: run.node.activity.distance * 0.000621371192237334
  });

  const runs = data.map(processRun);
  const runsByDate = keyBy(runs, "date");

  // Ensures that Sunday is always in the correct spot.
  const dayOfWeek = new Date().getDay();
  const dateOffset = dayOfWeek === 6 ? 0 : 6 - dayOfWeek;

  return times(52, weekIndex => {
    const week = new Date();
    week.setDate(week.getDate() + dateOffset - (51 - weekIndex) * 7);

    return {
      bin: weekIndex,
      days: times(7, dayIndex => {
        week.setDate(week.getDate() - (dayIndex === 0 ? 0 : 1));
        const day = normalizeDate(week);

        return {
          miles: get(runsByDate[day], "miles", 0),
          bin: dayIndex
        };
      })
    };
  });
};

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const bookmarks = data.allPinboardBookmark.edges;
  const runs = formatRuns(data.allStravaActivity.edges);

  return (
    <div>
      <Header>
        <Paragraph>Hello! I’m a UI Engineer living in San Francisco.</Paragraph>
        <Paragraph>
          I build design systems to efficiently deliver high quality products.
          I’m a stickler for consistency, accessibility, and performance.
        </Paragraph>
      </Header>

      <Section title="Writing" to="/blog/" callToAction="View all posts">
        <BulletList
          items={posts.map(p => ({
            to: p.node.frontmatter.path,
            title: p.node.frontmatter.title,
            meta: formatDate(p.node.frontmatter.date)
          }))}
        />
      </Section>

      <Section title="Work">
        <BulletList
          hasDescriptions
          items={[
            {
              title: "Thumbtack",
              to: "https://www.thumbtack.com/",
              meta: "2017-Present",
              children: (
                <Paragraph>
                  I help build Thumbprint, Thumbtack’s design system, and assist
                  our engineering team’s move to React.
                </Paragraph>
              )
            },
            {
              title: "Optimizely",
              to: "https://www.optimizely.com/",
              meta: "2014-2017",
              children: (
                <Paragraph>
                  As a UI Engineer on the design team, I maintained{" "}
                  <Link
                    to="https://github.com/optimizely/oui"
                    title="Optimizely User Interface"
                  >
                    OUI
                  </Link>, UI library, and built design systems that improved UI
                  consistency and developer productivity.
                </Paragraph>
              )
            }
          ]}
        />
      </Section>

      <Section title="Running">
        <Heatmap width={578} events data={runs} />
      </Section>

      <Section
        title="Bookmarks"
        to="https://pinboard.in/u:danoc"
        callToAction="View all bookmarks"
      >
        <Paragraph>
          Collection of articles, videos, and talks that I enjoy sharing.
        </Paragraph>
        <BulletList
          items={bookmarks.map(p => ({
            to: p.node.href,
            title: p.node.description
          }))}
        />
      </Section>
    </div>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string
            })
          })
        })
      )
    })
  })
};

IndexPage.defaultProps = {
  data: {}
};

export const pageQuery = graphql`
  query Index {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
      filter: { frontmatter: { is_featured: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            path
          }
        }
      }
    }
    allPinboardBookmark(limit: 3, filter: { shared: { eq: "yes" } }) {
      edges {
        node {
          href
          description
        }
      }
    }
    allStravaActivity {
      edges {
        node {
          id
          activity {
            start_date
            distance
          }
        }
      }
    }
  }
`;
