/*
 * jQuery Scroll Indicator 2016 by Matthias Giger
 * http://naminho.ch/scroll-indicator
 * @author Matthias Giger <matthias.giger@namics.com>
 */
 (function (factory) {
 	if(typeof module === "object" && typeof module.exports === "object") {
     factory(require("jquery"), window, document);
   } else {
     factory(jQuery, window, document);
   }
 }(function($, window, document, undefined) {

    $.fn.indicate = function(options) {

        if (this.length === 0)
            return;

        if (!$('head #scroll-indicator-animations').length) {
            // Source code found in src/styles.scss
            $('<style id="scroll-indicator-animations"><!-- inject css here --></style>').appendTo('head');
        }

        this.each(function() {

            var settings, element, fadeRight, fadeLeft, arrow, isIframe, usePostMessage = false,
                tagName, contentWrapper, pluginWrapper, uniqueIdentifier;

            if (isInitialized()) {
                console.log('updating settings');
                // TODO make update settings function
                contentWrapper = $(this).parent();
                pluginWrapper = $(this).parent().parent();
                fadeLeft = $('.fade-left', pluginWrapper);
                fadeRight = $('.fade-right', pluginWrapper);
                arrow = {
                    left: $('.arrow-left', pluginWrapper),
                    right: $('.arrow-right', pluginWrapper)
                };
                arrow.both = arrow.left.add(arrow.right);

                isIframe = $(this).prop("tagName").toLowerCase() === 'iframe';

                if (isIframe) {
                    usePostMessage = differentDomain($(this));
                }

                settings = contentWrapper.data('settings');
                settings = $.extend({}, settings, options);
                contentWrapper.data('settings', settings);

                uniqueIdentifier = contentWrapper.data('uniqueIdentifier');

                // TODO update with isIE()
                fadeLeft.css('box-shadow', '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color);
                fadeRight.css('box-shadow', '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color);

                if (settings.maxHeight) {
                    contentWrapper.css('max-height', settings.maxHeight);
                }

                if (settings.arrows) {
                    if (arrow.both.length < 2) {
                        addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, $(this));
                    }
                } else {
                    arrow.both.hide();
                }

                scroll(isIframe, contentWrapper, $(this), arrow, fadeLeft, fadeRight, usePostMessage);
                resize(contentWrapper, $(this), fadeLeft, fadeRight, arrow, isIframe, usePostMessage);

                return;
            }

            uniqueIdentifier = 'i_' + getRandomInt(1, 999);

            console.log(uniqueIdentifier);

            element = $(this);

            element.css('width', '100%');

            // Add a wrapper
            element.wrap(
                '<div class="scroll-indicator plugin-wrapper '+ uniqueIdentifier + '">' +
                '<div class="content-wrapper '+ uniqueIdentifier + '"></div>' +
                '<div class="fade-left '+ uniqueIdentifier + '"></div>' +
                '<div class="fade-right '+ uniqueIdentifier + '"></div>' +
                '</div>'
            );

            pluginWrapper = $('.plugin-wrapper.'+ uniqueIdentifier, element.parent().parent().parent());
            contentWrapper = $('.content-wrapper.'+ uniqueIdentifier, pluginWrapper);
            fadeLeft = $('.fade-left.'+ uniqueIdentifier, pluginWrapper);
            fadeRight = $('.fade-right.'+ uniqueIdentifier, pluginWrapper);

            settings = $.extend({}, $.fn.indicate.defaults, options);
            contentWrapper.data('settings', settings);
            contentWrapper.data('uniqueIdentifier', uniqueIdentifier);

            tagName = element.prop("tagName").toLowerCase();

            isIframe = element.prop("tagName").toLowerCase() === 'iframe';

            if (!settings.color) {
                settings.color = findColorAround(element);
                if (!settings.color) {
                    settings.color = settings.defaultColor;
                }
            }

            console.log(settings.color);

            if (settings.maxHeight) {
                contentWrapper.css('max-height', settings.maxHeight);
            }

            if (isIframe) {
                usePostMessage = differentDomain(element);
            }

            pluginWrapper.css({
                'position': 'relative',
                'overflow': 'hidden'
            });

            contentWrapper.css({
                'overflow': 'auto',
                '-ms-overflow-style': 'none'
            });

            contentWrapper.css('-webkit-overflow-scrolling', 'touch', 'important');
            contentWrapper.css('overflow', 'auto', 'important');

            var fadeStyles = {
                'z-index': '1',
                'width': '0px',
                'height': '100%',
                'position': 'absolute',
                'top': '0'
                //'transition': 'all 1s linear'
            };

            var boxShadow = {
                'box-shadow': '0 0 ' + settings.fadeWidth + ' calc(' + settings.fadeWidth + ' * 1.2) ' + settings.color
            };

            if (isIE()) {
                boxShadow['box-shadow'] = '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color;
            }

            fadeLeft.css(fadeStyles).css('left', '0').css(boxShadow).css('display', 'none');
            fadeRight.css(fadeStyles).css('right', '0').css(boxShadow);

            if (settings.arrows) {
                arrow = addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, element);
            }

            if (settings.adaptToContentHeight) {
                adaptToContentHeight(element);
            }

            // Prevent accidentially selecting table, when clicking the arrows
            contentWrapper.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);

            $(window).on('resize', function() {
                console.log('resize');
                resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
            });

            if (isIframe) {
                console.log('is iframe');
                if (usePostMessage) {
                    console.log('postmessage');
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

                        var parts = getPartsFromIframe($(sourceIframe));

                        var data = JSON.parse(event.data);
                        contentWrapper.data('width', data.width);
                        contentWrapper.data('height', data.height);
                        scroll(parts.isIframe, parts.contentWrapper, parts.element, parts.arrow, parts.fade.left, parts.fade.right, parts.usePostMessage, data.offset, data.width);
                    }, false);

                    contentWrapper.on('scroll', function () {
                        console.log(iOS() + 'isiOS');
                        if (iOS()) {
                            var width = contentWrapper.data('width');
                            scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage, contentWrapper.scrollLeft(), width - 50);
                        } else {
                            scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
                        }
                    });
                } else {
                    console.log('no postmessage');
                    element.load(function() {
                        if (iOS()) {
                            contentWrapper.on('scroll', function () {
                                scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
                            });
                        } else {
                            $(element.contents()).scroll(function () {
                                scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
                            });
                        }

                        scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
                        resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
                    });
                }
            } else {
                console.log('no iframe');
                contentWrapper.on('scroll', function () {
                    console.log(iOS() + 'isiOS');
                    if (iOS()) {
                        var width = contentWrapper.data('width');
                        scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage, contentWrapper.scrollLeft(), width - 50);
                    } else {
                        scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
                    }
                });
            }

            scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
            resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
        });

        return this;

        function scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage, offsetPost, widthPost) {
            console.log('scroll');
            var settings = contentWrapper.data('settings'),
                wrapperWidth = contentWrapper.width(),
                elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                offset = 0;

            if (isIframe && !usePostMessage)
                offset = $(element.contents()).scrollLeft();
            if (!isIframe)
                offset = contentWrapper.scrollLeft();
            if (isIframe && usePostMessage)
                offset = offsetPost;
            if (isIframe && !usePostMessage && iOS())
                offset = contentWrapper.scrollLeft();

            if (isIframe && !usePostMessage)
                elementWidth = $(element.contents()).width();
            if (isIframe && usePostMessage)
                elementWidth = widthPost;

            if (offset > settings.fadeOffset) {
                fadeLeft.show();
                fadeLeft.removeClass('hide-left');
                if (settings.arrows) {
                    arrow.left.show();
                    arrow.left.removeClass('hide-left');
                }
            } else {
                fadeLeft.addClass('hide-left');
                if (settings.arrows) {
                    arrow.left.addClass('hide-left');
                }
            }

            //console.log(offset + '+' + wrapperWidth + '+' + settings.fadeOffset + '( ' + (offset + wrapperWidth + settings.fadeOffset) + ') <' + elementWidth);

            if (offset + wrapperWidth + settings.fadeOffset < elementWidth) {
                fadeRight.show();
                fadeRight.removeClass('hide-right');
                if (settings.arrows) {
                    arrow.right.show();
                    arrow.right.removeClass('hide-right');
                }
            } else {
                fadeRight.addClass('hide-right');
                if (settings.arrows) {
                    arrow.right.addClass('hide-right');
                }
            }
        }

        function resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage) {
            //console.log('resize');
            var settings = contentWrapper.data('settings'),
                wrapperWidth = contentWrapper.width(),
                elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                offset;

            if (usePostMessage && contentWrapper.data('width')) {
                elementWidth = Math.max(contentWrapper.data('width'), elementWidth);
            }

            if (isIframe && !usePostMessage)
                elementWidth = $(element.contents()).width();

            if (iOS() && isIframe) {
                elementWidth = $(element.contents()).get(0).documentElement.width;
            }

            //console.log(elementWidth + '<=' + wrapperWidth);

            if (elementWidth <= wrapperWidth) {
                fadeLeft.hide();
                fadeRight.hide();
                arrow.both.hide();
                // TODO add to settings
                contentWrapper.css('white-space', 'normal');
            } else {
                contentWrapper.css('white-space', 'nowrap');
                if (isIframe && !usePostMessage)
                    offset = $(element.contents()).scrollLeft();
                else
                    offset = contentWrapper.scrollLeft();

                fadeRight.show();
                if (settings.arrows) {
                    arrow.right.show();
                }

                if (offset > settings.fadeOffset) {
                    fadeLeft.show();
                    if (settings.arrows) {
                        arrow.left.show();
                    }
                }
            }
        }

        function scrollTo(dir, isIframe, contentWrapper, element, usePostMessage) {
            var settings = contentWrapper.data('settings'),
                wrapperWidth = contentWrapper.width(),
                offset;

            if (!isIframe || (isIframe && iOS())) {
                offset = contentWrapper.scrollLeft();
            } else {
                if (!usePostMessage) {
                    offset = $(element.contents()).scrollLeft();
                }
            }

            var length = wrapperWidth / settings.scrollDenominator;

            if (!isIframe || (isIframe && iOS())) {
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

        function addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, element) {
            var settings = contentWrapper.data('settings'),
                arrowLeftImage = '<div class="arrow-left ' + uniqueIdentifier + '"><svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + settings.arrowColor + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 2,12 12,2 "/></svg></div>',
                arrowRightImage = '<div class="arrow-right ' + uniqueIdentifier + '"><svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + settings.arrowColor + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,22 12,12 2,2 "/></svg></div>',
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
                scrollTo('left', isIframe, contentWrapper, element, usePostMessage);
            });

            arrowRight.click(function() {
                scrollTo('right', isIframe, contentWrapper, element, usePostMessage);
            });

            return {
                both: arrows,
                left: arrowLeft,
                right: arrowRight
            };
        }

        function adaptToContentHeight(element) {
            var parts = getPartsFromIframe(element);

            if (parts.settings.adaptToContentHeight) {
                if (parts.isIframe) {
                    if (parts.usePostMessage) {
                        var height = parts.contentWrapper.data('height');
                    } else {
                        element.load(function() {
                            element.animate({height: $(element).contents().height()}, 300);
                        });
                    }
                } else {
                    console.log('TODO');
                    console.log(element.height());
                }
            }
        }

        function getPartsFromIframe(element) {
            var wrapper = element.parent().parent();

            return {
                pluginWrapper: wrapper,
                contentWrapper: element.parent(),
                element: element,
                fade: {
                    left: $('.fade-left', wrapper),
                    right: $('.fade-right', wrapper)
                },
                arrow: {
                    left: $('.arrow-left', wrapper),
                    right: $('.arrow-right', wrapper),
                    both: $('.arrow-left', wrapper).add($('.arrow-right', wrapper))
                },
                isIframe: element.prop("tagName").toLowerCase() === 'iframe',
                usePostMessage: element.prop("tagName").toLowerCase() === 'iframe' && differentDomain(element),
                settings: element.parent().data('settings'),
                uniqueIdentifier: element.parent().data('uniqueIdentifier')
            };
        }

        function onLoaded(iframe, callback) {
            //console.log(iframe);
            iframe = iframe.get(0);
            iframe = iframe.contentDocument || iframe.contentWindow.document;

            if (iframe.readyState === 'complete') {
                //console.log('done loading');
                callback();
                return;
            }

            setTimeout(onLoaded(iframe, callback), 100);
        }

        function isInitialized(iframe) {
            if (iframe) {
                return iframe.parent().hasClass('content-wrapper');
            } else {
                return $(this).parent().hasClass('content-wrapper');
            }
        }

        function extractProtocol(domain) {
            return domain.split('/')[0];
        }

        function extractSubdomain(domain) {
            return domain.split('/')[2];
        }

        function subdomainWithProtocol(element) {
            var domain = element.attr('src');
            return domain.split('/')[0] + '//' + domain.split('/')[2];
        }

        function extractDomainName(subdomain) {
            var arr = subdomain.split('.');
            return arr[arr.length - 2] + '.' + arr[arr.length - 1];
        }

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
                console.log(document.domain + " != " + domainName + (document.domain != domainName));
                if (document.domain != domainName) {
                    return true;
                } else {
                    document.domain = domainName;
                }
            }
            return false;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function findColorAround(element) {
            // Returns the first parent node with a color that's not transparent
            var parent = element,
                color;

            while(parent = parent.parent()) {
                if (!isTransparent(color = parent.css('background-color'))) {
                    console.log(color);
                    return color;
                }
            }
        }

        function isTransparent(color) {
            return color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
        }

        function isIE(){
            var n=window.navigator.userAgent,r=n.indexOf("MSIE ");if(r>0)return parseInt(n.substring(r+5,n.indexOf(".",r)),10);var e=n.indexOf("Trident/");if(e>0){var i=n.indexOf("rv:");return parseInt(n.substring(i+3,n.indexOf(".",i)),10);}var t=n.indexOf("Edge/");return t>0?parseInt(n.substring(t+5,n.indexOf(".",t)),10):!1;
        }

        function iOS() {

            var iDevices = [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ];

            if (!!navigator.platform) {
                while (iDevices.length) {
                    if (navigator.platform === iDevices.pop()){ return true; }
                }
            }

            return false;
        }

        function getContents(element) {
            // TODO try { return element.contents() }
        }
    };

    $.fn.indicate.defaults = {
        scrollDenominator: 5, // Clicking on the arrow will scroll (1 / value) of the container width
        defaultColor: '#FFFFFF',
        arrows: true,
        fadeWidth: '20px',
        arrowColor: '#000000',
        fadeOffset: 5,
        adaptToContentHeight: true
    };

}));
