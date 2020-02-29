#!/bin/bash

## download of the HTML page.
wget https://www.reddit.com/r/StreetFights/
## change the page to only have the URLs of videos
sed -i "s+ +\n+g" index.html 
grep "data-url" index.html > list_links.txt
sed -i '1d' list_links.txt
sed -i 's/\(.\{10\}\)//' list_links.txt
sed -i  s'/.$//' list_links.txt


##   Download of videos ##

mkdir videos_of_reddit_streetfight

youtube-dl -i --no-playlist -f bestvideo[ext=webm]+bestaudio[ext=webm]/best[ext=webm]/bestvideo+bestaudio/best[ext=mp4] -a liste_liens.txt





##  DEPENDENCIES ##

## you need to have  youtube-dl installed

