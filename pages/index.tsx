import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import firebaseAdmin from "firebase-admin";
import queryString from "query-string";
import Link, { DottedLink } from "../components/link";
import PostItem from "../components/post-item";
import Heatmap, { Run } from "../components/heatmap";

const numWeeksOfRuns = 37;

interface SectionProps {
  title: string;
  description: string;
  emoji: string;
  children: React.ReactNode;
}

function Section({ title, description, emoji, children }: SectionProps) {
  return (
    <section className="mb-12">
      <header className="pb-3 mb-1 border-gray-200 border-solid border-b">
        <h2 id={title} className="text-xl font-medium mb-1">
          <span className="mr-1">{emoji} </span>
          {title}
        </h2>

        <p className="text-sm text-gray-500">{description}</p>
      </header>

      {children}
    </section>
  );
}

interface HomePageProps {
  posts: HomepagePostItem[];
  runs: Run[];
  bookmarks: HomepagePostItem[];
}

export default function HomePage({ posts, runs, bookmarks }: HomePageProps) {
  return (
    <>
      <header className="mb-12">
        <span className="text-4xl mb-3 block">👨‍💻</span>

        <Link href="/" className="text-2xl font-medium mb-2 block">
          <h1>Daniel O’Connor</h1>
        </Link>

        <p className="mb-3">
          Hello! I’m a design systems and front-end infrastructure engineer in
          San Francisco. I use code and communication to improve product quality
          and developer productivity.
        </p>

        <p>
          Right now I build{" "}
          <DottedLink href="https://thumbprint.design/">Thumbprint</DottedLink>,
          the design system at{" "}
          <DottedLink href="https://www.thumbtack.com/">Thumbtack</DottedLink>.
          I previously worked at{" "}
          <DottedLink href="https://www.optimizely.com/">Optimizely</DottedLink>{" "}
          where I helped build and maintain{" "}
          <DottedLink href="https://github.com/optimizely/oui">OUI</DottedLink>,
          a React component library.
        </p>
      </header>

      <main>
        <Section
          title="Writing"
          description="Thoughts and feelings on code and design"
          emoji="📝"
        >
          <ul>
            {posts.map((p) => (
              <li key={p.href}>
                <PostItem
                  title={p.title}
                  description={p.description}
                  href={p.href}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          title="Running"
          description="Runs I’ve done in the past few months"
          emoji="🏃‍♂️"
        >
          <div className="pt-4">
            <Heatmap runs={runs} numWeeksOfRuns={numWeeksOfRuns} />
          </div>
        </Section>

        <Section
          title="Bookmarks"
          description="Articles and videos I like sharing"
          emoji="📖"
        >
          <ul>
            {bookmarks.map((p) => (
              <li key={p.href}>
                <PostItem
                  title={p.title}
                  description={p.description}
                  href={p.href}
                />
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}

const getRefreshToken = async () => {
  const doc = await firebaseAdmin
    .firestore()
    .collection("config")
    .doc("strava-refresh-token")
    .get();

  if (doc.exists) {
    return doc.get("value");
  }

  throw Error("Could not get `strava-refresh-token` from Fireabse.");
};

const onRefreshTokenChanged = async (newRefreshToken: string) => {
  await firebaseAdmin
    .firestore()
    .doc("config/strava-refresh-token")
    .update({ value: newRefreshToken });
};

interface StravaActivity {
  resource_state: number;
  athlete: unknown;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  workout_type: number;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: [unknown];
  end_latlng: [unknown];
  location_city: null;
  location_state: null;
  location_country: string;
  start_latitude: number;
  start_longitude: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: [unknown];
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: boolean;
  from_accepted_tag: boolean;
  upload_id_str: string;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

interface PinboardResponse {
  date: string;
  user: string;
  posts: {
    href: string;
    description: string;
    extended: string;
    meta: string;
    hash: string;
    time: "2020-09-06T19:21:43Z";
    shared: "yes" | "no";
    toread: "yes" | "no";
    tags: string;
  }[];
}

interface HomepagePostItem {
  title: string;
  description: string;
  href: string;
}

async function getLastFivePosts(): Promise<HomepagePostItem[]> {
  const allPostsFolders = fs.readdirSync(path.join(process.cwd(), "posts"));

  const lastFivePostsFolders = allPostsFolders.sort().reverse().splice(0, 5);
  const lastFivePostsMdx = await Promise.all(
    lastFivePostsFolders.map((post) => import(`../posts/${post}/index.mdx`)),
  );

  const metadata = lastFivePostsMdx.map((p, i) => ({
    title: p.metadata.title,
    description: new Date(p.metadata.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    href: `/blog/${lastFivePostsFolders[i].substring(11)}`,
  }));

  return metadata;
}

async function getStravaActivities(): Promise<Run[]> {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw Error(
      "Can't build site without a `FIREBASE_SERVICE_ACCOUNT` environment variable.",
    );
  }

  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(
        JSON.parse(
          Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT,
            "base64",
          ).toString(),
        ),
      ),
    });
  }

  const refreshToken = await getRefreshToken();

  const stravaQueryParams = queryString.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const stravaRes = await fetch(
    `https://www.strava.com/api/v3/oauth/token?${stravaQueryParams}`,
    {
      method: "POST",
    },
  );

  const token = await stravaRes.json();
  const newRefreshToken = token.refresh_token;

  if (refreshToken !== newRefreshToken) {
    await onRefreshTokenChanged(newRefreshToken);
  }

  const authToken = token.access_token;

  const activities: StravaActivity[] = [];
  let numResults = null;
  let page = 1;

  do {
    const params = queryString.stringify({
      after: Math.round(new Date().getTime() / 1000) - 604800 * numWeeksOfRuns,
      before: undefined,
      page,
      per_page: 30,
    });

    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?${params}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const data: StravaActivity[] = await res.json();

    numResults = data.length;
    page += 1;

    data.forEach((d) => {
      activities.push(d);
    });
  } while (numResults > 0);

  return activities.map((a) => ({
    distance: a.distance,
    startDate: a.start_date,
  }));
}

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getUrlHostname(url: string) {
  return new URL(url).hostname.replace("www.", "");
}

async function getPinboardBookmarks(): Promise<HomepagePostItem[]> {
  const res = await fetch(
    // https://pinboard.in/api/#posts_recent
    `https://api.pinboard.in/v1/posts/recent?auth_token=${process.env.PINBOARD}&format=json&count=100&tag=danoc.me`,
  );

  const data: PinboardResponse = await res.json();

  shuffleArray(data.posts);

  return data.posts
    .map((p) => ({
      title: p.description,
      href: p.href,
      description: getUrlHostname(p.href),
    }))
    .splice(0, 3);
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLastFivePosts();
  const runs = await getStravaActivities();
  const bookmarks = await getPinboardBookmarks();

  return {
    props: {
      posts,
      runs,
      bookmarks,
    },
  };
};
