<?php

class MCM_Controller {
	protected $name;


	public function __construct( $name ) {
		$this->name = $name;
	}
	
	
	public function view( $view = 'index', $args = false ) {
		
		if ($args){
			extract($args);
		}
		
		include MCM::plugin_path() . '/inc/controllers/views/' . $this->name . '/' . $view  . '.php';
	}
	
}
