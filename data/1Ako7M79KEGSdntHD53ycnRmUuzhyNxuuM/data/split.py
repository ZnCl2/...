import json, time, sys, os

out_users = json.load(open("users_archive.json"))

out_certs = {"certs": {}}
for out_certs_i in range(1,10000):
	out_certs_filename = "certs_%s.json" % out_certs_i
	if os.path.isfile(out_certs_filename):
		print "Certs file already exists:", out_certs_filename
	else:
		break

print "Out filename: %s" % out_certs_filename

for user in sorted(out_users["users"].keys()):
	details = out_users["users"][user]
	if details.startswith("@"):
		continue

	auth_type, auth_address, cert_sign = details.split(",")

	out_certs["certs"][user] = details
	out_users["users"][user] = "@%s,%s" % (out_certs_i, auth_address[0:6])
	if len(out_certs["certs"]) > 6000:
		print "Out certs len: %s" % len(out_certs["certs"])
		break

if len(out_certs["certs"]) < 6000:
	print "Need atleast 8000 users to create an archive, got: %s" % len(out_certs["certs"])
	sys.exit(0)

json.dump(out_certs, open(out_certs_filename, "w"), indent=1, sort_keys=True)
json.dump(out_users, open("users_archive.json", "w"), indent=1, sort_keys=True)