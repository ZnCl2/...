import json
import time
import os

data = json.loads(
	open("messages.json").read().replace("\\u0000", "")
)

data_latest = data[0:200]
data_old = data[200:]

json.dump(data_latest, open("messages_new.json", "w"), indent=2)
json.dump(data_old, open("messages_%s.json" % time.strftime("%Y-%m-%d_%H%m"), "w") , indent=2)
os.unlink("messages.json")
os.rename("messages_new.json", "messages.json")