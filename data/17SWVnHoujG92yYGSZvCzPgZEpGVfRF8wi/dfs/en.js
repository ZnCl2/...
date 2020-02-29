const dfsen = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Decentralized File Sync</title>
    
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Decentralized File Sync</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Decentralized-File-Sync is a file syncing tool which works without relying on a central server.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li> Sync, Share or simply store your files on the IPFS without relying on a central server</li>
<li> Optional End-to-End encryption</li>
<li> Open source</li>

</ul>

<hr>

<p><b>Screenshots</b></p>

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
    <a href="./dfs/images/dfs.png" title="Decentralized File Sync">
        <img class="screenshots" src="./dfs/images/dfs.png" alt="Decentralized File Sync">
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
<td class="td2">1.0.1.0</td>
</tr>
<tr>
<td><b>
Size</b></td>
<td>3,88 MB</td>
</tr>
<tr>
<td><b>
Platform</b></td>
<td>Windows</td>
</tr>
<tr>
<td><b>
Last updated</b></td>
<td>2019-08-03</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>84408c1e81a456f0e14c8bde5a17213e</td>
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
<a href="http://127.0.0.1:8080/ipfs/QmWRv8yXU1zdrfQWi4BvBK71EJanH9TY5qF18oo8tL3W3o" target="_blank">
QmWRv8yXU1zdrfQWi4BvBK71EJanH9TY5qF18oo8tL3W3o
</a>
</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./dl/Decentralized-File-Sync.zip" name="Download" id="download" title="Download - Decentralized File Sync">Download</a>

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

PMap.set("dfsen",dfsen);
