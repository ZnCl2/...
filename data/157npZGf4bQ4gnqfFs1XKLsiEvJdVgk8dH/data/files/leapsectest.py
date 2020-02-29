#!/usr/bin/python3

from datetime import (datetime, timedelta)
from pytz import UTC
from sys import stderr

try:
    leap = datetime(2016, 12, 31, 23, 59, 60, tzinfo=UTC)
except ValueError as error:
    print(str(error), file=stderr)
    leap = datetime(2016, 12, 31, 23, 59, 59, tzinfo=UTC)
    leap += timedelta(seconds=1)

print('{:%FT%T%z}'.format(leap))

# eof
