---
layout: post
title: Writing good selectors for integration tests and JavaScript hooks
date: '2015-07-07T00:00:00.000Z'
---

I merged a 85 file, 3,000 line, feature branch in March that integrated Optimizely's CSS framework into the product. Five designers and developers contributed to the branch over the course of weeks.

The complicated merge surfaced two problems:


### Incredibly specific integration test selectors

**Problem:** We used specific CSS-style selectors such as `select.goal-type.full-width` and `.form-fields .form-field__item:nth-child(2)` in our integration tests.

Integrating our CSS framework into the product broke dozens integration tests since classes were renamed and the specific selectors no longer returned elements.

This was time-consuming to fix since integration tests are hard to run locally.

**Solution**: Encourage developers to use a `data-test-section` attribute on elements that integraton tests use. The test section name should be unique enough to ensure that is the only one on the page being tested and that a global search can find the tests and elements without much noise.


### Poorly written JavaScript hooks

**Problem:** It was unclear whether removing `id` and `class` attributes from elements would break functionality. This could happen if the attribute is used as a jQuery selector in our legacy JavaScript.

Each case required a globlal of the codebase which greatly slowed down the refactor and made it more error-prone.

**Solution:** Prefix new JavaScript selectors with `.js-`. This class should only be used as JavaScript hooks and never styled with CSS.
