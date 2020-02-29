const cmden = `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Bat To Exe Converter</title>

</head>

<body>

<div class="container">

<div class="cont">

<table class="table-borderless">
<tr>
<td>
<h1>CMD Tools</h1>
</td>
<td>
<div class="flr">
</div>
</td>
</tr>
</table>

<hr class="mt0">


<table class="table table-striped table-nowrap mb-0 mt-10">
<tr>
<td>
<b><u>Name</u></b>
</td>
<td>
<b><u>Parameters</u></b>
</td>
<td>
<b><u>Description</u></b>
</td>
</tr>
<tr><td><a href="./cmd/dl/aes.zip">aes</a></td><td>[-d|-e] [pass] [source] [target]</td><td>AES encryption</td></tr>
<tr><td><a href="./cmd/dl/brieflz.zip">brieflz</a></td><td>[-c|-d] [source] [target]</td><td>BriefLZ Compressor/Decompressor</td></tr>
<tr><td><a href="./cmd/dl/changeexeicon.zip">changeexeicon</a></td><td>[iconfile] [infile] [outfile]</td><td>Change the icon of an exe file</td></tr>
<tr><td><a href="./cmd/dl/closewindow.zip">closewindow</a></td><td>[windowtitle]</td><td>Close the specified window</td></tr>
<tr><td><a href="./cmd/dl/consolelocate.zip">consolelocate</a></td><td>[X] [Y]</td><td>Move the cursor to the given position</td></tr>
<tr><td><a href="./cmd/dl/crc32.zip">crc32</a></td><td>[file|-s string]</td><td>Calculate the CRC32-checksum</td></tr>
<tr><td><a href="./cmd/dl/download.zip">download</a></td><td>[URL] [target]</td><td>Internet file download</td></tr>
<tr><td><a href="./cmd/dl/downloadheader.zip">downloadheader</a></td><td>[URL] {target}</td><td>Download the HTTP header of the given URL</td></tr>
<tr><td><a href="./cmd/dl/filebrowse.zip">filebrowse</a></td><td>[title] [default file] ... </td><td>Browse for files</td></tr>
<tr><td><a href="./cmd/dl/flashwindow.zip">flashwindow</a></td><td>[title] [count] [timeout] [flag] [background]</td><td>Flash a window</td></tr>
<tr><td><a href="./cmd/dl/folderbrowse.zip">folderbrowse</a></td><td>[title] [initial folder]</td><td>Browse for folder</td></tr>
<tr><td><a href="./cmd/dl/getlanguage.zip">getlanguage</a></td><td>[-s|-u]</td><td>Detect system/user language</td></tr>
<tr><td><a href="./cmd/dl/getmimetype.zip">getmimetype</a></td><td>[extension]</td><td>Detect the mime type of the given extension</td></tr>
<tr><td><a href="./cmd/dl/getparentprocessname.zip">getparentprocessname</a></td><td>{-h|-v}</td><td>Retrieve the name of the parent process</td></tr>
<tr><td><a href="./cmd/dl/getparentprocesspid.zip">getparentprocesspid</a></td><td>{-h|-v}</td><td>Retrieve the ID of the parent process</td></tr>
<tr><td><a href="./cmd/dl/getspecialfolder.zip">getspecialfolder</a></td><td><a href="./cmd/dl/values.txt">[value]</a></td><td>Retrieve special folder</td></tr>
<tr><td><a href="./cmd/dl/hidewindow.zip">hidewindow</a></td><td>[windowtitle]</td><td>Hide the specified window</td></tr>
<tr><td><a href="./cmd/dl/iconextractor.zip">iconextractor</a></td><td>[infile.exe] {outpath}</td><td>Extract exe-icons</td></tr>
<tr><td><a href="./cmd/dl/inkey.zip">inkey</a></td><td>{-h|-v}</td><td>Wait for a key to be pressed</td></tr>
<tr><td><a href="./cmd/dl/inputbox.zip">inputbox</a></td><td>{-m} [title] [text] [def. input]</td><td>Input box</td></tr>
<tr><td><a href="./cmd/dl/join-and-split.zip">join-and-split</a></td><td>[-j|-s] [file] [outpath.] {size}</td><td>Join and split file(s)</td></tr>
<tr><td><a href="./cmd/dl/lzma.zip">lzma</a></td><td>[-c|-d] [source] [target]</td><td>LZMA Compressor/Decompressor</td></tr>
<tr><td><a href="./cmd/dl/makeadmin.zip">makeadmin</a></td><td>[infile] [outfile] {-d}</td><td>Add an administrator manifest to the exe</td></tr>
<tr><td><a href="./cmd/dl/maketoolwindow.zip">maketoolwindow</a></td><td>[windowtitle]</td><td>Window to toolwindow</td></tr>
<tr><td><a href="./cmd/dl/maskedinput.zip">maskedinput</a></td><td>[title]</td><td>Masked text input</td></tr>
<tr><td><a href="./cmd/dl/maximizewindow.zip">maximizewindow</a></td><td>[windowtitle]</td><td>Maximize the specified window</td></tr>
<tr><td><a href="./cmd/dl/md5.zip">md5</a></td><td>[file|-s string]</td><td>Calculate the MD5-checksum</td></tr>
<tr><td><a href="./cmd/dl/messagebox.zip">messagebox</a></td><td>[title] [text] {flagnr.}</td><td>Display a messagebox</td></tr>
<tr><td><a href="./cmd/dl/minimizewindow.zip">minimizewindow</a></td><td>[windowtitle]</td><td>Minimize the specified window</td></tr>
<tr><td><a href="./cmd/dl/mouse.zip">mouse</a></td><td>[Click]</td><td>Simulate mouse clicks</td></tr>
<tr><td><a href="./cmd/dl/movewindow.zip">movewindow</a></td><td>[X] [Y]</td><td>Move a window</td></tr>
<tr><td><a href="./cmd/dl/osversion.zip">osversion</a></td><td>{-h|-v}</td><td>Detect the operation system</td></tr>
<tr><td><a href="./cmd/dl/play.zip">play</a></td><td>{-f} [file]</td><td>Simple Media Player</td></tr>
<tr><td><a href="./cmd/dl/rc4.zip">rc4</a></td><td>[password] [infile] [outfile]</td><td>RC4 encryption</td></tr>
<tr><td><a href="./cmd/dl/record.zip">record</a></td><td>[seconds] [outfile]</td><td>Sound recorder</td></tr>
<tr><td><a href="./cmd/dl/resizewindow.zip">resizewindow</a></td><td>[title] [X] [Y] [width] [height]</td><td>Resize window</td></tr>
<tr><td><a href="./cmd/dl/savefiledialog.zip">savefiledialog</a></td><td>[title] [default file] ... </td><td>Open a dialog to save a file</td></tr>
<tr><td><a href="./cmd/dl/screenshot.zip">screenshot</a></td><td>[X] [Y] [width] [height]</td><td>Screenshot utility</td></tr>
<tr><td><a href="./cmd/dl/sendkey.exe">sendkey</a></td><td><a href="./cmd/dl/keys.txt">[key]</a></td><td>Simulate special keys</td></tr>
<tr><td><a href="./cmd/dl/sendkeys.zip">sendkeys</a></td><td>[option] [text]</td><td>Simulate text</td></tr>
<tr><td><a href="./cmd/dl/setcursorposition.zip">setcursorposition</a></td><td>[X] [Y]</td><td>Change the cursor position</td></tr>
<tr><td><a href="./cmd/dl/setforegroundwindow.zip">setforegroundwindow</a></td><td>[windowtitle]</td><td>Set the foreground window</td></tr>
<tr><td><a href="./cmd/dl/setwindowtitle.zip">setwindowtitle</a></td><td>[windowtitle] [new title]</td><td>Set the windowtitle</td></tr>
<tr><td><a href="./cmd/dl/setwindowtransparency.zip">setwindowtransparency</a></td><td>[windowtitle] [value]</td><td>Set the transparency of a window</td></tr>
<tr><td><a href="./cmd/dl/sha1.zip">sha1</a></td><td>[file|-s string]</td><td>Calculate the SHA1-checksum</td></tr>
<tr><td><a href="./cmd/dl/sha2.zip">sha2</a></td><td>[file|-s string]</td><td>Calculate the SHA2-checksum</td></tr>
<tr><td><a href="./cmd/dl/sha3.zip">sha3</a></td><td>[file|-s string]</td><td>Calculate the SHA3-checksum</td></tr>
<tr><td><a href="./cmd/dl/showwindow.zip">showwindow</a></td><td>[windowtitle]</td><td>Show the specified window</td></tr>
<tr><td><a href="./cmd/dl/sleep.zip">sleep</a></td><td>[milliseconds]</td><td>Suspend execution</td></tr>
<tr><td><a href="./cmd/dl/speak.zip">speak</a></td><td>[-t text|-f filename]</td><td>Speak text/filecontent</td></tr>
<tr><td><a href="./cmd/dl/url-de-encoder.zip">url-de-encoder</a></td><td>[-d|-e] [Url]</td><td>URL De-/Encoder</td></tr>
<tr><td><a href="./cmd/dl/webserver.zip">webserver</a></td><td>[base directory] {port}</td><td>Http web server</td></tr>
<tr><td><a href="./cmd/dl/windowontop.zip">windowontop</a></td><td>[windowtitle]</td><td>Make the window stay on top</td></tr>
</table>

</div>


</div>

</body>

</html>

`;

PMap.set("cmden",cmden);
