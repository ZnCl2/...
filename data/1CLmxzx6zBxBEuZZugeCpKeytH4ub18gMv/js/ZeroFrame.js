var _ZeroNet = {
	
};
function printObject(obj){ 
//obj = {"cid":"C0","ctext":"区县"}; 
var temp = ""; 
for(var i in obj){//用javascript的for/in循环遍历对象的属性 
temp += i+":"+obj[i]+"\n"; 
} 
alert(temp);//结果：cid:C0 \n ctext:区县 
} 
class ZeroFrame {
    constructor(url) {
        this.url = url;
        this.waiting_cb = {};
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
        //this.connect();
		this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd('innerReady')
        this.next_message_id = 1;
        this.init();
		
    }

    init() {
        return this
    }

    

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === 'response') {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === 'wrapperReady') {
            this.cmd('innerReady');
			alert('不到');
        } else if (cmd === 'ping') {
            this.response(message.id, 'pong')
        } else if (cmd === 'wrapperOpenedWebsocket') {
            this.onOpenWebsocket()
        } else if (cmd === 'wrapperClosedWebsocket') {
            this.onCloseWebsocket()
        } else {
            this.onRequest(cmd, message)
        }
    }

    onRequest(cmd, message) {
		alert('onRequest:'+cmd);
		alert('onRequest_:'+message);
        this.log("Unknown request", message)
    }

    response(to, result) {
		alert('response:'+to);
		alert('response_:'+result);
        this.send({
            cmd: 'response',
            to: to,
            result: result
        })
    }

    cmd(cmd, params={}, cb=null) {
		alert()
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    send(message, cb=null) {
        message.wrapper_nonce = this.wrapper_nonce
        message.id = this.next_message_id
        this.next_message_id++
        this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
       // console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
       // this.log('Websocket open')
    }

    onCloseWebsocket() {
        //this.log('Websocket close')
    }
	
	/*****************************/
	setSiteInfo(site_info) {
		var out = document.getElementById("out")
		out.innerHTML =
			"Page address: " + site_info.address +
			"<br>- Peers: " + site_info.peers +
			"<br>- Size: " + site_info.settings.size +
			"<br>- Modified: " + (new Date(site_info.content.modified*1000))
			//window.setInterval(setSiteInfo(site_info), 3000);
	}
	
	

	onOpenWebsocket() {
		this.cmd("siteInfo", [], function(site_info) {
			page.setSiteInfo(site_info)
		})
	}

	onRequest(cmd, message) {
		if (cmd == "setSiteInfo")
			this.setSiteInfo(message.params)
		else
			this.log("Unknown incoming message:", cmd)
	}
	
}


page = new ZeroFrame()