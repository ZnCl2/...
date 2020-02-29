invoice = {
	"address":"",
	"balance":0,
	"needed":0,
	"percent": 0,
	"title":"",
	"description":"",
	"shortURL": "",
	"invoiceType":"",
	"open": function()
	{

		hash = window.location.hash.substring(1);

		invoiceURL = "http://modules.thnxbot.com/wallets/rushwallet/request/" + document.location.hash;

	    invoice.getShort( invoiceURL , function( short )
    	{
    		invoice.shortURL = short;
    		$("#shareLink").html( short );
    	});

		objStr = decodeURIComponent( atob(  hash ) );

		obj = JSON.parse( objStr );

		this.invoiceType = obj.type;

		if ( this.invoiceType == "SmartFund" )
		{
			$("#fundraiserHelp").show();
		}
		else
		{
			$("#paymentRequestHelp").show();
		}

		$("#addressInvoice").html( htmlEncode( obj.address ) );
		$("#invoiceID").html( getTypeName(obj.type)  + " ID: " + htmlEncode( obj.invoiceid ) );
		
		if ( obj.video !="" && obj.video != undefined )
		{
			if ( idVideo = getVideoID( obj.video ) )
			{
				$("#video").html( '<object width="100%" height="100%"data="https://www.youtube.com/v/' + idVideo + '?autohide=1&showinfo=0"></object>').show();

			}
		}

		if ( obj.description !="" && obj.description != undefined )
		{

			invoice.description = obj.description;

			if ( obj.description.length > 330 )
			{
				description = invoice.description.substring(0,330) + "... rdzmore";
				$("#readMore").show();
			}
			else
			{
				description = invoice.description;
			}


			$("#invoiceDescription").html( replaceURLWithHTMLLinks( htmlEncode( description ).replace(/(?:\r\n|\r|\n)/g,"<br/>") ).replace("rdzmore", '<span id="readMore">read more</span>') );

			if ( obj.description.length > 200 )
			{
				$("#invoiceDescription").css({"text-align":"left"})
			}

		}
		else
		{
			$("#invoiceDescription").hide();
		}

		invoice.title = obj.title;

		$(".KKBrand").html( htmlEncode( getTypeName( obj.type ) ) );

		$("title").html( "RushWallet " + htmlEncode( getTypeName( obj.type ) ) + " - " + htmlEncode( obj.title ) );

		$("meta[property='og\\:title']").attr("content", "RushWallet " + htmlEncode(getTypeName( obj.type )) + " - " + htmlEncode( obj.title ) );
		$("meta[property='og\\:description']").attr("content", "RushWallet " + htmlEncode(obj.description) + " - " + htmlEncode( obj.title ) );
		$("meta[name='description']").attr("content", "RushWallet " + htmlEncode(obj.description) + " - " + htmlEncode( obj.title ) );

		this.address = obj.address;
		this.needed = parseFloat( obj.amount );

		if ( obj.type == "SmartRequest" )
		{
			$("#raisedTxtTxt").html("Paid");
			$("#goalTxtTxt").html("Total Owed");
		}
		else
		{
			$("#receiveCount").show();
			$("#leftInfoInvoice").css({height:"310px"});
			$("#addressTxtInvoice").css({"margin-top":"40px"});
		}

		$("#invoiceTitle").html( htmlEncode(obj.title) );


		//Socket
		var socket = new WebSocket("wss://ws.blockchain.info/inv");

		socket.onopen = function (msg)
		{
		    var message = {
		        "op": 'addr_sub',
		        "addr": invoice.address
		    };

		    socket.send(JSON.stringify(message));
		}

		socket.onmessage = function (msg)
		{
		    setTimeout(function ()
		    {
		        invoice.getBalance();
		        // playBeep();
		    }, 500);
		}

		//End Socket

		invoice.getBalance();
		$(".qrimage").attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=bitcoin%3A" + this.address + "&chld=H|0")

	
	},
	"getShort": function ( url, func )
	{
		$.ajax({
		    type: "POST",
		    url: "https://www.googleapis.com/urlshortener/v1/url",
		    async: true,
		    data: JSON.stringify( { "longUrl": url } ),
		    dataType: "json",
		    contentType: "application/json"

		}).done(function (msg) {
		    
			func( msg.id );

		});
	},
	"getFiatPrice": function ()
	{
	    $.ajax({
	        type: "GET",
	        url: "http://modules.thnxbot.com/wallets/rushwallet/ticker2.php",
	        async: true,
	        data: {},
	        dataType: "json"

	    }).done(function (msg) {
	        

	        price = msg['USD'].last;

	        invoice.price = price;

	        invoice.getFiatValue();


	    });

	},
	"getFiatValue": function ()
	{
	    fiatGoal = this.price * this.needed;
	    fiatRaised = this.price * this.balance;

	    $("#fiatGoal").html( "($" + formatMoney(  fiatGoal.toFixed(2) )  + ")");

	    $("#fiatRaised").html("($" + formatMoney(  fiatRaised.toFixed(2)  ) + ")");
	},
	"getBalance": function ()
	{
	    var url = "https://blockchain.info/multiaddr?cors=true&active=" + this.address + "&limit=0";
	    $.ajax(
	    {
	        type: "GET",
	        url: url,
	        async: true,
	        dataType: "json",
	        data:
	        {}

	    }).done(function (msg)
	    {

	    	msg = msg.addresses[0];
	        invoice.balance = parseInt(msg.total_received) / 100000000;
	        
	        if ( msg.n_tx != 1 )
	        	s = "s"; 
	        else
	        	s = "";

	        $("#receiveCount").html(htmlEncode( msg.n_tx.toString() ) + " contribution" + s)

	        $("#btcBalance").html( btcFormat( invoice.balance ) );

	        amountNeeded = invoice.needed -invoice.balance;
	        amountNeeded = amountNeeded.toFixed(8);

	        $("#leftInfoInvoice").animate({opacity:1}, 1000);


	        $("#amountNeeded").html("฿" + invoice.needed.toFixed(8) + "");

	        percent = Math.floor((invoice.balance / invoice.needed) * 100);

	        animateProgress( percent, invoice.percent );

	        invoice.percent = percent;


	        if ( amountNeeded > 0 )
	        {
	        	// $(".progress-bar").css({"min-width":"25px",width:percent+"%"});

	        	// $("#percentAmount").html(parseInt(percent) +"%");
	        }
	        else
	        {

	        	

	        }



	        invoice.getFiatPrice();


	    });



	}


};

