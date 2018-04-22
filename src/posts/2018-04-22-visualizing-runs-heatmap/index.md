---
layout: post
title: Visualizing my runs with a heatmap
description:
date: '2018-04-22T15:31:00Z'
path: /blog/visualizing-runs-heatmap/
image_src: ./running-heatmap.png
image_alt: Screenshot of a heatmap visualizing my runs for the past nine months
is_featured: true
---

![Screenshot of a heatmap visualizing my runs for the past nine months](./running-heatmap.png)

Last month I added a [heatmap to danoc.me](/#running) that shows how ~~much~~ little I've run in the past nine months. The project, which started off as an excuse to play with with new JavaScript libraries, has actually helped motivate me to run more consistently.

### How it works

My Garmin GPS watch sends data to [Garmin Connect](https://connect.garmin.com/) when I finish a run. This triggers a series of events:

1.  Garmin Connect sends the run to [Strava](https://www.strava.com/).
2.  Strava notifies [IFTTT](https://ifttt.com/) that I've completed a run.
3.  IFTTT asks [Netlify](https://www.netlify.com/) to rebuild and deploy this static site.
4.  Netlify grabs [this site's code](https://github.com/danoc/danoc.me) from GitHub and runs `gatsby build`. This command includes an API request to Strava, fetching nine months of running data.

This site is built with [Gatsby](https://www.gatsbyjs.org/), a "blazing-fast static site generator for React." Gatsby biggest strength, in my opinion, is that it allows you to pull content from any source.

The blog posts on this site, for example, are stored as Markdown files. I load these files with the [`gatsby-source-filesystem` plugin](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/). If I wanted to, I could write the posts in WordPress's CMS and use [`gatsby-source-wordpress`](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/) to load them into Gatsby.

[Gatsby's plugin library](https://www.gatsbyjs.org/packages/) includes hundreds of plugins. It did not, however, have one for Strava so I built [`gatsby-source-strava-activities`](https://github.com/danoc/gatsby-source-strava-activities). This plugin makes API calls to Strava's `/athlete/activities` endpoint and stores each activity as a ["node" in Gatsby](https://www.gatsbyjs.org/docs/node-interface/).

The homepage JSX file [fetches the Strava nodes](https://github.com/danoc/danoc.me/blob/e0c8702f5c21786eda310a266e2f7acfa02aef4f/src/pages/index.jsx#L197-L207), formats the data, then sends it to a [`Heatmap` component](https://github.com/danoc/danoc.me/blob/886bd9b7cebd6a9e334ef7d2cecc57994cf564ba/src/components/heatmap.jsx). Finally, the `Heatmap` component uses [VX](https://github.com/hshoff/vx), a visualization library for React, to render the heatmap.

### Thoughts and feelings

This was one of my first "weekend projects" in a while. Here's a brain-dump on how it went:

* Data visualization is hard! I spent over 70% of the time learning how to work with VX. There's a lot of code needed to format the Strava API response so that it works with VX.
* Even after a month I still find it incredibly satisfying to see the site automatically rebuild when I finish a run.
* Webhooks, combined with IFTTT, are very powerful.
* I set up IFTTT to rebuild the site every Sunday. This ensures that the current week always appears in the heatmap.
* I'd love to build similar projects with other services. [Todoist](https://todoist.com/) next?
* Building a basic Gatsby source plugin was easier than expected. I'd recommend [reading through the source code](https://github.com/danoc/gatsby-source-strava-activities/blob/master/src/gatsby-node.js) if interested.

Working on a similar project? [I'd love to hear about it](https://twitter.com/_danoc).
