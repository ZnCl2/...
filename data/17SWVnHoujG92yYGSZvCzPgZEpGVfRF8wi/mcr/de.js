const mcrde = `

<!DOCTYPE html>
<html lang="de">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Macro CMD</title>
    
</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>Macro CMD</h1>
</td>
<td>
<div class="flr">
</div>
</td>
</tr>
</table>

<hr class="mt0">

<p>Macro CMD ist ein Kommandozeilen Programm, das Maus und Tastatureingaben aufzeichnet und abspielt.</p>

<hr>

<p><b>Features</b></p>

<ul>

<li>Maus und Tastatur Rekorder</li>
<li>Kommandozeilen Schnittstelle</li>
<li>Portabel</li>
<li>Verf&uuml;gbar als 32 Bit und 64 Bit Version</li>

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
    <a href="./mcr/images/mcr.png" title="Macro CMD">
        <img class="screenshots" src="./mcr/images/mcr.png" alt="Macro CMD">
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
Gr&ouml;&szlig;e</b></td>
<td>117 KB</td>
</tr>
<tr>
<td><b>
Plattform</b></td>
<td>Windows</td>
</tr>
<tr>
<td><b>
Letztes Update</b></td>
<td>10.03.2017</td>
</tr>
<tr>
<td><b>
MD5</b></td>
<td>65318acc2d19630e64a83b35013f8aa3</td>
</tr>
<tr>
<td><b>
Lizenz</b></td>
<td>Freeware</td>
</tr>

</table>

<div class="div1">

<div class="div2">

<a class="btn btn-primary btn-lg dl" href="./mcr/downloads/macrocmd.zip" name="Download" id="download" title="Download - Macro CMD">Download</a>

</div>

<div class="div3 align-middle">

</div>

<div class="div3 align-middle">

</div>

</div>

</div>

</div>

</body>

</html>

`;

PMap.set("mcrde",mcrde);
