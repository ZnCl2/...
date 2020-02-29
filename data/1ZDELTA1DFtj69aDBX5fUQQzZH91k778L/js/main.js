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
        appTitle: 'ZeroDelta',
        appDesc: 'The Official ZeroCache (DEX) Decentralized Exchange',

        /* Profile Summary */
        profileAddress: 'n/a',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0,

        /* Blockchain Summary */
        anameZeroCache: '0x0',
        anameZeroDelta: '0x0',

        /* Exchange summary. */
        orders: 'There are no orders here.'
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        // TODO
    },
    methods: {
        _init () {
            /* Initialize new Zer0net app manager. */
            // NOTE Globally accessible (e.g. Zero.cmd(...))
            window.Zero = new ZeroApp()

            console.info('App.() & Zero.() have loaded successfully!')

            /* Initialize Ethereum provider. */
            this._initEthereum()

            /* Initialize order book. */
            // this._initOrderBook()

            /* Initialie ZeroCache contract. */
            this._initZeroCache()

            /* Initialie ZeroDelta contract. */
            this._initZeroDelta()
        },
        async _initEthereum () {
            if (window.ethereum) {
                window.web3 = new Web3(ethereum)

                try {
                    // Request account access if needed
                    console.log('window.ethereum')

                    ethereum.enable()
                } catch (error) {
                    // User denied account access...
                }
            } else if (window.web3) { // Legacy dapp browsers...
                window.web3 = new Web3(web3.currentProvider)

                console.log('window.currentProvider')
                // Acccounts always exposed
            } else { // Non-dapp browsers...
                alert('Non-Ethereum browser detected.\nYou should consider trying MetaMask!')
            }

            /* Validate web3. */
            if (window.web3) {
                /* Retrieve accounts. */
                const accounts = await window.web3.eth.getAccounts()

                if (typeof accounts !== 'undefined') {
                    /* Set address. */
                    const defaultAddress = accounts[0]

                    console.log('Default address', defaultAddress)

                    this.profileAddress = defaultAddress
                }
            }
        },
        async signTrade () {
            console.log('Signing ZeroCache transfer for ZeroDelta trade..')

            const web3 = new Web3(ethereum)

            let anameZeroCache = '0x565d0859a620aE99052Cc44dDe74b199F13A3433'
            let ttl = 5210054
            let expiration = 1552543377

            const contract = { t: 'address', v: anameZeroCache }
            const token = { t: 'address', v: '0xc778417E063141139Fce010982780140Aa0cD5Ab' }
            const from = { t: 'address', v: ethereum.selectedAddress }
            const to = { t: 'address', v: '0xE632A8cBfcd7bF9d87dac9B59A039007080658CA' }
            const tokens = { t: 'uint256', v: '7000000000000000' } // 0.007 WETH
            // const staekholder = { t: 'bytes', v: '0x1936712F2Ff24469b41F1E665AB6483e6CaE2035' }
            const staekholder = { t: 'bytes', v: '0x0000000000000000000000000000000000000000' }
            const staek = { t: 'uint256', v: '0' }
            const expires = { t: 'uint256', v: ttl }
            const nonce = { t: 'uint256', v: expiration } // seconds
            // const nonce = { t: 'uint256', v: moment().unix() } // seconds

            /* Sign the parameters to generate a hash signature. */
            const sigHash = web3.utils.soliditySha3(
                contract, // ZeroCache's contract address
                token, // token's contract address
                from, // sender's address
                to, // receiver's address
                tokens, // quantity of tokens
                staekholder, // staekholder (NOTE: bytes is the same as address, but w/out checksum)
                staek, // staek amount
                expires, // expiration time
                nonce // nonce (unique integer)
            )

            console.log('SIGNATURE HASH', sigHash)

            /* Sign signature hash. */
            const signature = await web3.eth.personal.sign(
                sigHash, ethereum.selectedAddress)

            console.log('SIGNATURE', signature)
        },
        async connectMetamask () {
            console.log('Connecting Metamask..', ethereum)

            const web3 = new Web3(ethereum)

            let anameZeroCache = '0x565d0859a620aE99052Cc44dDe74b199F13A3433'
            let ttl = 5200000

            const contract = { t: 'address', v: anameZeroCache }
            const token = { t: 'address', v: '0x079F89645eD85b85a475BF2bdc82c82f327f2932' }
            const from = { t: 'address', v: ethereum.selectedAddress }
            const to = { t: 'address', v: '0xb07d84f2c5d8be1f4a440173bc536e0b2ee3b05e' }
            const tokens = { t: 'uint256', v: '13370000000' }
            // const staekholder = { t: 'bytes', v: '0x1936712F2Ff24469b41F1E665AB6483e6CaE2035' }
            const staekholder = { t: 'bytes', v: '0x0000000000000000000000000000000000000000' }
            const staek = { t: 'uint256', v: '0' }
            const expires = { t: 'uint256', v: ttl }
            const nonce = { t: 'uint256', v: 0 } // seconds
            // const nonce = { t: 'uint256', v: moment().unix() } // seconds

            /* Sign the parameters to generate a hash signature. */
            const sigHash = web3.utils.soliditySha3(
                contract, // ZeroCache's contract address
                token, // token's contract address
                from, // sender's address
                to, // receiver's address
                tokens, // quantity of tokens
                staekholder, // staekholder (NOTE: bytes is the same as address, but w/out checksum)
                staek, // staek amount
                expires, // expiration time
                nonce // nonce (unique integer)
            )

            console.log('SIGNATURE HASH', sigHash)

            /* Sign signature hash. */
            const signature = await web3.eth.personal.sign(
                sigHash, ethereum.selectedAddress)

            console.log('SIGNATURE', signature)

            /* Build relay package. */
            const relayPkg = {
                token: token.v,
                from: from.v,
                to: to.v,
                tokens: tokens.v,
                staekholder: staekholder.v,
                staek: staek.v,
                expires: expires.v,
                nonce: nonce.v,
                signature
            }

            console.log('Relay Package', relayPkg)

            /* Set method. */
            const method = 'POST'

            /* Set headers. */
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            /* Set body. */
            const body = JSON.stringify(relayPkg)

            /* Set options. */
            const options = { method, headers, body }

            /* Initialize (Cache) endpoint. */
            let endpoint = null

            /* Initialize (Cache) endpoint. */
            // FIXME We need to detect the network and connect appropriately.
            if (false) { // MAINNET
                endpoint = 'http://localhost:3000/v1'
                // endpoint = 'https://cache.0net.io/v1'
            } else { // ROPSTEN
                endpoint = 'http://localhost:4000/v1'
                // endpoint = 'https://cache-ropsten.0net.io/v1'
            }

            /* Make RPC. */
            const rawResponse = await fetch(endpoint + '/transfer', options)

            /* Retrieve response. */
            const content = await rawResponse.json()

            console.log(content)

            return

            const eth = await ethereum.enable()
                .catch(_error => {
                    console.error('ERROR:', _error)

                    if (
                        _error.message == 'User denied account authorization' ||
                        _error.code == 4001
                    ) {
                        alert('Please refresh to Authorize ZeroDelta access to your Wallet.')
                    }
                })

            console.log('Address', ethereum.selectedAddress)
            console.log('Network', ethereum.networkVersion)

            // const web3 = new Web3(ethereum)

            console.log('WEB ETH', web3.eth)

            // let signed = await web3.eth.sign('Hi there!', ethereum.selectedAddress)
            // let signed = await web3.eth['personal'].sign('Hi there!', ethereum.selectedAddress)
            // let signed = await web3.eth.sign('Hi there!', ethereum.selectedAddress)
            //     .catch(_error => {
            //         console.error('SIGN FAILED:', _error)
            //     })

            // console.log('SIGNED', signed)

            // A JS library for recovering signatures:
            // const sigUtil = require('eth-sig-util')
            const msgParams = [{
                type: 'string',
                name: '₵a¢he Notice',
                value: `Your authorization / signature is required to continue your request. ` +
                       `Please review the details shown below, then click 'SIGN' when ready.`
            }, {
                type: 'string',
                name: '₵a¢he Summary',
                value: `I want $13.3723 worth of DAI` +
                       `\nI am offering 561.8613 0GOLD` +
                       `\nMy offer will expire in ~24 hours`
            }]

            // Get the current account:
            web3.eth.getAccounts(function (err, accounts) {
                if (!accounts) return
                signMsg(msgParams, accounts[0])
            })

            function signMsg (msgParams, from) {
                web3.currentProvider.sendAsync({
                    method: 'eth_signTypedData',
                    params: [ msgParams, from ],
                    from,
                }, function (err, result) {
                    if (err) return console.error(err)

                    if (result.error) {
                        return console.error(result.error.message)
                    }

                    console.log('RESULT', result)
                })
            }
        },
        async _initOrderBook () {
            /* Initialize window.web3 global. */
            // const HTTP_PROVIDER = 'https://mainnet.infura.io/v3/ed640de1d87b45819a7a05b80d5244c4'
            const HTTP_PROVIDER = 'https://ropsten.infura.io/v3/ed640de1d87b45819a7a05b80d5244c4'

            const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER))

            /* Set data id. */
            // NOTE: keccak256(`aname.zerodelta`)
            const dataId = '0xbd7239f4aaac15ef5b656f04994d54293ff22d4aac85bedfcb4b68e502db0497'

            /* Initialize endpoint. */
            const endpoint = `https://db-ropsten.0net.io/v1/getAddress/${dataId}`

            const response = await fetch(endpoint)
                .catch(_error => {
                    console.error('REQUEST ERROR:', _error)
                })

            console.log('RESPONSE', response)

            /* Retrieve contract address. */
            const contractAddress = await response.json()

            console.log('ZeroDelta ANAME:', contractAddress)

            /* Set from. */
            const from = this.address

            /* Initialize gas price. */
            // const gasPrice = '20000000000' // default gas price in wei, 20 gwei in this case
            const gasPrice = '5.5' * 1e9 // or get with web3.eth.gasPrice

            /* Initilize abi. */
            // const abi = require('../abi/zeroDelta')
            const abi = [{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newSuccessor","type":"address"}],"name":"setSuccessor","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRevision","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"getOrder","outputs":[{"name":"maker","type":"address"},{"name":"makerSig","type":"bytes"},{"name":"tokenRequest","type":"address"},{"name":"amountRequest","type":"uint256"},{"name":"tokenOffer","type":"address"},{"name":"amountOffer","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"canPartialFill","type":"bool"},{"name":"amountFilled","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"bytes32"}],"name":"getAvailableVolume","outputs":[{"name":"availableVolume","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSuccessor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddress","type":"address"},{"name":"_tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPredecessor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenRequest","type":"address"},{"name":"_amountRequest","type":"uint256"},{"name":"_tokenOffer","type":"address"},{"name":"_amountOffer","type":"uint256"},{"name":"_expires","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_makerSig","type":"bytes"},{"name":"_canPartialFill","type":"bool"}],"name":"createOrder","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"}],"name":"OrderCancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"}],"name":"OrderRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"marketId","type":"bytes32"},{"indexed":false,"name":"orderId","type":"bytes32"},{"indexed":false,"name":"taker","type":"address"},{"indexed":false,"name":"amountTaken","type":"uint256"}],"name":"TradeComplete","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}]

            /* Initialize (transaction) options. */
            const options = { from, gasPrice }

            /* Initialize contract. */
            const contract = new web3.eth.Contract(
                abi, contractAddress, options)

            /**
             * Supported Markets
             * -----------------
             *
             * 1. 0GOLD / WETH      Wrapped Ethereum
             *                      0x00a021b22099e4cd759b5f5b73556ef143c9df7cac23530968e0f9130c47fb1f ROPSTEN
             * 2. 0GOLD / DAI       MakerDAO DAI
             * 3. 0GOLD / 0xBTC     0xBitcoin Token
             * 4. 0GOLD / WBTC      Wrapped Bitcoin
             */

            contract.getPastEvents('OrderRequest', {
                fromBlock: 5138400,
                toBlock: 'latest'
            }).then(_events => {
                console.log('EVENTS', _events)

                _events.forEach(_event => {
                    /* Retrieve return values. */
                    const returnValues = _event.returnValues

                    // console.log('RETURN VALUES', returnValues)

                    /* Retrieve market id. */
                    const marketId = returnValues.marketId

                    console.log(`Market Id\n[ ${marketId} ]`)

                    /* Retrieve order id. */
                    const orderId = returnValues.orderId

                    console.log(`Order Id\n[ ${orderId} ]`)

                    this.orders += `<br /><small>${orderId}</small>`
                })
            }).catch(_error => {
                console.error('ERROR', _error)
            })

        },
        async _initZeroCache () {
            console.log('Starting ZeroCache initialization..')

            /* Set data id. */
            // NOTE: keccak256(`aname.zerocache`)
            const dataId = '0x75341c765d2ccac618fa566b11618076575bdb7620692a552e9ac9ff23a5540c'

            /* Initialize endpoint. */
            let endpoint = null

            endpoint = `https://db-ropsten.0net.io/v1/getAddress/${dataId}`

            /* Make API request. */
            const response = await fetch(endpoint)
                .catch(_error => {
                    console.error('REQUEST ERROR:', _error)
                })

            /* Request aname. */
            const aname = await response.json()

            console.log('ZeroCache ANAME RESPONSE:', aname)

            /* Validate aname. */
            if (typeof aname !== 'undefined') {
                this.anameZeroCache = aname
            }
        },
        async _initZeroDelta () {
            console.log('Starting ZeroDelta initialization..')

            /* Set data id. */
            // NOTE: keccak256(`aname.zerodelta`)
            const dataId = '0xbd7239f4aaac15ef5b656f04994d54293ff22d4aac85bedfcb4b68e502db0497'

            /* Initialize endpoint. */
            let endpoint = null

            endpoint = `https://db-ropsten.0net.io/v1/getAddress/${dataId}`

            /* Make API request. */
            const response = await fetch(endpoint)
                .catch(_error => {
                    console.error('REQUEST ERROR:', _error)
                })

            /* Request aname. */
            const aname = await response.json()

            console.log('ZeroDelta ANAME RESPONSE:', aname)

            /* Validate aname. */
            if (typeof aname !== 'undefined') {
                this.anameZeroDelta = aname
            }
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
