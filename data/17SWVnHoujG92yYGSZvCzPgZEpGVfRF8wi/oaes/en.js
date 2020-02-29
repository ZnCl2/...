const oaesen = `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>AES Crypter</title>

  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet'  type='text/css'>
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/simple-sidebar.css" rel="stylesheet">
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/styles.css" rel="stylesheet">
  
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/jquery/jquery.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/js/FileSaver.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/js/hashes.min.js"></script>
  
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>AES Crypter</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>AES Crypter is a web application which decrypts and encrypts files using AES</p>

<div class="panel panel-default">
  <div class="panel-body">

<form id="aes" enctype="multipart/form-data" onsubmit="return false;">

<table class="table">

<tr id="md">

<td>File:</td>
<td>
      
<input id="file" type="file" name="userfile" class="file" size="50" onchange="GetFile(event);" autocomplete="off" required>
      
</td>

<td>
<img id="loading-f" src="./oaes/images/loader.svg" class="d-none" alt="loading" height="16" width="16">
</td>
 
</tr>

<tr>
<td>Password:</td>
<td>
  <input class="form-control" type="text" name="pass" id="pass" oninput="Calc();" required>
</td>
<td>
</td>
</tr>

<tr>
<td>Key:</td>
<td>
  <input class="form-control input-sm" type="text" name="key" id="key" readonly>
</td>
<td>
</td>
</tr>

<tr>
<td>IV:</td>
<td>
  <input class="form-control input-sm" type="text" name="ivector" id="ivector" readonly>
</td>
<td>
</td>
</tr>

<tr>

<td>

</td>
<td>

<button id="enc" type="submit" name="enc" class="btn btn-primary">Encrypt</button>    
<button id="dec" type="submit" name="dec" class="btn btn-primary">Decrypt</button>

<button id="reset" type="reset" value="Reset" class="btn btn-default btn-outline-dark">Reset</button>

<img id="loading-c" src="./oaes/images/loader.svg" class="d-none" alt="loading" height="16" width="16">

</td>
<td>
</td>
</tr>

</table>
     
</form>

</div>
</div>


</div>

<div class="center">

</div>

</div>

<script id="worker" type="javascript/worker">

//var iurl = "http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oaes/js/index.js";


importScripts('http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oaes/js/index.js');

self.addEventListener('message', function(e) {

  var d = e.data;
  
  var o =  d.split('*')[0];
  var k =  d.split('*')[1];
  var ivc =  d.split('*')[2];
  var dataURI =  d.split('*')[3];
      
  var BASE64_MARKER = ';base64,';

  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = atob(base64);
  var rawLength = raw.length;
  var rawlen = rawLength;
  var b = 0;
  
while (rawLength % 16 !== 0) {
  rawLength++;
  b += 1;
}

  rawLength += 16;
  b += 16;
  
  //b=rawLength-rawlen;
    
  var array = new Uint8Array(new ArrayBuffer(rawLength));
  array.fill(0);
    
for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
}    
 

if (  o  === "e" ){  
  
  array[rawLength-1] = rawLength-rawlen;
  array[rawLength-2] = (rawLength-rawlen)+1;
  
}
  
  var res;
 
  key = aesjs.utils.utf8.toBytes(k);
  iv = aesjs.utils.utf8.toBytes(ivc);     
  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

if (  o  === "d" ){
  
  res = aesCbc.decrypt(array);
  
  res = res.slice(0, rawlen);
  
  var z = res[rawlen-1];
  var z2 = res[rawlen-2];
  
if (  z  > 15 && z < 32 && z2 == (z+1)){
  
  res = res.slice(0, rawlen-z);

} else {

  res = "";

}
    
  self.postMessage(res);
  
} else {
  
  res = aesCbc.encrypt(array);
  
  self.postMessage(res);
    
}


  
}, false);

</script>


<script>

var puffer;
var worker;
var name;
var isfile;
var filesize;
var sfilename;

  var blob = new Blob([
    document.querySelector('#worker').textContent
  ], { type: "text/javascript" })


  var worker = new Worker(window.URL.createObjectURL(blob));


worker.addEventListener('message', function(e) {
   
  
  var bl=e.data;
  
  var blen = bl.length;
 

if (blen > 0){

  var blob = new Blob([bl], {type: "application/octet-stream"});
  
  var fileName = "download";

  saveAs(blob, name);
  EnableForm();  
  EnableForm2();
  
}
  

    
}, false);


$("#aes").submit(function(e){
     e.preventDefault();
});


window.onerror = function(msg) {

if (  isfile  == 1 ){
    
  $('#file').fileinput('clear');
    
}
  
  EnableForm();
  EnableForm2();
  
  return true;
}


function WorkerError(e) {
	EnableForm2();
}

worker.addEventListener("error", WorkerError, true);

function DisableForm() {
 
  $("#loading-f").removeClass("d-none");
  $("#aes input, #aes select, #reset, #dec, #enc").attr('disabled',true);
    
}

function DisableForm2() {
 
  $("#loading-c").removeClass("d-none");
  $("#aes input, #aes select, #reset, #dec, #enc").attr('disabled',true);
    
}

function EnableForm() {

if (  isfile  == 1 ){
  
  var l = puffer.length;

if (l <= 1){
  
  $('#file').fileinput('clear');
  
}
  
}
 
    isfile = 0;
    $("#loading-f").addClass("d-none");
    $("#aes input, #aes select, #reset, #dec, #enc").removeAttr('disabled');
    
}

function EnableForm2() {
    
    isfile = 0;
    $("#loading-c").addClass("d-none");
    $("#aes input, #aes select, #reset, #dec, #enc").removeAttr('disabled');
    
}


$( "#dec,#enc" ).click(function(event) {

  var o;

  var f = $('#file').val();
  var p = $('#pass').val();

if (  event.target.id  === "dec" ){
  o = "d";
  
  var ext = sfilename.substr(sfilename.lastIndexOf('.') + 1);

if (  ext.toLowerCase()  === "aes" ){
  name = sfilename.split('.').slice(0, -1).join('.');
} else {
  name="decoded";
}


} else {
  o = "e";
  name=sfilename+".aes";
}

  var f = $('#file').val();
  var p = $('#pass').val();

if (  p  != "" && f  != ""){

  DisableForm2();
  var k = $('#key').val();
  var v = $('#ivector').val();

  var s = o+"*"+k+"*"+v+"*"+puffer;

  worker.postMessage(s);

  return;
  
}

});

function Calc() {

  var MD5 = new Hashes.MD5;
  var SHA1 = new Hashes.SHA1;

  var p = $('#pass').val();
 
if (  p  === "" ){

  $('#key').val('');
  $('#ivector').val('');
  

} else {
 
  
  var k = MD5.hex(p);
  var v = SHA1.hex(k);
  
  var v = v.substring(0, 16);
  
  $("#key").val(k);
  $("#ivector").val(v);

}

}

function GetFile() {
 
  DisableForm();
  isfile = 1;
  puffer= "";
  
  var blob = document.getElementById("file").files[0];
  filesize = document.getElementById("file").files[0].size;
  
  sfilename = document.getElementById("file").files[0].name;
  
  var a = new FileReader();
  a.readAsDataURL(blob);

  
  a.onerror = function () {
   
    EnableForm();
    EnableForm2();

    return;
   
  }
  
  a.onloadend = function () {
      
  puffer=a.result;
  
  EnableForm();

};

}

</script>


</body>

</html>

`;

PMap.set("oaesen",oaesen);

