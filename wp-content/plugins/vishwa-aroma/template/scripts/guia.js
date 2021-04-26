$(window).load(function () {
	// Mostra aviso legal na primeira execução ou se houver mudança na versão do aplicativo
	if ($.cookie('splashscreen') != '2.1.0') {
		if (window.location.href.indexOf('index') > -1) {
			$(".aviso-legal").show();
			$(".iniciar-guia").click(function (e) {
				e.preventDefault();
				$.cookie("splashscreen", '2.1.0', {
					expires: 360
				});
				$(".aviso-legal").hide();
				$(".pesquisa-index").fadeIn(600);
				$(".menu-index").fadeIn(600);
				$(".open-left-sidebar").fadeIn(600);
			});
			$('.ver-tutorial').click(function () {
				$.cookie("tutorial", '1', {
					expires: 360
				});
				$.cookie("splashscreen", '2.1.0', {
					expires: 360
				});
			});
		} else {
			window.location.href = encodeURI('index.html');
		}
	} else {
		$(".pesquisa-index").show();
		if ($('.resposta-pesquisa').html() == '') {
			$(".menu-index").show();
		} else {
			$(".menu-index").hide();
		}
		$(".open-left-sidebar").show();
	}
});
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	if (!window.device) {
		window.device = { platform: 'Browser' };
	} else {
		//alert( "Cordova version: " + device.cordova + "\n" + "Device model: " + device.model + "\n" + "Device platform: " + device.platform + "\n" + "Device UUID: " + device.uuid + "\n" + "Device version: " + device.version );
		if (device.platform.toUpperCase() === 'ANDROID') {
			$(document).on('click', 'a[href^="http"]', function(e) {
				e.preventDefault();
				var url = $(this).attr('href');
				navigator.app.loadUrl(url, {
					openExternal: true
				});
			});
		} else if (device.platform.toUpperCase() === 'IOS') {
			$(document).on('click', 'a[href^="http"]', function(e) {
				e.preventDefault();
				var url = $(this).attr('href');
				window.open(url, '_system');
			});
		}
	}
}

$(window).load(function() {
	if ($.cookie('tutorial') == '') {
		$("#status").fadeOut();
		$("#preloader").fadeOut();
	} else {
		$("#status").hide();
		$("#preloader").hide();
	}
});

$(document).ready(function() {
	//Disable cut copy paste
	$('body').bind('cut copy paste', function (e) {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.copyright-notification').slideDown(200);
		var notification_timer;
    notification_timer = setTimeout(function(){ $('.timeout-notification').slideUp(250); },2000);
		e.preventDefault();
	});

	//Disable mouse right click
	$('body').on('contextmenu',function(e){
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.copyright-notification').slideDown(200);
		var notification_timer;
    notification_timer = setTimeout(function(){ $('.timeout-notification').slideUp(250); },2000);
		e.preventDefault();
	});

	// Volta à pagina anterior
	var page = window.location.href;
	if (page.search('html') <= -1 || page.search('index.html') > -1) {
		$('a.back').hide();
	}
	$('a.back').click(function() {
		var page = window.location.href;
		if (page.search('menu-oleo') > -1 || page.search('aromaterapia') > -1 || page.search('referencias-bibliograficas') > -1) {
			window.location.href = 'index.html';
		} else {
			parent.history.back();
		}
		return false;
	});

	// Scroll do index alfabético dos menus de itens
	$('.menu-item-index a').on('click', function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		$('.menu-item-grupos').animate({
			scrollTop: ($('.menu-item-grupos').scrollTop() + $(target).offset().top - $('#header-fixed').height() - 71 - parseInt($('.vishwaapp').css('margin-top')))
		}, 'slow');
	});

	// Notificações das legendas de uso
	$('.show-legenda').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		var notificacao = '.legenda-' + $(this).html();
		$(notificacao).slideDown(200);
		return false;
	});

	// Accordion
	$('.accordion-toggle').click(function() {
		//Expand or collapse this panel
		$(this).next().slideDown(250);
		$('.accordion').find('i').removeClass('rotate-180');
		$(this).find('i').addClass('rotate-180');

		//Hide the other panels
		$(".accordion-content").not($(this).next()).slideUp(200);
	});

	//Menu Settings
	$('.open-header-menu, .close-header-menu').click(function() {
		$('.header-menu').toggleClass('header-menu-active');
		$('.open-header-menu').toggleClass('header-rotate');
	});

	$('.close-header-menu').click(function() {
		$('.header-menu').removeClass('header-menu-active');
	});

	$('.show-submenu').click(function() {
		$(this).parent().find('.submenu').toggleClass('submenu-active');
		$(this).toggleClass('submenu-active');
		return false;
	});

	$('.menu-item').click(function() {
		$('.close-sidebar').click();
	});

	$('#texto-pesquisa-index').focus(function() {
		if ($(this).val() == 'Palavra-chave') {
			$(this).val('');
		}
	});
	$('#texto-pesquisa-index').blur(function() {
		if ($(this).val() == '') {
			$(this).val('Palavra-chave');
		}
	});

	$('#keyWordField').focus(function() {
		if ($(this).val() == 'Palavra-chave') {
			$(this).val('');
		}
	});
	$('#keyWordField').blur(function() {
		if ($(this).val() == '') {
			$(this).val('Palavra-chave');
		}
	});

	$('.facebook-share').on('click', function(e) {
		$('.share-socials-bottom .clear').html('Aguarde...');
		e.preventDefault();
		window.plugins.socialsharing.shareViaFacebook(
			'Conheça o Guia de Aromaterapia Vishwa Aroma.',
			'https://vishwaaroma.com/guia_facebook.png',
			'https://vishwaaroma.com/aplicativo',
			function(msg) { $('.share-socials-bottom .clear').html(''); },
			function(msg) { $('.share-socials-bottom .clear').html('Não foi possível compartilhar no Facebook.'); }
		);
	});

	$('.whatsapp-share').on('click', function(e) {
		$('.share-socials-bottom .clear').html('Aguarde...');
		e.preventDefault();
		window.plugins.socialsharing.shareViaWhatsApp(
			'Conheça o Guia de Aromaterapia Vishwa Aroma.',
			'https://vishwaaroma.com/guia_whatsapp.png',
			'https://vishwaaroma.com/aplicativo',
			function(msg) { $('.share-socials-bottom .clear').html(''); },
			function(msg) { $('.share-socials-bottom .clear').html('Não foi possível compartilhar no Whatsapp.'); }
		);
	});

	$('.twitter-share').on('click', function(e) {
		$('.share-socials-bottom .clear').html('Aguarde...');
		e.preventDefault();
		window.plugins.socialsharing.shareViaTwitter(
			'Conheça o Guia de Aromaterapia Vishwa Aroma.',
			'https://vishwaaroma.com/guia_twitter.png',
			'https://vishwaaroma.com/aplicativo',
			function(msg) { $('.share-socials-bottom .clear').html(''); },
			function(msg) { $('.share-socials-bottom .clear').html('Não foi possível compartilhar no Twitter.'); }
		);
	});

	$('.instagram-share').on('click', function(e) {
		$('.share-socials-bottom .clear').html('Aguarde...');
		e.preventDefault();
		window.plugins.socialsharing.shareViaInstagram(
			'Conheça o Guia de Aromaterapia Vishwa Aroma.',
			'https://vishwaaroma.com/guia_instagram.png',
			function(msg) { $('.share-socials-bottom .clear').html(''); },
			function(msg) { $('.share-socials-bottom .clear').html('Não foi possível compartilhar no Instagram.'); }
		);
	});

	//Fast Click - Removing 300ms delay when clicking for instant response time
	$(function() {
		FastClick.attach(document.body);
	});

	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a, b, c) {
		if (c in b && b[c]) {
			var d, e = a.location,
				f = /^(a|html)$/i;
			a.addEventListener("click", function(a) {
				d = a.target;
				while (!f.test(d.nodeName)) d = d.parentNode;
				"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
			}, !1)
		}
	})(document, window.navigator, "standalone")

	//Lazy Load | Preloading Image

	$(function() {
		$(".preload-image").lazyload({
			threshold: 200,
			effect: "fadeIn"
		});
		$("img.lazy").show().lazyload();
	});

	//Tabs

	$('ul.tabs li').click(function() {
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('active-tab');
		$('.tab-content').slideUp(200);

		$(this).addClass('active-tab');
		$("#" + tab_id).slideToggle(200);
	})

	//Classic Toggles

	$('.toggle-title').click(function() {
		$(this).next('.toggle-content').slideToggle(200);
		$(this).find('i').toggleClass('rotate-toggle');
		return false;
	});

	//Notifications

	$('.static-notification-close').click(function() {
		$(this).parent().slideUp(200);
		return false;
	});

	$('.tap-dismiss').click(function() {
		$(this).slideUp(200);
		return false;
	});

	//Modal Launchers

	$('.modal-close').click(function() {
		return false;
	});

	$('.simple-modal').click(function() {
		$('.simple-modal-content').modal();
	});

	$('.social-login-modal').click(function() {
		$('.social-login-modal-content').modal();
	});

	$('.simple-login-modal').click(function() {
		$('.simple-login-modal-content').modal();
	});

	$('.social-profile-modal').click(function() {
		$('.social-profile-modal-content').modal();
	});

	//Sharebox Settings

	$('.show-share-bottom, .show-share-box').click(function() {
		$('.share-bottom').toggleClass('active-share-bottom');
		$.modal.close()
		return false;
	});

	$('.close-share-bottom').click(function() {
		$('.share-bottom').removeClass('active-share-bottom');
		return false;
	});

	//Fixed Notifications

	//top
	$('.close-top-notification').click(function() {
		$('.top-notification').slideUp(200);
		return false;
	});

	$('.show-top-notification-1').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.top-notification-1').slideDown(200);
		$('#keyWordField').focus();
	});

	$('.show-top-notification-2').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.top-notification-2').slideDown(200);
	});

	$('.show-top-notification-3').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.top-notification-3').slideDown(200);
	});

	//bottom
	$('.close-bottom-notification').click(function() {
		$('.bottom-notification').slideUp(200);
		return false;
	});

	$('.show-bottom-notification-1').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.bottom-notification-1').slideDown(200);
		return false;
	});

	$('.show-bottom-notification-2').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.bottom-notification-2').slideDown(200);
		return false;
	});

	$('.show-bottom-notification-3').click(function() {
		$('.top-notification, .bottom-notification, .timeout-notification').slideUp(200);
		$('.bottom-notification-3').slideDown(200);
		return false;
	});

	//Show Back To Home When Scrolling

	$('#main-content, .menu-item-grupos').on('scroll', function() {
		var total_scroll_height = $('#main-content')[0].scrollHeight;
		var inside_header = ($(this).scrollTop() <= 150);
		var passed_header = ($(this).scrollTop() >= 0); //250
		var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 100)));

		if (inside_header == true) {
			$('.back-top').removeClass('visible');
		} else if (passed_header == true) {
			$('.back-top').addClass('visible');
		}
	});

	$('.back-top').click(function() {
		$('#main-content, .menu-item-grupos').animate({
			scrollTop: 0
		}, 500, 'easeInOutQuad');
		return false;
	});

	left_sidebar();

	function left_sidebar() {
		var snapper = new Snap({
			element: document.getElementById('main-content'),
			elementMirror: document.getElementById('header-fixed'),
			elementMirror2: document.getElementById('footer-fixed'),
			disable: 'right',
			tapToClose: true,
			touchToDrag: true,
			maxPosition: 266,
			minPosition: -266
		});
		$('.close-sidebar').click(function() {
			snapper.close();
			$('.menu-item-index').show('slow');
			return false;
		});
		$('.open-left-sidebar').click(function() {
			//$(this).toggleClass('remove-sidebar');
			if (snapper.state().state == "left") {
				snapper.close();
				$('.menu-item-index').show('slow');
			} else {
				$('.menu-item-index').hide();
				snapper.open('left');
			}
			return false;
		});
		snapper.on('open', function() {
			$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
		});
		snapper.on('drag', function() {
			$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
		});
	};
});
/*

	 Template Name:      Enabled Mobile & Tablet Templates
	 Theme URL:          http://enableds.com
	 Author:             Enabled
	 Author URI:         http://themeforest.net/user/Enabled?ref=Enabled
	 Author Facebook:    https://www.facebook.com/enabled.labs
	 Author Twitter:     https://twitter.com/iEnabled
	 Version:            4.0
	 Envato License:     Regular or Extended via ThemeForest
	 Plugin Licenses:    GPL / MIT - Redistribution Allowed
								Each Plugin has it's indivudal license attached

	 Description:        The framework plugins is built into one single JS file to allow the
								template universal, fast access to all the items. As -webkit- browsers
								cache the JS on load, this asures best loading times on all platforms
								and at the same time asures you will find everything you need in one
								single place.

								The custom.js file is where all scripts should be imported for usage
								throughout the template. If you wish to import scripts inline that's
								completly up to you, but for a perfect function on all mobile devices.
								Mobile devices such as Nokia and Blackberrry handle JS better if it's
								implemented globally rather than inline throughout items.

								Please Note! Not following the structure presented in the documentation
								or altering custom.js and framework.plugins without proper experience
								can lead to the item malfunctioning. We are not responsible for any
								custom alterations and edits you make outside the as is item.

	 Warning:            All the plugins in the pack have been tested on numerous mobile devices
								running different versions of their Native OS and differen browsers.
								Some of the plugins have been heavily altered to increase performance
								or fix issues with differnet devices. We strongly recommend NOT to update
								these plugins to newer versions. We constantly check and modify and update
								them when a new, stable, proper quality version is released.

	 Structure:

	 01. FastClick        --   Version: 1.0.0
	 02. Swipebox         --   Version: 1.1.2
	 03. OWL Carousel     --   Version: 2.0.0
	 04. Snap.JS          --   Version: 1.9.3
	 05. CountdownJS      --   Version: 3.0.0
	 06. ChartsJS         --   Version: 1.0.2
	 07. SimpleModal      --   Version: 1.4.4
	 08. JustifiedGallery --   Version: 3.6.0
	 09. Contact Form     --   Version: 4.0.0

*/

(function ($) {
	/*
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	! function () {
		"use strict";

		function t(e, o) {
			function i(t, e) {
				return function () {
					return t.apply(e, arguments)
				}
			}
			var r;
			if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
				for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
				n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, o) {
					var i = Node.prototype.removeEventListener;
					"click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
				}, e.addEventListener = function (t, n, o) {
					var i = Node.prototype.addEventListener;
					"click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
						t.propagationStopped || n(t)
					}), o) : i.call(e, t, n, o)
				}), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function (t) {
					r(t)
				}, !1), e.onclick = null)
			}
		}
		var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
			n = navigator.userAgent.indexOf("Android") > 0 && !e,
			o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
			i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
			r = o && /OS [6-7]_\d/.test(navigator.userAgent),
			a = navigator.userAgent.indexOf("BB10") > 0;
		t.prototype.needsClick = function (t) {
			switch (t.nodeName.toLowerCase()) {
				case "button":
				case "select":
				case "textarea":
					if (t.disabled) return !0;
					break;
				case "input":
					if (o && "file" === t.type || t.disabled) return !0;
					break;
				case "label":
				case "iframe":
				case "video":
					return !0
			}
			return /\bneedsclick\b/.test(t.className)
		}, t.prototype.needsFocus = function (t) {
			switch (t.nodeName.toLowerCase()) {
				case "textarea":
					return !0;
				case "select":
					return !n;
				case "input":
					switch (t.type) {
						case "button":
						case "checkbox":
						case "file":
						case "image":
						case "radio":
						case "submit":
							return !1
					}
					return !t.disabled && !t.readOnly;
				default:
					return /\bneedsfocus\b/.test(t.className)
			}
		}, t.prototype.sendClick = function (t, e) {
			var n, o;
			document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
		}, t.prototype.determineEventType = function (t) {
			return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
		}, t.prototype.focus = function (t) {
			var e;
			o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
		}, t.prototype.updateScrollParent = function (t) {
			var e, n;
			if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
				n = t;
				do {
					if (n.scrollHeight > n.offsetHeight) {
						e = n, t.fastClickScrollParent = n;
						break
					}
					n = n.parentElement
				} while (n)
			}
			e && (e.fastClickLastScrollTop = e.scrollTop)
		}, t.prototype.getTargetElementFromEventTarget = function (t) {
			return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
		}, t.prototype.onTouchStart = function (t) {
			var e, n, r;
			if (t.targetTouches.length > 1) return !0;
			if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
				if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
				if (!i) {
					if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
					this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
				}
			}
			return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
		}, t.prototype.touchHasMoved = function (t) {
			var e = t.changedTouches[0],
				n = this.touchBoundary;
			return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
		}, t.prototype.onTouchMove = function (t) {
			return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
		}, t.prototype.findControl = function (t) {
			return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
		}, t.prototype.onTouchEnd = function (t) {
			var e, a, c, s, u, l = this.targetElement;
			if (!this.trackingClick) return !0;
			if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
			if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
			if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
				if (e = this.findControl(l)) {
					if (this.focus(l), n) return !1;
					l = e
				}
			} else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
			return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
		}, t.prototype.onTouchCancel = function () {
			this.trackingClick = !1, this.targetElement = null
		}, t.prototype.onMouse = function (t) {
			return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
		}, t.prototype.onClick = function (t) {
			var e;
			return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
		}, t.prototype.destroy = function () {
			var t = this.layer;
			n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
		}, t.notNeeded = function (t) {
			var e, o, i, r;
			if ("undefined" == typeof window.ontouchstart) return !0;
			if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
				if (!n) return !0;
				if (e = document.querySelector("meta[name=viewport]")) {
					if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
					if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
				}
			}
			if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
				if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
				if (document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
			return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
		}, t.attach = function (e, n) {
			return new t(e, n)
		}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
			return t
		}) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
	}();
}(jQuery));


/*
 *@author       Constantin Saguin - @brutaldesign
 *@link            http://bsign.co
 *@github        http://github.com/brutaldesign/swipebox
 *@version     1.1.2
 *@license      MIT License
 */


(function ($) {

	(function (e, t, n, r) {
		n.swipebox = function (i, s) {
			var o = {
				useCSS: true,
				hideBarsDelay: 3e3
			},
				u = this,
				a = n(i),
				i = i,
				f = i.selector,
				l = n(f),
				c = t.createTouch !== r || "ontouchstart" in e || "onmsgesturechange" in e || navigator.msMaxTouchPoints,
				h = !!e.SVGSVGElement,
				p = '<div id="swipebox-overlay">					<div id="swipebox-slider"></div>					<div id="swipebox-caption"></div>					<div id="swipebox-action">						<a id="swipebox-close"></a>						<a id="swipebox-prev"></a>						<a id="swipebox-next"></a>					</div>			</div>';
			u.settings = {};
			u.init = function () {
				u.settings = n.extend({}, o, s);
				l.click(function (e) {
					e.preventDefault();
					e.stopPropagation();
					index = a.index(n(this));
					d.target = n(e.target);
					d.init(index)
				})
			};
			var d = {
				init: function (e) {
					this.target.trigger("swipebox-start");
					this.build();
					this.openSlide(e);
					this.openImg(e);
					this.preloadImg(e + 1);
					this.preloadImg(e - 1)
				},
				build: function () {
					var t = this;
					n("body").append(p);
					if (t.doCssTrans()) {
						n("#swipebox-slider").css({
							"-webkit-transition": "left 0.4s ease",
							"-moz-transition": "left 0.4s ease",
							"-o-transition": "left 0.4s ease",
							"-khtml-transition": "left 0.4s ease",
							transition: "left 0.4s ease"
						});
						n("#swipebox-overlay").css({
							"-webkit-transition": "opacity 1s ease",
							"-moz-transition": "opacity 1s ease",
							"-o-transition": "opacity 1s ease",
							"-khtml-transition": "opacity 1s ease",
							transition: "opacity 1s ease"
						});
						n("#swipebox-action, #swipebox-caption").css({
							"-webkit-transition": "0.5s",
							"-moz-transition": "0.5s",
							"-o-transition": "0.5s",
							"-khtml-transition": "0.5s",
							transition: "0.5s"
						})
					}
					if (h) {
						var r = n("#swipebox-action #swipebox-close").css("background-image");
						r = r.replace("png", "svg");
						n("#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close").css({
							"background-image": r
						})
					}
					a.each(function () {
						n("#swipebox-slider").append('<div class="slide"></div>')
					});
					t.setDim();
					t.actions();
					t.keyboard();
					t.gesture();
					t.animBars();
					n(e).resize(function () {
						t.setDim()
					}).resize()
				},
				setDim: function () {
					var t = {
						width: n(e).width(),
						height: e.innerHeight ? e.innerHeight : n(e).height()
					};
					n("#swipebox-overlay").css(t)
				},
				supportTransition: function () {
					var e = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");
					for (var n = 0; n < e.length; n++) {
						if (t.createElement("div").style[e[n]] !== r) {
							return e[n]
						}
					}
					return false
				},
				doCssTrans: function () {
					if (u.settings.useCSS && this.supportTransition()) {
						return true
					}
				},
				gesture: function () {
					if (c) {
						var e = this,
							t = null,
							r = 10,
							i = {},
							s = {};
						var o = n("#swipebox-caption, #swipebox-action");
						o.addClass("visible-bars");
						e.setTimeout();
						n("body").bind("touchstart", function (e) {
							n(this).addClass("touching");
							s = e.originalEvent.targetTouches[0];
							i.pageX = e.originalEvent.targetTouches[0].pageX;
							n(".touching").bind("touchmove", function (e) {
								e.preventDefault();
								e.stopPropagation();
								s = e.originalEvent.targetTouches[0]
							});
							return false
						}).bind("touchend", function (u) {
							u.preventDefault();
							u.stopPropagation();
							t = s.pageX - i.pageX;
							if (t >= r) {
								e.getPrev()
							} else if (t <= -r) {
								e.getNext()
							} else {
								if (!o.hasClass("visible-bars")) {
									e.showBars();
									e.setTimeout()
								} else {
									e.clearTimeout();
									e.hideBars()
								}
							}
							n(".touching").off("touchmove").removeClass("touching")
						})
					}
				},
				setTimeout: function () {
					if (u.settings.hideBarsDelay > 0) {
						var t = this;
						t.clearTimeout();
						t.timeout = e.setTimeout(function () {
							t.hideBars()
						}, u.settings.hideBarsDelay)
					}
				},
				clearTimeout: function () {
					e.clearTimeout(this.timeout);
					this.timeout = null
				},
				showBars: function () {
					var e = n("#swipebox-caption, #swipebox-action");
					if (this.doCssTrans()) {
						e.addClass("visible-bars")
					} else {
						n("#swipebox-caption").animate({
							top: 0
						}, 500);
						n("#swipebox-action").animate({
							bottom: 0
						}, 500);
						setTimeout(function () {
							e.addClass("visible-bars")
						}, 1e3)
					}
				},
				hideBars: function () {
					var e = n("#swipebox-caption, #swipebox-action");
					if (this.doCssTrans()) {
						e.removeClass("visible-bars")
					} else {
						n("#swipebox-caption").animate({
							top: "-50px"
						}, 500);
						n("#swipebox-action").animate({
							bottom: "-50px"
						}, 500);
						setTimeout(function () {
							e.removeClass("visible-bars")
						}, 1e3)
					}
				},
				animBars: function () {
					var e = this;
					var t = n("#swipebox-caption, #swipebox-action");
					t.addClass("visible-bars");
					e.setTimeout();
					n("#swipebox-slider").click(function (n) {
						if (!t.hasClass("visible-bars")) {
							e.showBars();
							e.setTimeout()
						}
					});
					n("#swipebox-action").hover(function () {
						e.showBars();
						t.addClass("force-visible-bars");
						e.clearTimeout()
					}, function () {
						t.removeClass("force-visible-bars");
						e.setTimeout()
					})
				},
				keyboard: function () {
					var t = this;
					n(e).bind("keyup", function (e) {
						e.preventDefault();
						e.stopPropagation();
						if (e.keyCode == 37) {
							t.getPrev()
						} else if (e.keyCode == 39) {
							t.getNext()
						} else if (e.keyCode == 27) {
							t.closeSlide()
						}
					})
				},
				actions: function () {
					var e = this;
					if (a.length < 2) {
						n("#swipebox-prev, #swipebox-next").hide()
					} else {
						n("#swipebox-prev").bind("click touchend", function (t) {
							t.preventDefault();
							t.stopPropagation();
							e.getPrev();
							e.setTimeout()
						});
						n("#swipebox-next").bind("click touchend", function (t) {
							t.preventDefault();
							t.stopPropagation();
							e.getNext();
							e.setTimeout()
						})
					}
					n("#swipebox-close").bind("click touchend", function (t) {
						e.closeSlide()
						$('.gallery-fix').delay(1).fadeOut(0);
					})
				},
				setSlide: function (e, t) {
					t = t || false;
					var r = n("#swipebox-slider");
					if (this.doCssTrans()) {
						r.css({
							left: -e * 100 + "%"
						})
					} else {
						r.animate({
							left: -e * 100 + "%"
						})
					}
					n("#swipebox-slider .slide").removeClass("current");
					n("#swipebox-slider .slide").eq(e).addClass("current");
					this.setTitle(e);
					if (t) {
						r.fadeIn()
					}
					n("#swipebox-prev, #swipebox-next").removeClass("disabled");
					if (e == 0) {
						n("#swipebox-prev").addClass("disabled")
					} else if (e == a.length - 1) {
						n("#swipebox-next").addClass("disabled")
					}
				},
				openSlide: function (t) {
					n("html").addClass("swipebox");
					n(e).trigger("resize");
					this.setSlide(t, true)
				},
				preloadImg: function (e) {
					var t = this;
					setTimeout(function () {
						t.openImg(e)
					}, 1e3)
				},
				openImg: function (e) {
					var t = this;
					if (e < 0 || e >= a.length) {
						return false
					}
					t.loadImg(a.eq(e).attr("href"), function () {
						n("#swipebox-slider .slide").eq(e).html(this)
					})
				},
				setTitle: function (e, t) {
					n("#swipebox-caption").empty();
					if (a.eq(e).attr("title")) {
						n("#swipebox-caption").append(a.eq(e).attr("title"))
					}
				},
				loadImg: function (e, t) {
					var r = n("<img>").on("load", function () {
						t.call(r)
					});
					r.attr("src", e)
				},
				getNext: function () {
					var e = this;
					index = n("#swipebox-slider .slide").index(n("#swipebox-slider .slide.current"));
					if (index + 1 < a.length) {
						index++;
						e.setSlide(index);
						e.preloadImg(index + 1)
					} else {
						n("#swipebox-slider").addClass("rightSpring");
						setTimeout(function () {
							n("#swipebox-slider").removeClass("rightSpring")
						}, 500)
					}
				},
				getPrev: function () {
					var e = this;
					index = n("#swipebox-slider .slide").index(n("#swipebox-slider .slide.current"));
					if (index > 0) {
						index--;
						e.setSlide(index);
						e.preloadImg(index - 1)
					} else {
						n("#swipebox-slider").addClass("leftSpring");
						setTimeout(function () {
							n("#swipebox-slider").removeClass("leftSpring")
						}, 500)
					}
				},
				closeSlide: function () {
					var t = this;
					n(e).trigger("resize");
					n("html").removeClass("swipebox");
					t.destroy()
				},
				destroy: function () {
					var t = this;
					n(e).unbind("keyup");
					n("body").unbind("touchstart");
					n("body").unbind("touchmove");
					n("body").unbind("touchend");
					n("#swipebox-slider").unbind();
					n("#swipebox-overlay").remove();
					a.removeData("_swipebox");
					t.target.trigger("swipebox-destroy")
				}
			};
			u.init()
		};



		n.fn.swipebox = function (e) {
			if (!n.data(this, "_swipebox")) {
				var t = new n.swipebox(this, e);
				this.data("_swipebox", t)
			}
		}
	})(window, document, jQuery)



}(jQuery));



(function ($) {
	/**
	 * Owl carousel
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @license The MIT License (MIT)
	 */

	! function (a, b, c, d) {
		function e(b, c) {
			this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) {
				this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
			}, this)), a.each(e.Pipe, a.proxy(function (b, c) {
				this._pipe.push({
					filter: c.filter,
					run: a.proxy(c.run, this)
				})
			}, this)), this.setup(), this.initialize()
		}

		function f(a) {
			if (a.touches !== d) return {
				x: a.touches[0].pageX,
				y: a.touches[0].pageY
			};
			if (a.touches === d) {
				if (a.pageX !== d) return {
					x: a.pageX,
					y: a.pageY
				};
				if (a.pageX === d) return {
					x: a.clientX,
					y: a.clientY
				}
			}
		}

		function g(a) {
			var b, d, e = c.createElement("div"),
				f = a;
			for (b in f)
				if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
			return [!1]
		}

		function h() {
			return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
		}

		function i() {
			return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
		}

		function j() {
			return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
		}

		function k() {
			return "ontouchstart" in b || !!navigator.msMaxTouchPoints
		}

		function l() {
			return b.navigator.msPointerEnabled
		}
		var m, n, o;
		m = {
			start: 0,
			startX: 0,
			startY: 0,
			current: 0,
			currentX: 0,
			currentY: 0,
			offsetX: 0,
			offsetY: 0,
			distance: null,
			startTime: 0,
			endTime: 0,
			updatedX: 0,
			targetEl: null
		}, n = {
			isTouch: !1,
			isScrolling: !1,
			isSwiping: !1,
			direction: !1,
			inMotion: !1
		}, o = {
			_onDragStart: null,
			_onDragMove: null,
			_onDragEnd: null,
			_transitionEnd: null,
			_resizer: null,
			_responsiveCall: null,
			_goToLoop: null,
			_checkVisibile: null
		}, e.Defaults = {
			items: 3,
			loop: !1,
			center: !1,
			mouseDrag: !0,
			touchDrag: !0,
			pullDrag: !0,
			freeDrag: !1,
			margin: 0,
			stagePadding: 0,
			merge: !1,
			mergeFit: !0,
			autoWidth: !1,
			startPosition: 0,
			rtl: !1,
			smartSpeed: 250,
			fluidSpeed: !1,
			dragEndSpeed: !1,
			responsive: {},
			responsiveRefreshRate: 200,
			responsiveBaseElement: b,
			responsiveClass: !1,
			fallbackEasing: "swing",
			info: !1,
			nestedItemSelector: !1,
			itemElement: "div",
			stageElement: "div",
			themeClass: "owl-theme",
			baseClass: "owl-carousel",
			itemClass: "owl-item",
			centerClass: "center",
			activeClass: "active"
		}, e.Width = {
			Default: "default",
			Inner: "inner",
			Outer: "outer"
		}, e.Plugins = {}, e.Pipe = [{
			filter: ["width", "items", "settings"],
			run: function (a) {
				a.current = this._items && this._items[this.relative(this._current)]
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				var a = this._clones,
					b = this.$stage.children(".cloned");
				(b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				var a, b, c = this._clones,
					d = this._items,
					e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
				for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				var a, b, c, d = this.settings.rtl ? 1 : -1,
					e = (this.width() / this.settings.items).toFixed(3),
					f = 0;
				for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				var b, c, d = (this.width() / this.settings.items).toFixed(3),
					e = {
						width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
						"padding-left": this.settings.stagePadding || "",
						"padding-right": this.settings.stagePadding || ""
					};
				if (this.$stage.css(e), e = {
					width: this.settings.autoWidth ? "auto" : d - this.settings.margin
				}, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) {
					return a > 1
				}).length > 0)
					for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
				else this.$stage.children().css(e)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (a) {
				a.current && this.reset(this.$stage.children().index(a.current))
			}
		}, {
			filter: ["position"],
			run: function () {
				this.animate(this.coordinates(this._current))
			}
		}, {
			filter: ["width", "position", "items", "settings"],
			run: function () {
				var a, b, c, d, e = this.settings.rtl ? 1 : -1,
					f = 2 * this.settings.stagePadding,
					g = this.coordinates(this.current()) + f,
					h = g + this.width() * e,
					i = [];
				for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
				this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
			}
		}], e.prototype.initialize = function () {
			if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
				var b, c, e;
				if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
			}
			this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
		}, e.prototype.setup = function () {
			var b = this.viewport(),
				c = this.options.responsive,
				d = -1,
				e = null;
			c ? (a.each(c, function (a) {
				b >= a && a > d && (d = Number(a))
			}), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) {
				return b.replace(/\b owl-responsive-\S+/g, "")
			}).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
				property: {
					name: "settings",
					value: e
				}
			}), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
				property: {
					name: "settings",
					value: this.settings
				}
			}))
		}, e.prototype.optionsLogic = function () {
			this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
		}, e.prototype.prepare = function (b) {
			var c = this.trigger("prepare", {
				content: b
			});
			return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
				content: c.data
			}), c.data
		}, e.prototype.update = function () {
			for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
				return this[a]
			}, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
			this._invalidated = {}
		}, e.prototype.width = function (a) {
			switch (a = a || e.Width.Default) {
				case e.Width.Inner:
				case e.Width.Outer:
					return this._width;
				default:
					return this._width - 2 * this.settings.stagePadding + this.settings.margin
			}
		}, e.prototype.refresh = function () {
			if (0 === this._items.length) return !1;
			(new Date).getTime();
			this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
		}, e.prototype.eventsCall = function () {
			this.e._onDragStart = a.proxy(function (a) {
				this.onDragStart(a)
			}, this), this.e._onDragMove = a.proxy(function (a) {
				this.onDragMove(a)
			}, this), this.e._onDragEnd = a.proxy(function (a) {
				this.onDragEnd(a)
			}, this), this.e._onResize = a.proxy(function (a) {
				this.onResize(a)
			}, this), this.e._transitionEnd = a.proxy(function (a) {
				this.transitionEnd(a)
			}, this), this.e._preventClick = a.proxy(function (a) {
				this.preventClick(a)
			}, this)
		}, e.prototype.onThrottledResize = function () {
			b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
		}, e.prototype.onResize = function () {
			return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
		}, e.prototype.eventsRouter = function (a) {
			var b = a.type;
			"mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
		}, e.prototype.internalEvents = function () {
			var c = (k(), l());
			this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) {
				this.eventsRouter(a)
			}, this)), this.$stage.on("dragstart", function () {
				return !1
			}), this.$stage.get(0).onselectstart = function () {
				return !1
			}) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) {
				this.eventsRouter(a)
			}, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
		}, e.prototype.onDragStart = function (d) {
			var e, g, h, i;
			if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
			if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
			else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
			this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) {
				this.eventsRouter(a)
			}, this))
		}, e.prototype.onDragMove = function (a) {
			var c, e, g, h, i, j;
			this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
		}, e.prototype.onDragEnd = function (b) {
			var d, e, f;
			if (this.state.isTouch) {
				if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
				this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
			}
		}, e.prototype.removeClick = function (c) {
			this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () {
				a(c).off("click.preventClick")
			}, 300)
		}, e.prototype.preventClick = function (b) {
			b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
		}, e.prototype.getTransformProperty = function () {
			var a, c;
			return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
		}, e.prototype.closest = function (b) {
			var c = -1,
				d = 30,
				e = this.width(),
				f = this.coordinates();
			return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) {
				return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
			}, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
		}, e.prototype.animate = function (b) {
			this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
				transform: "translate3d(" + b + "px,0px, 0px)",
				transition: this.speed() / 1e3 + "s"
			}) : this.state.isTouch ? this.$stage.css({
				left: b + "px"
			}) : this.$stage.animate({
				left: b
			}, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () {
				this.state.inMotion && this.transitionEnd()
			}, this))
		}, e.prototype.current = function (a) {
			if (a === d) return this._current;
			if (0 === this._items.length) return d;
			if (a = this.normalize(a), this._current !== a) {
				var b = this.trigger("change", {
					property: {
						name: "position",
						value: a
					}
				});
				b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
					property: {
						name: "position",
						value: this._current
					}
				})
			}
			return this._current
		}, e.prototype.invalidate = function (a) {
			this._invalidated[a] = !0
		}, e.prototype.reset = function (a) {
			a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
		}, e.prototype.normalize = function (b, c) {
			var e = c ? this._items.length : this._items.length + this._clones.length;
			return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
		}, e.prototype.relative = function (a) {
			return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
		}, e.prototype.maximum = function (a) {
			var b, c, d, e = 0,
				f = this.settings;
			if (a) return this._items.length - 1;
			if (!f.loop && f.center) b = this._items.length - 1;
			else if (f.loop || f.center)
				if (f.loop || f.center) b = this._items.length + f.items;
				else {
					if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
					for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
						(d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
				}
			else b = this._items.length - f.items;
			return b
		}, e.prototype.minimum = function (a) {
			return a ? 0 : this._clones.length / 2
		}, e.prototype.items = function (a) {
			return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
		}, e.prototype.mergers = function (a) {
			return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
		}, e.prototype.clones = function (b) {
			var c = this._clones.length / 2,
				e = c + this._items.length,
				f = function (a) {
					return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
				};
			return b === d ? a.map(this._clones, function (a, b) {
				return f(b)
			}) : a.map(this._clones, function (a, c) {
				return a === b ? f(c) : null
			})
		}, e.prototype.speed = function (a) {
			return a !== d && (this._speed = a), this._speed
		}, e.prototype.coordinates = function (b) {
			var c = null;
			return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
				return this.coordinates(b)
			}, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
		}, e.prototype.duration = function (a, b, c) {
			return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
		}, e.prototype.to = function (c, d) {
			if (this.settings.loop) {
				var e = c - this.relative(this.current()),
					f = this.current(),
					g = this.current(),
					h = this.current() + e,
					i = 0 > g - h ? !0 : !1,
					j = this._clones.length + this._items.length;
				h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () {
					this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
				}, this), 30)
			} else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
		}, e.prototype.next = function (a) {
			a = a || !1, this.to(this.relative(this.current()) + 1, a)
		}, e.prototype.prev = function (a) {
			a = a || !1, this.to(this.relative(this.current()) - 1, a)
		}, e.prototype.transitionEnd = function (a) {
			return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
		}, e.prototype.viewport = function () {
			var d;
			if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
			else if (b.innerWidth) d = b.innerWidth;
			else {
				if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
				d = c.documentElement.clientWidth
			}
			return d
		}, e.prototype.replace = function (b) {
			this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
				return 1 === this.nodeType
			}).each(a.proxy(function (a, b) {
				b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
			}, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
		}, e.prototype.add = function (a, b) {
			b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
				content: a,
				position: b
			}), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
				content: a,
				position: b
			})
		}, e.prototype.remove = function (a) {
			a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
				content: this._items[a],
				position: a
			}), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
				content: null,
				position: a
			}))
		}, e.prototype.addTriggerableEvents = function () {
			var b = a.proxy(function (b, c) {
				return a.proxy(function (a) {
					a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
				}, this)
			}, this);
			a.each({
				next: this.next,
				prev: this.prev,
				to: this.to,
				destroy: this.destroy,
				refresh: this.refresh,
				replace: this.replace,
				add: this.add,
				remove: this.remove
			}, a.proxy(function (a, c) {
				this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
			}, this))
		}, e.prototype.watchVisibility = function () {
			function c(a) {
				return a.offsetWidth > 0 && a.offsetHeight > 0
			}

			function d() {
				c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
			}
			c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
		}, e.prototype.preloadAutoWidthImages = function (b) {
			var c, d, e, f;
			c = 0, d = this, b.each(function (g, h) {
				e = a(h), f = new Image, f.onload = function () {
					c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
				}, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
			})
		}, e.prototype.destroy = function () {
			this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
			for (var d in this._plugins) this._plugins[d].destroy();
			(this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () { }, this.$stage.off("dragstart", function () {
				return !1
			})), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
		}, e.prototype.op = function (a, b, c) {
			var d = this.settings.rtl;
			switch (b) {
				case "<":
					return d ? a > c : c > a;
				case ">":
					return d ? c > a : a > c;
				case ">=":
					return d ? c >= a : a >= c;
				case "<=":
					return d ? a >= c : c >= a
			}
		}, e.prototype.on = function (a, b, c, d) {
			a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
		}, e.prototype.off = function (a, b, c, d) {
			a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
		}, e.prototype.trigger = function (b, c, d) {
			var e = {
				item: {
					count: this._items.length,
					index: this.current()
				}
			},
				f = a.camelCase(a.grep(["on", b, d], function (a) {
					return a
				}).join("-").toLowerCase()),
				g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
					relatedTarget: this
				}, e, c));
			return this._supress[b] || (a.each(this._plugins, function (a, b) {
				b.onTrigger && b.onTrigger(g)
			}), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
		}, e.prototype.suppress = function (b) {
			a.each(b, a.proxy(function (a, b) {
				this._supress[b] = !0
			}, this))
		}, e.prototype.release = function (b) {
			a.each(b, a.proxy(function (a, b) {
				delete this._supress[b]
			}, this))
		}, e.prototype.browserSupport = function () {
			if (this.support3d = j(), this.support3d) {
				this.transformVendor = i();
				var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
				this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
			}
			this.state.orientation = b.orientation
		}, a.fn.owlCarousel = function (b) {
			return this.each(function () {
				a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
			})
		}, a.fn.owlCarousel.Constructor = e
	}(window.Zepto || window.jQuery, window, document),
		function (a, b) {
			var c = function (b) {
				this._core = b, this._loaded = [], this._handlers = {
					"initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
						if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
							for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) {
								this.load(b)
							}, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
					}, this)
				}, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
			};
			c.Defaults = {
				lazyLoad: !1
			}, c.prototype.load = function (c) {
				var d = this._core.$stage.children().eq(c),
					e = d && d.find(".owl-lazy");
				!e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
					var e, f = a(d),
						g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
					this._core.trigger("load", {
						element: f,
						url: g
					}, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
						f.css("opacity", 1), this._core.trigger("loaded", {
							element: f,
							url: g
						}, "lazy")
					}, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
						f.css({
							"background-image": "url(" + g + ")",
							opacity: "1"
						}), this._core.trigger("loaded", {
							element: f,
							url: g
						}, "lazy")
					}, this), e.src = g)
				}, this)), this._loaded.push(d.get(0)))
			}, c.prototype.destroy = function () {
				var a, b;
				for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
				for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
		}(window.Zepto || window.jQuery, window, document),
		function (a) {
			var b = function (c) {
				this._core = c, this._handlers = {
					"initialized.owl.carousel": a.proxy(function () {
						this._core.settings.autoHeight && this.update()
					}, this),
					"changed.owl.carousel": a.proxy(function (a) {
						this._core.settings.autoHeight && "position" == a.property.name && this.update()
					}, this),
					"loaded.owl.lazy": a.proxy(function (a) {
						this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
					}, this)
				}, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
			};
			b.Defaults = {
				autoHeight: !1,
				autoHeightClass: "owl-height"
			}, b.prototype.update = function () {
				this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
			}, b.prototype.destroy = function () {
				var a, b;
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
		}(window.Zepto || window.jQuery, window, document),
		function (a, b, c) {
			var d = function (b) {
				this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
					"resize.owl.carousel": a.proxy(function (a) {
						this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
					}, this),
					"refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
						this._playing && this.stop()
					}, this),
					"prepared.owl.carousel": a.proxy(function (b) {
						var c = a(b.content).find(".owl-video");
						c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
					}, this)
				}, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
					this.play(a)
				}, this))
			};
			d.Defaults = {
				video: !1,
				videoHeight: !1,
				videoWidth: !1
			}, d.prototype.fetch = function (a, b) {
				var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
					d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
					e = a.attr("data-width") || this._core.settings.videoWidth,
					f = a.attr("data-height") || this._core.settings.videoHeight,
					g = a.attr("href");
				if (!g) throw new Error("Missing video URL.");
				if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
				else {
					if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
					c = "vimeo"
				}
				d = d[6], this._videos[g] = {
					type: c,
					id: d,
					width: e,
					height: f
				}, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
			}, d.prototype.thumbnail = function (b, c) {
				var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
					h = b.find("img"),
					i = "src",
					j = "",
					k = this._core.settings,
					l = function (a) {
						e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
					};
				return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void ("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
					type: "GET",
					url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
					jsonp: "callback",
					dataType: "jsonp",
					success: function (a) {
						f = a[0].thumbnail_large, l(f)
					}
				}))
			}, d.prototype.stop = function () {
				this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
			}, d.prototype.play = function (b) {
				this._core.trigger("play", null, "video"), this._playing && this.stop();
				var c, d, e = a(b.target || b.srcElement),
					f = e.closest("." + this._core.settings.itemClass),
					g = this._videos[f.attr("data-video")],
					h = g.width || "100%",
					i = g.height || this._core.$stage.height();
				"youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
			}, d.prototype.isInFullScreen = function () {
				var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
				return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
			}, d.prototype.destroy = function () {
				var a, b;
				this._core.$element.off("click.owl.video");
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.Video = d
		}(window.Zepto || window.jQuery, window, document),
		function (a, b, c, d) {
			var e = function (b) {
				this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
					"change.owl.carousel": a.proxy(function (a) {
						"position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
					}, this),
					"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
						this.swapping = "translated" == a.type
					}, this),
					"translate.owl.carousel": a.proxy(function () {
						this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
					}, this)
				}, this.core.$element.on(this.handlers)
			};
			e.Defaults = {
				animateOut: !1,
				animateIn: !1
			}, e.prototype.swap = function () {
				if (1 === this.core.settings.items && this.core.support3d) {
					this.core.speed(0);
					var b, c = a.proxy(this.clear, this),
						d = this.core.$stage.children().eq(this.previous),
						e = this.core.$stage.children().eq(this.next),
						f = this.core.settings.animateIn,
						g = this.core.settings.animateOut;
					this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
						left: b + "px"
					}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
				}
			}, e.prototype.clear = function (b) {
				a(b.target).css({
					left: ""
				}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
			}, e.prototype.destroy = function () {
				var a, b;
				for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
				for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.Animate = e
		}(window.Zepto || window.jQuery, window, document),
		function (a, b, c) {
			var d = function (b) {
				this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
					"translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
						this.autoplay()
					}, this),
					"play.owl.autoplay": a.proxy(function (a, b, c) {
						this.play(b, c)
					}, this),
					"stop.owl.autoplay": a.proxy(function () {
						this.stop()
					}, this),
					"mouseover.owl.autoplay": a.proxy(function () {
						this.core.settings.autoplayHoverPause && this.pause()
					}, this),
					"mouseleave.owl.autoplay": a.proxy(function () {
						this.core.settings.autoplayHoverPause && this.autoplay()
					}, this)
				}, this.core.$element.on(this.handlers)
			};
			d.Defaults = {
				autoplay: !1,
				autoplayTimeout: 5e3,
				autoplayHoverPause: !1,
				autoplaySpeed: !1
			}, d.prototype.autoplay = function () {
				this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () {
					this.play()
				}, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
			}, d.prototype.play = function () {
				return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
			}, d.prototype.stop = function () {
				b.clearInterval(this.interval)
			}, d.prototype.pause = function () {
				b.clearInterval(this.interval)
			}, d.prototype.destroy = function () {
				var a, c;
				b.clearInterval(this.interval);
				for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
				for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
		}(window.Zepto || window.jQuery, window, document),
		function (a) {
			"use strict";
			var b = function (c) {
				this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
					next: this._core.next,
					prev: this._core.prev,
					to: this._core.to
				}, this._handlers = {
					"prepared.owl.carousel": a.proxy(function (b) {
						this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
					}, this),
					"add.owl.carousel": a.proxy(function (b) {
						this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
					}, this),
					"remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
						this._core.settings.dotsData && this._templates.splice(a.position, 1)
					}, this),
					"change.owl.carousel": a.proxy(function (a) {
						if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
							var b = this._core.current(),
								c = this._core.maximum(),
								d = this._core.minimum();
							a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
						}
					}, this),
					"changed.owl.carousel": a.proxy(function (a) {
						"position" == a.property.name && this.draw()
					}, this),
					"refreshed.owl.carousel": a.proxy(function () {
						this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
					}, this)
				}, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
			};
			b.Defaults = {
				nav: !1,
				navRewind: !0,
				navText: ["prev", "next"],
				navSpeed: !1,
				navElement: "div",
				navContainer: !1,
				navContainerClass: "owl-nav",
				navClass: ["owl-prev", "owl-next"],
				slideBy: 1,
				dotClass: "owl-dot",
				dotsClass: "owl-dots",
				dots: !0,
				dotsEach: !1,
				dotData: !1,
				dotsSpeed: !1,
				dotsContainer: !1,
				controlsClass: "owl-controls"
			}, b.prototype.initialize = function () {
				var b, c, d = this._core.settings;
				d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) {
					var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
					b.preventDefault(), this.to(c, d.dotsSpeed)
				}, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () {
					this.prev(d.navSpeed)
				}, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () {
					this.next(d.navSpeed)
				}, this));
				for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
			}, b.prototype.destroy = function () {
				var a, b, c, d;
				for (a in this._handlers) this.$element.off(a, this._handlers[a]);
				for (b in this._controls) this._controls[b].remove();
				for (d in this.overides) this._core[d] = this._overrides[d];
				for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
			}, b.prototype.update = function () {
				var a, b, c, d = this._core.settings,
					e = this._core.clones().length / 2,
					f = e + this._core.items().length,
					g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
				if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
					for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
						start: a - e,
						end: a - e + g - 1
					}), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
			}, b.prototype.draw = function () {
				var b, c, d = "",
					e = this._core.settings,
					f = (this._core.$stage.children(), this._core.relative(this._core.current()));
				if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
					if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
						for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
						this._controls.$indicators.html(d)
					} else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
					this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
				}
				this._controls.$indicators.toggle(e.dots)
			}, b.prototype.onTrigger = function (b) {
				var c = this._core.settings;
				b.page = {
					index: a.inArray(this.current(), this._pages),
					count: this._pages.length,
					size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
				}
			}, b.prototype.current = function () {
				var b = this._core.relative(this._core.current());
				return a.grep(this._pages, function (a) {
					return a.start <= b && a.end >= b
				}).pop()
			}, b.prototype.getPosition = function (b) {
				var c, d, e = this._core.settings;
				return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
			}, b.prototype.next = function (b) {
				a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
			}, b.prototype.prev = function (b) {
				a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
			}, b.prototype.to = function (b, c, d) {
				var e;
				d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
			}, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
		}(window.Zepto || window.jQuery, window, document),
		function (a, b) {
			"use strict";
			var c = function (d) {
				this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
					"initialized.owl.carousel": a.proxy(function () {
						"URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
					}, this),
					"prepared.owl.carousel": a.proxy(function (b) {
						var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
						this._hashes[c] = b.content
					}, this)
				}, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () {
					var a = b.location.hash.substring(1),
						c = this._core.$stage.children(),
						d = this._hashes[a] && c.index(this._hashes[a]) || 0;
					return a ? void this._core.to(d, !1, !0) : !1
				}, this))
			};
			c.Defaults = {
				URLhashListener: !1
			}, c.prototype.destroy = function () {
				var c, d;
				a(b).off("hashchange.owl.navigation");
				for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
				for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
			}, a.fn.owlCarousel.Constructor.Plugins.Hash = c
		}(window.Zepto || window.jQuery, window, document);

}(jQuery));


