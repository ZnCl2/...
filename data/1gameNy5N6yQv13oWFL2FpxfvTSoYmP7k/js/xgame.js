
// BLOCK COUNT STUFF
var blockCount = 0;

kickOffBlockCount();

function kickOffBlockCount () {
	getBlockCount();
	setTimeout(getBlockCount, 10000);
}

function getBlockCount() {
	$.getJSON('http://btc.blockr.io/api/v1/block/info/last', 
		function(data) {
			data = JSON.stringify(data);
			var output = $.parseJSON(data);
			var blockData = output.data;
			blockCount = blockData.nb;
		}
	);
}
// END BLOCK COUNT STUFF

// LAST TRANSACTION STUFF FOR TICK GAME
var tickLastBlock = 0;
var tickTx = "";
var tickBlockTime = 36;
var tickPriceToPayToPlay = "0.002";
var tickAddress = "1tickgDii3Vm6xnCDfWCxA6bAoZhqzyem";
var tickCurrentRound = 0;
var lastblockCount = 0;
var tickJackPot = 0;
var tmptickJackPot = 0;
var tickLastCalcBlock = 0;
var startTickCals = false;
var tickCalcHold = false;

$("#playamt").html(tickPriceToPayToPlay);
$("#dailyaddress").html("<p>"+tickAddress+"</p>");

kickOffTickStats(); // This is where the magic happens.

function kickOffTickStats () {
	getLastTransaction(tickAddress, tickPriceToPayToPlay);
	
	// Wait, then do it all over again.
	setTimeout(kickOffTickStats, 10000);
}

function calculateTickHoldings () {
	if (!tickCalcHold) {
		tickCalcHold = true;
		startTickCals = true;
		tmptickJackPot = 0;
		$.getJSON('http://btc.blockr.io/api/v1/address/txs/' + tickAddress + '?confirmations=0', 
			function(data) {
				data = JSON.stringify(data);
				var output = $.parseJSON(data);
				var txData = output.data;
				var list = txData.txs;
				$.each(list,function(i,item){
					if (startTickCals && tickPriceToPayToPlay == item.amount) {
						getTickHoldingBlock(item.tx);
					}
				});
				tickCalcHold = false; // Let's release the hold.
			}
		);
	}
}

function getTickHoldingBlock (tx){
	$.getJSON('http://btc.blockr.io/api/v1/tx/info/' + tx, 
		function(data) {
			data = JSON.stringify(data);
			var output = $.parseJSON(data);
			var txData = output.data;
			if (tickLastCalcBlock == 0 || (tickLastBlock - blockCount + tickBlockTime) > 0) {
				tickLastCalcBlock = txData.block;
				tmptickJackPot = parseFloat(tmptickJackPot) + parseFloat(tickPriceToPayToPlay);
				tickJackPot = tmptickJackPot;
				updateTickInterface();
			} else {
				startTickCals = false;
			}
		}
	);
}

function getTickJackpot () {
	var num = parseFloat(tickJackPot);
	return (num - (num * .10)).toString().substring(0, 6);
}

function updateTickInterface (nodata) {
	nodata = nodata || false;
	var noPlayMessage = "Be the first to play, send " + tickPriceToPayToPlay + " BTC to the address for this game.";
	if (nodata)
	{
		$("#tickblocktimer").html(noPlayMessage);
	} else {
		var blocksleft = tickBlockTime;
		if (tickLastBlock < blockCount) {
			blocksleft = ((tickLastBlock - blockCount) + tickBlockTime) - 1;
		}
		if (blocksleft > 0) {
			$("#tickblocktimer").html("<br>The last payer will get " + getTickJackpot() + " BTC in " + blocksleft + " blocks.");
			$("#lasttx").html("<b>Last player</b>: <a href='https://blockchain.info/tx/" + tickTx + "' target='_blank'>" + tickTx.substring(0, 20) + "...</a>");
			$("#tickPot").html(getTickJackpot());
			
			if (lastblockCount != blocksleft) {
				calculateTickHoldings();
				$("#countdown").countdown360({
						radius      : 60,
						seconds     : (blocksleft * 600),
						fontColor   : '#FFFFFF',
						autostart   : true,
						onComplete  : function () { console.log('done') }
						}).start()
				lastblockCount = blocksleft;
			}
		} else {
			$("#tickblocktimer").html(noPlayMessage);
			$("#countdown").html("");
		}
	}
}

function getLastTransaction (address, validAmt) {
	$.getJSON('http://btc.blockr.io/api/v1/address/info/' + address + '?confirmations=0', 
		function(data) {
			data = JSON.stringify(data);
			var output = $.parseJSON(data);
			var txData = output.data;
			var lastTx = txData.last_tx;
			if (lastTx != null) {
				if (lastTx.value == validAmt) {
					console.log(lastTx.value);
					tickLastBlock = lastTx.block_nb;
					tickTx = lastTx.tx;
					updateTickInterface();
				} else {
					setTickValidAmtAddressTxs(address, validAmt);
				}
			} else {
				updateTickInterface(true);
			}
		}
	);
}

function setTickValidAmtAddressTxs (address, validAmt){
	$.getJSON('http://btc.blockr.io/api/v1/address/txs/' + address + '?confirmations=0', 
		function(data) {
			data = JSON.stringify(data);
			var output = $.parseJSON(data);
			var txData = output.data;
			var list = txData.txs;
			var foundPlay = false;
			$.each(list,function(i,item){
				if (validAmt == item.amount) {
					foundPlay = true;
					tickTx = item.tx;
					setTickValidAmtLastBlock(tickTx);
				}
			});
			if (!foundPlay){
				updateTickInterface(true);
			}
		}
	);
}

function setTickValidAmtLastBlock (tx){
	$.getJSON('http://btc.blockr.io/api/v1/tx/info/' + tx, 
		function(data) {
			data = JSON.stringify(data);
			var output = $.parseJSON(data);
			var txData = output.data;
			tickLastBlock = txData.block;
			updateTickInterface();
		}
	);
}

// END LAST TRANSACTION STUFF FOR TICK GAME