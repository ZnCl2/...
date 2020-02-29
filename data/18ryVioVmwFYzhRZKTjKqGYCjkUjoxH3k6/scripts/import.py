#!/usr/bin/env python3
import os
import sys
import json
import time
import datetime
import requests


if len(sys.argv) == 1:
    print("Usage: {} <url>".format(sys.argv[0]))
    print("Imports topics, posts and comments from other resources, such as GitHub and ZeroTalk, to DevZone.")
    print("Example: {} https://github.com/HelloZeroNet/ZeroNet/issues/1".format(sys.argv[0]))
    print("Example: {} http://127.0.0.1:43110/Talk.ZeroNetwork.bit/?Topic:1604050476_1Cy3ntkN2GN9MH6EaW6eHpi4YoRS2nK5Di/Efficient+minimal+overhead+block+storage+and+path+data+linkage".format(sys.argv[0]))


os.chdir(os.path.dirname(os.path.realpath(__file__)))
os.chdir("..")


headers = {
    "Authorization": "Basic ODY1OWRkNDc4ZjgyNmRlMGY5Y2I6OTI3MjYxYTEzNzM2ODRmMzk4MjE2N2U5NDdmNWYxZmEzZDg0YmQxYQ=="
}


def add_topic(cert_user_id, **kwargs):
    dirpath = cert_user_id.replace("@", "_")
    os.makedirs("data/mirrored/" + dirpath, exist_ok=True)
    try:
        with open("data/mirrored/" + dirpath + "/data.json", "r") as f:
            data = json.loads(f.read())
    except FileNotFoundError:
        data = {}
    data["cert_user_id"] = cert_user_id
    if "next_topic_id" not in data:
        data["next_topic_id"] = 1
    if "topic" not in data:
        data["topic"] = []
    topic_id = data["next_topic_id"] + int(time.time())
    data["topic"].append({
        "topic_id": topic_id,
        **kwargs
    })
    data["next_topic_id"] += 1
    with open("data/mirrored/" + dirpath + "/data.json", "w") as f:
        f.write(json.dumps(data))
    return f"{topic_id}_mirrored_{dirpath}"


def add_comment(cert_user_id, topic_uri, **kwargs):
    dirpath = cert_user_id.replace("@", "_")
    os.makedirs("data/mirrored/" + dirpath, exist_ok=True)
    try:
        with open("data/mirrored/" + dirpath + "/data.json", "r") as f:
            data = json.loads(f.read())
    except FileNotFoundError:
        data = {}
    data["cert_user_id"] = cert_user_id
    if "next_comment_id" not in data:
        data["next_comment_id"] = 1
    if "comment" not in data:
        data["comment"] = {}
    if topic_uri not in data["comment"]:
        data["comment"][topic_uri] = []
    data["comment"][topic_uri].append({
        "comment_id": data["next_comment_id"],
        **kwargs
    })
    data["next_comment_id"] += 1
    with open("data/mirrored/" + dirpath + "/data.json", "w") as f:
        f.write(json.dumps(data))



path = sys.argv[1]
if "/github.com/" in path:
    url = path.split("/github.com/")[1]
    repo_path, issue_id = url.split("/issues/")
    issue = requests.get(f"https://api.github.com/repos/{repo_path}/issues/{issue_id}", headers=headers).json()

    print("Importing topic")
    topic_uri = add_topic(
        issue["user"]["login"] + "@github",
        title=issue["title"],
        body=issue["body"],
        type="topic",
        parent_topic_uri="1603625453_users_1Cy3ntkN2GN9MH6EaW6eHpi4YoRS2nK5Di",
        added=int(datetime.datetime.fromisoformat(issue["created_at"][:-1]).timestamp()),
        modified=int(datetime.datetime.fromisoformat(issue["updated_at"][:-1]).timestamp())
    )

    i = 1
    while True:
        comments = requests.get(issue["comments_url"] + f"?per_page=100&page={i}", headers=headers).json()
        if not comments:
            break
        for comment in comments:
            print("Importing comment from", comment["user"]["login"] + "@github")
            add_comment(
                comment["user"]["login"] + "@github",
                body=comment["body"],
                topic_uri=topic_uri,
                added=int(datetime.datetime.fromisoformat(issue["created_at"][:-1]).timestamp()),
                modified=int(datetime.datetime.fromisoformat(issue["updated_at"][:-1]).timestamp())
            )
        i += 1