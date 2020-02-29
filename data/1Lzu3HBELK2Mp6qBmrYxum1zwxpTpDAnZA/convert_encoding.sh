#!/bin/bash
for f in "$@"; do
    echo $f
    convmv -f cp1252 -t cp850 "$f" --notest --nosmart
    convmv -f cp866 -t utf-8 "`echo "$f" | iconv -f cp1252 -t cp850`" --notest --nosmart
done
