import json
import re

with open("recentlyUpdated.json", "r") as f:
    jo = json.load(f)
    str = "<!-- build: recently added -->\n"

    for item in jo["recentyl updated"]:
        with open(item["data.json"], "r") as fa:
            animeData = json.load(fa)


        img_path = (item["path"] + "/wide-thumb.jpg") if "/ep" in item["path"] else (item["path"] + "/thumb.jpg")
        if "/ep" in item["path"]:
            into = int(item['path'].split('/ep')[1]) -1
            view_url = f"view.html?ep={into}&data=" + item["path"].split("/ep")[0]
        else:
            view_url = "view.html?ep=0&data=" + item["path"]


        category = ""
        for genre in animeData["genres"]:
            category += f"""<a href="search.html?q=&g={genre}">{genre}</a>
                  """

        str += f"""
          <div class="item">
            <!-- card -->
            <div class="card card--big">
              <div class="card__cover">
                <img src="{img_path}" alt="">
                <a href="{view_url}" class="card__play">
                  <i class="icon ion-ios-play"></i>
                </a>
              </div>
              <div class="card__content">
                <h3 class="card__title"><a href="#">{item['title']}</a></h3>
                <p><a href="{view_url}">{animeData["name"]}</a></p>
                <span class="card__category">
                  {category}
                </span>
              </div>
            </div>
            <!-- end card -->
          </div>
          """
    str += "<!-- build-end: recently added -->"


    with open("index.html", "r") as ff:
        data = ff.read()
        data = re.sub(r"<!-- build: recently added -->(?:.|\n)+<!-- build-end: recently added -->", str, data)

    with open("index.html", "w") as ff:
        ff.write(data)
