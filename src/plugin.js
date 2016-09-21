/*
 * jQuery Scroll Indicator 2016 by Matthias Giger
 * http://naminho.ch/scroll-indicator
 * @author Matthias Giger <matthias.giger@namics.com>
 */

// TODO remove for production
// global.log = console.log.bind(console);

(function (factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }

} (function($, window, document, undefined) {

    $.fn.indicate = function(options, callback) {

        if (this.length === 0)
            return;

        if (!$('head #scroll-indicator-animations').length) {
            // Injected styles found in src/styles.scss
            $('<style id="scroll-indicator-animations"><!-- inject css here --></style>').appendTo('head');
        }

        options = mergeOptions(options);

        this.each(function() {

            var settings, element, fade = {}, arrow = {}, isIframe, usePostMessage = false,
                contentWrapper, pluginWrapper, uniqueIdentifier, parts;

            element = $(this);

            if (element.height() < 20 || element.width() < 20) {
                return;
            }

            if (isInitialized(element)) {
                setVariables();
                return update();
            }

            uniqueIdentifier = generateUniqueIdentifier();

            element.css('width', '100%');

            // Add a wrapper
            element.wrap(
                '<div class="scroll-indicator plugin-wrapper '+ uniqueIdentifier + '">' +
                '<div class="content-wrapper '+ uniqueIdentifier + '"></div>' +
                '<div class="fade-left '+ uniqueIdentifier + '"></div>' +
                '<div class="fade-right '+ uniqueIdentifier + '"></div>' +
                '</div>'
            );

            pluginWrapper = $('.plugin-wrapper.' + uniqueIdentifier, element.parent().parent().parent());
            contentWrapper = $('.content-wrapper.' + uniqueIdentifier, pluginWrapper);
            fade.left = $('.fade-left.' + uniqueIdentifier, pluginWrapper);
            fade.right = $('.fade-right.' + uniqueIdentifier, pluginWrapper);

            settings = $.extend({}, $.fn.indicate.defaults, options);
            contentWrapper.data('settings', settings);
            contentWrapper.data('uniqueIdentifier', uniqueIdentifier);

            isIframe = element.prop("tagName").toLowerCase() === 'iframe';

            if (!settings.color) {
                settings.color = findColorAround(element);
                if (!settings.color) {
                    settings.color = settings.defaultColor;
                }
            }

            // TODOO

            if (settings.maxHeight) {
                contentWrapper.css('max-height', settings.maxHeight);
            }

            if (isIframe) {
                usePostMessage = differentDomain(element);
            }

            var boxShadow = {
                'box-shadow': '0 0 ' + settings.fadeWidth + ' calc(' + settings.fadeWidth + ' * 1.2) ' + settings.color
            };

            if (isIE()) {
                boxShadow['box-shadow'] = '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color;
            }

            fade.left.css(boxShadow);
            fade.right.css(boxShadow);

            if (settings.arrows) {
                arrow = addArrows();
            }

            if (settings.adaptToContentHeight) {
                adaptToContentHeight();
            }

            // Prevent accidentially selecting table, when clicking the arrows
            contentWrapper.attr('unselectable', 'on').on('selectstart', false);

            $(window).on('resize', function() {
                // TODO maybe set context of this function via .bind()
                resize();
            });

            if (isIframe) {
                if (usePostMessage) {
                    var src = element.attr('src');

                    window.addEventListener("message", function(event) {
                        var sourceIframe,
                            frames = document.getElementsByTagName('iframe');

                        for (var i = 0; i < frames.length; i++) {
                            if (frames[i].contentWindow === event.source) {
                                sourceIframe = frames[i];
                            }
                        }

                        if (!$(sourceIframe).prop("tagName")) {
                            return;
                        }

                        var data = JSON.parse(event.data);
                        contentWrapper.data('width', data.width);
                        contentWrapper.data('height', data.height);
                        scroll(data.offset, data.width);
                    }, false);

                    contentWrapper.on('scroll', function () {
                        if (isIOS()) {
                            var width = contentWrapper.data('width');
                            scroll(contentWrapper.scrollLeft(), width - 50);
                        } else {
                            scroll();
                        }
                    });
                } else {
                    element.load(function() {
                        if (isIOS()) {
                            contentWrapper.on('scroll', function () {
                                scroll();
                            });
                        } else {
                            $(element.contents()).scroll(function () {
                                scroll();
                            });
                        }

                        scroll();
                        resize();
                    });
                }
            } else {
                contentWrapper.on('scroll', function () {
                    if (isIOS()) {
                        var width = contentWrapper.data('width');
                        // TODO width - 50
                        scroll(contentWrapper.scrollLeft(), width - 50);
                    } else {
                        scroll();
                    }
                });
            }

            scroll();
            resize();

            /**
             * Shows or hides the fade and the arrows after a scroll event occurred.
             *
             * @param {number} d The desired diameter of the circle.
             * @return {void}
             */
            function scroll(offsetPost, widthPost) {
                var settings = contentWrapper.data('settings'),
                    wrapperWidth = contentWrapper.width(),
                    elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                    offset = 0;

                if (settings.arrows && (!arrow.both || arrow.both.length === 0)) {
                    arrow = getArrows(element);
                }

                if (isIframe && !usePostMessage)
                    offset = $(element.contents()).scrollLeft();
                if (!isIframe)
                    offset = contentWrapper.scrollLeft();
                if (isIframe && usePostMessage)
                    offset = offsetPost;
                if (isIframe && !usePostMessage && isIOS())
                    offset = contentWrapper.scrollLeft();

                if (isIframe && !usePostMessage)
                    elementWidth = $(element.contents()).width();
                if (isIframe && usePostMessage)
                    elementWidth = widthPost;

                if (offset > settings.fadeOffset) {
                    fade.left.show();
                    fade.left.removeClass('hide-left');
                    if (settings.arrows && arrow.left) {
                        arrow.left.show();
                        arrow.left.removeClass('hide-left');
                    }
                } else {
                    fade.left.addClass('hide-left');
                    if (arrow.left) {
                        arrow.left.addClass('hide-left');
                    }
                }

                //console.log(offset + '+' + wrapperWidth + '+' + settings.fadeOffset + '( ' + (offset + wrapperWidth + settings.fadeOffset) + ') <' + elementWidth);

                if (offset + wrapperWidth + settings.fadeOffset < elementWidth) {
                    fade.right.show();
                    fade.right.removeClass('hide-right');
                    if (settings.arrows && arrow.right) {
                        arrow.right.show();
                        arrow.right.removeClass('hide-right');
                    }
                } else {
                    fade.right.addClass('hide-right');
                    if (arrow.right) {
                        arrow.right.addClass('hide-right');
                    }
                }
            }

            /**
             * Adapts the container after a resize event has occurred.
             *
             * @param {number} d The desired diameter of the circle.
             * @return {void}
             */
            function resize() {
                var settings = contentWrapper.data('settings'),
                    wrapperWidth = contentWrapper.width(),
                    elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                    offset;

                if (settings.arrows && (!arrow.both || arrow.both.length === 0)) {
                    arrow = getArrows(element);
                }

                if (usePostMessage && contentWrapper.data('width')) {
                    elementWidth = Math.max(contentWrapper.data('width'), elementWidth);
                }

                if (isIframe && !usePostMessage)
                    elementWidth = $(element.contents()).width();

                if (isIOS() && isIframe) {
                    elementWidth = $(element.contents()).get(0).documentElement.width;
                }

                //console.log(elementWidth + '<=' + wrapperWidth);

                if (elementWidth <= wrapperWidth) {
                    fade.left.hide();
                    fade.right.hide();
                    if (arrow.both && arrow.both.length > 0) {
                        arrow.both.hide();
                    }
                    // TODO add to settings
                    contentWrapper.css('white-space', 'normal');
                } else {
                    contentWrapper.css('white-space', 'nowrap');
                    if (isIframe && !usePostMessage)
                        offset = $(element.contents()).scrollLeft();
                    else
                        offset = contentWrapper.scrollLeft();

                    fade.right.show();
                    if (settings.arrows) {
                        arrow.right.show();
                    }

                    if (offset > settings.fadeOffset) {
                        fade.left.show();
                        if (settings.arrows) {
                            arrow.left.show();
                        }
                    }
                }
            }

            /**
             * Scrolls to the direction passed in.
             *
             * @param {string} dir The direction to scroll ('left' / 'right').
             * @return {void}
             */
            function scrollTo(dir) {
                var settings = contentWrapper.data('settings'),
                    wrapperWidth = contentWrapper.width(),
                    offset;

                if (!isIframe || (isIframe && isIOS())) {
                    offset = contentWrapper.scrollLeft();
                } else {
                    if (!usePostMessage) {
                        offset = $(element.contents()).scrollLeft();
                    }
                }

                var length = wrapperWidth / settings.scrollDenominator;

                if (!isIframe || (isIframe && isIOS())) {
                    if (dir === 'left')
                        contentWrapper.animate({scrollLeft: offset - length}, 300);
                    else
                        contentWrapper.animate({scrollLeft: offset + length}, 300);
                } else {
                    if (!usePostMessage) {
                        if (dir === 'left')
                            element.contents().find('body').animate({scrollLeft: offset - length}, 300);
                        else
                            element.contents().find('body').animate({scrollLeft: offset + length}, 300);
                    } else {
                        var data = JSON.stringify({dir: dir, scrollDenominator: settings.scrollDenominator});
                        $('iframe', contentWrapper).get(0).contentWindow.postMessage(data, '*');
                    }
                }
            }

            /**
             * Creates the DOM elements for the arrows and adds them to the DOM.
             *
             * @return {object} An object containing the arrows
             */
            function addArrows() {
                var settings = contentWrapper.data('settings'),
                    arrowLeftImage = '<div class="arrow-left ' + uniqueIdentifier + '">' + getIconLeft(settings) + '</div>',
                    arrowRightImage = '<div class="arrow-right ' + uniqueIdentifier + '">' + getIconRight(settings) + '</div>',
                    arrowLeft,
                    arrowRight,
                    arrows,
                    wrapperStyles,
                    svgStyles;

                pluginWrapper.append(arrowLeftImage);
                pluginWrapper.append(arrowRightImage);

                arrowLeft = $('.arrow-left.'+ uniqueIdentifier, pluginWrapper);
                arrowRight = $('.arrow-right.'+ uniqueIdentifier, pluginWrapper);

                arrows = arrowLeft.add(arrowRight);

                wrapperStyles = {
                    'width': '50px',
                    'height': '100%',
                    'position': 'absolute',
                    'top': '0',
                    'z-index': '2'
                };

                svgStyles = {
                    'width': '14px',
                    'height': '24px',
                    'margin-top': '10px',
                    'transition-property': 'all',
                    'transition-duration': '200ms',
                    'transition-timing-function': 'ease'
                };

                arrowLeft.css(wrapperStyles).css('display', 'none');
                arrowRight.css(wrapperStyles).css('right', '0');

                arrowLeft.find('svg').css(svgStyles).css('margin-left', '2px');
                arrowRight.find('svg').css(svgStyles).css('margin-right', '2px').css({'position': 'absolute', 'right': '0'});

                arrows.hover(function(){
                    if ($(this).find('svg').css('margin-right') === '2px')
                        arrowRight.find('svg').css('margin-right', '6px');
                    else
                        arrowLeft.find('svg').css('margin-left', '6px');
                }, function(){
                    if ($(this).find('svg').css('margin-right') === '6px')
                        arrowRight.find('svg').css('margin-right', '2px');
                    else
                        arrowLeft.find('svg').css('margin-left', '2px');
                });

                arrowLeft.click(function() {
                    scrollTo('left');
                });

                arrowRight.click(function() {
                    scrollTo('right');
                });

                arrow = {
                    both: arrows,
                    left: arrowLeft,
                    right: arrowRight
                };

                return {
                    both: arrows,
                    left: arrowLeft,
                    right: arrowRight
                };
            }

            /**
             * Adapts the element to the height of it's content.
             *
             * @return {object} An object containing the arrows
             */
            function adaptToContentHeight() {
                var settings = contentWrapper.data('settings');

                if (settings.adaptToContentHeight) {
                    if (isIframe) {
                        if (usePostMessage) {
                            var height = contentWrapper.data('height');
                        } else {
                            element.load(function() {
                                element.animate({height: $(element).contents().height()}, 300);
                            });
                        }
                    } else {
                        //console.warn('TODO adaptToContentHeight for non iframes');
                        //console.log(element.height());
                    }
                }
            }

            /**
             * Updates the settings if the plugin is called again on an element.
             *
             * @return {void}
             */
            function update() {
                var oldSettings = contentWrapper.data('settings'),
                    settings = $.extend({}, oldSettings, options),
                    arrowColor = settings.arrowColor;

                contentWrapper.data('settings', settings);

                if (settings.arrows && (!arrow.both || arrow.both.length === 0)) {
                    arrow = getArrows(element);
                    log(arrow, 'if')
                }

                var boxShadow = {
                    'box-shadow': '0 0 ' + settings.fadeWidth + ' calc(' + settings.fadeWidth + ' * 1.2) ' + settings.color
                };

                if (isIE()) {
                    boxShadow['box-shadow'] = '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color;
                }

                fade.left.css(boxShadow);
                fade.right.css(boxShadow);

                // UNTESTED
                if (settings.maxHeight) {
                    contentWrapper.css('max-height', settings.maxHeight);
                }

                // UNTESTED
                if (settings.arrows) {
                    if (arrow.both.length < 2) {
                        addArrows();
                    } else {
                        arrow.both.show();
                        arrowColor = arrowColor || getContrastedColor(settings.color);
                        $('polyline', arrow.both).attr('stroke', arrowColor);
                    }
                } else {
                    if (arrow.both) {
                        arrow.both.hide();
                    }
                }

                scroll();
                resize();

                return;
            }

            function setVariables() {
                var wrapper = element.parent().parent();

                pluginWrapper = wrapper;
                contentWrapper = element.parent();
                fade = {
                    left: $('.fade-left', wrapper),
                    right: $('.fade-right', wrapper)
                };
                arrow = {
                    left: $('.arrow-left', wrapper),
                    right: $('.arrow-right', wrapper),
                    both: $('.arrow-left', wrapper).add($('.arrow-right', wrapper))
                };
                isIframe = element.prop("tagName").toLowerCase() === 'iframe';
                usePostMessage = element.prop("tagName").toLowerCase() === 'iframe' && differentDomain(element);
                uniqueIdentifier = element.parent().data('uniqueIdentifier');
            }
        });

        if (typeof callback === 'function') {
            callback.call(this);
        }

        return this;

        // Returns the arrows as found on the DOM.
        function getArrows(element) {
            var wrapper = element.parent().parent();

            return {
                left: $('.arrow-left', wrapper),
                right: $('.arrow-right', wrapper),
                both: $('.arrow-left', wrapper).add($('.arrow-right', wrapper))
            }
        }

        // The callback will be called once the content of the iframe has
        // finished loading.
        function onLoaded(iframe, callback) {
            iframe = iframe.get(0);
            iframe = iframe.contentDocument || iframe.contentWindow.document;

            if (iframe.readyState === 'complete') {
                callback();
                return;
            }

            setTimeout(onLoaded(iframe, callback), 100);
        }

        // Returns whether the plugin is already initialized for this element.
        function isInitialized(element) {
            return element.parent().hasClass('content-wrapper');
        }

        // Returns the subdomain along with the protocol.
        function subdomainWithProtocol(element) {
            var domain = element.attr('src');
            return domain.split('/')[0] + '//' + domain.split('/')[2];
        }

        // Is the iframe from an external domain (ie. not a subdomain).
        function differentDomain(element) {
            var src = element.attr('src'),
                protocolIframe = extractProtocol(src),
                subdomainIframe = extractSubdomain(src);

            if (location.protocol != protocolIframe || location.host != subdomainIframe) {
                // TODO Check if domain or postmessage added? And warn accordingly.
                // console.warn(location.host + ' != ' + subdomainIframe);
                // console.warn('indicate will only work on iframes with the same origin.');
                var domainName = extractDomainName(subdomainIframe);
                //console.log(element);
                //console.log(document.domain + " != " + domainName + (document.domain != domainName));
                if (document.domain != domainName) {
                    return true;
                } else {
                    document.domain = domainName;
                }
            }

            return false;

            // Returns the protocol of a domain.
            function extractProtocol(domain) {
                return domain.split('/')[0];
            }

            // Returns the subdomain of a domain.
            function extractSubdomain(domain) {
                return domain.split('/')[2];
            }

            // Extracts the domain name of a subdomain.
            function extractDomainName(subdomain) {
                var arr = subdomain.split('.');
                return arr[arr.length - 2] + '.' + arr[arr.length - 1];
            }
        }

        // Generates a unique identifier to find the element later.
        function generateUniqueIdentifier() {
            var min = 1, max = 9999;
            return 'i_' + Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Returns the surrounding color of the element.
        // Returns the first parent node with a background-color that's not transparent
        function findColorAround(element) {
            var parent = element,
                color;

            while (parent = parent.parent()) {
                if (!isTransparent(color = parent.css('background-color'))) {
                    return color;
                }
            }
        }

        // Returns whether a CSS color code is transparent.
        function isTransparent(color) {
            return color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
        }

        // Is the current browser an Internet Explorer?
        function isIE(){
            var n=window.navigator.userAgent,r=n.indexOf("MSIE ");if(r>0)return parseInt(n.substring(r+5,n.indexOf(".",r)),10);var e=n.indexOf("Trident/");if(e>0){var i=n.indexOf("rv:");return parseInt(n.substring(i+3,n.indexOf(".",i)),10);}var t=n.indexOf("Edge/");return t>0?parseInt(n.substring(t+5,n.indexOf(".",t)),10):!1;
        }

        // Is it an iOS (iPad, iPhone or iPod) Device?
        function isIOS() {
            var iDevices = ['iPad Simulator', 'iPhone Simulator',
                    'iPod Simulator', 'iPad', 'iPhone', 'iPod'];

            if (!!navigator.platform) {
                while (iDevices.length) {
                    if (navigator.platform === iDevices.pop()){
                        return true;
                    }
                }
            }

            return false;
        }

        // Returns black for bright colors and white for dark ones.
        function getContrastedColor(color) {
            return (getBrightnessOfColor(color) > 120) ? 'black' : 'white';

            function getBrightnessOfColor(color) {
                color = parseColor(color);
                return ((color[0] * 299) + (color[1] * 587) + (color[2] * 114)) / 1000;
            }

            function parseColor(color) {
                var m;

                m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
                if (m) {
                    return [parseInt(m[1]),parseInt(m[2]),parseInt(m[3])];
                }

                m = color.match(/^#([0-9a-f]{3})$/i);
                if (m) {
                    return [
                        parseInt(m[1].charAt(0),16)*0x11,
                        parseInt(m[1].charAt(1),16)*0x11,
                        parseInt(m[1].charAt(2),16)*0x11
                    ];
                }

                m = color.match(/^#([0-9a-f]{6})$/i);
                if (m) {
                    return [
                        parseInt(m[1].substr(0,2),16),
                        parseInt(m[1].substr(2,2),16),
                        parseInt(m[1].substr(4,2),16)
                    ];
                }
            }
        }

        // TODO Safely access DOM iframe contents.
        function getContents(element) {
            // TODO try { return element.contents() }
        }

        // If options is an array of objects, merge the settings into one single object.
        function mergeOptions(options) {
            if (options && options instanceof Array && Array.prototype.reduce) {
                options = options.reduce(function(result, item) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            result[key] = item[key];
                        }
                    }
                    return result;
                }, {});
            }
            return options;
        }

        function getIconLeft(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconLeft = '<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 2,12 12,2 "/></svg>';

            return settings.iconLeft || defaultIconLeft;
        }

        function getIconRight(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconRight = '<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,22 12,12 2,2 "/></svg>';

            return settings.iconRight || defaultIconRight;
        }
    };

    $.fn.indicate.defaults = {
        // Clicking on the arrow will scroll (1 / value) of the currently visible width.
        scrollDenominator: 2,
        // If color is not specified it will either be the surrounding color or white.
        defaultColor: '#FFFFFF',
        // Arrows are shown by default.
        arrows: true,
        // The face effec's width.
        fadeWidth: '20px',
        // This many pixels away from the scroll end the effect will be removed.
        fadeOffset: 5,
        // If the element is an iframe the height will be changed to the iframe content height. For tables this is TODO.
        adaptToContentHeight: true
    };

}));
