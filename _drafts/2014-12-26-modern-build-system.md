---
layout: post
title: 'A modern development environment and build system with NPM, Bower, Gulp, BrowserSync, Jekyll, and Capistrano'
date: '2014-12-26T00:00:00.000Z'
---

Inspired by the James Long's blog post, _Presenting The Most Over-Engineered Blog Ever_, I'd like to share a thing or two about the build system I've configured for this blog.

What follows is a description of <s>over engineering a personal website</s> all these technologies and implementation tips.

## Overview

* **Hosting** – This web page is stored on a [Digital Ocean](https://www.digitalocean.com/) server as static, pre-compiled HTML file called `index.html` in a folder called `modern-build-system/`.
* **Jekyll** – Generated the `index.html` file for this to this page and all other pages on this site. Jekyll describes itself as a "static site generator." Think WordPress, but with no database and a command `jekyll build` that creates static HTML files for each post.

  Posts on this website are all written in [Markdown](http://daringfireball.net/projects/markdown/syntax) and converted to HTML with Jekyll.

* **Gulp** - A build system tool that automates a few tasks:
  * **Front-end dependencies** - Gulp, with the [gulp-bower](https://www.npmjs.com/package/gulp-bower) NPM package (more on Bower and NPM later), fetches packages such as [Normalize.css](https://github.com/necolas/normalize.css/) and stores them in a `lib/` directory.

    The following is from my `gulpfile.js`:

        // Install the bower dependencies
        gulp.task('bower', function() {
          return bower()
            .pipe(gulp.dest('lib/'))
        });

    View the entire [gulpfile.js on GitHub](https://github.com/danoc/danoc.me/blob/master/gulpfile.js).
  * **LESS** - Gulp compiles [files written in LESS ](https://github.com/danoc/danoc.me/tree/master/src/less) to CSS with [gulp-less](https://www.npmjs.com/package/gulp-less).
  * **CSS** - Gulp takes all CSS files, [adds vendor prefixes](https://www.npmjs.com/package/gulp-autoprefixer), [minifies them](https://www.npmjs.com/package/gulp-minify-css), and [combines them into a single file](https://www.npmjs.com/package/gulp-concat).
  * **Images** - Gulp uses [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) to compress all of the images.
  * **Building Jekyll**
  * **BrowserSync**
* **Capistrano** - Deploys the website with a single command: `cap production deploy`. Behind the scenes, Capistrano is SSH'ing into my server, grabbing the latest code from GitHub, and running `bundle install`, `npm install --production --silent --no-spin`, and `gulp jekyllBuild`.
* **Package Managers** - With all of these tools, it'd take forever to download, install, and upgrade each one. NPM, RubyGems, and Bower let you list package names and desired versions in a file. You can then import them into your project with `npm install`, `bundle install`, and `bower install`.
