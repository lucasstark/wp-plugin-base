<?php

/**
 * Plugin Name: WP Media Collection Manager
 * Plugin URI: #
 * Description: Organize your media into folders and collections
 * Version: 1.0.0
 * Author: Lucas Stark
 * Author URI: http://www.lucasstark.com/
 * License: GPL2
 */


class MCM {
	public static $version = '1.0.0';
	
	private static $instance;
	
	public static function register(){
		if (self::$instance == null){
			self::$instance = new MCM();
		}
	}
	
	public static $message_controller;
	
	
	public function __construct() {
		// Auto-load classes on demand
		if ( function_exists( "__autoload" ) ) {
			spl_autoload_register( "__autoload" );
		}

		spl_autoload_register( array($this, 'autoload') );
		
		
		self::$message_controller = new MCM_Messages();
		
		MCM_Taxonomy::register();
		
		if (  is_admin() && !defined( 'DOING_AJAX')){
			add_action( 'admin_notices', array(MCM::$message_controller, 'show_messages') );
		}
		
		if (  is_admin() ){
			MCM_Admin_Controller::regsiter();
		}
		
	}
	
	
	public function autoload( $class ) {
		$path = null;
		$class = strtolower( $class );
		$file = 'class-' . str_replace( '_', '-', $class ) . '.php';

		if ( strpos( $class, 'mcm_admin_controller' ) === 0 || strpos( $class, 'mcm_controller' ) === 0 ) {
			$path = self::plugin_path() . '/inc/controllers/';
		} elseif ( strpos( $class, 'mcm_admin' ) === 0 ) {
			$path = self::plugin_path() . '/admin/';
		}

		if ( strpos( $class, 'mcm_model' ) === 0 ) {
			$path = self::plugin_path() . '/inc/models/';
		}

		if ( $path && is_readable( $path . $file ) ) {
			include_once( $path . $file );
			return;
		}

		if ( strpos( $class, 'mcm_' ) === 0 ) {
			$path = self::plugin_path() . '/inc/';
		}

		if ( $path && is_readable( $path . $file ) ) {
			include_once( $path . $file );
			return;
		}	
	}
	
	
	
	
	
	
	public function show_admin_notices() {
		$this->message_handler->show_messages();
	}

	/** Nonces *************************************************************** */

	/**
	 * Return a nonce field.
	 * @access public
	 * @param mixed $action
	 * @param bool $referer (default: true)
	 * @param bool $echo (default: true)
	 * @return string
	 */
	public static function nonce_field( $action, $referer = true, $echo = true ) {
		return wp_nonce_field( 'mcm-action-' . $action, '_n', $referer, $echo );
	}

	/**
	 * Return a url with a nonce appended.
	 * @access public
	 * @param mixed $action
	 * @param string $url (default: '')
	 * @return string
	 */
	public static function nonce_url( $action, $url = '' ) {
		return add_query_arg( array('_n' => wp_create_nonce( 'mcm-action-' . $action ), 'mcm-action' => $action), $url );
	}

	public static function verify_nonce( $action, $method = '_POST', $error_message = false ) {

		$name = '_n';

		if ( $error_message === false )
			$error_message = __( 'Action failed. Please refresh the page and retry.', 'mcm' );


		if ( isset( $_REQUEST[$name] ) && wp_verify_nonce( $_REQUEST[$name], $action ) )
			return true;

		if ( $error_message ) {
			//$this->add_error($error_message);
		}

		return false;
	}

	/** Helper functions ***************************************************** */

	/**
	 * Get the plugin url.
	 * @access public
	 * @return string
	 */
	public static function plugin_url() {
		return plugins_url( basename( plugin_dir_path( __FILE__ ) ), basename( __FILE__ ) );
	}

	/**
	 * Get the plugin path.
	 * @access public
	 * @return string
	 */
	public static function plugin_path() {
		return untrailingslashit( plugin_dir_path( __FILE__ ) );
	}
}


MCM::register();