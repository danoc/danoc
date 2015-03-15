---
layout: post
title: Prevent an element from being selected and copied with CSS
date: '2015-03-05T00:00:00.000Z'
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

```css
[data-pseudo-content]::before,
[data-pseudo-content--before]::before,
[data-pseudo-content--after]::after {
  content: attr(data-pseudo-content);
}
```


## Why the pseudo-element works

Content displayed on a page using the CSS `content` property is never added to the DOM. This prevents the text from being selected or copied without the use of  `(-prefix-)user-select: none`.

Despite this, you can [access the `content` values in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle#Use_with_pseudo-elements) with `getComputedStyle`. Although, since the values are also in the HTML, the best approach is to use [`element.getAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) to grab the value of the data attributes.


## Accessibility concerns

There are a [handful](http://www.karlgroves.com/2013/08/26/css-generated-content-is-not-content/) [of](http://cssgallery.info/testing-the-accessibility-of-the-css-generated-content/) [articles](http://lists.w3.org/Archives/Public/www-style/2010Nov/0437.html) [online](http://www.456bereastreet.com/archive/201205/css_generated_content_and_screen_readers/) stating that screen-reader support for the `content` property is not consistent. Keep that in mind when using this technique.


## What about`user-select: none`?

All major browsers (including IE 10+) support `(-prefix-)user-select: none`. This prevents users from selecting an element.

```css
.unselectable {
  -moz-user-select: none;
  webkit-user-select: none;
  ms-user-select: none;
}
```

This _does not_, however, prevent the text from being copied to the clipboard in all browsers. Also, it [is not part of the CSS standard](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select) and there are no plans to add it.


## The final code diff viewer




<!-- <p data-height="268" data-theme-id="0" data-slug-hash="ByGKZv" data-default-tab="result" data-user="danoc" class='codepen'>See the Pen <a href='http://codepen.io/danoc/pen/ByGKZv/'>ByGKZv</a> by Daniel O'Connor (<a href='http://codepen.io/danoc'>@danoc</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script> -->

```html
<table>
  <tr>
    <td><!-- Previous line number --></td>
    <td><!-- New line number --></td>
    <td><!-- '+' or '-' --></td>
    <td><!-- Line of code --></td>
  </tr>
</table>
```

<!-- GitHub: Same approach as me
BitBucket: Doesn't wrap their text
CodeMirror: can't figure out
Google Code: uses tables, but doesn't wrap and breaks if you force it wrap https://code.google.com/p/moving-pictures/source/browse/trunk/Setup/MovingPictures-Native.xmp2#1626


http://thanpol.as/jekyll/jekyll-code-highlight-and-line-numbers-problem-solved/


https://stackoverflow.com/questions/10930301/how-to-prevent-user-from-selecting-and-copying-text-from-my-webpage
https://stackoverflow.com/questions/16926792/prevent-certain-html-elements-from-being-copied -->