(function ($) {
	/*! Lazy Load 1.9.5 - MIT license - Copyright 2010-2015 Mika Tuupola */
	! function (a, b, c, d) {
		var e = a(b);
		a.fn.lazyload = function (f) {
			function g() {
				var b = 0;
				i.each(function () {
					var c = a(this);
					if (!j.skip_invisible || c.is(":visible"))
						if (a.abovethetop(this, j) || a.leftofbegin(this, j));
						else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
							if (++b > j.failure_limit) return !1
						} else c.trigger("appear"), b = 0
				})
			}
			var h, i = this,
				j = {
					threshold: 0,
					failure_limit: 0,
					event: "scroll",
					effect: "show",
					container: b,
					data_attribute: "original",
					skip_invisible: !1,
					appear: null,
					load: null,
					placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
				};
			return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
				return g()
			}), this.each(function () {
				var b = this,
					c = a(b);
				b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
					if (!this.loaded) {
						if (j.appear) {
							var d = i.length;
							j.appear.call(b, d, j)
						}
						a("<img />").bind("load", function () {
							var d = c.attr("data-" + j.data_attribute);
							c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
							var e = a.grep(i, function (a) {
								return !a.loaded
							});
							if (i = a(e), j.load) {
								var f = i.length;
								j.load.call(b, f, j)
							}
						}).attr("src", c.attr("data-" + j.data_attribute))
					}
				}), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
					b.loaded || c.trigger("appear")
				})
			}), e.bind("resize", function () {
				g()
			}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
				b.originalEvent && b.originalEvent.persisted && i.each(function () {
					a(this).trigger("appear")
				})
			}), a(c).ready(function () {
				g()
			}), this
		}, a.belowthefold = function (c, f) {
			var g;
			return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
		}, a.rightoffold = function (c, f) {
			var g;
			return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
		}, a.abovethetop = function (c, f) {
			var g;
			return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
		}, a.leftofbegin = function (c, f) {
			var g;
			return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
		}, a.inviewport = function (b, c) {
			return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
		}, a.extend(a.expr[":"], {
			"below-the-fold": function (b) {
				return a.belowthefold(b, {
					threshold: 0
				})
			},
			"above-the-top": function (b) {
				return !a.belowthefold(b, {
					threshold: 0
				})
			},
			"right-of-screen": function (b) {
				return a.rightoffold(b, {
					threshold: 0
				})
			},
			"left-of-screen": function (b) {
				return !a.rightoffold(b, {
					threshold: 0
				})
			},
			"in-viewport": function (b) {
				return a.inviewport(b, {
					threshold: 0
				})
			},
			"above-the-fold": function (b) {
				return !a.belowthefold(b, {
					threshold: 0
				})
			},
			"right-of-fold": function (b) {
				return a.rightoffold(b, {
					threshold: 0
				})
			},
			"left-of-fold": function (b) {
				return !a.rightoffold(b, {
					threshold: 0
				})
			}
		})
	}(jQuery, window, document);

}(jQuery));


(function ($) {
	/*
	 * Snap.js
	 *
	 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
	 * Released under the MIT Licence
	 * http://opensource.org/licenses/MIT
	 *
	 * Github:  http://github.com/jakiestfu/Snap.js/
	 * Version: 1.9.3 (with elementMirror for fixed navigation bars)
	 */
	/*jslint browser: true*/
	/*global define, module, ender*/
	(function (win, doc) {
		'use strict';
		var Snap = Snap || function (userOpts) {
			var settings = {
				element: null,
				elementMirror: null,
				elementMirror2: null,
				dragger: null,
				disable: 'none',
				addBodyClasses: true,
				hyperextensible: true,
				resistance: 0.5,
				flickThreshold: 50,
				transitionSpeed: 0.3,
				easing: 'ease',
				maxPosition: 266,
				minPosition: -266,
				tapToClose: true,
				touchToDrag: true,
				slideIntent: 40, // degrees
				minDragDistance: 5
			},
				cache = {
					simpleStates: {
						opening: null,
						towards: null,
						hyperExtending: null,
						halfway: null,
						flick: null,
						translation: {
							absolute: 0,
							relative: 0,
							sinceDirectionChange: 0,
							percentage: 0
						}
					}
				},
				eventList = {},
				utils = {
					hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),
					eventType: function (action) {
						var eventTypes = {
							down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
							move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
							up: (utils.hasTouch ? 'touchend' : 'mouseup'),
							out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
						};
						return eventTypes[action];
					},
					page: function (t, e) {
						return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page' + t] : e['page' + t];
					},
					klass: {
						has: function (el, name) {
							return (el.className).indexOf(name) !== -1;
						},
						add: function (el, name) {
							if (!utils.klass.has(el, name) && settings.addBodyClasses) {
								el.className += " " + name;
							}
						},
						remove: function (el, name) {
							if (settings.addBodyClasses) {
								el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
							}
						}
					},
					dispatchEvent: function (type) {
						if (typeof eventList[type] === 'function') {
							return eventList[type].call();
						}
					},
					vendor: function () {
						var tmp = doc.createElement("div"),
							prefixes = 'webkit Moz O ms'.split(' '),
							i;
						for (i in prefixes) {
							if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
								return prefixes[i];
							}
						}
					},
					transitionCallback: function () {
						return (cache.vendor === 'Moz' || cache.vendor === 'ms') ? 'transitionend' : cache.vendor + 'TransitionEnd';
					},
					canTransform: function () {
						settings.element
						return typeof settings.element.style[cache.vendor + 'Transform'] !== 'undefined';
					},
					deepExtend: function (destination, source) {
						var property;
						for (property in source) {
							if (source[property] && source[property].constructor && source[property].constructor === Object) {
								destination[property] = destination[property] || {};
								utils.deepExtend(destination[property], source[property]);
							} else {
								destination[property] = source[property];
							}
						}
						return destination;
					},
					angleOfDrag: function (x, y) {
						var degrees, theta;
						// Calc Theta
						theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
						if (theta < 0) {
							theta += 2 * Math.PI;
						}
						// Calc Degrees
						degrees = Math.floor(theta * (180 / Math.PI) - 180);
						if (degrees < 0 && degrees > -180) {
							degrees = 360 - Math.abs(degrees);
						}
						return Math.abs(degrees);
					},
					events: {
						addEvent: function addEvent(element, eventName, func) {
							if (element.addEventListener) {
								return element.addEventListener(eventName, func, false);
							} else if (element.attachEvent) {
								return element.attachEvent("on" + eventName, func);
							}
						},
						removeEvent: function addEvent(element, eventName, func) {
							if (element.addEventListener) {
								return element.removeEventListener(eventName, func, false);
							} else if (element.attachEvent) {
								return element.detachEvent("on" + eventName, func);
							}
						},
						prevent: function (e) {
							if (e.preventDefault) {
								e.preventDefault();
							} else {
								e.returnValue = false;
							}
						}
					},
					parentUntil: function (el, attr) {
						var isStr = typeof attr === 'string';
						while (el.parentNode) {
							if (isStr && el.getAttribute && el.getAttribute(attr)) {
								return el;
							} else if (!isStr && el === attr) {
								return el;
							}
							el = el.parentNode;
						}
						return null;
					}
				},
				action = {
					translate: {
						get: {
							matrix: function (index) {

								if (!utils.canTransform()) {
									return parseInt(settings.element.style.left, 10);
								} else {
									var matrix = win.getComputedStyle(settings.element)[cache.vendor + 'Transform'].match(/\((.*)\)/),
										ieOffset = 8;
									if (matrix) {
										matrix = matrix[1].split(',');
										if (matrix.length === 16) {
											index += ieOffset;
										}
										return parseInt(matrix[index], 10);
									}
									return 0;
								}
							}
						},
						easeCallback: function () {
							settings.element.style[cache.vendor + 'Transition'] = '';
							settings.elementMirror.style[cache.vendor + 'Transition'] = '';
							settings.elementMirror2.style[cache.vendor + 'Transition'] = '';
							cache.translation = action.translate.get.matrix(4);
							cache.easing = false;
							clearInterval(cache.animatingInterval);

							if (cache.easingTo === 0) {
								utils.klass.remove(doc.body, 'snapjs-right');
								utils.klass.remove(doc.body, 'snapjs-left');
								$('.menu-item-index').show('slow');
							}

							utils.dispatchEvent('animated');
							utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
						},
						easeTo: function (n) {

							if (!utils.canTransform()) {
								cache.translation = n;
								action.translate.x(n);
							} else {
								cache.easing = true;
								cache.easingTo = n;

								settings.element.style[cache.vendor + 'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;
								settings.elementMirror.style[cache.vendor + 'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;
								settings.elementMirror2.style[cache.vendor + 'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

								cache.animatingInterval = setInterval(function () {
									utils.dispatchEvent('animating');
								}, 1);

								utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
								action.translate.x(n);
							}
							if (n === 0) {
								settings.element.style[cache.vendor + 'Transform'] = '';
								settings.elementMirror.style[cache.vendor + 'Transform'] = '';
								settings.elementMirror2.style[cache.vendor + 'Transform'] = '';
							}
						},
						x: function (n) {
							if ((settings.disable === 'left' && n > 0) ||
								(settings.disable === 'right' && n < 0)
							) {
								return;
							}

							if (!settings.hyperextensible) {
								if (n === settings.maxPosition || n > settings.maxPosition) {
									n = settings.maxPosition;
								} else if (n === settings.minPosition || n < settings.minPosition) {
									n = settings.minPosition;
								}
							}

							n = parseInt(n, 10);
							if (isNaN(n)) {
								n = 0;
							}

							if (utils.canTransform()) {
								var theTranslate = 'translate3d(' + n + 'px, 0, 0)';
								settings.element.style[cache.vendor + 'Transform'] = theTranslate;
								settings.elementMirror.style[cache.vendor + 'Transform'] = theTranslate;
								settings.elementMirror2.style[cache.vendor + 'Transform'] = theTranslate;
							} else {
								settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth) + 'px';
								settings.elementMirror.style.width = (win.innerWidth || doc.documentElement.clientWidth) + 'px';
								settings.elementMirror2.style.width = (win.innerWidth || doc.documentElement.clientWidth) + 'px';

								settings.element.style.left = n + 'px';
								settings.elementMirror.style.left = n + 'px';
								settings.elementMirror2.style.left = n + 'px';

								settings.element.style.right = '';
								settings.elementMirror.style.right = '';
								settings.elementMirror2.style.right = '';
							}
						}
					},
					drag: {
						listen: function () {
							cache.translation = 0;
							cache.easing = false;
							utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
							utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
							utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
						},
						stopListening: function () {
							utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
							utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
							utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
						},
						startDrag: function (e) {
							// No drag on ignored elements
							var target = e.target ? e.target : e.srcElement,
								ignoreParent = utils.parentUntil(target, 'data-snap-ignore');

							if (ignoreParent) {
								utils.dispatchEvent('ignore');
								return;
							}


							if (settings.dragger) {
								var dragParent = utils.parentUntil(target, settings.dragger);

								// Only use dragger if we're in a closed state
								if (!dragParent &&
									(cache.translation !== settings.minPosition &&
										cache.translation !== settings.maxPosition
									)) {
									return;
								}
							}

							utils.dispatchEvent('start');
							settings.element.style[cache.vendor + 'Transition'] = '';
							settings.elementMirror.style[cache.vendor + 'Transition'] = '';
							settings.elementMirror2.style[cache.vendor + 'Transition'] = '';
							cache.isDragging = true;
							cache.hasIntent = null;
							cache.intentChecked = false;
							cache.startDragX = utils.page('X', e);
							cache.startDragY = utils.page('Y', e);
							cache.dragWatchers = {
								current: 0,
								last: 0,
								hold: 0,
								state: ''
							};
							cache.simpleStates = {
								opening: null,
								towards: null,
								hyperExtending: null,
								halfway: null,
								flick: null,
								translation: {
									absolute: 0,
									relative: 0,
									sinceDirectionChange: 0,
									percentage: 0
								}
							};
						},
						dragging: function (e) {
							if (cache.isDragging && settings.touchToDrag) {

								var thePageX = utils.page('X', e),
									thePageY = utils.page('Y', e),
									translated = cache.translation,
									absoluteTranslation = action.translate.get.matrix(4),
									whileDragX = thePageX - cache.startDragX,
									openingLeft = absoluteTranslation > 0,
									translateTo = whileDragX,
									diff;

								// Shown no intent already
								if ((cache.intentChecked && !cache.hasIntent)) {
									return;
								}

								if (settings.addBodyClasses) {
									if ((absoluteTranslation) > 0) {
										utils.klass.add(doc.body, 'snapjs-left');
										utils.klass.remove(doc.body, 'snapjs-right');
									} else if ((absoluteTranslation) < 0) {
										utils.klass.add(doc.body, 'snapjs-right');
										utils.klass.remove(doc.body, 'snapjs-left');
										$('.menu-item-index').show('slow');
									}
								}

								if (cache.hasIntent === false || cache.hasIntent === null) {
									var deg = utils.angleOfDrag(thePageX, thePageY),
										inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
										inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
									if (!inLeftRange && !inRightRange) {
										cache.hasIntent = false;
									} else {
										cache.hasIntent = true;
									}
									cache.intentChecked = true;
								}

								if (
									(settings.minDragDistance >= Math.abs(thePageX - cache.startDragX)) || // Has user met minimum drag distance?
									(cache.hasIntent === false)
								) {
									return;
								}

								utils.events.prevent(e);
								utils.dispatchEvent('drag');

								cache.dragWatchers.current = thePageX;
								// Determine which direction we are going
								if (cache.dragWatchers.last > thePageX) {
									if (cache.dragWatchers.state !== 'left') {
										cache.dragWatchers.state = 'left';
										cache.dragWatchers.hold = thePageX;
									}
									cache.dragWatchers.last = thePageX;
								} else if (cache.dragWatchers.last < thePageX) {
									if (cache.dragWatchers.state !== 'right') {
										cache.dragWatchers.state = 'right';
										cache.dragWatchers.hold = thePageX;
									}
									cache.dragWatchers.last = thePageX;
								}
								if (openingLeft) {
									// Pulling too far to the right
									if (settings.maxPosition < absoluteTranslation) {
										diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
										translateTo = whileDragX - diff;
									}
									cache.simpleStates = {
										opening: 'left',
										towards: cache.dragWatchers.state,
										hyperExtending: settings.maxPosition < absoluteTranslation,
										halfway: absoluteTranslation > (settings.maxPosition / 2),
										flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
										translation: {
											absolute: absoluteTranslation,
											relative: whileDragX,
											sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
											percentage: (absoluteTranslation / settings.maxPosition) * 100
										}
									};
								} else {
									// Pulling too far to the left
									if (settings.minPosition > absoluteTranslation) {
										diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
										translateTo = whileDragX - diff;
									}
									cache.simpleStates = {
										opening: 'right',
										towards: cache.dragWatchers.state,
										hyperExtending: settings.minPosition > absoluteTranslation,
										halfway: absoluteTranslation < (settings.minPosition / 2),
										flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
										translation: {
											absolute: absoluteTranslation,
											relative: whileDragX,
											sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
											percentage: (absoluteTranslation / settings.minPosition) * 100
										}
									};
								}
								action.translate.x(translateTo + translated);
							}
						},
						endDrag: function (e) {
							if (cache.isDragging) {
								utils.dispatchEvent('end');
								var translated = action.translate.get.matrix(4);

								// Tap Close
								if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
									utils.dispatchEvent('close');
									utils.events.prevent(e);
									action.translate.easeTo(0);
									cache.isDragging = false;
									cache.startDragX = 0;
									return;
								}

								// Revealing Left
								if (cache.simpleStates.opening === 'left') {
									// Halfway, Flicking, or Too Far Out
									if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
										if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
											action.translate.easeTo(0);
										} else if (
											(cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
											(cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
										) {
											action.translate.easeTo(settings.maxPosition); // Open Left
										}
									} else {
										action.translate.easeTo(0); // Close Left
									}
									// Revealing Right
								} else if (cache.simpleStates.opening === 'right') {
									// Halfway, Flicking, or Too Far Out
									if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
										if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
											action.translate.easeTo(0);
										} else if (
											(cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
											(cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
										) {
											action.translate.easeTo(settings.minPosition); // Open Right
										}
									} else {
										action.translate.easeTo(0); // Close Right
									}
								}
								cache.isDragging = false;
								cache.startDragX = utils.page('X', e);
							}
						}
					}
				},
				init = function (opts) {
					if (opts.element) {
						utils.deepExtend(settings, opts);
						cache.vendor = utils.vendor();
						action.drag.listen();
					}
				};
			/*
			 * Public
			 */
			this.open = function (side) {
				utils.dispatchEvent('open');
				utils.klass.remove(doc.body, 'snapjs-expand-left');
				utils.klass.remove(doc.body, 'snapjs-expand-right');

				if (side === 'left') {
					cache.simpleStates.opening = 'left';
					cache.simpleStates.towards = 'right';
					utils.klass.add(doc.body, 'snapjs-left');
					utils.klass.remove(doc.body, 'snapjs-right');
					action.translate.easeTo(settings.maxPosition);
				} else if (side === 'right') {
					cache.simpleStates.opening = 'right';
					cache.simpleStates.towards = 'left';
					utils.klass.remove(doc.body, 'snapjs-left');
					$('.menu-item-index').show('slow');
					utils.klass.add(doc.body, 'snapjs-right');
					action.translate.easeTo(settings.minPosition);
				}
			};
			this.close = function () {
				utils.dispatchEvent('close');
				action.translate.easeTo(0);
			};
			this.expand = function (side) {
				var to = win.innerWidth || doc.documentElement.clientWidth;

				if (side === 'left') {
					utils.dispatchEvent('expandLeft');
					utils.klass.add(doc.body, 'snapjs-expand-left');
					utils.klass.remove(doc.body, 'snapjs-expand-right');
				} else {
					utils.dispatchEvent('expandRight');
					utils.klass.add(doc.body, 'snapjs-expand-right');
					utils.klass.remove(doc.body, 'snapjs-expand-left');
					to *= -1;
				}
				action.translate.easeTo(to);
			};

			this.on = function (evt, fn) {
				eventList[evt] = fn;
				return this;
			};
			this.off = function (evt) {
				if (eventList[evt]) {
					eventList[evt] = false;
				}
			};

			this.enable = function () {
				utils.dispatchEvent('enable');
				action.drag.listen();
			};
			this.disable = function () {
				utils.dispatchEvent('disable');
				action.drag.stopListening();
			};

			this.settings = function (opts) {
				utils.deepExtend(settings, opts);
			};

			this.state = function () {
				var state,
					fromLeft = action.translate.get.matrix(4);
				if (fromLeft === settings.maxPosition) {
					state = 'left';
				} else if (fromLeft === settings.minPosition) {
					state = 'right';
				} else {
					state = 'closed';
				}
				return {
					state: state,
					info: cache.simpleStates
				};
			};
			init(userOpts);
		};
		if ((typeof module !== 'undefined') && module.exports) {
			module.exports = Snap;
		}
		if (typeof ender === 'undefined') {
			this.Snap = Snap;
		}
		if ((typeof define === "function") && define.amd) {
			define("snap", [], function () {
				return Snap;
			});
		}
	}).call(this, window, document);
}(jQuery)); // JavaScript Document

(function ($) {
	/*License MIT & GPL 3.0 Licenses.*/
	/* https://github.com/rendro/countdown */

	! function (t) {
		if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
		else if ("function" == typeof define && define.amd) define([], t);
		else {
			var e;
			"undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Countdown = t()
		}
	}(function () {
		return function t(e, i, n) {
			function s(r, a) {
				if (!i[r]) {
					if (!e[r]) {
						var d = "function" == typeof require && require;
						if (!a && d) return d(r, !0);
						if (o) return o(r, !0);
						var f = new Error("Cannot find module '" + r + "'");
						throw f.code = "MODULE_NOT_FOUND", f
					}
					var h = i[r] = {
						exports: {}
					};
					e[r][0].call(h.exports, function (t) {
						var i = e[r][1][t];
						return s(i ? i : t)
					}, h, h.exports, t, e, i, n)
				}
				return i[r].exports
			}
			for (var o = "function" == typeof require && require, r = 0; r < n.length; r++) s(n[r]);
			return s
		}({
			1: [function (t, e) {
				var i = {
					date: "June 7, 2087 15:03:25",
					refresh: 1e3,
					offset: 0,
					onEnd: function () { },
					render: function (t) {
						this.el.innerHTML = "<div class='date-years'>" + t.years + "<em>years</em> </div><div class='date-days'>" + t.days + "<em>days</em> </div><div class='date-hours'>" + this.leadingZeros(t.hours) + "<em>hours</em> </div><div class='date-minutes'>" + this.leadingZeros(t.min) + "<em>minutes</em> </div><div class='date-seconds'>" + this.leadingZeros(t.sec) + "<em>seconds</em> </div>"
					}
				},
					n = function (t, e) {
						this.el = t, this.options = {}, this.interval = !1;
						for (var n in i) i.hasOwnProperty(n) && (this.options[n] = "undefined" != typeof e[n] ? e[n] : i[n], "date" === n && "object" != typeof this.options.date && (this.options.date = new Date(this.options.date)), "function" == typeof this.options[n] && (this.options[n] = this.options[n].bind(this)));
						this.getDiffDate = function () {
							var t = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3,
								e = {
									years: 0,
									days: 0,
									hours: 0,
									min: 0,
									sec: 0,
									millisec: 0
								};
							return 0 >= t ? (this.interval && (this.stop(), this.options.onEnd()), e) : (t >= 31557600 && (e.years = Math.floor(t / 31557600), t -= 365.25 * e.years * 86400), t >= 86400 && (e.days = Math.floor(t / 86400), t -= 86400 * e.days), t >= 3600 && (e.hours = Math.floor(t / 3600), t -= 3600 * e.hours), t >= 60 && (e.min = Math.floor(t / 60), t -= 60 * e.min), e.sec = Math.round(t), e.millisec = t % 1 * 1e3, e)
						}.bind(this), this.leadingZeros = function (t, e) {
							return e = e || 2, t = String(t), t.length > e ? t : (Array(e + 1).join("0") + t).substr(-e)
						}, this.update = function (t) {
							return "object" != typeof t && (t = new Date(t)), this.options.date = t, this.render(), this
						}.bind(this), this.stop = function () {
							return this.interval && (clearInterval(this.interval), this.interval = !1), this
						}.bind(this), this.render = function () {
							return this.options.render(this.getDiffDate()), this
						}.bind(this), this.start = function () {
							return this.interval ? void 0 : (this.render(), this.options.refresh && (this.interval = setInterval(this.render, this.options.refresh)), this)
						}.bind(this), this.updateOffset = function (t) {
							return this.options.offset = t, this
						}.bind(this), this.start()
					};
				e.exports = n
			}, {}],
			2: [function (t, e) {
				var i = t("./countdown.js"),
					n = "countdown",
					s = "date";
				jQuery.fn.countdown = function (t) {
					return $.each(this, function (e, o) {
						var r = $(o);
						r.data(n) || (r.data(s) && (t.date = r.data(s)), r.data(n, new i(o, t)))
					})
				}, e.exports = i
			}, {
				"./countdown.js": 1
			}]
		}, {}, [2])(2)
	});
}(jQuery));


