#!/bin/bash
zeronet_data_dir=/srv/zeronet/data/
knowledge_dir="$HOME/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge"
cd "$zeronet_data_dir" || exit
{
for dir in $zeronet_data_dir/1*
do
if [ ! -z "$(ls -A "$dir")" ]; then
  echo "$(echo "$dir" |sed -e 's/.*\//http:\/\/127.0.0.1:43110\//;')"
fi
done
} > "$knowledge_dir/realAddress.txt"
