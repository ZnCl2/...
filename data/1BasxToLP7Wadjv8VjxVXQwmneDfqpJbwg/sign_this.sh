#!/bin/sh
ADDR=$(pwd | tr "/" "\n" | tail -n1)
cd ../../
sudo sudo -u zeronet python2 ./zeronet.py siteSign ${ADDR} $1
