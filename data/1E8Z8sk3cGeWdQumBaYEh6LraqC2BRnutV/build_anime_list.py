import os

from os import listdir
from os.path import isfile, isdir, join
from random import randint
import json

# list anime folders
animes = [f for f in listdir("anime") if isdir(join("anime", f))]
jsone = { "files": [] }

print("animes:\n")
print("\n".join(animes))

for anime in animes:
    if isfile("anime/" + anime + "/data.json"):
        with open("anime/" + anime + "/data.json", "r", encoding="utf-8") as fa:
            print("loading animeData : " + anime)
            animeData = json.load(fa)

            data = {}
            data["inner_path"] = anime
            for k in "name date genres flag age thumb story".split(" "):
                if k in animeData.keys():
                    if len(str(animeData[k])) < 200:
                        data[k] = animeData[k]
                    else:
                        data[k] = animeData[k][:200] + "..."

            jsone["files"].append(data)

json_str = json.dumps(jsone)
with open("anime/list.json", "w", encoding="utf-8") as f:
    f.write(json_str)
