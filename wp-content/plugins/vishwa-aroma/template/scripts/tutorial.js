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
