var CODE_LENGTH = 4	// Change this if necessary

function generateRandomCode() {
	var code = ''
	var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	for (var i=0;i<CODE_LENGTH;++i) {
		code += charset.charAt(Math.floor(Math.random() * charset.length))
	}
	return code
}

function showShortenedURL(CODE) {
	$('#page').get(0).style.display = 'none'
	$('#url').get(0).style.display = ''
	$('#shortenedurl').text('http://127.0.0.1:43110/1ExodUs2PtH3GHe5KpkGbqGEbVMWHzFzWf/?' + CODE)
	$('#shortenedurl2').attr('href', 'http://127.0.0.1:43110/1ExodUs2PtH3GHe5KpkGbqGEbVMWHzFzWf/?' + CODE)
} 

function checkResult(result, CODE, URL) {	// Warning: a bit of recursivity inside!
	if(result) {
		if($('input#custom').get(0).checked) {
			$('#page').get(0).style.display = 'none'
			$('#nameinuse').get(0).style.display = ''
			return
		} else{
			page.getURL(generateRandomCode(), checkResult, URL)
		}
	} else {
		page.upload(URL, CODE)
	}
}

$(document).ready(() => {
	$('button').click(() => {
		var URL = $('#bet_chance3').get(0).value
		if(URL != '') {
			if(URL.split('1ExodUs2PtH3GHe5KpkGbqGEbVMWHzFzWf').length > 1 || URL.split('1ExodUs2PtH3GHe5KpkGbqGEbVMWHzFzWf').length > 1 || URL.split('1ExodUs2PtH3GHe5KpkGbqGEbVMWHzFzWf').length > 1) {
				// This is not allowed
				$('#page').get(0).style.display = 'none'
				$('#illegal').get(0).style.display = ''
			} else {
				var code = ''
				if($('input#custom').get(0).checked) {
					if($('input#cn').get(0).value == '') {
						code = generateRandomCode()
					} else {
						code = $('#bet_chance2').get(0).value
					}
				} else {
					code = generateRandomCode()
				}

				page.getURL(code, checkResult, URL)	// Check recursively if the code is already in use
			}
		}
	})

	$('input#cn').prop('disabled', true)
	$('input#custom').click(() => {
		if($('input#custom').get(0).checked) $('input#cn').prop('disabled', false)
		else $('input#cn').prop('disabled', true)
	})
})