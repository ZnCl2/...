const https = require("https");
const util = require("util");
const fs = require("fs");


async function get(url) {
	return new Promise((resolve) => {
		https.get(url, res => {
			const bufs = [];
			res.on("data", data => {
				bufs.push(data);
			});
			res.on("end", () => {
				resolve(Buffer.concat(bufs));
			});
		});
	});
}
async function getJson(url) {
	return JSON.parse(await get(url));
}

function escapeHtml(s) {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
}

let template;
const queue = [];
async function thread() {
	while(queue.length > 0) {
		const i = queue.shift();

		try {
			await util.promisify(fs.access)(`${i}`);
			console.log(`${i}: already loaded`);
			continue;
		} catch(e) {
		}

		await util.promisify(fs.mkdir)(`${i}`);

		const info = await getJson(`https://xkcd.com/${i}/info.0.json`);
		const imgName = info.img.split("/").slice(-1)[0];
		try {
			await util.promisify(fs.access)(`imgs/comics/${imgName}`);
		} catch(e) {
			await util.promisify(fs.writeFile)(`imgs/comics/${imgName}`, await get(info.img));
		}

		const html = template
			.replace(/{{num}}/g, i)
			.replace(/{{title}}/g, escapeHtml(info.title))
			.replace(/{{json_title}}/g, JSON.stringify(info.title).replace(/<\/script>/g, `</" + "script`))
			.replace(/{{alt}}/g, escapeHtml(info.alt))
			.replace(/{{img}}/g, {
				1110: "imgs/click_and_drag.png",
				1190: "imgs/time-animated.gif",
				1193: "imgs/externalities.png",
				1335: "imgs/now.png",
				1608: "imgs/hoverboard.png",
				1663: "imgs/garden.png",
				2067: "imgs/challengers.png"
			}[i] || `imgs/comics/${imgName}`);

		await util.promisify(fs.writeFile)(`${i}/index.html`, html);
		console.log(`${i}: loaded: ${info.title}`);
	}
}

(async () => {
	template = await util.promisify(fs.readFile)("template.html", "utf8");

	const total = (await getJson("https://xkcd.com/info.0.json")).num;
	console.log("Total comics:", total);

	for(let i = 1; i <= total; i++) {
		if(i != 404) {
			queue.push(i);
		}
	}

	await Promise.all([
		thread(),
		thread(),
		thread(),
		thread()
	]);
})();