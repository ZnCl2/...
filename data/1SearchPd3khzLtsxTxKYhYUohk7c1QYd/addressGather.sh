#!/bin/bash
zeronet_data_dir="/srv/zeronet/data/"
knowledge_dir="$HOME/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge"
#cd $zeronet_data_dir || exit
#
{
#grep -hinora http://127.0.0.1:43110/1.................................  \
grep -hERoi --binary-files=text \
'((https?|zero)://)?(127\.0\.0\.1:[0-9]{1,5}|localhost|zero)/(1[A-Za-z0-9]{31,33}|[A-Za-z0-9-]+\.bit)/?' \
  "$zeronet_data_dir"
# bash mwgrep.sh  
} > /tmp/address_list.txt
cat  /tmp/address_list.txt  \
|sed -e 's/\/*$//;s/^.*\//http:\/\/127.0.0.1:43110\//'|sort |uniq >  "$knowledge_dir/address_list.txt"

# 
