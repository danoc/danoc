---
layout: post
title: Chrome Dev Summit 2015 Notes
description: Notes and highlights from the talks at the 2015 Chrome Dev Summit.
date: '2015-12-06T00:00:00.000Z'
---

Google held their second Chrome Dev Summit last month in Mountain View. In thier own words, "The Chrome Dev Summit is an exclusive event to connect with Chrome engineers and leading web developers for a two-day exploration of building beautiful and fast mobile web applications."

The [first edition of the conference was excellent](/blog/chrome-dev-summit-2014-notes/), so I (once again) [watched all of the talks](https://www.youtube.com/playlist?list=PLNYkxOF6rcICcHeQY02XLvoGL34rZFWZn) and took notes.

## Keynote by Darin Fisher, VP of Chrome

* Web is low friction. <span class="point">Average user interacts with 25 apps a month but visits 100+ websites a month. 80% of the time in apps is spent within 3 apps.</span>
* <span class="point">Products and themes of the summit</span>
  * Service worker: Don’t assume a consistent network connection
  * RAIL: An acronym that provides a good set of guidelines. Performance is what a user perceives it is.
  * Engagement: Add to home screen, push notifications.
* <span class="point">Progressive web apps: web apps that work "better" as they enable push notifications, add to the homescreen, work offline, but don’t rely on these technologies.</span>
* flipkart.com is a great example of a "progressive web app" on Chrome for Android.


## Developing for Billions

* Presented by Tal Oppenheimer, a product manager on Chrome.
* <span class="point">62% of global mobile connections are 2G. In India it is 87%.</span>
* 1 second delay can lead to 11% fewer page views and 16% decrease in customer satisfaction.
* There is a very real concern over data usage in some places.
* Chrome developer tools has a great feature to let users developers a slow connection.


## Deploying HTTPS: The Green Lock and Beyond

* Presented by Emily Stark, a software engineer on the Google Chrome security team
* <span class="point">HTTPS 102: A set of Chrome tools coming to a new security tab in the Chrome developer tools that will help developers understand and move to HTTPS.</span>
* Instead of showing a neutral looking page icon for non-HTTP sites, Chrome will begin to transition to a negative icon.
* <span class="point">Chrome will start requiring HTTPS for access to powerful APIs such as the system camera.</span>
* Included a bunch of security tips that went way over my head.


## Instant Loading with Service Workers

* Presented by Jeff Posnick, Developer Programs Engineer.
* Service worker with the right caching strategy prevents the network from getting in the way.
* <span class="point">App shell: HTML, CSS, and JS that provides the structure of the page.</span>
* <span class="point">The app shell, along with dynamic content, is the page.</span>
* <span class="point">HTTP requests talk to service worker which determines if it should read from the cache or network.</span>
* Example app installed service worker by creating a placeholder on a page called `/shell` that only loaded a basic HTML page with references to CSS and JS. Thinking of it as a skeleton loading page.
* <span class="point">Life of a service worker: Service worker fires install event, activate event, idles, and then fetches but is later torn down when it stops.</span>
* <span class="point">Two libraries make this easier:</span> [sw-precache](https://github.com/GoogleChrome/sw-precache) to load the app shell and [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) to help cache the content.
* [sw-precache](https://github.com/GoogleChrome/sw-precache) integrates with build process and will update the service worker when needed as local files change.
* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) provides different loading strategies for various routes.
    * You can tell it to request data from the cache and network at the same time and then update the cache once the network has new data.
    * It will help you limit the number of items that can be cached at once. This prevents the cache from getting too large.
* <span class="point">This does not mean that we shouldn’t still use cache-busting techniques in file names and long expiring HTTP headers.</span>
* <span class="point">App shell plus server worker model is the best way to structure web apps for instant load times.</span>


## Increase Engagement with Web Push Notifications

* Presented by Owen Campbell-Moore, Project Manager on Chrome
* Engineer at Facebook presented and stressed the importance of the mobile web, not only the native app. The mobile web push notifications were great for engagement.
* <span class="point">The mobile web push notifications work through service workers. A web server communicates with a push server which communicates with a service worker on the phone. The service worker doesn't have any context or data so it must fetch information from the server.</span>
* Notifications should be sent for data that is important *and* urgent.
* Chrome makes it easy to unsubscribe from the notifications.
* <span class="point">You shouldn't ask for notification permissions on initial page load. Show it after an action so the user understands what the notifications are for.</span>
* Make it easy for the user to change the types of notifications they receive.
* Don't show notifications twice if the user had the native app and mobile website. This is hard to do, but developers can check to see if the user is logged in in two locations with the same device. Or attempt to open the request for mobile web push notifications in a mobile app if available.
* Developers can refocus existing window instead of opening a new one.
* Developers should provide a "summary" notification for when there are multiple notifications.
* App shell with notifications makes for a great experience.
* <span class="point">Custom actions are coming soon.</span> Facebook Messenger, for example, could let users like a post without returning to the app.
* The push notifications will soon be able to include payload data. This removes the need to make a final request to the server for data.
* <span class="point">Mobile push notifications are an open standard developed by Google, Mozilla, and others.</span>


## Engaging with the Real World: Web Bluetooth and Physical Web

* Presented by Vincent Scheib and Scott Jenson, software engineer on Chrome and product lead on physical web.
* <span class="point">Web Bluetooth will enable the browser to connect to devices without additional software and in a very responsive interface.</span>
* Showed a demo of a heart rate monitor connected to a webpage.
* <span class="point">Website can request to see the nearby Bluetooth devices based on service type (devices that have a battery level, for example) or a custom device UUID. User then chooses the device.</span>
* Exists on Chrome and Android OS. Mozilla is beginning to implement.
* They are <span class="point">experimenting with Web NFC and Web USB.</span>
* <span class="point">Google wants the URL bar to be able to show URLs that are being "broadcasted" from nearby devices.</span>
  * This is <span class="point">designed with privacy in mind</span>. The user only gets a list of they want.
  * Similar to a better version of QR codes.
  * URLs go through a proxy to protect user from spam.
  * Transmission is one way so beacons can't detect the devices.
  * A bus stop could transmit URL to see GPS data, for example. Or a restaurant can broadcast a URL that lets visitors subscribe to receive a push notification when a table opens up.
  * There is no SDK. It's just a URL.
  * Chrome Dev and Opera both have support for this behind a flag.


## Asking for Permission: Respectful, Opinionated UI

* Presented by Elisabeth Morant, product manager on Chrome security team
* The opt-in rate for geolocation on mobile web is 6%. This is mostly because sites are asking for permission on initial page load. <span class="point">The new permissions API allows developers to ask for permission at the right time.</span>
* The opt-in rate for notifications is 17%.
* <span class="point">Show why before asking for permission and let users skip before the permission dialog opens. This allows developers to ask again at a better time.</span>
* It is possible to ask for multiple permissions at once. That should only be done when needed though.
* Allow users to revoke permissions from within your site.
* <span class="point">If the user doesn't grant permission, the UI should update accordingly and handle the failure gracefully.</span>
* Chrome is working on ways to prevent the abuse of permission requests. Facebook does a great job of this with their application ecosystem.


## Polymer: State of the Union

* Presented by Taylor Savage, Product Manager on the Polymer team
* <span class="point">Web components are happening: all of the browsers have some sort of support in the nightly versions.</span>
* Polymer 1.2 has made improvements to performance, accessibility, and added new features.
* We are finally at a time where feature like Web Components and Service Workers make the web a first class platform. We can now build features on that platform on ways it intended and the platform improvements will improve our application.
* The Polymer team will be adding error checking code (Polylint) and Chrome developer tools (Polydev). Routing, i18n, and lazy-loading.


## Progressive Web Apps

* Presented by Alex Russell, Software Engineer on Web Platform team and an engineer from Opera
* <span class="point">There have been plenty of tools that allow web apps to work offline. Service workers are finally a low-friction solution.</span>
* The amount of money it takes a desktop web user to download an application costs more and more.
* Apps lose about 20% of conversions at every step of the installation funnel.
* <span class="point">Apps must support service workers, be HTTPS, and include a manifest file to show a "Add to home screen" prompt in Chrome.</span> Chrome will only show it on repeat page loads to prevent spam.
* <span class="point">The manifest file allows developers to specify app icons, theme color, and other properties that make the website feel like a native application.</span>
* If developers choose to make a web app appear as a standalone app (no browser bar), they can also target that display as a media query.
* <span class="point">`chrome://inspect` lets developers run the Chrome inspector on their physical device.</span>
* There will soon be a services worker tab within "Resources" in the Chrome developer tools.
* If you hide the browser navigation bar, the app should provide navigation.
* Developers can listen for the "Add to home screen" event and ask Chrome to wait until a better time.


## Building Progressive Web Apps with Polymer

* Presented by Rob Dodson, Senior Developer Advocate
* <span class="point">Check to see if web components are supported before loading the polyfill.</span>
* Polymer adds an `unresolved` attribute to the `<body>` to prevent FOUC. You can remove that, though, if you want the page to start rendering quickly.
* <span class="point">Browsers that support custom elements have an `:unresolved` pseudo class that developers can use to make the element look like it will once the content loads.</span>
* An easy way to paint quickly is to create a skeleton of the application that appears initially and is hidden with JavaScript once the page loads.
* Best practice when using Polymer is to prefetch everything needed for the app shell.
* <span class="point">We have been trained to not use the web browser when offline. This is a great reason why Chrome’s new web app install banner is useful.</span>
* Polymer Starter Kit is a project that provides a sample manifest, meta tags, and device icons.
* Lots of content in this talk was mentioned in previous talks.


## Accessibility

* Presented by Laura Palmaro, Accessibility Program Manager for Chrome and Chrome OS, and Alice Boxhall, Software Engineer on Chrome
* <span class="point">Types of disabilities that users might:</span>
    * Fully bling, using screen reader of braille display
    * Color blind
    * Hearing impaired, using captions
    * Users who can’t use a mouse and rely on typing
    * Users who can’t type and use voice control, an eye tracker, or switch control
    * Dyslexic users
    * Aging population
* You don’t have to test your UI on every type of disabled person, but there are some design decisions that can make the website more accessible.
* <span class="point">Accessibility manual testing checklist</span>
  * Focus/keyboard
    * Focusable
    * Focus visible
    * Keyboard support
  * Semantics
    * Declared semantics
    * Meaningful structure
    * Labels
  * Flexible UI
    * Sufficient contrast
    * Redundant color
    * High contrast
    * Magnification
* <span class="point">When you create an element on a page, you get a visual rendering, a DOM object, and an accessibility node that is used by screen readers.</span>
  * <span class="point">For custom elements, you get the visual rendering, DOM object, but not the accessibility node.</span>
  * <span class="point">Aria attributes help fill that gap.</span>
  * The attributes must be kept up-to-date when the custom element state changes.
* Basic tips: use labels for inputs, alt text for images, `aria-label` attribute to provide hints to screen readers, `aria-labelledby` to specify an the ID of a hidden element that contains a lengthy label.
* Alt text is not the same as a title.
* Polymer team writes regression tests for elements.
* <span class="point">Chrome has an accessibility developer tools plugin: [bit.ly/a11y-devtools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)</span>


## Introduction to RAIL
* Presented by Paul Lewis, developer advocate, and Paul Irish, front-end developer on Chrome
* The performance/success graph is not linear.
* <span class="point">The user context matters when speaking of performance. 50ms when scrolling feels like an eternity compared to 50ms on page load.</span>
* <span class="point">RAIL: Response, Animation, Idle, and Load</span>
    * <span class="point">Response (100ms):</span> The user feels an instantaneous response because the paint occurred quickly after click.
    * <span class="point">Animation (16ms):</span> Visual changes feel smooth and consistent.
    * <span class="point">Idle (50ms):</span> User isn’t interacting with the page yet, but they will be soon. This time should be used to proactively schedule work that will be completed in 50ms chunks.
    * <span class="point">Load (1s):</span> Getting the first meaningful paint


## DevTools in 2015: Authoring to the max

* Presented by Paul Bakaus, Developer Advocate
* Chrome now has a full time designer working on DevTools.
* Tabs in DevTools can be dragged and reordered.
* Color picker allows you to choose a color on the page with a eye-drop tool or a list of preset colors already on the page. Future versions will also show which colors provide enough contrast.
* <span class="point">A new device mode is being built for the mobile first world. The UI is much simpler and it now provides the ability to show the Android system bars, and shows a list of the media queries. Throttling is being moved to the "Network" tab.</span>
* <span class="point">"Inspect Devices" feature is being moved to the DevTools, not a hidden page in Chrome.</span>
* <span class="point">Many animations are a complex combination of small animations. [DevTools can now group these together](https://youtu.be/dJR-n8szgBc?list=PLNYkxOF6rcICcHeQY02XLvoGL34rZFWZn&t=1142), allowing developers to slow them down and see a timeline of each animation.</span>
* Way better service worker tools are on the way in "Resources" tab.
* <span class="point">[Preview of a new DevTools feature under development](https://youtu.be/dJR-n8szgBc?list=PLNYkxOF6rcICcHeQY02XLvoGL34rZFWZn&t=1597) that allows layout manipulation.</span>


## RAIL in the real world

* Presented by Paul Lewis, developer advocate
* Not each RAIL action is equally important. Depends on the type of website and context.
* If a user taps on an item and a list expands, three RAIL actions occur: Response, Load, and Animation. Response is the most important, in this case, because it immediately follows the user’s interaction.
* Improving Response:
  * Goal is to get it under 100ms.
  * Use `setTimeout` to show a spinner after 100ms. Clear the timeout if it the data loads beforehand so the spinner does not appear.
  * DevTool’s `console.time` can be used to measure the response. Start measuring on click and then end on `requestAnimationFrame`. This will appear in the console once recording and performing the action.
* Improving Animations:
  * Developers actually have 8ms, not 16ms. The browser has overhead and housekeeping to do which takes up about 8ms.
  * [csstriggers.com](http://csstriggers.com/) shows the browser actions that each animating each CSS property triggers.
  * <span class="point">[Paul uses a process called FLIP](https://aerotwist.com/blog/flip-your-animations/) to easily animate using efficient properties like transform and opacity.</span>
    * <span class="point">First: Find the position of the initial state with a function like `getBoundingClientRect`.</span>
    * <span class="point">Last: Add a class that puts it in the final position. Call `getBoundingClientRect` again.</span>
    * Invert: Apply a transform to move it back to the initial position.
    * Play: Turn on animation by applying `transform: none`.
  * If the response work only takes 10ms, there is 90ms to do the FLI parts of FLIP.
  * Transitions can be measured with `transitionend` JavaScript event.
  * Avoid doing work on scrolls.
* Improving Idle:
  * Target time is 50ms.
  * There was no way to know when the user is idle.
  * <span class="point">[Chrome now has `requestIdleCallback`](https://developers.google.com/web/updates/2015/08/using-requestidlecallback?hl=en) that allows process queued up tasks when the browser thinks that the user is idle.</span>
  * Good for non-essential work like analytics.
  * Requires thinking in small, deterministic operations.
* Improving Load:
  * Target is 1,000ms for the 75th percentile.
  * Inlining the initial view and lazy-loading (with async or defer attributes) everything else is critical.
  * In a voice recording web app, it makes sense to load the core assets first, followed by the recording, edit, list, and details assets in order. This follows the expected user flow.
  * <span class="point">Developers can’t control the user’s connection, but they can implement service workers to ensure that subsequent page loads are quick.</span>
* <span class="point">[webpagetest.org](http://www.webpagetest.org/) is a great resource for measuring performance.</span>


## V8 Performance from the Driver's Seat

* Presented by Seth Thompson, Product Manager for V8
* The V8 engine and developer must work together to write fast JavaScript.
* TurboFan is the new JavaScript compiler for V8.
  * Designed to optimize ES2015.
  * Will use static type information. It will soon be able to optimize asm.js and WebAssembly.
  * Intelligently reduces memory usage and latency during idle time with garbage collection. It can do this because Blink now gives it information about idle time.
  * Can now shrink the heap by 40% when running as a background tab.
* Ignition is an experiment to give up a bit of speed in exchange for saving 3x - 4x memory. This is important for users on smaller devices.
* In 2016 V8 will be digging into the patterns that the top frameworks are using and spend time optimizing those patterns.
* Tips for writing better performing code:
  * Understand how modern JavaScript engines work.
  * Understand the tools to view JavaScript performance instead of memorizing all of the rules. Running `node --trace-deopt example.js | grep -u DEOPT` shows how many functions needed to be unoptimized by the compiler.
  * Stay up to date by following [v8project.blogspot.com](http://v8project.blogspot.com/).
  * Communicate with engine implementers, StackOverflow, and [v8-users@googlegroups.com](mailto:v8-users@googlegroups.com)
* <span class="point">Don’t use micro-benchmarks to make design decisions. Developers should look at their app benchmarks, not an isolated environment.</span>


## Quantify and improve real-world RAIL

* Presented by Ilya Grigorik, Chrome Developer Advocate
* Performance in not static in real world since environments are always fluctuating and evolving.
* <span class="point">There was a team at Google that discovered their application ran slower when it was hot outside. That is because drivers used the product and the sun from the windshield slowed down the phones.</span>
* RU(M) is Real User Measurements
* Quantify and improve
  * Response
    * The application latency can be measured with `performance.mark`.
    * Proposal to change `event.timeStamp` will provide earlier OS-level metrics.
    * <span class="point">Implementation underway to add third parameter to `document.addEventListener` that, when passed with `{ passive: true }` prevents the browser from blocking on the main thread and promises that `preventDefault` won’t be called.</span>
  * Animation
    * <span class="point">New API called `IntersectionObserver` will allow developers to determine when a selector is in the viewport without needing to constantly poll on the main thread and block execution of other, higher priority code.</span>
    * How much work can we do in 16ms? It’s way too hard to know upfront.
    * <span class="point">Frame Timing API:  `PerformanceObservers` will allow developers to listen for slow frames.</span>
  * Idle
    * <span class="point">A new API `window.requestIdleCallback` (mentioned in a previous talk) allows developers to move work into the browser’s idle blocks.</span>
    * Don’t exceed the idle deadlines.
  * Load
    * <span class="point">Make the critical path local with ServiceWorker using the application shell.</span>
    * It’s now possible to measure how long it took to start the service worker.


## Owning your performance: RAIL

* Presented by Paul Irish, software engineer on Chrome
* DevTools "Network" tab
  * Has a new capture screenshot button that gives a better sense of what is happening.
  * <span class="point">It’s a good idea to look at the first meaningful paint and look at the requests that happened beforehand.</span>
  * <span class="point">DevTools has a hidden "Priority" column in the table of network requests. Right click on the table header to enable it. The priorities map (more or less) to if it is render blocking or not.</span>
  * It is possible to select multiple file types by holding `CMD` when clicking.
  * <span class="point">Holding `Shift` when hovering over a file shows the complete path to the resource and the relationships between the files.</span>
* DevTools Timeline Tab
  * [The red at the top of the timeline](https://www.dropbox.com/s/gj99vgv358ie6xw/Screenshot%202015-12-06%2011.01.06.png?dl=0) indicate potential responsiveness concerns.
  * <span class="point">Green blips under the red represents the frame rate. Taller is better.</span>
  * Yellow underneath is script, purple is recalculation of styles and layout. This is an indication of the work being done on the main thread.
  * It’s possible to add the network requests and screenshots under the timeline.
  * Paul does a performance audit of HotelTonight and realizes that the first meaningful paint happens immediately after the HTML document loads because they use inline styles for their CSS (with React).
  * <span class="point">The height of a callstack is not necessarily a problem.</span>
  * Hold shift when scrolling vertically through the callstack to not scroll horizontally.
  * Record and then view the functions in the "Bottom-Up" pane. The HotelTonight audit revealed that 230 ms was spent on an error handler in React. This can be used to drastically speed up parts of the site that are behaving slow.
  * The "Connection Id" column shows which requests are being done together.
  * The functions at the bottom of the "Bottom-Up" pane can also be grouped together by URL.
* <span class="point">Paul has done many performance audits that are available online.</span>


## HTTP/2 101

* Presented by Surma, engineer on the Chrome team
* <span class="point">There is no way that HTTP/2 will be slower. It is performance for free.</span>
* <span class="point">Concatenation, minification, inlining, spriting, sharding, vulcanizing, and gzipping are all workarounds for the HTTP/1.x limitations.</span>
* <span class="point">HTTP/2 is an upgrade to HTTP1/.1. In other words, all connections start as HTTP/1.1 but get "upgraded" if the client supports HTTP/2.</span>
* HTTP headers can now be compressed in HTTP/2 thanks to HPACK, a header compression specifically for HTTP.
* Financial TImes saw a large decrease in load time by moving static assets to a HTTP/2 enabled Akamai server.
* In HTTP it is better to keep the number of asset origins as small as possible because of how the compression works.
* <span class="point">The "Push" feature allows the server to send back certain assets such as style sheets and JavaScript in the initial response before the client even requests it.</span>
* <span class="point">Even with HTTP/2, developers still need to worry about: GZIP/deflate, improving first render, minimizing DNS lookup, and cache-control.</span>
* Almost all browsers, servers, and languages support HTTP/2. Complete list exists at [bit.ly/http2implementations](https://github.com/http2/http2-spec/wiki/Implementations)
* You can see the protocol that an asset was loaded over by showing the "Protocol" column in the table within the DevTools “Network” tab.
* You can put static assets on an HTTP/2 CDN and serve the rest of the site over HTTP/1.1.


## Building and deploying a Progressive Web App at scale with Flipkart

* Flipkart Lite is a great example of a highly performant web application that also works well offline. Google it and open in Chrome on mobile to test it.
* Took 5 engineers and 42 days to build.
* The first page load contacts the Node web server and receives the HTML page shell. Subsequent requests go through the service worker.
* There could be many page shells depending on the complexity of an application. This is not a good thing. It may be better to break the application into many small single-page apps.
* <span class="point">They were able to achieve 30 ms paint times on 2G after first-load thanks to service workers.</span>


## Leadership Panel

* <span class="point">Chrome team is working hard to make "Add to Homescreen" behave like a native app, but there are challenges in showing battery and data usage for the web app.</span>
* Chrome is removing SMIL because they don’t see it working in every browser. They will only deprecate it or remove it once there are solid alternatives in place.
* The technology that "wins" on the web is not necessarily the best designed one.
* <span class="point">[Is the web moving forward too fast?](http://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html) They don’t think so. Looking at early adoption among developers and communication between other browser vendors is a good indication.</span>
* Saving to homescreen and opening a web app in fullscreen removes the URL bar so websites must provide their own navigation tools. It also removes the share button. There are [ways to trigger the native share action](https://paul.kinlan.me/sharing-natively-on-android-from-the-web/) on Chrome for Android.
