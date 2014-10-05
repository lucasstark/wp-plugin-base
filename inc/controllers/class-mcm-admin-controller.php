<?php

class MCM_Admin_Controller extends MCM_Controller {
	private static $instance; 
	
	public static function regsiter(){
		if (self::$instance == null){
			self::$instance = new MCM_Admin_Controller();
		}
	}
	
	private $root_slug;
	
	public function __construct() {
		parent::__construct('main');
		
		add_action('admin_menu', array($this, 'on_admin_menu'));
		add_action('admin_enqueue_scripts', array($this, 'on_admin_enqueue_scripts'));
		
	}
	
	public function on_admin_menu() {
		$this->root_slug = add_menu_page(__('Media Manager'), __('Media Manager'), 'upload_files', 'mcm', array($this, 'do_mcm_page'));
		add_submenu_page($this->root_slug, __('Settings', 'mcm'), __('Settings', 'mcm'), 'manage_options', 'mcm-settings', array($this, 'do_mcm_settings_page'));
	}
	
	public function on_admin_enqueue_scripts( $handle ){
		if ( strpos( $handle, 'mcm' ) !== false ) {
			wp_enqueue_style('mcm-admin', MCM::plugin_url() . '/assets/css/mcm-admin.css', null, MCM::$version );
		}
	}
	
	public function do_mcm_page() {
		
		$this->view();
		
	}
	
	public function do_mcm_settings_page(){
		$this->view('settings');
	}
	
}

