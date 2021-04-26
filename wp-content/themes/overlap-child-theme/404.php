<?php query_posts( array( 'pagename' => 'pagina-404' ) ); ?>
<?php if ( have_posts() ) { ?>
	<?php the_post(); ?>
	<?php get_header( 'pagina-404' ); ?>
	<div id="content">
	<div class="main-content no-sidebar">
		<div class="page-content container">
			<?php the_content(); ?>
		</div>
	</div>
	</div>
	<?php get_footer(); ?>
<?php } else { ?>
	<?php get_header(); ?>
	<?php overlap_page_title(); ?>
<div class="<?php echo esc_attr( overlap_get_layout_class( 'boxed', '1' ) ); ?>">
	<?php overlap_page_background(); ?>
	<div class="page-content container">
		<div class="<?php echo esc_attr( overlap_get_main_class( '1' ) ); ?>">
			<div class="col-inner">
				<div class="page-error-wrapper">
					<h5 class="page-error-code"><?php echo esc_html__( '404', 'overlap' ); ?></h5>
					<h4 class="page-error-title"><?php echo esc_html__( 'Page not found', 'overlap' ); ?></h4>
					<h6 class="page-error-text"><?php echo esc_html__( 'It looks like nothing was found at this location. Maybe try a search?', 'overlap' ); ?></h6>
				</div>
				<?php get_search_form(); ?>
			</div>
		</div>
	</div>
</div>
	<?php get_footer(); ?>
	<?php
}
