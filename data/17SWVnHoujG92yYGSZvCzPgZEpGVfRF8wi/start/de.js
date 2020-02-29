const startde = `

<!DOCTYPE html>
<html lang="de">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>FK</title>

<style>

.box {
  transition: box-shadow .3s;
  border-radius:10px;
  border: 1px solid #ccc;
  
}
.box:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

.divc
{

width:100%;
display:table;

}

.divl
{

width: 48%;
float:left;
display:table-cell;
min-height:130px;
vertical-align: middle;
cursor: pointer;

}

.divr
{
width: 48%;
float:right;
display:table-cell;
min-height:130px;
cursor: pointer;
}

.dt
{
display:table;
}

</style>
    
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Startseite</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<div class="dt">

<div class="divc">

<div class="card mb-3 divl box" onclick="app='oaes';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">AES Crypter</h5>
    <p class="card-text">AES Crypter ist eine Webanwendung, die Dateien unter Verwendung von AES verschl&#xFC;sselt und entschl&#xFC;sselt.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='av2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Audio/Video To Exe</h5>
    <p class="card-text">Audio/Video To Exe wandelt Multimedia Dateien in andere Formate und selbstabspielende Exe um.</p>

  </div>
</div>


</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='b64';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Base64 De-/Encoder</h5>
    <p class="card-text">Base64 De-/Encoder ist ein Kommandozeilen Programm, das Dateien unter Verwendung des Base64 Algorithmus dekodiert und enkodiert.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='ob64';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Base64 Online De-/Encoder</h5>
    <p class="card-text">Base64 Online De-/Encoder ist eine Webanwedung, die Dateien und Strings unter Verwendung des Base64 Algorithmus dekodiert und enkodiert.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='b2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Bat To Exe Converter</h5>
    <p class="card-text">Bat To Exe Converter wandelt BAT (.bat) Dateien in das EXE (.exe) Format um.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='ob2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Bat To Exe Online Converter</h5>
    <p class="card-text">Bat To Exe Online Converter ist eine Webanwendung, die BAT (.bat) Dateien in das EXE (.exe) Format umwandelt.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='oclc';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Checksum Calculator</h5>
    <p class="card-text">Checksum Calculator ist eine Webanwendung, die die (CRC32, MD5, SHA1, SHA2, SHA3) Pr&#xFC;fsumme von Dateien und Strings berechnet.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='cmd';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">CMD Tools</h5>
    <p class="card-text">Eine Sammlung diverser Kommandozeilen Tools.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='dfs';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Decentralized File Sync</h5>
    <p class="card-text">Ein Dateisynchronisierungs Programm, dass ohne zentralen Server auskommt.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='dfe';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Duplicate File Eraser</h5>
    <p class="card-text">Duplicate File Eraser findet und l&#xF6;scht identische Dateien.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='ipfsdl';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">IPFS File Downloader</h5>
    <p class="card-text">Ein Programm mit dem man Dateien vom Inter-Planetary File System (IPFS) herunterladen kann.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='mcr';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Macro CMD</h5>
    <p class="card-text">Macro CMD ist ein Kommandozeilen Programm, das Maus und Tastatureingaben aufzeichnet und abspielt.</p>

  </div>
</div>

</div>


<div class="divc">

<div class="card mb-3 divl box" onclick="app='p2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Ps1 To Exe</h5>
    <p class="card-text">Ps1 To Exe wandelt PS1 (.ps1) Dateien in das EXE (.exe) Format um.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='op2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Ps1 To Exe Online Converter</h5>
	<p class="card-text">Ps1 To Exe Online Converter ist eine Webanwendung, die PS1 (.ps1) Dateien in das EXE (.exe) Format umwandelt.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='rdsk';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Remote Desktop</h5>
    <p class="card-text">Remote Desktop ist ein Fernwartungsprogramm, das ohne zus&auml;tzlicher Client Software auskommt.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='v2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Vbs To Exe</h5>
    <p class="card-text">Vbs To Exe wandelt VBS (.vbs) Dateien in das EXE (.exe) Format um.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='ov2e';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">Vbs To Exe Online Converter</h5>
	<p class="card-text">Vbs To Exe Online Converter ist eine Webanwendung, die VBS (.vbs) Dateien in das EXE (.exe) Format umwandelt.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='y2i';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">YouTube to IPFS</h5>
    <p class="card-text">Ein Programm mit dem man Videos von YouTube auf das Inter-Planetary File System (IPFS) kopieren kann.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='znfs';ChangePage('de')">
  <div class="card-body">
    <h5 class="card-title">ZeroNet Filesharing Tool</h5>
    <p class="card-text">Ein Programm zum Teilen von Dateien auf ZeroNet.</p>

  </div>
</div>

</div>



</div>

</div>


</div>

</div>

</body>

</html>

`;

PMap.set("startde",startde);
