#!/bin/bash -l
zeronet_dir="/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/"
echo $HOME
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd "$HOME/$zeronet_dir" || exit
echo "gathering addresses"
bash addressGather.sh
echo "gathering bit addresses"
bash bitAddressGather.sh
echo "gathering kaffie addresses"
bash kaffieAddressGather.sh
echo "loading all"
bash allLoad.sh
echo "listing used ones"
bash listUsed.sh
rm "$zeronet_dir/knowledge/address_list.txt"
echo "grabbing peer count"
python grab.py
echo "generating searchJsonGen"
node searchJsonGen.js
echo "knowledgeGathering"
bash knowledgeGather.sh
