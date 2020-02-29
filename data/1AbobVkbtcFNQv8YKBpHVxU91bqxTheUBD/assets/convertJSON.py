import subprocess

def copy2clip(txt):
    cmd='echo '+txt.strip()+'|clip'
    return subprocess.check_call(cmd, shell=True)


with open('link.json', encoding='utf8') as f:
    data = "".join(line.rstrip() for line in f)

#file = open('link.js', 'w', encoding='utf8')
#file.write("data = '" + data + "';")
#file.close()

asd = "data = '" + data + "';"

copy2clip(asd)
