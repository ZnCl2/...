IS_SECURE = False
PROXY = "127.0.0.1:43111"
SITE = "1NAMEz7stUPZErkV1d3yLkVWQFa4PTqDNv"
USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0"
SIGNATURE = "HIKM5+u1+hgEc8yxf0GNFASPZPXaC0YA5IFs5phhL5CVYjMeVARvo91ab9CVkwbQH2QdlNFD8pT8LGcuWQcVOdw="
USERNAME = "issuer/gitlab@name.it"
TLDS = ("yo", "yu", "of", "inf", "zn", "list")


#
# Init. Too big init
#

import os
import time

master_seed = os.environ["master_seed"]


print("Establishing connection to proxy...")

import http.client
Connection = http.client.HTTPSConnection if IS_SECURE else http.client.HTTPConnection
conn = Connection(PROXY)
conn.request("GET", f"/{SITE}", headers={
	"Accept": "text/html",
	"User-Agent": USER_AGENT
})
response = conn.getresponse()
wrapper_key = response.read().split(b"wrapper_key = \"")[1].split(b"\"")[0].decode()
for cookie in response.getheader("Set-Cookie").split(","):
	if cookie.strip().startswith("master_address="):
		master_address = cookie.split("=")[1].split(";")[0].strip()


import websocket
ws = websocket.WebSocket()
ws_proto = "wss" if IS_SECURE else "ws"
ws.connect(
	f"{ws_proto}://{PROXY}/ZeroNet-Internal/Websocket?wrapper_key={wrapper_key}",
	cookie=f"master_address={master_address}"
)


import json
id = 1000000
def cmd(cmd, params=[], wait=False):
	global id
	id += 1
	ws.send(json.dumps({
		"id": id,
		"cmd": cmd,
		"params": params
	}))
	if wait:
		return recv()
def response(to, result):
	global id
	id += 1
	ws.send(json.dumps({
		"id": id,
		"to": to,
		"cmd": "response",
		"result": result
	}))
def recv():
	return json.loads(ws.recv())
response(cmd("userLoginForm", wait=True)["id"], master_seed)
recv()
master_address = recv()["params"].split("master_address=")[1].split(";")[0]
ws.close()


ws = websocket.WebSocket()
ws_proto = "wss" if IS_SECURE else "ws"
ws.connect(
	f"{ws_proto}://{PROXY}/ZeroNet-Internal/Websocket?wrapper_key={wrapper_key}",
	cookie=f"master_address={master_address}"
)

time.sleep(60)


#
# Review requests and update responses
#

print("Ensuring certificate...")

cmd("certAdd", [USERNAME.split("@")[1], USERNAME.split("/")[0], USERNAME.split("@")[0].split("/")[1], SIGNATURE], wait=True)
recv()
recv()

print("Loading current domains...")

sql = """
	SELECT * FROM (
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
"""
domains = {}
for row in cmd("dbQuery", [sql], wait=True)["result"]:
	domains[row["domain"]] = row

print("Domains loaded:", len(domains))

print("Loading responses...")

site_info = cmd("siteInfo", wait=True)["result"]
auth_address = site_info["auth_address"]
my_responses = cmd("fileGet", [f"data/issuers/{auth_address}/dns.json", True, "text", 1000], wait=True)["result"]
if my_responses:
	my_responses = json.loads(my_responses)["responses"]
else:
	my_responses = []

print("Responses loaded:", len(my_responses))

print("Handling requests...")

import time
date = int(time.time() * 1000)

sql = """
	SELECT
		requests.*,
		REPLACE(json.directory, "users/", "") AS auth_address
	FROM requests
	LEFT JOIN json ON (requests.json_id = json.json_id)
	LEFT JOIN responses ON (
		responses.domain = requests.domain AND
		responses.auth_address = auth_address AND
		responses.to_date_added = requests.date_added
	)
	WHERE responses.date_added IS NULL AND requests.date_added IS NOT NULL
	ORDER BY requests.date_added
"""
for request in cmd("dbQuery", [sql], wait=True)["result"]:
	def isGoodPart(part):
		return part != "" and all(c in "abcdefghijklmnopqrstuvwxyz0123456789-" for c in part)
	first_part = (request["domain"] or "").split(".")[0]

	if not request["domain"] or len(request["domain"]) > 100:
		result = -1
	elif not request["address"] or len(request["address"]) > 100:
		result = -2
	elif not all(isGoodPart(part) for part in request["domain"].split(".")[1:]) or (not isGoodPart(first_part) and first_part != "*"):
		result = -3
	elif request["domain"].count(".") == 0:
		result = -4
	elif request["domain"].split(".")[-1] not in TLDS:
		result = -5
	elif request["domain"] in domains and domains[request["domain"]]["auth_address"] != request["auth_address"]:
		result = -6
	else:
		parent = ".".join(request["domain"].split(".")[1:])
		if parent.count(".") > 0:
			if parent not in domains:
				result = -7
			elif domains[parent]["auth_address"] != request["auth_address"]:
				result = -8
			else:
				if request["domain"] in domains:
					result = 1
				else:
					result = 2
		else:
			if request["domain"] in domains:
				result = 3
			else:
				result = 4

	domain = {
		"domain": request["domain"],
		"address": request["address"],
		"auth_address": request["auth_address"],
		"result": result,
		"date_added": date,
		"to_date_added": request["date_added"]
	}
	my_responses.append(domain)
	date += 1  # order updates

	if result > 0:
		print(request["domain"], "updated/registered")
		domains[request["domain"]] = domain


print("Saving...")

import base64
cmd(
	"fileWrite",
	[
		f"data/issuers/{auth_address}/dns.json",
		base64.b64encode(json.dumps({"responses": my_responses}).encode()).decode(),
		True
	],
	wait=True
)
cmd(
	"sitePublish",
	{
		"inner_path": f"data/issuers/{auth_address}/content.json"
	},
	wait=True
)

print("Done")