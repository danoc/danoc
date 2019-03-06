---
title: Plans for the new bupipedream.com
date: "2011-12-19T02:02:00-05:00"
tags:
  - web
  - newspaper
  - college
  - media
  - wordpress
  - open-source
  - college publisher
path: /blog/plans-for-bupipedream/
---

I recently stepped down as Photo Editor and became Lead Web Developer at Pipe Dream to work on a much-needed redesign of [bupipedream.com](http://bupipedream.com/). The current website is powered by [College Publisher](http://collegepublisher.com/), an outdated CMS geared towards college newspapers. College Publisher doesn't offer much flexibility and controls our data, so it's time to abandon ship.

We're [joining](http://www.greglinch.com/2008/09/how-we-did-it-moving-the-miami-hurricane-from-college-publisher-to-wordpress.html) [many](http://seanblanda.com/blog/college-media/the-new-temple-newscom-from-college-publisher-to-wordpress/) [other](http://www.collegemediainnovation.org/blog/2009/04/mustang-daily-leaves-college-publisher-launches-wordpress-site/) college newspapers and moving to [WordPress](http://wordpress.org/). WordPress is an open-source blogging platform that will better fit our needs. I'll be working on this project all throughout winter break and writing about the process on this blog.

Here are some plans for the new site:

- **Breaking news layout** \- When emergency strikes and our servers choke, it's important to have a backup. We're working on a lightweight page that utilizes the [Twitter API](https://dev.twitter.com/), allowing editors to post news updates from their mobile devices. If WordPress becomes unresponsive, we can add a few lines of code to our `.htaccess` file and redirect visitors to the temporary breaking news page.
- **Distraction-free view** \- Take a look at any [Nieman Lab](http://www.niemanlab.org/2011/12/this-week-in-review-the-web-censorship-fight-heats-up-and-buzzfeeds-new-social-news-model/) article and click on "View in Zen Mode." "Zen Mode," as they call it, removes all distractions and focuses on the content. Similar results can be achieved by installing the [Readability](http://www.readability.com/) browser extension, but we would like to implement a similar in-house solution on the new website.
- **Facebook Open Graph** \- [Facebook's new Open Graph has brought great results](https://developers.facebook.com/blog/post/603/) to Yahoo! News and the Washington Post. We're going to experiment with it and see how it performs for a college paper.
- **HTML5/CSS3** \- We're going to use tools and frameworks such as the [HTML5 Boilerplate](http://html5boilerplate.com/) and [LESS](http://lesscss.org) to make development fun and easy.
- **Open Source ** \- We're going to release as much code as possible on GitHub to help other college papers move to WordPress.
- **Responsive design ** \- One of our main priorities is to ensure that the new website looks great on all devices. The easiest way to do this is by using [CSS media queries](http://coding.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/). For a great example, head over to [The Boston Globe](http://www.bostonglobe.com/) and resize your browser. Notice how the layout adjusts?
- **Twitter breaking news notice** \- When news breaks, it takes time to gather information, contact sources, and write a story. The new site will search [@bupipedream's tweets](http://twitter.com/bupipedream) from the past three hours for "#breaking" and display the latest tweet if found. Once a complete article is online, the breaking news notice can be manually removed.

Also, I've thought of a couple of side-projects that will drive students to the site:

- **Campus Twitter directory** \- Inspired by [HarvardTweets](http://tweets.cs50.net/), I would like to create an aggregator of tweets from Binghamton University faculty, clubs, and students.
- **Interactive Bus Schedule** \- Bus schedules can be confusing, so we plan to work with OCCT (Binghamton's student-run bus company) to build an interactive router finder. Students will be able to select a destination and receive a list of upcoming departures. The OCCT Twitter stream will be displayed to inform students of possible delays and detours.
- **Police Watch** \- We're going to put together an interactive police blotter that uses Google Maps to display the incidents and Facebook to rank them by popularity.
- **Public university salaries database** \- Binghamton University is a public school, so faculty salaries are public information. We would like to have a searchable database similar to that of [The Collegiate Times](http://www.collegiatetimes.com/databases/salaries).

If all goes well, the new [bupipedream.com](http://bupipedream.com/) will launch in the beginning of February. Until then, I'll be writing about the development process on this blog.
