/*
 * indicate - jQuery Scroll Indicator Plugin
 *
 * Adds horizontal fade effect to tables and iframes.
 * Intended to let the user know that there is more content so see than currently fits.
 *
 * Code: https://github.com/naminho/jquery-scroll-indicator
 * Demo: http://naminho.ch/scroll-indicator
 *
 * @author Matthias Giger <matthias.giger@namics.com>
 */

(function (factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }

} (function($, window, document) {

    $.fn.indicate = function(options, callback) {

        if (this.length === 0)
            return;

        if (!$('head #scroll-indicator-animations').length) {
            // Injected styles found in src/styles.scss
            $('<style id="scroll-indicator-animations">@-webkit-keyframes right{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(20px);transform:translate(20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@keyframes right{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(20px);transform:translate(20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@-webkit-keyframes left{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(-20px);transform:translate(-20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@keyframes left{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(-20px);transform:translate(-20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@-webkit-keyframes top{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@keyframes top{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translateY(-20px);transform:translateY(-20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@-webkit-keyframes bottom{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}@keyframes bottom{from{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translateY(20px);transform:translateY(20px);opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"}}.hide-right{-webkit-animation:right 1s forwards ease-out;animation:right 1s forwards ease-out}.hide-left{-webkit-animation:left 1s forwards ease-out;animation:left 1s forwards ease-out}.hide-top{-webkit-animation:top 1s forwards ease-out;animation:top 1s forwards ease-out}.hide-bottom{-webkit-animation:bottom 1s forwards ease-out;animation:bottom 1s forwards ease-out}.plugin-wrapper{position:relative;overflow:hidden}.content-wrapper{-webkit-overflow-scrolling:touch!important;overflow:auto!important;-ms-overflow-style:none}.arrow-left,.arrow-right{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fade-left,.fade-right{z-index:1;width:0;height:100%;position:absolute;top:0}.fade-left{left:0;display:none}.fade-right{right:0}.fade-top,.fade-bottom{z-index:1;height:0;width:100%;position:absolute;left:0}.fade-top{top:0;display:none}.fade-bottom{bottom:0}.arrow-left,.arrow-right,.arrow-top,.arrow-bottom{position:absolute;z-index:2}.arrow-left,.arrow-right{width:50px;height:100%;top:0}.arrow-left{left:0}.arrow-right{right:0}.arrow-top,.arrow-bottom{width:100%;height:50px;left:0}.arrow-top{top:0}.arrow-bottom{bottom:0}.arrow-left>svg,.arrow-right>svg,.arrow-top>svg,.arrow-bottom>svg{position:absolute;margin-top:10px;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:200ms;transition-duration:200ms;-webkit-transition-timing-function:ease;transition-timing-function:ease}.arrow-left>svg,.arrow-right>svg{width:14px;height:24px}.arrow-top>svg,.arrow-bottom>svg{width:24px;height:14px}.arrow-left>svg{margin-left:2px}.arrow-right>svg{right:0;margin-right:2px}.arrow-top>svg{top:0;margin-top:2px}.arrow-bottom>svg{position:absolute;bottom:0;margin-bottom:2px}.arrow.center.arrow-left>svg,.arrow.center.arrow-right>svg{margin-top:auto;margin-bottom:auto;top:0;bottom:0}.arrow.center.arrow-top>svg,.arrow.center.arrow-bottom>svg{margin-left:auto;margin-right:auto;left:0;right:0}.arrow.end.arrow-left>svg,.arrow.end.arrow-right>svg{bottom:0}.arrow.end.arrow-top>svg,.arrow.end.arrow-bottom>svg{right:0}</style>').appendTo('head');
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

            element.css('width', '100%'); // TODO Not always necessary

            // Add a wrapper
            element.wrap(
                '<div class="scroll-indicator plugin-wrapper '+ uniqueIdentifier + '">' +
                  '<div class="content-wrapper '+ uniqueIdentifier + '"></div>' +
                  '<div class="fade-top '+ uniqueIdentifier + '"></div>' +
                  '<div class="fade-right '+ uniqueIdentifier + '"></div>' +
                  '<div class="fade-bottom '+ uniqueIdentifier + '"></div>' +
                  '<div class="fade-left '+ uniqueIdentifier + '"></div>' +
                '</div>'
            );

            pluginWrapper = $('.plugin-wrapper.' + uniqueIdentifier, element.parent().parent().parent());
            contentWrapper = $('.content-wrapper.' + uniqueIdentifier, pluginWrapper);
            fade.left = $('.fade-left.' + uniqueIdentifier, pluginWrapper);
            fade.right = $('.fade-right.' + uniqueIdentifier, pluginWrapper);
            fade.top = $('.fade-top.' + uniqueIdentifier, pluginWrapper);
            fade.bottom = $('.fade-bottom.' + uniqueIdentifier, pluginWrapper);

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

            contentWrapper.css('max-height', settings.maxHeight);

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
            fade.top.css(boxShadow);
            fade.bottom.css(boxShadow);

            if (settings.arrows) {
                arrow = addArrows();
            }

            if (settings.adaptToContentHeight) {
                adaptToContentHeight();
            }

            // Prevent accidentially selecting table, when clicking the arrows
			      fade.left.attr('unselectable', 'on').on('selectstart', false);
			      fade.right.attr('unselectable', 'on').on('selectstart', false);
            fade.top.attr('unselectable', 'on').on('selectstart', false);
            fade.bottom.attr('unselectable', 'on').on('selectstart', false);

            $(window).on('resize', function() {
                // TODO maybe set context of this function via .bind()
				        // TODO fade hidden after resize
                scroll();
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
             * @param {number} offsetPost The offset from post message.
             * @param {number} widthPost The width from post message.
             * @return {void}
             */
            function scroll(offsetPost, widthPost) {
                var settings = contentWrapper.data('settings'),
                    wrapperWidth = contentWrapper.width(),
                    elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                    wrapperHeight = contentWrapper.height(),
                    elementHeight = Math.max(element.height(), element.get(0).scrollHeight),
                    offset = 0;

                if (settings.arrows && (!arrow.both || arrow.both.length === 0)) {
                  arrow = getArrows(element);
                }

                if (isIframe && !usePostMessage) {
                  offset = $(element.contents()).scrollLeft();
                  offsetVertical = $(element.contents()).scrollTop();
                }
                if (!isIframe) {
                  offset = contentWrapper.scrollLeft();
                  offsetVertical = contentWrapper.scrollTop();
                }
                if (isIframe && usePostMessage) {
                  offset = offsetPost;
                }
                if (isIframe && !usePostMessage && isIOS()) {
                  offset = contentWrapper.scrollLeft();
                  offsetVertical = contentWrapper.scrollTop();
                }

                if (isIframe && !usePostMessage) {
                  elementWidth = $(element.contents()).width();
                  elementHeight = $(element.contents()).height();
                }
                if (isIframe && usePostMessage) {
                  elementWidth = widthPost;
                  //  elementHeight = heightPost;
                }

                if (settings.horizontal) {
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
                } else {
                  fade.left.hide();
                  fade.right.hide();
                }

                if (settings.vertical) {
                  if (offsetVertical > settings.fadeOffset) {
                      fade.top.show();
                      fade.top.removeClass('hide-top');
                      if (settings.arrows && arrow.top) {
                          arrow.top.show();
                          arrow.top.removeClass('hide-top');
                      }
                  } else {
                      fade.top.addClass('hide-top');
                      if (arrow.top) {
                          arrow.top.addClass('hide-top');
                      }
                  }
                } else {
                  fade.top.hide();
                  fade.bottom.hide();
                }

                if (settings.horizontal) {
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

                if (settings.vertical) {
                  if (offsetVertical + wrapperHeight + settings.fadeOffset < elementHeight) {
                      fade.bottom.show();
                      fade.bottom.removeClass('hide-bottom');
                      if (settings.arrows && arrow.bottom) {
                          arrow.bottom.show();
                          arrow.bottom.removeClass('hide-bottom');
                      }
                  } else {
                      fade.bottom.addClass('hide-bottom');
                      if (arrow.bottom) {
                          arrow.bottom.addClass('hide-bottom');
                      }
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
                    wrapperHeight = contentWrapper.width(),
                    elementWidth = Math.max(element.width(), element.get(0).scrollWidth),
                    elementHeight = Math.max(element.height(), element.get(0).scrollHeight),
                    offset;

                if (settings.arrows && (!arrow.both || arrow.both.length === 0)) {
                    arrow = getArrows(element);
                }

                if (usePostMessage && contentWrapper.data('width')) {
                    elementWidth = Math.max(contentWrapper.data('width'), elementWidth);
                }

                if (usePostMessage && contentWrapper.data('height')) {
                    elementHeight = Math.max(contentWrapper.data('height'), elementHeight);
                }

                if (isIframe && !usePostMessage) {
                    elementWidth = $(element.contents()).width();
                    elementHeight = $(element.contents()).height();
                }

                if (isIOS() && isIframe) {
                    elementWidth = $(element.contents()).get(0).documentElement.width;
                    elementHeight = $(element.contents()).get(0).documentElement.height;
                }

                if (settings.horizontal) {
                  if (elementWidth <= wrapperWidth) {
                      fade.left.hide();
                      fade.right.hide();
                      if (arrow.both && arrow.both.length > 0) {
                          arrow.both.hide();
                      }
                      // TODO add to settings
                      // contentWrapper.css('white-space', 'normal');
                  } else {
                      // contentWrapper.css('white-space', 'nowrap');
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

                if (settings.vertical) {
                  if (elementHeight <= wrapperHeight) {
                      fade.top.hide();
                      fade.bottom.hide();
                      if (arrow.vertical && arrow.vertical.length > 0) {
                          arrow.vertical.hide();
                      }
                  } else {
                      if (isIframe && !usePostMessage) {
                          offset = $(element.contents()).scrollTop();
                      } else {
                          offset = contentWrapper.scrollTop();
                      }

                      fade.bottom.show();
                      if (settings.arrows) {
                          arrow.bottom.show();
                      }

                      if (offset > settings.fadeOffset) {
                          fade.top.show();
                          if (settings.arrows) {
                              arrow.top.show();
                          }
                      }
                  }
                }
            }

            /**
             * Scrolls to the direction passed in.
             *
             * @param {string} dir The direction to scroll ('left', 'right', 'top', 'bottom').
             * @return {void}
             */
            function scrollTo(dir) {
                var settings = contentWrapper.data('settings'),
                    wrapperWidth = contentWrapper.width(),
                    wrapperHeight = contentWrapper.height(),
                    offset;

                if (!isIframe || (isIframe && isIOS())) {
                    offset = contentWrapper.scrollLeft();
                    offsetVertical = contentWrapper.scrollTop();
                } else {
                    if (!usePostMessage) {
                        offset = $(element.contents()).scrollLeft();
                        offsetVertical = $(element.contents()).scrollTop();
                    }
                }

                var length = wrapperWidth / settings.scrollDenominator,
                  height = wrapperHeight / settings.scrollDenominator;

                if (!isIframe || (isIframe && isIOS())) {
                    if (dir === 'left') {
                      contentWrapper.animate({scrollLeft: offset - length}, 300);
                    } else if (dir === 'right') {
                      contentWrapper.animate({scrollLeft: offset + length}, 300);
                    } else if (dir === 'top') {
                      contentWrapper.animate({scrollTop: offsetVertical - length}, 300);
                    } else if (dir === 'bottom') {
                      contentWrapper.animate({scrollTop: offsetVertical + length}, 300);
                    }
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
                    arrowLeftImage = '<div class="arrow arrow-left ' + uniqueIdentifier + '">' + getIconLeft(settings) + '</div>',
                    arrowRightImage = '<div class="arrow arrow-right ' + uniqueIdentifier + '">' + getIconRight(settings) + '</div>',
                    arrowTopImage = '<div class="arrow arrow-top ' + uniqueIdentifier + '">' + getIconTop(settings) + '</div>',
                    arrowBottomImage = '<div class="arrow arrow-bottom ' + uniqueIdentifier + '">' + getIconBottom(settings) + '</div>',
                    directions = ['top', 'right', 'bottom', 'left'],
                    arrowLeft,
                    arrowRight,
                    arrowTop,
                    arrowBottom,
                    arrows,
                    wrapperStyles,
                    svgStyles;

                pluginWrapper.append(arrowLeftImage);
                pluginWrapper.append(arrowRightImage);
                pluginWrapper.append(arrowTopImage);
                pluginWrapper.append(arrowBottomImage);

                arrowLeft = $('.arrow-left.'+ uniqueIdentifier, pluginWrapper);
                arrowRight = $('.arrow-right.'+ uniqueIdentifier, pluginWrapper);
                arrowTop = $('.arrow-top.'+ uniqueIdentifier, pluginWrapper);
                arrowBottom = $('.arrow-bottom.'+ uniqueIdentifier, pluginWrapper);

                arrows = arrowLeft.add(arrowRight);
                arrowsVertical = arrowTop.add(arrowBottom);

                allArrows = arrowLeft.add(arrowRight).add(arrowTop).add(arrowBottom);

                allArrows.addClass(settings.arrowPosition);

                arrowLeft.css('display', 'none');

                if (!settings.horizontal) {
                  arrowRight.css('display', 'none');
                }

                arrowTop.css('display', 'none');

                if (!settings.vertical) {
                  arrowBottom.css('display', 'none');
                }

                allArrows.hover(function() {
                  var arrow = $(this);
                  directions.map(function(direction) {
                    if (arrow.hasClass('arrow-' + direction)) {
                      arrow.find('svg').css('margin-' + direction, '6px');
                    }
                  });
                }, function() {
                  var arrow = $(this);
                  directions.map(function(direction) {
                    if (arrow.hasClass('arrow-' + direction)) {
                      arrow.find('svg').css('margin-' + direction, '2px');
                    }
                  });
                });

                arrowLeft.click(function() {scrollTo('left');});
                arrowRight.click(function() {scrollTo('right');});
                arrowTop.click(function() {scrollTo('top');});
                arrowBottom.click(function() {scrollTo('bottom');});

                arrow = {
                    both: arrows,
                    left: arrowLeft,
                    right: arrowRight,
                    vertical: arrowsVertical,
                    top: arrowTop,
                    bottom: arrowBottom,
                    allArrows: allArrows
                };

                return {
                    both: arrows,
                    left: arrowLeft,
                    right: arrowRight,
                    vertical: arrowsVertical,
                    top: arrowTop,
                    bottom: arrowBottom,
                    allArrows: allArrows
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
                }

                var boxShadow = {
                    'box-shadow': '0 0 ' + settings.fadeWidth + ' calc(' + settings.fadeWidth + ' * 1.2) ' + settings.color
                };

                var boxShadowVertical = {
                    'box-shadow': '0 0 ' + settings.fadeWidth + ' calc(' + settings.fadeWidth + ' * 1.2) ' + settings.color
                };

                if (isIE()) {
                    boxShadow['box-shadow'] = '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color;
                }

                fade.left.css(boxShadow);
                fade.right.css(boxShadow);
                fade.top.css(boxShadow);
                fade.bottom.css(boxShadow);

                contentWrapper.css('max-height', settings.maxHeight);

                if (settings.arrows) {
                    if (arrow.all.length < 2) {
                        addArrows();
                    } else {
                      if (settings.horizontal) {
                        arrow.both.show();
                      } else {
                        arrow.both.hide();
                      }

                      if (settings.vertical) {
                        arrow.vertical.show();
                      } else {
                        arrow.vertical.hide();
                      }

                      arrowColor = arrowColor || getContrastedColor(settings.color);
                      $('polyline', arrow.all).attr('stroke', arrowColor);
                    }

                    removeArrowPositionClassesAndAdd(settings.arrowPosition, arrow.all);
                } else {
                    if (arrow.all) {
                        arrow.all.hide();
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
                    right: $('.fade-right', wrapper),
                    top: $('.fade-top', wrapper),
                    bottom: $('.fade-bottom', wrapper)
                };
                arrow = {
                    left: $('.arrow-left', wrapper),
                    right: $('.arrow-right', wrapper),
                    top: $('.arrow-top', wrapper),
                    bottom: $('.arrow-bottom', wrapper),
                    both: $('.arrow-left', wrapper).add($('.arrow-right', wrapper)),
                    vertical: $('.arrow-top', wrapper).add($('.arrow-bottom', wrapper)),
                    all: $('.arrow-left', wrapper).add($('.arrow-right', wrapper))
                      .add($('.arrow-top', wrapper)).add($('.arrow-bottom', wrapper))
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
                top: $('.arrow-top', wrapper),
                bottom: $('.arrow-bottom', wrapper),
                both: $('.arrow-left', wrapper).add($('.arrow-right', wrapper)),
                vertical: $('.arrow-top', wrapper).add($('.arrow-bottom', wrapper)),
                all: $('.arrow-left', wrapper).add($('.arrow-right', wrapper))
                  .add($('.arrow-top', wrapper)).add($('.arrow-bottom', wrapper))
            };
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

        function removeArrowPositionClassesAndAdd(position, arrows) {
          arrows.removeClass('start center end');
          arrows.addClass(position);
        }

        function getIconLeft(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconLeft = '<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 2,12 12,2"/></svg>';

            return settings.iconLeft || defaultIconLeft;
        }

        function getIconRight(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconRight = '<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,22 12,12 2,2"/></svg>';

            return settings.iconRight || defaultIconRight;
        }

        function getIconTop(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconTop = '<svg width="24" height="14" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,12 12,2 22,12"/></svg>';

            return settings.iconTop || defaultIconTop;
        }

        function getIconBottom(settings) {
            var color = settings.arrowColor || getContrastedColor(settings.color),
                defaultIconBottom = '<svg width="24" height="14" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,2 12,12 22,2"/></svg>';

            return settings.iconBottom || defaultIconBottom;
        }
    };

    $.fn.indicate.defaults = {
        // Clicking on the arrow will scroll (1 / value) of the currently visible width.
        scrollDenominator: 2,
        // If color is not specified it will either be the surrounding color or white.
        defaultColor: '#FFFFFF',
        // Arrows are shown by default.
        arrows: true,
        // Defines how the arrows should be positioned inside the fade effect.
        // Can be set to 'cetner', 'start' or 'end'.
        arrowPosition: 'start',
        // The face effec's width.
        fadeWidth: '20px',
        // This far away from the scroll end the effect will be removed.
        fadeOffset: 5,
        // If the element is an iframe the height will be changed to the iframe content height. For tables this is TODO.
        adaptToContentHeight: true,
        // By default horizontal scrollling is enabled.
        horizontal: true,
        // Additionally the effect can also be applied vertically.
        vertical: false,
        // Set the max-height of the wrapper.
        maxHeight: 'none'
    };

}));