$(document).ready(function ()
{

	invoice.open();

	$(document).on("click", '#info', function (e)
	{
	    $("#infoModal").modal("show");
	}); 

	$(document).on("click", '.closeModal', function (event)
	{
	    $("#infoModal").modal("hide");
	});  
	
	$(document).on("click", '#readMore', function (event)
	{
		$("#invoiceDescription").html( replaceURLWithHTMLLinks( htmlEncode( invoice.description ).replace(/(?:\r\n|\r|\n)/g,"<br/>") ) );
	});  

	$(document).on("click", '#fbShare', function (event)
	{
    	url='https://www.facebook.com/dialog/feed?app_id=727307003985302&display=popup&caption=' + encodeURIComponent("RushWallet " + getTypeName( invoice.invoiceType ) ) + '&name=' + encodeURIComponent( invoice.title ) + '&description=' + encodeURIComponent( invoice.description.substring(0,160) ) + '&link=' + invoice.shortURL + '&picture=' + encodeURIComponent( "http://modules.thnxbot.com/wallets/rushwallet/img/fb.png" ) + '&redirect_uri=http://modules.thnxbot.com/wallets/rushwallet/close.html';

    	popupwindow( url, "Facebook Share", 500, 300)
    	
	});

	$(document).on("click", '#twitterShare', function (event)
	{
	    url='http://twitter.com/share?text=' + encodeURIComponent( invoice.title + " - " + " #RushWallet " + getTypeName( invoice.invoiceType )  ) + "&url=" + encodeURIComponent( invoice.shortURL ) ;

	   
    	popupwindow( url, "Twitter Share", 500, 300)
	});


});

function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function btcFormat (amount)
{
    return amount.toFixed(8);
}

function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
 
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function animateProgress(percent, count)
{
	if (!count)
		count = 0;


	if ( percent < 50 )
	{
		speed = 20;
	}
	else if ( percent < 30 )
	{
		speed = 30;
	}
	else
	{
		speed = 10;
	}

		if ( count < percent )
		{
			setTimeout( function()
			{
				count++;
				drawProgress( Math.floor(count) );
				animateProgress( percent, count );
			}, speed);
		}
		
}

var drawProgress = function(percent){
  if(isNaN(percent)) {
    return;
  }

  if (percent >= 100)
  {
  	if ( percent > 100 )
  	{
  		$("#progressDesc").html("Over Funded!").show();

  	}
  	else
  	{
  		$("#progressDesc").html("Fully Funded").show();
  	}

  	$(".progress-radial-bar").css({"fill":"#1B8600"});

  }

  


  percent /= 100;

  percent = parseFloat(percent);

  $("#progressText").text( Math.floor(percent * 100) + "%");

  var bar = document.getElementsByClassName ('progress-radial-bar')[0]
  , α = percent * 360
  , π = Math.PI
  , t = 90
  , w = 141;
  if(α >= 360) {
    α = 359.999;
  }
  var r = ( α * π / 180 )
  , x = Math.sin( r ) * w
  , y = Math.cos( r ) * - w
  , mid = ( α > 180 ) ? 1 : 0 
  , animBar = 'M 0 0 v -%@ A %@ %@ 1 '.replace(/%@/gi, w)
  + mid + ' 1 '
  + x + ' '
  + y + ' z';
  bar.setAttribute( 'd', animBar );
};


function formatMoney(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}

function getTypeName ( type )
{
    if ( type == "SmartRequest" )
    {
        return "Payment Request";
    }
    else
    {
        return "Fundraiser";
    }
}

function getVideoID(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}