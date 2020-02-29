async function updateOwnedDomains() {
	const node = document.querySelector("#owned");

	const siteInfo = await zf.cmdp("siteInfo");

	const sql = `
		SELECT
			requests.*,
			responses.result
		FROM requests

		LEFT JOIN json ON (json.json_id = requests.json_id)

		LEFT JOIN responses ON (
			responses.domain = requests.domain AND
			"users/" || responses.auth_address = json.directory AND
			responses.to_date_added = requests.date_added
		)

		WHERE json.directory = "users/" || :authAddress

		ORDER BY requests.date_added DESC
	`;

	const responses = await zf.cmdp("dbQuery", [sql, {authAddress: siteInfo.auth_address}]);

	node.innerHTML = "";
	for(const response of responses) {
		const domainNode = document.createElement("div");
		domainNode.className = "domain";

		const nameNode = document.createElement("div");
		nameNode.className = "name";
		nameNode.textContent = response.domain;
		domainNode.appendChild(nameNode);

		const addressNode = document.createElement("a");
		addressNode.className = "address";
		addressNode.textContent = response.address;
		if(isAddress(response.address)) {
			addressNode.href = "/" + response.address;
		}
		domainNode.appendChild(addressNode);

		const ownerNode = document.createElement("div");
		ownerNode.className = `status ${response.status < 0 ? "status-bad" : ""}`;
		ownerNode.textContent = {
			"-1": "Too long domain",
			"-2": "Too long address",
			"-3": "Invalid domain",
			"-4": "Too global domain",
			"-5": "Invalid TLD",
			"-6": "Domain not owned",
			"-7": "Parent domain unexistent",
			"-8": "Parent domain not owned",
			0: "Pending...",
			1: "Subdomain updated",
			2: "Subdomain registered",
			3: "Domain updated",
			4: "Domain registered"
		}[response.result || 0];
		domainNode.appendChild(ownerNode);

		node.appendChild(domainNode);
	}
}

updateOwnedDomains();