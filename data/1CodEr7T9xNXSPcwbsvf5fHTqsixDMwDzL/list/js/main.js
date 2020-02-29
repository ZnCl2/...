zeroFrame = new ZeroFrame();
zeroPage = new ZeroPage(zeroFrame);
zeroAuth = new ZeroAuth(zeroPage, ["zeroid.bit", "zeroverse.bit", "id.kaffie.bit"]);
zeroDB = new ZeroDB(zeroPage);

zeroPage.cmd("wrapperGetLocalStorage")
	.then(ls => {
		document.body.classList.add(ls && ls.theme == "dark" ? "dark" : "light");

		return zeroDB.query("SELECT code.*, json.directory FROM code, json WHERE code.json_id = json.json_id ORDER BY added DESC LIMIT 10")
	})
	.then(res => {
		res.forEach(code => {
			let node = document.createElement("a");
			node.className = "code";
			node.href = "../?" + code.directory + "/" + code.id;

			let title = document.createElement("div");
			title.className = "code-title";
			title.textContent = code.title || "Untitled";
			node.appendChild(title);

			let description = document.createElement("div");
			description.className = "code-description";
			description.textContent = code.description;
			node.appendChild(description);

			document.getElementById("codes").appendChild(node);
		});
	});

function showAuth() {
	let auth = zeroAuth.getAuth();
	document.getElementById("username").textContent = auth ? auth.user : "Sign in";
}

document.getElementById("signin_button").onclick = () => {
	zeroAuth.requestAuth().then(showAuth);
};
zeroPage.getSiteInfo().then(showAuth);

document.getElementById("theme_button").onclick = () => {
	let curTheme;

	zeroPage.cmd("wrapperGetLocalStorage")
		.then(ls => {
			if(!ls) {
				ls = {};
			}
			ls.theme = ls.theme == "dark" ? "light" : "dark";
			curTheme = ls.theme;
			zeroPage.cmd("wrapperSetLocalStorage", ls);
		})
		.then(() => {
			document.body.classList.remove("dark");
			document.body.classList.remove("light");
			document.body.classList.add(curTheme);
		});
};