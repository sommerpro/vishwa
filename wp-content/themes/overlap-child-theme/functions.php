<?php
function overlap_child_after_setup_theme() {
    load_child_theme_textdomain( 'vs_overlap', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'overlap_child_after_setup_theme' );

function overlap_child_theme_enqueue_styles() {
    $version = wp_get_theme()->get('Version');
    // Add child theme stylesheet file
    wp_enqueue_style( 'overlap', get_stylesheet_directory_uri() . '/style.css', array('overlap-main', 'overlap-shortcodes'), $version );
}
add_action( 'wp_enqueue_scripts', 'overlap_child_theme_enqueue_styles', 100 );

function remove_post_format() {
  remove_theme_support('wyde-portfolio');
  remove_theme_support('wyde-testimonial');
  remove_theme_support('wyde-team-member');
}
add_action('after_setup_theme', 'remove_post_format', 15);

function wpb_mce_buttons_2($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}
add_filter('mce_buttons_2', 'wpb_mce_buttons_2');

function my_mce_before_init_insert_formats( $init_array ) {
    $style_formats = array(
        array(
            'title' => 'Nome Científico',
            'block' => 'p',
            'classes' => 'nome-cientifico',
            'wrapper' => false,
        ),
        array(
            'title' => 'Título da Seção',
            'block' => 'h3',
            'classes' => 'titulo-secao',
            'wrapper' => false,
        ),
        array(
            'title' => 'Seção',
            'block' => 'div',
            'classes' => 'one-half-responsive secao',
            'wrapper' => false,
        ),
        array(
            'title' => 'Subtítulo do Item',
            'block' => 'h4',
            'classes' => 'subtitulo-item',
            'wrapper' => false,
        ),
        array(
            'title' => 'Forma de Uso',
            'inline' => 'a',
            'classes' => 'legenda show-legenda',
            'wrapper' => false,
        )
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;
}
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

function my_theme_add_editor_styles() {
    add_editor_style( 'custom-editor-style.css' );
}
add_action( 'init', 'my_theme_add_editor_styles' );
