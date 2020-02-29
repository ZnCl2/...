#!/bin/bash
knowledge_dir=knowledge/
cd "$knowledge_dir" || exit
siteCount=$(wc -l < realAddress.txt)
maxRepeat="$((siteCount/100))"
echo maxRepeat "$maxRepeat"
export MAX_REPEAT=$maxRepeat


excludeHighCount () {
echo "0 $0 1 $1  2 $2"
if [ $# -gt 1 ] && [ "$1" -gt "$MAX_REPEAT" ] ; then 
  shift; return "$@"
fi 
}


sort < index.json|uniq -cd|sort -h| grep -sv \"index\":\ \" |grep -v ^B| \
  sed -e 's/\"//g;s/'\''//g'|\
  xargs -l  sh ../excludeHighCount.sh  > commonLines.txt

comm -23 index.json commonLines.txt
