#!/bin/bash
grep -hERoi --binary-files=text \
'((https?|zero)://)?(127\.0\.0\.1:[0-9]{1,5}|localhost|zero)/(1[A-Za-z0-9]{31,33}|[A-Za-z0-9-]+\.bit)/?' \
