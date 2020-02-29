/* Set provider. */
// NOTE We are curretnly still deployed to Ropsten (Testnet)
const provider = ethers.getDefaultProvider()

/* Set contract address. */
const contractAddress = '0xeA5a490Fb229C71c0da384a6eA1426eb804B0652'

/* Set contract ABI. */
const abi = [{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"zitetagId","type":"bytes32"},{"indexed":false,"name":"zitetag","type":"string"},{"indexed":false,"name":"info","type":"string"}],"name":"ZitetagUpdate","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_zitetag","type":"string"},{"name":"_info","type":"string"}],"name":"setInfo","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"name":"_zitetag","type":"string"}],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zer0netDb","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

/* Initialize contract connection via Web3 Provider. */
const contract = new ethers.Contract(contractAddress, abi, provider)

/**
 * Vue Application Manager (Configuration)
 */
const vueAppManager = {
    el: '#app',
    data: () => ({
        /* ZeroApp / ZeroApi Manager */
        zero: null,

        /* App Summary */
        appTitle: 'Hell0',
        appDesc: 'Boilerplate Zer0net template for advanced (dynamic) zite creation.',

        /* Event Logs */
        events: []
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        // TODO
    },
    methods: {
        _init: async function () {
            /* Request the current block number. */
            const blockNumber = await provider.getBlockNumber()
            const blockNumDisplay = numeral(blockNumber).format('0,0')
            console.info(`Current Block Number [ ${blockNumDisplay} ]`)

            // TEMP FOR TESTING PURPOSES ONLY
            let currentValue = await contract.getInfo('bitcore')
            console.log('GET INFO', currentValue)

            /* Set event log topic. */
            const topic = ethers.utils.id('ZitetagUpdate(bytes32,string,string)')

            /* Set event log filter. */
            const filter = {
                address: contractAddress,
                topics: [ topic ]
            }

            /* Set 24-hour blocks estimate. */
            const numBlockLast24 = 5760

            /* Reset provider to last 24 hours. */
            provider.resetEventsBlock(blockNumber - numBlockLast24)
            // Contract testing started at 4,273,338

            /* Start listening for events. */
            provider.on(filter, (_result) => {
                // console.info('Log results', _result)

                /* Parse the log details. */
                const parsed = contract.interface.parseLog(_result)
                // console.info('Parsed log results', parsed)

                /* Set zitetag id. */
                const zitetagId = parsed['values']['zitetagId']

                /* Set zitetag. */
                const zitetag = parsed['values']['zitetag']

                /* Initialize (registration) info. */
                let info = {}

                try {
                    /* Parse info. */
                    info = JSON.parse(parsed['values']['info'])
                } catch (_err) {
                    console.error('ERROR parsing info', _err)
                }

                /* Format parsed data. */
                const data = { zitetagId, zitetag, info }

                // console.info('Log data', data)

                /* Add data to TOP of list. */
                this.events.unshift(data)
            })
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
