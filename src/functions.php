<?php

/**
 * Registers js file
 */
function my_scripts_method() {
	wp_enqueue_script(
		'bs',
		get_stylesheet_directory_uri() . '/js/browserdetect.js'
	);
	wp_enqueue_script(
		'custom-script',
		get_stylesheet_directory_uri() . '/js/damian.js',
		array( 'jquery', 'bs')
	);
}
add_action( 'wp_enqueue_scripts', 'my_scripts_method' );

/**
 * Custom post meta info
 */
function twentytwelve_entry_meta() {
	// Translators: used between list items, there is a space after the comma.
	//$categories_list = get_the_category_list( __( ', ', 'twentytwelve' ) );
	$categories_list = nil;
	
	// Translators: used between list items, there is a space after the comma.
	$tag_list = get_the_tag_list( '', __( ', ', 'twentytwelve' ) );

	$date = sprintf( '<time class="entry-date" datetime="%1$s">%2$s</time>',
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	//$author = sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s" title="%2$s" rel="author">%3$s</a></span>',
	//	esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
	//	esc_attr( sprintf( __( 'View all posts by %s', 'twentytwelve' ), get_the_author() ) ),
	//	get_the_author()
	//);
	$author = nil;
	
	// Translators: 1 is category, 2 is tag, 3 is the date and 4 is the author's name.
	if ( $tag_list ) {
		$utility_text = __( '%3$s - TAGS: %2$s.', 'twentytwelve' );
	} else {
		$utility_text = __( '%3$s.', 'twentytwelve' );
	}

	printf(
		$utility_text,
		$categories_list,
		$tag_list,
		$date,
		$author
	);
}

function more_posts() {
  global $wp_query;
  return $wp_query->current_post + 1 < $wp_query->post_count;
}

/**
 * Custom Displays navigation to next/previous pages when applicable.
 */
function twentytwelve_content_nav( $html_id ) {
	global $wp_query;

	$html_id = esc_attr( $html_id );

	if ( $wp_query->max_num_pages > 1 ) : ?>
		<nav id="<?php echo $html_id; ?>" class="navigation" role="navigation">
			<h3 class="assistive-text"><?php _e( 'Post navigation', 'twentytwelve' ); ?></h3>
			<div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">E</span> Older posts', 'twentytwelve' ) ); ?></div>
			<div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav"> F</span>', 'twentytwelve' ) ); ?></div>
		</nav><!-- #<?php echo $html_id; ?> .navigation -->
	<?php endif;
}

?>
