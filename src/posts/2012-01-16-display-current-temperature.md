---
layout: post
title: Display the current temperature with PHP and Google’s (hidden) weather API
date: '2012-01-16T16:44:00-05:00'
tags:
- weather
- code
- php
- Google
- bupipedream
- SimpleXML
tumblr_url: http://blog.danoc.me/post/15968416150/display-current-temperature
path: /blog/display-current-temperature/
---

![Screenshot of the weather indicator on Pipe Dream's website](/img/posts/pipe-dream-weather.png)


All it takes is a few line of code to display the current temperature in any city using PHP and [Google’s (hidden) weather API](http://blog.programmableweb.com/2010/02/08/googles-secret-weather-api/).

    <?php
        $weather = simplexml_load_file('http://www.google.com/ig/api?weather=13902');
        $city = $weather->weather->forecast_information->city['data'];
        $degrees = $weather->weather->current_conditions->temp_f['data'];
        echo $degrees."&deg; - ".$city;
    ?>

The code above displays the [temperature for Binghamton, NY](http://www.google.com/ig/api?weather=13902), but can be easily customized to work for any city. Simply change the ZIP code in the second line and Google's API will do the rest. With a little bit of PHP and XML knowledge, you can even use the API to display a full 4-day forecast.

**Update** (Dec. 12, 2012): Google has taken down the unofficial weather API so this no longer works.
