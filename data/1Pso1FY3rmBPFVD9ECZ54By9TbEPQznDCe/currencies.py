#!/usr/bin/python
#This script is called by a cron job

import urllib2, json, itertools, ConfigParser, sys, time

sys.path.insert(0, 'lib')
from poloniex import poloniex
from anx import ANX

Config = ConfigParser.ConfigParser()
Config.read("config/config.ini")

#poloniex data-----------------------------
try:
    polo = poloniex(Config.get('POLONIEX', 'key'),Config.get('POLONIEX', 'secret'))
    ticker = polo.returnTicker()
    #Save poloniex.json
    text_file = open("currencies/poloniex.json", "w")
    text_file.write(json.dumps(ticker))
    text_file.close()
except:
    pass
#------------------------------------------

#bitbay data-------------------------------
currencies = ["btcpln","ltcpln"]
for index in range(len(currencies)):
    try:
        response = urllib2.urlopen('https://bitbay.net/API/Public/'+currencies[index]+'/ticker.json')
        text_file = open("currencies/bitbay_"+currencies[index]+".json", "w")
        text_file.write(response.read())
        text_file.close()
    except:
        pass
#------------------------------------------

#anx data----------------------------------
currencies = ["BTCEUR","BTCUSD","BTCHKD","BTCCAD","BTCAUD","BTCSGD","BTCJPY","BTCGBP","BTCNZD","LTCBTC","DOGEBTC","STRBTC","XRPBTC"]
x = ANX(Config.get('ANX', 'key'),Config.get('ANX', 'secret'))

for index in range(len(currencies)):
    try:
        result = x.request('/'+currencies[index]+'/money/ticker')
        text_file = open("currencies/anx_"+currencies[index]+".json", "w")
        text_file.write(json.dumps(result))
        text_file.close()
        time.sleep( 5 )
    except: 
        pass
#------------------------------------------

#bitcurex data-----------------------------
currencies = ["pln","eur","usd"]
for index in range(len(currencies)):
    try:
        response = urllib2.urlopen('https://bitcurex.com/api/'+currencies[index]+'/ticker.json')
        text_file = open("currencies/bitcurex_"+currencies[index]+".json", "w")
        text_file.write(response.read())
        text_file.close()
    except:
        pass
#------------------------------------------

#bitfinex----------------------------------
currencies = ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc"]
for index in range(len(currencies)):
    try:
        response = urllib2.urlopen('https://api.bitfinex.com/v1/pubticker/'+currencies[index])
        text_file = open("currencies/bitfinex_"+currencies[index]+".json", "w")
        text_file.write(response.read())
        text_file.close()
    except:
        pass
#------------------------------------------

#bitmarket---------------------------------
currencies = ["BTCPLN","LTCPLN"]
for index in range(len(currencies)):
    try:
        response = urllib2.urlopen('https://www.bitmarket.pl/json/'+currencies[index]+'/ticker.json')
        text_file = open("currencies/bitmarket_"+currencies[index]+".json", "w")
        text_file.write(response.read())
        text_file.close()
    except:
        pass
#------------------------------------------

#bitstamp----------------------------------
try:
    response = urllib2.urlopen('https://www.bitstamp.net/api/ticker/')
    text_file = open("currencies/bitstamp_BTCUSD.json", "w")
    text_file.write(response.read())
    text_file.close()
except:
    pass
#------------------------------------------

#bittrex-----------------------------------
try:
    response = urllib2.urlopen('https://bittrex.com/api/v1.1/public/getmarketsummaries')
    currencies = json.loads((response.read()))
    for index in range(len(currencies['result'])):
        try:
            response = urllib2.urlopen("https://bittrex.com/api/v1.1/public/getticker?market="+currencies['result'][index]['MarketName'])
            text_file = open("currencies/bittrex_"+currencies['result'][index]['MarketName']+".json", "w")
            text_file.write(response.read())
            text_file.close()
        except:
            pass
except:
    pass
#------------------------------------------