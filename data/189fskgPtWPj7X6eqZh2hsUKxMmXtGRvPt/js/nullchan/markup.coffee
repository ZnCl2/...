URLregexp = /[-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=]{2,256}\.?[a-z]{2,4}\b([\/:][-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=!]*){1,}/mg

class Markup
  constructor: () ->
    @entityMap =
      "&": "&amp;"
      "<": "&lt;"
      ">": "&gt;"
      '"': '&quot;'
      "'": '&#39;'
      # "/": '&#x2F;'

    @expressions = [
      # reflinks
      [/&gt;&gt;(\w{10})/mg, (match, toShort, from) => 
        if (to = Nullchan.view.shortMap[toShort])
          Nullchan.view.posts[to].addMention(from)
          @renderMention(from, to)
        else
          "<a class='mention broken'>&gt;&gt;#{@escape(toShort)} (post not found)</a>"
      ]

      # quote
      [/^\s*&gt;\s{0,1}(.+?)$/mg, (match, content) =>
        br = ""
        br = "<hr/>" if (match[0] == "\n")
        br + "<em class='quote'>&gt; #{content}</em>"
      ]

      # bold
      [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>']

      # italic
      [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>']

      # underline
      [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3']

      # strike
      [/\^([\s\S]+?)\^/mg, (match, text) =>
        return match if (text.match(/^_+$/))
        return "<em class='strike'>#{text}</em>"
      ]

      # spoiler
      [/%%([\s\S]+?)%%/mg, '<em class="spoiler">$1</em>']

      # line breaks
      [/\r?\n/mg,  "\n"]
      [/\n/mg,     "<hr/>"]
      [/(<hr\/>){2,}/mg, "<hr/><hr/>"]
    ]

  renderLink: (href, opts, children) =>
    if !!opts and typeof(opts) != "object"
      children = opts
      opts     = {}

    our = false
    if href == "root" or href == "?"
      href = "/" + Nullchan.settings.siteAddress
      our  = true
    our = true if href[0] == "?"

    opts.href       = href
    opts.target   ||= "_parent"
    opts.onclick  ||= Nullchan.onLinkClick

    return h('a', opts, children)

  renderMention: (from, to) =>
    host   = Nullchan.view.posts[from]
    target = Nullchan.view.posts[to]

    return "<a
      class='mention' 
      data-from='#{@escape(host.hashsum)}'
      data-to='#{@escape(target.hashsum)}'
      href='#{target.urlTo()}'>&gt;&gt;#{target.num}</a>"

  render: (content, postHash) =>
    return "" unless content

    content = @escape(content).trim()
    content = content.replace URLregexp, (match, text) => 
      if !!match.match('@') || !(match.startsWith("http") || match.startsWith("magnet"))
        return match
      link  = match
      link  = link.substring(0, 100) + "..." if (link.length > 100)
      link  = link.replace("&amp;", "&")
      match = match.replace("&amp;", "&")
      return  "<a href='#{match}' target='_parent' data-no-push='true'>#{link}</a>"

    for exp in @expressions
      if typeof exp[1] == "function"
        content = content.replace exp[0], (match, groups) =>
          exp[1](match, groups, postHash)
      else
        content = content.replace(exp[0], exp[1])
    return content

  escape: (raw) =>
    return String(raw.trim()).replace(/[&<>"']/g, (s) => @entityMap[s])

window.Markup = new Markup()
