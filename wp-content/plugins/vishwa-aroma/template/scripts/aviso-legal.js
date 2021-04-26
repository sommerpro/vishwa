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
