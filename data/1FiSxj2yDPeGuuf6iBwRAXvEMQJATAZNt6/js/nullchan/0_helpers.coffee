window.repoLink = "https://github.com/nullchan/nullchan"
window.NullchanVersion = "0.6.8"

class Helpers 
  paginate: (array, options) ->
    page       = options.page - 1 || 0
    perPage    = options.perPage
    pagesTotal = Math.ceil(array.length / perPage)
    startPage  = if page < pagesTotal then page else 0
    endPage    = startPage

    return {
      currentPage: (startPage + 1)
      totalPages:  pagesTotal
      array:       array.slice(startPage * perPage, startPage * perPage + perPage)
    }

  formatSize: (bytes) ->
    return switch
      when bytes >= 1000000000 then (bytes/1000000000).toFixed(2)+' GB'
      when bytes >= 1000000    then (bytes/1000000).toFixed(2)+' MB'
      when bytes >= 1000       then (bytes/1000).toFixed(2)+' KB'
      when bytes  > 1          then bytes+' bytes'
      when bytes == 1          then bytes+' byte'
      else                          '0 byte'

  timeSince: (time) =>
    now  = +(new Date) / 1000   
    secs = now - time
    
    if (secs < 60)
      back = "just now"   
    else if (secs < 60 * 60)
      back = (Math.round(secs / 60)) + " minutes ago"
    else if (secs < 60 * 60 * 24)
      back = (Math.round(secs / 60 / 60)) + " hours ago"
    else if (secs < 60 * 60 * 24 * 3)
      back = (Math.round(secs / 60 / 60 / 24)) + " days ago"
    else
      back = @formatDate(new Date(time * 1000))
    back = back.replace(/^1 ([a-z]+)s/, "1 $1")   
    return back 

  formatDate: (time, format = "short") ->
    parts   = time.toString().split(" ")
    display = if format == "short" then parts.slice(1, 4) else parts.slice(1, 5)
    return display.join(" ").replace(/( [0-9]{4})/, ",$1")

  unixTimestamp: (date) ->
    return parseInt(Date.parse(date) / 1000) if date
    return parseInt(+(new Date) / 1000)

  Base64toUTF: (s) =>
    return @decodeUTF(window.atob(s))

  UTFtoBase64: (s) =>
    return window.btoa(@encodeUTF(s))

  encodeUTF: (s) ->
    return unescape(encodeURIComponent(s))

  decodeUTF: (s) ->
    return decodeURIComponent(escape(s))

  encodeObject: (o) ->
    return @UTFtoBase64(JSON.stringify(o, null, 2))

  isEmptyString: (s) =>
    /^\s*$/.test(s)

  parseQuery: (query) =>
    params = {}
    parts = query.split('&')
    for part in parts
      [key, val] = part.split("=")
      if val
        params[decodeURIComponent(key)] = decodeURIComponent(val)
      else
        params["url"] = decodeURIComponent(key)
    return params


window.Helpers = new Helpers()

