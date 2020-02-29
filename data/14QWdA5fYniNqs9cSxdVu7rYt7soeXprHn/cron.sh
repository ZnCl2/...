#!/usr/bin/env bash

###########################################
# This script should get executed by cron #
###########################################

# ensure we are in the correct directory
cd "${0%/*}"

# example crontab
# */15 * * * * /path/to/this/script/cron.sh

# change this to your own site if you want to run your own service
PUBLICKEY="14QWdA5fYniNqs9cSxdVu7rYt7soeXprHn"
PRIVATEKEY=$(cat ../../bitcoinprice-privatekey.txt) # stored in root directory of zeronet

# update the price.json file
echo "updating price.json..."
python update.py
echo "done!"

# sign and publish our site
cd ../../
echo "signing..."
python zeronet.py siteSign $PUBLICKEY $PRIVATEKEY
echo "done!"
echo "publishing..."
python zeronet.py sitePublish $PUBLICKEY
echo "done!"

