<?php 

	$table = new MCM_Items_Table(isset($_REQUEST['folder']) ? $_REQUEST['folder'] : 0);
	$table->prepare_items();

?>


<div class="wrap">
	<h2><?php _e('Media Manager', 'mcm'); ?></h2>
	<?php $table->display(); ?>
</div>