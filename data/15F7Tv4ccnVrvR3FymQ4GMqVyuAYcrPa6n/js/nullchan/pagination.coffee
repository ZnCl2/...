class Pagination
  constructor: (@current, @total, @boardKey, @view) ->

  pageLink: (num) =>
    num   = 1 if num < 1
    link  = "?/#{@boardKey}/"
    link += "page/#{num}" if num > 1
    opts  = { classes: { current: (num is @current) } }

    return h("li", { key: num }, Markup.renderLink(link, opts, num))

  render: (cls) =>
    if @view == "thread"
      opts =
        href:     "?/#{@boardKey}/"
        target:   "_parent"
        onclick:  Nullchan.onLinkClick

      return h "div.pagination.#{cls}", 
        h "div.back-link",
          h "a", opts, "← back to to /#{@boardKey}/"

    children = [h("li.disc", "Pages:")]
    if @current > 1
      iterator  = 1
      page      = 1
      dots      = no
      for pg in [1..(@current - 1)]
        continue if pg isnt page
        children.push(@pageLink(page))
        page++
        iterator++
        if (iterator > 1) and ((@current - 3) > 1) and (dots is no)
          children.push(h("li.gap", {key: "gap-1"}, "..."))
          dots = yes
          page = @current - 2

    children.push(@pageLink(@current))

    if @current < @total
      iterator  = 1
      page      = (@current + 1)
      dots      = no

      for pg in [(@current + 1)..@total]
        continue if pg isnt page
        if (iterator > 2)
          if (dots is no)
            if (@total - (@current + 2) > 1)
              children.push(h("li.gap", {key: "gap-2"}, "..."))
            children.push(@pageLink(@total))
            dots = yes
        else
          children.push(@pageLink(page))
        page++
        iterator++

    return h "div.pagination.#{cls}", 
      h "ul", children

window.Pagination = Pagination
