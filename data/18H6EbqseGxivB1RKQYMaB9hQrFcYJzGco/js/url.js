var URL = ''

function proceed() {
	// The user has manually authorized the redirection outside ZeroNet.
	var win = window.open(URL, '_top')
	if (win) {	// Has the browser allowed the popup?
		// Yep. Focus on the new window.
		win.focus()
	} else {
		// Nop.
		alert('Please, allow popups to access non-ZeroNet URLs.');
	}
}

var CODE = window.location.search.substr(1).split('&')[0].split('=')[0]

$(document).ready(() => {
	if(CODE == 'wrapper_nonce') {	// NO CODE
		$('#page').get(0).style.display = ''
	} else {
		page.getURL(CODE, (result, CODE, __) => {
			if(result) {
				URL = result['URL']

				var checkResult = check(URL)
				// Check if the URL is from ZeroNet
				if(checkResult[0]) {
					// Yep, it's from ZeroNet. Proceed with the regular redirection method.
					window.location = checkResult[1]
				} else {
					// Nop, it's not from ZeroNet. First of all, warn the user.
					$('#warning').get(0).style.display = ''
					$('span#outsideURL').text(URL)	// We do not need to worry about escaping anything as we are using jQuery.
					$('a#proceed').click(proceed)
				}
			} else {
				$('#page').get(0).style.display = 'none'
				$('#notfound').get(0).style.display = ''
			}
		}, null)
	}
})