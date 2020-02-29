#!/bin/bash
#
# Script Name: YTD.sh
# Description: Script that attempts to automate & simplify the usage of YouTube-dl & Ffmpeg
# Purpose: automate YouTube, Soundcloud, Vimeo stream duplication & conversion
# Requirements: Youtube-dl & Ffmpeg & access to ~/conv path
#    sudo add-apt-repository ppa:nilarimogard/webupd8 && sudo apt-get update && sudo apt-get install youtube-dl
#    sudo add-apt-repository ppa:mc3man/trusty-media && sudo apt-get update && sudo apt-get install ffmpeg
#    mkdir ~/conv
#
# Enjoy!
 
REPEAT=1
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color
 
#Preform a saftey Check 
printf "${YELLOW}\nYoutube-DL Script${NC}: Preforming saftey check..."
if test -d ~/conv
    then
        printf "${YELLOW}\nYoutube-DL Script${NC}: Conversion directory found... "
        cd ~/conv
    else 
        printf "${YELLOW}\nYoutube-DL Script${NC}: /conv/ Saftey conversion directory does NOT exist... "
        printf "${YELLOW}\nYoutube-DL Script${NC}: Would you like to create it to continue"
        read -p "? " -n 1 -r
        echo 
        if [[ $REPLY =~ ^[Yy]$ ]]; 
            then mkdir ~/conv && cd ~/conv
            else printf "${YELLOW}\nYoutube-DL Script${NC}: Conversion director required to continue...\n";
                 printf "${YELLOW}Youtube-DL Script${NC}: Exiting...\n";exit 1
        fi
fi
 
#Create a multi download loop
until [  $REPEAT = 0 ];do
    # Prompt the user for the target URL
    printf "\n${YELLOW}Youtube-DL Script:${NC}: Enter the URL to download:\n[URL]: "
    read targeturl
    
    #ensure it's some kind of link
    if [[ ( $targeturl == "http"* ) ]]; then
        #Grab the command output that contains the (best) keyword
        printf "\n${YELLOW}Youtube-DL Script${NC}: Searching for (best) format...\n"
        MOREF=`youtube-dl --list-f  $targeturl | grep best`
 
        #Echo The output line that has the 'best' result
        printf "${YELLOW}Youtube-DL Script${NC}: Auto-detect found...\n"
        printf "  ${BLUE}$MOREF${NC}\n\n"
 
        # Grab the format key with a substring commend
        printf "${YELLOW}Youtube-DL Script${NC}: Attempting to download...\n"
        FORMAT=$(echo $MOREF| cut -d' ' -f 1)
 
        # Initiate a YouTube-DL command using the found format & inputed url
        youtube-dl -f $FORMAT $targeturl | grep download;sleep 1
 
        if [[ $targeturl != *"soundcloud"* ]]; then
            printf "\n${YELLOW}Youtube-DL Script${NC}: Convert files to mp3"
            read -p "? " -n 1 -r
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Send all filenames with a .mp4 extension to FFMEG with a mp3 conversion commend
                find -name "*.mp4" -exec ffmpeg -i {} -acodec libmp3lame -ab 128k {}.mp3 \;
 
                # Echo a Clean Up Message (This will DELETE all mp4 files
                sleep 1s;
                printf "\n${YELLOW}Youtube-DL Script:${NC}: Conversion Done... Do you want to delete any mp4s files? (CAN NOT BE UNDONE)"
                read -p ": " -n 1 -r
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    #Remove any files with an mp4 extention to finilize the conversion process
                    find -name "*.mp4" -exec rm {} \;
                    printf "\n${YELLOW}Youtube-DL Script:${NC}: Cleanup done..."
                fi
            fi
        fi
    else
        printf "${YELLOW}Youtube-DL Script${NC}: User entered a BAD URL... Exiting.\n";exit 1
    fi
    
    printf "${YELLOW}\nYoutube-DL Script${NC}: Download another URL"
    read -p "? " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; 
        then let REPEAT=1
        else printf "${YELLOW}Youtube-DL Script${NC}: Exiting\n";exit 1
    fi
done