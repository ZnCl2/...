#!/bin/bash
name_dir=/srv/zeronet/data/1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F
knowledge_dir="$HOME/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge/"
grep 1......................... < "$name_dir/data/names.json" \
    |sed -e 's/.*: "//;s/".*//;s/^/http:\/\/127.0.0.1:43110\//'  > \
    /tmp/address_list.txt
cat "$knowledge_dir/address_list.txt" >> /tmp/address_list.txt
sort < /tmp/address_list.txt |uniq >  "$knowledge_dir/address_list.txt"
