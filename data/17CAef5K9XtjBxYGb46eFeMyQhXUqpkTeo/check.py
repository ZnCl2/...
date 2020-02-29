import re
import collections
import sys
filename = 'data.txt'
if len(sys.argv) >= 2:
	filename = sys.argv[1]
textfile = open(filename, 'r')
filetext = textfile.read()
textfile.close()
matches = re.findall("[a-zA-Z0-9]{30,34}", filetext)
print "Total number of sites: ",len(matches)
dups = [item for item, count in collections.Counter(matches).items() if count > 1]
print "Number of Duplicates: ", len(dups)
print "Unique sites: ", len(matches)-len(dups)
print "Duplicated Sites: ", dups