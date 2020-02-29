import json
import os

name_bit = json.loads(open('../1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F/data/names.json', 'rU').read())
name_bit.update(json.loads(open('hosts/fix.json', 'rU').read()))
name_bit.update(json.loads(open('hosts/neko.json', 'rU').read()))

if os.path.exists('hosts/user.json'):
	name_bit.update(json.loads(open('hosts/user.json', 'rU').read()))

open('data/names.json', 'wb').write(json.dumps(name_bit).encode('utf-8'))