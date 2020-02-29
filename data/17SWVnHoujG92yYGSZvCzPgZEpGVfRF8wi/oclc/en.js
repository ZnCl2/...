const oclcen = `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>Checksum Calculator</title>

  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet'  type='text/css'>
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/simple-sidebar.css" rel="stylesheet">
  <link href="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/css/styles.css" rel="stylesheet">
  
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/jquery/jquery.min.js"></script>
  <script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Checksum Calculator</h1>
</td>
<td>
<div class="flr">
</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Checksum Calculator is a web application which calculates the (CRC32, MD5, SHA1, SHA2, SHA3) hash of files and strings.</p>


<div class="panel panel-default">
  <div class="panel-body">

<form id="calc" enctype="multipart/form-data" onsubmit="Stop();">

<table class="table">

<tr id="md">

<td>File:</td>
<td>
      
<input id="file" type="file" name="userfile" class="file" size="50" onchange="GetFile(event);">
      
</td>

<td>
<img id="loading-f" src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/images/loader.svg" class="d-none" alt="loading">
</td>
 
</tr>


<tr>
<td>Input:</td>
<td>
<textarea class="form-control" rows="3" id="textinput" name="textinput"></textarea>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="crc32-c" name="crc32-c" > CRC32</td>
<td>
<input class="form-control input-sm" type="text" id="CRC32" name="CRC32"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="md5-c" name="md5-c" > MD5</td>
<td>
<input class="form-control input-sm" type="text" name="MD5" id="MD5"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha1-c" name="sha1-c" > SHA1</td>
<td>
<input class="form-control input-sm" type="text" name="SHA1" id="SHA1"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha224-c" name="sha224-c" > SHA224</td>
<td>
<input class="form-control input-sm" type="text" name="SHA224" id="SHA224"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha256-c" name="sha256-c" > SHA256</td>
<td>
<input class="form-control input-sm" type="text" name="SHA256" id="SHA256"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha384-c" name="sha384-c" > SHA384</td>
<td>
<input class="form-control input-sm" type="text" name="SHA384" id="SHA384"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha512-c" name="sha512-c" > SHA512</td>
<td>
<input class="form-control input-sm" type="text" name="SHA512" id="SHA512"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha3224-c" name="sha3224-c" > SHA3-224</td>
<td>
<input class="form-control input-sm" type="text" name="SHA3224" id="SHA3224"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha3256-c" name="sha3256-c" > SHA3-256</td>
<td>
<input class="form-control input-sm" type="text" name="SHA3256" id="SHA3256"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha3384-c" name="sha3384-c" > SHA3-384</td>
<td>
<input class="form-control input-sm" type="text" name="SHA3384" id="SHA3384"  readonly>
</td>
<td>
</td>
</tr>

<tr>
<td><input type="checkbox" id="sha3512-c" name="sha3512-c" > SHA3-512</td>
<td>
<input class="form-control input-sm" type="text" name="SHA3512" id="SHA3512"  readonly>
</td>
<td>
</td>
</tr>

<tr>

<td>
<div id="all" class="d-none"><input type="checkbox" id="select_all" > All</div>
</td>
<td>
    
<div id="buttonjs">

<button id="calculate" type="submit" name="calculate" class="btn btn-primary" onClick="Calculate();">Calculate</button>

<button id="reset" type="reset" value="Reset" class="btn btn-default btn-outline-dark">Reset</button>

<img id="loading-c" src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/images/loader.svg" class="d-none" alt="loading">

</div>

</td>
<td>
</td>
</tr>
<tr>

</tr>
</table>
     
</form>
  
</div>
  
</div>


<script id="sha1worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha1.js");self.addEventListener("message",function(a){a=a.data;var b=new jsSHA("SHA-1","ARRAYBUFFER");b.update(a);a=b.getHash("HEX");self.postMessage(a)},!1);

</script>

<script id="sha224worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha256.min.js");function sha_224(a){return sha224(a)}self.addEventListener("message",function(a){a=sha_224(a.data);self.postMessage(a)},!1);

</script>

<script id="sha256worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha256.min.js");function sha_256(a){return sha256(a)}self.addEventListener("message",function(a){a=sha_256(a.data);self.postMessage(a)},!1);

</script>

<script id="sha384worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha512.js");self.addEventListener("message",function(a){a=a.data;var b=new jsSHA("SHA-384","ARRAYBUFFER");b.update(a);a=b.getHash("HEX");self.postMessage(a)},!1);

</script>

<script id="sha512worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha512.js");self.addEventListener("message",function(a){a=a.data;var b=new jsSHA("SHA-512","ARRAYBUFFER");b.update(a);a=b.getHash("HEX");self.postMessage(a)},!1);

</script>

<script id="sha3512worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha3.js");self.addEventListener("message",function(a){a=sha3_512(a.data);self.postMessage(a)},!1);

</script>

<script id="sha3384worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha3.js");self.addEventListener("message",function(a){a=sha3_384(a.data);self.postMessage(a)},!1);

</script>

<script id="sha3256worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha3.js");self.addEventListener("message",function(a){a=sha3_256(a.data);self.postMessage(a)},!1);

</script>

<script id="sha3224worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha3.js");self.addEventListener("message",function(a){a=sha3_224(a.data);self.postMessage(a)},!1);

</script>

<script id="md5worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/spark-md5.min.js");self.addEventListener("message",function(a){a=SparkMD5.ArrayBuffer.hash(a.data);self.postMessage(a)},!1);

</script>

<script id="crc32worker" type="javascript/worker">

importScripts("http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/crc32.js");function decimalToHexString(a){0>a&&(a=4294967295+a+1);return a.toString(16)}self.addEventListener("message",function(a){a=CRC32.buf(a.data);self.postMessage(decimalToHexString(a))},!1);

</script>


<script>

var text,buffer,ua,c=0,crc32r,md5r,sha1r,sha224r,sha256r,sha384r,sha512r,sha3224r,sha3256r,sha3384r,sha3512r,sha1blob=new Blob([document.querySelector("#sha1worker").textContent],{type:"text/javascript"}),sha224worker=new Blob([document.querySelector("#sha224worker").textContent],{type:"text/javascript"}),sha256worker=new Blob([document.querySelector("#sha256worker").textContent],{type:"text/javascript"}),sha384worker=new Blob([document.querySelector("#sha384worker").textContent],{type:"text/javascript"}),
sha512worker=new Blob([document.querySelector("#sha512worker").textContent],{type:"text/javascript"}),sha3512worker=new Blob([document.querySelector("#sha3512worker").textContent],{type:"text/javascript"}),sha3384worker=new Blob([document.querySelector("#sha3384worker").textContent],{type:"text/javascript"}),sha3256worker=new Blob([document.querySelector("#sha3256worker").textContent],{type:"text/javascript"}),sha3224worker=new Blob([document.querySelector("#sha3224worker").textContent],{type:"text/javascript"}),
md5worker=new Blob([document.querySelector("#md5worker").textContent],{type:"text/javascript"}),crc32worker=new Blob([document.querySelector("#crc32worker").textContent],{type:"text/javascript"}),workersha1=new Worker(window.URL.createObjectURL(sha1blob)),workersha224=new Worker(window.URL.createObjectURL(sha224worker)),workersha256=new Worker(window.URL.createObjectURL(sha256worker)),workersha384=new Worker(window.URL.createObjectURL(sha384worker)),workersha512=new Worker(window.URL.createObjectURL(sha512worker)),
workersha3512=new Worker(window.URL.createObjectURL(sha3512worker)),workersha3384=new Worker(window.URL.createObjectURL(sha3384worker)),workersha3256=new Worker(window.URL.createObjectURL(sha3256worker)),workersha3224=new Worker(window.URL.createObjectURL(sha3224worker)),workermd5=new Worker(window.URL.createObjectURL(md5worker)),workercrc32=new Worker(window.URL.createObjectURL(crc32worker));workersha1.addEventListener("error",ErrorSHA1,!1);workermd5.addEventListener("error",ErrorMD5,!1);
workersha224.addEventListener("error",ErrorSHA224,!1);workersha256.addEventListener("error",ErrorSHA256,!1);workersha384.addEventListener("error",ErrorSHA384,!1);workersha512.addEventListener("error",ErrorSHA512,!1);workersha3512.addEventListener("error",ErrorSHA3512,!1);workersha3384.addEventListener("error",ErrorSHA3384,!1);workersha3256.addEventListener("error",ErrorSHA3256,!1);workersha3224.addEventListener("error",ErrorSHA3224,!1);workercrc32.addEventListener("error",ErrorCRC32,!1);
workersha3224.addEventListener("message",function(a){sha3224r=a.data},!1);workersha3256.addEventListener("message",function(a){sha3256r=a.data},!1);workersha3384.addEventListener("message",function(a){sha3384r=a.data},!1);workersha3512.addEventListener("message",function(a){sha3512r=a.data},!1);workersha1.addEventListener("message",function(a){sha1r=a.data},!1);workersha224.addEventListener("message",function(a){sha224r=a.data},!1);
workersha256.addEventListener("message",function(a){sha256r=a.data},!1);workersha384.addEventListener("message",function(a){sha384r=a.data},!1);workersha512.addEventListener("message",function(a){sha512r=a.data},!1);workermd5.addEventListener("message",function(a){md5r=a.data},!1);workercrc32.addEventListener("message",function(a){crc32r=a.data},!1);$("#select_all").click(function(){var a=this.checked;$(":checkbox").prop("checked",a)});$(document).ready(function(){$("#all").removeClass("d-none")});
function decimalToHexString(a){0>a&&(a=4294967295+a+1);return a.toString(16)}
function ClearFields(){document.getElementById("CRC32").value="";document.getElementById("MD5").value="";document.getElementById("SHA1").value="";document.getElementById("SHA224").value="";document.getElementById("SHA256").value="";document.getElementById("SHA384").value="";document.getElementById("SHA512").value="";document.getElementById("SHA3224").value="";document.getElementById("SHA3256").value="";document.getElementById("SHA3384").value="";document.getElementById("SHA3512").value=""}$("form").submit(function(a){a.preventDefault()});
$("form").on("reset",function(a){$("#textinput").removeAttr("disabled");c=0;buffer=ua=""});function SHA1Form(a,b){c=b.toLowerCase()+"-c";if(document.getElementById(c).checked){var d=new jsSHA(a,"TEXT");d.update(text);d=d.getHash("HEX");document.getElementById(b).value=d}}
function Calculate(){if(null==document.getElementById("file").files[0]){ClearFields();text=document.getElementById("textinput").value;if(document.getElementById("crc32-c").checked){var a=CRC32.str(text);document.getElementById("CRC32").value=decimalToHexString(a)}document.getElementById("md5-c").checked&&(a=new SparkMD5,a.append(text),a=a.end(),document.getElementById("MD5").value=a);SHA1Form("SHA-1","SHA1");SHA1Form("SHA-224","SHA224");SHA1Form("SHA-256","SHA256");SHA1Form("SHA-384","SHA384");SHA1Form("SHA-512",
"SHA512");SHA1Form("SHA3-224","SHA3224");SHA1Form("SHA3-256","SHA3256");SHA1Form("SHA3-384","SHA3384");SHA1Form("SHA3-512","SHA3512")}else return ClearFields(),c=0,buffer&&($("#reset").attr("disabled","disabled"),$("#file").attr("disabled","disabled"),$("#textinput").attr("disabled","disabled"),$("#calculate").attr("disabled","disabled"),$("#loading-c").removeClass("d-none"),CRC32Worker()),!1}function CRC32Worker(){$("#crc32-c").is(":checked")?workercrc32.postMessage(ua):crc32r=" "}
function MD5Worker(){$("#md5-c").is(":checked")?workermd5.postMessage(buffer):md5r=" "}function SHA1Worker(){$("#sha1-c").is(":checked")?workersha1.postMessage(ua):sha1r=" "}function SHA224Worker(){$("#sha224-c").is(":checked")?workersha224.postMessage(buffer):sha224r=" "}function SHA256Worker(){$("#sha256-c").is(":checked")?workersha256.postMessage(buffer):sha256r=" "}function SHA384Worker(){$("#sha384-c").is(":checked")?workersha384.postMessage(ua):sha384r=" "}
function SHA512Worker(){$("#sha512-c").is(":checked")?workersha512.postMessage(ua):sha512r=" "}function SHA3224Worker(){$("#sha3224-c").is(":checked")?workersha3224.postMessage(ua):sha3224r=" "}function SHA3256Worker(){$("#sha3256-c").is(":checked")?workersha3256.postMessage(ua):sha3256r=" "}function SHA3384Worker(){$("#sha3384-c").is(":checked")?workersha3384.postMessage(ua):sha3384r=" "}function SHA3512Worker(){$("#sha3512-c").is(":checked")?workersha3512.postMessage(ua):sha3512r=" "}
function WaitE(){crc32r&&(document.getElementById("CRC32").value=crc32r,crc32r="",c+=1,MD5Worker());md5r&&(document.getElementById("MD5").value=md5r,md5r="",c+=1,SHA1Worker());sha1r&&(document.getElementById("SHA1").value=sha1r,sha1r="",c+=1,SHA224Worker());sha224r&&(document.getElementById("SHA224").value=sha224r,sha224r="",c+=1,SHA256Worker());sha256r&&(document.getElementById("SHA256").value=sha256r,sha256r="",c+=1,SHA384Worker());sha384r&&(document.getElementById("SHA384").value=sha384r,sha384r=
"",c+=1,SHA512Worker());sha512r&&(document.getElementById("SHA512").value=sha512r,sha512r="",c+=1,SHA3224Worker());sha3224r&&(document.getElementById("SHA3224").value=sha3224r,sha3224r="",c+=1,SHA3256Worker());sha3256r&&(document.getElementById("SHA3256").value=sha3256r,sha3256r="",c+=1,SHA3384Worker());sha3384r&&(document.getElementById("SHA3384").value=sha3384r,sha3384r="",c+=1,SHA3512Worker());sha3512r&&(document.getElementById("SHA3512").value=sha3512r,sha3512r="",c+=1);10<c&&($("#loading-c").addClass("d-none"),
$("#loading-f").addClass("d-none"),$("#reset").removeAttr("disabled"),$("#file").removeAttr("disabled"),$("#calculate").removeAttr("disabled"),c=0);setTimeout(WaitE,100)}WaitE();function ErrorCRC32(a){document.getElementById("CRC32").value="-";c+=1;MD5Worker()}function ErrorMD5(a){document.getElementById("MD5").value="-";c+=1;SHA1Worker()}function ErrorSHA1(a){document.getElementById("SHA1").value="-";c+=1;SHA224Worker()}
function ErrorSHA224(a){document.getElementById("SHA224").value="-";c+=1;SHA256Worker()}function ErrorSHA256(a){document.getElementById("SHA256").value="-";c+=1;SHA384Worker()}function ErrorSHA384(a){document.getElementById("SHA384").value="-";c+=1;SHA512Worker()}function ErrorSHA512(a){document.getElementById("SHA512").value="-";c+=1;SHA3224Worker()}function ErrorSHA3224(a){document.getElementById("SHA3224").value="-";c+=1;SHA3256Worker()}
function ErrorSHA3256(a){document.getElementById("SHA3256").value="-";c+=1;workersha3384.postMessage(ua)}function ErrorSHA3384(a){document.getElementById("SHA3384").value="-";c+=1;workersha3512.postMessage(ua)}function ErrorSHA3512(a){document.getElementById("SHA3512").value="-";c+=1}
function GetFile(){ClearFields();$("#textinput").attr("disabled","disabled");c=0;buffer=ua="";$("#loading-f").removeClass("d-none");$("#reset").attr("disabled","disabled");$("#file").attr("disabled","disabled");$("#calculate").attr("disabled","disabled");var a=document.getElementById("file").files[0],b=new FileReader;b.readAsArrayBuffer(a);b.onerror=function(){$("#loading-f").addClass("d-none");$("#reset").removeAttr("disabled");$("#file").removeAttr("disabled");$("#calculate").removeAttr("disabled")};
b.onloadend=function(){buffer=b.result;ua=new Uint8Array(buffer);CRC32Worker()}};

</script>

<script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/crc32.js"></script>
<script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/js/spark-md5.min.js"></script>
<script src="http://127.0.0.1:43110/17SWVnHoujG92yYGSZvCzPgZEpGVfRF8wi/oclc/js/sha.js"></script>


</div>

</div>



<div class="center">

</div>

</div>

</body>

</html>

`;

PMap.set("oclcen",oclcen);
