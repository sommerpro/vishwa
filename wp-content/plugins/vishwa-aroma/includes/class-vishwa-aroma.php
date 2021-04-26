<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 *
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

class VA {
	public static function init() {
		load_plugin_textdomain( 'vishwa-aroma', false, dirname( plugin_basename( VA_PLUGIN_FILE ) ) . '/languages/' );

		self::includes();

		add_action( 'wp_ajax_send_contact_email', array( __CLASS__, 'send_contact_email' ) );
		add_action( 'wp_ajax_nopriv_send_contact_email', array( __CLASS__, 'send_contact_email' ) );

		add_filter( 'allowed_http_origins', array( __CLASS__, 'add_allowed_origins' ) );

		if ( is_admin() ) {
			self::admin_includes();
			add_action( 'admin_enqueue_scripts', array( __CLASS__, 'register_scripts' ) );
		}
	}

	private static function includes() {
		include_once VA_PLUGIN_PATH . '/includes/class-va-app.php';
		include_once VA_PLUGIN_PATH . '/includes/class-va-item.php';
		include_once VA_PLUGIN_PATH . '/includes/class-va-form-use.php';
	}

	private static function admin_includes() {
		include_once VA_PLUGIN_PATH . '/includes/class-va-admin.php';
	}

	public function register_scripts() {
		wp_register_style( 'va-jquery-ui-css', plugins_url( 'assets/admin/css/jquery-ui.min.css', VA_PLUGIN_FILE ), null, '1.12.1' );
		wp_register_style( 'va-admin-css', plugins_url( 'assets/admin/css/admin.css', VA_PLUGIN_FILE ), null, VA_VERSION );
	}

	public function send_contact_email() {
		$name = sanitize_text_field( trim( $_POST['contactNameField'] ) );
		if ( empty( $name ) ) {
			self::return_error( 'Por favor, informe seu nome.' );
		}
		$email = sanitize_email( trim( $_POST['contactEmailField'] ) );
		if ( empty( $email ) ) {
			self::return_error( 'Por favor, informe seu e-mail.' );
		}
		$message = sanitize_textarea_field( trim( $_POST['contactMessageTextarea'] ) );
		if ( empty( $message ) ) {
			self::return_error( 'Por favor, mande uma mensagem.' );
		}

		$email_address = get_option( 'va_app_contact_email_from' );

		$subject = "Contato de $name";
		$message = "<strong>E-mail:</strong> $email<br/><br/><strong>Mensagem:</strong><br />$message";

		$headers  = 'From: ' . $name . '<' . $email . '>' . "\r\n";
		$headers .= 'Reply-To: ' . $email . "\r\n";

		$headers .= 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		mail( $email_address, $subject, $message, $headers );

		wp_send_json_success();
	}

	public function add_allowed_origins( $origins ) {
		$origins[] = 'https://app.vishwaaroma.com';
		return $origins;
	}

	private static function return_error( $message ) {
		// $this->logger( $message );
		wp_send_json_error( array( 'message' => $message ) );
		die;
	}
}
