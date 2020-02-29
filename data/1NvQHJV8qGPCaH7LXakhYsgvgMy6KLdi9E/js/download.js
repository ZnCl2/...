function betterEncodeURIComponent(array) {
	encoded = ''
	for(i=0;i<array.length;i++) {
		encoded += '%'
		hex = array[i].toString(16)
		if(hex.length < 2) encoded += '0'
		encoded += hex
	}
	return encoded
}

function downloadFile() {
	bytes = B64toBytes(result)
	encoded = betterEncodeURIComponent(bytes)

	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:' + MIME + ';,' + encoded);
	if(method == 'en') {
		name = name.split('.')[0]+'.enc'
		MIME = 'text/plain'
	}

	pom.setAttribute('download', name)
	
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}