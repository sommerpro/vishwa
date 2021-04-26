<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

new VA_Form_Of_Use();

class VA_Form_Of_Use {
	public function __construct() {
		$this->id = 'form_of_use';

		add_action( 'init', array( $this, 'create_post' ) );
		add_action( 'add_meta_boxes_form_of_use', array( $this, 'add_meta_box' ) );
		add_action( 'edit_form_after_title', array( $this, 'move_before_editor' ) );
		add_action( 'save_post_form_of_use', array( $this, 'save_meta_box_form_data' ) );
		add_action( 'manage_form_of_use_posts_custom_column', array( $this, 'custom_columns' ), 10, 2 );
		add_action( 'pre_get_posts', array( $this, 'custom_orderby' ) );

		add_filter( 'manage_form_of_use_posts_columns', array( $this, 'add_columns' ) );
		add_filter( 'manage_edit-form_of_use_sortable_columns', array( $this, 'sortable_columns' ) );
	}

	public function create_post() {
		register_post_type(
			'form_of_use',
			array(
				'labels'        => array(
					'name'               => 'Formas de uso',
					'singular_name'      => 'Forma de uso',
					'add_new'            => 'Adicionar forma de uso',
					'add_new_item'       => 'Adicionar nova forma de uso',
					'edit'               => 'Editar',
					'edit_item'          => 'Editar forma de uso',
					'new_item'           => 'Nova forma de uso',
					'view'               => 'Ver',
					'view_item'          => 'Ver forma de uso',
					'search_items'       => 'Procurar formas de uso',
					'not_found'          => 'Nenhuma forma de uso encontrada',
					'not_found_in_trash' => 'Nenhuma forma de uso encontrada na lixeira',
					'parent'             => 'Forma de uso pai',
				),
				'public'        => true,
				'menu_position' => 2,
				'supports'      => array( 'title', 'editor' ),
				'rewrite'       => array( 'slug' => 'form-of-use' ),
				'menu_icon'     => 'dashicons-hammer',
				'has_archive'   => true,
			)
		);
	}

	public function add_meta_box( $post ) {
		add_meta_box(
			'form_of_use_meta_box',
			'Abreviação',
			array( $this, 'build_meta_box' ),
			'form_of_use',
			'advanced',
			'high'
		);
	}

	public function build_meta_box( $post ) {
		$abbreviation = get_post_meta( $post->ID, 'va_abbreviation', true );

		wp_nonce_field( basename( __FILE__ ), 'meta_box_nonce' );
		?>
		<label for="abbreviation">Iniciais</label>
		<input  type="text" id="abbreviation" name="abbreviation" autocomplete="off" value="<?php echo $abbreviation; ?>">
		<?php
	}

	public function move_before_editor() {
		global $post, $wp_meta_boxes;
		do_meta_boxes( get_current_screen(), 'advanced', $post );
		unset( $wp_meta_boxes['form_of_use']['advanced'] );
	}

	public function save_meta_box_form_data( $post_id ) {
		if (
			( ! isset( $_POST['meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['meta_box_nonce'], basename( __FILE__ ) ) )
			|| ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			|| ( defined( 'DOING_AJAX' ) && DOING_AJAX )
			|| ( ! current_user_can( 'edit_post', $post_id ) )
		) {
			return;
		}

		$abbreviation = sanitize_text_field( $_POST['abbreviation'] );
		if ( empty( $abbreviation ) ) {
			delete_post_meta( $post_id, 'va_abbreviation' );
		} else {
			update_post_meta( $post_id, 'va_abbreviation', $abbreviation );
		}
	}

	public function add_columns( $columns ) {
		unset( $columns['date'] );
		return array_merge(
			$columns,
			array(
				'va_abbreviation' => 'Abreviação',
				'date'            => 'Data',
			)
		);
	}

	public function custom_columns( $column, $post_id ) {
		if ( 'va_abbreviation' === $column ) {
			echo get_post_meta( $post_id, 'va_abbreviation', true );
		}
	}

	public function sortable_columns( $columns ) {
		$columns['va_abbreviation'] = 'va_abbreviation';
		return $columns;
	}

	public function custom_orderby( $query ) {
		if ( ! is_admin() ) {
			return;
		}

		$orderby = $query->get( 'orderby' );

		if ( 'va_abbreviation' === $orderby ) {
			$query->set( 'meta_key', 'va_abbreviation' );
			$query->set( 'orderby', 'meta_value' );
		}
	}
}
