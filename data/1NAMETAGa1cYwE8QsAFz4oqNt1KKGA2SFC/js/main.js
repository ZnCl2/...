class ZeroApp extends ZeroApi {
    setSiteInfo(_siteInfo) {
        /* Set Zer0net summary details. */
        App.ziteAddress = _siteInfo.address
        App.zitePeers = _siteInfo.peers
        App.ziteSize = _siteInfo.settings.size
    }

    onOpen() {
        /* Call super. */
        super.onOpen()

        this.cmd('siteInfo', [], function (_siteInfo) {
            Zero.setSiteInfo(_siteInfo)
        })
    }

    onEvent(_event, _message) {
        if (_event === 'setSiteInfo') {
            this.setSiteInfo(_message.params)
        } else {
            this._log('Unknown event:', _event)
        }
    }
}

/**
 * Vue Application Manager (Configuration)
 */
const vueAppManager = {
    el: '#app',
    data: () => ({
        /* ZeroApp / ZeroApi Manager */
        zero: null,

        /* App Summary */
        appTitle: 'Nametag',
        appDesc: 'Your <strong>Official</strong> Passport to the <strong>TrustLess Web&trade;</strong>',

        /* User Details */
        nickname: '',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0,

        /* Proof-of-work */
        hash: null,
        challenge: null,
        nonce: null,
        startDate: null,
        powResults: null
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        // TODO
    },
    methods: {
        _init: function () {
            /* Initialize new Zer0net app manager. */
            // NOTE Globally accessible (e.g. Zero.cmd(...))
            window.Zero = new ZeroApp()

            console.info('App.() & Zero.() have loaded successfully!')

            console.log('Testing Public Key...')

            Zero.cmd('userPublickey', {}, (_results) => {
                console.log('Public key', _results)

                const decoded = Buffer.from(_results, 'base64')
                console.log('Decoded', decoded.toString('hex'))
            })

            Zero.cmd('siteInfo', {}, (_results) => {
                console.log('Site info', _results)
            })

            // Zero.cmd('certSelect', {
            //     'accepted_domains':
            //         [
            //             'kaffie.bit',
            //             'kxoid.bit',
            //             'nametag.bit',
            //             'zeroid.bit'
            //         ]
            // })

        },

        _devTest: async function () {
            Zero.cmd('certSelect', [['nametag.bit']])
        },

        _sendRequest: async function () {
            /* Set user id. */
            // this.userId = siteInfo['cert_user_id']

            /* Retrieve public key. */
            const publicKey = await Zero.cmd('userPublickey', {})

            console.log('Public key', publicKey)

            /* Set public key. */
            // this.publicKey = publicKey

            /* Initialize url. */
            let url = `https://nametag.0net.io/name-new/${encodeURIComponent(this.nickname)}`
            // let url = `https://zitetags.0net.io/profile/`
            console.log('ENDPOINT', url)

            /* Initialize data type. */
            const dataType = 'json'

            $.ajax({
                // beforeSend: (request) => {
                //     request.setRequestHeader('X-0net-Auth-Key', this.authKey)
                //     request.setRequestHeader('X-0net-Public-Key', this.publicKey)
                // },
                dataType,
                url,
                success: (_results) => {
                    console.log('RESULTS', _results)

                    if (_results.error) {
                        return Zero.cmd('wrapperNotification', ['error', _results.error])
                    }

                    /* Set certificate. */
                    const cert = _results['cert']

                    // TODO Validate certificate.

                    /* Set nickname. */
                    const nickname = _results['nickname']

                    // TODO Validate nickname.

                    /* Set certificate name. */
                    const certName = 'nametag.bit'

                    /* Set portal type. */
                    const portalType = 'web'

                    Zero.cmd('certAdd', [certName, portalType, nickname, cert], function (_res) {
                        if (_res.error && _res.error.startsWith('You already')) {
                            Zero.cmd('certSelect', [[certName]])
                        } else if (_res.error) {
                            Zero.cmd('wrapperNotification', ['error', 'Failed to create account: ' + res.error])
                        } else {
                            Zero.cmd('certSelect', [[certName]])
                        }
                    })
                }
            })
        },

        _genChallenge: function () {
            const NUM_BYTES = 10000;

            let longString = ''

            for (let i = 0; i < NUM_BYTES; i += 1) {
                longString += Math.random().toString(36).substr(2, 1)
            }

            return longString
        },

        clearAll: function () {
            this.errorMsg = null
            this.successMsg = null
            this.tagAddress = null
            this.showReg = false
        },

        search: function () {
            this._sendRequest()
            // TODO
        },

        /**
         * Proof-of-work Processing
         *
         * NOTE: Based on the Hashcash POW system.
         *       (https://en.wikipedia.org/wiki/Hashcash)
         */
        pow: function () {
            /* Generate initial hash. */
            this.hash = CryptoJS.createHash('sha256').update(this.challenge + this.nonce).digest('hex')

            /* Validate hash. */
            if (this.hash.substr(0, 3) !== '000') {
            // if (this.hash.substr(0, 4) !== '0000') {
                // this.hash = CryptoJS.createHash('sha256').update(this.challenge + this.nonce).digest('hex')

                /* Increment nonce. */
                this.nonce++

                /* Slight delay (avoid unresponsive browser). */
                setTimeout(this.pow, 0)
                // this.pow()
            } else {
                /* Set end date. */
                const endDate = new Date()

                /* Set POW results. */
                const powResults = `
<div class="card mt-3">
    <div class="card-body">
    Your POW answer is [ <strong class="text-info">${numeral(this.nonce).format('0,0')}</strong> ], with a calculated hash of
    <br />[ <strong class="text-info">${this.hash.slice(0, 16)} ... ${this.hash.slice(-16)}</strong> ],
    <br />and it took [ <strong class="text-info">${(endDate - this.startDate) / 1000}</strong> ] seconds to complete.
    </div>
</div>
                `

                this.powResults = powResults
            }
        },

        importKey: function () {
            Zero.cmd('wrapperPrompt', ['Enter your private key:', 'password'], (_input) => {
                Zero.cmd('wrapperNotification', ['done', `Nice! I see you entered [${_input}]`, 7000])
            })
        },

        register: function () {
            // return this._sendRequest()

            /* Generate new challenge. */
            this.challenge = this._genChallenge()

            /* Initialize nonce. */
            this.nonce = 0

            /* Initialize start date. */
            this.startDate = new Date()

            console.info(`POW Challenge [ ${this.challenge.length} bytes ]`)

            this.pow()
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
