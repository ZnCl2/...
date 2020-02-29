const starten = `

<!DOCTYPE html>
<html lang="en">

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
<h1>Home</h1>
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

<div class="card mb-3 divl box" onclick="app='oaes';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">AES Crypter</h5>
    <p class="card-text">AES Crypter is a web application which decrypts and encrypts files using AES.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='av2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Audio/Video To Exe</h5>
    <p class="card-text">Audio/Video To Exe can convert multimedia files to other formats and selfplaying executables.</p>

  </div>
</div>


</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='b64';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Base64 De-/Encoder</h5>
    <p class="card-text">Base64 De-/Encoder is a commandline tool which decodes and encodes files using the Base64 algorithm.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='ob64';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Base64 Online De-/Encoder</h5>
    <p class="card-text">Base64 De-/Encoder is a web application which decodes and encodes files and strings using the Base64 algorithm.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='b2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Bat To Exe Converter</h5>
    <p class="card-text">Bat To Exe Converter converts BAT (.bat) script files to the EXE (.exe) format.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='ob2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Bat To Exe Online Converter</h5>
    <p class="card-text">Bat To Exe Online Converter is a web application which converts BAT (.bat) files to the EXE (.exe) format.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='oclc';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Checksum Calculator</h5>
    <p class="card-text">Checksum Calculator is a web application which calculates the (CRC32, MD5, SHA1, SHA2, SHA3) hash of files and strings.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='cmd';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">CMD Tools</h5>
    <p class="card-text">A collection of small commandline tools.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='dfs';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Decentralized File Sync</h5>
    <p class="card-text">A decentralized file syncing tool which works without relying on a central server.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='dfe';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Duplicate File Eraser</h5>
    <p class="card-text">Duplicate File Eraser is a simple program which finds and removes duplicate files.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='ipfsdl';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">IPFS File Downloader</h5>
    <p class="card-text">IPFS File Downloader can download files from the Inter-Planetary File System (IPFS).</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='mcr';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Macro CMD</h5>
    <p class="card-text">Macro CMD is a command line application which records and plays mouse and keyboard actions.</p>

  </div>
</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='p2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Ps1 To Exe</h5>
    <p class="card-text">Ps1 To Exe converts Ps1 (.ps1) files to the EXE (.exe) format.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='op2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Ps1 To Exe Online Converter</h5>
    <p class="card-text">Ps1 To Exe Online Converter is a web application which converts PS1 (.ps1) files to the EXE (.exe) format.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='rdsk';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Remote Desktop</h5>
    <p class="card-text">A clientless remote desktop application.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='v2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Vbs To Exe</h5>
    <p class="card-text">Vbs To Exe converts VBS (.vbs) script files to the EXE (.exe) format.</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='ov2e';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">Vbs To Exe Online Converter</h5>
    <p class="card-text">Vbs To Exe Online Converter is a web application which converts VBS (.vbs) files to the EXE (.exe) format.</p>

  </div>
</div>

<div class="card mb-3 divr box" onclick="app='y2i';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">YouTube to IPFS</h5>
    <p class="card-text">A tool which copies videos from YouTube to the Inter-Planetary File System (IPFS).</p>

  </div>
</div>

</div>

<div class="divc">

<div class="card mb-3 divl box" onclick="app='znfs';ChangePage('en')">
  <div class="card-body">
    <h5 class="card-title">ZeroNet Filesharing Tool</h5>
    <p class="card-text">A tool for sharing files on ZeroNet.</p>

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

PMap.set("starten",starten);
