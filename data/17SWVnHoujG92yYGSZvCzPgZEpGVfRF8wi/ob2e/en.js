const ob2een = `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
   
<meta name="viewport" content="width=device-width, initial-scale=1">
    
<title>Bat To Exe Online Converter</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Bat To Exe Online Converter</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Bat To Exe Online Converter is a web application which converts BAT (.bat) files to the EXE (.exe) format.</p>

<div class="panel panel-default">
  <div class="panel-body">

<form class="hidden" id="converter" onsubmit="return false;" enctype="multipart/form-data" >

<table class="table">
  <tr>
    <td class="tdb1" id="b" >Batch file:</td>
    <td>
      
      <input id="batch" type="file" name="userfile" class="file" accept=".bat,.cmd" size="50" autocomplete="off" required>
    </td>
  </tr>
 
  <tr>
    <td>Architecture:</td>
    <td>

    <input type="radio" name="arch" value="1" checked>32 Bit
    <input type="radio" name="arch" value="2">64 Bit
      
    </td>
  </tr>
  
  <tr>
    <td>Type:</td>
    <td>
    
    <input type="radio" name="typ" value="1" checked>Console
    <input type="radio" name="typ" value="2">GUI
    
    </td>
  </tr>

  <tr>
    <td>Admin. Manifest:</td>
    <td>
    
    <input type="checkbox" name="admin" value="1" >
      Include
        
    </td>
  </tr>

  <tr>
    <td>Password:</td>
    <td>
    <input class="mxw-130" type="password" name="pw" placeholder="(Optional)">
    
    </td>
  </tr>

  <tr>
    <td></td>
    <td>
    <div>
    <button type="submit" onclick="saveexe('')" class="btn btn-primary" id="cnvrt" >Convert</button>
    <button type="reset"  class="btn btn-primary" >Reset</button>
&nbsp;&nbsp;
<a class="btn btn-outline-dark btn-sm" href="./ob2e/dl/ob2e.zip"><img src="./ob2e/images/download.png" alt="Download"> Download</a>
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

var extd,rc4key=SparkMD5.hash("ob2e"),dkey,rc4key=rc4key.toUpperCase();function ReadFile(a){if(a=a.target.files[0]){var c=new FileReader;c.onload=function(b){b=b.target.result.split(",");extd=window.atob(b[1]).search("%extd%");var a=b[1].length.toString(),a=a.padStart(32," ");DMap.set("b",b[1]);DMap.set("bs",window.btoa(a))};c.readAsDataURL(a)}}document.getElementById("batch").addEventListener("change",ReadFile,!1);

</script>


</body>

</html>

`;

PMap.set("ob2een",ob2een);
