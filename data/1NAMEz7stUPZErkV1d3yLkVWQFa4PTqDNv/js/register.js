function login() {
	zf.cmd("certSelect", [["zeroid.bit"]]);
}


let pendingRegistration = null;
let pendingRegistrationDate = null;

async function register() {
	// Validate format
	const domain = document.querySelector("#domain").value.trim();
	const tld = document.querySelector("#tld").value;
	const address = document.querySelector("#address").value.trim();

	let error = null;
	if(!domain) {
		error = "Please choose a domain";
	} else if(!address) {
		error = "Please specify site address (e.g. 1NAMEz7stUPZErkV1d3yLkVWQFa4PTqDNv)"
	} else if(!/^(\*\.)?([a-z0-9-]+\.)*[a-z0-9-]+$/.test(domain)) {
		error = "Your domain must only contain lowercase English letters, digits, dashes or dots";
	} else if(domain.length > 100) {
		error = "Your domain is too long to register";
	} else if(address.length > 100) {
		error = "Your site address is too long to register";
	}
	if(error) {
		document.querySelector("#status").innerHTML = error;
		return;
	}


	// Ensure we're logged in
	const siteInfo = await zf.cmdp("siteInfo");
	if(!siteInfo.cert_user_id) {
		document.querySelector("#status").innerHTML = "Please login";
		return;
	}


	// Ensure there's no such domain yet (or it belongs to us)
	const result = await zf.cmdp("dbQuery", [`
		SELECT * FROM responses
		WHERE domain = :domain || :tld AND result > 0
		ORDER BY date_added DESC
		LIMIT 1
	`, {domain, tld}]);
	if(result.length > 0 && result[0].auth_address !== siteInfo.auth_address) {
		document.querySelector("#status").innerHTML = "This domain is already in use";
		return;
	}


	// In case this is a subdomain or a wildcard domain, check that the parent
	// domain is owned by us
	if(domain.indexOf(".") > -1) {
		const parentDomain = domain.split(".").slice(1).join(".") + tld;
		const result = await zf.cmdp("dbQuery", [`
			SELECT * FROM responses
			WHERE domain = :parentDomain AND result > 0
			ORDER BY date_added DESC
			LIMIT 1
		`, {parentDomain}]);
		if(result.length === 0) {
			document.querySelector("#status").innerHTML = `Register parent domain (${parentDomain}) before registering a subdomain`;
			return;
		} else if(result[0].auth_address !== siteInfo.auth_address) {
			document.querySelector("#status").innerHTML = `You don't own the parent domain (${parentDomain})`;
			return;
		}
	}


	// Everything is ok, register
	document.querySelector("#status").innerHTML = "Registering...";
	let data = await zf.cmdp("fileGet", [`data/users/${siteInfo.auth_address}/data.json`, false]);
	data = data ? JSON.parse(data) : {};
	data.requests = data.requests || {};
	const date = Date.now();
	data.requests[domain + tld] = {address, date_added: date};
	data = btoa(JSON.stringify(data, null, "\t"));
	await zf.cmdp("fileWrite", [`data/users/${siteInfo.auth_address}/data.json`, data, false]);
	await zf.cmdp("sitePublish", {inner_path: `data/users/${siteInfo.auth_address}/content.json`});


	// Wait for response
	document.querySelector("#status").innerHTML = "Your domain is being registered, please wait up to 5 minutes";
	document.querySelector("#domain").disabled = true;
	document.querySelector("#tld").disabled = true;
	document.querySelector("#address").disabled = true;
	document.querySelector("#register").disabled = true;
	pendingRegistration = domain + tld;
	pendingRegistrationDate = date;
}


async function checkDomainRegistered() {
	if(pendingRegistration) {
		const siteInfo = await zf.cmdp("siteInfo");
		const result = await zf.cmdp("dbQuery", [`
			SELECT * FROM responses
			WHERE (
				domain = :pendingRegistration AND
				auth_address = :authAddress AND
				to_date_added = :pendingRegistrationDate
			)
			ORDER BY date_added DESC
			LIMIT 1
		`, {
			pendingRegistration,
			authAddress: siteInfo.auth_address,
			pendingRegistrationDate
		}]);
		if(result.length > 0) {
			document.querySelector("#status").innerHTML = "";
			document.querySelector("#domain").disabled = false;
			document.querySelector("#tld").disabled = false;
			document.querySelector("#address").disabled = false;
			document.querySelector("#register").disabled = false;
			pendingRegistration = null;
			pendingRegistrationDate = null;
		}
	}
}