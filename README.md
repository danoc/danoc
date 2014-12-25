[danoc.me](http://danoc.me/)
========

Daniel O'Connor's personal website and portfolio.


## Install
[danoc.me](http://danoc.me/) uses Jekyll as a CMS, NPM and Bower for package management, and Gulp for running tasks. Gulp uses [BrowserSync](http://www.browsersync.io/) to serve the website.

Clone this repository, `cd` into the directory, and run the following commands to install the website locally:

1. `npm install`
2. `npm install --global gulp`
3. `bundle install`

Run the website locally with one command: `gulp`.


## Deploys

Deploys are done with Capistrano and require server access.

The command to deploy is: `cap production deploy`.
