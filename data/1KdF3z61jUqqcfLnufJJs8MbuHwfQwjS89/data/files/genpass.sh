#!/bin/bash
# -*- mode: sh; coding: utf-8 -*-
ME="${0##*/}"

##############################################################################
# This program is free software; you can redistribute it and/or modify it    #
# under the terms of the GNU General Public License as published by the Free #
# Software Foundation; either version 3 of the License, or (at your option)  #
# any later version.                                                         #
#                                                                            #
# This program is distributed in the hope that it will be useful, but with-  #
# out any warranty; without even the implied warranty of merchantability or  #
# fitness for a particular purpose.  See the GNU General Public License for  #
# more details.  <http://gplv3.fsf.org/>                                     #
##############################################################################

# This alphabet avoids ambiguities like 1/l/I and O/0
myAlphabet='2-9A-HJ-NP-Za-km-z'
# If ambiguity is not a problem, try an alphabet like
#myAlphabet='0-9A-Za-z'
# or even
#myAlphabet='-+!?#=*/%(){}@0-9A-Za-z'

# Default password length
myPasswordLength=24

##############################################################################
myAuthor='Klaus Alexander Seistrup <klaus@seistrup.dk>'
myRevision='2016-04-05'
myVersion="0.0.1 (${myRevision})"
myCopyright="\
genpass ${myVersion}
Copyright © 2016 Klaus Alexander Seistrup <klaus@seistrup.dk>

This is free software; see the source for copying conditions.  There is no
warranty; not even for merchantability or fitness for a particular purpose.\
"

my_help () {
  cat << __EOT__
usage: ${ME} [OPTIONS] [LENGTH]
  positional argument:
    LENGTH ............ create a password of length LENGTH (default: ${myPasswordLength})
  options are:
    -h, --help ........ show this help text and exit
    -v, --version ..... show version information and exit
    -c, --copyright ... show copyright notice and exit
__EOT__
}

my_version () {
  cat << __EOT__
genpass/${myVersion}
__EOT__
}

my_copyright () {
  cat << __EOT__
${myCopyright}
__EOT__
}

case "${1}" in
  -h | *help )
    my_help
    exit 0
  ;;
  -v | *version )
    my_version
    exit 0
  ;;
  -c | *copyright )
    my_copyright
    exit 0
  ;;
  # Really?
  0 )
    exit 0
  ;;
  # Nobody will need a password of the maximal length allowed
  # here, and xargs will most likely complain anyway, but…
  [1-9] | [1-9][0-9] | [1-9][0-9][0-9] | [1-9][0-9][0-9][0-9] \
  | [1-9][0-9][0-9][0-9][0-9] | [1-9][0-9][0-9][0-9][0-9][0-9] )
    myPasswordLength="${1}"
  ;;
  # Just use the default
  '' )
    : pass
  ;;
  * )
    echo "${ME}: unrecognized argument: ${1}" >&2
    echo >&2
    my_help >&2
    exit 1
  ;;
esac

tr -dc -- "${myAlphabet}" < /dev/urandom \
| head -c "${myPasswordLength}" \
| xargs -r

:
# eof
