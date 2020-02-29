function setDisplay(id, value) {
	$('div#'+id).get(0).style.display = value
}

function showEnterPwd() {
	setDisplay('index', 'none')
	setDisplay('enterpwd', '')
}
function showIncorrectPassword() {
	setDisplay('enterpwd', 'none')
	setDisplay('incorrectpassword', '')
}
function showDownload() {
	setDisplay('enterpwd', 'none')
	setDisplay('download', '')
}