#!/bin/bash
#0list gather
zero_data_dir=/srv/zeronet/data/
ZEROLISTDir="$zero_data_dir"/186THqMWuptrZxq1rxzpguAivK3Bs6z84o
NAMESDir="$zero_data_dir"/1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F
{
echo "{\"websiteList\": [{"
grep -ihr '"title":' -A 1  "$ZEROLISTDir/data/users" |  sed \
  's/^--//;s/^\t*//;s/^$/\},\{/;/^\"b/s/,$//;/^\"p/s/,$//' | grep -v Spam  |\
  grep -v '^\}$'
echo "}]}"
} > knowledge/0list.json
# names gather
{
echo $NAMESDir/data/names.json 
} > knowledge/names.json

# number searched
# just 0list for now
number_of_zites=$(wc -l < knowledge/realAddress.txt)
bash --version
printf -v sedCmd 's/searching\">.*<\/div/searching\">%s Zites Searched <br\/> %s 搜索网站<\/div/' "$number_of_zites" "$number_of_zites"

sed -i index.html -e "$sedCmd"
