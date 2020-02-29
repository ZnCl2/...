#! /bin/sh
USERNAME="styromaniac"
ZERONET_ROOT_DIR="/home/${USERNAME}/ZeroNet"
SITE_ADDRESS="15CEFKBRHFfAP9rmL6hhLmHoXrrgmw4B5o"
SH_DIR="${ZERONET_ROOT_DIR}/data/${SITE_ADDRESS}/cache/1/"
CLEARNET_TRACKERS="https://newtrackon.com/api/stable"
OUTFILE="${SH_DIR}_h_.html"
TEMPFILE="${OUTFILE}.new"

RESPONSE_CODE=$(curl --write-out "%{response_code}" "${CLEARNET_TRACKERS}" --output "${TEMPFILE}")

# If something went wrong getting the clearnet trackers list
if [[ ${RESPONSE_CODE} != 200 ]]; then
  # Erase the temporal file and exit
  rm -f "${TEMPFILE}"
  exit 1
fi

# Replace the old clearnet trackers file with the new one
mv "${TEMPFILE}" "${OUTFILE}"

#Combine trackers files into Syncronite.html
cat "${SH_DIR}v3_trackers.html" "${SH_DIR}_h_.html" > "${SH_DIR}Syncronite.html"

# Sign and publish
${ZERONET_ROOT_DIR}/zeronet.py siteSign "${SITE_ADDRESS}" --publish