import re
import os
import json
from natsort import natsorted

fobj = open("./anthologies-empty.json")
anthologies = json.loads(fobj.read())

def remove_prefix(text, prefix):
	return text[len(prefix):] if text.startswith(prefix) else text

for anthology in anthologies.itervalues():
	prefixes = ["COMIC","Digital","WEB"]
	anthology["sort_as"] = anthology["title"]
	for prefix in prefixes:
		anthology["sort_as"] = remove_prefix(anthology["sort_as"],prefix).strip()
	anthology["volumes"] = []

path = './galleries'
for d in os.listdir(path):
	manifest_path = path+os.sep+d+os.sep+"manifest.json"
	if os.path.isfile(manifest_path):
		fobj = open(manifest_path)
		manifest = json.loads(fobj.read())
		found_anthology = False
		for tag in manifest["tags"]:
			if tag["namespace"] == "anthology":
				found_anthology = True
				anthologies[tag["name"]]["volumes"].append(
					{
						"title":manifest["title"],
						"cover":manifest["cover"],
						"path":d
					})
		if not found_anthology:
			print "No anthology tag in "+manifest_path

for anthology in anthologies.itervalues():
	anthology["volumes"] = natsorted(anthology["volumes"], key=lambda y: y["title"])

f = open("anthologies.json", "w")
f.write(json.dumps(anthologies, indent=4, sort_keys=True))
