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
