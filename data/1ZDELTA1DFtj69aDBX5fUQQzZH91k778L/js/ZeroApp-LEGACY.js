/**
 * ZeroApi
 *
 * Primary framework necessary to manage message communications between
 * the sandboxed (iFrame) web document and the Zeronet client.
 *
 * Derived from the original ZeroFrame.js (as included in ZeroNet core).
 */
(function () {
// FIXME Do we need this?? What's it for???
    const slice = [].slice

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
                if (this.pendingCbs[message.to] !== null) {
                    return this.pendingCbs[message.to](message.result)
                } else {
                    return this._log(`WebSocket callback not found [ ${message} ]`)
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
        ZeroApi.prototype.route = function (cmd, message) {
            return this._log(`Unknown command [ ${message} ]`)
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
        ZeroApi.prototype.cmd = function (cmd, params, cb) {
            if (params === null) {
                params = {}
            }

            if (cb === null) {
                cb = null
            }

            return this.send({ cmd, params }, cb)
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
// FIXME What are we doing about `slice`???
        ZeroApi.prototype._log = function () {
            let args
            args = 1 <= arguments.length ? slice.call(arguments, 0) : []

            return console.log.apply(console, ['[ZeroApi]'].concat(slice.call(args)))
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


/**
 * ZeroApp
 *
 * Framework for allowing simple app development.
 */
(function () {
  // var ZeroApp,
  //   bind = function (fn, me){ return function (){ return fn.apply(me, arguments); }; },
    const extend = function (_child, _parent) {
        for (let key in _parent) {
            if (hasProp.call(_parent, key)) _child[key] = _parent[key]
        }

        function _ctor() {
            this.constructor = _child
        }

        _ctor.prototype = _parent.prototype;
        _child.prototype = new _ctor()
        _child.__super__ = _parent.prototype

        return _child
    }
  //   hasProp = {}.hasOwnProperty;

    /* Initialize ZeroApp object (class). */
    const ZeroApp = (function (superClass) {
        extend(ZeroApp, superClass)

        /* Constructor. */
        function ZeroApp() {
            this.saveData = this.saveData.bind(this)
            this.selectUser = this.selectUser.bind(this)

            return ZeroApp.__super__.constructor.apply(this, arguments)
        }

        /**
         * Open WebSocket
         *
         * When the Zeronet page is loaded a websocket is openend.
         * This can be used to check if the user is logged in.
         */
        ZeroApp.prototype.onOpenWebSocket = function (e) {
            /* Initialize the mobile viewport. */
            this.cmd('wrapperSetViewport', 'width=device-width, initial-scale=1.0')

            /* Request site info. */
            return this.cmd('siteInfo', {}, (_siteInfo) => {
                if (_siteInfo.cert_user_id) {
                    return this._log(`User is logged in as [ ${_siteInfo.cert_user_id} ]`)
                } else {
                    return this._log('User is NOT logged in.')
                }
            })
        }

        /**
         * Route
         *
         * Messages received in real-time are managed here.
         * (It can be used to login the user once he selects a certificate.)
         */
        ZeroApp.prototype.route = function (_cmd, _message) {
            if (_cmd === 'setSiteInfo') {
                /* Set site info. */
                this.siteInfo = _message.params

                /* Verify user status. */
                if (_message.params.cert_user_id) {
                    return this._log(`User is logged in as [ ${message.params.cert_user_id} ]`)
                } else {
                    return this._log('User is NOT logged in.')
                }
            }
        }

        /**
         * Select User
         *
         * Displays the certificate selection dialog box to the user.
         *
         * Use it from your html files with an onclick attribute:
         * <a href="#" onclick="return ZApp.selectUser()">Login</a>
         */
        ZeroApp.prototype.selectUser = function () {
            /* Initialize accepted domains. */
            // NOTE ENS = Ethereum Name Service (https://ens.domains/)
            const acceptedDomains = {
                'accepted_domains': [
                    'ethnick.bit', // .ETH on ENS ID Provider
                    'kxoid.bit', // KxoNetwork ID Provider
                    'xyzid.bit', // .XYZ on ENS ID Provider
                    'zeroid.bit' // ZeroNet Core ID Provider
                ]
            }

            /* Request certificate provider from user. */
            ZApp.cmd('certSelect', { acceptedDomains })

            return false
        }

        /**
         * Update User Quota
         *
         * Users have a quota or limit on the data they can post to each site.
         * This method gets the max_size allowed in this site and the current
         * user's data size.
         */
        ZeroApp.prototype.updateUserQuota = function () {
            if (this.siteInfo.cert_user_id) {
                /* Initialize path to the user's data file. */
                const innerPath = 'data/users/' + this.siteInfo.auth_address + '/content.json'

                return this.cmd('fileRules', innerPath, (_rules) => {
                    this._log(`Current / max size [ ${_rules.current_size} / ${_rules.max_size} ]`)
                })
            }
        }

        /**
         * Query Data
         *
         * Zeronet includes an SQLite database you can use to query your
         * application data.
         * NOTE This database is Read-Only.
         */
        ZeroApp.prototype.queryData = function () {
            /*******************************************************************
             Query ALL available user data from a ZeroApp.

             query = ```
                SELECT
                    zeroapp.*, keyvalue.value AS cert_user_id
                FROM
                    zeroapp
                LEFT JOIN
                    json AS data_json USING (json_id)
                LEFT JOIN
                    json AS content_json ON (
                        data_json.directory = content_json.directory AND
                        content_json.file_name = 'content.json'
                    )
                LEFT JOIN
                    keyvalue ON (
                        keyvalue.key = 'cert_user_id' AND
                        keyvalue.json_id = content_json.json_id
                    )
                ORDER BY date_added
             ```
            *******************************************************************/
            const query = 'SELECT * FROM zeroapp'

            return this.cmd('dbQuery', [query], (_data) {
                this._log(_data)
            })
        }

        /**
         * Save Data
         *
         * JSON files are used to save or update the data in Zeronet.
         */
        ZeroApp.prototype.saveData = function () {
            let innerPath

            // NOTE The user needs to be logged in, in order to
            //      post any data to the zite.
            if (!ZApp.siteInfo.cert_user_id) {
                ZApp.cmd('wrapperNotification', ['info', 'Please, select your account.'])

                return false
            }

            /* Initialize path to the user's data file. */
            innerPath = 'data/users/' + this.siteInfo.auth_address + '/data.json'

            /* Load the current user's data file and push a new element. */
            this.cmd('fileGet', {
                'inner_path': innerPath,
                'required': false
            }, (_data) => {
                let jsonRaw

                if (_data) {
// FIXME Add try-catch for parse
                    _data = JSON.parse(_data)
                } else {
                    _data = {
                        'zeroapp': []
                    }
                }

                _data.zeroappp.push({
                    'body': document.getElementById('message').value,
                    'date_added': +(new Date)
                })

                jsonRaw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')))

                /* Write file to disk. */
                // NOTE All data posted by this user will be stored here.
                //      Zeronet will automatically map it into the
                //      SQLite database, so we can query it later.
                return this.cmd('fileWrite', [_innerPath, btoa(jsonRaw)], (_res) => {
                    /* Publish the file so other users can download it. */
                    if (_res === 'ok') {
                        return this.cmd('sitePublish', {
                            'inner_path': _innerPath
                        }, function (_innerRes) {
                            return this._log('Data published successfully!')
                        })
                    } else {
                        return _this.cmd('wrapperNotification', ['error', `Oops! There was an error writing the file [ ${_res}]`])
                    }
                })
            })

            return false
        }

        /* Return the localized ZeroApp object for assignment. */
        return ZeroApp
    })(ZeroApi)

    /* Assign ZApp as a new "global" window variable. */
    window.ZApp = new ZeroApp()
}).call(this)
