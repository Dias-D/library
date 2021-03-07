<?php
/**
 * Breadcrumb solution
 *
 * @version    0.2
 * @author     Daniel Polito - @dbpolito
 */

return array(

	/**
	 * Auto Populate Breadcrumb based on routes
	 */
	'auto_populate' => true,
	'ignore_segments' => array('dashboard', 'report'),

	/**
	 * If true the class will call ONLY ON AUTO POPULATING Lang::get() to each item
	 * of breadcrumb and WILL NOT ucwords and replace underscores to spaces
	 */
	'use_lang' => true,
	'lang_file' => 'breadcrumb',
	'lang_prefix' => null,

	/**
	 * Home Link
	 */
	'home' => array('name' => 'dashboard', 'link' => '/'),

	/**
	 * Template Structure
	 */
	'template' => array(
		'wrapper_start' => '<ol class="breadcrumb push-10-t">',
		'wrapper_end' => ' </ol>',
		'item_start' => '<li>',
		'item_start_active' => '<li class="link-effect">',
		'item_end' => '</li>',
		'divider' => ''
	),
	
	'display_always' => false

);

/* End of file breadcrumb.php */
