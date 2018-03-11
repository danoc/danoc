const fetch = require("node-fetch");
const crypto = require("crypto");

exports.sourceNodes = async ({ boundActionCreators }, { authToken }) => {
  if (!authToken) {
    throw new Error(
      "You must provide an `authToken` to `gatsby-source-strava-activities`."
    );
  }

  const { createNode } = boundActionCreators;

  const currentTime = Math.round(new Date().getTime() / 1000);
  const secondsInOneYear = 31536000;
  const startDate = currentTime - secondsInOneYear;

  const activities = [];
  let numResults = null;
  let page = 1;

  do {
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startDate}&per_page=30&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );

    // eslint-disable-next-line no-await-in-loop
    const data = await res.json();

    numResults = data.length;
    page += 1;

    data.forEach(d => {
      activities.push(d);
    });
  } while (numResults > 0);

  activities.forEach(activity => {
    const jsonString = JSON.stringify(activity);

    const gatsbyNode = {
      activity: { ...activity },
      id: `Strava Activity: ${activity.id}`,
      parent: "__SOURCE__",
      children: [],
      internal: {
        type: "StravaActivity",
        contentDigest: crypto
          .createHash("md5")
          .update(jsonString)
          .digest("hex")
      }
    };

    createNode(gatsbyNode);
  });
};
