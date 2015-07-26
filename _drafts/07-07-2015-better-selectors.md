---
layout: post
title: Writing good selectors for integration tests and JavaScript hooks
date: '2015-07-07T00:00:00.000Z'
---

Some problems are amplified when you start refactoring the HTML and CSS in a large codebase.

I merged a large feature branch in March that integrated Optimizely's CSS framework into the product. Five designers and front-end developers contributed to the branch over the course of weeks, reskinning buttons, dialogs, and dozens of other components.

**The complicated HTML refactor surfaced two problems:**

1. Our integration test selectors were _very_ specific.
2. Removing `class` or `id` attributes from elements was dangerous because of existing jQuery selectors in legacy code.

We fixed the broken integration tests, performed manual testing, and searched the codebase for potentially broken jQuery selectors.

This took a while. It would happen again in future refactors unless we developed a set of recommended best practices for creating JavaScript and integration test hooks.

I drafted a one-page document and invited a few engineers to leave comments. These are the best-practices that we agreed on and continue to evangelize.


### Use a `data-test-section` attribute for integration and end-to-end test selectors

**Problem:** Integration tests used specific CSS-style selectors such as `select.goal-type.full-width` and `.form-fields .form-field__item:nth-child(2)`. These break easily during refactors when classes are replaced or markup is changed.

**Solution**: Encourage developers to use a `data-test-section` attribute on elements that integraton tests use. The value must be unique enough to ensure that is the only one on the page being tested and that a global search can find the tests and elements without much noise.

Here's an example of a submit button in a login dialog:

```html
<button data-test-section="dialog-login-submit-btn">Log in</button>
```

Engineers have written helper functions (such as `clickTestSection('example')`) that makes it easy to write better tests.


### Prefix classes with `.js-` when writing JavaScript hooks

**Problem:** It was unclear when removing `id` and `class` attributes from certain elements would break functionality. This could happen if an `id`, for example, was used as a jQuery selector in our legacy JavaScript.

Each case required a global of the codebase which greatly slowed down the refactor and made it more error-prone.

**Solution:** Prefix new JavaScript selectors with `.js-`. These classes should only be used as JavaScript hooks and never styled with CSS. The prefix serves as an indication that the element is used as a hook and makes the codebase more searchable since the class name becomes more unique.

I recommend using a prefixed `class` instead of an `id` (despite slightly slower performance) since elements can only have one `id` and the attribute is used as [a fragment identifier in HTML](https://en.wikipedia.org/wiki/Fragment_identifier).

(I _also_ recommend avoiding jQuery selectors for this very reason!)

***

It was suprisngly easy to adopt and evangelize this at Optimizely.

I presented to the Front End Community of Practice (CoP) and Testing Cabal, two cross-product groups that meet every other week. I also emailed a one-page Google Doc to the engineers and welcomed comments.

That, along with the help of diligent code reviewers, was all it took to decouple our selectors from HTML markup.
