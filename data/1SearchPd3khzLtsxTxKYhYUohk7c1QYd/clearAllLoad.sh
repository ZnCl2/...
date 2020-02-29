address_list="knowledge/address_list.txt"
zeronet_data_dir="/srv/zeronet/data/"
for url in $(cat "$zeronet_data_dir/$address_list"); 
do 
    lynx -dump "$url"; 
done
