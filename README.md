# jQuery Scroll Indicator
Fade effect and arrows for responsive tables and iframes.
## Demo
[Demo](http://naminho.ch/scroll-indicator)
## Description
Modern Browsers and especially Mobile Devices often don't show permanent scrollbars. Scrollbars on mobile devices are not necessary since the user scrolls simply by dragging. The problem with this however is that users might miss the possibility to scroll a certain window to see more. This applies mostly to <table> and <iframe> elements.

Through a fade effect on the sides this plugin tries to indicate the possibility to scroll.
## Download
[Source](http://naminho.ch/scroll-indicator)
[Minified](http://naminho.ch/scroll-indicator)
## Usage
```
$('table').indicator();
$('iframe').indicator();
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
