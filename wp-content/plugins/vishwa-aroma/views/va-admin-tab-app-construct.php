<?php
/**
 *
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

?>
<div id="va-admin-tabs-1">
	<form action='<?php echo esc_url( admin_url( 'admin.php?page=va_admin' ) ); ?>' method='post' id='app-construction'>
		<?php if ( current_user_can( 'manage_options' ) ) { ?>
			<table>
				<thead>
					<tr>
						<th style="width:140px;text-align:left;">Plataforma</th>
						<th style="width:100px;text-align:left;">Versão</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input type='radio' name='environment' value='development' checked> Desenvolvimento</td>
						<td>
							<input type='text' id='number' name='development_version' value='<?php echo esc_attr( $app_versions['development']['number'] ); ?>'>
							<?php if ( ! empty( $app_versions['development']['number'] ) ) { ?>
								<td style="font-size:10px;">
									<?php
										echo sprintf(
											'Última versão: %1$s, cosntruída em %2$s, por %3$s.',
											$app_versions['development']['number'],
											$app_versions['development']['date'],
											$app_versions['development']['user']
										);
									?>
								</td>
							<?php } ?>
						</td>
					</tr>
					<tr>
						<td><input type='radio' name='environment' value='webapp'> Web App</td>
						<td>
							<input type='text' id='number' name='webapp_version' value='<?php echo esc_attr( $app_versions['webapp']['number'] ); ?>'>
							<?php if ( ! empty( $app_versions['webapp']['number'] ) ) { ?>
								<td style="font-size:10px;">
									<?php
										echo sprintf(
											'Última versão: %1$s, cosntruída em %2$s, por %3$s.',
											$app_versions['webapp']['number'],
											$app_versions['webapp']['date'],
											$app_versions['webapp']['user']
										);
									?>
								</td>
							<?php } ?>
						</td>
					</tr>
					<tr>
						<td><input type='radio' name='environment' value='android'> Android</td>
						<td>
							<input type='text' id='number' name='android_version' value='<?php echo esc_attr( $app_versions['android']['number'] ); ?>'>
							<?php if ( ! empty( $app_versions['android']['number'] ) ) { ?>
								<td style="font-size:10px;">
									<?php
										echo sprintf(
											'Última versão: %1$s, cosntruída em %2$s, por %3$s.',
											$app_versions['android']['number'],
											$app_versions['android']['date'],
											$app_versions['android']['user']
										);
									?>
								</td>
							<?php } ?>
						</td>
					</tr>
					<tr>
						<td><input type='radio' name='environment' value='ios'> iOS</td>
						<td>
							<input type='text' id='number' name='ios_version' value='<?php echo esc_attr( $app_versions['ios']['number'] ); ?>'>
							<?php if ( ! empty( $app_versions['ios']['number'] ) ) { ?>
								<td style="font-size:10px;">
									<?php
										echo sprintf(
											'Última versão: %1$s, cosntruída em %2$s, por %3$s.',
											$app_versions['ios']['number'],
											$app_versions['ios']['date'],
											$app_versions['ios']['user']
										);
									?>
								</td>
							<?php } ?>
						</td>
					</tr>
				</tbody>
			</table>
		<?php } else { ?>
			<input type='hidden' id='number' name='number' value='<?php echo esc_attr( $app_versions_number ); ?>'>
			<input type='hidden' id='number' name='environment' value='development'>
		<?php } ?>

		<input type='hidden' name='meta_nonce' value='<?php echo wp_create_nonce( 'app_vishwa_aroma_construction' ); ?>' />

		<p class='submit'><input type='submit' name='submit' id='submit' class='button button-primary' value='Construir'></p>
	</form>
	<?php
	if ( ! empty( $last_log ) ) {
		echo '<h2>Log da última exportação:</h2>';
		echo '<p>Arquivo: ' . $last_log['file'] . ' (' . $last_log['date'] . ')</p>';
		echo '<pre>' . $last_log['content'] . '</pre>';
	}
	?>
</div>
