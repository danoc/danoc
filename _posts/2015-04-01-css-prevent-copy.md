---
layout: post
title: Prevent an element from being selected and copied with CSS
description: How to use pseudo-elements, data attributes, and CSS's content property to prevent text from being selected and copied.
date: '2015-04-01T00:00:00.000Z'
---

I was recently helping a coworker build a code diff viewer that supports line numbers, wraps text properly, and prevents line numbers from being copied when selecting the code.

Adding line numbers and wrapping text is easy: just use a table and make a `tr` for each line of code.

Preventing the line numbers from being selected and accidentally copied to the clipboard is much trickier.


## An elegant solution using pseudo-elements

Combining pseudo-elements and the CSS `content` property, we can prevent text from being selected _and_ copied to the clipboard.

```html
<p data-pseudo-content="Lorem Ipsum"></p>
```

```css
[data-pseudo-content]::before {
  content: attr(data-pseudo-content);
}
```

We can take this example a bit further and support both `::before` and `::after`.

    [data-pseudo-content]::before,
    [data-pseudo-content--before]::before,
    [data-pseudo-content--after]::after {
      content: attr(data-pseudo-content);
    }

## Why the pseudo-element works

Content displayed on a page using the CSS `content` property is never added to the DOM. This prevents the text from being selected or copied without the use of `(-prefix-)user-select: none`.

Despite this, you can [access the `content` values in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle#Use_with_pseudo-elements) with `getComputedStyle`. The best approach, however, is to use [`element.getAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) to grab the value of the data attributes directly from the HTML.


## Accessibility concerns

There are a [handful](http://www.karlgroves.com/2013/08/26/css-generated-content-is-not-content/) [of](http://cssgallery.info/testing-the-accessibility-of-the-css-generated-content/) [articles](http://lists.w3.org/Archives/Public/www-style/2010Nov/0437.html) [online](http://www.456bereastreet.com/archive/201205/css_generated_content_and_screen_readers/) stating that screen-reader support for the `content` property is not consistent. Keep that in mind when using this technique.


## What about `(-prefix-)user-select: none`?

All major browsers (including IE 10+) support `(-prefix-)user-select: none`. This prevents users from selecting an element.

```css
.unselectable {
  -moz-user-select: none;
  webkit-user-select: none;
  ms-user-select: none;
}
```

This _does not_, however, prevent the text from being copied to the clipboard in all browsers. Also, it [is not part of the CSS standard](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select) and there are no plans to add it.


## A live example

Here is a stripped down recreation of the code diff viewer I helped my coworker build:

<p data-height="300" data-theme-id="0" data-slug-hash="ByGKZv" data-default-tab="result" data-user="danoc" class='codepen'>See the Pen <a href='http://codepen.io/danoc/pen/ByGKZv/'>ByGKZv</a> by Daniel O'Connor (<a href='http://codepen.io/danoc'>@danoc</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

(You could use [CSS counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters) to generate the line numbers, but that is out of scope for this example.)

Notice that the line numbers can't be selected or copied and the text wraps if it gets too long. Mission accomplished!
