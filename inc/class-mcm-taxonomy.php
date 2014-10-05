<?php

class MCM_Taxonomy {

	private static $instance;

	public static function register() {
		if ( self::$instance == null ) {
			self::$instance = new MCM_Taxonomy();
		}
	}
	
	public function __construct() {
		add_action( 'init', array($this, 'register_post_types'), 0 );
	}
	
	public function register_post_types() {
		register_post_type( MCM_Env::$POST_TYPE_FOLDER, array(
		    'labels' => array(
			'name' => __( 'Collections', 'mcm' ),
			'singular_name' => __( 'Collection', 'mcm' ),
			'add_new' => __( 'Add Collection', 'mcm' ),
			'add_new_item' => __( 'Add New Collection', 'mcm' ),
			'edit' => __( 'Edit', 'mcm' ),
			'edit_item' => __( 'Edit Collection', 'mcm' ),
			'new_item' => __( 'New Collection', 'mcm' ),
			'view' => __( 'View Collection', 'mcm' ),
			'view_item' => __( 'View Collection', 'mcm' ),
			'search_items' => __( 'Search Collections', 'mcm' ),
			'not_found' => __( 'No Collections found', 'mcm' ),
			'not_found_in_trash' => __( 'No Collections found in trash', 'mcm' ),
			'parent' => __( 'Parent Contact', 'mcm' )
		    ),
		    'description' => __( 'This is where you can add new folders and collections to your site.', 'mcm' ),
		    'public' => true,
		    'show_ui' => true,
		    'publicly_queryable' => true,
		    'exclude_from_search' => false,
		    'hierarchical' => true,
		    'rewrite' => false,
		    'query_var' => true,
		    'supports' => array('title', 'excerpt'),
		    'has_archive' => false,
		    'show_in_nav_menus' => true,
	
		) );
	}

}
