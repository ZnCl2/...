#!/bin/sh

grep -l '<a href.*Non-English Info' *.html | xargs perl -pi -e '
    s/(<a href.*Non-English Info.*)/<a href="announcements.html">Announcements<\/a>\n\n\1/;
'
