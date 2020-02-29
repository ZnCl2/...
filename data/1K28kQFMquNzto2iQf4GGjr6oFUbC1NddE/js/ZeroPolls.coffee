`/*
ZeroPolls by ekaterina@zeroid.bit
*/`

defaultAnswer = ->
    data =
        answer: ""

percentage = (part, whole) ->
    part/whole*100

# Largest Remainder Method for percentages http://stackoverflow.com/a/13483710
lrmPercentages = (values) ->
    total = values.reduce (a, b) -> a + b
    rounded_values = []
    for val in values
        rounded_values.push Math.floor(percentage(val, total))
    remainder = 100 - rounded_values.reduce (a, b) -> a + b
    values_map = rounded_values.map (val, i) -> {index: i, value: val, remainder: percentage(values[i], total) - val}

    # sort by highest remainder value
    values_map.sort (a, b) -> b.remainder - a.remainder

    # distribute remainder onto values
    index = 0
    for i in [0...remainder]
        values_map[index].value += 1
        index += 1
        if index > values_map.length - 1
            index = 0

    # sort by original order
    values_map.sort (a, b) -> a.index - b.index

    # remove object index
    values_map.map (val) -> val.value

class MySite extends ZeroFrame
    init: ->
        @vm = prepareSite()
        @vm.selectUserCallback = @selectUser
        @vm.loadFileCallback = @loadFile
        @vm.writeFileCallback = @writeFile
        @vm.messageCallback = @displayMessage
        @vm.loadPollsCallback = @loadPolls
        @vm.followCallback = @follow

    routeUrl: (url) ->
        # http://127.0.0.1:43110/ZeroPolls.bit/?Poll:15-1Mk5sVKeCrwMc3wSD11jM7DZTiqF5D9BaD
        @log "Routing url:", url
        if match = url.match /Poll:([0-9]+-[^#&]*)/
            @log "Matched Poll:", match[1]
            @vm.showPoll = match[1]
            @loadPoll()
        else
            @vm.showPoll = null
            @loadPolls()

    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                @vm.cert_user_id = message.params.cert_user_id
            else
                @vm.cert_user_id = null
            @site_info = message.params  # Save site info data to allow access it later

            if @site_info.auth_address
                @vm.user_address = @site_info.auth_address

            @log "Routed", cmd, message

            if message.params? and message.params.event? and message.params.event.length > 0
                switch message.params.event[0]
                    when "cert_changed"
                        if @vm.cert_user_id
                            @loadMyVotes =>
                                if @vm.showPoll
                                    @loadPoll()
                                else
                                    @loadPolls()
                                @updateDataSize()
                    when "file_done"
                        path_tokens = message.params.event[1].split("/")
                        last_path = path_tokens[path_tokens.length-1]
                        if last_path is "data.json"
                            if @vm.cert_user_id
                                @loadMyVotes =>
                                    if @vm.showPoll
                                        @loadPoll()
                                    else
                                        @loadPolls()
                                    @updateDataSize()
                            else
                                if @vm.showPoll
                                    @loadPoll()
                                else
                                    @loadPolls()
                                @updateDataSize()
                    else
                        @log "Unhandled event", message.params.event[0]

    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "siteInfo", {}, (siteInfo) =>
            skipLoading = false
            if siteInfo.cert_user_id
                if @vm.cert_user_id is siteInfo.cert_user_id
                    skipLoading = true
                @vm.cert_user_id = siteInfo.cert_user_id
            @site_info = siteInfo  # Save site info data to allow access it later

            if siteInfo.auth_address
                @vm.user_address = siteInfo.auth_address

            @log "Web Socket Opened", @vm.cert_user_id, siteInfo.cert_user_id

            unless skipLoading
                @loadMyVotes =>
                    @routeUrl(window.location.search.substring(1))

            @updateDataSize()
            @listFollows()

    updateDataSize: ->
        if @site_info.cert_user_id
            @cmd "fileRules", "data/users/#{@site_info.auth_address}/content.json", (rules) =>
                @log "Updating dataUsage"
                if rules.current_size?
                    @vm.dataSize = rules.current_size
                if rules.max_size?
                    @vm.dataSizeMax = rules.max_size

    selectUser: =>
        Page.cmd "certSelect", [["zeroid.bit"]]
        return false

    displayMessage: (msgtype, text)=>
        @cmd "wrapperNotification", [msgtype, text]

    loadFile: (cb) =>
        inner_path = "data/users/#{@site_info.auth_address}/data.json"
        @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
            if data  # Parse if already exits
                cb(JSON.parse(data))
            else
                cb(null)

    writeFile: (data, cb=false) =>
        inner_path = "data/users/#{@site_info.auth_address}/data.json"
        json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
        @cmd "fileWrite", [inner_path, btoa(json_raw)], (res) =>
            if res == "ok"
                @log "File saved"

                # Publish the file to other users
                @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                    @log "Saved user data.json published"
                    @loadMyVotes =>
                        if @vm.showPoll
                            @loadPoll()
                        else
                            @loadPolls()
                        @updateDataSize()
                    if cb
                        cb(true)

            else
                @cmd "wrapperNotification", ["error", "File write error: #{res}"]
                if cb
                    cb(false)

    loadMyVotes: (cb) ->
        @loadFile (data) =>
            if (data)
                vote_data = {}

                for key, val of data.poll_vote
                    vote_data[key] = 1

                @vm.my_votes = vote_data
            cb()

    loadVotes: (poll_uri, cb) ->
        ###
        query = """
            SELECT
                poll_vote.*,
                keyvalue.value AS cert_user_id,
                content_json.directory AS user_address
            FROM poll_vote
            LEFT JOIN json AS data_json USING (json_id)
            LEFT JOIN json AS content_json ON (
                data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
            )
            LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
            WHERE poll_vote.poll_uri = '#{poll_uri}'
        """
        ###
        query = """
            SELECT
                poll_uri,
                vote
            FROM poll_vote
        """
        @cmd "dbQuery", [query], (votes) =>
            cb(votes)

    loadUsersStat: =>
        query = """
        SELECT
            COUNT(*) AS count
        FROM keyvalue
        WHERE keyvalue.key = 'cert_user_id'
        """

        @cmd "dbQuery", [query], (data) =>
            if data and data.length > 0
                @vm.statsUsers = data[0].count

    loadUsers: =>
        query = """
        SELECT
            value
        FROM keyvalue
        WHERE keyvalue.key = 'cert_user_id'
        """

        @cmd "dbQuery", [query], (users) =>
            console.log users.length
            console.log users

    loadStats: =>
        query = """
        SELECT
            votes,
            (SELECT COUNT(*) FROM comment where comment.poll_uri = poll.poll_id || '-' || content_json.directory) AS comment_count
        FROM poll
        LEFT JOIN json AS data_json USING (json_id)
        LEFT JOIN json AS content_json ON (
            data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
        )
        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
        LEFT JOIN
            (SELECT
              polljoin.poll_uri,
              polljoin.*,
              (SELECT COUNT(*) FROM poll_vote where poll_vote.poll_uri = polljoin.poll_uri) AS votes
            FROM (
              SELECT
                poll_uri
              FROM
                poll_vote
              GROUP BY poll_uri, vote
            ) AS polljoin
            GROUP BY polljoin.poll_uri) AS countselect
        ON (countselect.poll_uri = poll.poll_id || '-' || content_json.directory)
        """

        @cmd "dbQuery", [query], (polls) =>
            @vm.statsPolls = polls.length
            @vm.statsVotes = polls.reduce (a, b) ->
                a + b.votes
            , 0
            @vm.statsComments = polls.reduce (a, b) ->
                a + b.comment_count
            , 0

    follow: =>
        username = @site_info.cert_user_id.replace /@.*/, ""
        polls_query = "
            SELECT
                poll_id || '-' || json_content.directory AS event_uri,
                'post' AS type,
                date_added / 1000 AS date_added,
                question AS title,
                '' AS body,
                '?Poll:' || poll_id || '-' || json_content.directory AS url
            FROM poll
            LEFT JOIN json USING (json_id)
            LEFT JOIN json AS json_content ON (json_content.directory = json.directory AND json_content.file_name='content.json')
            LEFT JOIN keyvalue ON (keyvalue.json_id = json_content.json_id AND key = 'cert_user_id')
            WHERE poll.hidden != 1
        "

        mentions_query = "
            SELECT
                'mention' AS type,
                comment.date_added / 1000 AS date_added,
                poll.question AS title,
                commenter_user.value || ': ' || comment.body AS body,
                poll_creator_json.directory AS poll_creator_address,
                poll.poll_id || '-' || poll_creator_json.directory AS row_poll_uri,
                '?Poll:' || poll.poll_id || '-' || poll_creator_json.directory AS url
            FROM poll
                LEFT JOIN json AS poll_creator_json ON (poll_creator_json.json_id = poll.json_id)
                LEFT JOIN comment ON (comment.poll_uri = row_poll_uri)
                LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id)
                LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = 'content.json')
                LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id')
            WHERE
                comment.body LIKE '%[#{username}%' OR comment.body LIKE '%@#{username}%'
        "

        comments_query = "
            SELECT
                'comment' AS type,
                comment.date_added / 1000 AS date_added,
                poll.question AS title,
                commenter_user.value || ': ' || comment.body AS body,
                poll_creator_json.directory AS poll_creator_address,
                poll.poll_id || '-' || poll_creator_json.directory AS row_poll_uri,
                '?Poll:' || poll.poll_id || '-' || poll_creator_json.directory AS url
            FROM poll
                LEFT JOIN json AS poll_creator_json ON (poll_creator_json.json_id = poll.json_id)
                LEFT JOIN comment ON (comment.poll_uri = row_poll_uri)
                LEFT JOIN json AS commenter_json ON (commenter_json.json_id = comment.json_id)
                LEFT JOIN json AS commenter_content ON (commenter_content.directory = commenter_json.directory AND commenter_content.file_name = 'content.json')
                LEFT JOIN keyvalue AS commenter_user ON (commenter_user.json_id = commenter_content.json_id AND commenter_user.key = 'cert_user_id')
            WHERE
                poll_creator_json.directory = '#{@vm.user_address}'
        "

        follows = {}
        if @vm.followsPolls
            follows["polls"] = [polls_query, params]
        if @vm.followsMentions
            follows["mentions"] = [mentions_query, params]
        if @vm.followsComments
            follows["comments"] = [comments_query, params]

        params = [""]
        @cmd 'feedFollow', [follows]

    listFollows: =>
        @cmd 'feedListFollow', [], (follows) =>
            if follows.polls?
                @vm.followsPolls = true
            else
                @vm.followsPolls = false
            if follows.mentions?
                @vm.followsMentions = true
            else
                @vm.followsMentions = false
            if follows.comments?
                @vm.followsComments = true
            else
                @vm.followsComments = false

    loadPoll: =>
        @loadStats()
        @loadUsersStat()
        query = """
        SELECT
            poll.*,
            answer_votes,
            votes,
            keyvalue.value AS cert_user_id,
            content_json.directory AS user_address,
            poll.poll_id || '-' || content_json.directory AS poll_uri,
            (SELECT COUNT(*) FROM comment where comment.poll_uri = poll.poll_id || '-' || content_json.directory) AS comment_count
        FROM poll
        LEFT JOIN json AS data_json USING (json_id)
        LEFT JOIN json AS content_json ON (
            data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
        )
        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
        LEFT JOIN
            (SELECT
              polljoin.poll_uri,
              polljoin.*,
              (SELECT COUNT(*) FROM poll_vote where poll_vote.poll_uri = polljoin.poll_uri) AS votes,
              group_concat(concat) AS answer_votes
            FROM (
              SELECT
                poll_uri,
                vote || '-' || COUNT(*) AS concat
              FROM
                poll_vote
              GROUP BY poll_uri, vote
            ) AS polljoin
            GROUP BY polljoin.poll_uri) AS countselect
        ON (countselect.poll_uri = poll.poll_id || '-' || content_json.directory)
        WHERE poll.poll_id || '-' || content_json.directory = '#{@vm.showPoll}'
        """

        @cmd "dbQuery", [query], (polls) =>
            for poll in polls
                poll.votes = 0 unless poll.votes
                poll.comments = []
                if @vm.my_votes[poll.poll_uri]
                    poll.voted = true
                else
                    poll.voted = false
                answer_votes = null
                if poll.answer_votes
                    answer_votes_tokens = poll.answer_votes.split(",")
                    answer_votes = {}
                    for token in answer_votes_tokens
                        [token_index, token_votes] = token.split("-")
                        answer_votes[token_index] = token_votes
                poll.answers = poll.answers.split("--|--").map (answer, index) ->
                    if poll.answer_votes
                        {answer: answer, votes: answer_votes[index] or 0}
                    else
                        {answer: answer, votes: 0}
                # add percentages
                answer_votes = poll.answers.map (val) -> parseInt val.votes
                answer_percentages = lrmPercentages answer_votes
                for percent,i in answer_percentages
                    poll.answers[i].percentage = percent

            if polls.length > 0
                @vm.poll = polls[0]
                @loadComments()

    loadPolls: (more=null) =>
        @loadStats()
        @loadUsersStat()
        query = """
        SELECT
            poll.*,
            answer_votes,
            votes,
            keyvalue.value AS cert_user_id,
            content_json.directory AS user_address,
            poll.poll_id || '-' || content_json.directory AS poll_uri,
            (SELECT COUNT(*) FROM comment where comment.poll_uri = poll.poll_id || '-' || content_json.directory) AS comment_count
        FROM poll
        LEFT JOIN json AS data_json USING (json_id)
        LEFT JOIN json AS content_json ON (
            data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
        )
        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
        LEFT JOIN
            (SELECT
              polljoin.poll_uri,
              polljoin.*,
              (SELECT COUNT(*) FROM poll_vote where poll_vote.poll_uri = polljoin.poll_uri) AS votes,
              group_concat(concat) AS answer_votes
            FROM (
              SELECT
                poll_uri,
                vote || '-' || COUNT(*) AS concat
              FROM
                poll_vote
              GROUP BY poll_uri, vote
            ) AS polljoin
            GROUP BY polljoin.poll_uri) AS countselect
        ON (countselect.poll_uri = poll.poll_id || '-' || content_json.directory)
        """

        switch @vm.poll_sort_order
            when "date_added"
                query += "\nORDER BY date_added DESC"
            when "votes"
                query += "\nORDER BY votes DESC, date_added DESC"
            when "comment_count"
                query += "\nORDER BY comment_count DESC, date_added DESC"

        if more
            query += "\nLIMIT #{@vm.polls.length}, 25"
        else
            query += "\nLIMIT #{@vm.loadLimit}"

        @cmd "dbQuery", [query], (polls) =>
            for poll in polls
                poll.votes = 0 unless poll.votes
                poll.comments = []
                if @vm.my_votes[poll.poll_uri]
                    poll.voted = true
                else
                    poll.voted = false
                answer_votes = null
                if poll.answer_votes
                    answer_votes_tokens = poll.answer_votes.split(",")
                    answer_votes = {}
                    for token in answer_votes_tokens
                        [token_index, token_votes] = token.split("-")
                        answer_votes[token_index] = token_votes
                poll.answers = poll.answers.split("--|--").map (answer, index) ->
                    if poll.answer_votes
                        {answer: answer, votes: answer_votes[index] or 0}
                    else
                        {answer: answer, votes: 0}
                # add percentages
                answer_votes = poll.answers.map (val) -> parseInt val.votes
                answer_percentages = lrmPercentages answer_votes
                for percent,i in answer_percentages
                    poll.answers[i].percentage = percent

            if more
                @vm.loadLimit += 25
                skiplist = {}
                for poll in @vm.polls
                    skiplist[poll.poll_uri] = true

                polls_to_add = []

                for poll in polls
                    unless skiplist[poll.poll_uri]
                        polls_to_add.push poll

                if polls_to_add.length is 0
                    @vm.loadedAllPolls = true
                else
                    @vm.polls = @vm.polls.concat polls_to_add

                @vm.loadingPolls = false
            else
                @vm.polls = polls

            if not @vm.loadedAllPolls and @vm.hideVoted
                unvoted_polls = []
                for poll in @vm.polls
                    unless poll.voted
                        unvoted_polls.push poll
                if unvoted_polls.length < 25
                    @vm.loadingPolls = true
                    @loadPolls(true)

    loadComments: ->
        unless @vm.poll
            return
        query = """
            SELECT
                comment.*,
                keyvalue.value AS cert_user_id,
                content_json.directory AS user_address,
                comment.comment_id || '-' || content_json.directory AS comment_uri
            FROM comment
            LEFT JOIN json AS data_json USING (json_id)
            LEFT JOIN json AS content_json ON (
                data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
            )
            LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
            WHERE comment.poll_uri = '#{@vm.poll.poll_uri}'
        """
        @cmd "dbQuery", [query], (comments) =>
            if @vm.poll
                @vm.pollComments = comments

