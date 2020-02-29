

// ;(function ($) {
//     var	$window = $(window)
//     var $body = $('body')
//
//     // Breakpoints.
//     breakpoints({
//         xlarge:  [ '1281px',  '1680px' ],
//         large:   [ '981px',   '1280px' ],
//         medium:  [ '737px',   '980px'  ],
//         small:   [ null,      '736px'  ]
//     })
//
//     // Play initial animations on page load.
//     $window.on('load', function() {
//         window.setTimeout(function() {
//             $body.removeClass('is-preload');
//         }, 100);
//     })
//
//     // Dropdowns.
//     $('#nav > ul').dropotron({
//         mode: 'fade',
//         noOpenerFade: true,
//         hoverDelay: 150,
//         hideDelay: 350
//     })
//
//     // Nav.
//     // Title Bar.
//     $(
//         '<div id="titleBar">' +
//         '<a href="#navPanel" class="toggle"></a>' +
//         '</div>'
//     ).appendTo($body)
//
//     // Panel.
//     $(
//         '<div id="navPanel">' +
//         '<nav>' +
//         $('#nav').navList() +
//         '</nav>' +
//         '</div>'
//     ).appendTo(
//         $body
//     ).panel({
//         delay: 500,
//         hideOnClick: true,
//         hideOnSwipe: true,
//         resetScroll: true,
//         resetForms: true,
//         side: 'left',
//         target: $body,
//         visibleClass: 'navPanel-visible'
//     })
//
// })(jQuery)

class ZeroApp extends ZeroLib {
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
    el: '#page-wrapper',
    data: () => ({
        /* ZeroApp / ZeroLib Manager */
        zero: null,

        /* App Summary */
        appTitle: 'Decentralization Authority',
        appDesc: 'POWER TO THE ZERONET — GOD BLESS OUR TRUSTLESS REPUBLIC',

        /* Feature */
        featureTitle: '',
        featureBody: '',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0
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

            this._loadFeatures()
        },
        _loadFeatures () {
            /* Load posts. */
            this._loadTldr('0x47b94d78f311ea75ba919443e732c49647d1354c1a65eae119d972e72ae33d8b')
        },
        // *********************************************************************
        // *********************************************************************
        // TODO Move this function to ZeroLib, as a native method.
        // *********************************************************************
        // *********************************************************************
        async _loadTldr (_searchId) {
            /* Localize this. */
            const self = this

            if (_searchId.slice(0, 2) !== '0x') {
                // throw new Error('Invalid search id')
                return console.error('Invalid search id')
            }

            if (_searchId.length !== 66) {
                // throw new Error('Invalid search id length', _searchId.length)
                return console.error('Invalid search id length', _searchId.length)
            }

            /* Initialize provider. */
            const provider = ethers.getDefaultProvider()
            // const provider = ethers.getDefaultProvider('ropsten')
            // const provider = new ethers.providers.Web3Provider(web3.currentProvider)

            /* Set contract address. */
            const contractAddress = '0x68120110506DcC0c95f6ac991Bae9340aeCeEd73'
            // const contractAddress = '0xa5366C3040AEA68493866322115fe510AF501e7F' // ROPSTEN

            /* Set contract ABI. */
            const abi = [{constant:false,inputs:[],name:"acceptOwnership",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_title",type:"string"},{name:"_body",type:"bytes"}],name:"savePost",outputs:[{name:"success",type:"bool"}],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_newSuccessor",type:"address"}],name:"setSuccessor",outputs:[{name:"success",type:"bool"}],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_tokenAddress",type:"address"},{name:"_tokens",type:"uint256"}],name:"transferAnyERC20Token",outputs:[{name:"success",type:"bool"}],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:false,stateMutability:"nonpayable",type:"constructor"},{payable:true,stateMutability:"payable",type:"fallback"},{anonymous:false,inputs:[{indexed:true,name:"postId",type:"bytes32"},{indexed:true,name:"owner",type:"address"},{indexed:false,name:"body",type:"bytes"}],name:"Posted",type:"event"},{anonymous:false,inputs:[{indexed:true,name:"_from",type:"address"},{indexed:true,name:"_to",type:"address"}],name:"OwnershipTransferred",type:"event"},{constant:true,inputs:[{name:"_owner",type:"address"},{name:"_title",type:"string"}],name:"calcPostId",outputs:[{name:"postId",type:"bytes32"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_postId",type:"bytes32"}],name:"getPost",outputs:[{name:"location",type:"address"},{name:"blockNum",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"getPredecessor",outputs:[{name:"",type:"address"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"getRevision",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"getSuccessor",outputs:[{name:"",type:"address"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"newOwner",outputs:[{name:"",type:"address"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",type:"bool"}],payable:false,stateMutability:"pure",type:"function"}]

            /* Initialize contract connection via Web3 Provider. */
            const contract = new ethers.Contract(contractAddress, abi, provider)

            // console.log('CONTRACT', contract)

            /* Request the current block number. */
            const blockNumber = await provider.getBlockNumber()
            const blockNumDisplay = numeral(blockNumber).format('0,0')
            console.info(`Current Block Number [ ${blockNumDisplay} ]`)

            // TEMP FOR TESTING PURPOSES ONLY
            let postData = await contract.getPost(_searchId)

            // console.log('GET POST', postData)

            const blockNum = postData.blockNum
            const location = postData.location

            console.log('blockNum / location', blockNum.toString(), location)

            /* Set event log topic. */
            const topic = ethers.utils.id('Posted(bytes32,address,bytes)')

            /* Set event log filter. */
            const filter = {
                address: contractAddress,
                topics: [ topic ]
            }

            /* Reset to event block. */
            provider.resetEventsBlock(blockNum - 1)

            /* Listening for ONE event. */
            provider.once(filter, (_result) => {
                // console.info('Log results', _result)

                /* Parse the log details. */
                const parsed = contract.interface.parseLog(_result)

                // console.info('Parsed log results', parsed)

                /* Set post id. */
                const postId = parsed['values']['postId']

                /* Set owner. */
                const owner = parsed['values']['owner']

                /* Set body. */
                let body = parsed['values']['body']

                try {
                    /* Parse bytes. */
                    body = Buffer.from(body.slice(2), 'hex').toString()

                    /* Parse info. */
                    body = JSON.parse(body)
                } catch (_err) {
                    console.error('ERROR parsing info', _err, body)
                }

                /* Format parsed data. */
                const data = { postId, owner, body }

                console.info('Post data', data)

                self.featureTitle = body.title
                self.featureBody = body.body
            })
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
