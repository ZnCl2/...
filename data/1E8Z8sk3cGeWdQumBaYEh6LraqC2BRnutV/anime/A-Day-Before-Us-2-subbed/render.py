import os

from os import listdir
from os.path import isfile, isdir, join
from random import randint


anime_name = os.path.relpath(".", "..")
episodesFolders = [f for f in listdir(".") if isdir(join(".", f))]
episodesFolders = sorted(episodesFolders, key=lambda x: int(x[2:]))

print(f"current anime: {anime_name}")
print(episodesFolders)

# create data.json
episodesJsone = "";
jsone = """
{
  "name": ":anime_name",
  "thumb": "thumb.jpg",
  "date": ymd,
  "flag": "",
  "links": [
    {
      "myanimelist.net": ""
    }
  ],
  "studios": [
    ""
  ],
  "genres": [
    ""
  ],
  "duration": "23m",
  "status": "Finished Airing",
  "age": "",
  "story": "",
  "episodesCount": :episodes_count,
  "episodes": [:episodes
  ]
}
"""
jsone = jsone.replace(":anime_name", anime_name.replace("-", " "))
jsone = jsone.replace(":episodes_count", str(len(episodesFolders)))

for ep in episodesFolders:
    episodesJsone += """
    {
      "name": "",
      "wide-thumb": ":ep/wide-thumb.jpg",
      "optionals": [
        {
          "res": "720p",
          "path": ":ep/:anime_name-:ep-720p.mp4"
        },
        {
          "res": "480p",
          "path": ":ep/:anime_name-:ep-480p.mp4"
        }
      ]
    }""" + ("," if ep != episodesFolders[-1] else "")
    episodesJsone = episodesJsone.replace(":anime_name", anime_name)
    episodesJsone = episodesJsone.replace(":ep", ep)

jsone = jsone.replace(":episodes", episodesJsone)

#with open("data.json", "w") as f:
#    f.write(jsone)

for folder in episodesFolders:
    file_in_fol = [f for f in listdir(folder) if isfile(join(folder, f))]

    if "wide-thumb.jpg" in file_in_fol:
        print("already has wide-thumb.jpg")
    else:
        print(f"{folder} missing wide-thumb.jpg")

        #os.system(f"ffmpeg -i {folder}/*.mp4 -vcodec libx264 -crf 28 -s 854x480 {folder}/vid.mp4")
        #os.system(f"rm -f {folder}/bvid.mp4")
        os.system(f"ffmpeg -ss 00:{randint(0, 2)}:{randint(1, 59)} -i {folder}/*480p.mp4 -vframes 1 -q:v 2 {folder}/thumb.jpg")
        os.system(f"convert {folder}/thumb.jpg -quality 50 -resize 213x120 {folder}/wide-thumb.jpg")
        os.system(f"rm -f {folder}/thumb.jpg")
        #os.system(f"mv {folder}/vid.mp4 {folder}/{anime_name}-{folder}.mp4")