(function ($) {
	/*
	 * SimpleModal 1.4.4 - jQuery Plugin
	 * http://simplemodal.com/
	 * Copyright (c) 2013 Eric Martin
	 * Licensed under MIT and GPL
	 * Date: Sun, Jan 20 2013 15:58:56 -0800
	 */
	(function (b) {
		"function" === typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
	})(function (b) {
		var j = [],
			n = b(document),
			k = navigator.userAgent.toLowerCase(),
			l = b(window),
			g = [],
			o = null,
			p = /msie/.test(k) && !/opera/.test(k),
			q = /opera/.test(k),
			m, r;
		m = p && /msie 6./.test(k) && "object" !== typeof window.XMLHttpRequest;
		r = p && /msie 7.0/.test(k);
		b.modal = function (a, h) {
			return b.modal.impl.init(a, h)
		};
		b.modal.close = function () {
			b.modal.impl.close()
		};
		b.modal.focus = function (a) {
			b.modal.impl.focus(a)
		};
		b.modal.setContainerDimensions =
			function () {
				b.modal.impl.setContainerDimensions()
			};
		b.modal.setPosition = function () {
			b.modal.impl.setPosition()
		};
		b.modal.update = function (a, h) {
			b.modal.impl.update(a, h)
		};
		b.fn.modal = function (a) {
			return b.modal.impl.init(this, a)
		};
		b.modal.defaults = {
			appendTo: "body",
			focus: !1,
			opacity: 80,
			overlayId: "simplemodal-overlay",
			overlayCss: {},
			containerId: "simplemodal-container",
			containerCss: {},
			dataId: "simplemodal-data",
			dataCss: {},
			minHeight: null,
			minWidth: null,
			maxHeight: null,
			maxWidth: null,
			autoResize: !0,
			autoPosition: !0,
			zIndex: 99999,
			close: !0,
			closeHTML: '<a class="modalCloseImg" title="Close"></a>',
			closeClass: "modal-close",
			escClose: !0,
			overlayClose: !0,
			fixed: !0,
			position: null,
			persist: !1,
			modal: !0,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn(150);
				dialog.data.fadeOut(250);
				dialog.container.fadeIn(250);
				dialog.data.fadeIn(250);
			},
			onShow: null,
			onClose: function (dialog) {
				dialog.overlay.fadeOut(500);
				dialog.data.fadeOut(250);
				dialog.container.fadeOut(250);
				dialog.data.fadeOut('250', function () {
					setTimeout(function () {
						$.modal.close();
					}, 250);
				});
			}
		};
		b.modal.impl = {
			d: {},
			init: function (a, h) {
				if (this.d.data) return !1;
				o = p && !b.support.boxModel;
				this.o = b.extend({}, b.modal.defaults, h);
				this.zIndex = this.o.zIndex;
				this.occb = !1;
				if ("object" === typeof a) {
					if (a = a instanceof b ? a : b(a), this.d.placeholder = !1, 0 < a.parent().parent().size() && (a.before(b("<span></span>").attr("id",
						"simplemodal-placeholder").css({
							display: "none"
						})), this.d.placeholder = !0, this.display = a.css("display"), !this.o.persist)) this.d.orig = a.clone(!0)
				} else if ("string" === typeof a || "number" === typeof a) a = b("<div></div>").html(a);
				else return alert("SimpleModal Error: Unsupported data type: " + typeof a), this;
				this.create(a);
				this.open();
				b.isFunction(this.o.onShow) && this.o.onShow.apply(this, [this.d]);
				return this
			},
			create: function (a) {
				this.getDimensions();
				if (this.o.modal && m) this.d.iframe = b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss, {
					display: "none",
					opacity: 0,
					position: "fixed",
					height: g[0],
					width: g[1],
					zIndex: this.o.zIndex,
					top: 0,
					left: 0
				})).appendTo(this.o.appendTo);
				this.d.overlay = b("<div></div>").attr("id", this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss, {
					display: "none",
					opacity: this.o.opacity / 100,
					height: this.o.modal ? j[0] : 0,
					width: this.o.modal ? j[1] : 0,
					position: "fixed",
					left: 0,
					top: 0,
					zIndex: this.o.zIndex + 1
				})).appendTo(this.o.appendTo);
				this.d.container = b("<div></div>").attr("id", this.o.containerId).addClass("simplemodal-container").css(b.extend({
					position: this.o.fixed ?
						"fixed" : "absolute"
				}, this.o.containerCss, {
					display: "none",
					zIndex: this.o.zIndex + 2
				})).append(this.o.close && this.o.closeHTML ? b(this.o.closeHTML).addClass(this.o.closeClass) : "").appendTo(this.o.appendTo);
				this.d.wrap = b("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
					height: "100%",
					outline: 0,
					width: "100%"
				}).appendTo(this.d.container);
				this.d.data = a.attr("id", a.attr("id") || this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss, {
					display: "none"
				})).appendTo("body");
				this.setContainerDimensions();
				this.d.data.appendTo(this.d.wrap);
				(m || o) && this.fixIE()
			},
			bindEvents: function () {
				var a = this;
				b("." + a.o.closeClass).bind("click.simplemodal", function (b) {
					b.preventDefault();
					a.close()
				});
				a.o.modal && a.o.close && a.o.overlayClose && a.d.overlay.bind("click.simplemodal", function (b) {
					b.preventDefault();
					a.close()
				});
				n.bind("keydown.simplemodal", function (b) {
					a.o.modal && 9 === b.keyCode ? a.watchTab(b) : a.o.close && a.o.escClose && 27 === b.keyCode && (b.preventDefault(), a.close())
				});
				l.bind("resize.simplemodal orientationchange.simplemodal",
					function () {
						a.getDimensions();
						a.o.autoResize ? a.setContainerDimensions() : a.o.autoPosition && a.setPosition();
						m || o ? a.fixIE() : a.o.modal && (a.d.iframe && a.d.iframe.css({
							height: g[0],
							width: g[1]
						}), a.d.overlay.css({
							height: j[0],
							width: j[1]
						}))
					})
			},
			unbindEvents: function () {
				b("." + this.o.closeClass).unbind("click.simplemodal");
				n.unbind("keydown.simplemodal");
				l.unbind(".simplemodal");
				this.d.overlay.unbind("click.simplemodal")
			},
			fixIE: function () {
				var a = this.o.position;
				b.each([this.d.iframe || null, !this.o.modal ? null : this.d.overlay,
				"fixed" === this.d.container.css("position") ? this.d.container : null
				], function (b, e) {
					if (e) {
						var f = e[0].style;
						f.position = "absolute";
						if (2 > b) f.removeExpression("height"), f.removeExpression("width"), f.setExpression("height", 'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'), f.setExpression("width", 'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');
						else {
							var c, d;
							a && a.constructor ===
								Array ? (c = a[0] ? "number" === typeof a[0] ? a[0].toString() : a[0].replace(/px/, "") : e.css("top").replace(/px/, ""), c = -1 === c.indexOf("%") ? c + ' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"' : parseInt(c.replace(/%/, "")) + ' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"', a[1] && (d = "number" === typeof a[1] ?
									a[1].toString() : a[1].replace(/px/, ""), d = -1 === d.indexOf("%") ? d + ' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"' : parseInt(d.replace(/%/, "")) + ' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')) : (c = '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
										d = '(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');
							f.removeExpression("top");
							f.removeExpression("left");
							f.setExpression("top", c);
							f.setExpression("left", d)
						}
					}
				})
			},
			focus: function (a) {
				var h = this,
					a = a && -1 !== b.inArray(a, ["first", "last"]) ? a : "first",
					e = b(":input:enabled:visible:" + a, h.d.wrap);
				setTimeout(function () {
					0 < e.length ? e.focus() : h.d.wrap.focus()
				},
					10)
			},
			getDimensions: function () {
				var a = "undefined" === typeof window.innerHeight ? l.height() : window.innerHeight;
				j = [n.height(), n.width()];
				g = [a, l.width()]
			},
			getVal: function (a, b) {
				return a ? "number" === typeof a ? a : "auto" === a ? 0 : 0 < a.indexOf("%") ? parseInt(a.replace(/%/, "")) / 100 * ("h" === b ? g[0] : g[1]) : parseInt(a.replace(/px/, "")) : null
			},
			update: function (a, b) {
				if (!this.d.data) return !1;
				this.d.origHeight = this.getVal(a, "h");
				this.d.origWidth = this.getVal(b, "w");
				this.d.data.hide();
				a && this.d.container.css("height", a);
				b && this.d.container.css("width",
					b);
				this.setContainerDimensions();
				this.d.data.show();
				this.o.focus && this.focus();
				this.unbindEvents();
				this.bindEvents()
			},
			setContainerDimensions: function () {
				var a = m || r,
					b = this.d.origHeight ? this.d.origHeight : q ? this.d.container.height() : this.getVal(a ? this.d.container[0].currentStyle.height : this.d.container.css("height"), "h"),
					a = this.d.origWidth ? this.d.origWidth : q ? this.d.container.width() : this.getVal(a ? this.d.container[0].currentStyle.width : this.d.container.css("width"), "w"),
					e = this.d.data.outerHeight(!0),
					f =
						this.d.data.outerWidth(!0);
				this.d.origHeight = this.d.origHeight || b;
				this.d.origWidth = this.d.origWidth || a;
				var c = this.o.maxHeight ? this.getVal(this.o.maxHeight, "h") : null,
					d = this.o.maxWidth ? this.getVal(this.o.maxWidth, "w") : null,
					c = c && c < g[0] ? c : g[0],
					d = d && d < g[1] ? d : g[1],
					i = this.o.minHeight ? this.getVal(this.o.minHeight, "h") : "auto",
					b = b ? this.o.autoResize && b > c ? c : b < i ? i : b : e ? e > c ? c : this.o.minHeight && "auto" !== i && e < i ? i : e : i,
					c = this.o.minWidth ? this.getVal(this.o.minWidth, "w") : "auto",
					a = a ? this.o.autoResize && a > d ? d : a < c ? c : a : f ?
						f > d ? d : this.o.minWidth && "auto" !== c && f < c ? c : f : c;
				this.d.container.css({
					height: b,
					width: a
				});
				this.d.wrap.css({
					overflow: e > b || f > a ? "auto" : "visible"
				});
				this.o.autoPosition && this.setPosition()
			},
			setPosition: function () {
				var a, b;
				a = g[0] / 2 - this.d.container.outerHeight(!0) / 2;
				b = g[1] / 2 - this.d.container.outerWidth(!0) / 2;
				var e = "fixed" !== this.d.container.css("position") ? l.scrollTop() : 0;
				this.o.position && "[object Array]" === Object.prototype.toString.call(this.o.position) ? (a = e + (this.o.position[0] || a), b = this.o.position[1] || b) :
					a = e + a;
				this.d.container.css({
					left: b,
					top: a
				})
			},
			watchTab: function (a) {
				if (0 < b(a.target).parents(".simplemodal-container").length) {
					if (this.inputs = b(":input:enabled:visible:first, :input:enabled:visible:last", this.d.data[0]), !a.shiftKey && a.target === this.inputs[this.inputs.length - 1] || a.shiftKey && a.target === this.inputs[0] || 0 === this.inputs.length) a.preventDefault(), this.focus(a.shiftKey ? "last" : "first")
				} else a.preventDefault(), this.focus()
			},
			open: function () {
				this.d.iframe && this.d.iframe.show();
				b.isFunction(this.o.onOpen) ?
					this.o.onOpen.apply(this, [this.d]) : (this.d.overlay.show(), this.d.container.show(), this.d.data.show());
				this.o.focus && this.focus();
				this.bindEvents()
			},
			close: function () {
				if (!this.d.data) return !1;
				this.unbindEvents();
				if (b.isFunction(this.o.onClose) && !this.occb) this.occb = !0, this.o.onClose.apply(this, [this.d]);
				else {
					if (this.d.placeholder) {
						var a = b("#simplemodal-placeholder");
						this.o.persist ? a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display", this.display)) : (this.d.data.hide().remove(), a.replaceWith(this.d.orig))
					} else this.d.data.hide().remove();
					this.d.container.hide().remove();
					this.d.overlay.hide();
					this.d.iframe && this.d.iframe.hide().remove();
					this.d.overlay.remove();
					this.d = {}
				}
			}
		}
	});

}(jQuery));


(function ($) {
	/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
	 * Licensed under the MIT License.
	 *
	 * jquery.mousewheel.min.js
	 * Version: 3.1.12
	 *
	 * Requires: jQuery 1.2.2+
	 */
	! function (a) {
		"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
	}(function (a) {
		function b(b) {
			var g = b || window.event,
				h = i.call(arguments, 1),
				j = 0,
				l = 0,
				m = 0,
				n = 0,
				o = 0,
				p = 0;
			if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
				if (1 === g.deltaMode) {
					var q = a.data(this, "mousewheel-line-height");
					j *= q, m *= q, l *= q
				} else if (2 === g.deltaMode) {
					var r = a.data(this, "mousewheel-page-height");
					j *= r, m *= r, l *= r
				}
				if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
					var s = this.getBoundingClientRect();
					o = b.clientX - s.left, p = b.clientY - s.top
				}
				return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
			}
		}

		function c() {
			f = null
		}

		function d(a, b) {
			return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
		}
		var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
			h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
			i = Array.prototype.slice;
		if (a.event.fixHooks)
			for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
		var k = a.event.special.mousewheel = {
			version: "3.1.12",
			setup: function () {
				if (this.addEventListener)
					for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
				else this.onmousewheel = b;
				a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
			},
			teardown: function () {
				if (this.removeEventListener)
					for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
				else this.onmousewheel = null;
				a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
			},
			getLineHeight: function (b) {
				var c = a(b),
					d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
				return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
			},
			getPageHeight: function (b) {
				return a(b).height()
			},
			settings: {
				adjustOldDeltas: !0,
				normalizeOffset: !0
			}
		};
		a.fn.extend({
			mousewheel: function (a) {
				return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
			},
			unmousewheel: function (a) {
				return this.unbind("mousewheel", a)
			}
		})
	});
}(jQuery));


