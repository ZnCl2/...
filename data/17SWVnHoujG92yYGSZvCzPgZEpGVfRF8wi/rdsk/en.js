const rdsken = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Remote Desktop</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Remote Desktop</h1>
</td>
<td>
<div class="flr">
</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Remote-Desktop is a clientless remote desktop application written in PureBasic and NodeJS.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li> Remote access with a browser</li>
<li> Does not need additional client software</li>
<li> Ablility to run invisble</li>
<li> Ablility to automatically start the server</li>
<li> Very easy to use</li>
<li> Open source</li>

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

    <a href="./rdsk/images/rdsk.png" title="Remote Desktop">
        <img class="screenshots" src="./rdsk/images/rdsk.png" alt="Remote Desktop">
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
<td class="td2">1.0.0.0</td>
</tr>
<tr>
<td><b>
Size</b></td>
<td>14,8 MB</td>
</tr>
<tr>
<td><b>
Platform</b></td>
<td>Windows</td>
</tr>
<tr>
<td><b>
Last updated</b></td>
<td>2019-05-22</td>
</tr>
<tr>
<td><b>
License</b></td>
<td>GPL</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>46a41c26a4779c27b629673d454ac001</td>
</tr>
<tr>
<td><b>
MD5 Downloader</b></td>
<td>4dc5aa7b01481c66d578a5c41c11fb78</td>
</tr>
<tr>
<td><b>
Inter-Planetary File System (IPFS)</b></td>
<td>
<a href="http://127.0.0.1:8080/ipfs/QmYBBXYqdhH4CEVNM4W4pJ8gAw4QiSaiF3mGeg1CfS3xby" target="_blank">
QmYBBXYqdhH4CEVNM4W4pJ8gAw4QiSaiF3mGeg1CfS3xby
</a>
</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./dl/Remote-Desktop-Downloader.zip" name="Download" id="download" title="Download - Remote Desktop">Download</a>

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

PMap.set("rdsken",rdsken);