prepareSite = ->
    vm = new Vue
        el: "#app"
        data:
            selectUserCallback: null
            loadFileCallback: null
            writeFileCallback: null
            loadPollsCallback: null
            messageCallback: null
            followCallback: null
            my_selection: {}
            dataSize: null
            dataSizeMax: null
            cert_user_id: null
            newQuestion: ""
            newAnswers: [defaultAnswer()]
            newHidden: false
            user_address: null
            creating: false
            voting: null
            poll_sort_order: "date_added"
            polls: []
            my_votes: {}
            showPoll: null
            poll: null
            hideVoted: false
            justvoted: {}
            newComment: ""
            commenting: false
            deleting: false
            deleteIndex: null
            pollComments: []
            loadingPolls: false
            loadedAllPolls: false
            loadLimit: 25
            statsPolls: 0
            statsComments: 0
            statsVotes: 0
            statsUsers: 0
            followsPolls: null
            followsMentions: null
            followsComments: null
        filters:
            markdown: (val) ->
                return unless val
                markdown.render(val)
        computed:
            total_votes: ->
                "#{this.statsVotes} votes, #{this.statsComments} comments, #{this.statsPolls} polls, #{this.statsUsers} users"
            dataUsage: ->
                if this.dataSize is null or this.dataSizeMax is null
                    return null

                return "#{(this.dataSize / 1024).toFixed(1)}kb / #{(this.dataSizeMax / 1024).toFixed(1)}kb"
        methods:
            replyTo: (comment, index) ->
                username = comment.cert_user_id.replace /@.*/, ""
                if this.newComment.length is 0 and index > 0
                    skipped = false
                    for line,i in comment.body.split("\n")
                        if i is 0
                            this.newComment += "> [@#{username}](#comment-#{comment.comment_uri}): "
                            if line.length > 0 and line[0] is ">"
                                skipped = true
                            else
                                this.newComment += "#{line}"
                        else
                            if line.length > 0 and line[0] is ">"
                                continue
                            if skipped
                                if line.length > 0
                                    skipped = false
                                    this.newComment += "#{line}"
                            else
                                this.newComment += "\n> #{line}"
                    this.newComment += "\n\n"
                else
                    if index is 0 and this.newComment.length is 0
                        this.newComment += "@#{username}: "
                    else
                        this.newComment += " @#{username}"

                Vue.nextTick ->
                    document.querySelector("#comment-area").focus()
            changedFollows: ->
                this.followCallback()
            toggleVoted: ->
                this.hideVoted = !this.hideVoted
                this.loadPollsCallback() if this.hideVoted
            changePollSortOrder: (new_order) ->
                this.poll_sort_order = new_order
                this.loadingPolls = false
                this.loadedAllPolls = false
                this.loadLimit = 25
                this.loadPollsCallback()
            selectUser: ->
                return unless this.selectUserCallback
                this.selectUserCallback()
            addPoll: (poll) ->
                this.polls.push poll
            addAnswer: ->
                this.newAnswers.push defaultAnswer()
                lastAnswerIndex = this.newAnswers.length - 1
                Vue.nextTick ->
                    el = document.querySelectorAll("#answers-create-box input[type=text]")[lastAnswerIndex]
                    if el
                        el.focus()
            removeAnswer: (answer) ->
                this.newAnswers.$remove(answer)
            deleteComment: (comment) ->
                if this.deleting
                    return

                this.deleting = true
                this.deleteIndex = comment.comment_id

                this.loadFileCallback (data) =>
                    unless data and data.comments
                        this.deleting = false
                        return

                    index = null
                    for comm,i in data.comments
                        if comm.comment_id is comment.comment_id
                            index = i
                            break

                    if index is null
                        this.deleting = false
                        return

                    data.comments.splice(index, 1)

                    this.writeFileCallback data, (success) =>
                        this.deleting = false
            submitComment: (poll) ->
                unless this.cert_user_id
                    this.messageCallback "error", "You need to login first"
                    return

                if this.newComment.length is 0
                    this.messageCallback "error", "You didn't enter any text for the comment"
                    return

                this.commenting = true

                this.loadFileCallback (data) =>
                    unless data
                        data =
                            next_poll_id: 1
                            polls: []

                    unless data.poll_vote?
                        data.poll_vote = {}

                    unless data.comments?
                        data.comments = []

                    unless data.next_comment_id?
                        data.next_comment_id = 1

                    data.comments.push
                        comment_id: data.next_comment_id
                        poll_uri: poll.poll_uri
                        body: this.newComment
                        date_added: new Date().getTime()

                    data.next_comment_id += 1

                    this.writeFileCallback data, (success) =>
                        console.log "Write callback"
                        console.log success
                        this.commenting = false
                        this.newComment = ""
            submitVote: (poll) ->
                unless this.cert_user_id
                    this.messageCallback "error", "You need to login first"
                    return

                this.voting = poll.poll_uri

                this.justvoted[poll.poll_uri] = true

                this.loadFileCallback (data) =>
                    unless data
                        data =
                            next_poll_id: 1
                            polls: []

                    unless data.poll_vote?
                        data.poll_vote = {}

                    data.poll_vote[poll.poll_uri] = this.my_selection[poll.poll_uri]

                    this.writeFileCallback data, (success) =>
                        console.log "Write callback"
                        console.log success
                        this.voting = null
            addNewPoll: ->
                unless this.cert_user_id
                    this.messageCallback "error", "You need to login first"
                    return

                answerData = (answer.answer for answer in this.newAnswers)

                newPollData =
                    question: this.newQuestion
                    answers: answerData.join("--|--")
                    date_added: new Date().getTime()
                    hidden: this.newHidden ? 1 : 0

                # verify data
                unless newPollData.question
                    this.messageCallback "error", "You need to enter a question first"
                    return
                for answer in this.newAnswers
                    unless answer.answer
                        this.messageCallback "error", "Answers can't be blank"
                        return

                this.creating = true

                this.changePollSortOrder "date_added"

                this.loadFileCallback (data) =>
                    console.log "Load callback"
                    console.log(data)
                    unless data
                        data =
                            next_poll_id: 1
                            polls: []
                    newPollData.poll_id = data.next_poll_id
                    data.polls.push newPollData
                    data.next_poll_id += 1

                    console.log(data)

                    this.writeFileCallback data, (success) =>
                        console.log "Write callback"
                        console.log success
                        if success
                            this.reset()
                            this.creating = false
                        else
                            this.creating = false

            reset: ->
                this.newQuestion = ""
                this.newAnswers = [defaultAnswer()]
                this.newHidden = false

markdown = window.markdownit({linkify: true}).disable(['image'])

Vue.component "loading",
    template: "#loading-template"
    props: ["color", "bgcolor"]
    data: ->
        data =
            color: "gray"
            bgcolor: "silver"

window.Page = new MySite()

window.addEventListener "scroll", ->
    unless Page.vm.loadedAllPolls or Page.vm.showPoll
        if document.body.scrollTopMax? # Chrome doesn't have scrollTopMax
            el = document.body.parentElement
        else
            el = document.body
        if (document.body.scrollTopMax or (el.scrollHeight - window.innerHeight)) - el.scrollTop < 500
            unless Page.vm.loadingPolls
                console.log "load more polls"
                Page.vm.loadingPolls = true
                Page.loadPolls(true)

    return false
