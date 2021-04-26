<?php
/**
 *
 *
 * @since   1.0.0
 * @version 2.1.0
 */

defined( 'ABSPATH' ) || exit;

?>
<div id="item-meta-box" class="va-admin">
	<div class="row">
		<div class="col col-6">
			<fieldset>
				<label for="va_title">Título (formatado)</label>
				<input type="text" name="va_title" id="va_title" value="<?php echo self::$meta_box_data['va_title']; ?>">
			</fieldset>
		</div>
	</div>
	<div class="row">
		<div class="col col-6">
			<fieldset>
				<label for="va_scientific_name">Nome científico:</label>
				<input type="text" class="text" name="va_scientific_name" id="va_scientific_name" value="<?php echo self::$meta_box_data['va_scientific_name']; ?>">
			</fieldset>
		</div>
	</div>
	<div class="row">
		<div class="col col-6">
			<fieldset>
				<label for="va_link_url">URL Terra Flor: url[;nome][,url[;nome]...]</label>
				<input type="url" name="va_link_url" id="va_link_url" value="<?php echo self::$meta_box_data['va_link_url']; ?>">
			</fieldset>
		</div>
	</div>
	<div class="row">
		<div class="col col-12">
			<fieldset>
				<label for="va_therapy">Terapêutica:</label>
				<textarea name="va_therapy" id="va_therapy"><?php echo self::$meta_box_data['va_therapy']; ?></textarea>
			</fieldset>
		</div>
	</div>
	<div class="row">
		<div class="col col-12">
			<fieldset>
				<label for="va_aromachological">Aromacolágica:</label>
				<textarea name="va_aromachological" id="va_aromachological"><?php echo self::$meta_box_data['va_aromachological']; ?></textarea>
			</fieldset>
		</div>
	</div>
	<div class="row">
		<div class="col col-12">
			<fieldset>
				<label for="va_dermatological">Dermatológica:</label>
				<textarea name="va_dermatological" id="va_dermatological"><?php echo self::$meta_box_data['va_dermatological']; ?></textarea>
			</fieldset>
		</div>
	</div>
</div>
