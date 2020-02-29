class AnonymityDisclaimer extends Modal
  buttonClick: =>
    key = "anon-disclaimer-shown"
    if Nullchan.storage.get(key) != true
      Nullchan.storage.set(key, true)
    @hide()

  render: =>
    h "div#anon-disclaimer", 
      h 'h3', "You are not completely anonymous!"
      h 'p', 
        h 'span', "This is how ZeroNet works. Keep in mind:"
        h "ul",
          h "li",
            "Any person with some basic tech skills is able to open this site's data files "
            "and see who submitted which message."
          h "li",
            "If you use ZeroID certificate, all your messages are linked to "
            "your ZeroID address."
          h "li",
            "If you use our \"Anonymous\" certificate, you have no \"name\", "
            "but your messages are still transparent "
            "and everyone can see that they're all written by the same author (without name)."
          h "li",
            "Your IP address is never directly linked to your user identity (certificate) "
            "and the messages you submit. However, if you don't use TOR it's still possible "
            "to track your IP with some effort. If you have something to hide "
            "or someone to hide from, use TOR and change your certificate often."
      h 'div.button-outer',
        h "button", { onclick: @buttonClick },
          "I understand"


window.AnonymityDisclaimer = AnonymityDisclaimer
