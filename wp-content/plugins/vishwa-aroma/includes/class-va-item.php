<?php
/**
 * Terra Flor
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

new VA_Item();

class VA_Item {
	private $log_data;

	private static $meta_box_data = array(
		'va_title'           => '',
		'va_scientific_name' => '',
		'va_therapy'         => '',
		'va_aromachological' => '',
		'va_dermatological'  => '',
		'va_link_url'        => '',
	);

	private static $meta_box_data_type = array(
		'va_title'           => 'html',
		'va_scientific_name' => 'html',
		'va_therapy'         => 'textarea',
		'va_aromachological' => 'textarea',
		'va_dermatological'  => 'textarea',
		'va_link_url'        => 'url',
	);

	private static $taxonomies = array(
		'item_category',
		'item_help_for',
		'item_advice',
	);

	public function __construct() {
		$this->id = 'item';

		add_action( 'init', array( $this, 'create_post' ) );
		add_action( 'add_meta_boxes_item', array( $this, 'add_meta_box' ) );
		add_action( 'edit_form_after_title', array( $this, 'move_before_editor' ) );
		add_action( 'save_post_item', array( $this, 'save_meta_box_form_data' ) );
		add_action( 'manage_item_posts_custom_column', array( $this, 'custom_columns' ), 10, 2 );
		add_action( 'pre_get_posts', array( $this, 'custom_orderby' ) );

		add_filter( 'manage_item_posts_columns', array( $this, 'add_columns' ) );
		add_filter( 'manage_edit-item_sortable_columns', array( $this, 'sortable_columns' ) );

		if (
			( isset( $_GET['post_type'] ) && 'item' === $_GET['post_type'] )
			&& ( isset( $_GET['taxonomy'] ) && array_search( $_GET['taxonomy'], self::$taxonomies ) ) // phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		) {
			add_action( 'admin_init', array( $this, 'admin_init_item_taxonomies' ), 0 );

			foreach ( self::$taxonomies as $taxonomy ) {
				add_action( "{$taxonomy}_add_form_fields", array( $this, 'form_add_image' ), 10, 2 );
				add_action( "create_{$taxonomy}", array( $this, 'save_taxonomy_image' ), 10, 2 );
				add_action( "{$taxonomy}_edit_form_fields", array( $this, 'form_update_image' ), 10, 2 );
				add_action( "edit_{$taxonomy}", array( $this, 'update_taxonomy_image' ), 10, 2 );
			}

			add_action( 'admin_enqueue_scripts', array( $this, 'load_media' ) );
			add_action( 'admin_footer', array( $this, 'add_script' ) );
		}
	}

	public function create_post() {
		register_post_type(
			'item',
			array(
				'labels'        => array(
					'name'               => 'Itens',
					'singular_name'      => 'Item',
					'add_new'            => 'Adicionar item',
					'add_new_item'       => 'Adicionar novo item',
					'edit'               => 'Editar',
					'edit_item'          => 'Editar item',
					'new_item'           => 'Novo item',
					'view'               => 'Ver',
					'view_item'          => 'Ver item',
					'search_items'       => 'Procurar item',
					'not_found'          => 'Item não encontrado',
					'not_found_in_trash' => 'Nenhum item encontrado na lixeira',
					'parent'             => 'Item pai',
				),
				'public'        => true,
				'menu_position' => 2,
				'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ),
				'taxonomies'    => array( 'item_category', 'item_help_for', 'item_advice' ),
				'menu_icon'     => 'dashicons-pressthis',
				'has_archive'   => true,
			)
		);

		register_taxonomy(
			'item_category',
			array( 'item' ),
			array(
				'hierarchical'      => true,
				'labels'            => array(
					'name'              => 'Categorias',
					'singular_name'     => 'Categoria',
					'search_items'      => 'Procurar categorias',
					'all_items'         => 'Todas categorias',
					'parent_item'       => 'Categoria pai',
					'parent_item_colon' => 'Categoria pai:',
					'edit_item'         => 'Editar categoria',
					'update_item'       => 'Atualizar categoria',
					'add_new_item'      => 'Adicionar nova categoria',
					'new_item_name'     => 'Nome da nova categoria',
					'menu_name'         => 'Categorias',
				),
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => 'item-category' ),
			)
		);

		register_taxonomy(
			'item_help_for',
			array( 'item' ),
			array(
				'hierarchical'      => false,
				'labels'            => array(
					'name'          => 'Ajuda para',
					'singular_name' => 'Ajuda para',
					'search_items'  => 'Procurar ajuda para',
					'all_items'     => 'Todas ajuda para',
					'edit_item'     => 'Editar ajuda para',
					'update_item'   => 'Atualizar ajuda para',
					'add_new_item'  => 'Adicionar nova ajuda para',
					'new_item_name' => 'Nome da nova ajuda para',
					'menu_name'     => 'Ajuda para',
				),
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => 'item-help-for' ),
			)
		);

		register_taxonomy(
			'item_advice',
			array( 'item' ),
			array(
				'hierarchical'      => true,
				'labels'            => array(
					'name'          => 'Recomendações',
					'singular_name' => 'Recomendação',
					'search_items'  => 'Procurar recomendações',
					'all_items'     => 'Todas recomendações',
					'edit_item'     => 'Editar recomendação',
					'update_item'   => 'Atualizar recomendação',
					'add_new_item'  => 'Adicionar nova recomendação',
					'new_item_name' => 'Nome da nova recomendação',
					'menu_name'     => 'Recomendações',
				),
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => 'item-advice' ),
			)
		);
	}

	public function add_meta_box( $post ) {
		add_meta_box(
			'item_meta_box',
			'Dados do item',
			array( $this, 'build_meta_box' ),
			'item',
			'advanced',
			'high'
		);
	}

	public function build_meta_box( $post ) {
		foreach ( self::$meta_box_data as $field => $value ) {
			self::$meta_box_data[ $field ] = get_post_meta( $post->ID, $field, true );
		}

		wp_nonce_field( basename( __FILE__ ), 'meta_box_nonce' );

		include_once VA_PLUGIN_PATH . '/views/va-item-meta-box.php';

		$this->load_scripts();
	}

	public function move_before_editor() {
		global $post, $wp_meta_boxes;
		do_meta_boxes( get_current_screen(), 'advanced', $post );
		unset( $wp_meta_boxes['item']['advanced'] );
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

		foreach ( self::$meta_box_data as $field => $type ) {
			if ( isset( $_POST[ $field ] ) ) {
				self::$meta_box_data[ $field ] = $_POST[ $field ];
			}
		}

		$this->save_meta_box_data( $post_id );
	}

	public function save_meta_box_data( $post_id ) {
		foreach ( self::$meta_box_data_type as $field => $type ) {
			switch ( $type ) {
				case 'html':
				case 'textarea':
					$value = wp_kses_post( self::$meta_box_data[ $field ] );
					break;
				case 'url':
					$value = esc_url( self::$meta_box_data[ $field ] );
					break;
				default:
					$value = sanitize_text_field( self::$meta_box_data[ $field ] );
					break;
			}
			update_post_meta( $post_id, $field, $value );
		}
	}

	public function add_columns( $columns ) {
		unset( $columns['date'] );
		return array_merge(
			$columns,
			array(
				'va_scientific_name' => 'Nome científico',
				'date'               => 'Data',
			)
		);
	}

	public function custom_columns( $column, $post_id ) {
		if ( 'va_scientific_name' === $column ) {
			echo get_post_meta( $post_id, 'va_scientific_name', true );
		}
	}

	public function sortable_columns( $columns ) {
		$columns['va_scientific_name'] = 'va_scientific_name';
		return $columns;
	}

	public function custom_orderby( $query ) {
		if ( ! is_admin() ) {
			return;
		}

		$orderby = $query->get( 'orderby' );

		if ( 'va_scientific_name' === $orderby ) {
			$query->set( 'meta_key', 'va_scientific_name' );
			$query->set( 'orderby', 'meta_value' );
		}
	}

	public function form_add_image( $taxonomy ) {
		?>
		<div class="form-field term-group">
			<label for="taxonomy-image-id">Imagem</label>
			<input type="hidden" id="taxonomy-image-id" name="taxonomy-image-id" class="custom_media_url" value="">
			<div id="image-wrapper"></div>
			<p>
				<input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button" name="ct_tax_media_button" value="Adicionar Imagem" />
				<input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove" name="ct_tax_media_remove" value="Remover Imagem" />
			</p>
		</div>
		<?php
	}

	public function save_taxonomy_image( $term_id, $tt_id ) {
		if ( isset( $_POST['taxonomy-image-id'] ) && '' !== $_POST['taxonomy-image-id'] ) {
			$image = esc_attr( $_POST['taxonomy-image-id'] );
			add_term_meta( $term_id, 'taxonomy-image-id', $image, true );
		}
	}

	public function form_update_image( $term, $taxonomy ) {
		$image_id = get_term_meta( $term->term_id, 'taxonomy-image-id', true );
		?>
		<tr class="form-field term-group-wrap">
			<th scope="row">
				<label for="taxonomy-image-id">Imagem</label>
			</th>
			<td>
				<input type="hidden" id="taxonomy-image-id" name="taxonomy-image-id" value="<?php echo $image_id; ?>">
				<div id="image-wrapper"><?php echo ( $image_id ) ? wp_get_attachment_image( $image_id, 'thumbnail' ) : ''; ?></div>
				<p>
					<input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button" name="ct_tax_media_button" value="Adicionar Imagem" />
					<input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove" name="ct_tax_media_remove" value="Remover Imagem" />
				</p>
			</td>
		</tr>
		<?php
	}

	public function update_taxonomy_image( $term_id, $tt_id ) {
		if ( isset( $_POST['taxonomy-image-id'] ) && '' !== $_POST['taxonomy-image-id'] ) {
			$image = esc_attr( $_POST['taxonomy-image-id'] );
			update_term_meta( $term_id, 'taxonomy-image-id', $image );
		} else {
			update_term_meta( $term_id, 'taxonomy-image-id', '' );
		}
	}

	public function load_media() {
		if ( ! isset( $_GET['taxonomy'] ) || false === array_search( $_GET['taxonomy'], self::$taxonomies ) ) { // phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
			return;
		}
		wp_enqueue_media();
	}

	public function add_script() {
		wp_enqueue_script( 'tf-taxonomies-js', plugins_url( 'assets/admin/js/taxonomies.js', VA_PLUGIN_FILE ), array( 'jquery' ), VA_VERSION, true );
	}

	private function load_scripts() {
		wp_enqueue_style( 'va-admin-css' );
	}
}
