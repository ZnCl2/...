//blocbit site BTC total loop
function fn60sec() {
        $.getJSON('https://blockchain.info/q/addressbalance/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?format=json', function(data) {
	document.getElementById("btc").innerHTML = "" + data;
});
}
fn60sec();
setInterval(fn60sec, 60*60*1000);