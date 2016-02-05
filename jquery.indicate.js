/* 
 * jQuery Scroll Indicator 2016 by Matthias Giger
 * http://naminho.ch/scroll-indicator
 */
(function($) {

	$.fn.indicate = function(options) {

		// Empty Selection
	    if (this.length === 0)
	    	return;

	    this.each(function(eachIndex) {

	    	var settings, element, parent, container, offset = 0, fadeRight, fadeLeft, arrow, isIframe, usePostMessage = false,
	        elementWidth, containerWidth, tagName, contentWrapper, pluginWrapper, uniqueIdentifier;

	        // If plugin has already been initialized, only update the settings.
			if ($(this).parent().hasClass('content-wrapper')) {
				contentWrapper = $(this).parent();
				pluginWrapper = $(this).parent().parent();

				settings = contentWrapper.data('settings');
				settings = $.extend({}, settings, options);
	        	contentWrapper.data('settings', settings);

	        	uniqueIdentifier = contentWrapper.data('uniqueIdentifier');
		    	
		    	$('.fade-left', pluginWrapper).css('box-shadow', '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color);
		    	$('.fade-right', pluginWrapper).css('box-shadow', '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color);
		    	if (!settings.arrows) {
		    		$('.arrow-left', pluginWrapper).hide();
		    		$('.arrow-right', pluginWrapper).hide();
		    	} else {
		    		//console.log($('.arrow-left', pluginWrapper).length);
		    		element = $(this);
		    		arrow = {
		    			left: $('.arrow-left', pluginWrapper),
		    			right: $('.arrow-right', pluginWrapper)
		    		};

		    		arrow.both = arrow.left.add(arrow.right);

		    		fadeLeft = $('.arrow-left', pluginWrapper);
		    		fadeRight = $('.arrow-right', pluginWrapper);

		    		isIframe = element.prop("tagName").toLowerCase() === 'iframe';

		    		if (isIframe) {
				    	usePostMessage = differentDomain(element);
				    }

		    		if (false) {
		    			addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, element, parent);
		    		}
		    		if (arrow.left.css('display') === 'none') {
		    			resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
		    		}
		    		if (settings.arrows) {
		    			scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
		    			resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
		    		}
		    	}
		    	return;
		    }

		    uniqueIdentifier = 'i_' + getRandomInt(1, 999);

	        element = $(this);

	        element.css('width', '100%');

	        // Add a wrapper
		    element.wrap('<div class="scroll-indicator plugin-wrapper '+ uniqueIdentifier + '"><div class="content-wrapper '+ uniqueIdentifier + '"></div><div class="fade-left '+ uniqueIdentifier + '"></div><div class="fade-right '+ uniqueIdentifier + '"></div></div>');

		    pluginWrapper = $('.plugin-wrapper.'+ uniqueIdentifier, element.parent().parent().parent());
		    contentWrapper = $('.content-wrapper.'+ uniqueIdentifier, pluginWrapper);
		    fadeLeft = $('.fade-left.'+ uniqueIdentifier, pluginWrapper);
		    fadeRight = $('.fade-right.'+ uniqueIdentifier, pluginWrapper);

		    settings = $.extend({}, $.fn.indicate.defaults, options);
	        contentWrapper.data('settings', settings);
	        contentWrapper.data('uniqueIdentifier', uniqueIdentifier);

		    tagName = element.prop("tagName").toLowerCase();

		    isIframe = element.prop("tagName").toLowerCase() === 'iframe';

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
		    	'position': 'relative', 
		    	'overflow-x': 'auto'
		    });

	        var fadeStyles = {
	        	'z-index': '1', 
	        	'width': '0px', 
	        	'height': '100%', 
	        	'position': 'absolute', 
	        	'top': '0',
	        	//'transition': 'all 1s linear'
	        };

	        var boxShadow = {
	        	'box-shadow': '0 0 ' + settings.fadeWidth + ' ' + settings.fadeWidth + ' ' + settings.color
	        };

	        fadeLeft.css(fadeStyles).css('left', '0').css(boxShadow).css('display', 'none');
	        fadeRight.css(fadeStyles).css('right', '0').css(boxShadow);

	        if (settings.arrows) {
				arrow = addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, element, parent);
			}

	        // Prevent accidentially selecting table, when clicking the arrows
	        contentWrapper.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);

	        $(window).on('resize', function() {
	            resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
	        });

	        if (isIframe && !usePostMessage) {
	        	// Do this when the iframe is loaded
		        setTimeout(function() { // $(window).load(function(){
					$(element.contents()).scroll(function() {
						scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
					});
					resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
				}, 3000);
		    } else {
		    	contentWrapper.on('scroll', function() {
		            scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage);
		        });
		    }

		    if (usePostMessage) {
		    	var src = element.attr('src');
		    	var subdomainIframe = extractSubdomain(src);

		    	$.receiveMessage(function(e) {
					var data = JSON.parse(e.data);
					scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage, data.offset, data.width);
					// TODO Resize
				}, 'http://' + subdomainIframe);
		    }

	        resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage);
		});

        return this;

        function resize(contentWrapper, element, fadeLeft, fadeRight, arrow, isIframe, usePostMessage) {
			var wrapperWidth = contentWrapper.width();
			var elementWidth = element.width();

			if (isIframe && !usePostMessage)
				elementWidth = $(element.contents()).width();

			if (elementWidth <= wrapperWidth) {
				fadeLeft.hide();
				fadeRight.hide();
				arrow.both.hide();
			} else {
				if (isIframe && !usePostMessage)
					var offset = $(element.contents()).scrollLeft();
				else
					var offset = contentWrapper.scrollLeft();

				fadeRight.show();
				arrow.right.show();
				if (offset > 25) {
					arrow.left.show();
					fadeLeft.show();
				}
			}
		}

		function scroll(isIframe, contentWrapper, element, arrow, fadeLeft, fadeRight, usePostMessage, offsetPost, widthPost) {
			var settings = contentWrapper.data('settings');
			var wrapperWidth = contentWrapper.width();
			var elementWidth = element.width();

			if (isIframe && !usePostMessage)
				var offset = $(element.contents()).scrollLeft();
			if (!isIframe)
				var offset = contentWrapper.scrollLeft();
			if (isIframe && usePostMessage)
				var offset = offsetPost;

			if (isIframe && !usePostMessage)
				elementWidth = $(element.contents()).width();
			if (isIframe && usePostMessage)
				elementWidth = widthPost;

			if (offset > 25) {
				fadeLeft.show();
				if (!usePostMessage && settings.arrows)
					arrow.left.show();
			} else {
				fadeLeft.hide();
				if (!usePostMessage && settings.arrows)
					arrow.left.hide();
			}

			if (offset + wrapperWidth + 25 < elementWidth) {
				fadeRight.show();
				if (!usePostMessage && settings.arrows)
					arrow.right.show();
			} else {
				fadeRight.hide();
				if (!usePostMessage && settings.arrows)
					arrow.right.hide();
			}
		}

		function scrollTo(dir, isIframe, contentWrapper, element) {
			var settings = contentWrapper.data('settings');
			var wrapperWidth = contentWrapper.width();
			var elementWidth = element.width();

			if (!isIframe)
				var offset = contentWrapper.scrollLeft();
			else
				var offset = $(element.contents()).scrollLeft();

			var length = wrapperWidth / settings.scrollDenominator;

			if (!isIframe) {
				if (dir === 'left')
					contentWrapper.animate({scrollLeft: offset - length}, 300);
				else
					contentWrapper.animate({scrollLeft: offset + length}, 300);
			} else {
				if (dir === 'left')
					element.contents().scrollLeft(offset - length);
				else
					element.contents().scrollLeft(offset + length);
			}
		}

		function addArrows(uniqueIdentifier, pluginWrapper, usePostMessage, isIframe, contentWrapper, element, parent) {
			var arrowLeftImage = '<div class="arrow-left ' + uniqueIdentifier + '"><svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 2,12 12,2 "/></svg></div>';
			var arrowRightImage = '<div class="arrow-right ' + uniqueIdentifier + '"><svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="2,22 12,12 2,2 "/></svg></div>';

			pluginWrapper.append(arrowLeftImage);
			pluginWrapper.append(arrowRightImage);

			var wrapperStyles = {
				'width': '50px',
				'height': '100%',
				'position': 'absolute', 
				'top': '0', 
				'z-index': '120'
			};

			var svgStyles = {
				'width': '14px', 
				'height': '24px',
				'margin-top': '10px'
			};

			var arrowLeft = $('.arrow-left.'+ uniqueIdentifier, parent).css(wrapperStyles).css('display', 'none');
			var arrowRight = $('.arrow-right.'+ uniqueIdentifier, parent).css(wrapperStyles).css('right', '0');

			arrowLeft.find('svg').css(svgStyles).css('margin-left', '2px');
			arrowRight.find('svg').css(svgStyles).css('margin-right', '2px').css({'position': 'absolute', 'right': '0'});

			var arrows = arrowLeft.add(arrowRight);

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
				if (usePostMessage)
					return;
			    scrollTo('left', isIframe, contentWrapper, element);
			});

			arrowRight.click(function() {
				if (usePostMessage)
					return;
			    scrollTo('right', isIframe, contentWrapper, element);
			});

			return {
				both: arrows,
				left: arrowLeft,
				right: arrowRight
			};
		}

		function extractProtocol(domain) {
			var arr = domain.split('/');
	    	return arr[0];
		}

		function extractSubdomain(domain) {
			var arr = domain.split('/');
	    	var protocolIframe = arr[0];
	    	return arr[2];
		}

		function extractDomainName(subdomain) {
			var arr = subdomain.split('.');
			return arr[arr.length - 2] + '.' + arr[arr.length - 1];
		}

		function differentDomain(element) {
			var src = element.attr('src');
	    	var protocolIframe = extractProtocol(src);
	    	var subdomainIframe = extractSubdomain(src);
	    	var host = document.location.hostname;

	    	if (location.protocol != protocolIframe || location.host != subdomainIframe) {
	    		console.warn(location.host + ' != ' + subdomainIframe);
	    		console.warn('indicate will only work on iframes with the same origin.');
	    		var domainName = extractDomainName(subdomainIframe);
	    		console.log(document.domain + " != " + domainName);
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
	};

	$.fn.indicate.defaults = {
		scrollDenominator: 3, // Clicking on the arrow will scroll (1 / value) of the container width
		color: '#FFFFFF',
		arrows: true,
		fadeWidth: '20px'
	};

})(jQuery);
