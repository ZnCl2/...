class ZeroFrame extends Class
	constructor: (url) ->
		@url = url
		@waiting_cb = {}
		@connect()
		@next_message_id = 1
		@init()


	init: ->
		@


	connect: ->
		@target = window.parent
		window.addEventListener("message", @onMessage, false) 
		@cmd("innerReady")


	onMessage: (e) =>
		message = e.data
		cmd = message.cmd
		if cmd == "response"
			if @waiting_cb[message.to]?
				@waiting_cb[message.to](message.result)

		else if cmd == "wrapperReady" # Wrapper inited later
			@cmd("innerReady")
		else if cmd == "ping"
			@response message.id, "pong"
		else if cmd == "wrapperOpenedWebsocket"
			@onOpenWebsocket()
		else if cmd == "wrapperClosedWebsocket"
			@onCloseWebsocket()
		else
			@onRequest cmd, message

	response: (to, result) ->
		@send {"cmd": "response", "to": to, "result": result}


	cmd: (cmd, params={}, cb=null) ->
		@send {"cmd": cmd, "params": params}, cb


	send: (message, cb=null) ->
		message.id = @next_message_id
		@next_message_id += 1
		@target.postMessage(message, "*")
		if cb
			@waiting_cb[message.id] = cb
			


window.ZeroFrame = ZeroFrame
