<?php
/**
 *
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

?>
<div id="va-admin-tabs-2">
	<form method="post" action="options.php" name="va-config-form">
		<div id="va-config-tabs">
		<ul>
		<?php
		foreach ( $this->sections as $key => $section ) {
			printf( '<li><a href="#va-config-tabs-%s" class="tab-title">%s</a></li>', ( $key + 1 ), $section['label'] );
		}
		?>
		</ul>
		<?php
		settings_fields( 'va_admin' );
		foreach ( $this->sections as $key => $section ) {
			printf( '<div id="va-config-tabs-%s">', ( $key + 1 ) );
			printf( '<h2>%s</h2>', $section['description'] );
			do_settings_fields( 'va_admin', $section['uid'] );
			echo '</div>';
		}
		?>
		</div>
		<?php submit_button(); ?>
	</form>
</div>
