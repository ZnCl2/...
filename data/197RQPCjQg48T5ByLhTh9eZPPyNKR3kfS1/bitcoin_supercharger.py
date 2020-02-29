#! /usr/bin/python
# Find the locations where a supercharger and a bitcoin location are close

import httplib2
import json
import locale

tolerance = 0.005

h = httplib2.Http(".cache")
h.debuglevel = 2

resp, content = h.request('https://www.tesla.com/all-locations', "GET")
chargers = json.loads(content)

resp, content = h.request('https://public.opendatasoft.com/explore/dataset/coinmap/download/?format=json&timezone=Europe/Berlin', "GET")
coinmap = json.loads(content)

#resp, content = h.request('https://api.openchargemap.io/v2/poi/?output=json', "GET")
#openchargemap = json.loads(content)

with open('wave.json', 'r') as content:  
    wave = json.load(content)


with open('supercharger.txt', 'w') as outfile:  
    outfile.write('lat\tlon\ttitle\tdescription\ticon\n')
with open('destination charger.txt', 'w') as outfile:  
    outfile.write('lat\tlon\ttitle\tdescription\ticon\n')
#with open('openchargemap.txt', 'w') as outfile:  
#    outfile.write('lat\tlon\ttitle\tdescription\ticon\n')
with open('wave.txt', 'w') as outfile:  
    outfile.write('lat\tlon\ttitle\tdescription\ticon\n')

for loc in chargers:
#    if loc['region'] != 'europe':
#        continue
    chgid = int(loc['nid'])        
    chgname = loc['title'].encode("ASCII", 'ignore')        
    chglat = float(loc['latitude'])
    chglon = float(loc['longitude'])
    chgtype = loc['location_type'][0].encode("ASCII", 'ignore')
    shops = 0

    for shop in coinmap:
        try:
            shopid = int(shop['fields']['id'])
            shopname = shop['fields']['name'].encode("ASCII", 'ignore')
            shoplat = float(shop['fields']['location'][0])
            shoplon = float(shop['fields']['location'][1])

            if abs(chglat - shoplat) < tolerance and abs(chglon - shoplon) < tolerance:
                shops += 1
                print(chgtype + ' ' + chgname + ' ' + shopname)
                with open(chgtype + '.txt', 'a') as outfile:  
                    outfile.write(str(shoplat) + '\t' + str(shoplon) + '\t' +
                              shopname + '\t' +
                              'coinmap\t' +
                              'coinmap.png' +  '\n')
        except KeyError:
            pass
        
    if shops > 0:
        with open(chgtype + '.txt', 'a') as outfile:  
            outfile.write(str(chglat) + '\t' + str(chglon) + '\t' +
                      chgname + '\t' +
                      chgtype + '\t' +
                      chgtype + '.png' +  '\n')

'''
for loc in openchargemap:
    chgid = int(loc['AddressInfo']['ID'])        
    chgname = loc['AddressInfo']['Title'].encode("ASCII", 'ignore')        
    chglat = float(loc['AddressInfo']['Latitude'])
    chglon = float(loc['AddressInfo']['Longitude'])
    try:
        chgtype = loc['Connections'][0]['PowerKW'].encode("ASCII", 'ignore')
    except:
        chgtype = 'unknown'
    shops = 0

    for shop in coinmap:
        try:
            shopid = int(shop['fields']['id'])
            shopname = shop['fields']['name'].encode("ASCII", 'ignore')
            shoplat = float(shop['fields']['location'][0])
            shoplon = float(shop['fields']['location'][1])

            if abs(chglat - shoplat) < tolerance and abs(chglon - shoplon) < tolerance:
                shops += 1
                print(chgtype + ' ' + chgname + ' ' + shopname)
                with open('openchargemap.txt', 'a') as outfile:  
                    outfile.write(str(shoplat) + '\t' + str(shoplon) + '\t' +
                              shopname + '\t' +
                              'coinmap\t' +
                              'coinmap.png' +  '\n')
        except KeyError:
            pass
        
    if shops > 0:
        with open('openchargemap.txt', 'a') as outfile:  
            outfile.write(str(chglat) + '\t' + str(chglon) + '\t' +
                      chgname + '\t' +
                      chgtype + '\t' +
                      'openchargemap.png' +  '\n')
'''

for loc in wave:
    chgname = loc['city'].encode("ASCII", 'ignore')        
    chglat = float(loc['latitude'])
    chglon = float(loc['longitude'])
    shops = 0

    for shop in coinmap:
        try:
            shopid = int(shop['fields']['id'])
            shopname = shop['fields']['name'].encode("ASCII", 'ignore')
            shoplat = float(shop['fields']['location'][0])
            shoplon = float(shop['fields']['location'][1])

            if abs(chglat - shoplat) < tolerance and abs(chglon - shoplon) < tolerance:
                shops += 1
                print('WAVE ' + chgname + ' ' + shopname)
                with open('wave.txt', 'a') as outfile:  
                    outfile.write(str(shoplat) + '\t' + str(shoplon) + '\t' +
                              shopname + '\t' +
                              'coinmap\t' +
                              'coinmap.png' +  '\n')
        except KeyError:
            pass
        
    if shops > 0:
        with open('wave.txt', 'a') as outfile:  
            outfile.write(str(chglat) + '\t' + str(chglon) + '\t' +
                      chgname + '\t' +
                      chgtype + '\t' +
                      'wave.png' +  '\n')

