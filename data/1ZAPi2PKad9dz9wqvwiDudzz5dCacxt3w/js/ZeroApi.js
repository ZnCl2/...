'use strict';

/**
 * ZeroApi
 *
 * Primary framework necessary to manage message communications between
 * the sandboxed (iFrame) web document and the Zeronet client.
 *
 * Derived from the original ZeroFrame.js (as included in ZeroNet core).
 */
(function () {
    /* Initialize the ZeroApi object (class). */
    const ZeroApi = (function () {
        /* Constructor. */
        function ZeroApi(url) {
            /* Bind primary functions to `this`. */
            this.route = this.route.bind(this)
            this.onMessage = this.onMessage.bind(this)
            this.onCloseWebSocket = this.onCloseWebSocket.bind(this)
            this.onOpenWebSocket = this.onOpenWebSocket.bind(this)

            /* Initialize data/object holders. */
            this.url = url
            this.pendingCbs = {}
            this.next_message_id = 0

            /* Initialize the wrapper nonce (from current location URL). */
            this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, '$1')

            /* Initiate parent connection. */
            this.connect()

            /* Complete initialization process. */
            this.init()
        }

        /* Initialize and retrieve the main object (class). */
        ZeroApi.prototype.init = function () {
            return this
        }

        /* Initialize the (communications) connection to the parent window. */
        ZeroApi.prototype.connect = function () {
            /* Set the target to the window's parent. */
            this.target = window.parent

            /* Initialize an event listener for incoming messages. */
            window.addEventListener('message', this.onMessage, false)

            /* Send ready command. */
            return this.cmd('innerReady')
        }

        /**
         * On Message
         *
         * Handler for messages received from parent window.
         */
        ZeroApi.prototype.onMessage = function (e) {
            /* Initialize message. */
            const message = e.data

            /* Initialize command. */
            const cmd = message.cmd

            /* Handle command options. */
            if (cmd === 'response') {
                if (typeof this.pendingCbs[message.to] !== 'undefined') {
                    return this.pendingCbs[message.to](message.result)
                } else {
                    return this._log(`WebSocket callback not found`, message, this.pendingCbs)
                }
            } else if (cmd === 'wrapperReady') {
                return this.cmd('innerReady')
            } else if (cmd === 'ping') {
                return this.response(message.id, 'pong')
            } else if (cmd === 'wrapperOpenedWebsocket') {
                return this.onOpenWebSocket()
            } else if (cmd === 'wrapperClosedWebsocket') {
                return this.onCloseWebSocket()
            } else {
                return this.route(cmd, message)
            }
        }

        /**
         * Route
         *
         * Messages received in real-time are managed here.
         */
        ZeroApi.prototype.route = function (_cmd, _message) {
            return this._log(`Unknown command [ ${_cmd} ]`, _message)
        }

        /**
         * Response
         *
         * Outgoing message handler.
         */
        ZeroApi.prototype.response = function (to, result) {
            /* Initialize command. */
            const cmd = 'response'

            return this.send({ cmd, to, result })
        }

        /**
         * Command (Request)
         *
         * Send a command request to the client for processing.
         */
        ZeroApi.prototype.cmd = function (cmd, params, _cb) {
            if (params === null) {
                params = {}
            }

            /* Send with (promise) callback. */
            if (typeof _cb === 'undefined') {
                return new Promise((_resolve, _reject) => {
                    this.send({ cmd, params }, (_res) => {
                        if (_res && _res.error) {
                            _reject(_res.error)
                        } else {
                            _resolve(_res)
                        }
                    })
                })
            }

            /* Send with callback. */
            return this.send({ cmd, params }, _cb)
        }

        /**
         * Send Message
         *
         * Message handler.
         */
        ZeroApi.prototype.send = function (_message, _callback) {
            if (_callback === null) {
                _callback = null
            }

            _message.wrapper_nonce = this.wrapper_nonce
            _message.id = this.next_message_id

            /* Increment message id. */
            this.next_message_id += 1

            /* Post message to target (parent window). */
            this.target.postMessage(_message, '*')

            if (_callback) {
                /* Save this callback to pending callbacks holder. */
                return this.pendingCbs[_message.id] = _callback
            }
        }

        /**
         * Add Log
         *
         * Adds a new log entry to the debugging console.
         */
        ZeroApi.prototype._log = function () {
            let args
            args = 1 <= arguments.length ? [].slice.call(arguments, 0) : []

            return console.log.apply(console, ['[ZeroApi]'].concat([].slice.call(args)))
        }

        /**
         * WebSocket Opened
         */
        ZeroApi.prototype.onOpenWebSocket = function () {
            return this._log('WebSocket opened successfully.')
        }

        /**
         * WebSocket Closed
         */
        ZeroApi.prototype.onCloseWebSocket = function () {
            return this._log('WebSocket has been closed.')
        }

        /* Return the localized ZeroApi object for assignment. */
        return ZeroApi
    })()

    /* Assign ZeroApi as a new "global" window variable. */
    window.ZeroApi = ZeroApi
}).call(this)
