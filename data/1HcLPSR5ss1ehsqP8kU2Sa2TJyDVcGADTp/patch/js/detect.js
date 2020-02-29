document.getElementById("has_vuln_false").style.display = "none";
document.getElementById("has_vuln_true").style.display = "none";


// Are we outside iframe?
if(top == self) {
	showVulnerable();
} else {
	// Can we access the wrapper via iframe?
	var iframe = document.createElement("iframe");
	iframe.src = "/";
	iframe.style.marginLeft = "-10000px";
	iframe.sandbox = "allow-same-origin";
	iframe.onload = () => {
		try {
			iframe.contentWindow.location.href;
		} catch(e) {
			showSafe();
			return;
		}
		showVulnerable();
	};
	iframe.onerror = () => {
		showSafe();
	};
	document.body.appendChild(iframe);
}


function showVulnerable() {
	document.getElementById("has_vuln_true").style.display = "";
	document.getElementById("has_vuln_scanning").style.display = "none";
}
function showSafe() {
	document.getElementById("has_vuln_false").style.display = "";
	document.getElementById("has_vuln_scanning").style.display = "none";
}