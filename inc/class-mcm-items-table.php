<?php

if ( !class_exists( 'WP_List_Table' ) ) :
	require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
endif;

class MCM_Items_Table extends WP_List_Table {

	public $folder = 0;

	public function __construct( $folder = 0, $args = array() ) {
		parent::__construct( $args );
		$this->folder = $folder;
	}

	public function column_cb( $item ) {
		echo '<label class="screen-reader-text" for="cb-select-<?php the_ID(); ?>">' . sprintf( __( 'Select %s' ), $item->post_title ) . '</label>';
		echo '<input id="cb-select-' . $item->ID . '" type="checkbox" name="post[]" value="' . $item->ID . '" />';
		echo '<div class="locked-indicator"></div>';
	}

	/**
	 * 
	 * @param Ellucian_File_Manager_Log_Entry $item
	 */
	public function column_date( $item ) {
		if ( $item->post_date_gmt != '0000-00-00 00:00:00' ) {
			echo get_date_from_gmt( $item->post_date_gmt, 'm/d/Y g:i:s A' );
		} else {
			echo 'N/A';
		}
	}

	/**
	 * 
	 * @param Ellucian_File_Manager_Log_Entry $item
	 */
	public function column_title( $item ) {
		echo $item->post_title;
	}

	public function get_columns() {
		$columns = array(
		    'cb' => '<input type="checkbox" />',
		    'title' => __( 'Title', 'ellucian-file-manager' ),
		    'date' => __( 'Date', 'ellucian-file-manager' ),
		);


		return $columns;
	}

	function get_sortable_columns() {
		$sortable_columns = array(
		    'title' => array('title', false)
		);
		return $sortable_columns;
	}

	public function prepare_items() {
		$columns = $this->get_columns();

		$hidden = array();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array($columns, $hidden, $sortable);

		$query = new WP_Query( array(
		    'post_type' => array(
			'attachment',
			MCM_Env::$POST_TYPE_FOLDER
		    ),
		    'post_status' => array(
			'publish',
			'inherit',
		    ),
		    'post_parent' => $this->folder,
			)
		);

		$per_page = 40;
		$total_items = $query->found_posts;
		$total_pages = $query->max_num_pages;

		$this->set_pagination_args( array(
		    'total_items' => $total_items,
		    'total_pages' => $total_pages,
		    'per_page' => $per_page
		) );

		$this->items = $query->posts;
		return $query->posts;
	}

}
