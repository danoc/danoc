---
title: Notes from "CSS Frameworks and The Evolution of Airbnb's Frontend"
date: "2015-02-26T16:27:00Z"
slug: evolution-of-airbnb-frontend
---

I went to a [great event at Airbnb last week](https://www.airbnb.com/meetups/x4ede5jr2-css-frameworks-and-the-evolution-of-airbnb-s-frontend) about O2 (their CSS framework) and the evolution of their front-end.

**My key takeaways were:**

- We, at Optimizely, seem to be implementing similar JavaScript architecture that Airbnb implemented a few months ago and are enjoying. Probably a good sign!
- O2, their front-end CSS framework, is providing a lot of the benefits that we are seeing at Optimizely with [LEGO](https://link.optimizely.com/lego).
- Their infrastructure to test the O2 re-skin internally seemed really neat.
- Visual CSS testing seems like a nice idea, but too difficult at the moment to be worth the time.

Below are some notes from each of the three talks.

## "State of the Airbnb front-end" by [Spike Brehm](https://twitter.com/spikebrehm) of Airbnb

- Introduced SASS and O2, a front-end CSS framework that was initially a fork of Bootstrap.
- Their first JS frameworks were Backbone and Handlebars. This is bad because there was no data-binding.
- **Introduced React a few months ago with lots of success.**
- They are **using flux a bit and liking it** so far.
- They ran into a bunch of problems with their Rails assets development so they now use CommonJS and NPM.
- They now use Browserify, but webpack works fine too.
- Isomorphic JS is JS that can be shared between different environments.
- They wanted to run JS on their server for the mobile site so [they used Backbone and NodeJS instead of Rails](http://nerds.airbnb.com/weve-open-sourced-rendr-run-your-backbonejs-a/). **Server-side JS rendering was much quicker and better for SEO**.
- **Perceived performance is way quicker for server-side JavaScript**. The page renders and you instantly have the content. [Twitter saw a 5x perceived speed increase](https://blog.twitter.com/2012/improving-performance-on-twittercom) when they did this, too.
- Joel Spolsky said the [worst mistake a company can make is to rewrite from scratch](http://www.joelonsoftware.com/articles/fog0000000069.html).

## "Inside the Airbnb Brand Evolution" by [Fiona Tay](https://twitter.com/msfionatay) of Airbnb

- Rebranding was not as easy as changing the logo and a few hex codes.
- Dealing with lots of legacy code.
- **Quick growth makes it hard to write good code.**
- **They tested the redesign internally first by having an opt-in button on the website that was only visible to Airbnb admins.** They got tons of internal feedback.
- Rolled out O2 to all of the pages before launching the rebrand.
- When they re-skinned O2, they got an instant rebrand.
- **O2 killed tons of old CSS.**
- They store O2 in a separate repository and import it with NPM. Custom SCSS that O2 doesn't provide is written in the Airbnb repository, not the O2 repository.

## "Implementing a Visual CSS Testing Framework" of [@jessicard](https://twitter.com/msfionatay) of Bugsnag

- They wanted to visually test CSS by creating diffs and couldn't find a good tool, so they created one.
- Added save screenshot function calls in their rspec tests.
- Use BuildKite for their CI.
- Use selenium with Browserstack for the screenshots.
- Use imagemagick to make the diffs.
