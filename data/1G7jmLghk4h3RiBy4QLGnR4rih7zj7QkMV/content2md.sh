#!/bin/bash
[ $# != 1 ] && echo "Need content.json." && exit
[ ! -f $1 ] && echo "File not exist" && exit

co=$(cat $1)
addr=$(echo "$co"|grep '"address":'|awk -F \" '{print $4}')
[ -z "$addr" ] && addr="--addr--"
title=$(echo "$co"|grep '"title":'|awk -F \"title\": '{print $2}'|sed 's/,/ /g')
#title=$(printf "$titl")
[ -z "$title" ] && title="--title--"
descr=$(echo "$co"|grep '"description":'|awk -F \"description\": '{print $2}'|sed 's/,/ /g')
#descr=$(printf "$desc")
[ -z "$descr" ] && descr="-description-"
modi=$(echo "$co"|grep '"modified":'|awk -F \"modified\": '{print $2}'|sed 's/ //g'|sed 's/,//g')
opti=$(echo "$co"|grep '"optional":'|awk -F \"optional\": '{print $2}'|sed 's/,/ /g')
[ -z "$opti" ] && opti="--none--"
size=$(echo "$co"|grep -A 99999 files_optional|grep '"size":'|awk '{sum += $2};END {print sum}')
[ -n "$size" ] && optsize=$(echo "scale=2;$size/1024000"|bc) || optsize='---'

#echo -e "$addr\t$title $descr\t$(date -d @"$modi")\t$opti\t${optsize}MB"
echo "|[$title](http://127.0.0.1:43110/$addr)|$descr|$(date -d @"$modi")|$opti|${optsize}MB|"
