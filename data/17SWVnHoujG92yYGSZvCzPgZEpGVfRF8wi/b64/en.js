const b64en = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Base64 De-/Encoder</title>
    
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Base64 De-/Encoder</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Base64 De-/Encoder is a command line tool for Linux, Mac OS and Windows which decodes and encodes using the Base64 algorithm.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li>Commandline interface</li>
<li>Multi OS support</li>
<li>Portable</li>
<li>Open source</li>

</ul>

<hr>

<p><b>Screenshot</b></p>

<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>

<div id="links" class="mb190">
    <a href="./b64/images/b64.png" title="Base64 De-/Encoder">
        <img class="screenshots" src="./b64/images/b64.png" alt="Base64 De-/Encoder">
    </a>

</div>


<script>
document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};
</script>

<table class="table table-bordered table-nowrap">
<tr>
<td class="td1"><b>Version</b></td>
<td class="td2">2.0.0.0</td>
</tr>
<tr>
<td><b>
Size</b></td>
<td>156 KB</td>
</tr>
<tr>
<td><b>
Platform</b></td>
<td>Windows, Linux, Mac</td>
</tr>
<tr>
<td><b>
Last updated</b></td>
<td>2019-07-02</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>c0c42b8818c354f457ea7a3778f6b427</td>
</tr>
<tr>
<td><b>
License</b></td>
<td>GPL</td>
</tr>

<tr>
<td><b>
Inter-Planetary File System (IPFS)</b></td>
<td>
<a href="http://127.0.0.1:8080/ipfs/QmQR7a36ZeXc5niNTPF6RxJ78ZWfZr26YBusymsJfqZ5s6" target="_blank">
QmQR7a36ZeXc5niNTPF6RxJ78ZWfZr26YBusymsJfqZ5s6
</a>
</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./dl/base64.zip" name="Download" id="download" title="Download - Base64 De-/Encoder">Download</a>

</div>

<div class="div3 align-middle">

<a class="btn btn-outline-secondary btn-lg dl" href="./dl/ipfs-downloader.exe" name="DownloadIPFS" id="download" title="Download IPFS">Download IPFS</a>

</div>

</div>

</div>

</div>

</body>

</html>

`;

PMap.set("b64en",b64en);
