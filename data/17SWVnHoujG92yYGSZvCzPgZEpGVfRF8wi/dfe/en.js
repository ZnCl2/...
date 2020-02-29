const dfeen = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Duplicate File Eraser</title>
    
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Duplicate File Eraser</h1>
</td>
<td>
<div class="flr">

</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Duplicate File Eraser is a simple program written in PureBasic which finds and removes duplicate files.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li> Fast CRC32, MD5, SHA1 file comparison</li>
<li> Delete, copy, move your duplicates</li>
<li> Import and Export results to CSV</li>
<li> Multiplatform support</li>
<li> Portable</li>
<li> Very easy to use</li>
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
    <a href="./dfe/images/dfeen.png" title="Duplicate File Eraser">
        <img class="screenshots" src="./dfe/images/dfeen.png" alt="Duplicate File Eraser">
    </a>
    <a href="./dfe/images/dfeen-linux.png" title="Duplicate File Eraser on Linux">
        <img class="screenshots" src="./dfe/images/dfeen-linux.png" alt="Duplicate File Eraser on Linux">
    </a>
    <a href="./dfe/images/dfeen-mac.png" title="Duplicate File Eraser on Mac OS X">
        <img class="screenshots" src="./dfe/images/dfeen-mac.png" alt="Duplicate File Eraser on Mac OS X">
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
<td class="td2">2.1.0.0</td>
</tr>
<tr>
<td><b>
Size</b></td>
<td>2,10 MB</td>
</tr>
<tr>
<td><b>
Platform</b></td>
<td>Windows, Linux, Mac</td>
</tr>
<tr>
<td><b>
Last updated</b></td>
<td>2019-06-07</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>454c250ad6c3588c706f1d37907e1835</td>
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
<a href="http://127.0.0.1:8080/ipfs/QmVYoqQpNzPL83RhNo7LeUrqSej1cjkDjGPynGTJZZcizC" target="_blank">
QmVYoqQpNzPL83RhNo7LeUrqSej1cjkDjGPynGTJZZcizC
</a>
</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./dfe/downloads/Duplicate_File_Eraser.zip" name="Download" id="download" title="Download - Duplicate File Eraser">Download</a>

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

PMap.set("dfeen",dfeen);
