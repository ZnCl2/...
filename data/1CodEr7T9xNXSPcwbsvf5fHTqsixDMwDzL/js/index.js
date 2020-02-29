zeroFrame = new ZeroFrame();
zeroPage = new ZeroPage(zeroFrame);
zeroAuth = new ZeroAuth(zeroPage, ["zeroid.bit", "zeroverse.bit", "id.kaffie.bit"]);
zeroDB = new ZeroDB(zeroPage);

editorHtml = new CodeMirror.fromTextArea(document.getElementById("code_html"), {
	lineNumbers: true,
	mode: "text/html",
	theme: "3024-day"
});

editorCss = new CodeMirror.fromTextArea(document.getElementById("code_css"), {
	lineNumbers: true,
	mode: "text/css",
	theme: "3024-day"
});

editorJs = new CodeMirror.fromTextArea(document.getElementById("code_js"), {
	lineNumbers: true,
	mode: "text/javascript",
	theme: "3024-day"
});

modeCss = document.getElementById("mode_css");
modeJs = document.getElementById("mode_js");

errorCss = document.getElementById("error_css");
errorJs = document.getElementById("error_js");

modeCss.onchange = () => {
	editorCss.setOption("mode", modeCss.value);
};
modeJs.onchange = () => {
	editorJs.setOption("mode", modeJs.value == "text/x-babel" ? "text/javascript" : modeJs.value);
};

function compileCss() {
	let css = editorCss.getValue();

	let promise;
	if(modeCss.value == "text/x-less") {
		promise = less.render(css).then(res => res.css);
	} else if(modeCss.value == "text/x-sass") {
		promise = new Promise((resolve, reject) => {
			Sass.compile(css, res => {
				if(res.status == 0) {
					resolve(res.text);
				} else {
					reject(res.message);
				}
			});
		});
	} else {
		promise = Promise.resolve(css);
	}

	return promise
		.then(css => {
			errorCss.style.display = "none";
			return css;
		}, e => {
			errorCss.style.display = "block";
			errorCss.textContent = e;
			throw e;
		});
}

function compileJs() {
	let js = editorJs.getValue();

	try {
		let res;

		if(modeJs.value == "text/x-icedcoffeescript") {
			res = CoffeeScript.compile(js);
		} else if(modeJs.value == "text/x-livescript") {
			res = require("livescript").compile(js);
		} else if(modeJs.value == "text/x-babel") {
			res = Babel.transform(js, {
				presets: ["es2016"]
			}).code;
		} else {
			res = js;
		}

		errorJs.style.display = "none";
		return res;
	} catch(e) {
		errorJs.style.display = "block";
		errorJs.textContent = e;
		throw e;
	}
}

document.getElementById("run_button").onclick = () => {
	let html = editorHtml.getValue();
	let js = editorJs.getValue();

	let result = document.getElementById("result");
	result.src = "about:blank";

	let newCss, newJs;

	return Promise.resolve()
		.then(() => {
			return compileCss();
		})
		.then(css => {
			newCss = css;
			return compileJs();
		})
		.then(js => {
			newJs = js;

			let library = document.getElementById("library").value;

			let code = "";
			code += "<!DOCTYPE html>";
			code += "<html>";
			code += "<head>";
			code += "<style type='text/css'>";
			code += newCss;
			code += "</style>";
			code += "</head>";
			code += "<body>";
			code += html;
			if(library) {
				code += "<script type='text/javascript' src='" + location.protocol + "//" + location.host + location.pathname + "/library/" + library + ".js'></script>";
			}
			code += "<script type='text/javascript'>";
			code += newJs;
			code += "</script>";
			code += "</body>";
			code += "</html>";

			result.src = "data:text/html;charset=UTF-8," + encodeURIComponent(code);
		});
};