var b64data = ''
var MIME = ''
var name = ''

var result = ''
var method = ''

function setMethod(str) {
	method = str
	for(var i=0;i<$('span.method').length;++i) $('span.method').get(i).innerHTML = str
}

$(document).ready(() => {
	$('div#drophere').filedrop({
		callback: (recv, _MIME, _name) => {
			b64data = recv ; MIME = _MIME ; name = _name
			var raw = atob(recv)
			if(raw[0] == '\0') setMethod('de')
			else setMethod('en')
			showEnterPwd()
		}
	})

	$('button').click(() => {
		pwd = $('input#pwd').get(0).value
		
		if(pwd == '') {
			alert('The key can\'t be empty!')
			return
		}

		// HASH THE KEY (in order to get always 256-bit)
		key = hexToBytes(sha256(pwd))

		// CHECK IF THE FILE IS ENCRYPTED
		var raw = atob(b64data)
		if(method == 'de') {	// The file is encrypted
			name = raw.split('\0')[1]
			MIME = raw.split('\0')[2].split('\x01')[0]
			var rest = ''
			for(var i=raw.indexOf('\x01')+1;i<raw.length;++i) rest += raw[i]
			rest = btoa(rest)

			result = AESW_decrypt_B64(key, rest)
			result = btoa(result)
		} else {	// The file is not encrypted
			result = AESW_encrypt_STRING(key, atob(b64data))
			result = btoa('\0' + name + '\0' + MIME + '\x01' + atob(result))
		}

		showDownload()
	})
})