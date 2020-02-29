const ob64en = `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>Base64 Online De-/Encoder</title>

  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet'  type='text/css'>
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/simple-sidebar.css" rel="stylesheet">
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/styles.css" rel="stylesheet">
  
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/jquery/jquery.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/js/FileSaver.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/js/he.min.js"></script>
  
</head>

<body>


<script id="worker" type="javascript/worker">

self.addEventListener('message', function(e) {

    var e = e.data;

    var binary_string = e;    

    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
	self.postMessage(bytes.buffer);
  
}, false);

</script>

<script id="worker2" type="javascript/worker">

self.addEventListener('message', function(e) {

    var e = e.data;

    var binary_string = atob(atob(e));
 
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
	self.postMessage(bytes.buffer);
  
}, false);

</script>

<script>

  var blob = new Blob([
    document.querySelector('#worker').textContent
  ], { type: "text/javascript" })

  var blob2 = new Blob([
    document.querySelector('#worker2').textContent
  ], { type: "text/javascript" })

  var worker = new Worker(window.URL.createObjectURL(blob));
  var worker2 = new Worker(window.URL.createObjectURL(blob2));

  worker.addEventListener('message', function(e) {
    
  var bl=e.data;

  var file = new File([bl], "encoded", {type: "octet/stream"});

  $("#loading-c").addClass("d-none");
  grayer("b64", 0);

  saveAs(file);    
      
}, false);

  worker2.addEventListener('message', function(e) {
    
  var bl=e.data;

  var file = new File([bl], "decoded", {type: "octet/stream"});

  $("#loading-c").addClass("d-none");
  grayer("b64", 0);

  saveAs(file);    
      
}, false);

worker.onerror = function (err) {

  alert("Error");
  $("#loading-c").addClass("d-none");
  grayer("b64", 0);

};

worker2.onerror = function (err) {

  alert("Error");
  $("#loading-c").addClass("d-none");
  grayer("b64", 0);

};

var encoded;

function grayer(formId, yesNo) {
   var f = document.getElementById(formId), s, opacity;
   s = f.style;
   opacity = yesNo? '40' : '100';
   s.opacity = s.MozOpacity = s.KhtmlOpacity = opacity/100;
   s.filter = 'alpha(opacity='+opacity+')';
   for(var i=0; i<f.length; i++) f[i].disabled = yesNo;
}

  function GetFile(evt) {

$("#loading-f").removeClass("d-none");
   grayer("b64", 1);
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      
        var contents = e.target.result;
	encoded = contents;
	grayer("b64", 0);
	$("#loading-f").addClass("d-none");

      }
      r.readAsDataURL(f);
    }
  }

document.getElementById("b64").addEventListener("reset", myFunction);



function myFunction() {
$("#b64otr1").addClass("d-none");
$("#b64otr2").addClass("d-none");
$('#base64output').text("");
}



function Close(){

$("#b64otr1").addClass("d-none");
$("#b64otr2").addClass("d-none");
$('#base64output').text("");

}

function B64Encode()
{

$("#loading-c").removeClass("d-none");
grayer("b64", 1);

var fileName = $("#file").val();
var t = $('#base64input').val();


if(fileName){

var str = encoded.split(",");

str = str[1];

	worker.postMessage(str);

if (t.length < 1) {
return;

}

}




if (t.length < 1) {


$("#loading-c").addClass("d-none");
grayer("b64", 0);
return;

}

if (t) {


$('#base64output').text(window.btoa(t));

$("#b64otr1").removeClass("d-none");
$("#b64otr2").removeClass("d-none");

$("#loading-c").addClass("d-none");
grayer("b64", 0);

}

}

function B64Decode()
{


$("#loading-c").removeClass("d-none");

grayer("b64", 1);

var fileName = $("#file").val();
var t = $('#base64input').val();

if(fileName){

var str = encoded.split(",");

worker2.postMessage(str[1]);

if (t.length < 1) {
return;

}

}



if (t.length < 1) {


$("#loading-c").addClass("d-none");
grayer("b64", 0);
return;

}


if (t) {


try {
  
  var res = window.atob(t);

}
catch(err) {

  $("#b64otr1").removeClass("d-none");
  $("#b64otr2").removeClass("d-none");  
  $("#loading-c").addClass("d-none");

  grayer("b64", 0);

  alert("Error");

  return;

}


if (t === btoa(res)) {

$('#base64output').text(res);

$("#b64otr1").removeClass("d-none");
$("#b64otr2").removeClass("d-none");
$("#loading-c").addClass("d-none");

grayer("b64", 0);


}else{

$("#b64otr1").addClass("d-none");
$("#b64otr2").addClass("d-none");  
$("#loading-c").addClass("d-none");

grayer("b64", 0);

alert("Error");




}


}

}

</script>

<script>

function DownloadFile()
{

var t = $('#base64output').val();

    var binary_string = t;    

    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }

  var file = new File([bytes.buffer], "download", {type: "octet/stream"});
  saveAs(file);  

}

</script>


<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Base64 Online De-/Encoder</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Base64 Online De-/Encoder is a web application which decodes and encodes files and strings using the Base64 algorithm.
</p>

<div class="panel panel-default">
  <div class="panel-body">

<form id="b64" enctype="multipart/form-data" onsubmit="return false;">

<table class="table">

<tr id="md">

<td>File:</td>
<td>
      
<input id="file" type="file" name="userfile" class="file" size="50" onchange="GetFile(event);" autocomplete="off" >
      
</td>

<td>
<img id="loading-f" src="./ob64/images/loader.svg" class="d-none" alt="loading" height="16" width="16">
</td>
 
</tr>

<tr>
<td>Input:</td>
<td>
<textarea class="form-control" rows="5" id="base64input" name="base64input"></textarea>
</td>
<td>
</td>
</tr>


<tr>

<td>

</td>
<td>

<button id="decode" onclick="B64Decode()" type="submit" name="decode" class="btn btn-primary">Decode</button>

<button id="encode" onclick="B64Encode()" type="submit" name="encode" class="btn btn-primary">Encode</button>
<button onclick="Close();" id="reset" type="reset" value="Reset" class="btn btn-default btn-outline-dark">Reset</button>


<img id="loading-c" src="./ob64/images/loader.svg" class="d-none" alt="loading" height="16" width="16">

</td>
<td>
</td>
</tr>

<tr id="b64otr1" class="d-none">
<td>Output:</td>
<td>

<textarea class="form-control" rows="5" id="base64output" readonly></textarea>
      
</td>
<td>
</td>
</tr>

<tr id="b64otr2" class="d-none">
<td>
</td>
<td>
     
<button class="btn btn-primary" onclick="DownloadFile()" id="download">Download</button>
<button class="btn btn-default btn-outline-dark" onclick="Close()">Close</button>
     
</td>
<td>
</td>
</tr>

</table>
     
</form>

</div>
</div>

</div>

</div>

<script>

  document.getElementById('file').addEventListener('change', GetFile, false);

</script>


</body>

</html>

`;

PMap.set("ob64en",ob64en);

