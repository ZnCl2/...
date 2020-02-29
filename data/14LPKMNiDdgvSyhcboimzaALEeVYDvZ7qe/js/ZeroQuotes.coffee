class MySite extends ZeroFrame
    init: ->
        @log "inited!"
        @my_quote_votes = {}
        @sort_order = "date_added"
        @sort_order_user = "date_added"
        @show_votes = false
        $("#shutter").hide()
        ibody = document.getElementById("input-body")
        bodycount = document.getElementById("bodycount")
        ibody.addEventListener "input", ->
            bodycount.innerHTML = "#{this.value.length} / 250"

        $("#quotes-list").append(@orderByHtml())

        $("body").on "keydown", (e) ->
            if e.which is 27
                @sort_order_user = "date_added"
                @show_votes = false
                height = $(".user-box-outer").height()
                $(".user-box-outer").animate
                    top: -(height)
                    bottom: height
                , 250, ->
                    $(".user-box-outer").remove()
                    $("#shutter").fadeOut()
            return true

        $(document).on "click", "#shutter", =>
            @sort_order_user = "date_added"
            @show_votes = false
            height = $(".user-box-outer").height()
            $(".user-box-outer").animate
                top: -(height)
                bottom: height
            , 250, ->
                $(".user-box-outer").remove()
                $("#shutter").fadeOut()

        $(document).on "click", ".author", (e) =>
            if $(".user-box").length > 0
                return
            user = $(e.target).text()
            $("#shutter").fadeIn()
            @showUser(user)

        $(document).on "click", ".order-button, .tab", (e) =>
            element = $(e.target)
            if element.hasClass("active")
                return false

            element.parent().find(".active").first().removeClass("active")
            element.addClass("active")

            sort_order = false

            switch element.text()
                when "date" then sort_order = "date_added"
                when "votes" then sort_order = "votes"
                when "created" then @show_votes = false
                when "voted for" then @show_votes = true
                else
                    @log "Something is very wrong here..."

            if element.parent().parent().attr("id") is "quotes-list"
                # orderby on main page
                @sort_order = sort_order

                @updateMyVotes =>
                    @loadQuotes()
            else
                #orderby on user page
                if sort_order
                    @sort_order_user = sort_order
                user = $(".user-box-outer").data("user")
                @showUser(user, true)

        $(document).on "click", ".votes", (e) =>
            element = $(e.target)
            # not needed since pointer events disabled but just to be safe...
            if element.hasClass("loading") or element.hasClass("disabled")
                return false

            if not Page.site_info.cert_user_id  # No account selected, display error
                Page.cmd "wrapperNotification", ["info", "Please, select your account."]
                return false

            inner_path = "data/users/#{@site_info.auth_address}/data.json"  # This is our data file

            element.toggleClass("active").addClass("loading")

            # Load our current messages
            @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
                if data  # Parse if already exits
                    data = JSON.parse(data)
                    if not data.next_quote_id?
                        data.next_quote_id = 100
                else  # Not exits yet, use default data
                    data = { "next_quote_id": 1, "quote": [] }

                data.quote_vote ?= {}
                quote_uri = element.parent().attr("id").match("-([0-9]+-[A-Za-z0-9]+)$")[1]
                num_votes = element.parent().data("votes")
                if element.hasClass("active")
                    data.quote_vote[quote_uri] = 1
                    num_votes += 1
                    element.parent().data("votes", num_votes)
                    element.text("Votes: #{num_votes}")
                else
                    delete data.quote_vote[quote_uri]
                    num_votes -= 1
                    element.parent().data("votes", num_votes)
                    element.text("Votes: #{num_votes}")
                # Encode data array to utf8 json text
                json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                # Write file to disk
                @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
                    if res == "ok"
                        @updateMyVotes()
                        # Publish the file to other users
                        @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                            element.removeClass("loading")
                    else
                        @cmd "wrapperNotification", ["error", "File write error: #{res}"]

    showUser: (user, update=false) ->
        cb = (quotes) =>
            if update
                userbox = $(".user-box")
                userbox.empty()
            else
                userbox_outer = $('<div class="user-box-outer"></div>')
                title = $("<h2 class='user-box-h2'>Quotes by #{user}</h2>")
                title.append(@tabsHtml())
                title.append(@orderByHtml())
                userbox_outer.append title
                userbox = $('<div class="user-box"></div>')
                userbox_outer.data "user", user
                userbox_outer.append userbox
            for quote in quotes
                if quote.body != ""
                    qbody = quote.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    qby = quote.by.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    qwork = quote.work.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    if quote.quote_id?
                        quote_id = quote.quote_id
                    else
                        quote_id = 999
                    quote_el = @quoteHtml qbody, qby, qwork, quote.cert_user_id, quote_id, quote.user_address, quote.votes
                    userbox.append(quote_el)

            if not update
                $("body").append(userbox_outer)
                height = userbox_outer.height()
                userbox_outer.css
                    top: -(height)
                    bottom: height
                userbox_outer.animate
                    top: 40
                    bottom: 40
                , 250

        if @show_votes
            @votesBy user, cb
        else
            @quotesBy user, cb

    orderByHtml: ->
        $('<span class="orderby">Order by <span class="order-button active">date</span> or <span class="order-button">votes</span></span>')

    tabsHtml: ->
        $('<span class="tabs">Show <span class="tab active">created</span> or <span class="tab">voted for</span></span>')

    quoteHtml: (body, byline, work, author, quote_id, user_address, votes) ->
        if work != ""
            line = $("<li id=\"quote-#{quote_id}-#{user_address}\"><span class=\"byline\">#{byline}</span><span class=\"quote\">#{body}</span><span class=\"link\"><a href=\"#{work}\">#{work}</a></span><span class=\"author\">#{author}</span><span class=\"votes\">Votes: #{votes}</span></li>")
        else
            line = $("<li id=\"quote-#{quote_id}-#{user_address}\"><span class=\"byline\">#{byline}</span><span class=\"quote\">#{body}</span><span class=\"author\">#{author}</span><span class=\"votes\">Votes: #{votes}</span></li>")

        if author is @site_info.cert_user_id
            line.find(".votes").first().addClass("disabled")
        if @my_quote_votes["#{quote_id}-#{user_address}"]
            line.find(".votes").first().addClass("active")

        line.data "votes", votes

        return line

    addLine: (body, byline, work, author, quote_id, user_address, votes) ->
        quotes = $("#quotes")
        quotes.prepend(@quoteHtml(body, byline, work, author, quote_id, user_address, votes))

    updateMyVotes: (cb = null) ->
        query = """
            SELECT 'quote_vote' AS type, quote_uri AS uri FROM json LEFT JOIN quote_vote USING (json_id) WHERE directory = "#{Page.site_info.auth_address}" AND file_name = 'data.json'
            """
        Page.cmd "dbQuery", [query], (votes) =>
            @my_quote_votes = {}
            for vote in votes
                @my_quote_votes[vote.uri] = true
            if cb then cb()

    votesBy: (user, cb) ->
        user_query = """
            SELECT
                keyvalue.value AS name,
                content_json.directory AS address,
                data_json.json_id AS cid
            FROM keyvalue
            LEFT JOIN json AS content_json USING (json_id)
            LEFT JOIN json AS data_json ON (
                data_json.directory = content_json.directory AND data_json.file_name = 'data.json'
            )
            WHERE name = '#{user}'
        """

        @cmd "dbQuery", [user_query], (result) =>
            if result.length is 1
                user_address = result[0].address
                user_id = result[0].cid
                query = """
                    SELECT
                        quote.*,
                        keyvalue.value AS cert_user_id,
                        content_json.directory AS user_address,
                        (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes
                    FROM quote
                    LEFT JOIN json AS data_json USING (json_id)
                    LEFT JOIN json AS content_json ON (
                        data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
                    )
                    LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
                    JOIN quote_vote ON (quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory AND quote_vote.json_id = #{user_id})
                    ORDER BY #{@sort_order_user} DESC
                """

                @cmd "dbQuery", [query], cb

    quotesBy: (user, cb) ->
        query = """
            SELECT
                quote.*,
                keyvalue.value AS cert_user_id,
                content_json.directory AS user_address,
                (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes
            FROM quote
            LEFT JOIN json AS data_json USING (json_id)
            LEFT JOIN json AS content_json ON (
                data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
            )
            LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
            WHERE cert_user_id = '#{user}'
            ORDER BY #{@sort_order_user} DESC
        """
        @cmd "dbQuery", [query], cb

    loadQuotes: ->
        query = """
            SELECT
                quote.*,
                keyvalue.value AS cert_user_id,
                content_json.directory AS user_address,
                (SELECT COUNT(*) FROM quote_vote WHERE quote_vote.quote_uri = quote.quote_id || '-' || content_json.directory)+1 AS votes
            FROM quote
            LEFT JOIN json AS data_json USING (json_id)
            LEFT JOIN json AS content_json ON (
                data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
            )
            LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
            ORDER BY #{@sort_order}
        """
        @cmd "dbQuery", [query], (quotes) =>
            document.getElementById("quotes").innerHTML = ""  # Always start with empty messages
            for quote in quotes
                #quote.user_address = quote.user_address.replace("users/", "")
                if quote.body != ""
                  qbody = quote.body.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                  qby = quote.by.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                  qwork = quote.work.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                  if quote.quote_id?
                    quote_id = quote.quote_id
                  else
                    quote_id = 999
                  @addLine qbody, qby, qwork, quote.cert_user_id, quote_id, quote.user_address, quote.votes

    sendQuote: =>
        if not Page.site_info.cert_user_id  # No account selected, display error
            Page.cmd "wrapperNotification", ["info", "Please, select your account."]
            return false

        if document.getElementById("input-body").value == ""
          Page.cmd "wrapperNotification", ["info", "You need to enter a Quote before submitting"]
          return false
        if document.getElementById("input-by").value == ""
          Page.cmd "wrapperNotification", ["info", "You need to specify who the quote is from before submitting"]
          return false

        inner_path = "data/users/#{@site_info.auth_address}/data.json"  # This is our data file

        # Load our current messages
        @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
            if data  # Parse if already exits
                data = JSON.parse(data)
                if not data.next_quote_id?
                  data.next_quote_id = 100
            else  # Not exits yet, use default data
                data = { "next_quote_id": 1, "quote": [] }

            # Add the message to data
            data.quote.push({
                "quote_id": data.next_quote_id,
                "body": document.getElementById("input-body").value,
                "by": document.getElementById("input-by").value,
                "work": document.getElementById("input-work").value,
                "date_added": (+new Date)
            })

            data.next_quote_id += 1

            # Encode data array to utf8 json text
            json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

            # Write file to disk
            @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
                if res == "ok"
                    @updateMyVotes =>
                        @loadQuotes()

                    # Publish the file to other users
                    @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                        document.getElementById("input-body").value = ""
                        document.getElementById("input-by").value = ""
                        document.getElementById("input-work").value = ""
                        document.getElementById("bodycount").innerHTML = "0 / 250"
                else
                    @cmd "wrapperNotification", ["error", "File write error: #{res}"]

        return false

    selectUser: =>
        Page.cmd "certSelect", [["zeroid.bit"]]
        return false

    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                document.getElementById("select_user").innerHTML = message.params.cert_user_id
            else
                document.getElementById("select_user").innerHTML = "Select user"
            @site_info = message.params  # Save site info data to allow access it later

            # Reload messages if new file arrives
            if message.params.event[0] == "file_done"
                @updateMyVotes =>
                    @loadQuotes()

    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "siteInfo", {}, (siteInfo) =>
            if siteInfo.cert_user_id
                document.getElementById("select_user").innerHTML = siteInfo.cert_user_id
            @site_info = siteInfo  # Save site info data to allow access it later
            @updateMyVotes =>
                @loadQuotes()


window.Page = new MySite()
