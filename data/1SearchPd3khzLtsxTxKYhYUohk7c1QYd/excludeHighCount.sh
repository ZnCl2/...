#!/bin/bash
if [ $# -gt 1 ] && [ "$1" -gt "$MAX_REPEAT" ] ; then 
  shift; echo "$@"
fi 

