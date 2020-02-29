(function ($) {
	$(function () {
		$('#hat_div input[name="KeyTxt"]')
			.autocomplete('/autocomplete/autocomplete.asp', {
				delay: 300,
				max: 10,
				minChars: 2,
				width: '450px',
				selectFirst: false,
				formatItem: function(item, index, total, query) {
					return	'<table class="acResultTable">' +
					      	'<tr>' +
					      	'<td class="acResultSymbol">' + item.Symbol + '</td>' +
					      	'<td class="acResultName">' + item.Name + '</td>' +
					      	'<td class="acResultCountry">' + item.CountryCode + ': ' + item.Exchange + '</td>' +
					      	'</tr>' +
					      	'</table>';					
				},
				parse: function(data) {
					if (typeof data == 'string') {
						data = eval('(' + data + ')');
					}

					if (!data) {
						return {
							data: ['No result', null],
							value: 'No result',
							result: 'No result'
						}
					}

					return $.map(data.Results, function (item) {
						return {
							data: item,
							value: item.Name,
							result: item.Name
						}
					})
				}
			})
			.result(function (event, data, formatted) {
				var location = window.location;

				window.location = location.protocol + '//' + location.host + '/' + 
													location.pathname.split('/')[1] + '/marketdata_home.asp' + 
													'?instrument=' + data.InstrumentId +
													'&name=' + data.Name;
			});
	});
})(jQuery);