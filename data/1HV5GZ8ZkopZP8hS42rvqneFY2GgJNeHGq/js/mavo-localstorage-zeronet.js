// Mavo storage decentralized and P2P backend using ZeroNet
// Based on https://github.com/lizziew/mavo-firebase/blob/master/mavo-firebase.js
// Version: 0.1.0

function debug(str) {}

(function($) {

if (!self.Mavo) {
	return
}

Mavo.Plugins.url = "js"

var _ = Mavo.Backend.register($.Class({
    extends: Mavo.Backend,
    id: "ZeroNet-Localstorage",
    constructor: function() {
	this.zero_frame = this.createZeroFrame()
	debug("Local ZeroStorage online")
	this.permissions.on(["read", "save", "edit"])
	this.updateData()
    },

    createZeroFrame: function() {
	var zero_frame = new ZeroFrame()
	zero_frame.site_info = null
	zero_frame.onOpenWebsocket = () => {
	    zero_frame.cmd("siteInfo", [], (site_info) => {
		zero_frame.site_info = site_info
		this.updateData()
	    })
	}
	zero_frame.onRequest = (cmd, message) => {
	    if (cmd == "setSiteInfo") {
		zero_frame.site_info = message.params
		if (zero_frame.site_info.event && zero_frame.site_info.event[0] == "cert_changed")
		    this.updateData()
	    } else
		console.log("Unknown incoming message:", cmd)
	}
	return zero_frame
    },

    isAuthenticated: function() {
	return (this.user.name != null)
    },

    get: function() {
	this.mavo.progress = "loading"
	if (!this.zero_frame.site_info)
	    return Promise.resolve({})

	return (new Promise((resolve, reject) => {
	    this.zero_frame.cmd("wrapperGetLocalStorage", [], (res) => {
		res = res ? res : {}
		debug("localstorage-zeronet GET: " + JSON.stringify(res, null, 2))
		resolve(res)
	    })
	}))
    },

    updateData: function() {
	this.load().then( (res) => this.mavo.render(res) )
    },

    put: function(data, path = this.path, o = {}) {
	var data_obj = JSON.parse(data)
	
	debug("Localstorage-zeronet PUT: " + JSON.stringify(data_obj, null, 2))
	return (new Promise((resolve, reject) => {
	    this.zero_frame.cmd("wrapperSetLocalStorage", data_obj, (res) => resolve())
	}))
    },

    static: {
	test: function(url) {
	    if(url.indexOf("zn_local") !== -1) {
		return url
	    } else {
		return false
	    }
	},
    }
}))

})(Bliss)
