---
layout: post
title: Image placement in WordPress posts
date: '2012-01-18T01:06:58-05:00'
tags:
- images
- wordpress
- php
- functions
- bupipedream
- journalism
- photos
tumblr_url: http://blog.danoc.me/post/16051985458/image-placement
---

I just spent most of my day figuring out how to get WordPress to display multiple images in an article. Basically, I learned that images should be attached, not inserted, to an article. I then wrote a function in `functions.php` called `get_photos()` that finds all of the photos associated to a post and returns it to `single-page.php`. The returned photos contain a priority that helps determine where they are placed.

The image placement all depends on the photo’s quality, orientation, and aspect-ratio. Photos that go right below the headline must be wide and short, while smaller thumbnails can have almost any dimensions. The top two (or one, depending on if there is a dominant-worthy photo) are displayed within the article while the remaining appear in a slideshow.

The `get_photos()` function ensures that the top photos get highlighted and slideshows are created. I’ll be sharing the code as soon as it is polished and ready to go!
