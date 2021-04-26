<?php
/*
Plugin Name: Vishwa Aroma
Plugin URI:
Description: Vishwa Aroma
Version:     1.1.0
Author:      Adriano Sommer
Author URI:
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) || exit;

define( 'VA_VERSION', '2.1.0' );
define( 'VA_PLUGIN_PATH', dirname( __FILE__ ) );
define( 'VA_PLUGIN_FILE', __FILE__ );
define( 'WEBAPP_DIR', ABSPATH . 'app/' );
define( 'ANDROID_DIR', ABSPATH . 'app-android/www/' );
define( 'IOS_DIR', ABSPATH . 'app-ios/www/' );
define( 'APPDEV_DIR', ABSPATH . 'appdev/' );
define( 'VENDOR_DIR', VA_PLUGIN_PATH . '/vendor/' );
define( 'TEMPLATE_DIR', VA_PLUGIN_PATH . '/template/' );
define( 'LOG_DIR', ABSPATH . '/wp-content/uploads/vishwa-aroma/construct-log/' );

if ( ! class_exists( 'VA' ) ) {
	include_once VA_PLUGIN_PATH . '/includes/class-vishwa-aroma.php';
	add_action( 'plugins_loaded', array( 'VA', 'init' ) );
}
