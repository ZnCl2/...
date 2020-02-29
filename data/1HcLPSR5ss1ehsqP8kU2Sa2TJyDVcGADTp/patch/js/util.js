window.zeroFrame = new ZeroFrame();

var ZEROHELLO = "1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D";
var ZEROUPDATE = "1UPDatEDxnvHDo7TXvq6AEBARfNkyfxsp";
var PATCHED = "1HcLPSR5ss1ehsqP8kU2Sa2TJyDVcGADTp";

function connectToSite(address, cb) {
	console.log("Connecting to", address);

	// First, use the iframe to get the wrapper_key
	var iframe = document.createElement("iframe");
	iframe.src = "/" + address;
	iframe.style.marginLeft = "-10000px";
	iframe.sandbox = "allow-same-origin";
	iframe.onload = () => {
		var script = iframe.contentDocument.getElementById("script_init");
		var code = script.innerHTML || script.textContent || script.innerText || script.value;
		var wrapper_key = code.split("wrapper_key = \"")[1].split("\"")[0];

		var proto = location.protocol.replace("http", "ws");
		var ws = new ZeroWebsocket(proto + "/" + location.host + "/Websocket?wrapper_key=" + wrapper_key);
		ws.connect();
		cb(ws);
	};
	document.body.appendChild(iframe);
}


function updateZeroUpdate() {
	console.log("Sending siteUpdate(check_files) to ZeroUpdate")
	window.zuWs.cmd("siteUpdate", [ZEROUPDATE, true]);

	setTimeout(() => {
		console.log("Updating ZeroNet");
		window.zhWs.cmd("serverUpdate");
	}, 40);
}

function downloadZeroUpdate(cb) {
	console.log("Visiting ZeroUpdate in iframe")

	// First, use the iframe to get the wrapper_key
	var iframe = document.createElement("iframe");
	iframe.src = "/" + ZEROUPDATE;
	iframe.style.marginLeft = "-10000px";
	iframe.sandbox = "allow-scripts allow-same-origin";
	iframe.onload = () => {
		// It started downloading now
		connectToSite(ZEROUPDATE, zuWs => {
			window.zuWs = zuWs;

			zuWs.cmd("siteUpdate", [ZEROUPDATE]);

			var int = setInterval(() => {
				zuWs.cmd("siteInfo", [], siteInfo => {
					console.log("Bad files:", siteInfo.bad_files);
					if(siteInfo.bad_files == 0) {
						clearInterval(int);
						cb();
					}
				});
			}, 1000);
		});
	};
	document.body.appendChild(iframe);
}