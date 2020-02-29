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
        appTitle: 'Zitetags',
        appDesc: '<em>Name Your Block</em> <br class="d-sm-none">on the <strong>TrustLess Web&trade;</strong>',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0,
        certProviders: {},

        /* User Details */
        userId: null,
        publicKey: null,
        authKey: null, // FIXME `auth_key` is DEPRECATED in Core, replace with Pub/Priv key auth.
        userType: null, // NOTE [ ADMIN, EDU, LEO, RESIDENT, STAFF ]

        /* Search details */
        query: '',
        errorMsg: null,
        successMsg: null,
        showReg: false,
        tagAddress: null,
        tagValue: null,
        expired: null,
        expiresIn: null,
        height: null,
        txId: null
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        /**
         * Calculate Info Hash
         */
        _authHash: function () {
            /* Compute the SHA-1 hash of the data provided. */
            // FIXME `auth_key` is DEPRECATED in Core, replace with Pub/Priv key auth.
            return CryptoJS.createHash('sha1').update(this.authKey).digest('hex')
        },

        /* Calculate estimated expiration date. */
        _estimateExp: function () {
            if (this.expired) {
                return `Has already <span class="text-danger">EXPIRED</span> and is available <span class="text-danger">NOW</span> for registration.`
            }

            /* Initialize estimate. */
            let estimate = null

            if (this.expiresIn > 4320) {
                estimate = `~${parseInt(this.expiresIn / 4320)} month(s)`
            } else if (this.expiresIn > 1008) {
                estimate = `~${parseInt(this.expiresIn / 1008)} week(s)`
            } else if (this.expiresIn > 144) {
                estimate = `~${parseInt(this.expiresIn / 144)} day(s)`
            } else {
                estimate = `~${parseInt((this.expiresIn / 144) * 24)} hour(s)`
            }

            return `Is <span class="text-info">ACTIVE,</span> will be expiring in <span class="text-info">${estimate}.</span>`
        },

        /* Validate error messages. */
        _hasError: function () {
            if (this.errorMsg === null) {
                return false
            } else {
                return true
            }
        },

        /* Validate success messages. */
        _hasSuccess: function () {
            if (this.successMsg === null) {
                return false
            } else {
                return true
            }
        },

        /* Validate query results. */
        _hasResults: function () {
            if (this.tagAddress === null) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        _init: async function () {
            /* Initialize new zer0net app manager. */
            // NOTE Globally accessible (e.g. Zero.cmd(...))
            window.Zero = new ZeroApp()

            console.info('App.() & Zero.() have loaded successfully!')

            /* Retrieve site info. */
            const siteInfo = await Zero.cmd('siteInfo', {})
            console.log('Site info', siteInfo)

            /* Set authorization key. */
            // FIXME `auth_key` is DEPRECATED in Core, replace with Pub/Priv key auth.
            this.authKey = siteInfo['auth_key']

            console.log('Auth key / hash', this.authKey, this._authHash)

            /* Set certificate providers. */
            this.certProviders = {
                'accepted_domains': [
                    // 'ethnick.bit',
                    'kxoid.bit',
                    'nametag.bit',
                    // 'xyzid.bit',
                    'zeroid.bit'
                ]
            }

            /* Validate user authentication. */
            if (siteInfo['cert_user_id']) {
                /* Set user id. */
                this.userId = siteInfo['cert_user_id']

                /* Retrieve public key. */
                const publicKey = await Zero.cmd('userPublickey', {})

                console.log('Public key', publicKey)

                const decoded = Buffer.from(publicKey, 'base64')
                console.log('Public key (decoded)', decoded.toString('hex'))

                /* Set public key. */
                this.publicKey = publicKey

                /* Initialize url. */
                let url = `https://zitetags.0net.io/profile/${encodeURIComponent(this.publicKey)}`
                console.log('ENDPOINT', url)

                /* Initialize data type. */
                const dataType = 'json'

                $.ajax({
                    beforeSend: (request) => {
                        request.setRequestHeader('X-0net-Auth-Key', this.authKey)
                        request.setRequestHeader('X-0net-Public-Key', this.publicKey)
                    },
                    dataType,
                    url,
                    success: (_profile) => {
                        console.log('PROFILE', _profile)

                        if (_profile['doc'] && _profile['doc'].userType) {
                            /* Retrieve user type. */
                            const userType = _profile['doc'].userType

                            console.info(`This user has a type [ ${userType} ]`)

                            /* Set user type. */
                            this.userType = userType
                        }
                    }
                })
            } else {
                console.log('User is NOT signed in.');
            }
        },

        clearAll: function () {
            this.errorMsg = null
            this.successMsg = null
            this.tagAddress = null
            this.showReg = false
        },

        completeReg: function () {
            /* Localize this. */
            const self = this

            /* Set query. */
            const query = this.query

            /* Initialize data type. */
            const dataType = 'json'

            /* Set url. */
            const url = `https://zitetags.0net.io/name-new/d/${query}`

            $.ajax({
                beforeSend: (request) => {
                    request.setRequestHeader('X-0net-Auth-Key', this.authKey)
                    request.setRequestHeader('X-0net-Public-Key', this.publicKey)
                },
                dataType,
                url,
                success: (_response) => {
                    console.log(_response)

                    if (_response && _response.error) {
                        if (_response.error.indexOf('Authentication failed') !== -1) {
                            self.errorMsg = _response.error
                        }
                    }
                }
            })
        },

        emailReg: function () {
            /* Set address. */
            const address = 'support@d14na.org'

            /* Set subject. */
            const subject = 'Zitetag Registration'

            /* Set body. */
            const body = `

Zitetag Request Details
_______________________________________

Zitetag: ${this.query}
My User Id: ${this.userId}
My Public Key: ${this.publicKey}
            `

            /* Email email app. */
            document.location = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        },

        loadHelloZero: function () {
            window.location = '/hell0.bit'
        },

        loadZeroCoding: function () {
            window.location = '/zerocoding.bit'
        },

        myAccount: function () {
            Zero.cmd('certSelect', this.certProviders)
        },

        register: async function () {
            if (this.userId) {
                $('#regModal').modal('show')
            } else {
                // alert('Please sign in first.')
                const response = await Zero.cmd('wrapperConfirm', ['You MUST be signed in to continue.', 'Sign In'])

                /* Validate response. */
                if (response) {
                    /* Request user certificate. */
                    const success = await Zero.cmd('certSelect', this.certProviders)
                    console.log('SIGNED IN', success)

                    /* Validate successful sign in . */
                    if (success === 'ok') {
                        /* Retrieve site info. */
                        const siteInfo = await Zero.cmd('siteInfo', {})
                        console.log('Site info', siteInfo)

                        /* Set authorization key. */
                        // FIXME `auth_key` is DEPRECATED in Core, replace with Pub/Priv key auth.
                        this.authKey = siteInfo['auth_key']

                        /* Validate user authentication. */
                        if (siteInfo['cert_user_id']) {
                            /* Set user id. */
                            this.userId = siteInfo['cert_user_id']

                            /* Retrieve public key. */
                            const publicKey = await Zero.cmd('userPublickey', {})
                            console.log('Public key', publicKey)

                            /* Set public key. */
                            this.publicKey = publicKey

                            /* Display confirmation. */
                            Zero.cmd('wrapperNotification', ['done', 'You have been signed in successfully!', 5000])
                        }
                    }
                }
            }
        },

        search: function () {
            /* Clear all displays. */
            this.clearAll()

            if (this.query === '') {
                return this.errorMsg = 'Please enter a <strong>Zitetag</strong> to being your search.'
            }

            console.log(`So you are looking for [ ${this.query} ]`)

            $.getJSON(`https://zitetags.0net.io/name/d/${encodeURIComponent(this.query)}`, (_data) => {
                console.log('DATA', _data)

                if (_data && _data.error) {
                    if (_data.error.indexOf('name not found') !== -1) {
                        this.successMsg = 'Good news! This <strong>Zitetag</strong> is available!'
                        this.showReg = true
                    } else {
                        this.errorMsg = _data.error
                    }
                }

                if (_data && _data.address) {
                    this.tagAddress = _data['address']
                    this.tagValue = _data['value']
                    this.expired = _data['expired']
                    this.expiresIn = _data['expires_in']
                    this.height = _data['height']
                    this.txId = _data['txid']

                    if (this.expired) {
                        /* Set registration flag. */
                        this.showReg = true
                    }
                }
            })
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
