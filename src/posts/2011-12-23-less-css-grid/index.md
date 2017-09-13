---
layout: post
title: Get a fluid layout with the LESS CSS Grid
date: '2011-12-23T00:28:00-05:00'
tags:
- css
- less
- github
- open-source
- web-development
tumblr_url: http://blog.danoc.me/post/14656793071/less-css-grid
path: /blog/less-css-grid/
---

![LESS CSS Grid code](./lessgrid.png)

One of my main [goals for the new Pipe Dream website](https://danoc.me/blog/plans-for-bupipedream/) is to create a responsive design. In other words, the layout will automatically adjust to the size of the browser and look as good on an iPhone as it does on a desktop. One of the main components this design is a fluid grid.

I searched around for an existing responsive grid and found the [1140 CSS Grid](http://cssgrid.net/), a 12-column grid that, as the name implies, has a `max-width` of `1140px`. However, I soon realized that 12 columns wasn't flexible enough for our needs. I needed a 24-column fluid grid, but I couldn't find any online, so I ended up creating my own.

The [LESS CSS Grid](https://github.com/danoc/LESS-CSS-Grid) is inspired by the [1140 CSS Grid](http://cssgrid.net/) and uses [LESS](http://lesscss.org/), a dynamic stylesheet, to make modifications incredibly easy. LESS extends CSS with features such as variables, operations, and parameters, so adjusting the column width is as easy as editing a number. By default, the LESS CSS Grid is a fluid 24-column grid with a `max-width` of `1140px`.

When creating the 24-column grid, I played around with the [1140 CSS Grid](http://cssgrid.net/) and (after much frustration) figured out the formula behind the column widths. The math looks like this:

```less
width: (@colWidth * @numCol) + (@gutter * (@numCol - 1));
```

The variable `@colWidth` is the width of one column (user defined), `@numCol` is the number of the column (so `@numCol` of `.span5` is 5), and `@gutter` is the width, in percent, of the column's right-margin (this is automatically calculated). The formula for calculating the gutter looks like this:

```less
@gutter: (100-(@colWidth*@numCols))/(@numCols - 1);
```

In this case, `@colWidth` is the width of a single column (user defined) and `@numCols` is the total number of columns.

Since LESS supports parameters, each column simply calls the following:

```less
.column(@numCol) {
    float: left;
    margin-right: @gutter;
    width: (@colWidth * @numCol) + (@gutter * (@numCol - 1));
}
```

Be sure to check out the [project on GitHub](https://github.com/danoc/LESS-CSS-Grid), and feel free to contribute! This should be the first of many more open-source contributions!
