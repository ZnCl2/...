zeroFrame = new ZeroFrame(); // create new ZeroFrame instance

function sendMessage(text) {
    zeroFrame.cmd("peerBroadcast", [text]); // send message "text" to everybody
}

zeroFrame.onRequest = function(cmd, message) { // When we receive a message
    if(cmd == "peerReceive") { // and it's from PeerMessage plugin
        let text = message.params.message;
        console.log(text); // show it

        zeroFrame.cmd("peerValid", [message.params.hash]); // This message is correct - broadcast to other peers
    }
}
