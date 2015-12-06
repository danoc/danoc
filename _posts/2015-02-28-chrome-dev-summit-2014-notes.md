---
layout: post
title: Chrome Dev Summit 2014 Notes
description: Notes and highlights from the talks at the 2014 Chrome Dev Summit.
date: '2015-02-28T00:00:00.000Z'
---

* Playlist: [https://www.youtube.com/playlist?list=PLOU2XLYxmsILE0KnGTKKj2SsOtxsK_y_d](https://www.youtube.com/playlist?list=PLOU2XLYxmsILE0KnGTKKj2SsOtxsK_y_d)
* CSS-Tricks notes: [https://css-tricks.com/things-chrome-dev-summit-2014/](https://css-tricks.com/things-chrome-dev-summit-2014/)

## Wicked Fast
* More processes moving to the GPU.
* There a push to get 60 frames per second, or 16 milliseconds per frame.
* The Activity Transitions API will allow parts of web pages that exist between page loads will remain on the web and animate/transition to the new spot on the page. The feature is far from complete but will be backwards compatible in whichever form it ends up. [https://youtu.be/v0xRTEf-ytE?t=16m8s](https://youtu.be/v0xRTEf-ytE?t=16m8s)
* Navigation Transitions API will let you seamlessly switch from a browser to native app. Using it with the Activity Transitions API looks incredible. [https://youtu.be/v0xRTEf-ytE?t=17m57s](https://youtu.be/v0xRTEf-ytE?t=17m57s)
* Goal is to blur the line between web app and native app.

## Making Web Apps Appy
* Offline needs to actually work
* Access to system UI like placement on the home-screen and full screen at runtime.
* Access to powerful capability like notifications, synchronization, hardware access.
* Chrome on mobile has already started to address this. Now tabs appear as applications in the "recent apps" menu, there is offline support, and websites can send notifications to the system and connected devices including wearables.
* These things are accomplished with service workers, manifests, and the Push Notification API.
* Google has been trying to accomplish this for a long time. Remember Google Gears?
* Service workers don't run forever. The system reserves the right to kill them if they aren't doing anything.
* Demo of service workers: [http://youtu.be/QbuLq4f6DGQ?t=37m45s](http://youtu.be/QbuLq4f6DGQ?t=37m45s)

## Asking for superpowers: Chrome's permission model
* Mostly about the security, privacy, and potential spam problems.
* All of these new APIs will require https.

## Material Design Deconstructed
* Talked about the existing material design, much of which is on their website.

## The Applied Science of Runtime Performance
* Talk given by the guy that built the Chrome Dev Summit website.
* csstriggers.com, created by the speaker, will tell you what a CSS property triggers.
* The conference website uses transform and opacity transitions for performance. It also uses clip, which isn't good for performance. So he used a user agent test to only show the best animations on Chrome.
* There is a myth that all frames must be under 16ms. The only part that needs to be 60 frames per second is when the animation is running. There is a 100ms limit allowed between when the user takes an action and the animation starts and 50-100ms between when the animation ends the user perceives that it ends. Do expensive work in the beginning and end.
* The conference website works offline.
* Chrome will have a sweet animation tab in the developer tools. [http://youtu.be/RCFQu0hK6bU?t=20m27s](http://youtu.be/RCFQu0hK6bU?t=20m27s)
* The W3C Frame Timing API will let you measure the performance of JS, CSS animations, and scrolling performance. You can also automate and catch performance issues before it happens.
* [http://aerotwist.com/blog/flip-your-animations/](http://aerotwist.com/blog/flip-your-animations/)

## TLS All the Things!
* HTTP/1 was built for documents; HTTP/2 is built for applications.
* HTTP/2 supports multiplexing (multiple requests/responses on a single connection), stream priority (prioritize a JS file over an avatar, for example), and header compression.
* HTTP/2 needs TLS. It needs to prevent the tampering that middle-boxes were allowed to do with HTTP/1.

## Easy composition and reuse with Web Components
* One of the nice things about web components is that the outer CSS does not affect the CSS inside the shadow.
* Custom elements let you register a new tag and "extend HTML" with `document.registerElement`.
* The `template` lets you specify the HTML and CSS for a shadow DOM so that it doesn't need to be written in the JavaScript.
* You can put the `template` tag and relevant JS in an HTML file and import it in the main file. This cleans the HTML a ton.

## Polymer: State of the Union
* Polymer is an experiment to show that web components are awesome.
* Polymer needed some more work on cross-browser performance and payload, but now they made a bunch of changes and improved that.
* Includes polyfills to add support for web components in Safari.

## Let’s build some apps with Polymer!
* Polymer wants to be the SDK for mobile web applications.
* Great talk showing how to build a contact application with Polymer that uses almost no custom code and works offline.

## Fundamentals of Mobile Web Development
* Talked about Web Starter Kit, although it doesn't seem all that helpful for my projects since I'm already implementing much of what they include.
* Introduced a bunch of new features in the "Timeline" tab within DevTools that help diagnose slow parts of the application and hit 60 frames per second.

## Web Components and Polymer Panel
* Encapsulation in components hides complexity, but it also hides potential performance issues.

## Future of Apps Panel
* A future web app should work offline, have push notifications, etc...
* Study says users are only using twelve apps at once. The web is a great way to reach them because of less friction.
* One of the reasons friction is so low on the web is because there is a strong sense of security. There are a bunch of security and privacy issues related to exposing APIs to system hardware.
* Gmail's web client has replaced mail clients for many on the web. Why not mobile? Because of performance, lack of notifications, and offline access is important, and harder to add to the home screen.
* Where do URL bars work in hybrid apps? They aren't 100% sure yet but aren't satisfied with the current approach.
* You can start using service workers today. They are progressive enhancement.
* Will push notifications be standard or will it depend on the browser? Currently, they tend to be tied to the client OS that they are running on.
* The transitions API will probably not replace single page apps because, to the browser, it's like you did an entire page refresh. Assets are all fetched again.
* If you have a service worker and use the transitions API, you can probably get some really good performance. It the very least, it will be much easier to implement.

## Performance Panel
* For HTTP/2, you don't have to really worry about spriting, concatenating, sharting, serving content off of a static domain instead of main domain.
* There will be a long time where some users are on browsers that don't support service workers. It's important to implement it as progressive enhancement.
* The Chrome team thinks that they can get to 60fps for all CSS properties, but it's not easy and you can't except all browsers to do the same soon.

## Material Design panel
* It's no longer important to think screen to screen. You now have to think how you transition from screen to screen.
* You can still add your brand to material design. [http://youtu.be/o5vBqG-IQQI?t=17m3s](http://youtu.be/o5vBqG-IQQI?t=17m3s)
* How do you prevent your website from looking generic when using material design? (Preventing the same thing that happened to jQuery UI or Bootstrap.) Break some of the rules but be careful when changing some patterns. [http://youtu.be/o5vBqG-IQQI?t=40m52s](http://youtu.be/o5vBqG-IQQI?t=40m52s)

## Chrome Leadership panel
* No plans to add extensions to mobile.
* Why do some Google products including Inbox and Google Docs either block some browsers or ask users to upgrade? [http://youtu.be/ztHMwIAbZ5M?t=21m33s](http://youtu.be/ztHMwIAbZ5M?t=21m33s)
* Top three priorities on Chrome:
  1. Making it work super well on mobile.
  2. Blurring the line between applications and the browser on mobile.
  3. Speed, simplicity, security.
