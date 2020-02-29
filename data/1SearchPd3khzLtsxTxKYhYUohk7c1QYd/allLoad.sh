address_list="knowledge/address_list.txt"
zeronet_data_dir="/srv/zeronet/data/"
for url in $(cat "$address_list"); 
do 
  dir=$(echo "$url"| sed -e "s/.*\///")
  if [ ! -d "$zeronet_data_dir/$dir" ]
  then
    lynx -dump "$url"; 
  fi
done
