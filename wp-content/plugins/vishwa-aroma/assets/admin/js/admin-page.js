jQuery(document).ready(function ($) {
	var VA_Admin = {
		init: function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");

			let tab = 1;
			$('#va-admin-tabs > ul li').each(function (index, element) {
				if ($(this).hasClass('current-tab')) {
					tab = index;
				}
			});

			$('#va-admin-tabs').tabs({ active: tab }).show();
			$('#va-config-tabs').tabs();
		},
	};

	VA_Admin.init();
});
