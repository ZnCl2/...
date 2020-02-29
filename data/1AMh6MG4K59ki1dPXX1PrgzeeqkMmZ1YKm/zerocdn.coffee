request = require 'visionmedia/superagent'

meta = document.createElement 'meta'
meta.name = 'referrer'
meta.content = 'no-referrer'
(document.getElementsByTagName 'head')[0].appendChild meta

window.ZeroCDN =
  js: (name, version, callback) ->
    window["/1AMh6MG4K59ki1dPXX1PrgzeeqkMmZ1YKm/files/js/#{name}-#{version}.js"] = ->
      delete window["/1AMh6MG4K59ki1dPXX1PrgzeeqkMmZ1YKm/files/js/#{name}-#{version}.js"]
      do callback
    ((request.get "/1AMh6MG4K59ki1dPXX1PrgzeeqkMmZ1YKm/files/js/#{name}-#{version}.js?wrapper=False").set 'Referer', null).end (err, res) ->
      callback err if err?
      el = document.createElement 'script'
      el.innerHTML = res.text
      document.body.appendChild el
  css: (name, version, callback) ->
    ((request.get "/1AMh6MG4K59ki1dPXX1PrgzeeqkMmZ1YKm/files/css/#{name}-#{version}.css?wrapper=False").set 'Referer', null).end (err, res) ->
      callback err if err?
      el = document.createElement 'style'
      el.innerHTML = res.text
      document.body.appendChild el
      do callback
