var fixedURLprefix = ''

function compileFixedURL(URL) {
	return document.location.protocol+'//' + fixedURLprefix + '/' + URL
}

function check(URL) {
	var a = (URL.split('127.0.0.1')[0] == document.location.protocol+'//')
	var b = (URL.split('localhost')[0] == document.location.protocol+'//')

	fixedURLprefix = document.location.href.split(document.location.protocol+'//')[1].split('/')[0]

	var URLwithoutHTTP
	URLwithoutHTTP = URL.split(document.location.protocol+'//')[1]

	if(a || b) return [true, compileFixedURL(URLwithoutHTTP.substr(URLwithoutHTTP.indexOf('/')+1))]

	if(URL.substr(URL.length - 4) == '.ex') return [true, compileFixedURL(URL)]
	if(URL[0] == '1') return [true, compileFixedURL(URL)]

	return [false, null]
}