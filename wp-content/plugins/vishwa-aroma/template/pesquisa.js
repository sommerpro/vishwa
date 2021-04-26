$(document).ready(function () {
	var dataSearch = JSON.parse('%data%');

	var dataHelpFor = JSON.parse('%help-for%');

	var dataLength = dataSearch.length;

	/*
		  dataSearch[ x ]['itemCategory']: itemCategory do item
		  dataSearch[ x ]['nome']     : nome do item
		  dataSearch[ x ]['slug']     : termo a ser utilizado para montar o nome do arquivo html
		  dataSearch[ x ]['conteudo'] : descrição do item
	*/

	if ($('body').attr('id') == 'index') {
		if (window.location.href.indexOf('search') > -1) {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
				vars[key] = decodeURI(value);
			});
			parameter = vars['search'];
			$('.texto-pesquisa').val(parameter);
			search(parameter);
		} else {
			parameter = $('.texto-pesquisa').val();
			if (parameter != 'Palavra-chave' && parameter != '') {
				search(parameter);
			}
		}
	}

	$('#keyWordField').change(function () {
		var searchArgument = $('#keyWordField').val();
		window.location.href = encodeURI("index.html?search=" + searchArgument);
	});
	$('.pesquisa i').click(function () {
		var searchArgument = $('#keyWordField').val();
		search(searchArgument);
	});

	$('.texto-pesquisa').change(function () {
		var searchArgument = $('.texto-pesquisa').val();
		search(searchArgument);
	});
	$('.pesquisa-index i').click(function () {
		var searchArgument = $('.texto-pesquisa').val();
		search(searchArgument);
	});

	$('#index').on('click', '.toggle-title', function () {
		$(this).next('.toggle-content').slideToggle(200);
		$(this).find('i').toggleClass('rotate-toggle');
		return false;
	});

	function search(searchArgument) {
		searchArgument = searchArgument.toLowerCase().latinise();

		var found = false;
		var matches = {
			'equal': {
				'name': [],
				'content': [],
				'helpFor': []
			},
			'partial': {
				'name': [],
				'content': [],
				'helpFor': []
			},
			'partialWord': {
				'name': [],
				'content': [],
				'helpFor': []
			}
		};
		var equalNameQty = partialNameQty = partialWordNameQty = 0; // qtde de itens encontrados pelo nome
		var equalContentQty = partialContentQty = partialWordContentQty = 0; // qtde de itens encontrados pela descrição
		var equalHelpForQty = partialHelpForQty = partialWordHelpForQty = 0; // qtde de itens encontrados nas tags de ajuda

		// Expressão regular para encontrar o argumento completo
		var equalMatchRegExp = new RegExp('\\b' + searchArgument + '\\b', 'i');

		// Expressão regular para encontrar qualquer palavra completa do argumento
		partialSearchArgument = cleanSearchArgument(searchArgument).replace(/\ /g, '|');
		var partialMatchRegExp = new RegExp('\\b(' + partialSearchArgument + ')\\b', 'i');

		// Expressão regular para encontrar qualquer parte da palavra do argumento
		var partialWordMatchRegExp = new RegExp(partialSearchArgument, 'i');

		// Processa todos os itens
		for (var i = 0; i < dataLength; i++) {
			var itemCategory = dataSearch[i]['categoria'].trim();
			var itemName = dataSearch[i]['nome'].trim();
			var searchName = itemName.toLowerCase().latinise();
			var itemSlug = dataSearch[i]['slug'].trim();
			var itemContent = dataSearch[i]['conteudo'].trim();
			var searchContent = itemContent.toLowerCase().latinise();
			var position = 0;
			var lenght = 0;

			equalNameMatch = searchName.match(equalMatchRegExp);
			partialNameMatch = searchName.match(partialMatchRegExp);
			partialWordNameMatch = searchName.match(partialWordMatchRegExp);

			equalContentMatch = searchContent.match(equalMatchRegExp);
			partialContentMatch = searchContent.match(partialMatchRegExp);
			partialWordContentMatch = searchContent.match(partialWordMatchRegExp);

			if (equalNameMatch !== null || partialNameMatch !== null || partialWordNameMatch != null || equalContentMatch !== null || partialContentMatch !== null || partialWordContentMatch !== null) {

				found = true;

				if (equalNameMatch !== null) {
					matches.equal.name[equalNameQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else if (partialNameMatch !== null) {
					keyFound = partialNameMatch;
					position = searchName.search(keyFound[0]);
					lenght = keyFound[0].length;
					string = itemName.replace(itemName.substr(position, lenght), '<span class="underline">' + itemName.substr(position, lenght) + '</span>');
					matches.partial.name[partialNameQty++] = '<p><a href="' + itemSlug + '.html">' + string + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else if (partialWordNameMatch !== null) {
					keyFound = partialWordNameMatch;
					position = searchName.search(keyFound[0]);
					lenght = keyFound[0].length;
					string = itemName.replace(itemName.substr(position, lenght), '<span class="underline">' + itemName.substr(position, lenght) + '</span>');
					matches.partialWord.name[partialWordNameQty++] = '<p><a href="' + itemSlug + '.html">' + string + ' <span>(' + itemCategory + '</span>)</a></p>';

				} else {

					if (equalContentMatch !== null) {
						keyFound = equalContentMatch;
					} else if (partialContentMatch != null) {
						keyFound = partialContentMatch;
					} else {
						keyFound = partialWordContentMatch;
					}

					// Localiza o início do texto ou o espaço anterior à primeira palavra localizada
					initialPosition = searchContent.search(keyFound[0]) - 1;
					while (itemContent.substr(initialPosition, 1) !== ' ' && initialPosition >= 0) {
						initialPosition--;
					}
					initialPosition++;

					// Le 37 caracteres a partir desta posição
					string = itemContent.substr(initialPosition, 37);
					position = searchContent.substr(initialPosition, 37).search(keyFound[0]);
					lenght = keyFound[0].length;
					string = string.replace(string.substr(position, lenght), '<span class="underline">' + string.substr(position, lenght) + '</span>');

					// Sinaliza se houver mais texto antes ou depois das palavras encontradas
					if (initialPosition !== 0) {
						string = '... ' + string;
					}
					if (itemContent.substr(initialPosition, 38).length == 38) {
						string = string + ' ...'
					}

					if (equalContentMatch != null) {
						matches.equal.content[equalContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					} else if (partialContentMatch != null) {
						matches.partial.content[partialContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					} else {
						matches.partialWord.content[partialWordContentQty++] = '<p><a href="' + itemSlug + '.html">' + itemName + ' <span>(' + itemCategory + '</span>)</a><br /><span>' + string + '</span></p>';
					}
				}
			}
		}

		// Processa todos as ajudas
		for (var helpFor in dataHelpFor) {
			html = '';
			helpForAux = helpFor.latinise();

			equalHelpForMatch = helpForAux.match(equalMatchRegExp);
			partialHelpForMatch = helpForAux.match(partialMatchRegExp);
			partialWordHelpForMatch = helpForAux.match(partialWordMatchRegExp);

			if (equalHelpForMatch != null || partialHelpForMatch != null || partialWordHelpForMatch != null) {
				found = true;

				if (equalHelpForMatch !== null) {
					keyFound = equalHelpForMatch;
				} else if (partialHelpForMatch != null) {
					keyFound = partialHelpForMatch;
				} else {
					keyFound = partialWordHelpForMatch;
				}

				position = helpForAux.search(keyFound[0]) - 1;
				while (helpForAux.substr(position, 1) !== ' ' && position >= 0) {
					position--;
				}
				position++;

				lenght = keyFound[0].length;
				string = helpFor.replace(helpFor.substr(position, lenght), '<span class="underline">' + helpFor.substr(position, lenght) + '</span>');

				html += '<div class="toggle">';
				html += '<a href="#" class="toggle-title">Ajuda para ' + string + '<i class="fa fa-plus"></i></a>';
				html += '<div class="toggle-content">';

				auxHelpFor = dataHelpFor[helpFor];
				for (var auxItemName in auxHelpFor) {
					html += '<p><a href="' + auxHelpFor[auxItemName] + '.html">' + auxItemName + '</a></p>';
				}

				html += '</div></div>'

				if (equalContentMatch !== null) {
					matches.equal.helpFor[equalHelpForQty++] = html;
				} else if (partialHelpForMatch != null) {
					matches.partial.helpFor[partialHelpForQty++] = html;
				} else {
					matches.partialWord.helpFor[partialWordHelpForQty++] = html;
				}
			}
		}

		if (found) {
			$(".menu-index").css({ 'display': 'none' });

			html = '<h4>Resultados</h4>';
			if (equalNameQty > 0) {
				for (var i = 0; i < equalNameQty; i++) {
					html += matches.equal.name[i];
				}
			}

			if (equalContentQty > 0) {
				for (var i = 0; i < equalContentQty; i++) {
					html += matches.equal.content[i];
				}
			}

			if (partialNameQty > 0) {
				for (var i = 0; i < partialNameQty; i++) {
					html += matches.partial.name[i];
				}
			}

			if (partialContentQty > 0) {
				for (var i = 0; i < partialContentQty; i++) {
					html += matches.partial.content[i];
				}
			}

			if (partialWordNameQty > 0) {
				for (var i = 0; i < partialWordNameQty; i++) {
					html += matches.partialWord.name[i];
				}
			}

			if (partialWordContentQty > 0) {
				for (var i = 0; i < partialWordContentQty; i++) {
					html += matches.partialWord.content[i];
				}
			}

			if (equalHelpForQty > 0) {
				for (var i = 0; i < equalHelpForQty; i++) {
					html += matches.equal.helpFor[i];
				}
			}

			if (partialHelpForQty > 0) {
				for (var i = 0; i < partialHelpForQty; i++) {
					html += matches.partial.helpFor[i];
				}
			}

			if (partialWordHelpForQty > 0) {
				for (var i = 0; i < partialWordHelpForQty; i++) {
					html += matches.partialWord.helpFor[i];
				}
			}

			$('.resposta-pesquisa').html(html);
			$('.resposta-not-found').html('');
			$(".menu-index").css({ 'display': 'none' });
		} else {
			$('.resposta-pesquisa').html('');
			$('.resposta-not-found').html('<h4>Nenhum resultado encontrado</h4>');
			$(".menu-index").css({ 'display': 'block' });
		}
	}

	function cleanSearchArgument(searchArgument) {
		newSearchArgument = '';
		searchWords = searchArgument.split(' ');
		exceptionLower = ['a', 'e', 'o', 'as', 'os', 'da', 'de', 'do', 'di', 'das', 'des', 'dos', 'na', 'no', 'nas', 'nos', 'em', 'que', 'com', '-', '=', '+', ':', '/', '.', ','];
		$.each(searchWords, function (index, word) {
			if (-1 == $.inArray(word, exceptionLower)) {
				newSearchArgument = newSearchArgument + word + ' ';
			}
		});
		return $.trim(newSearchArgument);
	}
});

var Latinise = {};
Latinise.latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
String.prototype.latinise = function () { return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) { return Latinise.latin_map[a] || a }) };
String.prototype.latinize = String.prototype.latinise;
String.prototype.isLatin = function () { return this == this.latinise() }
