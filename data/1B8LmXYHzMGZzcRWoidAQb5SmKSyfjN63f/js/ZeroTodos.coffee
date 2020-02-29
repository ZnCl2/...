class MySite extends ZeroFrame
    init: ->
        @vm = prepareSite()
        @vm.selectUserCallback = @selectUser
        @vm.writeFileCallback = @writeFile
        @vm.messageCallback = @displayMessage

        @vm.startWatch()

    route: (cmd, message) ->
        if cmd == "setSiteInfo"
            if message.params.cert_user_id
                @vm.cert_user_id = message.params.cert_user_id
            else
                @vm.cert_user_id = null
            @site_info = message.params  # Save site info data to allow access it later

            @log "Routed", cmd, message

            if message.params? and message.params.event? and message.params.event.length > 0 and @vm.cert_user_id
                switch message.params.event[0]
                    when "cert_changed"
                        @loadFile()
                        @updateDataSize()
                    when "file_done"
                        if not @vm.needsSaving
                            inner_path = "data/users/#{@site_info.auth_address}/data.json"
                            if message.params.event[1] is inner_path
                                @loadFile()
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

            @log "Web Socket Opened", @vm.cert_user_id, siteInfo.cert_user_id

            @loadFile() unless skipLoading

            @updateDataSize()

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

    loadFile: =>
        inner_path = "data/users/#{@site_info.auth_address}/data.json"
        @cmd "fileGet", {"inner_path": inner_path, "required": false}, (data) =>
            if data  # Parse if already exits
                @cmd "eciesDecrypt", data, (result) =>
                    result = JSON.parse(result)
                    @vm.needsSaving = false
                    @vm.loading = true
                    @vm.todos = result.todos
                    @vm.next_todo_id = result.next_todo_id
                    @vm.readNote = result.readNote
                    Vue.nextTick =>
                        @vm.loading = false

    writeFile: (json_raw, cb=false) =>
        inner_path = "data/users/#{@site_info.auth_address}/data.json"
        @cmd "eciesEncrypt", json_raw, (data) =>
            @cmd "fileWrite", [inner_path, btoa(data)], (res) =>
                if res == "ok"
                    @log "File saved"
                    if cb
                        cb(true)
                    # Publish the file to other users
                    @cmd "sitePublish", {"inner_path": inner_path}, (res) =>
                        @log "Saved user data.json published"
                        @updateDataSize()
                else
                    @cmd "wrapperNotification", ["error", "File write error: #{res}"]
                    if cb
                        cb(false)

