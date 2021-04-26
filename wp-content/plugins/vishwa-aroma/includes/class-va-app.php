<?php
/**
 * Admin
 *
 * @since   2.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

class VA_App {
	private $versions;

	public function __construct() {
		$this->versions = unserialize( get_option( 'va_app_versions' ) );
	}

	public function get_versions() {
		return $this->versions;
	}

	public function set_versions( $versions ) {
		$this->versions = $versions;
		return update_option( 'va_app_versions', serialize( $this->versions ) );
	}

	public function construct_app( $version_number, $environment ) {
		require VENDOR_DIR . 'tiny-html-minifier-master/tiny-html-minifier.php';
		include_once VENDOR_DIR . 'PHP-JS-CSS-Minifier-master/minifier.php';

		$this->write_log( 'Início do processamento', date_i18n( 'd/m/Y H:i:s' ), $version_number );

		if ( 'webapp' === $environment ) {
			$app_folder      = WEBAPP_DIR;
			$utm             = '?utm_source=guia&utm_medium=web';
			$utm_medium      = 'web';
			$analytics       = '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-142490030-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-142490030-1");</script>';
			$extra_icons     = '';
			$security_policy = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' https://vishwaaroma.com 'unsafe-inline' 'unsafe-eval' data:;	script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' https://www.google-analytics.com data: content:;\">";
			$template_share  = $this->read_template( 'section-share-web.html' );
		} elseif ( 'android' === $environment ) {
			$app_folder      = ANDROID_DIR;
			$utm             = '?utm_source=guia&utm_medium=android';
			$utm_medium      = 'android';
			$analytics       = '';
			$extra_icons     = '';
			$security_policy = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' vishwaaroma.com 'unsafe-inline' data: gap: 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;\">";
			$template_share  = $this->read_template( 'section-share-app.html' );
		} elseif ( 'ios' === $environment ) {
			$app_folder      = IOS_DIR;
			$utm             = '?utm_source=guia&utm_medium=ios';
			$utm_medium      = 'ios';
			$analytics       = '';
			$extra_icons     = $this->read_template( 'head-apple-icon.html' );
			$security_policy = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' vishwaaroma.com 'unsafe-inline' data: gap: 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;\">";
			$template_share  = $this->read_template( 'section-share-app.html' );
		} else {
			$app_folder      = APPDEV_DIR;
			$utm             = '?utm_source=guia&utm_medium=dev';
			$utm_medium      = 'dev';
			$analytics       = '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-142490030-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-142490030-1");</script>';
			$extra_icons     = '';
			$security_policy = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' https://vishwaaroma.com 'unsafe-inline' 'unsafe-eval' data:;	script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' https://www.google-analytics.com data: content:;\">";
			$template_share  = $this->read_template( 'section-share-web.html' );
		}

		setlocale( LC_ALL, 'pt_BR.utf8', 'pt_BR.iso88591' );

		// Exclui todas as imagens dos itens anteriormente exportados
		$files = glob( $app_folder . '/images/itens/*' );
		foreach ( $files as $file ) {
			if ( is_file( $file ) ) {
				unlink( $file );
			}
		}

		// Carrega templates
		$template_body         = $this->read_template( 'body.html' );
		$template_where_to_buy = $this->read_template( 'section-where-to-buy.html' );
		$template_form_of_use  = $this->read_template( 'section-form-of-use.html' );
		$template_item_content = $this->read_template( 'content-item.html' );

		// Monta as páginas de descrição dos itens (óleos)
		$app_pages   = array();
		$search_data = array();
		$menu_data   = array(); // para salvar dados que serão usados na montagem dos menus
		$form_of_use = self::read_form_of_use();
		$warnings    = array();

		// Lê todos os itens publicados
		$query = new WP_Query(
			array(
				'post_type'      => 'item',
				'post_status'    => 'publish',
				'orderby'        => 'title',
				'order'          => 'ASC',
				'posts_per_page' => -1,
			)
		);

		while ( $query->have_posts() ) {
			$query->the_post();
			$item_id              = get_the_ID();
			$item_title           = get_the_title();
			$item_slug            = get_post_field( 'post_name', get_post() );
			$item_name            = get_post_meta( $item_id, 'va_title', true );
			$item_scientific_name = get_post_meta( $item_id, 'va_scientific_name', true );
			$item_therapy         = get_post_meta( $item_id, 'va_therapy', true );
			$item_aromachological = get_post_meta( $item_id, 'va_aromachological', true );
			$item_dermatological  = get_post_meta( $item_id, 'va_dermatological', true );
			$item_link_url        = get_post_meta( $item_id, 'va_link_url', true );
			$item_image           = '';
			$item_category_slug   = '';
			$item_category_name   = '';

			if ( ! empty( $item_scientific_name ) ) {
				$item_scientific_name = '<h2 class="nome-cientifico">' . $item_scientific_name . '</h2>';
			}

			$current_attachment_id = get_post_thumbnail_id( $item_id, 'full' );

			$file = glob( TEMPLATE_DIR . 'images/' . $item_slug . '.*' );
			if ( 1 === count( $file ) && is_file( $file[0] ) ) {
				if ( ! empty( $current_attachment_id ) ) {
					wp_delete_attachment( $current_attachment_id, true );
				}

				$file        = $file[0];
				$filename    = basename( $file );
				$upload_file = wp_upload_bits( $filename, null, file_get_contents( $file ) );
				if ( ! $upload_file['error'] ) {
					$wp_filetype   = wp_check_filetype( $filename, null );
					$attachment    = array(
						'post_mime_type' => $wp_filetype['type'],
						'post_title'     => $item_title, // preg_replace( '/\.[^.]+$/', '', $filename ),
						'post_content'   => '',
						'post_status'    => 'inherit',
					);
					$attachment_id = wp_insert_attachment( $attachment, $upload_file['file'], $item_id );
					if ( ! is_wp_error( $attachment_id ) ) {
						require_once ABSPATH . 'wp-admin' . '/includes/image.php';
						$attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload_file['file'] );
						wp_update_attachment_metadata( $attachment_id, $attachment_data );
						set_post_thumbnail( $item_id, $attachment_id );
						unlink( $file );
					}
				}
			}

			$attachment_id = get_post_thumbnail_id( $item_id, 'full' );
			if ( ! empty( $attachment_id ) ) {
				$image           = image_downsize( $attachment_id, 'full' );
				$image_from      = str_replace( get_site_url() . '/', ABSPATH, $image[0] );
				$image_extension = pathinfo( $image_from, PATHINFO_EXTENSION );
				$image_to        = $app_folder . 'images/itens/' . $item_slug . '.' . $image_extension;

				if ( copy( $image_from, $image_to ) ) {
					$image_path = 'images/itens/' . $item_slug . '.' . $image_extension;
				}

				$item_image = '<div class="imagem"><img data-original="' . $image_path . '" class="preload-image full-bottom" alt="' . $item_title . '"></div>';
			}

			$item_content   = '';
			$search_content = '';
			if ( ! empty( $item_therapy ) ) {
				$item_content   .= '<div class="one-half-responsive secao"><h3>Terapêutica</h3>' . $this->set_item_content( $item_therapy ) . '</div>';
				$search_content .= $item_therapy;
			}
			if ( ! empty( $item_aromachological ) ) {
				$item_content   .= '<div class="one-half-responsive secao"><h3>Aromacológica</h3>' . $this->set_item_content( $item_aromachological ) . '</div>';
				$search_content .= $item_aromachological;
			}
			if ( ! empty( $item_dermatological ) ) {
				$item_content   .= '<div class="one-half-responsive secao"><h3>Dermatológica</h3>' . $this->set_item_content( $item_dermatological ) . '</div>';
				$search_content .= $item_dermatological;
			}

			$item_the_content = trim( get_the_content() );
			if ( ! empty( $item_the_content ) ) {
				$item_content   .= '<div class="one-half-responsive secao">' . $this->set_item_content( $item_the_content ) . '</div>';
				$search_content .= $item_the_content;
			}

			$app_pages[ $item_slug ]['item'] = $item_title;

			// Salva o conteúdo para montar a base das pesquisas do versoes_aplicativo
			$item_search_data             = array();
			$item_search_data['nome']     = $item_title;
			$item_search_data['slug']     = $item_slug;
			$item_search_data['conteudo'] = $search_content;

			// Lê todas as taxonomias associadas ao item
			$item_terms = get_the_terms( $item_id, array( 'item_category', 'item_help_for', 'item_advice' ) );

			if ( $item_terms && ! is_wp_error( $terms ) ) {
				$item_advices = '';

				foreach ( $item_terms as $term ) {
					$term_taxonomy    = $term->taxonomy;
					$term_name        = $term->name;
					$term_slug        = $term->slug;
					$term_description = $term->description;

					// Salva dados específicos do item para posterior montagem dos html do item e menus
					switch ( $term_taxonomy ) {
						case 'item_category':
							$menu_data[ $term_slug ]['name'] = $term_name;
							$menu_data[ $term_slug ][ strtoupper( sanitize_title( substr( $item_title, 0, 1 ) ) ) ][ $item_title ] = $item_slug;
							$item_search_data['categoria'] = $term_name;
							$item_category_slug            = $term_slug;
							$item_category_name            = $term_name;
							if ( ! isset( $warnings[ $term_slug ] ) && file_exists( TEMPLATE_DIR . "content-warnings-$term_slug.html" ) ) {
								$warnings[ $term_slug ] = $this->read_template( "content-warnings-$term_slug.html" );
							}
							break;
						case 'item_help_for':
							$menu_data['help-for'][ $term_name ][ $item_title ] = $item_slug;
							break;
						case 'item_advice':
							$item_advices .= '<p>' . $term_description . '</p>';
							break;
					}
				}

				// Monta html das formas de uso
				// Elas podem estar já dentro da html definitiva ou no formato {{X-Y-Z}}
				if ( preg_match_all( '/\{\{(.*?)\}\}/', $item_content, $matches ) ) {
					foreach ( $matches[1] as $key => $group ) {
						$html         = '<p><a class="legenda show-legenda">' . str_replace( '-', '</a> <a class="legenda show-legenda">', $group ) . '</a></p>';
						$item_content = str_replace( $matches[0][ $key ], $html, $item_content );
					}
				}

				// Lê todos os html das formas de uso para montar as janelas com as respectivas explicações das mesmas
				preg_match_all( '/\<a\ class\="legenda show\-legenda"\>(.{1,3})\<\/a\>/', $item_content, $matches );
				$item_forms_of_use = array_unique( $matches[1], SORT_STRING );
				ksort( $item_forms_of_use, SORT_LOCALE_STRING );

				$html_forms_of_use = '';
				foreach ( $item_forms_of_use as $abbreviation ) {
					if ( array_key_exists( $abbreviation, $form_of_use ) ) {
						$html_forms_of_use .= str_replace(
							array(
								'%abbreviation%',
								'%name%',
								'%content%',
							),
							array(
								$abbreviation,
								$form_of_use[ $abbreviation ]['name'],
								$form_of_use[ $abbreviation ]['content'],
							),
							$template_form_of_use
						);
					} else {
						$app_pages[ $item_slug ]['error'][] = "Não existe forma de uso cadastrada para a abreviação '$abbreviation'.";
					}
				}

				// Coleta o conteúdo atualizado do item para compor os dados para o campo de pesquisa do aplicativo
				$search_data[] = $this->set_search_data( $item_search_data );

				// Monta html das recomendações do item
				$html_advices = '';
				if ( ! empty( $item_advices ) ) {
					$html_advices = str_replace(
						'%advices%',
						$item_advices,
						$this->read_template( 'content-advices.html' )
					);
				}

				// Monta a seção de onde comprar
				$data_links = explode( ',', $item_link_url );
				$buttons    = '';
				foreach ( $data_links as $data_link ) {
					$data_link  = explode( ';', $data_link );
					$link       = $data_link[0] . $utm . '&utm_content=onde_comprar';
					$link_title = $item_title;

					if ( isset( $data_link[1] ) && ! empty( $data_link[1] ) ) {
						$link_title = urldecode( $data_link[1] );
					}

					// if ( 'ios' === $environment ) {
					// $buttons .= '<a href="#" onclick="cordova.InAppBrowser.open(\'' . $link . '\', \'_system\'); return false;" class="button button-center button-green half-bottom half-top">' . $link_title . '</a>';
					// } else {
						$buttons .= '<a href="' . $link . '" class="button button-center button-green half-bottom half-top" target="_blank">' . $link_title . '</a>';
					// }
				}
				$html_where_to_buy = str_replace( array( '%buttons%' ), array( $buttons ), $template_where_to_buy );

				$html_item_content = str_replace(
					array(
						'%category%',
						'%title%',
						'%scientific-name%',
						'%image%',
						'%content%',
						'%advices%',
						'%warnings%',
					),
					array(
						$item_category_name,
						$item_name,
						$item_scientific_name,
						$item_image,
						$item_content,
						$html_advices,
						$warnings[ $item_category_slug ],
					),
					$template_item_content
				);

				$app_pages[ $item_slug ]['time']    = date_i18n( 'd/m/Y H:i:s' );
				$app_pages[ $item_slug ]['content'] = str_replace(
					array(
						'%content%',
						'%share%',
						'%form-of-use%',
						'%where-to-buy%',
					),
					array(
						$html_item_content,
						$template_share,
						$html_forms_of_use,
						$html_where_to_buy,
					),
					$template_body
				);
			}
		}

		wp_reset_query();

		// Cria as páginas de menu (óleos e ajuda para) com conteúdo padrão
		$template_menu_content  = $this->read_template( 'content-menu.html' );
		$template_menu_item     = $this->read_template( 'menu-item.html' );
		$template_menu_help_for = $this->read_template( 'menu-help-for.html' );

		// Processa os dados guardados na leitura de todos os itens publicados
		foreach ( $menu_data as $menu_type => $menu ) {
			// $menu => $menu_data['help-for'], $menu_data['oleo-essencial'], $menu_data['oleo-vegetal']
			ksort( $menu, SORT_LOCALE_STRING );

			// O nome do menu deve ser usado e descartado para não ser considerado um item no menu
			$menu_title = $menu['name'];
			unset( $menu['name'] );

			$html_menu = '';

			$menu_item_index = array();

			foreach ( $menu as $key => $menu_entries ) {
				// $key:
				// - para [oleo-essencial'], ['oleo-vegetal]: letra do alfabeto
				// - para ['help-for']: nome da ajuda
				// $menu_entries:
				// - para [oleo-essencial'] e ['oleo-vegetal]: array( título do item desta letra => slug do item )
				// - para ['help-for']: array( título do item para a ajuda => slug do item )
				ksort( $menu_entries, SORT_LOCALE_STRING );

				$html_menu_entry = '';

				foreach ( $menu_entries as $entry_name => $entry_slug ) {
					$html_menu_entry .= "<a href='" . $entry_slug . ".html'>" . $entry_name . '</a>';
				}

				if ( 'help-for' === $menu_type ) {
					$html_menu .= str_replace(
						array( '%index-id%', '%index%', '%entries%' ),
						array( strtolower( str_replace( ' ', '_', $key ) ), $key, $html_menu_entry ),
						$template_menu_help_for
					);
				} else {
					$html_menu        .= str_replace(
						array( '%index-id%', '%index%', '%entries%' ),
						array( strtolower( str_replace( ' ', '_', $key ) ), $key, $html_menu_entry ),
						$template_menu_item
					);
					$menu_item_index[] = $key;
				}
			}

			// Monta alfabeto de pesquisa
			$html_menu_item_index = '';
			if ( empty( $menu_item_index ) ) {
				$menu_title = 'Ajuda Para';
			} elseif ( count( $menu ) > 10 ) {
				$html_menu_item_index = $this->read_template( 'menu-item-index.html' );
				foreach ( $menu_item_index as $letter ) {
					$html_menu_item_index = str_replace(
						'<p>' . strtoupper( $letter ) . '</p>',
						"<a href='#" . strtolower( $letter ) . "'><span>" . strtoupper( $letter ) . '</span></a>',
						$html_menu_item_index
					);
				}
			}

			$html_menu = str_replace(
				array(
					'%type%',
					'%title%',
					'%content%',
					'%index%',
				),
				array(
					$menu_type,
					$menu_title,
					$html_menu,
					$html_menu_item_index,
				),
				$template_menu_content
			);

			$app_pages[ 'menu-' . $menu_type ]['time']    = date_i18n( 'd/m/Y H:i:s' );
			$app_pages[ 'menu-' . $menu_type ]['content'] = str_replace(
				array(
					'%content%',
					'%share%',
					'%form-of-use%',
					'%where-to-buy%',
				),
				array(
					$html_menu,
					'',
					'',
					'',
				),
				$template_body
			);
		}

		// Grava json com os dados de pesquisa para manipulação pelo aplicativo
		$help_for_data = $menu_data['help-for'];
		ksort( $help_for_data, SORT_LOCALE_STRING );
		$data_js = str_replace(
			array( '%data%', '%help-for%' ),
			array(
				json_encode( $search_data ),
				json_encode( $help_for_data ),
			),
			$this->read_template( 'pesquisa.js' )
		);
		$this->file_put_contents_atomically( TEMPLATE_DIR . 'scripts/pesquisa.js', $data_js, FILE_TEXT );

		// Grava versao do aplicativo para apresentação dos avisos legais
		$data_js = str_replace( '%versao%', $version_number, $this->read_template( 'aviso-legal.js' ) );
		$this->file_put_contents_atomically( TEMPLATE_DIR . 'scripts/aviso-legal.js', $data_js, FILE_TEXT );

		// Monta JS e CSS de acordo com o ambiente selecionado
		if ( 'android' === $environment ) {
			$js_links  = '<script type="text/javascript" src="cordova.js"></script>';
			$js_files  = array( 'aviso-legal', 'custom', 'framework-plugins', 'index', 'pesquisa', 'tutorial-android' );
			$css_files = array( 'framework', 'menus', 'style', 'tutorial', 'custom', 'android' );
		} elseif ( 'ios' === $environment ) {
			$js_links  = '<script type="text/javascript" src="cordova.js"></script>';
			$js_files  = array( 'aviso-legal', 'custom', 'framework-plugins', 'index', 'pesquisa', 'tutorial-ios' );
			$css_files = array( 'framework', 'menus', 'style', 'tutorial', 'custom', 'ios' );
		} else {
			$js_links  = '';
			$js_files  = array( 'aviso-legal', 'custom', 'framework-plugins', 'index', 'pesquisa', 'tutorial' );
			$css_files = array( 'framework', 'menus', 'style', 'tutorial', 'custom' );
		}

		$js_links .= '<script type="text/javascript" src="scripts/jquery.js?ver=1.11.3"></script><script type="text/javascript" src="scripts/jqueryui.js?ver=1.11.4"></script><script type="text/javascript" src="scripts/jquery.cookie.js?ver=1.4.1"></script>';

		if ( 'development' !== $environment ) {
			// Unifica todos os JS
			$unique_js = '';
			foreach ( $js_files as $file ) {
				$unique_js .= $this->read_file( TEMPLATE_DIR . 'scripts/' . $file . '.js' );
			}
			$this->file_put_contents_atomically( TEMPLATE_DIR . 'scripts/guia.js', $unique_js, FILE_TEXT );
			$js        = array( TEMPLATE_DIR . 'scripts/guia.js' => $app_folder . 'scripts/guia.min.js' );
			$js_links .= '<script type="text/javascript" src="scripts/guia.min.js?ver=' . $version_number . '"></script>';

			// Unifica os CSS
			$unique_css = '';
			foreach ( $css_files as $file ) {
				$unique_css .= $this->read_file( TEMPLATE_DIR . 'styles/' . $file . '.css' );
			}
			$this->file_put_contents_atomically( TEMPLATE_DIR . 'styles/guia.css', $unique_css, FILE_TEXT );
			$css       = array( TEMPLATE_DIR . 'styles/guia.css' => $app_folder . 'styles/guia.min.css' );
			$css_links = '<link href="styles/guia.min.css?ver=' . $version_number . '" rel="stylesheet" type="text/css">';

			ob_start();
			minifyJS( $js );
			minifyCSS( $css );
			$this->write_log( ob_get_contents(), date_i18n( 'd/m/Y H:i:s' ) );
			ob_end_clean();
		} else {
			foreach ( $js_files as $file ) {
				copy( TEMPLATE_DIR . 'scripts/' . $file . '.js', $app_folder . 'scripts/' . $file . '.js' );
				$js_links .= '<script type="text/javascript" src="scripts/' . $file . '.js?ver=' . $version_number . '"></script>';
			}
			$css_links = '';
			foreach ( $css_files as $file ) {
				copy( TEMPLATE_DIR . 'styles/' . $file . '.css', $app_folder . 'styles/' . $file . '.css' );
				$css_links .= '<link href="styles/' . $file . '.css?ver=' . $version_number . '" rel="stylesheet" type="text/css">';
			}
		}

		// Carrega templates
		$template_search  = $this->read_template( 'section-search.html' );
		$template_sidebar = str_replace(
			array(
				'%utm-medium%',
				'%ajax-endpoint%',
				'%version%',
			),
			array(
				$utm_medium,
				'https://vishwaaroma.com/wp-admin/admin-ajax.php',
				$version_number,
			),
			$this->read_template( 'section-sidebar.html' )
		);

		// Monta template padrão para o <body> de todas as páginas, já substituindo aquilo que é comum a todas
		$template_head = str_replace(
			array(
				'%security-policy%',
				'%apple-touch-icon%',
				'%css-links%',
				'%analytics%',
			),
			array(
				$security_policy,
				$extra_icons,
				$css_links,
				$analytics,
			),
			$this->read_template( 'head.html' )
		);

		// Monta index.html
		$template_index_content        = $this->read_template( 'content-index.html' );
		$app_pages['index']['time']    = date_i18n( 'd/m/Y H:i:s' );
		$app_pages['index']['content'] = str_replace(
			array(
				'%content%',
				'%share%',
				'%where-to-buy%',
				'%form-of-use%',
			),
			array(
				$template_index_content,
				$template_share,
				'',
				'',
			),
			$template_body
		);

		// Cria as páginas de conteúdo estático aplicativo com conteúdo padrão
		$html_static_page = str_replace(
			array(
				'%share%',
				'%where-to-buy%',
				'%form-of-use%',
			),
			array(
				$template_share,
				'',
				'',
			),
			$template_body
		);
		// Monta aromaterapia.html
		$template_aromatherapy_content        = $this->read_template( 'content-aromatherapy.html' );
		$app_pages['aromatherapy']['time']    = date_i18n( 'd/m/Y H:i:s' );
		$app_pages['aromatherapy']['content'] = str_replace( '%content%', $template_aromatherapy_content, $html_static_page );
		// Monta referencias.html
		$template_references_content        = $this->read_template( 'content-references.html' );
		$app_pages['references']['time']    = date_i18n( 'd/m/Y H:i:s' );
		$app_pages['references']['content'] = str_replace( '%content%', $template_references_content, $html_static_page );

		// Grava os arquivos do resultado processamento
		foreach ( $app_pages as $slug => $page ) {
			$item = empty( $page['item'] ) ? '' : $page['item'];

			if ( ! empty( $page['content'] ) ) {
				$html_page  = $template_head;
				$html_page .= str_replace(
					array(
						'%analytics%',
						'%utm-medium%',
						'%page%',
						'%sidebar%',
						'%search%',
						'%js-links%',
					),
					array(
						$analytics,
						$utm_medium,
						$slug,
						$template_sidebar,
						$template_search,
						$js_links,
					),
					$page['content']
				);

				$html_page = TinyMinify::html( $html_page );
				$file_name = $app_folder . $slug . '.html';
				$this->file_put_contents_atomically( $file_name, $html_page, FILE_TEXT );

				if ( ! empty( $item ) ) {
					$this->write_log( $item . ' - Gerado arquivo ' . $file_name, $page['time'] );
				} else {
					$this->write_log( 'Gerado arquivo ' . $file_name, $page['time'] );
				}
			} else {
				if ( ! empty( $item ) ) {
					$this->write_log( $item . ' - Nenhum arquivo gerado', $page['time'] );
				}
			}

			if ( ! empty( $page['error'] ) ) {
				foreach ( $page['error'] as $entry ) {
					$this->write_log( ' - ' . $entry, $page['time'] );
				}
			}
		}

		$this->write_log( 'Fim do processamento', date_i18n( 'd/m/Y H:i:s' ) );

		return 'sucesso';
	}

	private static function read_form_of_use() {
		$form_of_use = array();

		$query = new WP_Query(
			array(
				'post_type'      => 'form_of_use',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		while ( $query->have_posts() ) {
			$query->the_post();
			$item_id      = get_the_ID();
			$abbreviation = get_post_meta( $item_id, 'va_abbreviation', true );

			$form_of_use[ $abbreviation ] = array(
				'name'    => get_the_title(),
				'content' => get_the_content(),
			);
		}
		return $form_of_use;
	}

	private function read_template( $file_name ) {
		return $this->read_file( TEMPLATE_DIR . $file_name );
	}

	private function read_file( $file_name ) {
		$arquivo = file_get_contents( $file_name );
		if ( false === $arquivo ) {
			wp_die(
				'Não foi possível ler o arquivo ' . $file_name,
				'Erro',
				array(
					'response'  => 403,
					'back_link' => 'edit.php?post_type=item&page=itens_export',
				)
			);
		}
		return mb_convert_encoding( $arquivo, 'UTF-8', mb_detect_encoding( $arquivo, 'UTF-8, ISO-8859-1', true ) );
	}

	public function read_last_log() {
		$logs = glob( LOG_DIR . '*.log' );
		if ( ! empty( $logs ) ) {
			usort(
				$logs,
				function ( $a, $b ) {
					return filemtime( $a ) < filemtime( $b );
				}
			);
			$last_log  = $this->read_file( $logs[0] );
			$timestamp = filemtime( $logs[0] );

			$date = new DateTime();
			$date = new DateTime( 'now', new DateTimeZone( 'America/Sao_Paulo' ) );
			$date->setTimestamp( $timestamp );

			return array(
				'file'    => $logs[0],
				'date'    => $date->format( 'd/m/Y H:i:s' ),
				'content' => $last_log,
			);
		}
	}

	private function file_put_contents_atomically( $filename, $data, $flags = 0, $context = null ) {
		if ( file_put_contents( $filename, $data, $flags, $context ) !== strlen( $data ) ) {
			wp_die(
				'Não foi possível gravar o arquivo ' . $filename,
				'Erro',
				array(
					'response'  => 403,
					'back_link' => 'edit.php?post_type=item&page=itens_export',
				)
			);
		}
		return;
	}

	private function set_search_data( $search_data ) {
		$string = $search_data['conteudo'];
		// Remove as abreviações de legendas
		$string = preg_replace( '/\{\{(.*?)\}\}/', '', $string );
		// Remove tags html
		$string = strip_tags( $string );
		// Remove aspas duplas html
		$string = preg_replace( '/"/', '', $string );
		// Remove espaços duplicados
		$string = preg_replace( '/\s+/', ' ', $string );

		$search_data['conteudo'] = $string;

		return $search_data;
	}

	private function set_item_content( $text ) {
		$text_array = explode( "\r\n", trim( $text ) );

		$result = '';
		foreach ( $text_array as $line ) {
			if ( '<' !== substr( $line, 0, 1 ) ) {
				$line = '<p>' . trim( $line ) . '</p>';
			}
			$result .= $line;
		}

		return $result;
	}

	private function write_log( $message, $time, $version = '' ) {
		static $file_name = '';

		if ( empty( $file_name ) ) {
			$file_name = 'log_vrs_' . str_replace( '.', '_', $version ) . '_' . date_i18n( 'Ymd_His' ) . '.log';
		}

		$fd = fopen( LOG_DIR . $file_name, 'a' );

		$str = "[$time] $message\n";
		fwrite( $fd, $str );

		fclose( $fd );
	}
}
