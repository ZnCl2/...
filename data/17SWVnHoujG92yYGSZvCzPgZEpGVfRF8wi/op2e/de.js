const op2ede = `

<!DOCTYPE html>
<html lang="de">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>Ps1 To Exe Online Converter</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Ps1 To Exe Online Converter</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Ps1 To Exe Online Converter ist eine Webanwendung, die PS1 (.ps1) Dateien in das EXE (.exe) Format konvertiert.</p>

<div class="panel panel-default">
  <div class="panel-body">

<form class="hidden" id="converter" onsubmit="return false;" enctype="multipart/form-data" >

<table class="table">
  <tr>
    <td class="tdb1" id="p" >Ps1 Datei:</td>
    <td>
      <input id="ps1" type="file" name="userfile" class="file" accept=".ps1" size="50" autocomplete="off" required>
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
    <button type="submit" onclick="saveexe2('')" class="btn btn-primary" id="cnvrt" >Konvertieren</button>
    <button type="reset"  class="btn btn-primary" >Reset</button>
&nbsp;&nbsp;
<a class="btn btn-outline-dark btn-sm" href="./op2e/dl/op2e.zip"><img src="./op2e/images/download.png" alt="Download"> Download</a>
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

  var rc4key2 = SparkMD5.hash('op2e');
  var dkey;
  
  rc4key2 = rc4key2.toUpperCase(); 

  function ReadFile2(evt) {

    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      
        var contents = e.target.result;
                
        var str = contents.split(",");
        
        var l = str[1].length;
        
        var n = l.toString();
        
        n = n.padStart(32, " ");
        
	DMap.set('b2', str[1]);
	DMap.set('bs2', window.btoa(n));

      }
      r.readAsDataURL(f);
    }
  }

  document.getElementById('ps1').addEventListener('change', ReadFile2, false);

</script>


</body>

</html>

`;

PMap.set("op2ede",op2ede);
