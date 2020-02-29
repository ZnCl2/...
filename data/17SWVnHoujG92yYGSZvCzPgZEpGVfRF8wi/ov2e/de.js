const ov2ede = `

<!DOCTYPE html>
<html lang="de">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>Vbs To Exe Online Converter</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Vbs To Exe Online Converter</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Vbs To Exe Online Converter ist eine Webanwendung, die Vbs (.vbs) Dateien in das EXE (.exe) Format konvertiert.</p>

<div class="panel panel-default">
  <div class="panel-body">

<form class="hidden" id="converter" onsubmit="return false;" enctype="multipart/form-data" >

<table class="table">
  <tr>
    <td class="tdb1" id="p" >Vbs Datei:</td>
    <td>
      <input id="vbs" type="file" name="userfile" class="file" accept=".vbs" size="50" autocomplete="off" required>
    </td>
  </tr>
 
  <tr>
    <td>Architektur:</td>
    <td>

    <input type="radio" name="arch" value="1" checked>32 Bit
    <input type="radio" name="arch" value="2">64 Bit
      
    </td>
  </tr>
  
  <tr>
    <td>Typ:</td>
    <td>
    
    <input type="radio" name="typ" value="1" checked>Console
    <input type="radio" name="typ" value="2">GUI
    
    </td>
  </tr>

  <tr>
    <td>Admin. Manifest:</td>
    <td>
    
    <input type="checkbox" name="admin" value="1" >
      Einf&uuml;gen
        
    </td>
  </tr>

  <tr>
    <td>Passwort:</td>
    <td>
    <input class="mxw-130" type="password" name="pw" placeholder="(Optional)">
    
    </td>
  </tr>

  <tr>
    <td></td>
    <td>
    <div>
    <button type="submit" onclick="saveexe3('')" class="btn btn-primary" id="cnvrt" >Konvertieren</button>
    <button type="reset"  class="btn btn-primary" >Reset</button>
&nbsp;&nbsp;
<a class="btn btn-outline-dark btn-sm" href="./ov2e/dl/ov2e.zip"><img src="./ov2e/images/download.png" alt="Download"> Download</a>
    </div>
	

    </td>
  </tr>
  
  <tr>
    <td>
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

  var rc4key3 = SparkMD5.hash('ov2e');
  var dkey;
  
  rc4key3 = rc4key3.toUpperCase(); 

  function ReadFile3(evt) {

    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      
        var contents = e.target.result;
                
        var str = contents.split(",");
        
        var l = str[1].length;
        
        var n = l.toString();
        
        n = n.padStart(32, " ");
        
	DMap.set('b3', str[1]);
	DMap.set('bs3', window.btoa(n));

      }
      r.readAsDataURL(f);
    }
  }

  document.getElementById('vbs').addEventListener('change', ReadFile3, false);

</script>


</body>

</html>

`;

PMap.set("ov2ede",ov2ede);