prepareSite = ->
    vm = new Vue
        el: '#app'
        data:
            next_todo_id: 2
            selected_todo: 0
            newTask: ''
            editingTask: null
            editedTask: ''
            editingTodo: null
            editedTodo: ''
            dragging: null
            dragover: null
            dragType: null
            footer: true
            readNote: false
            cert_user_id: null
            loading: false
            saving: false
            needsSaving: false
            dataSize: null
            dataSizeMax: null
            selectUserCallback: null
            writeFileCallback: null
            messageCallback: null
            todos: [
                todo_id: 1
                title: "ZeroTodos"
                tasks: [
                    { text: 'Select a todo list on the left', checked: true }
                    { text: 'Check a task to mark it as done', checked: false }
                    { text: 'Enter a new task', checked: false }
                    { text: 'Double click a task to edit it', checked: false }
                    { text: 'Hit ESC to cancel editing', checked: false }
                    { text: 'Click the X on a task to remove it', checked: false }
                    { text: 'Drag a task or todo list to a different position', checked: false }
                ]
            ]

        computed:
            dataUsage: ->
                if this.dataSize is null or this.dataSizeMax is null
                    return null

                return "#{(this.dataSize / 1024).toFixed(1)}kb / #{(this.dataSizeMax / 1024).toFixed(1)}kb"

        methods:
            todoClasses: (index) ->
                classList = []
                if this.dragType is "todo"
                    if index is this.dragging
                        classList.push "dragging"
                    if index is this.dragover
                        classList.push "dragover"
                if index is this.selected_todo
                    classList.push "selected"
                return classList
            taskClasses: (index) ->
                if this.dragType is "task"
                    if index is this.dragging
                        return ["dragging"]
                    if index is this.dragover
                        return ["dragover"]
                else
                    return []
            dragStart: (event, index, item) ->
                this.dragging = index
                if item.todo_id?
                    this.dragType = "todo"
                else
                    this.dragType = "task"
                event.dataTransfer.effectAllowed = "move"
                event.dataTransfer.setData "text", "dummy"
            endDrag: ->
                this.dragging = null
                this.dragover = null
                this.dragType = null

            dropped: (item, index) ->
                if item.todo_id?
                    # item is a todo list
                    itemSrc = this.todos[this.dragging]
                    itemTarget = this.todos[index]
                    this.todos.$set this.dragging, itemTarget
                    this.todos.$set index, itemSrc
                else
                    # item is a task
                    itemSrc = this.todos[this.selected_todo].tasks[this.dragging]
                    itemTarget = this.todos[this.selected_todo].tasks[index]
                    this.todos[this.selected_todo].tasks.$set this.dragging, itemTarget
                    this.todos[this.selected_todo].tasks.$set index, itemSrc

            startWatch: ->
                this.$watch "todos", this.todosChanged,
                    deep: true

            selectUser: ->
                return unless this.selectUserCallback
                this.selectUserCallback()

            todosChanged: (todos) ->
                unless this.loading
                    this.needsSaving = true

            todoClicked: (index) ->
                document.querySelector("#right").scrollTop = 0
                this.selected_todo = index

            addNewTodo: ->
                todo =
                    todo_id: this.next_todo_id
                    title: "New Todo list"
                    tasks: []

                this.next_todo_id += 1

                this.todos.push todo

            addTask: ->
                if this.newTask is ''
                    return
                this.todos[this.selected_todo].tasks.unshift
                    text: this.newTask
                    checked: false
                this.newTask = ''

            deleteTask: (task) ->
                this.todos[this.selected_todo].tasks.$remove(task)

            taskCount: (todo) ->
                todo.tasks.filter (task) ->
                    not task.checked
                .length

            editTask: (task, index) ->
                this.editedTask = task.text
                this.editingTask = index

            editTaskDone: (task) ->
                task.text = this.editedTask
                this.editingTask = null

            cancelEditingTask: (task) ->
                this.editingTask = null

            editTodo: (todo, index) ->
                this.editedTodo = todo.title
                this.editingTodo = index

            editTodoDone: (todo) ->
                todo.title = this.editedTodo
                this.editingTodo = null

            cancelEditingTodo: (todo) ->
                this.editingTodo = null

            deleteTodo: (index) ->
                this.todos.$remove(this.todos[index])
                this.selected_todo = 0

            clearCompleted: ->
                this.todos[this.selected_todo].tasks =
                    this.todos[this.selected_todo].tasks.filter (task) ->
                        not task.checked

            saveUserData: ->
                if this.saving
                    if this.messageCallback
                        this.messageCallback("info", "Already saving")
                    return

                return unless this.writeFileCallback

                data =
                    todos: this.todos
                    next_todo_id: this.next_todo_id
                    readNote: this.readNote

                json_raw = unescape(encodeURIComponent(JSON.stringify(data)))

                this.saving = true

                this.writeFileCallback json_raw, (result) =>
                    this.saving = false
                    this.needsSaving = false

        directives:
            "task-focus": (value) ->
                return unless value
                el = this.el
                Vue.nextTick ->
                    el.focus()
                    length = el.value.length
                    if el.setSelectionRange?
                        el.setSelectionRange 0, length

setTimeout ->
    Page.vm.footer = false
, 5000

window.Page = new MySite()
