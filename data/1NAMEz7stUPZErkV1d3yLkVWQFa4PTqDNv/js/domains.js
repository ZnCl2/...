async function updateDomains() {
	// We'd better not hardcode "web" but there's no way to get auth_type via
	// UiWebsocket API
	const content = await zf.cmdp("fileGet", ["data/moderators/content.json"]);
	const certUserId = (await zf.cmdp("siteInfo")).cert_user_id;
	const userId = certUserId ? `web/${certUserId}` : "";
	const isModerator = JSON.parse(content).user_contents.permissions[userId];


	const node = document.querySelector("#domains");

	const sql = `
		SELECT
			responses2.*,
			json.cert_user_id,
			CASE
				WHEN safety.score IS NULL
					THEN 0
				ELSE safety.score
			END AS safety_score

		FROM (
			SELECT
				responses.domain,
				MAX(responses.date_added) AS max_date_added,
				address,
				auth_address
			FROM responses
			WHERE responses.result > 0
			GROUP BY domain
		) AS responses

		LEFT JOIN responses AS responses2 ON (
			responses2.domain = responses.domain AND
			responses2.date_added = max_date_added
		)

		LEFT JOIN json ON (
			json.directory = "users/" || responses2.auth_address
		)

		LEFT JOIN safety ON (
			safety.address = responses2.address
		)

		WHERE safety_score >= :min_safety

		ORDER BY max_date_added DESC
	`;
	const responses = await zf.cmdp(
		"dbQuery",
		[
			sql,
			{
				min_safety: parseInt(document.querySelector("#filter").value)
			}
		]
	);

	node.innerHTML = "";
	for(const response of responses) {
		const domainNode = document.createElement("div");
		domainNode.className = "domain";

		const nameNode = document.createElement("div");
		nameNode.className = "name";

		// Safety status
		if(response.safety_score > 0 || isModerator) {
			const okNode = document.createElement("div");
			okNode.className = "block block-ok";
			if(response.safety_score <= 0 && isModerator) {
				okNode.classList.add("block-change");
				okNode.title = "Mark as verified";
				okNode.onclick = () => {
					setScore(response.address, 1);
				};
			} else {
				okNode.title = "This site was verified by moderators";
			}
			okNode.textContent = "🛡️";
			nameNode.appendChild(okNode);
		}

		if(response.safety_score < 0 || isModerator) {
			const banNode = document.createElement("div");
			banNode.className = "block block-ban";
			if(response.safety_score >= 0 && isModerator) {
				banNode.classList.add("block-change");
				banNode.title = "Mark as dangerous";
				banNode.onclick = () => {
					setScore(response.address, -1);
				};
			} else {
				banNode.title = "This site was marked as dangerous by moderators";
			}
			banNode.textContent = "🚫";
			nameNode.appendChild(banNode);
		}

		nameNode.appendChild(document.createTextNode(response.domain));
		domainNode.appendChild(nameNode);

		const addressNode = document.createElement("a");
		addressNode.className = "address";
		addressNode.textContent = response.address;
		if(isAddress(response.address)) {
			addressNode.href = "/" + response.address;
		}
		domainNode.appendChild(addressNode);

		const ownerNode = document.createElement("div");
		ownerNode.className = "owner";
		ownerNode.textContent = response.cert_user_id || response.auth_address;
		domainNode.appendChild(ownerNode);

		node.appendChild(domainNode);
	}
}


async function setScore(address, score) {
	const siteInfo = await zf.cmdp("siteInfo");
	let data = await zf.cmdp("fileGet", [`data/moderators/${siteInfo.auth_address}/data.json`, false]);
	data = data ? JSON.parse(data) : {};
	data.safety = data.safety || {};
	data.safety[address] = {score};
	data = btoa(JSON.stringify(data, null, "\t"));
	await zf.cmdp("fileWrite", [`data/moderators/${siteInfo.auth_address}/data.json`, data, false]);
	updateDomains();
	await zf.cmdp("sitePublish", {inner_path: `data/moderators/${siteInfo.auth_address}/content.json`});
}


updateDomains();