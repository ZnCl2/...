#!/bin/bash
#
#
#file_compile liberit_ca

NAME=liberit_ca
bash clean.sh
lualatex $NAME
biber $NAME
lualatex $NAME
htlatex $NAME "web,next"
#mk4ht htlatex ${NAME}.tex 'xhtml,charset=utf-8' ' -cunihtf -utf8 -cvalidate'
bash clean.sh

cp liberit_ca.html index.html

docker build -t liberit/mainsite:latest .
docker push liberit/mainsite:latest

echo "done"
