---
layout: post
title: Highlight terms in WordPress search results
date: '2012-01-18T21:58:00-05:00'
tags:
- search
- highlight
- wordpress
- code
- php
- plugin
tumblr_url: http://blog.danoc.me/post/16096405227/highlight-wordpress-search-results
path: /blog/highlight-wordpress-search-results
---
I was looking ways to highlight search results in `search.php` and [found this easy solution](http://www.wpbeginner.com/wp-tutorials/how-to-highlight-the-search-terms-in-results-in-wordpress/). I've modified it a bit to highlight the post's excerpt as well.

    <?php // highlight the search results
        $title = get_the_title();
        $excerpt = get_the_excerpt();

        $keys= explode(" ",$s);

        $title = preg_replace('/('.implode('|', $keys) .')/iu', '<span class="highlight">\0</span>', $title);
        $excerpt = preg_replace('/('.implode('|', $keys) .')/iu', '<span class="highlight">\0</span>', $excerpt);
    ?>

To display your search title and excerpt, simply print them like this:

    <?php echo $title; ?>
    <?php echo $excerpt; ?>

Super-simple and it works!
