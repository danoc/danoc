---
title: Easier HTML refactors through better selectors
description: Best practices for integration test selectors and JavaScript hooks that we've adopted at Optimizely.
date: "2015-09-23T00:00:00Z"
slug: better-selectors
---

I recently merged a gigantic feature branch at Optimizely that further integrated our new CSS framework into our product. Five designers and front-end developers contributed to the branch over the course of weeks, reskinning buttons, dialogs, and dozens of other components.

The HTML refactor surfaced two critical problems:

1.  Our existing integration tests use _very_ specific CSS style selectors to select HTML elements.
2.  There was no quick way to know if removing a `class` or `id` from an HTML element would break functionality in JavaScript.

These problems would continue to plague all future HTML refactors if we didn't make changes.

I thought through the problems, spoke to other engineers, and drafted a one-page proposal. These are the best-practices that we agreed on and continue to evangelize.

## Use a custom HTML attribute for integration test selectors

**Problem:** Our Python integration tests used CSS selectors such as `select.goal-type.full-width` and `.form-field__item:nth-child(2)` to select elements on the page. These selectors quickly break when refactoring HTML because they rely on a specific page structure.

The broken selectors caused dozens of our integration tests to fail. These types of failures are problematic because they serve as an indication that our tests and markup are too coupled. An integration test on our login page that begins to fail _only_ because we rename a button class is a sign of a poorly written test.

**Solution**: We now encourage developers to add a `data-test-section` attribute to HTML elements that our integraton tests rely on. The attribute value must be unique enough to ensure that is the only one on the page being tested.

Here's an example of a submit button in a login dialog that has a test section:

```html
<button data-test-section="dialog-login-submit-btn">Log in</button>
```

Our Python integration test selector could look like this:

```python
(By.CSS_SELECTOR, '[data-test-section="dialog-login-submit-btn"]')
```

This approach is preferred because it decouples tests and HTML structure. Also, the attribute name serves as in indication that deleting the element could break a test.

Our engineers have written helper functions such as `clickTestSection('name')` that make it easier to select elements, leading to cleaner code and an increased chance that other engineers will use the new convention.

## Prefix JavaScript hooks with `.js-`

**Problem:** It was unclear when removing `id` and `class` attributes from certain elements would break functionality. Removing the `id` from `<button id="submit">Submit</button>`, for example, could prevent form submission if a jQuery selector expected to find `#submit` on the page.

This slowed down the refactor tremendously. Removing a `class` or `id` required a global search of the codebase to ensure that it wasn't needed. Global searches of large codebases are slow and generic `id`'s such as `#submit` return tons of unrelated results.

**Solution:** We adopted a common convention of adding a `.js-` prefixed class to elements that are used as JavaScript hooks.

These classes should only be used as JavaScript hooks and never styled with CSS. The prefix serves as an indication that the element is used as a hook and makes the codebase more searchable since the class name becomes more unique.

I recommend using a `class` instead of an `id` (despite slightly slower performance) since elements can only have one `id` and the attribute is used as [a fragment identifier in HTML](https://en.wikipedia.org/wiki/Fragment_identifier).

---

The proposal was well received. We have adopted and evangelized these new practices at Optimizely thanks to word of mouth, an email to all engineers, and diligent code reviewers.

I implemented these best-practices in the large HTML refactor but decided it wasn't worth refactoring all existing integration tests and JavaScript hooks.

Despite that, recently written code and smaller refactors have continued to decouple our selectors from HTML and made it significantly easier to change HTML with confidence.
