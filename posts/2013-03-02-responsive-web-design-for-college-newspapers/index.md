---
title: Responsive web design for college newspapers
date: "2013-03-02T08:43:00-05:00"
slug: responsive-web-design-for-college-newspapers
---

Saturday morning I spoke about responsive web development for college newspapers at the ACP Midwinter National College Journalism Convention in San Francisco. As promised, here are the slides and notes.

---

## State of the Web

Mobile traffic is quickly increasing as we become more connected than ever. At [Pipe Dream](http://www.bupipedream.com/), the school newspaper I work for, over 25% of traffic is from mobile devices. You can't ignore mobile.

## Examples

- **[Boston Globe](http://bostonglobe.com/)** (Sept. 2011) - Set the bar and started a trend
- **[TIME](http://time.com)** (Oct. 2012) - Over 12% of traffic to TIME comes from social meida. They are doing so on mobile.
- **[Pipe Dream](http://bupd.me/)** (Feb. 2012) - Redesign I led back in 2012.
- **[Daily Orange](http://dailyorange.com/)** (Aug. 2012) - Created by the makers of the Boston Globe website.
- **[Daily Kansan](http://kansan.com/)** (Aug. 2012)

## Ditch the App

There are two ways to create a mobile app for you college newspaper. You can sign up with a vendor and let them take care of the development. Or, you can find a developer to build one for you. Both are bad investments.

### Vendor

A vendor will give you an application that is little more than a glorified RSS reader. They are often poorly designed and offer little flexibility since all of their clients extend from the same base application.

### Custom application

You can hire a developer and get the app of your dreams, but let's be honest. How many students will download and actually use your paper's application?

Also, will you support iOS and Android? What if Windows Phone is the next big thing? Code written for one operating system is not easily portable to another.

The better approach is to modify your _existing layout_ to work on all devices. This is the idea behind responsive design.

## Responsive Web Design

Responsive websites adapt to the width of the browser. They look great on _any_ device with _any_ viewport. This is key. You shouldn't design for specific devices. There are too many devices and too many screen sizes. Instead, you should ensure the site looks great at any width.

There are three components to a responsive website: a fluid layout, flexible images and media, and media queries.

### Fluid layout

A fluid layout will shrink and expand accordingly as you resize the broswer. This is because fluid layouts use percentages instead of pixels for width values. Also, the container `div` has a `max-width`, not a `width`.

If you had a two column layout inside a 980px container and the main column was 624px, you would switch the `width` of the container to a `max-width` and find the percentage value of 624px. In this case, it is 65% since 624/960 = 65%. The sidebar, of course, would be 35% wide. You would change the pixel values to their equivalent widths.

The `max-width` means that the container will be _at most_ 960px. The percentages allow the columns to keep their relative widths as the broswer viewport goes below 960px.

Your website should now contract as you make the browser window smaller. The content may look "squished," but the horizontal scrollbar should not appear.

### Flexible images and media

Now that our layout is fluid, we must ensure that images and media resize appropriately. To do this, add the following code to your CSS rules:

```css
img,
embed,
object,
video {
  max-width: 100%;
}
```

This code will target the `img`, `embed`, `object`, and `video` HTML tags and set the `max-width` to 100% so these tags are only as wide as the container that contains them. If you resize the broswer window, the media will shrink if necessary.

### Media queries

Maximize your browser then slowly decrease the width. When the content becomes hard to read or something looks wrong, you've identified a breakpoint. If a horizontal scrollbar appears, you made a mistake in the previous steps.

Once you have found a breakpoint, you need to determine the width of the browser. I personally use the [Chrome Web Developer extension](https://chrome.google.com/webstore/detail/web- developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=en) (install the plugin and click on Resize > Display Window Size to view the width). We will target that breakpoint with a media query.

```css
@media only screen and (max-width: 980px) {
  #search-form .search-bar {
    width: 180px;
  }
  header .logo {
    padding-bottom: 15px;
  }
}
```

The media query above will set the width and bottom padding of a search bar to 180px 15px when the browser width is less than or equal to 980px.

### Viewport

Mobile browsers assume that web pages are designed for desktops and zoom out the page. We can tell it that the website is "mobile-friendly" by setting the viewport in the ".

This tells the browser that the width of the page is equal to the device's width and the browser should not be zoomed in when loading the page.

---

A responsive website has a fluid layout, flexible images and media, and many media queries.

## Advanced Issues

There are a few issues that often arise when developing a responsive website.

### Large image sizes

Despite changing the `max-width` of our images, we are still downloading the large files. This wastes resources and slows down the webpage for mobile visitors. [Adaptive Images](http://adaptive-images.com/) solves this issue by serving images with the optimal resolution for the user's device.

### IE 6-8 compatibility

Internet Explorer 6-8 do no support media queries, but the great [Respond.js](https://github.com/scottjehl/Respond) script can fix that. It's fairly lightweight and works well!

### Detecting viewport with JavaScript

There are many different ways to [target specific viewports with JavaScript](http://responsejs.com/labs/dimensions/). For a basic responsive layout, however, you should not _need_ JavaScript.

## Tools

- [Responsive Design Bookmarklet](http://responsive.victorcoulon.fr/) \- Simulate your website on multiple devices.
- [Chrome Developer Toolbar](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm) \- Used to find the "breakpoints" in your design. In other words, the toolbar can be used to determine the viewport width when resizing the browser.

## Further Reading

- [Responsive Web Development](http://www.abookapart.com/products/responsive-web-design) by Ethan Marcotte - Great book by the man that coined the term.
- [HTML and CSS Guide](http://htmldog.com/) on HTML Dog - A bit outdated, but a good website for learning HTML and CSS.

---

I hope the talk taught everyone a bit about responsive web development. It's not magic — there _is_ a learning curve. That said, this is something that can be learned in a summer.

Questions? Leave a comment or shoot me an email at [daniel@danoc.me](mailto:daniel@danoc.me).
