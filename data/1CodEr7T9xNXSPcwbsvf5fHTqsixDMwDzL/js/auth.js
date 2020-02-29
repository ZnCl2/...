function showAuth() {
	let auth = zeroAuth.getAuth();
	document.getElementById("username").textContent = auth ? auth.user : "Sign in";
}

document.getElementById("signin_button").onclick = () => {
	zeroAuth.requestAuth().then(showAuth);
};
zeroPage.getSiteInfo().then(showAuth);

document.getElementById("save_button").onclick = () => {
	let auth = zeroAuth.getAuth();
	if(!auth) {
		zeroPage.alert("Please, login first.");
		return;
	}

	if(document.getElementById("title").value == "") {
		zeroPage.alert("Please, set title.");
		return;
	}

	let search = location.search.replace(/[?&]wrapper_nonce=.*/, "").replace(/^\?/, "");
	if(search && search.split("/")[0] == auth.address) {
		zeroDB.changeRow(
			"data/users/" + auth.address + "/data.json",
			"data/users/" + auth.address + "/content.json",
			"code",
			row => {
				if(row.id == search.split("/")[1]) {
					return {
						id: row.id,
						html: editorHtml.getValue(),
						js: editorJs.getValue(),
						css: editorCss.getValue(),
						js_mode: modeJs.value,
						css_mode: modeCss.value,
						library: document.getElementById("library").value,
						added: Math.floor(Date.now() / 1000),
						title: document.getElementById("title").value,
						description: document.getElementById("title").description
					};
				} else {
					return row;
				}
			});
	} else {
		zeroDB.insertRow(
			"data/users/" + auth.address + "/data.json",
			"data/users/" + auth.address + "/content.json",
			"code",
			{
				html: editorHtml.getValue(),
				js: editorJs.getValue(),
				css: editorCss.getValue(),
				js_mode: modeJs.value,
				css_mode: modeCss.value,
				library: document.getElementById("library").value,
				added: Math.floor(Date.now() / 1000),
				title: document.getElementById("title").value,
				description: document.getElementById("title").description
			},
			{
				source: "next_code_id",
				column: "id"
			}
		)
			.then(row => {
				location.href = "?" + auth.address + "/" + row.id;
			});
	}
};

zeroPage.cmd("wrapperGetLocalStorage")
	.then(ls => {
		let cmTheme = ls && ls.theme == "dark" ? "monokai-sublime" : "3024-day";
		editorHtml.setOption("theme", cmTheme);
		editorJs.setOption("theme", cmTheme);
		editorCss.setOption("theme", cmTheme);

		document.body.classList.add(ls && ls.theme == "dark" ? "dark" : "light");

		let search = location.search.replace(/[?&]wrapper_nonce=.*/, "").replace(/^\?/, "");
		if(search) {
			let address = search.split("/")[0];
			let id = search.split("/")[1];

			return zeroDB.query("SELECT code.* FROM code, json WHERE code.json_id = json.json_id AND json.directory = :directory AND code.id = :id", {
				directory: address,
				id: id
			})
				.then(res => {
					editorHtml.setValue(res[0].html);
					editorJs.setValue(res[0].js);
					editorCss.setValue(res[0].css);
					modeJs.value = res[0].js_mode;
					modeCss.value = res[0].css_mode;
					document.getElementById("library").value = res[0].library;
					document.getElementById("title").value = res[0].title;
					document.getElementById("description").value = res[0].description;

					modeJs.onchange();
					modeCss.onchange();
					document.getElementById("run_button").click();

					document.getElementById("loading").style.display = "none";
				});
		} else {
			document.getElementById("loading").style.display = "none";
		}
	});

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
			let cmTheme = curTheme == "dark" ? "monokai-sublime" : "3024-day";
			editorHtml.setOption("theme", cmTheme);
			editorJs.setOption("theme", cmTheme);
			editorCss.setOption("theme", cmTheme);

			document.body.classList.remove("dark");
			document.body.classList.remove("light");
			document.body.classList.add(curTheme);
		});
};