class LinkHelper

  #
  # LinkHelper constructor initializes the links array.
  #

  constructor: ->
    @uniqueLinks = []

  #
  # Return all internal link tags found in content.
  #

  extractLinks: (content) ->
    links  = []
    if match = content.match /(\[\[(.+?)\]\])/g
      unique = []
      for m in match
        text = m.match /\[\[(.*?)\]\]/
        slug = slugger(text[1])
        if slug not in unique
          links.push({tag: m, slug: slug, text: text[1]})
          unique.push(slug)

    return links

  #
  # Return an array of unique links from an array of links.
  #

  getUniqueLinks: (links) ->
    unique = []
    uniqueLinks = []
    for link in links
      if link.slug not in unique
        unique.push(link.slug)
        uniqueLinks.push(link)

    return uniqueLinks

  #
  # Extract all links from content and store them in
  # the links property for later use.
  #

  parseContent: (content) ->
    links = @extractLinks(content)
    links = links.concat(@uniqueLinks)
    @uniqueLinks = @getUniqueLinks(links)

    return true

  #
  # Return all links stored in the links property.
  #

  getLinks: ->
    return @uniqueLinks.sort (a,b) ->
      if a.slug > b.slog
        1
      else if a.slug < b.slug
        -1
      else
         0

  #
  # Get all slugs from the parsed links. If quote is true add quotes
  # to the slugs so the result can be used in an SQL query.
  #

  getSlugs: (quote=false, links=null) ->
    links = @uniqueLinks if links is null
    slugs = []
    for link in links
      slug = link.slug
      slug = "'#{slug}'" if quote
      slugs.push(slug)

    return slugs

  #
  # Empty the links property.
  #

  reset: ->
    @uniqueLinks = []
    return true

window.LinkHelper = new LinkHelper