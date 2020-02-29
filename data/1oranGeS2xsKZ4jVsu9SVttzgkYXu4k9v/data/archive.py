import json
import os
import time
import sys


root = os.path.dirname(__file__)
site_address = sys.argv[1]
site_privatekey = sys.argv[2]
extra_params = sys.argv[3:]

contents = []
for dirname in os.listdir(root + "/users"):
    if not os.path.isdir(root + "/users/" + dirname):
        continue
    try:
        content = json.load(open(root + "/users/" + dirname + "/content.json"))
        contents.append([content["modified"], dirname])
    except Exception, err:
        raw_input("Error load: %s" % err)


deleted = 0
for modified, dirname in sorted(contents):
    days_old = (time.time() - modified) / (60 * 60 * 24)
    if days_old < 30:
        continue
    if not os.path.isfile(root + "/users/" + dirname + "/data.json"):
        size = 0
    else:
        size = float(os.path.getsize(root + "/users/" + dirname + "/data.json")) / 1024
    print " - Deleting messages from %s (%.0f days old, %.2fkb)" % (dirname, days_old, size)

    # Insert dirname to archived dirnames
    users_content = json.load(open(root + "/users/content.json"))
    users_content["user_contents"]["archived"][dirname] = int(time.time())
    json.dump(users_content, open(root + "/users/content.json", "w"), indent=2)

    try:
        os.rename(root + "/users/" + dirname, root + "/archived/" + dirname)
    except Exception, err:
        print "Error renamig dir", dirname, err

    deleted += 1
    if deleted > 100:
        break
cmd = "zeronet.py %s siteSign %s %s --inner_path data/users/%s/content.json --publish" % (" ".join(extra_params), site_address, site_privatekey, dirname)
#os.system(cmd)
print cmd