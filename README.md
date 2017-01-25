# indicate - jQuery Scroll Indicator Plugin
Fade effect and arrows for responsive tables and iframes.

## Description
Modern Browsers and especially Mobile Devices often don't show permanent scrollbars. Scrollbars on mobile devices are not necessary since the user scrolls simply by dragging. The problem with this however is that users might miss the possibility to scroll a certain window to see more. This applies mostly to `<table>` and `<iframe>` elements.
Through a fade effect on the sides this plugin tries to indicate the possibility to scroll.

## Demo
[Demo](http://naminho.ch/scroll-indicator)

## Installation

```
npm i -S indicate
```
or if you are using yarn
```
yarn add indicate
```

## Include

In HTML <head>
```
<script src="node_modules/dist/jquery.indicate.min.js"></script>
```
via module loader
```
var indicate = require('indicate');
import indicate from 'indicate' // ES6
```

## Manual Download

[Source](http://naminho.ch/scroll-indicator)
[Minified](http://naminho.ch/scroll-indicator)

## Usage

```
$('table').indicate();
$('iframe').indicate();
```

## Features

### Color

```
$('table').indicate({color: #0000FF});
```

### Arrows

The arrows can be hidden like this.
```
$('table').indicate({arrows: false});
```

## Development

```
yarn
yarn global add gulp
yarn develop
```

To copy the assets to the page, add this task to the gulpfile.js.

```
gulp.task('default', ['minify', 'copy'], function() {

gulp.task('copy', [], function() {
    return gulp.src('dist/jquery.indicate.js')
        .pipe(gulp.dest('../naminho/node_modules/indicate/dist'));
});
```
