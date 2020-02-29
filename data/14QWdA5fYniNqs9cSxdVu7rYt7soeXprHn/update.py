#!/usr/bin/env python
# This script updates the price.json file.

import sys
import time
import json
import urllib2

from decimal import Decimal

JSONEncoder_olddefault = json.JSONEncoder.default
def JSONEncoder_newdefault(self, o):
    if isinstance(o, Decimal): return str(o)
    return JSONEncoder_olddefault(self, o)
json.JSONEncoder.default = JSONEncoder_newdefault

def Get(url):
    try:
        result = urllib2.urlopen(url).read()
        return json.loads(result)
    except:
        print 'ERROR:', sys.exc_info()[0]
    return None

def HasKey(arr, key):
    if (type(arr) is dict and key in arr) or (type(arr) is list and len(arr) > key and key >= 0):
        return True
    
    return False

def ResolveValue(arr, keys):
    types = []
    
    result = arr
    types.append(type(result).__name__)
    
    for key in keys:
        if HasKey(result, key):
            result = result[key]
            types.append(type(result).__name__)
        else:
            print 'ERROR: resulting object does not have keys', json.dumps(keys), 'with for types', json.dumps(types)
            return None
    return result

def GetLatestBtcPrice(name, url, keys):
    print 'INFO: Fetching price from', name, 'exchange'
    obj = Get(url)
    if obj != None:
        result = ResolveValue(obj, keys)
        if result is not None:
            print name, ' price:', result
            return Decimal(result)
    else:
        print 'ERROR: Failed to fetch price from', url
    
    return None

def main():
    # fetch latest prices
    bitstamp = GetLatestBtcPrice('Bitstamp', 'https://www.bitstamp.net/api/ticker/', ['last'])
    bitfinex = GetLatestBtcPrice('Bitfinex', 'https://api.bitfinex.com/v2/ticker/tBTCUSD', [6])
    bittrex = GetLatestBtcPrice('Bittrex', 'https://poloniex.com/public?command=returnTicker', ['USDT_BTC', 'last'])
    hitbtc = GetLatestBtcPrice('HitBTC', 'http://api.hitbtc.com/api/1/public/BTCUSD/ticker', ['last'])
    binance = GetLatestBtcPrice('GDAX', 'https://api.gdax.com/products/BTC-USD/ticker', ['price'])
    kraken = GetLatestBtcPrice('Kraken', 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD', ['result', 'XXBTZUSD', 'c', 0])
    
    # create price list
    prices = [bitstamp, bitfinex, bittrex, hitbtc, binance, kraken]
    
    # filter out any None values
    prices = filter((lambda x: x is not None), prices)
    
    # determine average BTC/USD price
    total = sum(prices)
    average = total / len(prices)
    
    print
    
    print '----- Resulting Price -----'
    print 'Average BTC/USD price:', average
    
    # create json object
    obj = {}
    obj['updated'] = int(time.time()) # truncated UNIX timestamp from the last update
    obj['USD-BTC'] = {}                    # object for holding all USD per Bitcoin prices
    obj['USD-BTC']['last_price'] = average # USD per Bitcoin (average) 
    
    # write json object to file
    try:
        file = open('price.json', 'w')
        file.write(json.dumps(obj, indent = 4))
        file.close()
    except:
        print 'ERROR: Failed to write file!', sys.exc_info()[0]
    
    return

main()
