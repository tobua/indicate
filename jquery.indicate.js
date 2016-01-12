/* 
 * jQuery Scroll Indicator 2016 by Matthias Giger
 * http://naminho.ch/scroll-indicator
 */
(function($) {

	$.fn.indicate = function(options) {

		// Empty Selection
	    if (this.length === 0)
	    	return;

	    var settings = $.extend({}, $.fn.indicate.defaults, options)

	    var ID = getRandomInt(1, 999)

	    this.each(function(eachIndex) {

	    	var element, parent, container, offset = 0, fadeRight, fadeLeft, arrowRight, arrowLeft, isIframe, usePostMessage = false,
	        elementWidth, containerWidth, tagName, contentWrapper, pluginWrapper;

	        // If plugin has already been initialized, only update the settings.
			if ($(this).parent().hasClass('content-wrapper')) {
		    	var pluginWrapper = $(this).parent().parent();
		    	$('.fade-left', pluginWrapper).css('box-shadow', '0 0 30px 20px ' + settings.color)
		    	$('.fade-right', pluginWrapper).css('box-shadow', '0 0 30px 20px ' + settings.color)
		    	if (!settings.arrows) {
		    		$('.arrow-left', pluginWrapper).hide();
		    		$('.arrow-right', pluginWrapper).hide();
		    	} else {
		    		if ($('.arrow-left', pluginWrapper).css('display') === 'none') {
		    			console.log('TODO add arrows (separate function)')
		    		}
		    		if (settings.arrows === true) {
		    			$('.arrow-left', pluginWrapper).show();
		    			$('.arrow-right', pluginWrapper).show();
		    		}
		    	}
		    	return;
		    }

	        element = $(this)

	        element.css('width', '100%');

	        // Add a wrapper
		    element.wrap('<div class="scroll-indicator plugin-wrapper nr' + ID + '_' + eachIndex + '"><div class="content-wrapper nr' + ID + '_' + eachIndex + '"></div><div class="fade-left nr' + ID + '_' + eachIndex + '"></div><div class="fade-right nr' + ID + '_' + eachIndex + '"></div></div>')

		    pluginWrapper = $('.plugin-wrapper.nr' + ID + '_' + eachIndex, element.parent().parent().parent())
		    contentWrapper = $('.content-wrapper.nr' + ID + '_' + eachIndex, pluginWrapper)
		    fadeLeft = $('.fade-left.nr' + ID + '_' + eachIndex, pluginWrapper)
		    fadeRight = $('.fade-right.nr' + ID + '_' + eachIndex, pluginWrapper)

		    tagName = element.prop("tagName").toLowerCase();

		    isIframe = element.prop("tagName").toLowerCase() == 'iframe'

		    if (settings.maxHeight) {
		    	contentWrapper.css('max-height', settings.maxHeight)
		    }

		    if (isIframe) {
		    	usePostMessage = differentDomain(element)
		    }

		    pluginWrapper.css({
		    	'position': 'relative',
		    	'overflow': 'hidden'
		    })

		    contentWrapper.css({
		    	'position': 'relative', 
		    	'overflow-x': 'auto'
		    })

	        var fadeStyles = {
	        	'z-index': '1', 
	        	'width': '0px', 
	        	'height': '100%', 
	        	'position': 'absolute', 
	        	'top': '0',
	        	//'transition': 'all 1s linear'
	        }

	        var boxShadow = {
	        	'box-shadow': '0 0 30px 20px ' + settings.color
	        }

	        fadeLeft.css(fadeStyles).css('left', '0').css(boxShadow).css('display', 'none')
	        fadeRight.css(fadeStyles).css('right', '0').css(boxShadow)

	        if (settings.arrows) {

				var arrowLeftImage = '<svg class="arrow-left nr' + ID + '_' + eachIndex + '" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 2,12 12,2 "/></svg>'
				var arrowRightImage = '<svg class="arrow-right nr' + ID + '_' + eachIndex + '" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12,22 22,12 12,2 "/></svg>'

				pluginWrapper.append(arrowLeftImage)
				pluginWrapper.append(arrowRightImage)

				arrowStyles = {
					'width': '24px', 
					'height': '24px', 
					'position': 'absolute', 
					'top': '10px', 
					'z-index': '120'
				}

				arrowLeft = $('.arrow-left.nr' + ID + '_' + eachIndex, parent).css(arrowStyles).css('margin-left', '2px').css('display', 'none')

				arrowRight = $('.arrow-right.nr' + ID + '_' + eachIndex, parent).css(arrowStyles).css('right', '0').css('margin-right', '2px')

				arrowLeft.click(function() {
					if (usePostMessage)
						return
				    scrollTo('left', isIframe, contentWrapper, element)
				})

				arrowRight.click(function() {
					if (usePostMessage)
						return
				    scrollTo('right', isIframe, contentWrapper, element)
				})

			}

	        // Prevent accidentially selecting table, when clicking the arrows
	        contentWrapper.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false)

	        $(window).on('resize', function() {
	            resize(contentWrapper, element, fadeLeft, fadeRight, arrowLeft, arrowRight, isIframe, usePostMessage)
	        })

	        if (isIframe && !usePostMessage) {
	        	// Do this when the iframe is loaded
		        setTimeout(function() { // $(window).load(function(){
					$(element.contents()).scroll(function() {
						scroll(isIframe, contentWrapper, element, arrowLeft, arrowRight, fadeLeft, fadeRight, usePostMessage)
					})
					resize(contentWrapper, element, fadeLeft, fadeRight, arrowLeft, arrowRight, isIframe, usePostMessage)
				}, 3000);
		    } else {
		    	contentWrapper.on('scroll', function() {
		            scroll(isIframe, contentWrapper, element, arrowLeft, arrowRight, fadeLeft, fadeRight, usePostMessage)
		        })
		    }

		    if (usePostMessage) {
		    	var src = element.attr('src')
		    	var subdomainIframe = extractSubdomain(src)

		    	$.receiveMessage(function(e) {
					var data = JSON.parse(e.data)
					scroll(isIframe, contentWrapper, element, arrowLeft, arrowRight, fadeLeft, fadeRight, usePostMessage, data.offset, data.width)
					// TODO Resize
				}, 'http://' + subdomainIframe);
		    }

	        resize(contentWrapper, element, fadeLeft, fadeRight, arrowLeft, arrowRight, isIframe, usePostMessage)
		});

        return this

        function resize(contentWrapper, element, fadeLeft, fadeRight, arrowLeft, arrowRight, isIframe, usePostMessage) {
			var wrapperWidth = contentWrapper.width()
			var elementWidth = element.width()

			if (isIframe && !usePostMessage)
				elementWidth = $(element.contents()).width()

			if (elementWidth <= wrapperWidth) {
				fadeLeft.hide()
				fadeRight.hide()
				arrowLeft.hide()
				arrowRight.hide()
			} else {
				if (isIframe && !usePostMessage)
					var offset = $(element.contents()).scrollLeft()
				else
					var offset = contentWrapper.scrollLeft()

				fadeRight.show()
				arrowRight.show()
				if (offset > 25) {
					arrowLeft.show()
					fadeLeft.show()
				}
			}
		}

		function scroll(isIframe, contentWrapper, element, arrowLeft, arrowRight, fadeLeft, fadeRight, usePostMessage, offsetPost, widthPost) {
			var wrapperWidth = contentWrapper.width();
			var elementWidth = element.width();

			if (isIframe && !usePostMessage)
				var offset = $(element.contents()).scrollLeft()
			if (!isIframe)
				var offset = contentWrapper.scrollLeft()
			if (isIframe && usePostMessage)
				var offset = offsetPost

			if (isIframe && !usePostMessage)
				elementWidth = $(element.contents()).width()
			if (isIframe && usePostMessage)
				elementWidth = widthPost

			if (offset > 25) {
				fadeLeft.show()
				if (!usePostMessage)
					arrowLeft.show()
			} else {
				fadeLeft.hide()
				if (!usePostMessage)
					arrowLeft.hide()
			}

			if (offset + wrapperWidth + 25 < elementWidth) {
				fadeRight.show()
				if (!usePostMessage)
					arrowRight.show()
			} else {
				fadeRight.hide()
				if (!usePostMessage)
					arrowRight.hide()
			}
		}

		function scrollTo(dir, isIframe, contentWrapper, element) {
			var wrapperWidth = contentWrapper.width()
			var elementWidth = element.width()

			if (!isIframe)
				var offset = contentWrapper.scrollLeft()
			else
				var offset = $(element.contents()).scrollLeft()

			var length = wrapperWidth / settings.scrollDenominator

			if (!isIframe) {
				if (dir == 'left')
					contentWrapper.animate({scrollLeft: offset - length}, 300)
				else
					contentWrapper.animate({scrollLeft: offset + length}, 300)
			} else {
				if (dir == 'left')
					element.contents().scrollLeft(offset - length)
				else
					element.contents().scrollLeft(offset + length)
			}
		}

		function extractProtocol(domain) {
			var arr = domain.split('/')
	    	return arr[0]
		}

		function extractSubdomain(domain) {
			var arr = domain.split('/')
	    	var protocolIframe = arr[0]
	    	return arr[2]
		}

		function extractDomainName(subdomain) {
			var arr = subdomain.split('.')
			return arr[arr.length - 2] + '.' + arr[arr.length - 1]
		}

		function differentDomain(element) {
			var src = element.attr('src')
	    	var protocolIframe = extractProtocol(src)
	    	var subdomainIframe = extractSubdomain(src)
	    	var host = document.location.hostname

	    	if (location.protocol != protocolIframe || location.host != subdomainIframe) {
	    		console.warn(location.host + ' != ' + subdomainIframe)
	    		console.warn('indicate will only work on iframes with the same origin.')
	    		var domainName = extractDomainName(subdomainIframe);
	    		console.log(document.domain + " != " + domainName)
	    		if (document.domain != domainName) {
	    			return true
	    		} else {
	    			document.domain = domainName
	    		}
	    	}
	    	return false
		}

		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

	$.fn.indicate.defaults = {
		scrollDenominator: 3, // Clicking on the arrow will scroll (1 / value) of the container width
		color: '#FFFFFF',
		arrows: true
	};

	// TODO styling
	// TODO upload JS

})(jQuery);