(function ($) {
	/*!
	 * Justified Gallery - v3.6.0
	 * http://miromannino.github.io/Justified-Gallery/
	 * Copyright (c) 2015 Miro Mannino
	 * Licensed under the MIT license.
	 */
	! function (t) {
		var i = function (i, e) {
			this.settings = e, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
				entriesBuff: [],
				width: 0,
				aspectRatio: 0
			}, this.lastAnalyzedIndex = -1, this["yield"] = {
				every: 2,
				flushed: 0
			}, this.border = e.border >= 0 ? e.border : e.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.spinner = {
				phase: 0,
				timeSlot: 150,
				$el: t('<div class="spinner"><span></span><span></span><span></span></div>'),
				intervalId: null
			}, this.checkWidthIntervalId = null, this.galleryWidth = i.width(), this.$gallery = i
		};
		i.prototype.getSuffix = function (t, i) {
			var e, s;
			for (e = t > i ? t : i, s = 0; s < this.suffixRanges.length; s++)
				if (e <= this.suffixRanges[s]) return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];
			return this.settings.sizeRangeSuffixes[this.suffixRanges[s - 1]]
		}, i.prototype.removeSuffix = function (t, i) {
			return t.substring(0, t.length - i.length)
		}, i.prototype.endsWith = function (t, i) {
			return -1 !== t.indexOf(i, t.length - i.length)
		}, i.prototype.getUsedSuffix = function (t) {
			for (var i in this.settings.sizeRangeSuffixes)
				if (this.settings.sizeRangeSuffixes.hasOwnProperty(i)) {
					if (0 === this.settings.sizeRangeSuffixes[i].length) continue;
					if (this.endsWith(t, this.settings.sizeRangeSuffixes[i])) return this.settings.sizeRangeSuffixes[i]
				}
			return ""
		}, i.prototype.newSrc = function (t, i, e) {
			var s = t.match(this.settings.extension),
				n = null != s ? s[0] : "",
				r = t.replace(this.settings.extension, "");
			return r = this.removeSuffix(r, this.getUsedSuffix(r)), r += this.getSuffix(i, e) + n
		}, i.prototype.showImg = function (t, i) {
			this.settings.cssAnimation ? (t.addClass("entry-visible"), i && i()) : t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, i)
		}, i.prototype.extractImgSrcFromImage = function (t) {
			var i = "undefined" != typeof t.data("safe-src") ? t.data("safe-src") : t.attr("src");
			return t.data("jg.originalSrc", i), i
		}, i.prototype.imgFromEntry = function (t) {
			var i = t.find("> img");
			return 0 === i.length && (i = t.find("> a > img")), 0 === i.length ? null : i
		}, i.prototype.captionFromEntry = function (t) {
			var i = t.find("> .caption");
			return 0 === i.length ? null : i
		}, i.prototype.displayEntry = function (i, e, s, n, r, a) {
			i.width(n), i.height(a), i.css("top", s), i.css("left", e);
			var o = this.imgFromEntry(i);
			if (null !== o) {
				o.css("width", n), o.css("height", r), o.css("margin-left", -n / 2), o.css("margin-top", -r / 2);
				var h = o.attr("src"),
					g = this.newSrc(h, n, r);
				o.one("error", function () {
					o.attr("src", o.data("jg.originalSrc"))
				});
				var l = function () {
					h !== g && o.attr("src", g)
				};
				"skipped" === i.data("jg.loaded") ? this.onImageEvent(h, t.proxy(function () {
					this.showImg(i, l), i.data("jg.loaded", !0)
				}, this)) : this.showImg(i, l)
			} else this.showImg(i);
			this.displayEntryCaption(i)
		}, i.prototype.displayEntryCaption = function (i) {
			var e = this.imgFromEntry(i);
			if (null !== e && this.settings.captions) {
				var s = this.captionFromEntry(i);
				if (null == s) {
					var n = e.attr("alt");
					"undefined" == typeof n && (n = i.attr("title")), "undefined" != typeof n && (s = t('<div class="caption">' + n + "</div>"), i.append(s), i.data("jg.createdCaption", !0))
				}
				null !== s && (this.settings.cssAnimation || s.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(i))
			} else this.removeCaptionEventsHandlers(i)
		}, i.prototype.onEntryMouseEnterForCaption = function (i) {
			var e = this.captionFromEntry(t(i.currentTarget));
			this.settings.cssAnimation ? e.addClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
		}, i.prototype.onEntryMouseLeaveForCaption = function (i) {
			var e = this.captionFromEntry(t(i.currentTarget));
			this.settings.cssAnimation ? e.removeClass("caption-visible").removeClass("caption-hidden") : e.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
		}, i.prototype.addCaptionEventsHandlers = function (i) {
			var e = i.data("jg.captionMouseEvents");
			"undefined" == typeof e && (e = {
				mouseenter: t.proxy(this.onEntryMouseEnterForCaption, this),
				mouseleave: t.proxy(this.onEntryMouseLeaveForCaption, this)
			}, i.on("mouseenter", void 0, void 0, e.mouseenter), i.on("mouseleave", void 0, void 0, e.mouseleave), i.data("jg.captionMouseEvents", e))
		}, i.prototype.removeCaptionEventsHandlers = function (t) {
			var i = t.data("jg.captionMouseEvents");
			"undefined" != typeof i && (t.off("mouseenter", void 0, i.mouseenter), t.off("mouseleave", void 0, i.mouseleave), t.removeData("jg.captionMouseEvents"))
		}, i.prototype.prepareBuildingRow = function (t) {
			var i, e, s, n, r, a = !0,
				o = 0,
				h = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
				g = h / this.buildingRow.aspectRatio,
				l = this.buildingRow.width / h > this.settings.justifyThreshold;
			if (t && "hide" === this.settings.lastRow && !l) {
				for (i = 0; i < this.buildingRow.entriesBuff.length; i++) e = this.buildingRow.entriesBuff[i], this.settings.cssAnimation ? e.removeClass("entry-visible") : e.stop().fadeTo(0, 0);
				return -1
			}
			for (t && !l && "nojustify" === this.settings.lastRow && (a = !1), i = 0; i < this.buildingRow.entriesBuff.length; i++) e = this.buildingRow.entriesBuff[i], s = e.data("jg.width") / e.data("jg.height"), a ? (n = i === this.buildingRow.entriesBuff.length - 1 ? h : g * s, r = g) : (n = this.settings.rowHeight * s, r = this.settings.rowHeight), h -= Math.round(n), e.data("jg.jwidth", Math.round(n)), e.data("jg.jheight", Math.ceil(r)), (0 === i || o > r) && (o = r);
			return this.settings.fixedHeight && o > this.settings.rowHeight && (o = this.settings.rowHeight), {
				minHeight: o,
				justify: a
			}
		}, i.prototype.clearBuildingRow = function () {
			this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
		}, i.prototype.flushRow = function (t) {
			var i, e, s, n = this.settings,
				r = this.border;
			if (s = this.prepareBuildingRow(t), e = s.minHeight, t && "hide" === n.lastRow && -1 === e) return void this.clearBuildingRow();
			this.maxRowHeight.percentage ? this.maxRowHeight.value * n.rowHeight < e && (e = this.maxRowHeight.value * n.rowHeight) : this.maxRowHeight.value > 0 && this.maxRowHeight.value < e && (e = this.maxRowHeight.value);
			for (var a = 0; a < this.buildingRow.entriesBuff.length; a++) i = this.buildingRow.entriesBuff[a], this.displayEntry(i, r, this.offY, i.data("jg.jwidth"), i.data("jg.jheight"), e), r += i.data("jg.jwidth") + n.margins;
			this.$gallery.height(this.offY + e + this.border + (this.isSpinnerActive() ? this.getSpinnerHeight() : 0)), (!t || e <= this.settings.rowHeight && s.justify) && (this.offY += e + this.settings.margins, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
		}, i.prototype.checkWidth = function () {
			this.checkWidthIntervalId = setInterval(t.proxy(function () {
				var t = parseInt(this.$gallery.width(), 10);
				this.galleryWidth !== t && (this.galleryWidth = t, this.rewind(), this.startImgAnalyzer(!0))
			}, this), this.settings.refreshTime)
		}, i.prototype.isSpinnerActive = function () {
			return null != this.spinner.intervalId
		}, i.prototype.getSpinnerHeight = function () {
			return this.spinner.$el.innerHeight()
		}, i.prototype.stopLoadingSpinnerAnimation = function () {
			clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
		}, i.prototype.startLoadingSpinnerAnimation = function () {
			var t = this.spinner,
				i = t.$el.find("span");
			clearInterval(t.intervalId), this.$gallery.append(t.$el), this.$gallery.height(this.offY + this.getSpinnerHeight()), t.intervalId = setInterval(function () {
				t.phase < i.length ? i.eq(t.phase).fadeTo(t.timeSlot, 1) : i.eq(t.phase - i.length).fadeTo(t.timeSlot, 0), t.phase = (t.phase + 1) % (2 * i.length)
			}, t.timeSlot)
		}, i.prototype.rewind = function () {
			this.lastAnalyzedIndex = -1, this.offY = this.border, this.clearBuildingRow()
		}, i.prototype.hideBuildingRowImages = function () {
			for (var t = 0; t < this.buildingRow.entriesBuff.length; t++) this.settings.cssAnimation ? this.buildingRow.entriesBuff[t].removeClass("entry-visible") : this.buildingRow.entriesBuff[t].stop().fadeTo(0, 0)
		}, i.prototype.updateEntries = function (i) {
			return this.entries = this.$gallery.find(this.settings.selector).toArray(), 0 === this.entries.length ? !1 : (this.settings.filter ? this.modifyEntries(this.filterArray, i) : this.modifyEntries(this.resetFilters, i), t.isFunction(this.settings.sort) ? this.modifyEntries(this.sortArray, i) : this.settings.randomize && this.modifyEntries(this.shuffleArray, i), !0)
		}, i.prototype.insertToGallery = function (i) {
			var e = this;
			t.each(i, function () {
				t(this).appendTo(e.$gallery)
			})
		}, i.prototype.shuffleArray = function (t) {
			var i, e, s;
			for (i = t.length - 1; i > 0; i--) e = Math.floor(Math.random() * (i + 1)), s = t[i], t[i] = t[e], t[e] = s;
			return this.insertToGallery(t), t
		}, i.prototype.sortArray = function (t) {
			return t.sort(this.settings.sort), this.insertToGallery(t), t
		}, i.prototype.resetFilters = function (i) {
			for (var e = 0; e < i.length; e++) t(i[e]).removeClass("jg-filtered");
			return i
		}, i.prototype.filterArray = function (i) {
			var e = this.settings;
			return "string" === t.type(e.filter) ? i.filter(function (i) {
				var s = t(i);
				return s.is(e.filter) ? (s.removeClass("jg-filtered"), !0) : (s.addClass("jg-filtered"), !1)
			}) : t.isFunction(e.filter) ? i.filter(e.filter) : void 0
		}, i.prototype.modifyEntries = function (t, i) {
			var e = i ? this.entries.splice(this.lastAnalyzedIndex + 1, this.entries.length - this.lastAnalyzedIndex - 1) : this.entries;
			e = t.call(this, e), this.entries = i ? this.entries.concat(e) : e
		}, i.prototype.destroy = function () {
			clearInterval(this.checkWidthIntervalId), t.each(this.entries, t.proxy(function (i, e) {
				var s = t(e);
				s.css("width", ""), s.css("height", ""), s.css("top", ""), s.css("left", ""), s.data("jg.loaded", void 0), s.removeClass("jg-entry");
				var n = this.imgFromEntry(s);
				n.css("width", ""), n.css("height", ""), n.css("margin-left", ""), n.css("margin-top", ""), n.attr("src", n.data("jg.originalSrc")), n.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(s);
				var r = this.captionFromEntry(s);
				s.data("jg.createdCaption") ? (s.data("jg.createdCaption", void 0), null != r && r.remove()) : null != r && r.fadeTo(0, 1)
			}, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
		}, i.prototype.analyzeImages = function (i) {
			for (var e = this.lastAnalyzedIndex + 1; e < this.entries.length; e++) {
				var s = t(this.entries[e]);
				if (s.data("jg.loaded") === !0 || "skipped" === s.data("jg.loaded")) {
					var n = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
						r = s.data("jg.width") / s.data("jg.height");
					if (n / (this.buildingRow.aspectRatio + r) < this.settings.rowHeight && (this.flushRow(!1), ++this["yield"].flushed >= this["yield"].every)) return void this.startImgAnalyzer(i);
					this.buildingRow.entriesBuff.push(s), this.buildingRow.aspectRatio += r, this.buildingRow.width += r * this.settings.rowHeight, this.lastAnalyzedIndex = e
				} else if ("error" !== s.data("jg.loaded")) return
			}
			this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(i ? "jg.resize" : "jg.complete")
		}, i.prototype.stopImgAnalyzerStarter = function () {
			this["yield"].flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
		}, i.prototype.startImgAnalyzer = function (t) {
			var i = this;
			this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function () {
				i.analyzeImages(t)
			}, .001)
		}, i.prototype.onImageEvent = function (i, e, s) {
			if (e || s) {
				var n = new Image,
					r = t(n);
				e && r.one("load", function () {
					r.off("load error"), e(n)
				}), s && r.one("error", function () {
					r.off("load error"), s(n)
				}), n.src = i
			}
		}, i.prototype.init = function () {
			var i = !1,
				e = !1,
				s = this;
			t.each(this.entries, function (n, r) {
				var a = t(r),
					o = s.imgFromEntry(a);
				if (a.addClass("jg-entry"), a.data("jg.loaded") !== !0 && "skipped" !== a.data("jg.loaded"))
					if (null !== s.settings.rel && a.attr("rel", s.settings.rel), null !== s.settings.target && a.attr("target", s.settings.target), null !== o) {
						var h = s.extractImgSrcFromImage(o);
						if (o.attr("src", h), s.settings.waitThumbnailsLoad === !1) {
							var g = parseInt(o.attr("width"), 10),
								l = parseInt(o.attr("height"), 10);
							if (!isNaN(g) && !isNaN(l)) return a.data("jg.width", g), a.data("jg.height", l), a.data("jg.loaded", "skipped"), e = !0, s.startImgAnalyzer(!1), !0
						}
						a.data("jg.loaded", !1), i = !0, s.isSpinnerActive() || s.startLoadingSpinnerAnimation(), s.onImageEvent(h, function (t) {
							a.data("jg.width", t.width), a.data("jg.height", t.height), a.data("jg.loaded", !0), s.startImgAnalyzer(!1)
						}, function () {
							a.data("jg.loaded", "error"), s.startImgAnalyzer(!1)
						})
					} else a.data("jg.loaded", !0), a.data("jg.width", a.width() | a.css("width") | 1), a.data("jg.height", a.height() | a.css("height") | 1)
			}), i || e || this.startImgAnalyzer(!1), this.checkWidth()
		}, i.prototype.checkOrConvertNumber = function (i, e) {
			if ("string" === t.type(i[e]) && (i[e] = parseFloat(i[e])), "number" !== t.type(i[e])) throw e + " must be a number";
			if (isNaN(i[e])) throw "invalid number for " + e
		}, i.prototype.checkSizeRangesSuffixes = function () {
			if ("object" !== t.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
			var i = [];
			for (var e in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(e) && i.push(e);
			for (var s = {
				0: ""
			}, n = 0; n < i.length; n++)
				if ("string" === t.type(i[n])) try {
					var r = parseInt(i[n].replace(/^[a-z]+/, ""), 10);
					s[r] = this.settings.sizeRangeSuffixes[i[n]]
				} catch (a) {
					throw "sizeRangeSuffixes keys must contains correct numbers (" + a + ")"
				} else s[i[n]] = this.settings.sizeRangeSuffixes[i[n]];
			this.settings.sizeRangeSuffixes = s
		}, i.prototype.retrieveMaxRowHeight = function () {
			var i = {};
			if ("string" === t.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (i.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9])+%$/)[1]) / 100, i.percentage = !1) : (i.value = parseFloat(this.settings.maxRowHeight), i.percentage = !0);
			else {
				if ("number" !== t.type(this.settings.maxRowHeight)) throw "maxRowHeight must be a number or a percentage";
				i.value = this.settings.maxRowHeight, i.percentage = !1
			}
			if (isNaN(i.value)) throw "invalid number for maxRowHeight";
			return i.percentage ? i.value < 100 && (i.value = 100) : i.value > 0 && i.value < this.settings.rowHeight && (i.value = this.settings.rowHeight), i
		}, i.prototype.checkSettings = function () {
			if (this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border"), "nojustify" !== this.settings.lastRow && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow) throw 'lastRow must be "nojustify", "justify" or "hide"';
			if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
			if ("boolean" !== t.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
			if ("boolean" !== t.type(this.settings.captions)) throw "captions must be a boolean";
			if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
			if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
			if ("boolean" !== t.type(this.settings.fixedHeight)) throw "fixedHeight must be a boolean";
			if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), "boolean" !== t.type(this.settings.randomize)) throw "randomize must be a boolean";
			if ("string" !== t.type(this.settings.selector)) throw "selector must be a string";
			if (this.settings.sort !== !1 && !t.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
			if (this.settings.filter !== !1 && !t.isFunction(this.settings.sort) && "string" !== t.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
		}, i.prototype.retrieveSuffixRanges = function () {
			var t = [];
			for (var i in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(i) && t.push(parseInt(i, 10));
			return t.sort(function (t, i) {
				return t > i ? 1 : i > t ? -1 : 0
			}), t
		}, i.prototype.updateSettings = function (i) {
			this.settings = t.extend({}, this.settings, i), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
		}, t.fn.justifiedGallery = function (e) {
			return this.each(function (s, n) {
				var r = t(n);
				r.addClass("justified-gallery");
				var a = r.data("jg.controller");
				if ("undefined" == typeof a) {
					if ("undefined" != typeof e && null !== e && "object" !== t.type(e)) throw "The argument must be an object";
					a = new i(r, t.extend({}, t.fn.justifiedGallery.defaults, e)), r.data("jg.controller", a)
				} else if ("norewind" === e) a.hideBuildingRowImages();
				else {
					if ("destroy" === e) return void a.destroy();
					a.updateSettings(e), a.rewind()
				}
				a.updateEntries("norewind" === e) && a.init()
			})
		}, t.fn.justifiedGallery.defaults = {
			sizeRangeSuffixes: {},
			rowHeight: 120,
			maxRowHeight: "200%",
			margins: 1,
			border: -1,
			lastRow: "nojustify",
			justifyThreshold: .75,
			fixedHeight: !1,
			waitThumbnailsLoad: !0,
			captions: !1,
			cssAnimation: !1,
			imagesAnimationDuration: 500,
			captionSettings: {
				animationDuration: 500,
				visibleOpacity: .7,
				nonVisibleOpacity: 0
			},
			rel: null,
			target: null,
			extension: /\.[^.\\/]+$/,
			refreshTime: 100,
			randomize: !1,
			sort: !1,
			filter: !1,
			selector: "> a, > div:not(.spinner)"
		}
	}(jQuery);

}(jQuery));

/*
 *jQuery Contact form developed by CosminCotor & Enabled
 *Licensed to be used ONLY by CosminCotor & Enabled on the Envato Marketplaces
 *DO NOT use in commercial projects outside Regular or Extended licenses for the marketplaces.
 */

(function ($) {
	var formSubmitted = "false";
	jQuery(document).ready(function (e) {
		function t(t, n) {
			formSubmitted = "true";
			var r = e("#" + t).serialize();
			e.support.cors = true;
			e.post(e("#" + t).attr("action"), r, function (n) {
				console.log(n);
				if (n.success) {
					e("#" + t).hide();
					e("#formSuccessMessageWrap").fadeIn(500)
				} else {
					e("#ajaxError").html(n.data).fadeIn(300);
				}
			})
		}

		function n(n, r) {
			e(".formValidationError").hide();
			e(".fieldHasError").removeClass("fieldHasError");
			e("#" + n + " .requiredField").each(function (i) {
				if (e(this).val() == "" || e(this).val() == e(this).attr("data-dummy")) {
					e(this).val(e(this).attr("data-dummy"));
					e(this).focus();
					e(this).addClass("fieldHasError");
					e("#" + e(this).attr("id") + "Error").fadeIn(300);
					return false
				}
				if (e(this).hasClass("requiredEmailField")) {
					var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					var o = "#" + e(this).attr("id");
					if (!s.test(e(o).val())) {
						e(o).focus();
						e(o).addClass("fieldHasError");
						e(o + "Error2").fadeIn(300);
						return false
					}
				}
				if (formSubmitted == "false" && i == e("#" + n + " .requiredField").length - 1) {
					t(n, r)
				}
			})
		}
		e("#formSuccessMessageWrap").hide(0);
		e(".formValidationError").fadeOut(0);
		e('input[type="text"], input[type="password"], textarea').focus(function () {
			if (e(this).val() == e(this).attr("data-dummy")) {
				e(this).val("")
			}
		});
		e("input, textarea").blur(function () {
			if (e(this).val() == "") {
				e(this).val(e(this).attr("data-dummy"))
			}
		});
		e("#contactSubmitButton").click(function () {
			n(e(this).attr("data-formId"));
			return false
		})
	})
}(jQuery));
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();$(document).ready(function () {
	var dataSearch = JSON.parse('[{"nome":"Ajowan","slug":"ajowan","conteudo":"Potencial antimicrobiano e antiparasit\u00e1rio coadjuvante no combate a bact\u00e9rias, fungos e v\u00edrus Popularmente usado nos cuidados no combate a verminoses Auxilia a digest\u00e3o Alivia os sintomas da congest\u00e3o respirat\u00f3ria e digestiva como rinite, bronquite, sinusite, n\u00e1usea e diarreia \u00d3leo essencial do guerreiro Aroma intenso, antidepressivo e t\u00f4nico energ\u00e9tico. Restaura a for\u00e7a interior e a vontade de viver \u00datil em momentos de extremo desgaste emocional ou f\u00edsico Coadjuvante no tratamento de combate a micose de unhas ","categoria":"\u00d3leo essencial"},{"nome":"Alecrim","slug":"hidrolato-de-alecrim","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Alecrim estimula a energia vital mental e corporal, promove a mem\u00f3ria, a concentra\u00e7\u00e3o, incentivando o foco e criatividade. Reduz o cansa\u00e7o mental e a exaust\u00e3o f\u00edsica. Pode auxiliar o desconforto respirat\u00f3rio e ser aplicada no corpo para refrescar e apaziguar o calor e a sensa\u00e7\u00e3o de queimadura da pele ap\u00f3s exposi\u00e7\u00e3o solar. Resgata a apar\u00eancia vital e saud\u00e1vel da pele. Pode tamb\u00e9m ser usado para fortalecer cabelos enfraquecidos com tend\u00eancia a queda. Usado em peles mistas e oleosas com tend\u00eancia ao aparecimento de acne. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Alecrim do Cerrado","slug":"hidrolato-de-alecrim-do-cerrado","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O hidrolato de Alecrim do Cerrado \u00e9 altamente perfumado, com aroma adocicado que lembra o mel. Acalma a dor de cabe\u00e7a, como tamb\u00e9m descongestionar as vias respirat\u00f3rias, principalmente de crian\u00e7as e idosos. Tem a\u00e7\u00e3o ansiol\u00edtica devido a seu poder estimulante da autoconfian\u00e7a, bem como um est\u00edmulo para a agilidade mental e a capacidade de concentra\u00e7\u00e3o. Pode ser utilizado para fazer bochechos acalmando aftas e inflama\u00e7\u00f5es na gengiva, por suas propriedades antiss\u00e9pticas, tamb\u00e9m \u00e9 utilizado para recuperar o paladar. Usado em compressas e emplastros com argila amarela alivia dores reum\u00e1ticas, mialgias e dores musculares no geral. Esse hidrolato poder\u00e1 ser muito \u00fatil usado em inala\u00e7\u00f5es para recuperar a vitalidade e o bom funcionamento das vias respirat\u00f3rias.\u00a0 Use o encanto do aroma deste hidrolato para enriquecer suas formula\u00e7\u00f5es cosm\u00e9ticas artesanais.","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Alecrim Pimenta","slug":"alecrim-pimenta","conteudo":"Tem a\u00e7\u00e3o adstringente pulmonar e epitelial \u00d3leo essencial revitalizante Repele energias intrusas. Resgata a vitalidade, revigorar os sentimentos de for\u00e7a, \u00e2nimo e cren\u00e7as positivas em nosso potencial criativo e realizador. Potencial antiss\u00e9ptico, excelente op\u00e7\u00e3o para ser adicionado \u00e0 lo\u00e7\u00f5es e cremes para hidrata\u00e7\u00e3o das m\u00e3os Para manter as m\u00e3os limpas voc\u00ea poder\u00e1 aromatizar seu sabonete l\u00edquido com algumas gotas deste OE Pode ser usado para aromatizar \u00e1lcool gel 700 aumentando o potencial antiss\u00e9ptico Poder\u00e1 ser adicionado ao \u00e1lcool 700 em sprays para limpeza da casa \u00datil adicionado ao gel de aloe vera para os cuidados da pele acneica Coadjuvante adicionado ao shampoo neutro para acalmar a oleosidade do couro cabeludo ","categoria":"\u00d3leo essencial"},{"nome":"Alecrim qt. c\u00e2nfora","slug":"alecrim-qt-canfora","conteudo":"Potencial anti-inflamat\u00f3rio \u00datil em cuidados em contraturas musculares, c\u00e3imbras de idosos e adultos, torcicolo, entorse, luxa\u00e7\u00e3o, mialgia e dor localizada por esfor\u00e7o esportivo Potencial hipertensor \u00d3leo essencial do atleta Aroma herbal, adstringente, energ\u00e9tico. Favorece a concentra\u00e7\u00e3o Auxilia o fluir do movimento antes e ap\u00f3s atividade f\u00edsica Auxilia no controle da oleosidade da pele e cabelos \u00datil nos cuidados da pele acneica Coadjuvante em tratamentos nos cuidados da caspa e queda de cabelos \u00datil para hidratar a pele com varizes e flebite ","categoria":"\u00d3leo essencial"},{"nome":"Alecrim qt. cineol","slug":"alecrim-qt-cineol","conteudo":"Potencial digestivo, atenua dor de cabe\u00e7a e enxaqueca Ameniza dor muscular e articular Coadjuvante na expectora\u00e7\u00e3o do muco Ameniza dor de hemorroidas Estimula a circula\u00e7\u00e3o dos l\u00edquidos corporais \u00d3leo essencial do estudante Aroma herbal, adstringente e energ\u00e9tico. Fortalece o sistema nervoso, estimula a mem\u00f3ria e a concentra\u00e7\u00e3o Revigora, reduz a letargia mental e o cansa\u00e7o f\u00edsico. Prepara a mente e o corpo para iniciar o dia com disposi\u00e7\u00e3o e alegria Anima, alivia a tristeza da mente depressiva Coadjuvante no combate a sarna e piolho Adstringente, protege e hidrata a pele nos cuidados p\u00f3s-barba e p\u00f3s-depilat\u00f3rio Auxilia na redu\u00e7\u00e3o a oleosidade da pele e cabelos \u00datil nos cuidados da pele acneica Coadjuvante em tratamentos no combate a caspa e queda de cabelos ","categoria":"\u00d3leo essencial"},{"nome":"Alecrim qt. verbenona","slug":"alecrim-qt-verbenona","conteudo":"Potencial hepatoestimulante, com poss\u00edvel al\u00edvio da dor de cabe\u00e7a e enxaqueca \u00datil nos cuidados dos dist\u00farbios hormonais na TPM, climat\u00e9rio e menopausa Apazigua o desconforto da arritmia card\u00edaca \u00d3leo essencial do bom humor Aroma herbal, fresco e relaxante. Restaurador energ\u00e9tico, acalma a impaci\u00eancia e irrita\u00e7\u00e3o Equilibra oscila\u00e7\u00f5es do humor ocasionada por mudan\u00e7as hormonais bruscas Acalma e relaxa T\u00f4nico cut\u00e2neo, com potencial reparador do ressecamento da pele madura Capacidade regeneradora celular, ameniza a rigidez de queloides, usado nos cuidados dos sinais do tempo facial em peles maduras ","categoria":"\u00d3leo essencial"},{"nome":"Algod\u00e3o","slug":"algodao","conteudo":"Potente aliado contra o envelhecimento precoce da pele, unhas e cabelos. \u00d3leo vegetal rico em Vitamina D e E, \u00e1cidos graxos essenciais como \u00e1cido linol\u00eanico (\u00f4mega 3),\u00a0 linoleico (\u00f4mega 6) e ceramidas. Um poderoso aliado em nossos rituais de beleza. ","categoria":"\u00d3leo vegetal"},{"nome":"Amarela","slug":"argila-amarela","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. A argila amarela \u00e9 rica em elementos essenciais na regenera\u00e7\u00e3o da pele e cabelos desvitalizados. Seus efeitos remineralizantes e tensores atuam na recupera\u00e7\u00e3o da elasticidade da pele madura. Renova o brilho e a hidrata\u00e7\u00e3o capilar. Pode ser usada em todos os tipos de pele e cabelos.","categoria":"Argila"},{"nome":"\u00c2mbar resin\u00f3ide","slug":"ambar","conteudo":"Aroma muito utilizado na perfumaria, considerado pelos perfumistas um dos melhores aromas que a natureza pode oferecer. Afrodis\u00edaco Aroma com potencial relaxante do sistema nervoso O perfume da alma Aroma divino. Cria um ambiente pr\u00f3spero, abundante e amoroso. Inspira a alma a desabrochar e florescer plenamente Perfuma a pele ","categoria":"\u00d3leo essencial"},{"nome":"Am\u00eandoa doce","slug":"amendoa-doce","conteudo":"Renova a pele desidratada e ressecada. Recupera a sa\u00fade da epiderme ap\u00f3s danos por processos eczematosos, picada de insetos ou ataque por micro-organismos. Com potencial anti-inflamat\u00f3rio e hidratante, traz brilho e maciez a pele. Usado na formula\u00e7\u00e3o de produtos para cosm\u00e9tica natural, como sabonetes, shampoos e repelentes de inseto\u00a0com not\u00e1vel resposta no processo de renova\u00e7\u00e3o cut\u00e2nea.","categoria":"\u00d3leo vegetal"},{"nome":"Andiroba","slug":"andiroba","conteudo":"Considerado um \u00f3leo com potencial anti-bacteriano e n\u00e3o-comedog\u00eanico, que n\u00e3o entope os poros. N\u00e3o apresenta textura excessivamente oleosa, ideal para os cuidados faciais e massagens em peles sens\u00edveis ou propensas a acne. Alivia a irrita\u00e7\u00e3o e coceira da pele ressecada e rachada, atuando como coadjuvante nos cuidados da pele afetada por dermatoses, eczema e psor\u00edase. Aplicado regularmente antes de dormir, diminui a apar\u00eancia dos c\u00edrculos escuros das p\u00e1lpebras. ","categoria":"\u00d3leo vegetal"},{"nome":"Anis estrelado","slug":"anis-estrelado","conteudo":"Potencial digestivo, carminativo Poss\u00edvel antiss\u00e9ptico, antimicrobiano, podendo trazer al\u00edvio ao mal estar respirat\u00f3rio de resfriados e gripes Coadjuvante nos cuidados ao al\u00edvio nos espasmos de tosse, asma, gases e c\u00f3licas de beb\u00eas \u201cStrogen-like\u201d, estrutura molecular semelhante ao estrog\u00eanio, horm\u00f4nio sexual feminino. As mol\u00e9culas strogen-like possuem potencial de acoplamento aos receptores celulares estrog\u00eanicos, podendo promover a\u00e7\u00e3o fitoestrog\u00eanica \u00d3leo essencial do amor incondicional Aroma adocicado que favorece o contato com a ess\u00eancia do feminino. Aporta energia amorosa ao ambiente, pr\u00e9-disp\u00f5e a mente a um estado receptivo Promove uma atmosfera ambiental de aceita\u00e7\u00e3o, avalia\u00e7\u00e3o e compreens\u00e3o das rela\u00e7\u00f5es conflitantes Potencial emoliente e hidratante Coadjuvante nos cuidados ao combate de edemas e celulite. Usado em drenagem linf\u00e1tica Pode recuperar o brilho e a maciez da pele na menopausa ","categoria":"\u00d3leo essencial"},{"nome":"Argan","slug":"argan","conteudo":"Considerado o \u201couro do Marrocos\u201d, traz uma rara e sustent\u00e1vel oportunidade econ\u00f4mica para as mulheres marroquinas. Em sua composi\u00e7\u00e3o \u00fanica, encontramos esqualeno, componente presente na pele humana, garantindo potente a\u00e7\u00e3o anti-age. Facilmente absorvido pela epiderme blinda e protege a pele e os cabelos de danos causados pelos radicais livres. Estimula a circula\u00e7\u00e3o no couro cabeludo previne a queda e repara o ressecamento dos cabelos quebradi\u00e7os. Reduz pontas duplas, diminui o frizz, controla os cabelos rebeldes e mant\u00e9m a colora\u00e7\u00e3o do tingimento por mais tempo. ","categoria":"\u00d3leo vegetal"},{"nome":"B\u00e1lsamo do Peru","slug":"balsamo-do-peru","conteudo":"Capacidade relaxante do sistema nervoso Potencial expectorante, coadjuvante nos cuidados para acalmar a tosse Poss\u00edvel anti-inflamat\u00f3rio, podendo trazer al\u00edvio para a dor artr\u00edtica e reumat\u00f3ide \u00d3leo essencial da criatividade Aroma doce e terroso que acalma e dissolve as tens\u00f5es, estimula o senso l\u00fadico. Inspira a mente criativa, auxiliando o desenvolvimento e conclus\u00e3o das id\u00e9ias, \u00fatil na finaliza\u00e7\u00e3o de teses e monografias Auxilia as pessoas tensas e s\u00e9rias relaxarem e materializarem seus sentimentos atrav\u00e9s da arte Hidratante para pele sens\u00edvel Usado em formula\u00e7\u00f5es da cosm\u00e9tica natural para cuidar de rachaduras na pele, ressecamento das m\u00e3os, cotovelos e calcanhares Potencial alerg\u00eanico.","categoria":"\u00d3leo essencial"},{"nome":"Bar\u00fa","slug":"baru","conteudo":"Considerado o \u201couro do Cerrado\u201d, o bar\u00fa \u00e9 uma castanha t\u00edpica do Cerrado brasileiro, sua comercializa\u00e7\u00e3o gera sustentabilidade para comunidades quilombolas. A presen\u00e7a de agentes antioxidantes, vitamina A, B e E, \u00e1cidos graxos essenciais, \u00f4megas 6 e 9, conferem potencial anti-aging e prote\u00e7\u00e3o contra a a\u00e7\u00e3o de radicais livres. A alta concentra\u00e7\u00e3o de \u00f4mega 9, concede ao \u00f3leo de bar\u00fa um potencial redutor de inflama\u00e7\u00f5es, o que o torna \u00fatil, nos cuidados preventivos contra celulite, estrias e envelhecimento precoce da pele. ","categoria":"\u00d3leo vegetal"},{"nome":"Benjoim","slug":"benjoim","conteudo":"Potencial expectorante, alivia sintomas da tosse Poss\u00edvel anti-inflamat\u00f3rio, usado popularmente em prepara\u00e7\u00f5es para acalmar dor articular e reum\u00e1tica \u00d3leo essencial da purifica\u00e7\u00e3o Aroma doce e terroso conhecido por \u201cb\u00e1lsamo dos monges\u201d, muito utilizado em mosteiros para purificar o ambiente. Harmonizador ambiental, afasta energia negativa, obsessiva, pensamentos repetitivos, estimulando a jornada meditativa Potencial ansiol\u00edtico e antidepressivo, reconfortante em situa\u00e7\u00f5es estressantes onde perde-se o contato com a paz interior Cria um ambiente prop\u00edcio a reconex\u00e3o da dissocia\u00e7\u00e3o entre sentimentos e raz\u00e3o Indicado para momentos onde necessita-se de harmoniza\u00e7\u00e3o emocional ou em estafa emocional Potencial antioxidante, podendo rejuvenescer peles maduras ","categoria":"\u00d3leo essencial"},{"nome":"Bergamota","slug":"bergamota","conteudo":"Potencial ansiol\u00edtico, \u00fatil para atenuar os dist\u00farbios do apetite: inapet\u00eancia ou excesso de apetite\/anorexia ou obesidade Ameniza dist\u00farbios do sono, podendo criar um ambiente prop\u00edcio ao sono profundo e reparador T\u00f4nico mental, auxilia em momentos de depress\u00e3o, des\u00e2nimo e apatia Poss\u00edvel antiss\u00e9ptico e antif\u00fangico, alivia sintomas de cistite, corrimento e candid\u00edase \u00d3leo essencial do amor pr\u00f3prio Aroma c\u00edtrico, doce e delicado. Age como um raio de sol penetrando no ambiente que dissipa a inseguran\u00e7a e equilibra as emo\u00e7\u00f5es. Desperta a tranquilidade, promovendo autoestima e autoaceita\u00e7\u00e3o Dissolve o medo, a timidez, autocr\u00edtica, as mudan\u00e7as abruptas de humor e irrita\u00e7\u00e3o, facilitando o relacionamento com o outro Acalma estados ansiosos de ang\u00fastia e tristeza. Quando choramos internamente este \u00f3leo essencial ilumina o cora\u00e7\u00e3o, despertando a esperan\u00e7a e alegria Estudos demonstram a\u00e7\u00e3o na redu\u00e7\u00e3o da hiperatividade das gl\u00e2ndulas seb\u00e1ceas da pele e do couro cabeludo. Potencial antiss\u00e9ptico, com excelentes propriedades para o uso na cosm\u00e9tica natura e na limpeza e assepsia da pele oleosa. \u00datil nos cuidados da acne, psor\u00edase, dermatite Combate a oleosidade capilar Fotossensibilizante.","categoria":"\u00d3leo essencial"},{"nome":"Bergamota LFC","slug":"bergamota-lfc","conteudo":"Livre de Furanocumarinas (LFC) As mol\u00e9culas furanocumar\u00ednicas presentes principalmente nos \u00f3leos essenciais c\u00edtricos s\u00e3o respons\u00e1veis pela fotossensibiliza\u00e7\u00e3o, ou seja, a caracter\u00edstica de ocorrerem manchas na pele exposta aos raios UV. O \u00f3leo essencial de Bergamota LFC n\u00e3o apresenta risco de exposi\u00e7\u00e3o da pele ao sol ap\u00f3s seu uso, pois as mol\u00e9culas furanocumar\u00ednicas fotossensibilizantes foram retiradas de sua composi\u00e7\u00e3o. Poss\u00edvel antiss\u00e9ptico e antif\u00fangico, alivia sintomas de cistite, corrimento e candid\u00edase Este aroma pode ser \u00fatil para acalmar dist\u00farbios do sono \u00d3leo essencial do amor pr\u00f3prio T\u00f4nico mental, auxilia em momentos de depress\u00e3o, des\u00e2nimo e apatia Equilibra as emo\u00e7\u00f5es, desperta a tranquilidade para a conquista da liberdade emocional Alivia o medo, timidez, autocr\u00edtica, mudan\u00e7as abruptas de humor e irrita\u00e7\u00e3o Potencial antiss\u00e9ptico, \u00fatil na limpeza e assepsia da pele oleosa. Pode reduzir a hiperatividade das gl\u00e2ndulas seb\u00e1ceas da pele e do couro cabeludo \u00datil nos cuidados da acne, psor\u00edase, dermatite ","categoria":"\u00d3leo essencial"},{"nome":"B\u00e9tula doce","slug":"betula-doce","conteudo":"Potencial ant\u00e1lgico, popularmente usado em prepara\u00e7\u00f5es naturais para aliviar dor muscular e reum\u00e1tica Coadjuvante nos cuidados para amenizar dor e edemas em tendinite, entorse, ligamento rompido, fratura \u00f3ssea Alivia a dor em inflama\u00e7\u00e3o muscular Algumas literaturas citam a\u00e7\u00e3o hipotensora. \u00d3leo essencial analg\u00e9sico Aroma doce, adstringente, origin\u00e1rio de regi\u00f5es frias, aquece o corpo e a alma. Favorece a humaniza\u00e7\u00e3o nas rela\u00e7\u00f5es Alivia a dor e refor\u00e7a a positividade Massagem esportiva, aquece a musculatura, a\u00e7\u00e3o na dor e inflama\u00e7\u00e3o ","categoria":"\u00d3leo essencial"},{"nome":"Branca","slug":"argila-branca","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. A argila branca \u00e9 rica em minerais antioxidantes, perfeita para hidratar e suavizar linhas de express\u00e3o. Atua como coadjuvante na redu\u00e7\u00e3o de manchas da pele, pois apresenta a\u00e7\u00e3o clareadora. Potencial cicatrizante natural, usada em tratamentos de beleza de peles sens\u00edveis, \u00e1speras, ressecadas ou danificadas.","categoria":"Argila"},{"nome":"Breu branco (Alm\u00e9cega)","slug":"breu-branco-almecega","conteudo":"Potencial expectorante, \u00fatil no al\u00edvio dos sintomas da asma e bronquite Poss\u00edvel analg\u00e9sico, pode acalmar a dor reum\u00e1tica, muscular e dor de cabe\u00e7a \u00d3leo essencial da espiritualidade Aroma adstringente, pungente, revitalizante. \u00datil na limpeza energ\u00e9tica do ambiente Estimula o foco e aten\u00e7\u00e3o Acalma e direciona a mente facilitando a medita\u00e7\u00e3o Cicatrizante Usado tradicionalmente pela popula\u00e7\u00e3o ind\u00edgena brasileira para acalmar a irrita\u00e7\u00e3o causada na pele picada por insetos ","categoria":"\u00d3leo essencial"},{"nome":"Buriti","slug":"buriti","conteudo":"Rico em beta caroteno \u00e9 um potente antioxidante e estimulante da produ\u00e7\u00e3o de col\u00e1geno e elastina, promovendo elasticidade e controle no envelhecimento prematuro da pele. Nutre todas as camadas celulares da pele, deixando a derme sedosa e macia, proporcionando uma colora\u00e7\u00e3o maravilhosa a epiderme. Utilizado por ind\u00edgenas do Brasil h\u00e1 gera\u00e7\u00f5es para aliviar e restaurar os danos como ressecamento da pele e cabelos expostos ao Sol. ","categoria":"\u00d3leo vegetal"},{"nome":"Cacau absoluto","slug":"cacau-absoluto","conteudo":"Potencial afrodis\u00edaco, estimulante da libido T\u00f4nico energ\u00e9tico em per\u00edodos de convalescen\u00e7a O aroma auxilia em dietas de emagrecimento, acalma a ansiedade e a vontade de comer chocolate O aroma da crian\u00e7a interior Aroma doce, amargo e sensual de cacau. Estimula a espontaneidade da crian\u00e7a interior, acalenta o cora\u00e7\u00e3o com alegria Reduz o stress e a depress\u00e3o O aroma pode auxiliar a acalmar a mente, trazendo conforto emocional, \u00fatil como coadjuvante no combate anorexia nervosa Usado como coadjuvante em massagem para reduzir gordura localizada Previne envelhecimento precoce da pele ","categoria":"\u00d3leo essencial"},{"nome":"Caf\u00e9 torrado","slug":"cafe-torrado","conteudo":"Potencial estimulante da digest\u00e3o Estimulante e t\u00f4nico, combate des\u00e2nimo, frigidez e apatia \u00datil para afugentar a sonol\u00eancia e lentid\u00e3o do racioc\u00ednio \u00d3leo essencial da a\u00e7\u00e3o Aroma de caf\u00e9 torrado. Aumenta a concentra\u00e7\u00e3o e aten\u00e7\u00e3o em geral, reduz o cansa\u00e7o e a fadiga, gera a\u00e7\u00e3o e realiza\u00e7\u00e3o Hidratante da pele Potencial antioxidante, com a\u00e7\u00e3o antilip\u00eamica e adelga\u00e7ante Atua como coadjuvante no combate \u00e0 celulite e gordura localizada ","categoria":"\u00d3leo essencial"},{"nome":"Caf\u00e9 verde","slug":"cafe-verde","conteudo":"Estudos em curso analisam a possibilidade desse \u00f3leo estimular a s\u00edntese de col\u00e1geno. Influencia na estabilidade da membrana d\u00e9rmica \u00d3leo essencial da manuten\u00e7\u00e3o da pele Aroma herbal, de folhas molhadas. Ativa a vontade de cuidar e amar a si mesmo Alivia o stress Tem sido muito utilizado em prepara\u00e7\u00f5es dermocosm\u00e9ticas para promover equil\u00edbrio fisiol\u00f3gico na pele Emoliente e hidratante da pele Adelga\u00e7ante, atua como coadjuvante no combate \u00e0 gordura localizada e celulite ","categoria":"\u00d3leo essencial"},{"nome":"Cajeput","slug":"cajeput","conteudo":"Potencial analg\u00e9sico, alivia nevralgias e pode atuar como coadjuvante para acalmar a dor de ouvido Poss\u00edvel expectorante, calmante de estados febris, antiss\u00e9ptico respirat\u00f3rio, alivia sintomas de resfriados \u00d3leo essencial do alinhamento Estimulante, traz clareza mental alavancando id\u00e9ias criativas. Alinha o corpo e a mente Alivia a tens\u00e3o das cordas vocais. \u00datil para cantores, professores, oradores Bals\u00e2mico e cicatrizante Potencial inseticida, usado tradicionalmente pelos abor\u00edgenes australianos para combater infesta\u00e7\u00e3o por piolhos e pulgas \u00datil nos cuidados da pele em casos de acne, dermatose e psor\u00edase Pode auxiliar a cicatriza\u00e7\u00e3o de pequenos cortes ","categoria":"\u00d3leo essencial"},{"nome":"C\u00e1lamo","slug":"calamo","conteudo":"Usado na medicina Ayurv\u00e9dica para descongestionar, expectorar, desintoxicar e estimular a circula\u00e7\u00e3o dos l\u00edquidos corporais Potencial estimulante da digest\u00e3o, carminativo, pode auxiliar a expuls\u00e3o de gases Ameniza dores articulares e musculares Potencial antimicrobiano, coadjuvante no combate ao mau h\u00e1lito e gengivites Aumenta o apetite sexual \u00d3leo essencial da prote\u00e7\u00e3o Aroma ex\u00f3tico de raiz, reconfortante que apazigua as dores do cora\u00e7\u00e3o. Estimula energia vital Desfaz pensamentos obsessivos e emo\u00e7\u00f5es estagnadas Leva o marasmo e a tristeza embora Rejuvenescedor cut\u00e2neo Coadjuvante em tratamentos de drenagem linf\u00e1tica, reten\u00e7\u00e3o de l\u00edquidos, edemas e preven\u00e7\u00e3o de celulite Usado em massagem para redu\u00e7\u00e3o de gordura localizada Usado para aromatizar dentifr\u00edcios.","categoria":"\u00d3leo essencial"},{"nome":"Camomila alem\u00e3","slug":"hidrolato-de-camomila-alema","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Camomila Alem\u00e3 possui potencial antial\u00e9rgico, anti-inflamat\u00f3rio e cicatrizante. Usado para os cuidados em alergias, dermatoses, psor\u00edase, eczema e pele seca. Tamb\u00e9m pode ajudar como coadjuvante no controle da queda de cabelo e na cicatriza\u00e7\u00e3o de pequenos ferimentos na pele e no couro cabeludo. Excelente op\u00e7\u00e3o nos cuidados em eczemas, alergias de fundos nervosos em animais, como tamb\u00e9m para cicatriza\u00e7\u00e3o de pequenos ferimentos de nossos amados bichanos. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Camomila alem\u00e3 (azul)","slug":"camomila-alema-azul","conteudo":"Poss\u00edvel anti-inflamat\u00f3rio, ant\u00e1lgico e cicatrizante Acalma c\u00f3licas do beb\u00ea Potencial antial\u00e9rgico natural, coadjuvante nos cuidados em eczema cut\u00e2neo, asma, rinite \u201cHormon-like (estrutura molecular semelhante aos horm\u00f4nios), strogen-like\u201d (estrutura molecular semelhante ao estrog\u00eanio, horm\u00f4nio sexual feminino. As mol\u00e9culas strogen-like possuem potencial de acoplamento aos receptores celulares estrog\u00eanicos, podendo promover a\u00e7\u00e3o fitoestrog\u00eanica) \u00d3leo essencial da modera\u00e7\u00e3o Aroma doce, terroso, harmoniza e modera todos os excessos. Auxilia a adapta\u00e7\u00e3o Ameniza a necessidade de controle, dissolve tens\u00f5es, permitindo a vida fluir no seu pr\u00f3prio ritmo Auxilia a reequilibrar o retorno do fluxo menstrual bloqueado por choques emocionais traum\u00e1ticos \u00datil nos cuidados de dermatoses, eczema, pele seca, alergias, afetada por fungos ","categoria":"\u00d3leo essencial"},{"nome":"Camomila romana","slug":"camomila-romana","conteudo":"Aroma calmante do sistema nervoso, ameniza o stress pr\u00e9-operat\u00f3rio, choques emocionais e traumas profundos Potencial anti espasm\u00f3dico, calmante de c\u00f3licas e espasmos de tosse Poss\u00edvel anti-inflamat\u00f3rio, alivia artrite T\u00f4nico digestivo, carminativo e colagogo, ameniza os sintomas de n\u00e1useas, v\u00f4mito e diarreia \u00d3leo essencial da temperan\u00e7a Aroma adocicado herbal, traz conforto e seguran\u00e7a ao ambiente. Ameniza depress\u00e3o com causas desconhecidas, atenua crises de bipolaridade, melancolia, apazigua pesadelos noturnos Aporta conforto as pessoas com dificuldade de adapta\u00e7\u00e3o a realidade, nost\u00e1lgicas do passado Acalma alergia, coceira, erup\u00e7\u00e3o e alergias na pele por efeito medicamentoso Efeito clareador dos cabelos Acalma o desconforto de afta digestiva ","categoria":"\u00d3leo essencial"},{"nome":"Canela casca","slug":"canela-casca","conteudo":"Estimula a digest\u00e3o, ameniza a fraqueza causada por diarreia, verm\u00edfugo Potencial antimicrobiano, combate sintomas de infec\u00e7\u00e3o urin\u00e1ria Estimula a circula\u00e7\u00e3o, trazendo conforto as extremidades frias Emenagogo, aroma companheiro do trabalho de parto, ameniza c\u00f3lica menstrual \u00d3leo essencial da celebra\u00e7\u00e3o Aroma doce, quente e picante, possibilita a manifesta\u00e7\u00e3o do amor em todas as nuances. Possibilita o acesso ao inconsciente com amorosidade Afrodis\u00edaco, estimulante da libido feminina, desinibe, favorece a intimidade, libera a amorosidade e sexualidade criativa Ajuda pessoas envergonhadas e reservadas relacionarem-se com espontaneidade Potencial redutor de verrugas Coadjuvante em tratamentos de celulite e flacidez Potencial alerg\u00eanico.","categoria":"\u00d3leo essencial"},{"nome":"Canela folha","slug":"canela-folha","conteudo":"Potencial relaxante muscular, anti-inflamat\u00f3rio, analg\u00e9sico, ameniza dor muscular, LER, fibromialgia, reumatismo, artrite, artrose, lombalgia, tendinite \u00d3leo essencial da flexiblididade Aroma doce, quente, picante e amadeirado. Auxilia o movimento das emo\u00e7\u00f5es, desaloja a rigidez ps\u00edquica acumulada nas articula\u00e7\u00f5es em forma de toxinas que impedem o movimento, a espontaneidade e a jovialidade Resgata a emo\u00e7\u00e3o de pessoas r\u00edgidas, frias, de dif\u00edcil acesso, auxilia a supera\u00e7\u00e3o do sentimento de isolamento Coadjuvante em tratamentos de celulite e flacidez Potencial alerg\u00eanico.","categoria":"\u00d3leo essencial"},{"nome":"C\u00e2nfora branca","slug":"canfora-branca","conteudo":"Estimulante da circula\u00e7\u00e3o Potencial anti-inflamat\u00f3rio e analg\u00e9sico. \u00datil para acalmar a dor de pancadas, luxa\u00e7\u00f5es, dores musculares, reum\u00e1ticas, artrite, artrose e contus\u00e3o Hipertensor \u00d3leo essencial do relaxamento muscular Auxilia o fluir da respira\u00e7\u00e3o, reequilibrando a energia vital em casos de fadiga geral Usado em prepara\u00e7\u00f5es de cosm\u00e9tica natural para os cuidados no combate a celulite e varizes Coadjuvante nos cuidados para o al\u00edvio da dor em entorses e contus\u00f5es ","categoria":"\u00d3leo essencial"},{"nome":"Cardamomo","slug":"cardamomo","conteudo":"Revitalizador, digestivo \u00datil no al\u00edvio de n\u00e1useas e azia na gesta\u00e7\u00e3o Potencial combativo de verminoses Potencial expectorante e anticatarral Ameniza o efeito g\u00e1strico irritante da cafe\u00edna \u00d3leo essencial do empoderamento Abranda a confus\u00e3o mental em momentos de sobrecarga de trabalho e excesso de responsabilidade. Estimula a coragem para enfrentar o medo que paralisa, permitindo a express\u00e3o das emo\u00e7\u00f5es sem excessos Encoraja, traz seguran\u00e7a para falar em p\u00fablico, realizar provas e entrevistas Afrodis\u00edaco, \u00fatil para combater impot\u00eancia e frigidez Sudor\u00edfero, auxilia a elimina\u00e7\u00e3o de toxinas via transpira\u00e7\u00e3o Combate o mau-h\u00e1lito ","categoria":"\u00d3leo essencial"},{"nome":"Castanha do Brasil","slug":"castanha-do-brasil","conteudo":"Possui componentes importantes para repor a barreira lip\u00eddica da pele, minimizando seu ressecamento e desidrata\u00e7\u00e3o. Excelente emoliente e hidratante, facilmente absorvido pela pele, usado nos cuidados com peles fr\u00e1geis. Quando aplicado nos cabelos, o \u00f3leo repara danos e devolve seu brilho natural. Ideal\u00a0para cabelos quebradi\u00e7os, secos, opacos e quimicamente tratados. ","categoria":"\u00d3leo vegetal"},{"nome":"Cedro Atlas","slug":"cedro-atlas","conteudo":"Potencial descongestionante da circula\u00e7\u00e3o arterial Poss\u00edvel lipol\u00edtico, usado nos cuidados para redu\u00e7\u00e3o de gordura localizada Ativador da circula\u00e7\u00e3o linf\u00e1tica, diur\u00e9tico, \u00fatil no combate a edemas, pode amenizar a hipertens\u00e3o nervosa causada pela reten\u00e7\u00e3o de l\u00edquidos Potencial antif\u00fangico, antiss\u00e9ptico e cicatrizante \u00fatil para aliviar os sintomas de c\u00e2ndid\u00edase, cistite, dermatoses e psor\u00edase Acalma sintomas de tosse com muco \u00d3leo essencial do mestre interior Aroma amadeirado, bals\u00e2mico, levemente adocicado acalma, tranquiliza e estabiliza a psiqu\u00ea. Desperta o desejo pela jornada espiritual e para o reconhecimento do mestre interior Aporta integridade e const\u00e2ncia na caminhada espiritual Acalma coceira da pele Hidratante, reduz a oleosidade da pele, equilibra as gl\u00e2ndulas seb\u00e1ceas, \u00fatil em formula\u00e7\u00f5es para peles e cabelos oleosos Ativa a circula\u00e7\u00e3o do sangue no couro cabeludo, previne a queda dos cabelos Auxilia a elimina\u00e7\u00e3o de piolhos, pulgas e carrapatos, tra\u00e7as e insetos ","categoria":"\u00d3leo essencial"},{"nome":"Cedro Himalaya","slug":"cedro-himalaya","conteudo":"Antif\u00fangico capilar Desobstrutor das vias respirat\u00f3rias, alivia os sintomas de bronquite, tosse com catarro e asma Coadjuvante nos cuidados para aliviar a tens\u00e3o nervosa Alivia o desconforto dos sintomas de cistite e infec\u00e7\u00e3o urin\u00e1ria \u00d3leo essencial da serenidade Aroma doce, amadeirado, bals\u00e2mico, cria um ambiente tranquilo e calmo. Promove uma profunda sensa\u00e7\u00e3o de paz e tranquilidade interior Alivia o sentimento de frusta\u00e7\u00e3o Auxilia afugentar insetos Coadjuvante nos cuidados no combate a celulite, edemas, acne, seborr\u00e9ia, micoses, dermatites, psor\u00edase e p\u00e9 de atleta ","categoria":"\u00d3leo essencial"},{"nome":"Cenoura sementes","slug":"cenoura-sementes","conteudo":"T\u00f4nico, depurativo, regenerador da energia hep\u00e1tica, descongestionante biliar, alivia os sintomas da hepatite viral Estimulante da circula\u00e7\u00e3o Antimicrobiano \u00d3leo essencial da regenera\u00e7\u00e3o Aroma amadeirado, terroso, quente. Estimulante geral Aporta tranquilidade para momentos de instabilidade interior DERMATOL\u00d3GICA Apazigua rea\u00e7\u00e3o al\u00e9rgica na pele Revitalizante do tecido cut\u00e2neo Coadjuvante em tratamento de escaras Nutre a pele madura ","categoria":"\u00d3leo essencial"},{"nome":"Champaca Absoluto","slug":"champaca-absoluto","conteudo":"Usado na massagem terap\u00eautica auxilia a dissolver a tens\u00e3o muscular, acalmando a dor nas articula\u00e7\u00f5es Aroma do encantamento Aroma doce, floral e ex\u00f3tico. Excelente op\u00e7\u00e3o em momentos de crises, onde perde-se a confian\u00e7a na beleza interna Usado como anti-depressivo, acalma e relaxa o corpo, fortalecendo a mente Afrodis\u00edaco Relaxante Age como um excelente hidratante e rejuvenescedor da pele madura Este absoluto \u00e9 amplamente usado na ind\u00fastria da perfumaria para criar aromas ex\u00f3ticos ","categoria":"\u00d3leo essencial"},{"nome":"Chia","slug":"chia","conteudo":"Possui agentes antioxidantes que atuam na manuten\u00e7\u00e3o da sa\u00fade e preven\u00e7\u00e3o da desidata\u00e7\u00e3o, ressecamento e envelhecimento da pele. Pode ser usado na hidrata\u00e7\u00e3o diurna e noturna, dando vida \u00e0 pele seca ou com apar\u00eancia cansada. Coadjuvante nos cuidados para atenuar manchas na pele, celulite e alergias. Indispens\u00e1vel na hidrata\u00e7\u00e3o de calcanhares e cotovelos secos ou rachados e unhas quebradi\u00e7as. ","categoria":"\u00d3leo vegetal"},{"nome":"Cipreste","slug":"cipreste","conteudo":"Potencial vasoconstritor, estimula o movimento dos l\u00edquidos corporais, coadjuvante na redu\u00e7\u00e3o de edema, tornozelos, p\u00e9s e pernas, alivia o mal-estar das pernas cansadas Coadjuvante nos cuidados dos sintomas de hemorroidas, varizes e prostatite Alivia sintomas de bronquite, tosse com espasmos e catarro, rinite, asma Ameniza estados hipertensivos \u201cStrogen like\u201d, estrutura molecular semelhante ao estrog\u00eanio, horm\u00f4nio sexual feminino. As mol\u00e9culas \u201cstrogen-like\u201d possuem potencial de acoplamento aos receptores celulares estrog\u00eanicos, podendo promover a\u00e7\u00e3o fitoestrog\u00eanica, acalmando os sintomas menop\u00e1usicos \u00d3leo essencial da transforma\u00e7\u00e3o Aroma herbal, adstringente, refrescante. Libera m\u00e1goas antigas, culpas e tristezas Conduz ao sil\u00eancio interior, desabrochar da sabedoria e ao amadurecimento Auxilia em momentos de nostalgia, dificuldade de concentra\u00e7\u00e3o e dispers\u00e3o Ameniza crise de afonia e enurese infantil Adstringente, cicatrizante, \u00fatil nos cuidados de acne e caspa Regula a transpira\u00e7\u00e3o excessiva nas m\u00e3os, p\u00e9s e axilas \u00datil na drenagem linf\u00e1tica e preven\u00e7\u00e3o de celulite Usado nos cuidados da pele para evitar micoses Combate o mau-h\u00e1lito ","categoria":"\u00d3leo essencial"},{"nome":"Citronela","slug":"citronela","conteudo":"Repelente de insetos Picada de insetos Estudos em universidade brasileira apontam para a a\u00e7\u00e3o hipotensora deste OE \u00d3leo essencial repelente Aroma quente, amadeirado, floral, c\u00edtrico, com notas frescas de sa\u00edda. Higienizador ambiental Usado par acalmar a inflama\u00e7\u00e3o de picadas de insetos ","categoria":"\u00d3leo essencial"},{"nome":"Coco","slug":"coco","conteudo":"O \u00f3leo de coco \u00e9 nutritivo e protetor, ajudando a nossa pele a combater a desidrata\u00e7\u00e3o. Regenera peles desnutridas sendo um excelente aliado na cicatriza\u00e7\u00e3o de erup\u00e7\u00f5es da epiderme e no al\u00edvio das assaduras das n\u00e1degas de beb\u00eas. Penetra rapidamente na pele e deixa uma sensa\u00e7\u00e3o de maciez sem efeito oleoso na pele. Cuida dos cabelos secos e danificados. Deixa o cabelo f\u00e1cil de pentear, macio, brilhante, aumentando seu volume. Por ser um \u00f3leo muito rico em nutrientes, o \u00f3leo de coco ajuda a fortalecer o fio, auxiliando o crescimento capilar. Rico em \u00e1cidos capr\u00edlico, c\u00e1prico, mir\u00edstico, palm\u00edtico, este\u00e1rico, ol\u00e9ico, linoleico e \u00e1cido l\u00e1urico, sendo esse \u00faltimo encontrado em maior propor\u00e7\u00e3o. ","categoria":"\u00d3leo vegetal"},{"nome":"Coentro sementes","slug":"coentro-sementes","conteudo":"T\u00f4nico digestivo, carminativo, estimulante g\u00e1strico Alivia a dor reum\u00e1tica, articular e artrite gotosa Auxilia a elimina\u00e7\u00e3o de metais pesados do organismo \u201cProgesteron-like\u201d, estrutura molecular semelhante a progesterona, horm\u00f4nio sexual feminino. As mol\u00e9culas \u201cProgesteron-like\u201d possuem potencial de acoplamento aos receptores celulares progester\u00f4nicos, podendo promover a\u00e7\u00e3o fitoprogester\u00f4nica. \u00d3leo essencial da felicidade Aroma doce, herbal, temperado, amadeirado. Afrodis\u00edaco Acalma a ansiedade da anorexia nervosa Aporta \u00e2nimo para combater a tristeza e a depress\u00e3o p\u00f3s-parto Estimula a criatividade e amorosidade Usado em massagem de drenagem linf\u00e1tica Antiss\u00e9ptico epitelial ","categoria":"\u00d3leo essencial"},{"nome":"Copa\u00edba b\u00e1lsamo","slug":"copaiba-balsamo","conteudo":"Auxilia a rejuvenescer e hidratar a pele e os cabelos com pontas ressecadas Possivel a\u00e7\u00e3o antioxidante Coadjuvante nos cuidados em frieira, psor\u00edase, herpes, l\u00e1bios rachados \u00datil nos cuidados em aftas \u00d3leo essencial do rejuvenescimento Aroma redutor do stress, reconfortante emocional Cria uma atmosfera segura auxiliando o centramento Para se obter a copa\u00edba b\u00e1lsamo, colhe-se o \u00f3leo resina do tronco usando um instrumento chamado trado. Ap\u00f3s a colheita o \u00f3leo \u00e9 filtrado. O \u00f3leo resina de copa\u00edba possui maior concentra\u00e7\u00e3o de \u00f3leo vegetal (\u00e1cidos graxos) e menor de \u00f3leo essencial (componentes vol\u00e1teis) comparado a copa\u00edba destilada. \u00datil na hidrata\u00e7\u00e3o e rejuvenescimento da pele e cabelos ","categoria":"\u00d3leo essencial"},{"nome":"Copa\u00edba destilada","slug":"copaiba-destilada","conteudo":"Antiss\u00e9ptico, cicatrizante, coadjuvante em cuidados em gastrite, \u00falcera, ferimentos leves Potencial anti-inflamat\u00f3rio bucal, ameniza amigdalite, herpes, aftas Acalma a dor reum\u00e1tica, artrite, bursite Poss\u00edvel a\u00e7\u00e3o desinfetante geniturin\u00e1ria \u00d3leo essencial da seguran\u00e7a A grandiosidade do seu tronco aporta o sentimento de seguran\u00e7a estabilizando a psiqu\u00ea. \u00datil para as almas envelhecidas com dificuldade de abertura para o novo Este \u00f3leo essencial \u00e9 obtido atrav\u00e9s da destila\u00e7\u00e3o fracionada do \u00f3leo resina. A copa\u00edba destilada apresenta maior concentra\u00e7\u00e3o de \u00f3leo essencial (componentes vol\u00e1teis) e menor de \u00e1cidos graxos comparado ao \u00f3leo resina.","categoria":"\u00d3leo essencial"},{"nome":"Cravo bot\u00e3o","slug":"cravo-botao","conteudo":"Potencial analg\u00e9sico, antiss\u00e9ptico, antibacteriano, antif\u00fangico e antiviral. Coadjuvante no combate a dor de dente aguda, aftas, retra\u00e7\u00e3o de gengiva, mau-h\u00e1lito Alivia dor do parto e dor muscular Aroma estimulante, ameniza os sintomas desenergizantes da press\u00e3o baixa e hipotiroidismo Alivia o inc\u00f4modo da tosse seca \u00d3leo essencial da mudan\u00e7a Aroma excitante, inspirador e ativador. Revitaliza, muda o foco da contempla\u00e7\u00e3o para a a\u00e7\u00e3o, \u00fatil em momentos de mudan\u00e7as Potencial redutor de verrugas Coadjuvante no combate a micose, fungo de unha, l\u00edquen plano \u00datil no combate a sarna, carrapato ","categoria":"\u00d3leo essencial"},{"nome":"Cravo folha","slug":"cravo-folha","conteudo":"Potencial antif\u00fangico, coadjuvante em tratamento no combate a fungos Controle de tra\u00e7as em arm\u00e1rios Antiss\u00e9ptico, alivia aftas, retra\u00e7\u00e3o de gengiva, mau-h\u00e1lito Aroma estimulante, ameniza os sintomas desenergizantes da press\u00e3o baixa e hipotiroidismo \u00d3leo essencial da libera\u00e7\u00e3o energ\u00e9tica Aroma pungente, quente, acre. Remove a energia velha do ambiente Libera as mem\u00f3rias impregnadas em objetos, roupas e ambientes Redutor de verrugas Combate micoses, fungos de unha, l\u00edquen plano ","categoria":"\u00d3leo essencial"},{"nome":"Damasco","slug":"damasco","conteudo":"Aroma frutado, muito agrad\u00e1vel. Rico em \u00e1cidos graxos oleico (\u00f4mega 9), linoleico (\u00f4mega 6), e linol\u00eanico (\u00f4mega 3), vitaminas A, B e E. Penetra rapidamente a barreira cut\u00e2nea, nutrindo, tonificando e revitalizando a pele sem deix\u00e1-la oleosa. Tradicionalmente muito apreciado e utilizado por mulheres tibetanas para proteger a pele do rosto dos efeitos nocivos do sol, frio e vento. Reduz manchas, restaurando a elasticidade da pele. Indicado para peles desidratadas e maduras. ","categoria":"\u00d3leo vegetal"},{"nome":"Erva Baleeira","slug":"erva-baleeira","conteudo":"Tem propriedades anti reum\u00e1ticas, anti-inflamat\u00f3rias e analg\u00e9sicas \u00d3leo essencial anti-inflamat\u00f3rio Aptid\u00e3o de amenizar a dor e o sofrimento humano Potencializa o bem estar, o relaxamento e a confian\u00e7a na possibilidade de uma vida melhor Reconforta o sistema nervoso abalado pela dor f\u00edsica Potencial calmante da dor e da inflama\u00e7\u00e3o ","categoria":"\u00d3leo essencial"},{"nome":"Espruce negro","slug":"espruce-negro","conteudo":"Relaxa o sistema nervoso, acalma ansiedade e melhora o sono Coadjuvante no tratamento de amigdalite, tosse com catarro e espasmos \u00d3leo essencial da generosidade Aroma herbal, fresco, amadeirado, ideal para per\u00edodos dedicados a reflex\u00e3o e mudan\u00e7as de comportamento Diminui a agressividade, aporta a capacidade de doa\u00e7\u00e3o, perd\u00e3o e desapego Coadjuvante em cuidados no clareamento de manchas da pele ","categoria":"\u00d3leo essencial"},{"nome":"Eucalipto citriodora","slug":"eucalipto-citriodora","conteudo":"Potencial anti-inflamat\u00f3rio, analg\u00e9sico, \u00fatil para acalmar a dor em bursites Poss\u00edvel fungicida Auxilia atenuar os sintomas de hipertens\u00e3o \u00d3leo essencial da limpeza Aroma herbal, fresco, adocicado. \u00datil para reenergizar a energia de locais onde circulam muitas pessoas, como hot\u00e9is, clubes, escolas, banheiros Repelente e calmante cut\u00e2neo, \u00fatil em picadas de pulgas, carrapatos e mosquitos P\u00e9 de atleta, micose ","categoria":"\u00d3leo essencial"},{"nome":"Eucalipto globulus","slug":"eucalipto-globulus","conteudo":"Potencial descongestionante respirat\u00f3rio, usado para aliviar os sintomas da tosse, sinusite e rinite Coadjuvante para os cuidados na expectora\u00e7\u00e3o do muco em caso de bronquite e tosse com catarro Desinfetante a\u00e9reo ambiental, antiviral, coadjuvante na preven\u00e7\u00e3o ao v\u00edrus influenza Cont\u00e9m alta concentra\u00e7\u00e3o da mol\u00e9cula 1,8-cineol, por isso n\u00e3o \u00e9 indicado para beb\u00eas, crian\u00e7as com menos de 4 anos de idade, idosos e convalescentes.\u00d3leo essencial da respira\u00e7\u00e3o Aroma herbal, fresco, canforado. Fortalece a respira\u00e7\u00e3o, o foco mental e a assertividade, auxiliando a sintetiza\u00e7\u00e3o das id\u00e9ias para concluir tarefas intelectuais Ideal para momentos de d\u00favidas Equilibra o biotipo ayurveda \u201cvata\u201d Potencial antiss\u00e9ptico e cicatrizante Dermatoses Analg\u00e9sico, dor muscular ","categoria":"\u00d3leo essencial"},{"nome":"Eucalipto radiata","slug":"eucalipto-radiata","conteudo":"Na medicina popular australiana \u00e9 considerado o \u201ceucalipto pedi\u00e1trico\u201d, \u201ceucalipto das pessoas sens\u00edveis\u201d, \u201ceucalipto dos asm\u00e1ticos\u201d. \u00c9 um tipo de eucalipto com menor concentra\u00e7\u00e3o da mol\u00e9cula 1,8-cineol, o que o torna um \u00f3leo mais seguro para crian\u00e7as, idosos, convalescentes. Potencial antivir\u00f3tico, antimicrobiano, anticatarral, expectorante e analg\u00e9sico Utilizado popularmente nos cuidados com sintomas de rinite, sinusite, otite, faringite, bronquite, tosse com catarro, asma com secre\u00e7\u00e3o \u00d3leo essencial do bem estar respirat\u00f3rio Aroma fresco e agrad\u00e1vel capaz de melhorar o \u00e2nimo, afastando a tristeza Limpa, desinfeta, renova a energia Fornece energia Auxilia nos cuidados com infe\u00e7\u00f5es cut\u00e2neas ","categoria":"\u00d3leo essencial"},{"nome":"Eucalipto staigeriana","slug":"eucalipto-staigeriana","conteudo":"Coadjuvante na expectora\u00e7\u00e3o do muco das vias respirat\u00f3rias, acalma tosse e os sintomas de resfriados infantis Atenua dores reum\u00e1ticas Combate \u00e1caros, limpa e refresca o ambiente \u00d3leo essencial do conforto respirat\u00f3rio Aroma que lembra os c\u00edtricos, herbal e doce. Relaxante mental Antif\u00fangico ","categoria":"\u00d3leo essencial"},{"nome":"Funcho doce","slug":"funcho-doce","conteudo":"Apaziguador das irregularidades do ciclo menstrual, mudan\u00e7as hormonais no climat\u00e9rio e menopausa, \u201cStrogen-like\u201d, estrutura molecular semelhante ao estrog\u00eanio, horm\u00f4nio sexual feminino. As mol\u00e9culas \u201cstrogen-like\u201d possuem potencial de acoplamento aos receptores celulares estrog\u00eanicos, podendo promover a\u00e7\u00e3o fitoestrog\u00eanica Poder\u00e1 ser usado para diminuir o apetite \u00datil para digest\u00e3o, elimina\u00e7\u00e3o de gases e no combate a vermes e fungos Coadjuvante em massagens abdominais dilu\u00eddo e, \u00f3leo vegetal para acalmar c\u00f3licas infantis Potencial calmante de tosses convulsivas com muco \u00d3leo essencial da perseveran\u00e7a Aroma doce, semelhante ao anis. Inspirador e fortalecedor. Purifica a energia pessoal, aportando valor interior e confian\u00e7a Refor\u00e7a a perseveran\u00e7a na luta por metas e objetivos \u00datil no combate a edemas, drenagem linf\u00e1tica e celulite Previne o ganho de peso e ac\u00famulo de gordura localizada ","categoria":"\u00d3leo essencial"},{"nome":"Funcho doce","slug":"hidrolato-de-funcho-doce","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O hidrolato de Funcho doce tem a\u00e7\u00e3o estrog\u00eanica e pode ser \u00fatil para regular os n\u00edveis hormonais, equilibrar o ciclo menstrual e acalmar os sintomas da TPM. Possui a\u00e7\u00e3o digestiva e respirat\u00f3ria. Acalma n\u00e1useas, flatul\u00eancias e m\u00e1 digest\u00e3o. Considerado um anti-inflamat\u00f3rio e estimulante da circula\u00e7\u00e3o, este hidrolato poder\u00e1 ser utilizado em compressas com argila para combater a congest\u00e3o do sistema linf\u00e1tico e edemas.","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Gengibre","slug":"gengibre","conteudo":"Digestivo, laxante Auxilia a dissolu\u00e7\u00e3o de gordura, coadjuvante no combate ao colesterol alto Potencial anti-inflamat\u00f3rio, coadjuvante nos cuidados em bursite, tendinite, dor lombar, amigdalite Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo Anti-inflamat\u00f3rio \u00d3leo essencial do poder pessoal Aroma terroso, amadeirado, com cheiro de raizes. Afrodis\u00edaco masculino Direciona a mente, dissipa d\u00favidas, favorece o posicionamento Equilibra o biotipo ayurveda \u201ckapha\u201d Coadjuvante na redu\u00e7\u00e3o de inflama\u00e7\u00e3o muscular e articular Auxilia tratamentos de emagrecimento ","categoria":"\u00d3leo essencial"},{"nome":"Gengibre fresco","slug":"gengibre-fresco","conteudo":"Usado na medicina popular chinesa para cuidar de dispepsia, flatul\u00eancia, indigest\u00e3o e constipa\u00e7\u00e3o Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo Expectorante, usado em tosse com catarro Ant\u00e1lgico, anti-inflamat\u00f3rio, \u00fatil em dor reum\u00e1tica, amigdalite, dor m\u00fascular, articular e inflama\u00e7\u00f5es Conhecido e apreciado mundialmente como t\u00f4nico sexual e afrodis\u00edaco. Tem sido usado para cuidar da andropausa e falta de libido masculina \u00d3leo essencial do poder pessoal Aroma fresco, pungente e penetrante. Promove o enraizamento, direcionando a mente e dissipando as d\u00favidas Aporta coragem e incentiva o sentimento de autoconfian\u00e7a Acalma a raiva, o medo e a ansiedade Facilita o posicionamento e acalma a apreens\u00e3o em corresponder as expectativas do outro Usado na confec\u00e7\u00e3o de pomadas coadjuvantes da redu\u00e7\u00e3o de inflama\u00e7\u00e3o muscular e articular Coadjuvante em dietas de emagrecimento. Usado para redu\u00e7\u00e3o de gordura localizada ","categoria":"\u00d3leo essencial"},{"nome":"Ger\u00e2nio","slug":"hidrolato-de-geranio","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O hidrolato de Ger\u00e2nio poder\u00e1 ser usado em todos os tipos de pele. \u00datil em qualquer problema de pele, principalmente os ocasionados pelo excesso de oleosidade. As mol\u00e9culas arom\u00e1ticas do ger\u00e2nio regulam a gordura da pele e estimulam a produ\u00e7\u00e3o de col\u00e1geno, mantendo a elasticidade e a hidrata\u00e7\u00e3o. Poder\u00e1 ser utilizado em sinergia com argila nos cuidados com a celulite. Aroma \u00fatil para o equil\u00edbrio hormonal tanto feminino como masculino. O hidrolato poder\u00e1 ser usado na cria\u00e7\u00e3o de um perfume para acalmar a tristeza, a depress\u00e3o, eliminando pensamentos negativos, aportando esperan\u00e7a. Este aroma \u00e9 muito conhecido por suas propriedades anti stress e restauradoras do sistema nervoso abalado.","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Ger\u00e2nio Bourbon","slug":"geranio-bourbon","conteudo":"Potencial \u201cHormon-like\u201d, coadjuvante em cuidados femininos e masculinos e na regula\u00e7\u00e3o hormonal de estrog\u00eanio e testosterona Estimula o c\u00f3rtex adrenal, respons\u00e1vel pela produ\u00e7\u00e3o de horm\u00f4nios sexuais, reduz sintomas da TPM, c\u00f3licas, incha\u00e7o nos seios, menstrua\u00e7\u00e3o excessiva, amenorreia, leucorr\u00e9ia, sintomas da pr\u00e9-menopausa, menopausa A\u00e7\u00e3o anti-inflamat\u00f3ria e fungicida, combate candid\u00edase \u00d3leo essencial da feminilidade Aroma doce e sutil, carregando a energia arquet\u00edpica do sagrado feminino. Aporta equil\u00edbrio e estabilidade emocional em momentos de crise existencial Auxilia a cura da dor emocional Ajuda a criar um ambiente positivo Hidratante e citofil\u00e1tico, usado nos cuidados da pele envelhecida, ressecada, enrugada, eczematosa Adstringente, coadjuvante nos cuidados na regula\u00e7\u00e3o da oleosidade da pele, melhora o aspecto da pele acneica Antitranspirante, muito usado na confec\u00e7\u00f5es de desodorantes naturais \u00datil em massagens para diminuir edemas e celulite ","categoria":"\u00d3leo essencial"},{"nome":"Ger\u00e2nio Egito","slug":"geranio","conteudo":"\u201cHormon-like\u201d, coadjuvante em tratamentos de regula\u00e7\u00e3o hormonal (estrog\u00eanio e testosterona), reduz sintomas da TPM, climat\u00e9rio e menopausa, menstrua\u00e7\u00e3o excessiva, seios doloridos e inchados, leucorreia, inflama\u00e7\u00e3o da pr\u00f3stata Antif\u00fangico, previne a instala\u00e7\u00e3o da candida albicans \u00d3leo essencial da feminilidade Aroma sutil, doce e floral, aporta a energia arquet\u00edpica do sagrado feminino. Ameniza depress\u00e3o na TPM, climat\u00e9rio e menopausa Combate inseguran\u00e7a, instabilidade emocional, medos, fortalece autoestima, ameniza crise existencial Regenerador cut\u00e2neo Coadjuvante em tratamentos de regula\u00e7\u00e3o da oleosidade da pele, acne Ameniza a eczema \u00datil em edemas, celulite Tornozelos e p\u00e9s inchados Antitranspirante, muito usado na confec\u00e7\u00f5es de desodorantes naturais ","categoria":"\u00d3leo essencial"},{"nome":"Ger\u00e2nio Roseum","slug":"geranio-roseum-madagascar","conteudo":"Equilibrador hormonal feminino. Acalma os sintomas da TPM, climat\u00e9rio e menopausa Relaxa o corpo e alivia tens\u00e3o pr\u00e9-menstrual, agita\u00e7\u00e3o, irritabilidade, comportamento compulsivo autodestrutivo ou medo Antidepressivo, regenerador do sistema reprodutivo feminino e do sistema nervoso Potencial estimulante linf\u00e1tico \u00d3leo essencial da amorosidade Pelargonium origina-se do grego pelargos, que significa \u201ccegonha\u201d. Aroma inebriante da sinergia entre o ger\u00e2nio e a rosa. Permite o cora\u00e7\u00e3o relaxar e sorrir cicatrizando as feridas emocionais Traz cuidado e delicadeza para a alma em momentos de instabilidade, quando nos sentimos \u00e0 flor da pele Potencial adstringente, antiss\u00e9ptico, anti-inflamat\u00f3rio e t\u00f4nico regenerador cut\u00e2neo Excelente op\u00e7\u00e3o na redu\u00e7\u00e3o de edemas ","categoria":"\u00d3leo essencial"},{"nome":"Gergelim","slug":"gergelim","conteudo":"Cont\u00e9m subst\u00e2ncias essenciais na regenera\u00e7\u00e3o e hidrata\u00e7\u00e3o da epiderme, como \u00e1cidos graxos \u00f4mega 9 e 6, vitaminas A, B e E, que recuperam a pele ressecada, irritada e danificada, aumentando sua tonicidade e firmeza. Protege os cabelos da a\u00e7\u00e3o de agentes exteriores como sol e vento, mantendo-os sedosos e com brilho natural. Na medicina Ayurveda \u00e9 usado milenarmente nos cuidados com inflama\u00e7\u00f5es articulares e reum\u00e1ticas. ","categoria":"\u00d3leo vegetal"},{"nome":"Girassol","slug":"girassol-organico","conteudo":"Excelente \u00f3leo de massagem. Pode ser usado puro ou em sinergias com \u00f3leos vegetais e essenciais. Possui uma fluidez excepcional. Fornece vantagens antioxidantes que permitem neutralizar os radicais livres que agem no envelhecimento precoce da pele. Ajuda a reduzir a perda de umidade da derme, mantendo-a hidratada. Nutre, suaviza e amacia a pele. ","categoria":"\u00d3leo vegetal"},{"nome":"Goiaba","slug":"hidrolato-de-goiaba","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Goiaba possui alta concentra\u00e7\u00e3o de vitaminas, minerais e nutrientes, que ajudam a regenerar e manter sua pele tonificada e fresca, melhorando sua textura e recuperando a rigidez. Usado para peles com manchas, acne e rugas. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Grapefruit","slug":"grapefruit","conteudo":"Diur\u00e9tico, ativa os l\u00edquidos corporais e a circula\u00e7\u00e3o linf\u00e1tica \u00fatil em dietas de emagrecimento T\u00f4nico digestivo Coadjuvante em tratamentos para combater depress\u00e3o, tristeza e falta de perspectiva \u00d3leo essencial da harmonia Aroma c\u00edtrico e suave, suas notas altas encorajam o entusiasmo restaurando a alegria de viver. Harmoniza desordens afetivas, estimulando o prazer no cuidado com o outro e consigo mesmo \u00datil em convalescen\u00e7a f\u00edsica e emocional p\u00f3s-choque, t\u00e9rmino de ciclos, rela\u00e7\u00f5es, trabalhos, projetos onde necessita-se recuperar o equil\u00edbrio gentilmente Coadjuvante em tratamentos de massagem de drenagem linf\u00e1tica para combater edemas Em lo\u00e7\u00f5es para prevenir o aparecimento de celulite Lipol\u00edtico, potencial para auxiliar a redu\u00e7\u00e3o de gordura localizada Fotossesibilizante.","categoria":"\u00d3leo essencial"},{"nome":"Ho wood","slug":"ho-wood","conteudo":"A literatura cita o potencial antiss\u00e9ptico e antimicrobiano (fungos e v\u00edrus), auxilia no al\u00edvio dos sintomas de infec\u00e7\u00e3o ginecol\u00f3gica e respirat\u00f3ria, bronquite, sinusite, cistite Ameniza dores musculares \u00d3leo essencial da coopera\u00e7\u00e3o Aroma suave e regenerador, gentilmente traz a possibilidade de abertura do cora\u00e7\u00e3o, permitindo a conex\u00e3o com a pureza essencial, onde o ego n\u00e3o tem acesso. Recupera o sistema nervoso abalado, melhorando os dist\u00farbios do sono Estimula a coopera\u00e7\u00e3o no trabalho e a pr\u00e1tica do bem comum Potencial regenerador e calmante do tecido epitelial. Aporta brilho e um aspecto saud\u00e1vel \u00e0 pele Coadjuvante no al\u00edvio de inflama\u00e7\u00f5es da pele Adicionado ao creme nutritivo facial pode auxiliar na redu\u00e7\u00e3o dos sinais do tempo Pode ser usado como desodorante natural ","categoria":"\u00d3leo essencial"},{"nome":"Hortel\u00e3 lim\u00e3o","slug":"hortela-limao","conteudo":"Acalma espasmos, tosse, c\u00f3licas Amigo dos horm\u00f4nios, \u00fatil no equil\u00edbrio hormonal feminino no per\u00edodo f\u00e9rtil, climat\u00e9rio e menopausa Abranda taquicardia Afrodis\u00edaco masculino \u00d3leo essencial do cora\u00e7\u00e3o Aroma mentolado, o mais suave de todas as mentas. Auxilia pessoas sens\u00edveis e t\u00edmidas a expressar os sentimentos guardados no cora\u00e7\u00e3o trazendo alegria e vitalidade afetiva ao centro card\u00edaco \u00datil em momentos de desequil\u00edbrio emocional Equilibra o biotipo ayurveda \u201cpitta\u201d Suaviza coceiras e irrita\u00e7\u00f5es na pele de origem nervosa Refresca o tecido cut\u00e2neo ","categoria":"\u00d3leo essencial"},{"nome":"Hortel\u00e3 pimenta","slug":"hortela-pimenta","conteudo":"Coadjuvante no al\u00edvio dos sintomas da sinusite, bronquite e rinite al\u00e9rgica Abranda m\u00e1 digest\u00e3o, \u00fatil para aliviar sintomas de n\u00e1usea, enxaqueca, labirintite Atenua os sintomas de dor muscular, entorse, luxa\u00e7\u00e3o, torcicolo, hematomas Aroma amigo para momentos onde a press\u00e3o sangu\u00ednea baixou al\u00e9m do normal Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo \u00d3leo essencial da concentra\u00e7\u00e3o Aroma herbal, fresco, estimulante da aten\u00e7\u00e3o, revigora, acorda, alivia estafa mental e esgotamento nervoso. Conduz ao estado de alerta Ameniza o fogo emocional, estabiliza as emo\u00e7\u00f5es e abranda temperamentos impulsivos e explosivos Dissipa irrita\u00e7\u00e3o e intoler\u00e2ncia, ajuda a encontrar o discernimento Suaviza o mau cheiro nos p\u00e9s, bromidose Abranda o ardor de aftas Refresca a pele, alivia coceira, dermatite e eczema al\u00e9rgico Coadjuvante em tratamentos de beleza para prevenir celulite, varizes ","categoria":"\u00d3leo essencial"},{"nome":"Hortel\u00e3 verde","slug":"hortela-verde","conteudo":"Auxilia a digest\u00e3o Afrodis\u00edaco masculino Auxilia na redu\u00e7\u00e3o da produ\u00e7\u00e3o do leite materno, sendo um aroma \u00fatil no processo de desmame Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo \u00d3leo essencial da autoestima Aroma mentolado e adocicado. Favorece a abertura do centro card\u00edaco. Traz seguran\u00e7a para vivenciar as emo\u00e7\u00f5es e coragem de ser quem se \u00e9 Suaviza a coceira da pele, alivia sintomas de sarna e picada de carrapato Coadjuvante nos cuidados de enrijecimento dos seios ","categoria":"\u00d3leo essencial"},{"nome":"Immortelle H. gymnocephalum","slug":"immortelle-h-gymnocephalum","conteudo":"Potencial analg\u00e9sico, antiss\u00e9ptico, antimicrobiano, auxilia os cuidados a v\u00edrus e bact\u00e9rias Coadjuvante para melhorar a expectora\u00e7\u00e3o do muco das vias respirat\u00f3rias Estimula o sistema imunol\u00f3gico \u00d3leo essencial do apoio emocional Aroma herb\u00e1ceo e adstringente. Equilibra as emo\u00e7\u00f5es, cura velhas feridas emocionais Acalma a raiva e auxilia o perd\u00e3o, traz apoio emocional e renova a energia Poss\u00edvel a\u00e7\u00e3o antioxidante, por\u00e9m em menor grau comparadio ao Helichrysum italicum ","categoria":"\u00d3leo essencial"},{"nome":"Immortelle H. italicum","slug":"immortelle-h-italicum","conteudo":"Fluidificante sangu\u00edneo, antifleb\u00edtico Estimulante hep\u00e1tico, acalma enxaqueca Anticatarral, expectorante e mucol\u00edtico, acalma os sintomas de rinite, bronquite, tosse espasm\u00f3dica Imunoestimulante Potencial amenizador de hematomas \u00d3leo essencial da plenitude Aroma herbal, suave e delicado, imortalizado por seus efeitos rejuvenescedores da pele e da psique. Alguns autores o consideram o \u00f3leo essencial dos \u201creinos d\u00e9vicos\u201d. Relaxante, ameniza sentimentos de medo, choque e fobias permitindo o acesso \u00e0 for\u00e7a e sabedoria interior Quebra o c\u00edrculo vicioso das emo\u00e7\u00f5es negativas desencadeando pensamentos e a\u00e7\u00f5es positivas Mundialmente conhecido e reverenciado pelo potencial protetor e regenerador da pele Utilizado por todas as boas marcas de cosm\u00e9ticos mundiais em produtos para o combate ao envelhecimento celular e prevenir o aparecimento de rugas faciais em cremes hidratantes e lo\u00e7\u00f5es de cuidados com o corpo ","categoria":"\u00d3leo essencial"},{"nome":"Jasmim","slug":"hidrolato-de-jasmim","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O hidrolato de Jasmim \u00e9 inebriante, podendo transformar drasticamente os humores depressivos, ansiosos e tristes em humor emp\u00e1tico, alegre e confiante. Extremamente afrodis\u00edaco, quando aspergido no ambiente este hidrolato estimula a libido. Tamb\u00e9m possui propriedades regenerativas e hidratantes para a pele. \u00c9 usado para suavizar peles ressecadas ou acometidas por dermatites, coceiras e rachaduras. Pode ser utilizado na hora do parto, pois as mol\u00e9culas arom\u00e1ticas do Jasmim acalmam profundamente e possuem a\u00e7\u00e3o analg\u00e9sica. Hidrolato \u00fatil em todos os momentos em que se necessita de equil\u00edbrio hormonal, como TPM, c\u00f3licas menstruais e estados vulner\u00e1veis da menopausa.","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Jasmim grandiflorum absoluto","slug":"jasmim-grandiflorum-absoluto","conteudo":"T\u00f4nico uterino, usado empiricamente para tranquilizar a sala de parto, amenizando a dor, facilitando o nascimento do beb\u00ea Ameniza a depress\u00e3o p\u00f3s-parto Acalma a dor muscular Aroma \u00fatil em caso de choques traum\u00e1ticos Aroma dos poetas Aroma floral e doce associado aos segredos da magia e da poesia. Inebria os sentidos, encantando o esp\u00edrito Incita a criatividade A regra \u201cmenos \u00e9 mais\u201d \u00e9 v\u00e1lida para os jasmins, pois seu aroma \u00e9 forte e penetrante.Desde a antiguidade \u00e9 utilizado em cremes e lo\u00e7\u00f5es corporais para melhorar a elasticidade da pele ","categoria":"\u00d3leo essencial"},{"nome":"Jasmim sambac absoluto","slug":"jasmim-sambac-absoluto","conteudo":"Aroma renovador de grande ajuda em momentos de depress\u00e3o Confortante, relaxante, \u00f3tima op\u00e7\u00e3o para aromatizar a sala do parto Usado pelas nativas filipinas para suprimir a produ\u00e7\u00e3o de leite materno Tranquiliza a mente em desgaste emocional, TPM, climat\u00e9rio e menopausa Aroma da paix\u00e3o Aroma floral e doce inspira a paix\u00e3o, feminilidade, fertilidade e romance Estimula a libera\u00e7\u00e3o de endorfinas e da libido, permitindo a entrega e o relaxamento nas rela\u00e7\u00f5es Usado para perfumar o corpo e as roupas ","categoria":"\u00d3leo essencial"},{"nome":"Jojoba","slug":"jojoba","conteudo":"Sua composi\u00e7\u00e3o bioqu\u00edmica \u00e9 muito semelhante \u00e0 estrutura qu\u00edmica das membranas epid\u00e9rmicas, o que permite que ele reforce o filme hidrolip\u00eddico e regule o fluxo de sebo da pele oleosa. Pode ser usado por todos os tipos de pele, ressecadas e desidratadas, oleosas, mistas, acneicas e inflamadas, pois potencialmente regula a produ\u00e7\u00e3o de gordura da pele. Tamb\u00e9m equilibra as gl\u00e2ndulas seb\u00e1ceas do couro cabeludo, proporcionando um aspecto vital aos cabelos, evitando sua queda. ","categoria":"\u00d3leo vegetal"},{"nome":"Jun\u00edpero","slug":"junipero","conteudo":"Acalma dores reum\u00e1tica, lombalgia, artrite, artrose, disten\u00e7\u00e3o e tor\u00e7\u00e3o articular Coadjuvante em tratamentos para eliminar \u00e1cido \u00farico, ameniza sintomas de artrite gotosa (gota) Estimula a circula\u00e7\u00e3o, contribui em dietas de desintoxica\u00e7\u00e3o Aroma revitalizante, abranda os sintomas da \u201cressaca alco\u00f3lica\u201d Acalma a dor de hemorroidas \u00d3leo essencial do \u00e2nimo Aroma folhoso, adstringente e animador que lembra pinheiros e ciprestes. Purificador ambiental Afasta o des\u00e2nimo advindo de ambientes carregados com a energia de situa\u00e7\u00f5es estressantes \u00datil para revitalizar profissionais da sa\u00fade e assist\u00eancia social Potencial antiss\u00e9ptico, adstringente e cicatrizante Coadjuvante em tratamentos em drenagem linf\u00e1tica, edemas e celulite Usado em cosm\u00e9ticos para pele congestionada e cabelos oleosos com seborr\u00e9ia ","categoria":"\u00d3leo essencial"},{"nome":"Laranja amarga","slug":"laranja-amarga","conteudo":"Estimula a circula\u00e7\u00e3o linf\u00e1tica e venosa, diur\u00e9tico suave, \u00fatil nos cuidados em varizes e celulite Tonifica o sistema nervoso na convalescen\u00e7a \u00d3leo essencial da tonifica\u00e7\u00e3o Aroma frutal e c\u00edtrico renovador e regenerador da energia ambiental. Acalma o sistema nervoso abalado. \u00datil em casos de sobrecarga emocional e ansiedade, ap\u00f3s o enfraquecimento por doen\u00e7a f\u00edsica, desperta o poder de cura interior \u00datil em momentos em que o m\u00ednimo pode ser muito Auxilia a redu\u00e7\u00e3o de edemas e celulite Regenerador cut\u00e2neo, estimula a forma\u00e7\u00e3o do col\u00e1geno Tonifica pele seca e enrugada Fotossensibilizante.","categoria":"\u00d3leo essencial"},{"nome":"Laranja doce","slug":"laranja-doce","conteudo":"Estimula a digest\u00e3o, aroma amigo dos cuidados em momentos de inapet\u00eancia Aroma agrad\u00e1vel com potencial para ajudar a despertar o apetite infantil Potencial regulador intestinal e diur\u00e9tico suave Atenua ansiedade, melhora o nervosismo e os dist\u00farbios do sono Aporta relaxamento, \u00fatil para acalmar o sistema nervoso \u00d3leo essencial das crian\u00e7as Aroma c\u00edtrico e suave, aporta leveza e tranquiliza ao ambiente. Purificador ambiental, limpa atmosferas impregnadas com negatividade, traz alegria e positivadade Acalma a hiperatividade infantil, induz ao sono reparador Coadjuvante em tratamentos de drenagem linf\u00e1tica, edemas, celulite Hidratante para todos os tipos de pele ","categoria":"\u00d3leo essencial"},{"nome":"Lavanda Bulg\u00e1ria","slug":"lavanda-bulgaria","conteudo":"\u00d3leo essencial seguro para ser usados em crian\u00e7as e beb\u00eas, acalma a agita\u00e7\u00e3o dos pequenos T\u00f4nico card\u00edaco. Apazigua taquicardia, arritmia e palpita\u00e7\u00f5es cad\u00edacas A\u00e7\u00e3o reguladora do Sistema Nervoso, relaxante, calmante e sedativo. Regula os dist\u00farbios do sono e acalma o nervosismo Nas regi\u00f5es mediterr\u00e2neas \u00e9 muito comum a cria\u00e7\u00e3o de uma sinergia com \u00f3leo essencial de lavanda, manjerona, pinho da Sib\u00e9ria, petitgrain e ho wood para trazer relaxamento no final do dia Antiespasm\u00f3dico e analg\u00e9sico, descontratante muscular, ameniza c\u00f3licas e c\u00e3ibras Este \u00f3leos essencial em sinergia com o \u00f3leo essencial de manjerona e ylang ylang apresentam potencial hipotensor \u00d3leo essencial do relaxamento Rescue da Aromaterapia Relaxa, tranquiliza e acalma. Cria uma atmosfera pac\u00edfica, segura e conciliadora incentivando a ternura e amorosidade. Combate inseguran\u00e7a, car\u00eancia afetiva e os dist\u00farbio do sono Potencial cicatrizante, antiss\u00e9ptico e anti-inflamat\u00f3rio, cuida da pele picadas por insetos, de ferimentos leves, assaduras de beb\u00ea, queimaduras leves, eczemas e acne. ","categoria":"\u00d3leo essencial"},{"nome":"Lavanda francesa","slug":"lavanda-francesa","conteudo":"Cicatrizante, antiss\u00e9ptico, analg\u00e9sico Coadjuvante no combate a espasmos, c\u00f3licas, c\u00e3ibras Usado na antiguidade em cuidados de queimaduras leves Apazigua taquicardia e palpita\u00e7\u00e3o Aporta relaxamento, \u00fatil em estados de tens\u00e3o nervosa, angustia e ansiedade Auxilia o relaxamento durante o sono com grande potencial calmante para aliviar o bruxismo dent\u00e1rio Este \u00f3leos essencial em sinergia com o \u00f3leo essencial de manjerona e ylang ylang apresentam potencial hipotensor \u00d3leo essencial do relaxamento Rescue da Aromaterapia. Relaxa, podendo sedar, acalma ang\u00fastia, choque, melhora os dist\u00farbios do sono Controla o excesso de emotividade Tranquiliza agita\u00e7\u00e3o do beb\u00ea Equilibra o biotipo ayurveda \u201cpitta\u201d Coadjuvante nos cuidados da pele, eczema, acne, proven\u00e7\u00e3o de rugas e manchas, picada de insetos, micoses, alergias, escaras, insola\u00e7\u00e3o, herpes, frieiras Acalma a dor da pele do beb\u00ea causada pela assadura ","categoria":"\u00d3leo essencial"},{"nome":"Lavanda Kashmir","slug":"lavanda-kashmir","conteudo":"Cicatrizante, antiss\u00e9ptico, analg\u00e9sico Coadjuvante no combate a espasmos, c\u00f3licas, c\u00e3ibras Usado na antiguidade em cuidados de queimaduras leves Apazigua taquicardia e palpita\u00e7\u00e3o Aporta relaxamento, \u00fatil em estados de tens\u00e3o nervosa Este \u00f3leos essencial em sinergia com o \u00f3leo essencial de manjerona e ylang ylang apresentam potencial hipotensor \u00d3leo essencial da gentileza Rescue da Aromaterapia Aroma floral, doce e delicado que incorpora a grandeza e sutileza da regi\u00e3o onde cresce e floresce: Himalayas, o teto do mundo. Carrega informa\u00e7\u00e3o de nutri\u00e7\u00e3o energ\u00e9tica, capaz de retirar o peso da tristeza ambiental Relaxa e encoraja a gentileza, n\u00e3o permitindo o alojamento da amargura e do ci\u00fames em nossos cora\u00e7\u00f5es Coadjuvante nos cuidados da pele, eczema, acne, proven\u00e7\u00e3o de rugas e manchas, picada de insetos, micoses, alergias, escaras, insola\u00e7\u00e3o, herpes, frieiras Acalma a dor em assaduras de beb\u00ea ","categoria":"\u00d3leo essencial"},{"nome":"Lavandin grosso","slug":"lavandin-grosso","conteudo":"Antiss\u00e9ptico e descongestionante respirat\u00f3rio, acalma a tosse seca e convulsiva Contribui para o relaxamento da rigidez muscular e para amenizar a dor em rompimento de tend\u00e3o \u00d3leo essencial da toler\u00e2ncia Aroma floral, doce com a energia acalentadora e protetora da M\u00e3e Terra. Aporta tranquilidade e sossego para o ambiente, acalma as emo\u00e7\u00f5es, apazigua estados de ansiedade, nervosismo e irritabilidade Cria uma atmosfera acolhedora em momentos dif\u00edceis, ajuda na pacifica\u00e7\u00e3o do \u201csangue quente\u201d, atenuando a intoler\u00e2ncia Desodorante Emoliente para pele seca e opaca Acalma rea\u00e7\u00e3o de coceira em eczema ","categoria":"\u00d3leo essencial"},{"nome":"Lemongrass","slug":"hidrolato-de-lemongrass","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Lemongrass possui o potencial de estimular a circula\u00e7\u00e3o sangu\u00ednea devido a sua propriedade vasodilatadora. \u00c9 um excelente repelente de insetos. Auxilia na emoli\u00eancia da pele, podendo atuar como coadjuvante no controle da flacidez e a celulite. Diminui a oleosidade da pele e do couro cabeludo. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Lemongrass (capim lim\u00e3o)","slug":"lemongrass-capim-limao","conteudo":"Vasodilatador leve, auxilia a controlar os estados hipertensivos Coadjuvante para cuidar de enxaqueca, ressaca e dist\u00farbios do sono Atenua a desmineraliza\u00e7\u00e3o do organismo, usado na medicina popular na preven\u00e7\u00e3o de osteoporose Coadjuvante na desintoxica\u00e7\u00e3o da ves\u00edcula biliar Atenua a dor de c\u00e3ibra \u00d3leo essencial da renova\u00e7\u00e3o Aroma doce e pungente, calmante ambiental. Elixir que cura o cora\u00e7\u00e3o ferido e magoado Em pequenas doses diminui a dispers\u00e3o e o esgotamento mental, em doses altas relaxa e seda Fortalece a pr\u00e1tica do perd\u00e3o, encoraja o perd\u00e3o dos que nos feriram e o autoperd\u00e3o, trazendo renova\u00e7\u00e3o ps\u00edquica e energ\u00e9tica Antiss\u00e9ptico, p\u00e9 de atleta Anti-inflamat\u00f3rio, usado nos cuidados para combater a celulite, t\u00f4nico muscular, flacidez Repelente de insetos ","categoria":"\u00d3leo essencial"},{"nome":"Lima da P\u00e9rsia","slug":"lima-da-persia","conteudo":"Auxilia o sono tranquilo que recupera a mente e o corpo da fadiga Pode ser \u00fatil no controle da press\u00e3o sangu\u00ednea em momentos de stress \u00d3leo essencial da Tranquilidade Tranquiliza a psique, trazendo conforto emocional e seguran\u00e7a ps\u00edquica Acalma o sistema nervoso Pode favorecer o est\u00edmulo metab\u00f3lico e promover a queima de gordura localizada Combate a fungos das unhas ","categoria":"\u00d3leo essencial"},{"nome":"Lima mexicana destilada","slug":"lima-mexicana-destilada","conteudo":"Estimula a digest\u00e3o Antiviral e antiss\u00e9ptico ambiental Coadjuvante para controlar estados de irrita\u00e7\u00e3o, nervosismo e estafa emocional \u00d3leo essencial do alto astral Aroma c\u00edtrico e doce, levanta o astral do ambiente. Alivia estados depressivos Ideal para pessoas sem persist\u00eancia que desistem rapidamente diante dos obst\u00e1culos Coadjuvante nos cuidados em varizes e preven\u00e7\u00e3o a celulite Fortalece e aporta t\u00f4nus \u00e0 pele ","categoria":"\u00d3leo essencial"},{"nome":"Lima Tahiti","slug":"lima-tahiti","conteudo":"Utilizado para estimular o sistema imunol\u00f3gico Potencial de combater microorganismos auxiliando a melhora de gengivite e aftas Acalma problemas digestivos, estimula a circula\u00e7\u00e3o sangu\u00ednea atuando como coadjuvante em problemas de hemorroidas \u00d3leo Essencial da longevidade O aroma do OE de Lima Tahiti desinfeta o ambiente de microorganismos e de pensamentos negativos Incentiva a criatividade mental, a concretiza\u00e7\u00e3o das ideias Traz sa\u00fade ps\u00edquica e longevidade \u00e0s c\u00e9lulas.Auxilia a manuten\u00e7\u00e3o das estruturas col\u00e1genas, atuando como coadjuvante em tratamentos de beleza e cuidados em varizes e flebites ","categoria":"\u00d3leo essencial"},{"nome":"Lim\u00e3o siciliano","slug":"limao-siciliano","conteudo":"Antimicrobiano a\u00e9reo. Coadjuvante na preven\u00e7\u00e3o de infec\u00e7\u00f5es respirat\u00f3rias, doen\u00e7as contagiosas e epidemias Coadjuvante em dieta de emagrecimento, auxilia a fluidifica\u00e7\u00e3o sangu\u00ednea, \u00fatil nos cuidados de hemorroidas Auxilia a amenizar os sintomas de intoxica\u00e7\u00e3o do f\u00edgado, coadjuvante nos cuidados de enxaqueca e labirintite Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo Coadjuvante nos cuidados em caso de c\u00e3ibras \u00d3leo essencial da clareza Aroma c\u00edtrico e pungente que purifica o ambiente, trazendo foco, clareza e organiza\u00e7\u00e3o. Otimiza a produtividade mental, ameniza a apatia Antiss\u00e9ptico a\u00e9reo, \u00fatil em salas de espera, escolas, hospitais, escrit\u00f3rios e quartos Estimula a microcircula\u00e7\u00e3o, auxilia na redu\u00e7\u00e3o da oleosidade na pele e cabelos, caspa, acne Hidrata a pele com varizes, flebite, trombose, edemas, celulite, circula\u00e7\u00e3o fraca ","categoria":"\u00d3leo essencial"},{"nome":"Linha\u00e7a Dourada","slug":"linhaca-dourada","conteudo":"Considerado um \u00f3leo funcional devido \u00e0 sua composi\u00e7\u00e3o rica em \u00e1cidos graxos essenciais. Hidrata a pele, tornando-se indispens\u00e1vel nos cuidados do corpo, pesco\u00e7o, m\u00e3os, p\u00e9s, calcanhares e cotovelos secos ou rachados. Pode ser usado para aliviar os sintomas de irrita\u00e7\u00e3o, secura e coceira da pele acometida por psor\u00edase e eczema. Por sua a\u00e7\u00e3o antioxidante, \u00e9 usado como coadjuvante na manuten\u00e7\u00e3o e preven\u00e7\u00e3o do envelhecimento da pele. ","categoria":"\u00d3leo vegetal"},{"nome":"L\u00edrio do brejo CO2","slug":"lirio-do-brejo-co2","conteudo":"Aroma estimulante. Cont\u00e9m alto teor de 1,8-cineol, por isso n\u00e3o deve ser usado em beb\u00eas e crian\u00e7as at\u00e9 3 anos de idade, idosos, asm\u00e1ticos e epil\u00e9ticos. Expectorante, \u00fatil em bronquite e sinusite Estimulante da circula\u00e7\u00e3o, usado na analgesia de dores articulares e musculares Usado na medicina popular por seu potencial anti-inflamat\u00f3rio e antif\u00fangico \u00d3leo essencial da pureza Aroma ideal para momentos onde se deseja uma conex\u00e3o com o mundo espiritual Aumenta a percep\u00e7\u00e3o interior, purifica o campo energ\u00e9tico, harmoniza o ambiente, favorece a medita\u00e7\u00e3o De grande aux\u00edlio em momentos de agita\u00e7\u00e3o e desequil\u00edbrio emocional onde n\u00e3o se consegue manter o foco Segundo pesquisas, o L\u00edrio brejo CO2 apresentou efic\u00e1cia antimicrobiana frente a bact\u00e9rias e fungos, apresentando tamb\u00e9m potente a\u00e7\u00e3o no combate a infesta\u00e7\u00e3o por piolhos Na cosm\u00e9tica natural tibetana usa-se esse \u00f3leo essencial em prepara\u00e7\u00f5es com esperados efeitos antioxidantes da pele ","categoria":"\u00d3leo essencial"},{"nome":"L\u00f3tus azul absoluto","slug":"lotus-azul-absoluto","conteudo":"Este aroma proporciona uma sensa\u00e7\u00e3o relaxante maravilhosa e cria sentimentos de enraizamento O aroma da sabedoria espiritual Este aroma \u00e9 muito apreciado na \u00cdndia para induzir mudan\u00e7as de padr\u00f5es vibrat\u00f3rios, pois a frequ\u00eancia desse absoluto \u00e9 muito alta, sendo por isso um aroma indicado para momentos que desejamos deixar velhos padr\u00f5es para adentrar o desconhecido com suporte energ\u00e9tico e vibrat\u00f3rio elevado Os eg\u00edpcios usavam as p\u00e9talas do l\u00f3tus azul para curar, meditar e induzir a estados alterados de consci\u00eancia e encontrar a sabedora espiritual Aplicado em conjundo com \u00f3leos vegetais, suaviza e alivia a pele eczematosa e ressecada Previne envelhecimento precoce da pele ","categoria":"\u00d3leo essencial"},{"nome":"Louro","slug":"louro","conteudo":"Estimula o apetite e a digest\u00e3o Potencial antimicrobiano, coadjuvante nos cuidados em bronquite, dor de garganta, afta, infec\u00e7\u00e3o no ouvido, sinusite, gengivite, candid\u00edase, fur\u00fanculo \u00d3leo essencial do merecimento Afasta maus pensamentos e incertezas. Ilumina as sombras da mente trazendo discernimento \u00datil na dificuldade em reconhecer e aceitar os louros da vit\u00f3ria Adstringente e t\u00f4nico cut\u00e2neo Revitalizante do couro cabeludo, \u00fatil na queda de cabelos, estimula o crescimento capilar Cicatrizante, ameniza quel\u00f3ides, marcas e sinais Potencial alerg\u00eanico.","categoria":"\u00d3leo essencial"},{"nome":"Macad\u00e2mia","slug":"macadamia","conteudo":"Rico em \u00e1cido palmitoleico, ou \u00f4mega-7, um \u00e1cido graxo com perfil qu\u00edmico pr\u00f3ximo ao da pele humana. \u00c9 imediatamente absorvido, tornando-se um excelente rejuvenescedor das peles maduras. Coadjuvante em tratamentos anti-aging e nos cuidados com peles fr\u00e1geis e irritadi\u00e7as que ficam vermelhas facilmente. Possui potencial estimulante da circula\u00e7\u00e3o linf\u00e1tica e sangu\u00ednea e por isso \u00e9 um importante aliado nos cuidados com edemas e massagens de drenagem linf\u00e1tica. ","categoria":"\u00d3leo vegetal"},{"nome":"Mandarina","slug":"mandarina","conteudo":"Estimula a digest\u00e3o Estimula o apetite infantil Atenua os sintomas do jet lag Auxilia o sono reparador \u00d3leo essencial da espontaneidade Aroma, c\u00edtrico e adocicado, traz epontaneidade e alegria ao ambiente. Abranda irrita\u00e7\u00e3o e a hiperatividade infantil Inspira tranquilidade Ampara em momentos de melancolia e depress\u00e3o Previne estrias durante adolesc\u00eancia e gesta\u00e7\u00e3o Suaviza peles \u00e1speras ","categoria":"\u00d3leo essencial"},{"nome":"Mandarina verde","slug":"mandarina-verde","conteudo":"Estimula a digest\u00e3o Estimula o apetite infantil Atenua os sintomas do jet lag Auxilia o sono reparador \u00d3leo essencial da espontaneidade Aroma c\u00edtrico e adocicado, traz espontaneidade e alegria ao ambiente. Abranda irrita\u00e7\u00e3o e a hiperatividade infantil Inspira tranquilidade Ampara em momentos de melancolia e depress\u00e3o Previne estrias durante adolesc\u00eancia e gesta\u00e7\u00e3o Suaviza peles \u00e1speras ","categoria":"\u00d3leo essencial"},{"nome":"Mandarina vermelha","slug":"mandarina-vermelha","conteudo":"Estimula a digest\u00e3o Estimula o apetite infantil Atenua os sintomas do jet lag Auxilia o sono reparador \u00d3leo essencial da espontaneidade Aroma c\u00edtrico e adocicado, traz espontaneidade e alegria ao ambiente. Abranda irrita\u00e7\u00e3o e a hiperatividade infantil Inspira tranquilidade Ampara em momentos de melancolia e depress\u00e3o Previne estrias durante adolesc\u00eancia e gesta\u00e7\u00e3o Suaviza peles \u00e1speras ","categoria":"\u00d3leo essencial"},{"nome":"Manjeric\u00e3o doce","slug":"manjericao-doce","conteudo":"Potencial antiespasm\u00f3dico e digestivo, coadjuvante nos cuidados para atenuar aerofagia, c\u00f3licas intestinais e menstruais, gases e sonol\u00eancia ap\u00f3s as refei\u00e7\u00f5es, indigest\u00e3o nervosa Pode tranquilizar e acalmar taquicardia nervosa \u00d3leo essencial da integra\u00e7\u00e3o Aroma doce, suave, harmoniza consciente e inconsciente. Integra pensar, sentir, falar e agir Traz equil\u00edbrio entre o individual e o coletivo, aporta reconhecimento e respeito para as necessidades de ambos Atenua a dualidade mat\u00e9ria e esp\u00edrito, integra os opostos Potencial anti-inflamat\u00f3rio e calmante da pele usado nos cuidados de eczema e abcesso mam\u00e1rio ","categoria":"\u00d3leo essencial"},{"nome":"Manjeric\u00e3o ex\u00f3tico","slug":"manjericao-exotico","conteudo":"Estimula a circula\u00e7\u00e3o e auxilia o descongestionamento venoso, coadjuvante nos cuidados de prostatite Atenua indigest\u00e3o de origem nervosa Potencial antiviral, preventivo de gripe e virose tropical Popularmente \u00e9 usado para amenizar os sintomas de hepatite A e B Potencial ant\u00e1lgico, apazigua cefal\u00e9ia e enxaqueca, ameniza dores reum\u00e1ticas, artrite, tendinite Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo \u00d3leo essencial da estabilidade Aroma doce, levemente condimentar, t\u00f4nico e revitalizante ambiental. Auxilia a estabiliza\u00e7\u00e3o da energia vital p\u00f3s doen\u00e7as \u00datil no al\u00edvio do esgotamento mental daqueles que se esgotam e sacrificam-se para servir aos outros e esquecem de si mesmo Equilibra o biotipo ayurveda \u201ckapha\u201d Coadjuvante em tratamento de inflama\u00e7\u00f5es epiteliais ","categoria":"\u00d3leo essencial"},{"nome":"Manjeric\u00e3o santo (Tulsi)","slug":"manjericao-santo-tulsi","conteudo":"Antiespasm\u00f3dico, coadjuvante em cuidados para aliviar a indigest\u00e3o nervosa Promove a limpeza de toxinas do trato respirat\u00f3rio, ameniza os sintomas de bronquite Reduz dores de cabe\u00e7a e os sintomas de sinusite Diminui a tens\u00e3o nervosa e contra\u00e7\u00e3o muscular Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo \u00d3leo essencial do sagrado A rainha das plantas, uma j\u00f3ia arom\u00e1tica origin\u00e1ria da \u00cdndia onde \u00e9 considerada sagrada e fundamental para o desenvolvimento espiritual. Aroma herb\u00e1ceo, doce e pungente. Purifica o ambiente, instaurando a t\u00e3o sonhada paz interior Possibilita o equil\u00edbrio entre a realidade espiritual e a material Tem qualidades antioxidantes e anti-envelhecimento ","categoria":"\u00d3leo essencial"},{"nome":"Manjerona","slug":"manjerona","conteudo":"Potencial analg\u00e9sico, ameniza a dor lombar, artrite, artrose, reumatismo Nutre e equilibra o sistema nervoso, reduz o stress Ameniza sintomas de taquicardia, palpita\u00e7\u00e3o e arritmia decorrentes de stress e ansiedade Coadjuvante nos cuidados ao hipertireoidismo Aporta relaxamento, \u00fatil em estados hipertensivos Auxilia o relaxamento durante o sono com grande potencial calmante para aliviar o bruxismo dent\u00e1rio \u00d3leo essencial do afeto Aroma doce, acalma as emo\u00e7\u00f5es, transmite paz a quem sofre, resgata e conforta o cora\u00e7\u00e3o ferido. \u201cM\u00e3e Geradora\u201d, fortalece a internaliza\u00e7\u00e3o do arqu\u00e9tipo da m\u00e3e interior acalentando a crian\u00e7a interna. Reconforta quem n\u00e3o viveu o amor materno Libera mem\u00f3rias de traumas, solid\u00e3o e abandono, auxilia a express\u00e3o do afeto Acalenta a alma e a psique nos momentos de solitude dos idosos Potencial antiss\u00e9ptico Alivia aftas Usado como coadjuvante para atenuar a dor em casos de otite Ameniza os sintomas de rinite e sinusite al\u00e9rgica ","categoria":"\u00d3leo essencial"},{"nome":"Maracuj\u00e1","slug":"maracuja","conteudo":"A presen\u00e7a de componentes antioxidantes como o licopeno, torna o \u00f3leo de maracuj\u00e1 um excelente calmante para a irrita\u00e7\u00e3o da pele. Um grande aliado da pele oleosa, com consagradas propriedades reguladoras da oleosidade. Excelente op\u00e7\u00e3o para hidratar a \u00e1rea dos olhos combatendo tamb\u00e9m a flacidez das p\u00e1lpebras. Especialmente \u00fatil na hidrata\u00e7\u00e3o de cabelos oleosos, contribuindo para dar volume e leveza, incentivando seu crescimento saud\u00e1vel. ","categoria":"\u00d3leo vegetal"},{"nome":"May chang","slug":"may-chang","conteudo":"Atenua arritmia card\u00edaca, palpita\u00e7\u00e3o, taquicardia Acalma a ansiedade e a depress\u00e3o \u00d3leo essencial da prece Suaviza a sensa\u00e7\u00e3o de desamparo, inseguran\u00e7a e temor Ameniza a dispers\u00e3o, facilita o foco Fortalece o magnetismo pessoal Moderador de crises de p\u00e2nico Adicionado a um ve\u00edculo carreador (creme, gel, \u00f3leo vegetal), ameniza os sintomas de dermatites Potencial moderador da oleosidade da pele e couro cabeludo Mau-h\u00e1lito Mal cheiro nos p\u00e9s, bromidrose ","categoria":"\u00d3leo essencial"},{"nome":"Menta brasileira","slug":"menta-brasileira","conteudo":"Desobstrui as vias respirat\u00f3rias, amenizando a congest\u00e3o nasal, os sintomas de tosse, sinusite, rinite al\u00e9rgica, alivia o mal estar respirat\u00f3rio do in\u00edcio de gripes Acalma n\u00e1useas, auxilia nos enj\u00f4os em tratamentos quimioter\u00e1picos e durante a gesta\u00e7\u00e3o Analg\u00e9sico, atenua a dor muscular e de luxa\u00e7\u00e3o Alivia enxaqueca Melhora a mem\u00f3ria e a concentra\u00e7\u00e3o Potencial vasoconstritor, usado para amenizar os sintomas de sonol\u00eancia e letargia da hipotens\u00e3o Atenua o mal de transporte, terrestre, a\u00e9reo e mar\u00edtimo \u00d3leo essencial do despertar Aroma mentolado refrescante, estimula os sentidos, revitaliza e melhora a concentra\u00e7\u00e3o. Ameniza o cansa\u00e7o Auxilia a descontra\u00e7\u00e3o e despreocupa\u00e7\u00e3o antes de provas, palestras, entregas de projetos, monografias, cirurgias, entrevistas, cria uma atmosfera motivadora Acalma a ansiedade que dificulta o desempenho das tarefas com seguran\u00e7a e tranquilidade Adicionado a um ve\u00edculo carreador (creme, gel, \u00f3leo vegetal) traz frescor a pele ap\u00f3s exposi\u00e7\u00e3o solar Ativa a circula\u00e7\u00e3o do couro cabeludo, diminuindo a queda dos cabelos ","categoria":"\u00d3leo essencial"},{"nome":"Mirra","slug":"mirra","conteudo":"Anti-inflamat\u00f3rio, usado para acalmar a dor de artrite, artrose, bursite Alivia os sintomas da leucorr\u00e9ia Regulador end\u00f3crino, atua como coadjuvante para amenizar os sintomas causados pela hiperestrogenia, pode ajudar a reduzir o fluxo menstrual Antif\u00fangico leve \u00d3leo essencial da maturidade Aroma terroso, resinoso, equilibra as emo\u00e7\u00f5es. Ajuda a reflex\u00e3o, amenizando o medo do desconhecido e o apego emocional Equilibra as emo\u00e7\u00f5es e estrutura a psiqu\u00ea, prepara o ser para a fase madura da alma Fortalece a aceita\u00e7\u00e3o da a\u00e7\u00e3o do tempo Potencial antioxidante, combate os radicais livres, regenerador cut\u00e2neo, hidrata e retarda o envelhecimento precoce da pele, rejuvenesce a pele madura Recupera a pele lesionada por picadas de carrapato e alergias ","categoria":"\u00d3leo essencial"},{"nome":"N\u00e9roli","slug":"neroli","conteudo":"Potencial neurot\u00f4nico, equilibrador psicoemocional, tradicionalmente utilizado para cuidar dos dist\u00farbios do sono, tanto de adultos, como de crian\u00e7as Acalma a ansiedade e ameniza sintomas de indigest\u00e3o nervosa e palpita\u00e7\u00f5es card\u00edacas Apresenta a\u00e7\u00e3o analg\u00e9sica e anti-inflamat\u00f3ria, com potencial hipotensor Afrodis\u00edaco Harmoniza o sistema end\u00f3crino feminino, \u00fatil nos cuidados dos sintomas da menopausa e TPM \u00d3leo essencial da sensibilidade Ansiol\u00edtico, ameniza a hipersensibilidade em momentos de dificuldade de adapta\u00e7\u00e3o a novas situa\u00e7\u00f5es \u00datil em fobias, s\u00edndrome do p\u00e2nico, estados depressivos, agita\u00e7\u00e3o e irritabilidade Auxilia no desenvolvimento do amor-pr\u00f3prio A sinergia das suas mol\u00e9culas trazem um aroma de felicidade, bom humor e otimismo. \u00c9 considerado um ca\u00e7ador de ideias sombrias e do pessimismo Age como regenerador celular, indicado para peles maduras, sens\u00edveis e ressecadas Recupera o tecido com fragilidade capilar e cicatrizes. Usado em cosm\u00e9ticos para prevenir estrias Potencial flebot\u00f4nico e linfot\u00f4nico, excelente para massagear pernas inchadas e doloridas ","categoria":"\u00d3leo essencial"},{"nome":"Noz moscada","slug":"noz-moscada","conteudo":"Digestivo, atenua os sintomas da diarreia \u00c9 usado na medicina ayurv\u00e9dica no combate aos vermes T\u00f4nico sexual, atua na impot\u00eancia e frigidez Potencial emenagogo, reduz o stress na sala de parto \u00d3leo essencial do entusiasmo Aroma pungente, picante com notas baixas que lembram as especiarias orientais. Animador, traz alegria e entusiasmo ao ambiente Eleva o astral Alivia a letargia Antiss\u00e9ptico ","categoria":"\u00d3leo essencial"},{"nome":"Ojon","slug":"ojon","conteudo":"O \u00fanico \u00f3leo de origem vegetal que possui a mesma constitui\u00e7\u00e3o da queratina do cabelo. \u00c9 rico em amino\u00e1cidos e antioxidantes naturais que protegem os fios das agress\u00f5es di\u00e1rias. Aporta for\u00e7a e prote\u00e7\u00e3o aos cabelos que receberam colora\u00e7\u00e3o ou outras qu\u00edmicas, secador, chapinha, exposi\u00e7\u00e3o frequente aos raios solares e polui\u00e7\u00e3o ambiental. Excelente emoliente, previne o ressecamento capilar, devolvendo o brilho e a maciez natural aos seus cabelos. ","categoria":"\u00d3leo vegetal"},{"nome":"Ol\u00edbano","slug":"olibano","conteudo":"Potencial expectorante, acalma a tosse com catarro. Estudos apontam a\u00e7\u00e3o descongestionante respirat\u00f3ria, atenuando os sintomas de bronquite, asma e resfriados Coadjuvante no tratamento de bursite, rigidez articular T\u00f4nico uterino, regula o fluxo menstrual \u00d3leo essencial da medita\u00e7\u00e3o Aroma profundo, resinoso, purificador. Cria um ambiente prop\u00edcio \u00e0 rever\u00eancia ao sagrado, facilita a medita\u00e7\u00e3o, pacifica a mente, despertando a espiritualidade Pode oferecer bons resultados no tratamento de doen\u00e7as psicossom\u00e1ticas Potencial antioxidante e citofil\u00e1tico, rejuvenesce, cicatriza, atua na preven\u00e7\u00e3o de rugas. Adicionado ao creme facial e m\u00e1scaras cosm\u00e9ticas de rejuvenescimento, pode reduzir os sinais do tempo e de express\u00f5es, proporcionando vitalidade \u00e0 pele madura Acalma a pele inflamada ","categoria":"\u00d3leo essencial"},{"nome":"Or\u00e9gano","slug":"oregano","conteudo":"Pesquisas recentes atestam o potencial antimicrobiano (bactericida, antiviral, fungicida) e anti-infeccioso deste \u00f3leo essencial, com a\u00e7\u00e3o no sistema respirat\u00f3rio, urin\u00e1rio e epitelial Usado na medicina popular para acalmar os sintomas da sinusite, amigdalite, bronquite e infec\u00e7\u00e3o urin\u00e1ria T\u00f4nico digestivo e carminativo Potencial imunoestimulante \u00d3leo essencial da defesa Aroma pungente, adstringente que incita a defesa ps\u00edquica. Em sinergia com hortel\u00e3 pimenta e manjerona, ameniza a energia mental negativa, acalmando o ci\u00fames Em sinergia com ger\u00e2nio, suaviza os sintomas de doen\u00e7as psicossom\u00e1ticas e dist\u00farbios emocionais em idade avan\u00e7ada \u00datil em micoses de unha e frieiras Potencial redutor de verrugas ","categoria":"\u00d3leo essencial"},{"nome":"Palmarosa","slug":"palmarosa","conteudo":"Potencial antimicrobiano, coadjuvante em tratamentos de micoses, pano branco, c\u00e2ndida, cistite, otite Potencial estimulante da imunidade T\u00f4nico uterino, usado em sala de parto para facilitar os procedimentos Neurot\u00f4nico, citado na bibliografia como estimulante do apetite para quem sofre por anorexia nervosa Estimula a circula\u00e7\u00e3o dos l\u00edquidos corporais, \u00fatil na drenagem linf\u00e1tica \u00d3leo essencial da beleza Aroma doce que lembra rosas, acalenta, alegra e descontrai o ambiente. Sensibiliza o ser da import\u00e2ncia do cultivo do amor pr\u00f3prio, da beleza interna e externa Aquece o cora\u00e7\u00e3o e cria abertura para a valoriza\u00e7\u00e3o do essencial como a lealdade e fidelidade nas rela\u00e7\u00f5es Antioxidante, citofil\u00e1tico, aporta beleza, hidrata\u00e7\u00e3o e suavidade \u00e0 pele Antiss\u00e9ptico, coadjuvante no tratamento de escaras, p\u00e9 de atleta Estimula o equil\u00edbrio natural da oleosidade da pele, equilibrando tanto a pele seca, como a oleosa Acalma sintomas cut\u00e2neos de impetigo, candid\u00edase, micose inguinal, psor\u00edase ","categoria":"\u00d3leo essencial"},{"nome":"Palmarosa","slug":"hidrolato-de-palmarosa","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Palmarosa possui intensas propriedades hidratantes e umectantes que trazem beleza e suavidade \u00e0 pele. Possui uma potente a\u00e7\u00e3o regeneradora. Usado para os cuidados com a pele seca e com acnes. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Palo santo","slug":"palo-santo","conteudo":"Estimula a resposta imunol\u00f3gica em casos de gripes e resfriados Anti-inflamat\u00f3rio articular, ameniza a dor reum\u00e1tica Previne infec\u00e7\u00f5es do trato geniturin\u00e1rio \u00d3leo essencial da paz Aroma pungente, refrescante, doce e animador, promotor da paz e da uni\u00e3o. Aporta purifica\u00e7\u00e3o ambiental, leva embora a tristeza, os pensamentos negativos e seus imprints do ambiente Incentiva a criatividade e a concentra\u00e7\u00e3o Pode promover resposta anti-inflamat\u00f3ria em picadas de mosquitos ","categoria":"\u00d3leo essencial"},{"nome":"Patchouli","slug":"patchouli","conteudo":"Regula o apetite compulsivo, auxilia dietas de emagrecimento, coadjuvante em tratamentos de combate a obesidade Cicatrizante, anti-inflamat\u00f3rio Descongestionante venoso, coadjuvante em cuidados a varizes, hemorr\u00f3idas, prostatite \u00d3leo essencial da ousadia Aroma herbal, almiscarado, amadeirado, diminui a ansiedade, estabiliza e sacia a psiqu\u00ea. Fortalece a busca por objetivos e sonhos, estimulando o senso de idealismo, coragem e ousadia Cria espa\u00e7o para aventuras em novos caminhos Indicado para pessoas que desejam libertar-se de v\u00edcios e compuls\u00f5es Afrodis\u00edaco Hidrata a pele ressecada Usado em formula\u00e7\u00f5es para acalmar inflama\u00e7\u00f5es da pele, coceira, psor\u00edase, urtic\u00e1ria, dermatite, calcanhar rachado e cotovelos ressecados Coadjuvante nos cuidados na reten\u00e7\u00e3o de l\u00edquidos, edemas, preven\u00e7\u00e3o de celulite e flacidez ","categoria":"\u00d3leo essencial"},{"nome":"Pau Rosa","slug":"pau-rosa","conteudo":"Eficaz em casos de dist\u00farbios do sono Atenua as mudan\u00e7as de humor ocasionadas pela menopausa, s\u00edndrome pr\u00e9-menstrual e depress\u00e3o \u00d3leo essencial da autoestima Elimina sentimentos de frustra\u00e7\u00e3o e ansiedade, trazendo em seu lugar autoestima elevada, calma e confian\u00e7a Resgata a autoestima e o amor pr\u00f3prio, estimulando o romance e a libido Fornece uma vis\u00e3o espiritual da vida e relaxa a mente Estimula a elasticidade da pele, excelente op\u00e7\u00e3o nos cuidados faciais e corporais Usado em massagem de drenagem linf\u00e1tica Muito utilizado para os cuidados da pele cansada, fr\u00e1gil, irritada e desvitalizada Combate os sinais do tempo (rugas), trazendo brilho, vida e beleza para sua pele facial ","categoria":"\u00d3leo essencial"},{"nome":"Pau Rosa","slug":"hidrolato-de-pau-rosa","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O hidrolato de Pau rosa \u00e9 um b\u00e1lsamo para os sentidos. Promove um ambiente de sedu\u00e7\u00e3o, eleg\u00e2ncia e refinamento. Com este aroma no ar restauramos o otimismo e a alegria. Com propriedades t\u00f4nicas para o sistema nervoso, este hidrolato pode auxiliar a transmutar estados de des\u00e2nimo e letargia em estados de disposi\u00e7\u00e3o e determina\u00e7\u00e3o. Para a pele \u00e9 uma excelente op\u00e7\u00e3o quando utilizado em m\u00e1scaras faciais para renovar a express\u00e3o facial, reduzir e prevenir o aparecimento de rugas. Sua a\u00e7\u00e3o antiss\u00e9ptica poder\u00e1 ser muito valiosa no combate \u00e0 acne e \u00e0 ros\u00e1cea. Este hidrolato carrega as propriedades presentes na mol\u00e9cula de linalol, tornando-o um poderoso antimicrobiano.","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Petitgrain","slug":"petitgrain","conteudo":"Relaxante, acalma, seda, alivia depress\u00e3o Atenua taquicardia e arritmia, asma nervosa, dispn\u00e9ia Antiespasm\u00f3dico, combate c\u00f3lica menstrual \u00d3leo essencial do equil\u00edbrio Aroma folhoso e adstringente que acalma os pensamentos. Auxilia a retirada do foco mental do problema, trazendo a energia do cora\u00e7\u00e3o para as situa\u00e7\u00f5es conflitantes Alivia dor emocional e tristeza causadas por decep\u00e7\u00f5es Harmoniza as emo\u00e7\u00f5es, ameniza a depress\u00e3o, inspira a autoconfian\u00e7a Equilibra o biotipo ayurveda \u201cvata\u201d Regenerador cut\u00e2neo, cicatrizante, coadjuvante em tratamentos no combate a oleosidade da pele, acne Poss\u00edvel potencial antif\u00fangico, l\u00edquen plano ","categoria":"\u00d3leo essencial"},{"nome":"Pimenta preta","slug":"pimenta-preta","conteudo":"Estimula o metabolismo, ameniza os sintomas de hipotireoidismo e hipotens\u00e3o Aquece a musculatura e as extremidades, queima calorias, coadjuvante em tratamentos de emagrecimento Potencial anti-inflamat\u00f3rio e analg\u00e9sico, usado para amenizar a dor muscular, fibromialgia, torcicolo, reumatismo, dor de cabe\u00e7a, cefal\u00e9ia Ativa a circula\u00e7\u00e3o, diur\u00e9tico, estimula as fun\u00e7\u00f5es renais \u00d3leo essencial da vitalidade Aroma quente e picante, estimula a produ\u00e7\u00e3o de endorfinas. Revitaliza e alivia depress\u00e3o Afrodis\u00edaco, aumenta a sensualidade e o apetite sexual Otimiza a tomada de decis\u00f5es e a a\u00e7\u00e3o Indicado para pessoas apreensivas e preocupadas que precisam de for\u00e7a para as transforma\u00e7\u00f5es Ativa a circula\u00e7\u00e3o corporal e do couro cabeludo, cuida de p\u00e9s e m\u00e3os frias, combate a queda de cabelos, evita calv\u00edcie precoce Usado em shampos para cabelos oleosos e com as pontas ressecadas ","categoria":"\u00d3leo essencial"},{"nome":"Pimenta rosa","slug":"pimenta-rosa","conteudo":"Melhora a circula\u00e7\u00e3o sangu\u00ednea e ajuda nos cuidados e preven\u00e7\u00e3o de varizes e flebite \u00datil para cuidar de pancadas e luxa\u00e7\u00f5es Descongestionante respirat\u00f3rio \u00d3leo essencial da prosperidade Aroma quente e picante relaxa a tens\u00e3o mental e desperta o corpo para o prazer do toque. Desinibe aqueles que tem vergonha do corpo Aporta o sentimento de merecimento da riqueza do universo, permitindo a entrada da prosperidade em nossas vidas Potencial antif\u00fangico, antiss\u00e9ptico, adstringente, \u00fatil em tratamentos de acne Possivel antioxidante ","categoria":"\u00d3leo essencial"},{"nome":"Pinheiro silvestre","slug":"pinheiro-silvestre","conteudo":"Excelente op\u00e7\u00e3o para o al\u00edvio da congest\u00e3o respirat\u00f3ria Protege o ambiente contra \u00e1caros, fungos Pode apresentar a\u00e7\u00e3o diur\u00e9tica, coadjuvante em tratamentos no combate a edemas e excesso de \u00e1cido \u00farico Muito usado no enxague final na m\u00e1quina de lavar.\u00d3leo essencial da produtividade Aroma de folhas, lembra uma floresta, refresca, limpa, purifica e desodoriza o ambiente. Ativa o sentimento de alerta, clareza e produtividade Dissipa a preocupa\u00e7\u00e3o e o cansa\u00e7o Promove o bem-estar no inverno para toda a fam\u00edlia Coadjuvante no tratamento de eczema, psor\u00edase, coceira Acalma a irrita\u00e7\u00e3o cut\u00e2nea acometida por sarna ou picadas de pulgas Auxilia o tratamento no combate a piolhos ","categoria":"\u00d3leo essencial"},{"nome":"Pinho da Sib\u00e9ria","slug":"pinho-da-siberia","conteudo":"Antiss\u00e9ptico e anti-inflamat\u00f3rio pulmonar. Tem demonstrado bons resultados como coadjuvante nos cuidados em bronquite, asma, pneumonia, tosse, gripe, resfriado, rinite, sinusite e congest\u00e3o respirat\u00f3ria Previne epidemias de inverno \u00d3leo essencial do acolhimento Aroma adstringente, nos remete \u00e0s florestas, trazendo a sensa\u00e7\u00e3o de \u201cvolta para casa\u201d, de acolhimento original. Aporta generosidade e aceita\u00e7\u00e3o, acalma o cora\u00e7\u00e3o oprimido Ajuda eliminar o pesar e a tristeza dos ambientes, incentivando a irmandade Auxilia as pessoas a sentirem-se confort\u00e1veis em qualquer situa\u00e7\u00e3o \u00datil em momentos de opress\u00e3o e autopuni\u00e7\u00e3o que impedem a abertura para receber ajuda Potencial antimicrobiano, antif\u00fangico, antiviral, antibacteriano ","categoria":"\u00d3leo essencial"},{"nome":"Pitanga","slug":"hidrolato-de-pitanga","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Pitanga possui alta concentra\u00e7\u00e3o de vitamina C e intensa a\u00e7\u00e3o adstringente, podendo regular a produ\u00e7\u00e3o excessiva da oleosidade. \u00c9 indicado para combater a oleosidade da pele e do couro cabeludo, sendo tamb\u00e9m um potente antioxidante e anti-aging. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Plai","slug":"plai","conteudo":"T\u00f4nico geral Poss\u00edvel anti-inflamat\u00f3rio, \u00fatil em inflama\u00e7\u00e3o articular e muscular, contus\u00e3o, entorse e dor muscular Potencial analg\u00e9sico, antioxidante, antiss\u00e9ptico, antiviral e antimicrobiano Pesquisas apontam para a capacita\u00e7\u00e3o antif\u00fangica deste \u00f3leo essencial Repelente natural de insetos \u00d3leo essencial do conforto articular e muscular Permite a conex\u00e3o com novos pontos de vista, trazendo flexibilidade e perspectiva Estimulante do \u00e2nimo e da energia pessoal, ameniza rigidez emocional Por sua conceituada a\u00e7\u00e3o anti-inflamat\u00f3ria, antioxidante e antif\u00fangica, \u00e9 utilizado para os cuidados em inflama\u00e7\u00f5es articulares e cut\u00e2neas, como tamb\u00e9m em lo\u00e7\u00f5es, gel ou \u00f3leos arom\u00e1ticos para a preven\u00e7\u00e3o de micoses ","categoria":"\u00d3leo essencial"},{"nome":"Pracax\u00ed","slug":"pracaxi","conteudo":"Com altas concentra\u00e7\u00f5es de vitamina E, apresenta a\u00e7\u00e3o anti-inflamat\u00f3ria e antiss\u00e9ptica natural. Usado popularmente nos cuidados com manchas escuras, acne, psor\u00edase, assaduras e controle da caspa e queda dos cabelos. Melhora a apar\u00eancia de estrias j\u00e1 formadas e previne seu aparecimento na gesta\u00e7\u00e3o e adolesc\u00eancia. Facilita o penteado de cabelos rebeldes aumentando sua lisura e suavidade. ","categoria":"\u00d3leo vegetal"},{"nome":"Preta","slug":"argila-preta","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. A argila preta \u00e9 a mais nobre das argilas. Conhecida como lama negra \u00e9 rica em importantes minerais como di\u00f3xido de sil\u00edcio e tit\u00e2nio. Excelente agente rejuvenescedor. Utilizada na renova\u00e7\u00e3o e beleza da pele e cabelos. Usada principalmente em peles e cabelos oleosos.","categoria":"Argila"},{"nome":"Ravensara","slug":"ravensara","conteudo":"Potencial antiviral e anti-infeccioso. \u00datil em afec\u00e7\u00f5es respirat\u00f3rias, febre, gripe, bronquite, sinusite, rinite, congest\u00e3o nasal, catarro e herpes Possivel imunoestimulante \u00d3leo essencial da expans\u00e3o Aroma canforado, expande a mente, amplia os limites das possibilidades Cicatrizante, ameniza os efeitos cut\u00e2neos da acne Potencial redutor de verrugas em animais ","categoria":"\u00d3leo essencial"},{"nome":"Ravintsara qt. cineol","slug":"ravintsara","conteudo":"Potencial antiss\u00e9ptico, antiviral, expectorante, anti-infeccioso e neurot\u00f4nico Por conter altas concentra\u00e7\u00f5es de 1,8-cineol, n\u00e3o aconselha-se usar em crian\u00e7as e sim em adultos. \u00datil em afec\u00e7\u00f5es respirat\u00f3rias de adultos, gripe, febre, bronquite, sinusite, rinite e tosse Coadjuvante no combate ao v\u00edrus influenza \u00d3leo essencial da comunica\u00e7\u00e3o Poderosa a\u00e7\u00e3o de purifica\u00e7\u00e3o ambiental Estimula o sistema nervoso, aporta concentra\u00e7\u00e3o e foco Dinamizador no chakra lar\u00edngeo, melhora a capacidade de comunica\u00e7\u00e3o Potencial antimicrobiano, antif\u00fangico, antiviral, antibacteriano ","categoria":"\u00d3leo essencial"},{"nome":"Rosa","slug":"argila-rosa","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. A argila rosa re\u00fane propriedades revitalizantes da argila vermelha com a suavidade da branca. Resulta em uma argila leve e emoliente para peles delicadas e sens\u00edveis. Usada nos cuidados de beleza para hidrata\u00e7\u00e3o e limpeza da pele. Devolve o brilho natural da pele e cabelos. ","categoria":"Argila"},{"nome":"Rosa damascena absoluto","slug":"rosa-damascena-absoluto","conteudo":"Potencial antidepressivo, sedativo, melhora o sono Antibacteriano, cicatrizante, anti-inflamat\u00f3rio Antiespasm\u00f3dico, emenagogo, equilibrador hormonal durante a TPM e menopausa (calor\u00f5es), equilibra o sistema reprodutivo feminino Aroma do sagrado feminino Aroma doce, suave, renomado como um dos aromas mais apreciados no mundo. Facilita a cura do corpo emocional e espiritual. Harmoniza o chakra card\u00edaco, incita o perd\u00e3o e o amor pr\u00f3prio, energeticamente equilibra as quest\u00f5es relacionadas a maternidade, amor incondicional, feminilidade e perdas Acalma raiva, irritabilidade, apatia e desapontamento. Aporta clareza em situa\u00e7\u00f5es confusas que desencadeiam comportamento compulsivo Auxilia a transmuta\u00e7\u00e3o de choques emocionais, tristeza e depress\u00e3o. Acalma o sentimento de impot\u00eancia Aporta o sentimento de amor para o ambiente Potencial antioxidante, anti-aging, citofil\u00e1tico Usado em formula\u00e7\u00f5es cosm\u00e9ticas para restaurar a vitalidade da pele madura Perfuma a pele ","categoria":"\u00d3leo essencial"},{"nome":"Rosa Mosqueta","slug":"rosa-mosqueta","conteudo":"Mundialmente conhecido por usa a\u00e7\u00e3o regeneradora da pele. Usado em tratamentos dermatol\u00f3gicos, na atenua\u00e7\u00e3o de cicatrizes e de sinais faciais como rugas, em eczemas, psor\u00edase, peles ressecadas, desvitalizadas e acneicas. Seu uso di\u00e1rio em cuidados faciais apresenta efeitos antioxidantes e anti-envelhecimento e frequentemente \u00e9 utilizado em cosm\u00e9ticos naturais para a pele madura. ","categoria":"\u00d3leo vegetal"},{"nome":"Salsa sementes","slug":"salsa-sementes","conteudo":"Potencial e emenagogo, auxilia os cuidados da amenorreia e oligomenorreia Diur\u00e9tico e coadjuvante durante processos de desintoxica\u00e7\u00e3o Pode apresentar a\u00e7\u00e3o fluidificante, anticatarral e mucol\u00edtica Acalma espasmos, \u00fatil em dores musculares, c\u00e3ibras, asma Apresenta efeitos digestivos e carminativos, auxilia a elimina\u00e7\u00e3o de gases \u00d3leo essencial da masculinidade Aroma caloroso, amadeirado, picante-doce usado e apreciado na perfumaria masculina Potencial anti-inflamat\u00f3rio, auxilia a acalmar a dor muscular, reum\u00e1tica e articular Muito utilizado na cosm\u00e9tica para os cuidados com o corpo ","categoria":"\u00d3leo essencial"},{"nome":"S\u00e1lvia sclarea","slug":"salvia-sclarea","conteudo":"Atenua dist\u00farbios hormonais femininos, TPM, c\u00f3lica menstrual, seios doloridos e inchado, sintomas da pr\u00e9-menopausa, fogachos, considerado popularmente como um repositor hormonal natural na menopausa, \u201cStrogen-like\u201d Emenagogo, aroma companheiro do parto \u00d3leo essencial apreciado pelos chineses para cuidar da infertilidade Relaxante nervoso Acalma os picos de press\u00e3o alta na menopausa T\u00f4nico geral, usado em convalescen\u00e7a e cansa\u00e7o cr\u00f4nico, gerado por stress prolongado Flebot\u00f4nico, coadjuvante para hemorroidas e varizes \u00d3leo essencial da mulher Aroma aconchegante, associado a sabedoria e a capacidade de promover vida longa. Resgata a autoimagem positiva e a feminilidade inspirando o amor pr\u00f3prio Estimula a autoconfian\u00e7a quando h\u00e1 vulnerabilidade e fragilidade Alivia depress\u00e3o e crise de p\u00e2nico \u00datil para resgatar a libido feminina Ativa a circula\u00e7\u00e3o do couro cabeludo, evita a queda e estimula o crescimento dos cabelos Auxilia a retardar o envelhecimento da pele Controla a transpira\u00e7\u00e3o excessiva de p\u00e9s e m\u00e3os ","categoria":"\u00d3leo essencial"},{"nome":"S\u00e2ndalo amyris","slug":"sandalo-amyris","conteudo":"Ajuda a descongestionar os vasos linf\u00e1ticos e venosos, \u00fatil nos cuidados de varizes e hemorroidas Potencial antiss\u00e9ptico, usado pelos nativos do Haiti em compressas na recupera\u00e7\u00e3o do per\u00edneo da mulher p\u00f3s parto Potencial expectorante e antiespasm\u00f3dico, acalma tosse e laringite \u00d3leo essencial da sensualidade Aroma doce e quente com notas baixas que amenizam a tens\u00e3o nervosa. Eleva o esp\u00edrito, incentiva a abertura do cora\u00e7\u00e3o, estimulando a sexualidade sagrada nos relacionamentos Afrodis\u00edaco, desperta o desejo sexual feminino e masculino Coadjuvante em tratamentos de s\u00edndrome de p\u00e2nico \u00datil em rachaduras na pele, dermatites, eczema Coadjuvante no tratamento de edemas e preven\u00e7\u00e3o a celulite Potencial coagulante do sangue, \u00fatil em pequenos cortes Usado como fixador na perfumaria natural","categoria":"\u00d3leo essencial"},{"nome":"Sangue de drag\u00e3o","slug":"sangue-de-dragao","conteudo":"Potencial antimicrobiano \u00fatil para estancar sangramentos e cicatrizar feridas, \u00falceras varicosas e escaras Potencial para uso em diab\u00e9ticos com dificuldade em cicatriza\u00e7\u00e3o \u00datil no sangramento de gengivas Os ind\u00edgenas da Amaz\u00f4nia usam em banho de assento e ducha vaginal no pr\u00e9-parto para assepsia e no p\u00f3s-parto para cicatriza\u00e7\u00e3o Seiva medicinal da floresta Um elixir t\u00e3o poderoso produzido pela natureza. Aporta o sentimento de gratid\u00e3o pela m\u00e3e terra em amparar seus filhos com tamanha generosidade curativa.Promove a forma\u00e7\u00e3o do col\u00e1geno, reduz rugas, rejuvenesce e protege a pele contra o envelhecimento precoce ","categoria":"\u00d3leo essencial"},{"nome":"Semente de Ab\u00f3bora","slug":"semente-de-abobora","conteudo":"Rico em carotenoides e antioxidantes, combate os radicais livres, atuando na preven\u00e7\u00e3o da desvitaliza\u00e7\u00e3o cut\u00e2nea e na forma\u00e7\u00e3o de manchas na pele. Cont\u00e9m \u00e1cidos graxos e vitaminas com a\u00e7\u00e3o umectante, que proporcionam maciez e brilho \u00e0 pele \u00e1spera. Indicado para corpo, rosto, m\u00e3os, p\u00e9s, calcanhares, cotovelos secos ou rachados e unhas quebradi\u00e7as. Excelente no tratamento de cabelos secos, quebradi\u00e7os e sem brilho. Deixa os cabelos fortes, macios, brilhantes e f\u00e1ceis de pentear. ","categoria":"\u00d3leo vegetal"},{"nome":"Semente de Uva","slug":"semente-de-uva-organico","conteudo":"Suas qualidades regenerativas e nutritivas para a pele o tornam ideal para o uso em peles sens\u00edveis e delicadas. Apresenta em sua composi\u00e7\u00e3o \u00f4mega 9 e 6, alto teor de vitamina E (tocoferol) e procianidina, todos antioxidantes naturais que fazem desse \u00f3leo um excelente coadjuvante contra a a\u00e7\u00e3o de radicais livres e envelhecimento celular. Usado em todos os tipos de pele, principalmente para peles de crian\u00e7as, idosos e para a realiza\u00e7\u00e3o da Shantala: massagem para beb\u00eas. ","categoria":"\u00d3leo vegetal"},{"nome":"Sinergia Vegetal","slug":"sinergia-vegetal","conteudo":"Sinergia de \u00f3leos vegetais para massagem e hidrata\u00e7\u00e3o corporal Sugerimos uma sinergia de \u00f3leos vegetais pensando em custo\/benef\u00edcio para o massagista, ou para quem hidrata a pele di\u00e1ria e naturalmente. Chegamos a conclus\u00e3o de que a sinergia entre o \u00f3leo vegetal de Girassol, Jojoba e Semente de Uva seria a ideal. Esses \u00f3leos possuem propriedades regeneradoras, nutritivas, hidratantes e s\u00e3o facilmente absorvidos pela pele. Sendo os \u00f3leos de semente de uva e girassol leves, de f\u00e1cil assimila\u00e7\u00e3o e boa espalhabilidade na pele, e o de jojoba uma excelente op\u00e7\u00e3o para manter a estabilidade da sinergia. Pode ser usado puro ou aromatizado com \u00f3leos essenciais de sua escolha. ","categoria":"\u00d3leo vegetal"},{"nome":"Tangerina","slug":"tangerina","conteudo":"Potencial antiespasm\u00f3dico, auxilia a elimina\u00e7\u00e3o de gases e ameniza c\u00f3licas infantis Ajuda a digest\u00e3o, aperiente Estimula o apetite infantil Ameniza a hiperatividade infantil, agita\u00e7\u00e3o e ang\u00fastia da crian\u00e7a na aus\u00eancia dos pais \u00d3leo essencial da alegria Aroma c\u00edtrico e doce descompromissado que alegra o ambiente. Diminui a ansiedade e o nervosismo, cria uma atmosfera espont\u00e2nea e descontra\u00edda Auxilia pessoas s\u00e9rias e carrancudas a resgatarem o sorriso contagiante e o bem estar Bom para crian\u00e7as agitadas e briguentas e tamb\u00e9m para adultos irritados e mal-humorados Coadjuvante em tratamento de preven\u00e7\u00e3o a celulite Suavizante da pele ","categoria":"\u00d3leo essencial"},{"nome":"Tea tree","slug":"tea-tree","conteudo":"Cicatrizante, antibacteriano, antiviral, antif\u00fangico, anti-infeccioso, usado nos cuidados de pequenos ferimentos, herpes Fungicida, coadjuvante na preven\u00e7\u00e3o e cuidados na candid\u00edase Potencial febr\u00edfugo e imunoestimulante, \u00fatil nas afec\u00e7\u00f5es respirat\u00f3rias \u00d3leo essencial antiss\u00e9ptico Renova, refresca, purifica e protege o ambiente Desinfetante Usado pelos abor\u00edgenes australianos em formula\u00e7\u00f5es cosm\u00e9ticas para o combate a caspa, pele irritada, acne \u00datil nos cuidados a micoses, frieira, escara, psor\u00edase, herpes Aftas, gengivite Utilizado em formula\u00e7\u00f5es de lo\u00e7\u00e3o p\u00f3s-depilat\u00f3ria e p\u00f3s-barba ","categoria":"\u00d3leo essencial"},{"nome":"Tea Tree","slug":"hidrolato-de-tea-tree","conteudo":"As \u00e1guas florais e os hidrolatos s\u00e3o produtos muito suaves. Isso \u00e9 o que os difere dos OE, que s\u00e3o altamente concentrados.\u00a0 Por isso, podem ser usados diretamente na pele sem necessidade de dilui\u00e7\u00e3o. Podem ser aplicados em peles fr\u00e1geis, sens\u00edveis e delicadas. S\u00e3o especialmente \u00fateis para a pele de beb\u00eas, idosos, convalescentes ou peles danificadas. Os hidrolatos s\u00e3o j\u00f3ias raras para a pele, utilizados como t\u00f4nicos faciais, corporais e capilares. Trazem conforto e bem estar para todos os tipos de pele. Podem ser usados como perfume ambiental, nos cuidados com a pele e em substitui\u00e7\u00e3o a \u00e1gua deionizada em formula\u00e7\u00f5es cosm\u00e9ticas. O Hidrolato de Tea Tree tem potencial antif\u00fangico, antibacteriano e anti-s\u00e9ptico. Combate a oleosidade da pele e do couro cabeludo, proporcionando mais brilho e hidrata\u00e7\u00e3o. Possui ainda a\u00e7\u00e3o t\u00f4nica capilar e pode agir como anti-caspa. Ajuda como coadjuvante no tratamento de diversas dermatites, picadas de insetos e pequenos ferimentos de humanos e animais. ","categoria":"Hidrolatos (\u00e1guas florais)"},{"nome":"Tea tree lim\u00e3o","slug":"tea-tree-limao","conteudo":"Tem demonstrado uma potente a\u00e7\u00e3o antiss\u00e9ptica, usado como coadjuvante em cuidados nas infec\u00e7\u00f5es respirat\u00f3rias Potencial analg\u00e9sico, anti-inflamat\u00f3rio articular e muscular Auxilia em dist\u00farbios digestivos e em incha\u00e7os O perfume da assepsia O \u00f3leo essencial de Tea tree lim\u00e3o possui um aroma sutil, fresco e c\u00edtrico. Apresenta potencial sedativo semelhante ao \u00f3leo essencial de Lemongrass Pode acalmar e relaxar, ajudando a conter o nervosismo de forma suave Restaura o otimismo Apresenta potentes propriedades antiss\u00e9pticas, sendo \u00fatil no tratamento diversos problemas de pele como micoses, psor\u00edase e alergias ","categoria":"\u00d3leo essencial"},{"nome":"Tomilho qt. linalol","slug":"tomilho-qt-linalol","conteudo":"Potencial anti-infeccioso, antimicrobiano, \u00fatil para combater a bact\u00e9rias, v\u00edrus e fungos. \u00d3leo essencial mais seguro para o uso infantil do que o tomilho qt. timol Coadjuvante nos cuidados em infec\u00e7\u00f5es respirat\u00f3rias Pode estimular a imunidade T\u00f4nico nervoso, \u00fatil na depress\u00e3o infantil Ant\u00e1lgico, atenua dores musculares e reum\u00e1ticas \u00d3leo essencial da adolesc\u00eancia Aroma herbal, doce, mais suave e menos dermoagressivo que o qt. timol. Possui elevada concentra\u00e7\u00e3o de linalol. Auxilia pessoas introvertidas, adolescentes t\u00edmidos com medo e dificuldade de comunica\u00e7\u00e3o Estimula a energia vital e o \u00e2nimo do adolescente diante da realiza\u00e7\u00e3o das tarefas Coadjuvante nos cuidados da pele acn\u00e9ica do adolescente ","categoria":"\u00d3leo essencial"},{"nome":"Tomilho qt. timol","slug":"tomilho-qt-timol","conteudo":"Potencial antimicrobiano, anti-infeccioso, \u00fatil para combater a bact\u00e9rias, v\u00edrus e fungos Coadjuvante nos cuidados em infec\u00e7\u00f5es respirat\u00f3rias, bronquite, sinusite, rinite Pode estimular a imunidade Ativa a digest\u00e3o, t\u00f4nico geral p\u00f3s-infec\u00e7\u00e3o \u00d3leo essencial da coragem Aroma herbal, pungente, combate a fraqueza e a falta de \u00e2nimo. Encoraja o posicionamento, desperta o guerreiro interior Aporta for\u00e7a em situa\u00e7\u00f5es que parecem ser intranspon\u00edveis ou que sentimos que n\u00e3o conseguiremos dar conta Antimicrobiano, usado nos cuidados em frieiras Fixador de perfumes","categoria":"\u00d3leo essencial"},{"nome":"Turm\u00e9rico","slug":"turmerico","conteudo":"Potencial estimulante imunol\u00f3gico, \u00fatil para amenizar sintomas de doen\u00e7as autoimunes Agente antimicrobiano usado na medicina ayurv\u00e9dica na preven\u00e7\u00e3o a c\u00e1ries Potencial anti-inflamat\u00f3rio articular, \u00fatil para amenizar a dor e inflama\u00e7\u00e3o em tendinite, rompimento de ligamentos e tend\u00f5es, recupera\u00e7\u00e3o de fratura \u00f3ssea Acalma tosse, faringite \u00d3leo essencial do aqui e agora Aroma terroso e picante. Auxilia o contato com a realidade, aterriza os p\u00e9s no ch\u00e3o, aporta \u201cgrounding\u201d, trazendo a mente para o momento presente, aqui e agora. Acalma confus\u00e3o e ansiedade Limpa e desintoxica a pele oleosa Por suas propriedades antioxidantes, \u00e9 utilizado na cosm\u00e9tica para os cuidados da pele em geral ","categoria":"\u00d3leo essencial"},{"nome":"Verbena \u00edndia","slug":"verbena-india","conteudo":"Ameniza estados depressivos Estimula a disgest\u00e3o Analg\u00e9sico, acalma c\u00f3licas intestinais e uterinas Auxilia o relaxamento durante o sono com grande potencial calmante para aliviar o bruxismo dent\u00e1rio \u00d3leo essencial do bem-estar Aroma doce e suave que envolve o ambiente com a delicadeza energ\u00e9tica feminina, aconchegando e amparando. Acalma o nervosismo do ambiente Considerado um dos \u00f3leos essenciais mais tranquilizantes da ansiedade, panaceia para acalmar tens\u00e3o nervosa, e inquieta\u00e7\u00e3o Equilibra o biotipo ayurveda \u201cPitta\u201d Potencial sedativo, melhora os dist\u00farbios do sono O teor de linalol na sua constitui\u00e7\u00e3o qu\u00edmica, aporta a esse \u00f3leo essencial um potencial calmante e cicatrizante para a pele ","categoria":"\u00d3leo essencial"},{"nome":"Verde","slug":"argila-verde","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. Possui a\u00e7\u00e3o adstringente e tonificante. Auxilia na redu\u00e7\u00e3o e controle da oleosidade excessiva. Limpa profundamente a pele e cabelos devolvendo o equil\u00edbrio natural. Usada em todos os tipos de peles e cabelos, principalmente os oleosos. ","categoria":"Argila"},{"nome":"Vermelha","slug":"argila-vermelha","conteudo":"As argilas s\u00e3o um dos ve\u00edculos mais poderosos de utiliza\u00e7\u00e3o dos \u00f3leos essenciais. A argila vermelha \u00e9 rica em ferro e hematita, minerais respons\u00e1veis pela cor avermelhada. Tonifica a pele ressecada e opaca fortalecendo sua elasticidade. Possui a\u00e7\u00e3o anti-aging. Intensifica a renova\u00e7\u00e3o celular e a microcircula\u00e7\u00e3o. Pode ser usada como esfoliante em m\u00e1scaras faciais e corporais. ","categoria":"Argila"},{"nome":"Vetiver","slug":"vetiver","conteudo":"Suporte hormonal feminino p\u00f3s-parto e menopausa A\u00e7\u00e3o estimulante da libido e reguladora de sintomas femininos da pr\u00e9-menopausa e dist\u00farbios menstruais como TPM e dismenorreia T\u00f4nico venoso e arterial, atenua a fragilidade dos capilares, coadjuvante nos cuidados a varizes, flebite, edemas, hemorroidas Alivia dores articulares e melhora a imunidade Pesquisas demonstram que pode ter efeitos na regula\u00e7\u00e3o da press\u00e3o sangu\u00ednea e no ac\u00famulo de l\u00edquidos nos tecidos durante o climat\u00e9rio e menopausa \u00d3leo essencial do enraizamento Aroma terroso, profundo, suas notas baixas relaxam a estafa nervosa do ambiente. Enraizador, \u00fatil para pessoas facilmente influenci\u00e1veis, que constroem \u201ccastelos no ar\u201d, que n\u00e3o concretizam os sonhos. Equilibra o biotipo ayurveda \u201cvata\u201d Fortalece a conex\u00e3o com os objetivos, cria uma atmosfera prop\u00edcia ao processo de interioriza\u00e7\u00e3o Coadjuvante no desmame medicamentoso Melhora os dist\u00farbios do sono Potencial antioxidante, usado na conserva\u00e7\u00e3o de cosm\u00e9ticos naturais. Umectante da pele seca e madura \u00datil no cuidado de varizes, hemorroidas e estrias Usado para cuidados de urtic\u00e1ria Fixador de perfumes.","categoria":"\u00d3leo essencial"},{"nome":"Wintergreen","slug":"wintergreen","conteudo":"Potencial ant\u00e1lgico e anti-inflamat\u00f3rio, calmante da dor muscular, reum\u00e1tica, artrite, artrose, bursite, dor lombar, entorse, ligamento rompido, tendinite, fratura \u00f3ssea, LER, mialgias, dor de cabe\u00e7a Estimulante da digest\u00e3o e da energia hep\u00e1tica Poss\u00edvel hipotensor leve \u00d3leo essencial do aquecimento Aroma doce, adstringente, quente e pungente. Origin\u00e1rio de regi\u00f5es frias, aquece o corpo e a alma, favorece a humaniza\u00e7\u00e3o nas rela\u00e7\u00f5es. Estimula a energia vital Massagem esportiva, aquece a musculatura, com potencial de a\u00e7\u00e3o na atenua\u00e7\u00e3o da dor e inflama\u00e7\u00e3o muscular e articular ","categoria":"\u00d3leo essencial"},{"nome":"Ylang ylang","slug":"ylang-ylang","conteudo":"Potencial cardiot\u00f4nico, pode acalmar a arritmia card\u00edaca, palpita\u00e7\u00e3o e taquicardia T\u00f4nico uterino p\u00f3s-parto Ameniza depress\u00e3o p\u00f3s-parto e crises de p\u00e2nico Potencial relaxante e hipotensor leve \u00d3leo essencial da sedu\u00e7\u00e3o O aroma doce e suave que enternece o cora\u00e7\u00e3o despertando a aprecia\u00e7\u00e3o da vida. Cria atmosfera de romance, desperta a sensualidade, a libido e a paix\u00e3o Incita a celebra\u00e7\u00e3o e suaviza a irrita\u00e7\u00e3o Ameniza frigidez e impot\u00eancia Potencial suavizante e tonificante da pele Hidrata a pele seca T\u00f4nico capilar, \u00fatil na alop\u00e9cia ","categoria":"\u00d3leo essencial"},{"nome":"Ylang ylang completo","slug":"ylang-ylang-completo","conteudo":"O ylang ylang completo \u00e9 resultado de 20h de destila\u00e7\u00e3o ininterrupta, sem fracionamento. Todos as fra\u00e7\u00f5es do \u00f3leo essencial, principalmente a do ylang ylang completo, possuem a\u00e7\u00e3o afrodis\u00edaca. O seu aroma inspira a sensualidade Impulsiona a libido feminina e masculina Pode ser de grande valia para idosos em sintomas como dor muscular e articular devido \u00e0 imobilidade Regula o fluxo de adrenalina, acalma ansiedade, tens\u00e3o nervosa, s\u00edndrome do p\u00e2nico e medo, choque emocional, palpita\u00e7\u00f5es e taquicardia Usado para regular os horm\u00f4nios femininos, \u00fatil na TPM, climat\u00e9rio e menopausa Poss\u00edvel hipotensor \u00d3leo essencial da sedu\u00e7\u00e3o Afrodis\u00edaco, combate a fraqueza sexual, ativando a libido. Estimula o amor-pr\u00f3prio, o carinho para consigo mesmo. Desbloqueia o plexo solar, alivia a ang\u00fastia advinda de preocupa\u00e7\u00f5es e ansiedade T\u00f4nico cut\u00e2neo e capilar, auxilia a preven\u00e7\u00e3o da seborreia D\u00e1 brilho aos cabelos opacos e sem vida ","categoria":"\u00d3leo essencial"},{"nome":"Yuzu","slug":"yuzu","conteudo":"Excelente op\u00e7\u00e3o nos cuidados com resfriados e gripes. Descongestionante respirat\u00f3rio em gripes ou alergias sazonais Refrescante e t\u00f4nico corporal, estimula o sistema circulat\u00f3rio Promove um apetite saud\u00e1vel e estimula a digest\u00e3o Fortalece as defesas naturais do organismo, reduzindo dores e inflama\u00e7\u00f5es Alivia espasmos musculares Usado tradicionalmente no Jap\u00e3o como antif\u00fangico, \u00fatil no combate a candid\u00edase \u00d3leo essencial da revitaliza\u00e7\u00e3o Acalma e energiza Alivia humores depressivos e a tens\u00e3o emocional Recicla a energia estagnada e bloqueada Ameniza dist\u00farbios do sono e ansiedade Afasta tristeza, desperta alegria e bem-estar Antiss\u00e9ptico e antibacteriano, combate a oleosidade do couro cabeludo, \u00fatil para caspa D\u00e1 brilho aos fios, prevenindo o ressecamento das pontas Potencial antioxidante, muito apreciado na cosm\u00e9tica natural japonesa ","categoria":"\u00d3leo essencial"}]');

	var dataHelpFor = JSON.parse('{"Afrodis\u00edaco":{"Benjoim":"benjoim","Manjerona":"manjerona"},"Afta":{"Copa\u00edba b\u00e1lsamo":"copaiba-balsamo","Cravo bot\u00e3o":"cravo-botao","Cravo folha":"cravo-folha","Manjerona":"manjerona","Sangue de drag\u00e3o":"sangue-de-dragao","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao"},"Agita\u00e7\u00e3o infantil":{"Camomila romana":"camomila-romana","Laranja doce":"laranja-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir"},"Alergia":{"Camomila alem\u00e3 (azul)":"camomila-alema-azul","Cenoura sementes":"cenoura-sementes","Chia":"chia","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Menta brasileira":"menta-brasileira"},"Animar":{"Alecrim Pimenta":"alecrim-pimenta","Alecrim qt. cineol":"alecrim-qt-cineol","Bergamota LFC":"bergamota-lfc","Caf\u00e9 torrado":"cafe-torrado","Cardamomo":"cardamomo","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Mandarina":"mandarina","Mandarina verde":"mandarina-verde","Mandarina vermelha":"mandarina-vermelha","Noz moscada":"noz-moscada","Tangerina":"tangerina","Tea tree lim\u00e3o":"tea-tree-limao","Tomilho qt. linalol":"tomilho-qt-linalol","Yuzu":"yuzu"},"Ansiedade":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","\u00c2mbar resin\u00f3ide":"ambar","Anis estrelado":"anis-estrelado","Bergamota":"bergamota","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cacau absoluto":"cacau-absoluto","Camomila alem\u00e3 (azul)":"camomila-alema-azul","Camomila romana":"camomila-romana","Cedro Himalaya":"cedro-himalaya","Champaca Absoluto":"champaca-absoluto","Coentro sementes":"coentro-sementes","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Ger\u00e2nio Roseum":"geranio-roseum-madagascar","Hortel\u00e3 lim\u00e3o":"hortela-limao","Hortel\u00e3 verde":"hortela-verde","Jasmim grandiflorum absoluto":"jasmim-grandiflorum-absoluto","Laranja doce":"laranja-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Lavandin grosso":"lavandin-grosso","Lima mexicana destilada":"lima-mexicana-destilada","L\u00f3tus azul absoluto":"lotus-azul-absoluto","Mandarina":"mandarina","Mandarina verde":"mandarina-verde","Mandarina vermelha":"mandarina-vermelha","Manjeric\u00e3o doce":"manjericao-doce","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","May chang":"may-chang","N\u00e9roli":"neroli","Palmarosa":"palmarosa","Palo santo":"palo-santo","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Rosa damascena absoluto":"rosa-damascena-absoluto","S\u00e1lvia sclarea":"salvia-sclarea","S\u00e2ndalo amyris":"sandalo-amyris","Tomilho qt. linalol":"tomilho-qt-linalol","Verbena \u00edndia":"verbena-india","Vetiver":"vetiver","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo"},"Antioxidante":{"Algod\u00e3o":"algodao","Bar\u00fa":"baru","Buriti":"buriti","Chia":"chia","Cipreste":"cipreste","Coco":"coco","Damasco":"damasco","Girassol":"girassol-organico","Immortelle H. gymnocephalum":"immortelle-h-gymnocephalum","Immortelle H. italicum":"immortelle-h-italicum","Jojoba":"jojoba","Macad\u00e2mia":"macadamia","Maracuj\u00e1":"maracuja","Mirra":"mirra","Ojon":"ojon","Ol\u00edbano":"olibano","Patchouli":"patchouli","Rosa Mosqueta":"rosa-mosqueta","Semente de Ab\u00f3bora":"semente-de-abobora","Semente de Uva":"semente-de-uva-organico"},"Assadura infantil":{"Camomila alem\u00e3 (azul)":"camomila-alema-azul","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Pracax\u00ed":"pracaxi","Semente de Uva":"semente-de-uva-organico"},"ATM - Bruxismo":{"Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Manjerona":"manjerona"},"Autoestima":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Bergamota":"bergamota","Canela casca":"canela-casca","Canela folha":"canela-folha","Cardamomo":"cardamomo","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Champaca Absoluto":"champaca-absoluto","Cipreste":"cipreste","Gengibre":"gengibre","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Ger\u00e2nio Roseum":"geranio-roseum-madagascar","Hortel\u00e3 lim\u00e3o":"hortela-limao","Laranja doce":"laranja-doce","Lima mexicana destilada":"lima-mexicana-destilada","L\u00f3tus azul absoluto":"lotus-azul-absoluto","Manjerona":"manjerona","May chang":"may-chang","Mirra":"mirra","N\u00e9roli":"neroli","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Pimenta rosa":"pimenta-rosa","S\u00e1lvia sclarea":"salvia-sclarea","Tomilho qt. linalol":"tomilho-qt-linalol","Vetiver":"vetiver","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo"},"Cabelos - Brilho":{"Argan":"argan","Caf\u00e9 verde":"cafe-verde","Camomila romana":"camomila-romana","Castanha do Brasil":"castanha-do-brasil","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Coco":"coco","Gergelim":"gergelim","Hortel\u00e3 verde":"hortela-verde","Jojoba":"jojoba","Jun\u00edpero":"junipero","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Louro":"louro","Ojon":"ojon","S\u00e1lvia sclarea":"salvia-sclarea","Semente de Ab\u00f3bora":"semente-de-abobora","Tea tree":"tea-tree","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo"},"Cabelos - Caspa":{"Alecrim qt. cineol":"alecrim-qt-cineol","Lim\u00e3o siciliano":"limao-siciliano","Pracax\u00ed":"pracaxi","Tea tree":"tea-tree"},"Cabelos - Oleosidade":{"Alecrim Pimenta":"alecrim-pimenta","Alecrim qt. cineol":"alecrim-qt-cineol","Bergamota":"bergamota","Cedro Atlas":"cedro-atlas","Cipreste":"cipreste","Ger\u00e2nio Egito":"geranio","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lemongrass (capim lim\u00e3o)":"lemongrass-capim-limao","Maracuj\u00e1":"maracuja","Patchouli":"patchouli","S\u00e1lvia sclarea":"salvia-sclarea","Tea tree":"tea-tree","Vetiver":"vetiver","Ylang ylang completo":"ylang-ylang-completo","Yuzu":"yuzu"},"Cabelos - Queda":{"Alecrim qt. cineol":"alecrim-qt-cineol","Argan":"argan","Bergamota LFC":"bergamota-lfc","Caf\u00e9 verde":"cafe-verde","Coco":"coco","Jojoba":"jojoba","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Louro":"louro","Pracax\u00ed":"pracaxi","S\u00e1lvia sclarea":"salvia-sclarea","Ylang ylang":"ylang-ylang"},"Cabelos - Ressecamento":{"Andiroba":"andiroba","Argan":"argan","Buriti":"buriti","Castanha do Brasil":"castanha-do-brasil","Cedro Atlas":"cedro-atlas","Cipreste":"cipreste","Coco":"coco","Ger\u00e2nio Egito":"geranio","Gergelim":"gergelim","Jojoba":"jojoba","Ojon":"ojon","Patchouli":"patchouli","S\u00e1lvia sclarea":"salvia-sclarea","Semente de Ab\u00f3bora":"semente-de-abobora","Tea tree":"tea-tree","Vetiver":"vetiver","Yuzu":"yuzu"},"Celulite":{"Anis estrelado":"anis-estrelado","Bar\u00fa":"baru","Bergamota":"bergamota","Bergamota LFC":"bergamota-lfc","Castanha do Brasil":"castanha-do-brasil","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Chia":"chia","Cipreste":"cipreste","Damasco":"damasco","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Laranja doce":"laranja-doce","Macad\u00e2mia":"macadamia"},"C\u00f3lica infantil":{"Funcho doce":"funcho-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir"},"C\u00f3lica menstrual":{"Anis estrelado":"anis-estrelado","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","S\u00e1lvia sclarea":"salvia-sclarea"},"Concentra\u00e7\u00e3o":{"Alecrim qt. cineol":"alecrim-qt-cineol","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Caf\u00e9 torrado":"cafe-torrado","Espruce negro":"espruce-negro","Eucalipto globulus":"eucalipto-globulus","Gengibre":"gengibre","Gengibre fresco":"gengibre-fresco","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2"},"Congest\u00e3o nasal":{"Alecrim qt. cineol":"alecrim-qt-cineol","Cipreste":"cipreste","Eucalipto globulus":"eucalipto-globulus","Hortel\u00e3 pimenta":"hortela-pimenta","Lavandin grosso":"lavandin-grosso","Lim\u00e3o siciliano":"limao-siciliano","Pinho da Sib\u00e9ria":"pinho-da-siberia","Tea tree":"tea-tree"},"Depress\u00e3o":{"Ajowan":"ajowan","Alecrim qt. cineol":"alecrim-qt-cineol","Alecrim qt. verbenona":"alecrim-qt-verbenona","B\u00e1lsamo do Peru":"balsamo-do-peru","Benjoim":"benjoim","Bergamota":"bergamota","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cacau absoluto":"cacau-absoluto","Caf\u00e9 torrado":"cafe-torrado","C\u00e1lamo":"calamo","Camomila romana":"camomila-romana","Cardamomo":"cardamomo","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Champaca Absoluto":"champaca-absoluto","Coentro sementes":"coentro-sementes","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Ger\u00e2nio Roseum":"geranio-roseum-madagascar","Grapefruit":"grapefruit","Ho wood":"ho-wood","Hortel\u00e3 lim\u00e3o":"hortela-limao","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Jasmim grandiflorum absoluto":"jasmim-grandiflorum-absoluto","Jasmim sambac absoluto":"jasmim-sambac-absoluto","Laranja doce":"laranja-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lima da P\u00e9rsia":"lima-da-persia","Lima mexicana destilada":"lima-mexicana-destilada","L\u00f3tus azul absoluto":"lotus-azul-absoluto","Mandarina":"mandarina","Mandarina verde":"mandarina-verde","Mandarina vermelha":"mandarina-vermelha","Manjeric\u00e3o doce":"manjericao-doce","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Manjerona":"manjerona","May chang":"may-chang","Menta brasileira":"menta-brasileira","N\u00e9roli":"neroli","Ol\u00edbano":"olibano","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Petitgrain":"petitgrain","Ravintsara qt. cineol":"ravintsara","Rosa damascena absoluto":"rosa-damascena-absoluto","S\u00e1lvia sclarea":"salvia-sclarea","S\u00e2ndalo amyris":"sandalo-amyris","Tangerina":"tangerina","Tomilho qt. linalol":"tomilho-qt-linalol","Verbena \u00edndia":"verbena-india","Vetiver":"vetiver"},"Detox":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","C\u00e1lamo":"calamo","Cardamomo":"cardamomo","Cenoura sementes":"cenoura-sementes","Coentro sementes":"coentro-sementes","Gengibre":"gengibre","Gengibre fresco":"gengibre-fresco","Hortel\u00e3 pimenta":"hortela-pimenta","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano","Menta brasileira":"menta-brasileira","Salsa sementes":"salsa-sementes"},"Digest\u00e3o":{"Ajowan":"ajowan","Anis estrelado":"anis-estrelado","Caf\u00e9 torrado":"cafe-torrado","C\u00e1lamo":"calamo","Camomila alem\u00e3 (azul)":"camomila-alema-azul","Camomila romana":"camomila-romana","Canela casca":"canela-casca","Cardamomo":"cardamomo","Cenoura sementes":"cenoura-sementes","Coentro sementes":"coentro-sementes","Cravo bot\u00e3o":"cravo-botao","Funcho doce":"funcho-doce","Gengibre":"gengibre","Gengibre fresco":"gengibre-fresco","Grapefruit":"grapefruit","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Laranja amarga":"laranja-amarga","Laranja doce":"laranja-doce","Lemongrass (capim lim\u00e3o)":"lemongrass-capim-limao","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano","Louro":"louro","Manjeric\u00e3o doce":"manjericao-doce","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Menta brasileira":"menta-brasileira","Noz moscada":"noz-moscada","Or\u00e9gano":"oregano","Pimenta preta":"pimenta-preta","Pimenta rosa":"pimenta-rosa","Salsa sementes":"salsa-sementes","Tangerina":"tangerina","Tea tree lim\u00e3o":"tea-tree-limao","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol","Verbena \u00edndia":"verbena-india","Yuzu":"yuzu"},"Dor":{"Alecrim qt. c\u00e2nfora":"alecrim-qt-canfora","B\u00e9tula doce":"betula-doce","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cajeput":"cajeput","Canela folha":"canela-folha","C\u00e2nfora branca":"canfora-branca","Coentro sementes":"coentro-sementes","Cravo bot\u00e3o":"cravo-botao","Cravo folha":"cravo-folha","Erva Baleeira":"erva-baleeira","Espruce negro":"espruce-negro","Eucalipto citriodora":"eucalipto-citriodora","Eucalipto globulus":"eucalipto-globulus","Immortelle H. italicum":"immortelle-h-italicum","Jun\u00edpero":"junipero","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Louro":"louro","Manjerona":"manjerona","Mirra":"mirra","N\u00e9roli":"neroli","Palo santo":"palo-santo","Pimenta preta":"pimenta-preta","Plai":"plai","Tea tree lim\u00e3o":"tea-tree-limao","Tomilho qt. timol":"tomilho-qt-timol","Turm\u00e9rico":"turmerico","Wintergreen":"wintergreen"},"Dor de cabe\u00e7a":{"Hortel\u00e3 pimenta":"hortela-pimenta","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Lim\u00e3o siciliano":"limao-siciliano","S\u00e1lvia sclarea":"salvia-sclarea"},"Dor de dente":{"Cravo bot\u00e3o":"cravo-botao"},"Dor de garganta":{"Copa\u00edba destilada":"copaiba-destilada","Gengibre fresco":"gengibre-fresco","Lim\u00e3o siciliano":"limao-siciliano","Tea tree":"tea-tree"},"Dor muscular e articular":{"Alecrim qt. c\u00e2nfora":"alecrim-qt-canfora","B\u00e9tula doce":"betula-doce","Canela folha":"canela-folha","C\u00e2nfora branca":"canfora-branca","Cravo bot\u00e3o":"cravo-botao","Erva Baleeira":"erva-baleeira","Eucalipto globulus":"eucalipto-globulus","Eucalipto staigeriana":"eucalipto-staigeriana","Gengibre fresco":"gengibre-fresco","Lavandin grosso":"lavandin-grosso","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Plai":"plai","Wintergreen":"wintergreen"},"Enj\u00f4o":{"Lim\u00e3o siciliano":"limao-siciliano","Menta brasileira":"menta-brasileira","Yuzu":"yuzu"},"Enraizamento":{"Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Vetiver":"vetiver"},"Estrias":{"Am\u00eandoa doce":"amendoa-doce","Bar\u00fa":"baru","Macad\u00e2mia":"macadamia","Mandarina":"mandarina","Pracax\u00ed":"pracaxi","Rosa Mosqueta":"rosa-mosqueta","Vetiver":"vetiver"},"Feminino":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Anis estrelado":"anis-estrelado","Bergamota":"bergamota","Canela casca":"canela-casca","Coentro sementes":"coentro-sementes","Ger\u00e2nio Egito":"geranio","Ger\u00e2nio Roseum":"geranio-roseum-madagascar","Immortelle H. italicum":"immortelle-h-italicum","Manjerona":"manjerona","Mirra":"mirra","N\u00e9roli":"neroli","Palmarosa":"palmarosa","Patchouli":"patchouli","Rosa damascena absoluto":"rosa-damascena-absoluto","S\u00e1lvia sclarea":"salvia-sclarea","Vetiver":"vetiver","Ylang ylang":"ylang-ylang"},"Fitness":{"Cacau absoluto":"cacau-absoluto","Caf\u00e9 verde":"cafe-verde","C\u00e1lamo":"calamo","Cedro Atlas":"cedro-atlas","Cravo bot\u00e3o":"cravo-botao","Funcho doce":"funcho-doce","Gengibre":"gengibre","Grapefruit":"grapefruit","Jun\u00edpero":"junipero","Lim\u00e3o siciliano":"limao-siciliano","Patchouli":"patchouli","Pimenta preta":"pimenta-preta"},"Hemorr\u00f3ida":{"Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Lim\u00e3o siciliano":"limao-siciliano","Patchouli":"patchouli","Pracax\u00ed":"pracaxi","S\u00e2ndalo amyris":"sandalo-amyris","Sangue de drag\u00e3o":"sangue-de-dragao"},"Herpes labial":{"Copa\u00edba b\u00e1lsamo":"copaiba-balsamo","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Ravensara":"ravensara","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao"},"Inapet\u00eancia infantil":{"Laranja doce":"laranja-doce","Mandarina":"mandarina","Mandarina verde":"mandarina-verde","Mandarina vermelha":"mandarina-vermelha","Tangerina":"tangerina"},"Insetos":{"Am\u00eandoa doce":"amendoa-doce","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Citronela":"citronela","Copa\u00edba b\u00e1lsamo":"copaiba-balsamo","Copa\u00edba destilada":"copaiba-destilada","Cravo bot\u00e3o":"cravo-botao","Eucalipto citriodora":"eucalipto-citriodora","Eucalipto staigeriana":"eucalipto-staigeriana","Ger\u00e2nio Egito":"geranio","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Mirra":"mirra","Palmarosa":"palmarosa","Patchouli":"patchouli","Plai":"plai","Tea tree lim\u00e3o":"tea-tree-limao"},"Libido":{"Anis estrelado":"anis-estrelado","Cacau absoluto":"cacau-absoluto","C\u00e1lamo":"calamo","Canela casca":"canela-casca","Cardamomo":"cardamomo","Coentro sementes":"coentro-sementes","Gengibre":"gengibre","Ger\u00e2nio Egito":"geranio","Hortel\u00e3 lim\u00e3o":"hortela-limao","Hortel\u00e3 verde":"hortela-verde","Jasmim grandiflorum absoluto":"jasmim-grandiflorum-absoluto","Manjeric\u00e3o doce":"manjericao-doce","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","N\u00e9roli":"neroli","Noz moscada":"noz-moscada","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Pimenta preta":"pimenta-preta","Pimenta rosa":"pimenta-rosa","Rosa damascena absoluto":"rosa-damascena-absoluto","Salsa sementes":"salsa-sementes","S\u00e1lvia sclarea":"salvia-sclarea","S\u00e2ndalo amyris":"sandalo-amyris","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo"},"Libido feminina":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Canela casca":"canela-casca","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Pau Rosa":"pau-rosa","Pimenta rosa":"pimenta-rosa","S\u00e1lvia sclarea":"salvia-sclarea","Ylang ylang":"ylang-ylang"},"Libido masculina":{"Gengibre":"gengibre","Gengibre fresco":"gengibre-fresco","Hortel\u00e3 verde":"hortela-verde","Patchouli":"patchouli","Pimenta preta":"pimenta-preta","S\u00e2ndalo amyris":"sandalo-amyris"},"Masculino":{"Cardamomo":"cardamomo","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cenoura sementes":"cenoura-sementes","Coentro sementes":"coentro-sementes","Gengibre":"gengibre","Hortel\u00e3 lim\u00e3o":"hortela-limao","Hortel\u00e3 verde":"hortela-verde","Manjeric\u00e3o ex\u00f3tico":"manjericao-exotico","Patchouli":"patchouli","Petitgrain":"petitgrain","Salsa sementes":"salsa-sementes","S\u00e2ndalo amyris":"sandalo-amyris","Vetiver":"vetiver","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo"},"Mau h\u00e1lito":{"Alecrim Pimenta":"alecrim-pimenta","Cardamomo":"cardamomo","Cipreste":"cipreste","Cravo bot\u00e3o":"cravo-botao","Cravo folha":"cravo-folha","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Menta brasileira":"menta-brasileira"},"Medita\u00e7\u00e3o":{"B\u00e1lsamo do Peru":"balsamo-do-peru","Benjoim":"benjoim","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cipreste":"cipreste","Lavanda Kashmir":"lavanda-kashmir","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","May chang":"may-chang","Mirra":"mirra","Ol\u00edbano":"olibano","Palo santo":"palo-santo","Patchouli":"patchouli","Pinho da Sib\u00e9ria":"pinho-da-siberia","S\u00e2ndalo amyris":"sandalo-amyris"},"Mem\u00f3ria":{"Alecrim qt. c\u00e2nfora":"alecrim-qt-canfora","Alecrim qt. cineol":"alecrim-qt-cineol","Hortel\u00e3 pimenta":"hortela-pimenta","Lemongrass (capim lim\u00e3o)":"lemongrass-capim-limao"},"Menopausa":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Canela casca":"canela-casca","Funcho doce":"funcho-doce","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Hortel\u00e3 pimenta":"hortela-pimenta","Jasmim grandiflorum absoluto":"jasmim-grandiflorum-absoluto","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Pau Rosa":"pau-rosa","S\u00e1lvia sclarea":"salvia-sclarea","Yuzu":"yuzu"},"Micose":{"Eucalipto staigeriana":"eucalipto-staigeriana","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Ger\u00e2nio Roseum":"geranio-roseum-madagascar","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","Mirra":"mirra","Palmarosa":"palmarosa","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao"},"Microorganismos":{"Ajowan":"ajowan","Alecrim Pimenta":"alecrim-pimenta","Am\u00eandoa doce":"amendoa-doce","Anis estrelado":"anis-estrelado","Bergamota":"bergamota","Bergamota LFC":"bergamota-lfc","Cajeput":"cajeput","C\u00e1lamo":"calamo","Canela casca":"canela-casca","Canela folha":"canela-folha","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cenoura sementes":"cenoura-sementes","Copa\u00edba destilada":"copaiba-destilada","Cravo bot\u00e3o":"cravo-botao","Cravo folha":"cravo-folha","Espruce negro":"espruce-negro","Eucalipto citriodora":"eucalipto-citriodora","Eucalipto globulus":"eucalipto-globulus","Eucalipto staigeriana":"eucalipto-staigeriana","Ho wood":"ho-wood","Immortelle H. gymnocephalum":"immortelle-h-gymnocephalum","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Louro":"louro","Mirra":"mirra","Palmarosa":"palmarosa","Pinheiro silvestre":"pinheiro-silvestre","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravensara":"ravensara","Ravintsara qt. cineol":"ravintsara","Sangue de drag\u00e3o":"sangue-de-dragao","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol"},"Pele - Acneica":{"Alecrim Pimenta":"alecrim-pimenta","Andiroba":"andiroba","Bergamota":"bergamota","Bergamota LFC":"bergamota-lfc","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Jojoba":"jojoba","Pracax\u00ed":"pracaxi","Rosa Mosqueta":"rosa-mosqueta","Sangue de drag\u00e3o":"sangue-de-dragao","Tea tree":"tea-tree"},"Pele - Madura":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Algod\u00e3o":"algodao","Argan":"argan","Bar\u00fa":"baru","Buriti":"buriti","Caf\u00e9 torrado":"cafe-torrado","Caf\u00e9 verde":"cafe-verde","Camomila alem\u00e3 (azul)":"camomila-alema-azul","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cenoura sementes":"cenoura-sementes","Chia":"chia","Cipreste":"cipreste","Copa\u00edba b\u00e1lsamo":"copaiba-balsamo","Damasco":"damasco","Ger\u00e2nio Egito":"geranio","Gergelim":"gergelim","Girassol":"girassol-organico","Ho wood":"ho-wood","Immortelle H. italicum":"immortelle-h-italicum","Jojoba":"jojoba","Laranja amarga":"laranja-amarga","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Linha\u00e7a Dourada":"linhaca-dourada","Macad\u00e2mia":"macadamia","Maracuj\u00e1":"maracuja","Mirra":"mirra","N\u00e9roli":"neroli","Ol\u00edbano":"olibano","Palmarosa":"palmarosa","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Rosa damascena absoluto":"rosa-damascena-absoluto","Rosa Mosqueta":"rosa-mosqueta","S\u00e2ndalo amyris":"sandalo-amyris","Sinergia Vegetal":"sinergia-vegetal"},"Pele - Mista":{"Ger\u00e2nio Egito":"geranio","Jojoba":"jojoba","Laranja amarga":"laranja-amarga","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Sinergia Vegetal":"sinergia-vegetal"},"Pele - Oleosa":{"Alecrim qt. cineol":"alecrim-qt-cineol","Andiroba":"andiroba","Bergamota":"bergamota","Bergamota LFC":"bergamota-lfc","Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cipreste":"cipreste","Ger\u00e2nio Egito":"geranio","Grapefruit":"grapefruit","Jojoba":"jojoba","Lim\u00e3o siciliano":"limao-siciliano","Maracuj\u00e1":"maracuja","May chang":"may-chang","Ol\u00edbano":"olibano","Petitgrain":"petitgrain","Ravensara":"ravensara","S\u00e1lvia sclarea":"salvia-sclarea","Sangue de drag\u00e3o":"sangue-de-dragao","Sinergia Vegetal":"sinergia-vegetal","Tea tree":"tea-tree","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol","Turm\u00e9rico":"turmerico","Verbena \u00edndia":"verbena-india","Ylang ylang":"ylang-ylang","Ylang ylang completo":"ylang-ylang-completo","Yuzu":"yuzu"},"Pele - Seca":{"Algod\u00e3o":"algodao","Am\u00eandoa doce":"amendoa-doce","Argan":"argan","B\u00e1lsamo do Peru":"balsamo-do-peru","Benjoim":"benjoim","Buriti":"buriti","Caf\u00e9 verde":"cafe-verde","Camomila romana":"camomila-romana","Castanha do Brasil":"castanha-do-brasil","Chia":"chia","Coco":"coco","Copa\u00edba b\u00e1lsamo":"copaiba-balsamo","Damasco":"damasco","Gergelim":"gergelim","Girassol":"girassol-organico","Jojoba":"jojoba","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Linha\u00e7a Dourada":"linhaca-dourada","Mirra":"mirra","Ojon":"ojon","Palmarosa":"palmarosa","Patchouli":"patchouli","Pau Rosa":"pau-rosa","Rosa damascena absoluto":"rosa-damascena-absoluto","Rosa Mosqueta":"rosa-mosqueta","S\u00e1lvia sclarea":"salvia-sclarea","S\u00e2ndalo amyris":"sandalo-amyris","Semente de Ab\u00f3bora":"semente-de-abobora","Sinergia Vegetal":"sinergia-vegetal","Turm\u00e9rico":"turmerico"},"Relaxamento":{"Benjoim":"benjoim","Bergamota":"bergamota","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Eucalipto citriodora":"eucalipto-citriodora","Ger\u00e2nio Egito":"geranio","Ho wood":"ho-wood","Immortelle H. italicum":"immortelle-h-italicum","Laranja doce":"laranja-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Lemongrass (capim lim\u00e3o)":"lemongrass-capim-limao","Lima da P\u00e9rsia":"lima-da-persia","Manjerona":"manjerona","May chang":"may-chang","Ol\u00edbano":"olibano","Palmarosa":"palmarosa","Pau Rosa":"pau-rosa","Petitgrain":"petitgrain","S\u00e1lvia sclarea":"salvia-sclarea","Verbena \u00edndia":"verbena-india"},"Respira\u00e7\u00e3o infantil":{"Copa\u00edba destilada":"copaiba-destilada","Eucalipto radiata":"eucalipto-radiata","Eucalipto staigeriana":"eucalipto-staigeriana","Lavandin grosso":"lavandin-grosso","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravensara":"ravensara"},"Respirar":{"Ajowan":"ajowan","Alecrim qt. cineol":"alecrim-qt-cineol","Anis estrelado":"anis-estrelado","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cajeput":"cajeput","C\u00e2nfora branca":"canfora-branca","Cedro Atlas":"cedro-atlas","Cipreste":"cipreste","Copa\u00edba destilada":"copaiba-destilada","Espruce negro":"espruce-negro","Eucalipto globulus":"eucalipto-globulus","Eucalipto radiata":"eucalipto-radiata","Eucalipto staigeriana":"eucalipto-staigeriana","Ho wood":"ho-wood","Immortelle H. gymnocephalum":"immortelle-h-gymnocephalum","Lavandin grosso":"lavandin-grosso","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Louro":"louro","Ol\u00edbano":"olibano","Palo santo":"palo-santo","Pinheiro silvestre":"pinheiro-silvestre","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravensara":"ravensara","Ravintsara qt. cineol":"ravintsara","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol"},"Rinite":{"Alecrim qt. cineol":"alecrim-qt-cineol","Cipreste":"cipreste","Eucalipto globulus":"eucalipto-globulus","Eucalipto radiata":"eucalipto-radiata","Hortel\u00e3 pimenta":"hortela-pimenta","Immortelle H. italicum":"immortelle-h-italicum","Lavandin grosso":"lavandin-grosso","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravintsara qt. cineol":"ravintsara","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao"},"Sinusite":{"Alecrim qt. cineol":"alecrim-qt-cineol","Cipreste":"cipreste","Eucalipto globulus":"eucalipto-globulus","Eucalipto radiata":"eucalipto-radiata","Hortel\u00e3 pimenta":"hortela-pimenta","Immortelle H. italicum":"immortelle-h-italicum","Lavandin grosso":"lavandin-grosso","Lim\u00e3o siciliano":"limao-siciliano","L\u00edrio do brejo CO2":"lirio-do-brejo-co2","Manjeric\u00e3o santo (Tulsi)":"manjericao-santo-tulsi","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravintsara qt. cineol":"ravintsara","Tea tree":"tea-tree","Tea tree lim\u00e3o":"tea-tree-limao"},"Sono":{"Laranja doce":"laranja-doce","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavandin grosso":"lavandin-grosso","Lemongrass (capim lim\u00e3o)":"lemongrass-capim-limao","Lima da P\u00e9rsia":"lima-da-persia","Lima mexicana destilada":"lima-mexicana-destilada","Manjerona":"manjerona","May chang":"may-chang","N\u00e9roli":"neroli","Ol\u00edbano":"olibano","Pau Rosa":"pau-rosa","Petitgrain":"petitgrain","S\u00e1lvia sclarea":"salvia-sclarea","Vetiver":"vetiver"},"Sudorese":{"Cipreste":"cipreste","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Hortel\u00e3 pimenta":"hortela-pimenta","Lavandin grosso":"lavandin-grosso","S\u00e1lvia sclarea":"salvia-sclarea"},"Tosse com muco":{"Cedro Atlas":"cedro-atlas","Cedro Himalaya":"cedro-himalaya","Cipreste":"cipreste","Eucalipto globulus":"eucalipto-globulus","Eucalipto radiata":"eucalipto-radiata","Eucalipto staigeriana":"eucalipto-staigeriana","Gengibre":"gengibre","Gengibre fresco":"gengibre-fresco","Hortel\u00e3 pimenta":"hortela-pimenta","Immortelle H. gymnocephalum":"immortelle-h-gymnocephalum","Ol\u00edbano":"olibano","Ravensara":"ravensara"},"Tosse seca":{"Anis estrelado":"anis-estrelado","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Cravo bot\u00e3o":"cravo-botao","Hortel\u00e3 verde":"hortela-verde","Lavandin grosso":"lavandin-grosso","Ravintsara qt. cineol":"ravintsara"},"TPM":{"Alecrim qt. verbenona":"alecrim-qt-verbenona","Canela casca":"canela-casca","Ger\u00e2nio Bourbon":"geranio-bourbon","Ger\u00e2nio Egito":"geranio","Hortel\u00e3 pimenta":"hortela-pimenta","Lavanda Bulg\u00e1ria":"lavanda-bulgaria","Lavanda francesa":"lavanda-francesa","Lavanda Kashmir":"lavanda-kashmir","S\u00e1lvia sclarea":"salvia-sclarea"},"Unha encravada":{"Copa\u00edba destilada":"copaiba-destilada","Cravo bot\u00e3o":"cravo-botao","Cravo folha":"cravo-folha","Or\u00e9gano":"oregano","Tea tree":"tea-tree"},"Vertigem":{"Hortel\u00e3 pimenta":"hortela-pimenta","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano"},"Vitalidade":{"Alecrim Pimenta":"alecrim-pimenta","Alecrim qt. c\u00e2nfora":"alecrim-qt-canfora","Alecrim qt. cineol":"alecrim-qt-cineol","Breu branco (Alm\u00e9cega)":"breu-branco-almecega","Caf\u00e9 torrado":"cafe-torrado","Canela casca":"canela-casca","C\u00e2nfora branca":"canfora-branca","Cravo bot\u00e3o":"cravo-botao","Espruce negro":"espruce-negro","Eucalipto globulus":"eucalipto-globulus","Hortel\u00e3 pimenta":"hortela-pimenta","Hortel\u00e3 verde":"hortela-verde","Lima Tahiti":"lima-tahiti","Lim\u00e3o siciliano":"limao-siciliano","Louro":"louro","May chang":"may-chang","Menta brasileira":"menta-brasileira","Noz moscada":"noz-moscada","Pimenta preta":"pimenta-preta","Pinheiro silvestre":"pinheiro-silvestre","Pinho da Sib\u00e9ria":"pinho-da-siberia","Ravintsara qt. cineol":"ravintsara","Tea tree":"tea-tree","Tomilho qt. linalol":"tomilho-qt-linalol","Tomilho qt. timol":"tomilho-qt-timol"}}');

	var dataLength = dataSearch.length;

	/*
		  dataSearch[ x ]['itemCategory']: itemCategory do item
		  dataSearch[ x ]['nome']     : nome do item
		  dataSearch[ x ]['slug']     : termo a ser utilizado para montar o nome do arquivo html
		  dataSearch[ x ]['conteudo'] : descrição do item
	*/

	if ($('body').attr('id') == 'index') {
		if (window.location.href.indexOf('search') > -1) {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
				vars[key] = decodeURI(value);
			});
			parameter = vars['search'];
			$('.texto-pesquisa').val(parameter);
			search(parameter);
		} else {
			parameter = $('.texto-pesquisa').val();
			if (parameter != 'Palavra-chave' && parameter != '') {
				search(parameter);
			}
		}
	}

	$('#keyWordField').change(function () {
		var searchArgument = $('#keyWordField').val();
		window.location.href = encodeURI("index.html?search=" + searchArgument);
	});
	$('.pesquisa i').click(function () {
		var searchArgument = $('#keyWordField').val();
		search(searchArgument);
	});

	$('.texto-pesquisa').change(function () {
		var searchArgument = $('.texto-pesquisa').val();
		search(searchArgument);
	});
	$('.pesquisa-index i').click(function () {
		var searchArgument = $('.texto-pesquisa').val();
		search(searchArgument);
	});

	$('#index').on('click', '.toggle-title', function () {
		$(this).next('.toggle-content').slideToggle(200);
		$(this).find('i').toggleClass('rotate-toggle');
		return false;
	});

	function search(searchArgument) {
		searchArgument = searchArgument.toLowerCase().latinise();

		var found = false;
		var matches = {
			'equal': {
				'name': [],
				'content': [],
				'helpFor': []
			},
			'partial': {
				'name': [],
				'content': [],
				'helpFor': []
			},
			'partialWord': {
				'name': [],
				'content': [],
				'helpFor': []
			}
		};
		var equalNameQty = partialNameQty = partialWordNameQty = 0; // qtde de itens encontrados pelo nome
		var equalContentQty = partialContentQty = partialWordContentQty = 0; // qtde de itens encontrados pela descrição
		var equalHelpForQty = partialHelpForQty = partialWordHelpForQty = 0; // qtde de itens encontrados nas tags de ajuda

		// Expressão regular para encontrar o argumento completo
		var equalMatchRegExp = new RegExp('\\b' + searchArgument + '\\b', 'i');

		// Expressão regular para encontrar qualquer palavra completa do argumento
		partialSearchArgument = cleanSearchArgument(searchArgument).replace(/\ /g, '|');
		var partialMatchRegExp = new RegExp('\\b(' + partialSearchArgument + ')\\b', 'i');

		// Expressão regular para encontrar qualquer parte da palavra do argumento
		var partialWordMatchRegExp = new RegExp(partialSearchArgument, 'i');

		// Processa todos os itens
		for (var i = 0; i < dataLength; i++) {
			var itemCategory = dataSearch[i]['categoria'].trim();
			var itemName = dataSearch[i]['nome'].trim();
			var searchName = itemName.toLowerCase().latinise();
			var itemSlug = dataSearch[i]['slug'].trim();
			var itemContent = dataSearch[i]['conteudo'].trim();
			var searchContent = itemContent.toLowerCase().latinise();
			var position = 0;
			var lenght = 0;

			equalNameMatch = searchName.match(equalMatchRegExp);
			partialNameMatch = searchName.match(partialMatchRegExp);
			partialWordNameMatch = searchName.match(partialWordMatchRegExp);

			equalContentMatch = searchContent.match(equalMatchRegExp);
			partialContentMatch = searchContent.match(partialMatchRegExp);
			partialWordContentMatch = searchContent.match(partialWordMatchRegExp);

			if (equalNameMatch !== null || partialNameMatch !== null || partialWordNameMatch != null || equalContentMatch !== null || partialContentMatch !== null || partialWordContentMatch !== null) {

				found = true;

				if (equalNameMatch !== null) {
					matches.equal.name[equalNameQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else if (partialNameMatch !== null) {
					keyFound = partialNameMatch;
					position = searchName.search(keyFound[0]);
					lenght = keyFound[0].length;
					string = itemName.replace(itemName.substr(position, lenght), '<span class="underline">' + itemName.substr(position, lenght) + '</span>');
					matches.partial.name[partialNameQty++] = '<p><a href="' + itemSlug + '.html">' + string + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else if (partialWordNameMatch !== null) {
					keyFound = partialWordNameMatch;
					position = searchName.search(keyFound[0]);
					lenght = keyFound[0].length;
					string = itemName.replace(itemName.substr(position, lenght), '<span class="underline">' + itemName.substr(position, lenght) + '</span>');
					matches.partialWord.name[partialWordNameQty++] = '<p><a href="' + itemSlug + '.html">' + string + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else {

					if (equalContentMatch !== null) {
						keyFound = equalContentMatch;
					} else if (partialContentMatch != null) {
						keyFound = partialContentMatch;
					} else {
						keyFound = partialWordContentMatch;
					}

					// Localiza o início do texto ou o espaço anterior à primeira palavra localizada
					initialPosition = searchContent.search(keyFound[0]) - 1;
					while (itemContent.substr(initialPosition, 1) !== ' ' && initialPosition >= 0) {
						initialPosition--;
					}
					initialPosition++;

					// Le 37 caracteres a partir desta posição
					string = itemContent.substr(initialPosition, 37);
					position = searchContent.substr(initialPosition, 37).search(keyFound[0]);
					lenght = keyFound[0].length;
					string = string.replace(string.substr(position, lenght), '<span class="underline">' + string.substr(position, lenght) + '</span>');

					// Sinaliza se houver mais texto antes ou depois das palavras encontradas
					if (initialPosition !== 0) {
						string = '... ' + string;
					}
					if (itemContent.substr(initialPosition, 38).length == 38) {
						string = string + ' ...'
					}

					if (equalContentMatch != null) {
						matches.equal.content[equalContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					} else if (partialContentMatch != null) {
						matches.partial.content[partialContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					} else {
						matches.partialWord.content[partialWordContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					}
				}
			}
		}

		// Processa todos as ajudas
		for (var helpFor in dataHelpFor) {
			html = '';
			helpForAux = helpFor.latinise();

			equalHelpForMatch = helpForAux.match(equalMatchRegExp);
			partialHelpForMatch = helpForAux.match(partialMatchRegExp);
			partialWordHelpForMatch = helpForAux.match(partialWordMatchRegExp);

			if (equalHelpForMatch != null || partialHelpForMatch != null || partialWordHelpForMatch != null) {
				found = true;

				if (equalHelpForMatch !== null) {
					keyFound = equalHelpForMatch;
				} else if (partialHelpForMatch != null) {
					keyFound = partialHelpForMatch;
				} else {
					keyFound = partialWordHelpForMatch;
				}

				position = helpForAux.search(keyFound[0]) - 1;
				while (helpForAux.substr(position, 1) !== ' ' && position >= 0) {
					position--;
				}
				position++;

				lenght = keyFound[0].length;
				string = helpFor.replace(helpFor.substr(position, lenght), '<span class="underline">' + helpFor.substr(position, lenght) + '</span>');

				html += '<div class="toggle">';
				html += '<a href="#" class="toggle-title">Ajuda para ' + string + '<i class="fa fa-plus"></i></a>';
				html += '<div class="toggle-content">';

				auxHelpFor = dataHelpFor[helpFor];
				for (var auxItemName in auxHelpFor) {
					html += '<p><a href="' + auxHelpFor[auxItemName] + '.html">' + auxItemName + '</a></p>';
				}

				html += '</div></div>'

				if (equalContentMatch !== null) {
					matches.equal.helpFor[equalHelpForQty++] = html;
				} else if (partialHelpForMatch != null) {
					matches.partial.helpFor[partialHelpForQty++] = html;
				} else {
					matches.partialWord.helpFor[partialWordHelpForQty++] = html;
				}
			}
		}

		if (found) {
			$(".menu-index").css({ 'display': 'none' });

			html = '<h4>Resultados</h4>';
			if (equalNameQty > 0) {
				for (var i = 0; i < equalNameQty; i++) {
					html += matches.equal.name[i];
				}
			}

			if (equalContentQty > 0) {
				for (var i = 0; i < equalContentQty; i++) {
					html += matches.equal.content[i];
				}
			}

			if (partialNameQty > 0) {
				for (var i = 0; i < partialNameQty; i++) {
					html += matches.partial.name[i];
				}
			}

			if (partialContentQty > 0) {
				for (var i = 0; i < partialContentQty; i++) {
					html += matches.partial.content[i];
				}
			}

			if (partialWordNameQty > 0) {
				for (var i = 0; i < partialWordNameQty; i++) {
					html += matches.partialWord.name[i];
				}
			}

			if (partialWordContentQty > 0) {
				for (var i = 0; i < partialWordContentQty; i++) {
					html += matches.partialWord.content[i];
				}
			}

			if (equalHelpForQty > 0) {
				for (var i = 0; i < equalHelpForQty; i++) {
					html += matches.equal.helpFor[i];
				}
			}

			if (partialHelpForQty > 0) {
				for (var i = 0; i < partialHelpForQty; i++) {
					html += matches.partial.helpFor[i];
				}
			}

			if (partialWordHelpForQty > 0) {
				for (var i = 0; i < partialWordHelpForQty; i++) {
					html += matches.partialWord.helpFor[i];
				}
			}

			$('.resposta-pesquisa').html(html);
			$('.resposta-not-found').html('');
			$(".menu-index").css({ 'display': 'none' });
		} else {
			$('.resposta-pesquisa').html('');
			$('.resposta-not-found').html('<h4>Nenhum resultado encontrado</h4>');
			$(".menu-index").css({ 'display': 'block' });
		}
	}

	function cleanSearchArgument(searchArgument) {
		newSearchArgument = '';
		searchWords = searchArgument.split(' ');
		exceptionLower = ['a', 'e', 'o', 'as', 'os', 'da', 'de', 'do', 'di', 'das', 'des', 'dos', 'na', 'no', 'nas', 'nos', 'em', 'que', 'com', '-', '=', '+', ':', '/', '.', ','];
		$.each(searchWords, function (index, word) {
			if (-1 == $.inArray(word, exceptionLower)) {
				newSearchArgument = newSearchArgument + word + ' ';
			}
		});
		return $.trim(newSearchArgument);
	}
});

var Latinise = {};
Latinise.latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
String.prototype.latinise = function () { return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) { return Latinise.latin_map[a] || a }) };
String.prototype.latinize = String.prototype.latinise;
String.prototype.isLatin = function () { return this == this.latinise() }
$(document).ready(function() {
	$('.ativa-tutorial').click( function( e ) {
		$('.tutorial').show();
		$('.snap-drawer-left').animate({ scrollTop: 0 }, "slow");
		$('.spotlight').css( { 'top' : '116px', 'left': '4px', 'width': '257px', 'height': '65px', 'border-radius': '1%', 'animation-name': 'to-menu-options-2', 'animation-duration': '3s' } );
		$('.spotlight-effect').css( { 'animation-name': 'to-menu-options-2-ripple', 'animation-delay': '3s', 'border-radius': '1%' } );
		$('.spotlight').click( function() {
			$.cookie( "tutorial", '2', { expires: 360 } );
			window.location.href = encodeURI('menu-oleo-essencial.html');
		});
	});

	$('.ativa-tutorial-index').click( function() {
		$.cookie( "tutorial", '1', { expires: 360 } );
	});

	$('.leave-tutorial').click( function() {
		$.cookie( "tutorial", '', { expires: 360 } );
		$('.tutorial').hide();
	});

	if ( $.cookie('tutorial') != '' ) {
		switch ( $.cookie('tutorial') ) {
			case '1':
				if ( window.location.href.indexOf('index') > -1 ) {
					$('.tutorial').show();
					$('.spotlight').css( { 'top': '-30px', 'left': '-30px', 'width': '105px', 'height': '105px', 'animation-name': 'to-menu', 'animation-duration': '3s' } );
					$('.spotlight-effect').css( { 'animation-name': 'to-menu-ripple', 'animation-delay': '3s' } );
					$('.spotlight').click( function() {
						$('.spotlight').unbind('click');
						$('.open-left-sidebar').click();
						$('.spotlight').css( { 'top' : '116px', 'left': '4px', 'width': '257px', 'height': '65px', 'border-radius': '1%', 'animation-name': 'to-menu-options', 'animation-duration': '4s' } );
						$('.spotlight-effect').css( { 'animation-name': 'to-menu-options-ripple', 'animation-delay': '4s', 'border-radius': '1%' } );
						$('.spotlight').click( function() {
							$.cookie( "tutorial", '2', { expires: 360 } );
							window.location.href = encodeURI('menu-oleo-essencial.html');
						});
					});
				} else {
					$.cookie( "tutorial", '', { expires: 360 } );
				}
				break;
			case '2':
			if ( window.location.href.indexOf('menu-oleo-essencial') > -1 ) {
					$('.tutorial').show();
					$('.spotlight').css( { 'top' : '196px', 'left': 'calc(100% - 80px)', 'width': '105px', 'height': '105px', 'border-radius': '50%', 'animation-name': 'to-menu-index', 'animation-duration': '4s' } );
					$('.spotlight-effect').css( { 'animation-name': 'none', 'border-radius': '50%' } );
					$('.spotlight-effect').css( { 'animation-name': 'to-menu-index-ripple', 'animation-delay': '4s' } );
					$('.spotlight').click( function() {
						$('.spotlight').unbind('click');
						$('a[href="#c"]').click();
						//$('.spotlight').css( { 'top' : '290px', 'left': '48px', 'width': 'calc(100% - 90px)', 'height': '80px', 'border-radius': '1%', 'animation-name': 'to-menu-index-letter', 'animation-duration': '4s' } );
						$('.spotlight').css( { 'top' : '290px', 'left': '48px', 'width': 'calc(100% - 90px)', 'height': '80px', 'border-radius': '1%', 'animation-name': 'to-menu-index-letter', 'animation-duration': '4s' } );
						$('.spotlight-effect').css( { 'animation-name': 'none', 'border-radius': '1%' } );
						$('.spotlight-effect').css( { 'animation-name': 'to-menu-index-letter-ripple', 'animation-delay': '4s' } );
						$.cookie( "tutorial", '3', {
							expires: 360
						});
						$('.spotlight').click( function() {
							window.location.href = encodeURI('camomila-alema-azul.html');
						});
					});
				} else {
					$.cookie( "tutorial", '', { expires: 360 } );
				}
				break;
			case '3':
				if ( window.location.href.indexOf('camomila-alema-azul') > -1 ) {
					setTimeout( function() {
						$('.tutorial').show();
						$('.spotlight').css( { 'top' : '388px', 'left': '-10px', 'width': '105px', 'height': '105px', 'animation-name': 'to-form-of-use', 'animation-duration': '13s' } );
						$('.spotlight-effect').css( { 'animation-name': 'none', 'border-radius': '1%' } );
						$('.spotlight-effect').css( { 'animation-name': 'to-form-of-use-ripple', 'animation-delay': '13s' } );
						setTimeout( function() {
							$('#main-content').animate({ scrollTop: ( 2000 ) }, 4500 );
						}, 1000 );
						setTimeout( function() {
							$('#main-content').animate({ scrollTop: ( 0 ) }, 2100 );
						}, 8000 );
						$('.spotlight').click( function() {
							$('.spotlight').unbind('click');
							$('.content a:first').click();
							$('.spotlight').css( { 'top' : 'calc(100% - 80px)', 'left': 'calc(50% - 53px)', 'width': '105px', 'height': '105px', 'animation-name': 'to-form-of-use-bottom', 'animation-duration': '2s' } );
							$('.spotlight-effect').css( { 'animation-name': 'none', 'border-radius': '50%' } );
							$('.spotlight-effect').css( { 'animation-name': 'to-form-of-use-bottom-ripple', 'animation-delay': '2s' } );
							$('.spotlight').click( function() {
								$('.spotlight').unbind('click');
								$('.close-bottom-notification').click();
								$('.spotlight').css( { 'top' : '-28px', 'left': 'calc(50% - 89px)', 'width': '180px', 'height': '105px', 'animation-name': 'to-search', 'animation-duration': '2s' } );
								$('.spotlight-effect').css( { 'animation-name': 'none', 'border-radius': '50%' } );
								$('.spotlight-effect').css( { 'animation-name': 'to-search-ripple', 'animation-delay': '2s' } );
								$('.spotlight').click( function() {
									$.cookie( "tutorial", '', { expires: 360 } );
									window.location.href = encodeURI('index.html');
								});
							});
						});
					}, 400 );
				} else {
					$.cookie( "tutorial", '', { expires: 360 } );
				}
				break;
			default:
				$.cookie( "tutorial", '', { expires: 360 } );
		}
	}
});
