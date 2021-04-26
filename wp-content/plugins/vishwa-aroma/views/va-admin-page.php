<?php
/**
 *
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

?>
<div class="va-admin">
	<h1>Vishwa Aroma</h1>
	<div id="va-admin-tabs" style="display:none;">
		<ul>
			<li <?php echo ( 1 === +$tab ? 'class="current-tab"' : '' ); ?>><a href="#va-admin-tabs-1" class="tab-title">Construção do aplicativo</a></li>
			<li <?php echo ( 2 === +$tab ? 'class="current-tab"' : '' ); ?>><a href="#va-admin-tabs-2" class="tab-title">Configurações</a></li>
		</ul>
		<div class="va-admin-messages"><?php settings_errors(); ?></div>
		<?php
		echo $html;
		include_once VA_PLUGIN_PATH . '/views/va-admin-tab-app-construct.php';
		include_once VA_PLUGIN_PATH . '/views/va-admin-tab-config.php';
		?>
	</div>
</div>
