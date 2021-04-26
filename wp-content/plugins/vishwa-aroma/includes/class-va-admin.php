<?php
/**
 * Admin
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

new VA_Admin();

class VA_Admin {

	public $sections;

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );
	}

	public function admin_menu() {
		add_menu_page(
			'Vishwa Aromaterapia',               // The title to be displayed on this menu's corresponding page.
			'Vishwa Aroma',                      // The text to be displayed for this actual menu item.
			'publish_posts',                     // The capability required for this menu to be displayed to the user.
			'va_admin',                          // The unique ID - that is, the slug - for this menu item.
			array( $this, 'create_admin_page' ), // The name of the function to call when rendering this menu's page.
			'dashicons-admin-settings',          // The URL to the icon to be used for this menu.
			2                                    // The position in the menu order this one should appear.
		);
	}

	public function create_admin_page() {
		global $current_user;

		$tab = isset( $_REQUEST['tab'] ) ? $_REQUEST['tab'] : '1';

		$app          = new VA_App();
		$app_versions = $app->get_versions();

		if ( isset( $_POST['meta_nonce'] ) ) {
			if ( wp_verify_nonce( $_POST['meta_nonce'], 'app_vishwa_aroma_construction' ) ) {
				$environment    = sanitize_text_field( $_POST['environment'] );
				$version_number = trim( sanitize_text_field( $_POST[ $environment . '_version' ] ) );

				$result = $app->construct_app( $version_number, $environment );

				if ( 'sucesso' === $result ) {
					$app_versions = unserialize( get_option( 'va_app_versions' ) );

					$app_versions[ $environment ]['number'] = $version_number;
					$app_versions[ $environment ]['date']   = date_i18n( 'd/m/Y H:i:s' );
					$app_versions[ $environment ]['user']   = $current_user->user_login;

					$app->set_versions( $app_versions );
				}

				if ( 'sucesso' === $result ) {
					$html = "<div class='notice notice-success is-dismissible'><p><strong>Aplicação construída com sucesso.</strong></p></div>";
				} else {
					$html = "<div class='notice notice-error is-dismissible'><p><strong>Não foi possível construir aplicação, analise o log.</strong></p></div>";
				}
			} else {
				$html = "<div class='notice notice-error is-dismissible'><p><strong>Cógiso de sguranã inválido.</strong></p></div>";
			}
		}

		$last_log = $app->read_last_log();

		include_once VA_PLUGIN_PATH . '/views/va-admin-page.php';
		$this->load_scripts();
	}

	public function admin_init() {
		$this->sections = array(
			array(
				'uid'         => 'general',
				'label'       => 'Geral',
				'description' => 'Configurações gerais',
				'fields'      => array(
					array(
						'uid'     => 'va_log_enabled',
						'label'   => 'Habilitar log de depuração',
						'type'    => 'radio',
						'options' => array(
							'1' => 'Sim',
							'0' => 'Não',
						),
					),
				),
			),
			array(
				'uid'         => 'contact-email',
				'label'       => 'E-mail de contato',
				'description' => 'Configurações do e-mail de contato do aplicativo.',
				'fields'      => array(
					array(
						'uid'   => 'va_app_contact_email_from',
						'label' => 'E-mail do remetente',
						'type'  => 'email',
					),
					array(
						'uid'      => 'va_app_contact_email_to',
						'label'    => 'E-mail de destino',
						'type'     => 'email',
						'sanitize' => 'email',
					),
				),
			),
		);

		foreach ( $this->sections as $section ) {
			add_settings_section(
				$section['uid'],         // ID used to identify this section and with which to register options
				$section['description'], // Title to be displayed on the administration page
				false,                   // Callback used to render the description of the section
				'va_admin'               // Page on which to add this section of options
			);

			foreach ( $section['fields'] as $field ) {
				add_settings_field(
					$field['uid'],                    // ID used to identify the field throughout the theme
					$field['label'],                  // The label to the left of the option interface element
					array( $this, 'field_callback' ), // The name of the function responsible for rendering the option interface
					'va_admin',                       // The page on which this option will be displayed
					$section['uid'],                  // The section of the settings page in which to show the box
					$field                            // Additional arguments that are passed to the $callback function
				);

				$sanitize = 'sanitize';
				if ( ! empty( $field['sanitize'] ) ) {
						$sanitize .= '_' . $field['sanitize'];
				}

				register_setting( 'va_admin', $field['uid'], array( $this, $sanitize ) );
			}
		}
	}

	public function field_callback( $args ) {
		$args = array_merge(
			array(
				'helper'      => '',
				'default'     => '',
				'placeholder' => '',
				'step'        => '1',
			),
			$args
		);

		$value = get_option( $args['uid'] );
		if ( empty( $value ) && ! empty( $args['default'] ) ) {
			$value = $args['default'];
		}

		echo '<fieldset>';

		switch ( $args['type'] ) {
			case 'url':
			case 'text':
			case 'email':
				printf( '<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" value="%4$s" />', $args['uid'], $args['type'], $args['placeholder'], $value );
				break;
			case 'number':
				printf( '<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" step="%4$s" value="%5$s" />', $args['uid'], $args['type'], $args['placeholder'], $args['step'], $value );
				break;
			case 'textarea':
				printf( '<textarea name="%1$s" id="%1$s" placeholder="%2$s" rows="5" cols="50">%3$s</textarea>', $args['uid'], $args['placeholder'], $value );
				break;
			case 'radio':
				if ( ! empty( $args['options'] ) && is_array( $args['options'] ) ) {
					foreach ( $args['options'] as $key => $label ) {
						$checked = ( $value == $key ) ? 'checked' : ''; // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
						printf( '<div class="radio"><input name="%1$s" id="%1$s" type="%2$s"value="%3$s" %4$s/>%5$s</div>', $args['uid'], $args['type'], $key, $checked, $label );
					}
				}
				break;
			case 'select':
				if ( ! empty( $args['options'] ) && is_array( $args['options'] ) ) {
					$options_markup = '';
					foreach ( $args['options'] as $key => $label ) {
						$options_markup .= sprintf( '<option value="%s" %s>%s</option>', $key, selected( $value, $key, false ), $label );
					}
					printf( '<select name="%1$s" id="%1$s">%2$s</select>', $args['uid'], $options_markup );
				}
				break;
			case 'select2':
				if ( ! empty( $args['options'] ) && is_array( $args['options'] ) ) {
					$options_markup = '';
					foreach ( $args['options'] as $key => $label ) {
						$selected        = in_array( $key, $value ) ? ' selected="selected"' : ''; // phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
						$options_markup .= sprintf( '<option value="%s"%s>%s</option>', $key, $selected, $label );
					}
					printf( '<select class="va-select2" name="%1$s[]" id="%1$s" multiple="multiple">%2$s</select>', $args['uid'], $options_markup );
				}
				break;
			case 'checkbox':
				$checked = ( '1' === $value ) ? 'checked="checked"' : '';
				printf( '<input name="%1$s" id="%1$s" type="%2$s" value="%3$s" %4$s/>', $args['uid'], $args['type'], $value, $checked );
				break;
		}

		if ( ! empty( $args['helper'] ) ) {
			printf( '<span class="helper"> %s</span>', $args['helper'] );
		}

		echo '</fieldset>';
	}

	private function load_scripts() {
		wp_enqueue_style( 'va-jquery-ui-css' );
		wp_enqueue_style( 'va-admin-css' );
		wp_enqueue_script( 'va-admin-page-js', plugins_url( 'assets/admin/js/admin-page.js', VA_PLUGIN_FILE ), array( 'jquery', 'jquery-ui-tabs' ), VA_VERSION, true );
	}

	public function sanitize( $input ) {
		$output = sanitize_text_field( $input );
		return $output;
	}

	public function sanitize_textarea( $input ) {
		$output = sanitize_textarea_field( $input );
		return $output;
	}

	public function sanitize_array( $input ) {
		$output = array();
		foreach ( $input as $key => $value ) {
			$output[ $key ] = sanitize_text_field( $value );
		}
		return $output;
	}
}
