const znfsen = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>ZeroNet Filesharing Tool</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>ZeroNet Filesharing Tool</h1>
</td>
<td>
<div class="flr">
</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>ZeroNet Filesharing Tool is a Windows tool which allows you to share files on ZeroNet.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li> Easy to use -  Just choose a file and wait a bit</li>
<li> Others can download your files even if they haven't ZeroNet installed</li>
<li> You can encrypt your files that only those who know the password can open them</li>

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

    <a href="./znfs/images/znfs.png" title="ZeroNet Filesharing Tool">
        <img class="screenshots" src="./znfs/images/znfs.png" alt="ZeroNet Filesharing Tool">
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
<td class="td2">1.0.2.0</td>
</tr>
<tr>
<td><b>
Size</b></td>
<td>13 MB</td>
</tr>
<tr>
<td><b>
Platform</b></td>
<td>Windows</td>
</tr>
<tr>
<td><b>
Last updated</b></td>
<td>2019-07-13</td>
</tr>
<tr>
<td><b>
License</b></td>
<td>GPL</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>788d34ce64301d4bb436648585b000eb</td>
</tr>
<tr>
<td><b>
MD5 Downloader</b></td>
<td>d8758a40c605de2dd190c547b160a071</td>
</tr>

<tr>
<td><b>
Inter-Planetary File System (IPFS)</b></td>
<td>
<a href="http://127.0.0.1:8080/ipfs/QmaaSntZp5L8gSjuWP9YKsMDADh8zV84aaoT11wqr7KCAX" target="_blank">
QmaaSntZp5L8gSjuWP9YKsMDADh8zV84aaoT11wqr7KCAX
</a>
</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./dl/ZeroNet-Filesharing-Tool-Downloader.zip" name="Download" id="download" title="Download - ZeroNet Filesharing Tool">Download</a>

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

PMap.set("znfsen",znfsen);
