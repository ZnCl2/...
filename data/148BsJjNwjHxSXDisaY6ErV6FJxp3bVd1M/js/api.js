

function convertStringToArrayBufferView(str)
{
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++) 
    {
        bytes[iii] = str.charCodeAt(iii);
    }

    return bytes;
}

function convertArrayBufferViewtoString(buffer)
{
    var str = "";
    for (var iii = 0; iii < buffer.byteLength; iii++) 
    {
        str += String.fromCharCode(buffer[iii]);
    }

    return str;
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).on('click', 'button.newPrivate', function(){
		$('#myModal .modal-header').empty();
		$('#myModal .modal-body').empty();
		$('#myModal .modal-footer').empty();
        var bitcore = require('bitcore-lib');
		var privateKey = new bitcore.PrivateKey();

		var address = privateKey.toAddress();
		var wifPrivate = privateKey.toWIF()
		var publicKey = privateKey.toPublicKey()
    
        
        
        var header = '<h2 class="modal-title text-center">BITCOIN WIF PRIVATE KEY</h2>';
        var body = '<textarea class="form-control" align="center">' + wifPrivate + '</textarea>';
        var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
        $('#myModal .modal-header ').html(header)
        $('#myModal .modal-body ').html(body)
        $('#myModal .modal-footer ').html(footer)
});

$(document).on('click', 'button.playNow', function(){
		$('#PlayGameDetail').show();
});

$(document).on('click', 'button.IWantToPlay', function(){
    var footer  = '<div align="center" class="form-group">' +
        '<input type="text" class = "form-control" id = "WifKey" placeholder="Amount in BTC"/><br>' +
        '</div>';
                
    $('#myModal .modal-footer ').html(footer)
});




$(document).on('click', 'button.existingUser', function(){
		$('#myModal .modal-header').empty();
		$('#myModal .modal-body').empty();
		$('#myModal .modal-footer').empty();
        

       
        var header = '<h2 class="modal-title text-center">ENTER YOUR WIF AND PASSWORD TO LOGIN:</h2>';
         var body = '<form  id="modal-form">' +
                '<div class="form-group">' +
                    '<input type="text" class = "form-control" id = "WifKey" placeholder="WIF KEY"/><br>' +
                    '<input type="password" class="form-control" id="encryptionKey" name="password" required="required" placeholder="Password:"/><br>' +
                    '<p align ="center"><button type="button" id= "encryptWif" class="btn btn-success encryptWif" >SIGN IN...</button></p>'
                '</div>' +
            '</form>';
        var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
        $('#myModal .modal-header ').html(header)
        $('#myModal .modal-body ').html(body)
        $('#myModal .modal-footer ').html(footer)
        
        
         
        
});








$(document).on('click', '.logout', function(){
	localStorage.removeItem('bitcoin_address');	
    localStorage.removeItem('pub_key');
    $('.no-active-user').show();
    $('.active-user').hide();
    $('#PlayGameDetail').hide();
});


$(document).on('click', 'button.joinGame', function(){
        $('#myModal3 .modal-header').empty();
		$('#myModal3 .modal-body').empty();
		$('#myModal3 .modal-footer').empty();
        var bitcore = require('bitcore-lib');
		var privateKey = new bitcore.PrivateKey();

		var address = privateKey.toAddress();
		var wifPrivate = privateKey.toWIF();
		var publicKey = privateKey.toPublicKey();
        console.log("This is user address :", address);
        console.log("This is user wifPrivate:", wifPrivate);
        console.log("This is user public key:", publicKey);
        
        //admin pubkeys
        admin_pub = ['02853d6d1a2710f2083bb41b99b6a414c6c767ed388e53ad83f98ffa5799d6ca67','02550c2b1c6d074b50a5191648cc07a94cbd18910541f875f1a12487b16ae29cb2'];
        admin_pub.push(publicKey);
        
        var requiredSignatures = 2;

        var depositAddress = new bitcore.Address(admin_pub, requiredSignatures);
        console.log("This is user depositAddress", depositAddress);
        var message = "#newplayer" + "#" + address + "#" + publicKey;
        var header = '<h4 class="modal-title text-center" style = "margin: 0 auto;" ><i>Congratulations...</h4><i>';
        var body = "<p> Dear User: </p>" +
            '<p>Shown below is your private key and a depositAddress where you can send "ANY" amount of Bitcoin (BTC) in order to participate. Once the Deposit has been made into the Deposit Address. Kindly send a message[MESSAGE] to this address<b> BM-2cTWfgfaXVgri2nz1oehamAAFy4MtENU8L (BITMESSAGE)</b></p><br>' +
            '<p><b>Note: </b> If the message below is not sent or forwarded to the Bitmessage Address given. It will not be considered. Kindly copy all the details shown before sending any BTC. The content of this page will refresh everytime. If you have some question. You can also reach us at the given Bitmessage address</p>' +
            '<p><b> Your Private Key : </b> </p>' +
            '<p>' + wifPrivate + '</p>'+
            '<p><b> Deposit Address: </b></p>' +
            '<p>' + depositAddress + '</p>' +
            '<p><b> Message: </b></p>' +
            '<p><textarea class = "form-control">' + message + '</textarea></p>'

            ;
        var footer = "<p>Thank you very much.</p>";
        $('#myModal3 .modal-footer').html(footer);
        $('#myModal3 .modal-header').html(header);
        $('#myModal3 .modal-body').html(body);
        
});

$(document).ready(function(){

   




// Set the date we're counting down to
var countDownDate = new Date("Dec 12, 2018 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("countdown").innerHTML = days + " days " + hours + " hours "
    + minutes + " minutes " + seconds + " seconds ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "END OF GAME";
    }
}, 1000);


});