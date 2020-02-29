#!/bin/bash
# gathers first 512 bytes of index.html for real zites based on lynx -dump
realAddressList="$HOME/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge/realAddress.txt"
zeronet_data_dir=/srv/zeronet/data


index=""
#{
echo '[{'
for url in $(cat "$realAddressList")
do
  realDir=$(echo "$url" | sed -e 's/.*\///')
  echo '"address":'"\"$realDir\","
  echo -n '"index": "'
  if [ -e "$zeronet_data_dir/$realDir/index.htm" ]
  then
    index=$(lynx -dump "$zeronet_data_dir/$realDir/index.htm")
    index=$(lynx -dump "$zeronet_data_dir/$realDir/index.htm")
elif [ -e "$zeronet_data_dir/$realDir/index.html" ]
then
  index=$(lynx -dump "$zeronet_data_dir/$realDir/index.html")
  lynx -dump "$zeronet_data_dir/$realDir/index.html"
elif [ -e "$zeronet_data_dir/$realDir/index.txt" ]
then
  echo -n "index.txt: "
  index=$(cat "$zeronet_data_dir/$realDir/index.txt")
elif [ -e "$zeronet_data_dir/$realDir/index.md" ]
then
  echo -n "index.md: "
  index=$(cat "$zeronet_data_dir/$realDir/index.md")
elif [ -e "$zeronet_data_dir/$realDir/index.tex" ]
then
  echo -n "index.tex: "
  index=$(cat "$zeronet_data_dir/$realDir/index.tex")
fi
 echo "$index"# | sed '/^$/d;/----*/d;s/\t/ /g;s/\"/&#34\;/;s/'\''/&#34\;/' | \
  # sed -e  '/_____*/d' | tr '\r\n' '\<br\>' |head -c 1024
  echo '"},{'
done
echo '}]'
#} > knowledge/index.json



