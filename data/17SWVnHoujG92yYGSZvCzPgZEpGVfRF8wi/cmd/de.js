const cmdde = `

<!DOCTYPE html>
<html lang="de">

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
<b><u>Parameter</u></b>
</td>
<td>
<b><u>Beschreibung</u></b>
</td>
</tr>
<tr><td><a href="./cmd/dl/aes.zip">aes</a></td><td>[-d|-e] [Passw.] [Quelle] [Ziel]</td><td>AES Verschl&uuml;sselung</td></tr>
<tr><td><a href="./cmd/dl/brieflz.zip">brieflz</a></td><td>[-c|-d] [Quelle] [Ziel]</td><td>BriefLZ Komprimierer/Dekompri...</td></tr>
<tr><td><a href="./cmd/dl/changeexeicon.zip">changeexeicon</a></td><td>[Symbol] [Quelldatei] [Ziel]</td><td>Das Symbol einer Exe &auml;ndern</td></tr>
<tr><td><a href="./cmd/dl/closewindow.zip">closewindow</a></td><td>[Fenstertitel]</td><td>Schliesst das Fenster</td></tr>
<tr><td><a href="./cmd/dl/consolelocate.zip">consolelocate</a></td><td>[X] [Y]</td><td>Setzt den Cursor an die angegebene Position</td></tr>
<tr><td><a href="./cmd/dl/crc32.zip">crc32</a></td><td>[Datei|-s String]</td><td>Gibt die CRC32 Pr&uuml;fsumme zur&uuml;ck</td></tr>
<tr><td><a href="./cmd/dl/download.zip">download</a></td><td>[URL] [Ziel]</td><td>L&auml;dt eine Datei herunter</td></tr>
<tr><td><a href="./cmd/dl/downloadheader.zip">downloadheader</a></td><td>[URL] {Ziel}</td><td>L&auml;dt den Http Header einer URL herunter</td></tr>
<tr><td><a href="./cmd/dl/filebrowse.zip">filebrowse</a></td><td>[Titel] [Standard-Datei] ... </td><td>Datei/en zum &Ouml;ffnen w&auml;hlen</td></tr>
<tr><td><a href="./cmd/dl/flashwindow.zip">flashwindow</a></td><td>[Titel] [Anzahl] [Periode] [Flag] [Hintergrund]</td><td>Fenster blinken lassen</td></tr>
<tr><td><a href="./cmd/dl/folderbrowse.zip">folderbrowse</a></td><td>[Titel] [Initial Verzeichnis]</td><td>Nach Ordner suchen</td></tr>
<tr><td><a href="./cmd/dl/getlanguage.zip">getlanguage</a></td><td>[-s|-u]</td><td>System/Nutzer Sprache ermitteln</td></tr>
<tr><td><a href="./cmd/dl/getmimetype.zip">getmimetype</a></td><td>[Endung]</td><td>Ermittelt den Mime Typen einer Endung</td></tr>
<tr><td><a href="./cmd/dl/getparentprocessname.zip">getparentprocessname</a></td><td>{-h|-v}</td><td>Ermittelt den Namen des aufrufenden Prozesses</td></tr>
<tr><td><a href="./cmd/dl/getparentprocesspid.zip">getparentprocesspid</a></td><td>{-h|-v}</td><td>Ermittelt die ID des aufrufenden Prozesses</td></tr>
<tr><td><a href="./cmd/dl/getspecialfolder.zip">getspecialfolder</a></td><td><a href="./cmd/dl/values.txt">[Ordner]</a></td><td>Speziellen Ordner ermitteln</td></tr>
<tr><td><a href="./cmd/dl/hidewindow.zip">hidewindow</a></td><td>[Fenstertitel]</td><td>Versteckt das Fenster</td></tr>
<tr><td><a href="./cmd/dl/iconextractor.zip">iconextractor</a></td><td>[Quelldatei.exe] {Zielpfad}</td><td>Exe-Icons extrahieren</td></tr>
<tr><td><a href="./cmd/dl/inkey.zip">inkey</a></td><td>{-h|-v}</td><td>Auf Tastatureingabe warten</td></tr>
<tr><td><a href="./cmd/dl/inputbox.zip">inputbox</a></td><td>{-m} [Titel] [Text] ...</td><td>Eingabe Box</td></tr>
<tr><td><a href="./cmd/dl/join-and-split.zip">join-and-split</a></td><td>[-j|-s] [Datei] [Ordner] {Gr&ouml;&szlig;e}</td><td>Datei(en) teilen/zusammenf&uuml;gen</td></tr>
<tr><td><a href="./cmd/dl/lzma.zip">lzma</a></td><td>[-c|-d] [Quelle] [Ziel]</td><td>LZMA Komprimierer/Dekomprimierer</td></tr>
<tr><td><a href="./cmd/dl/makeadmin.zip">makeadmin</a></td><td>[Quelldatei] [Ziel] {-d}</td><td>Administratorrechte einer Exe hinzuf&uuml;gen</td></tr>
<tr><td><a href="./cmd/dl/maketoolwindow.zip">maketoolwindow</a></td><td>[Fenstertitel]</td><td>Fenster in Toolfenster &auml;ndern</td></tr>
<tr><td><a href="./cmd/dl/maskedinput.zip">maskedinput</a></td><td>[Titel]</td><td>Versteckte Texteingabe</td></tr>
<tr><td><a href="./cmd/dl/maximizewindow.zip">maximizewindow</a></td><td>[Fenstertitel]</td><td>Maximiert das Fenster</td></tr>
<tr><td><a href="./cmd/dl/md5.zip">md5</a></td><td>[Datei|-s String]</td><td>Gibt den MD5-Hash-Code zur&uuml;ck</td></tr>
<tr><td><a href="./cmd/dl/messagebox.zip">messagebox</a></td><td>[Titel] [Nachricht] {Flagnr.}</td><td>Zeigt eine Meldung an</td></tr>
<tr><td><a href="./cmd/dl/minimizewindow.zip">minimizewindow</a></td><td>[Fenstertitel]</td><td>Minimiert das Fenster</td></tr>
<tr><td><a href="./cmd/dl/mouse.zip">mouse</a></td><td>[Klick]</td><td>Simuliert Mausklicks</td></tr>
<tr><td><a href="./cmd/dl/movewindow.zip">movewindow</a></td><td>[X] [Y]</td><td>Fenster verschieben</td></tr>
<tr><td><a href="./cmd/dl/osversion.zip">osversion</a></td><td>{-h|-v}</td><td>Betriebssystem ermitteln</td></tr>
<tr><td><a href="./cmd/dl/play.zip">play</a></td><td>{-f} [Datei]</td><td>Einfacher Media Player</td></tr>
<tr><td><a href="./cmd/dl/rc4.zip">rc4</a></td><td>[Passwort] [Quelle] [Ziel]</td><td>RC4 Verschl&uuml;sselung</td></tr>
<tr><td><a href="./cmd/dl/record.zip">record</a></td><td>[Sekunden] [Zieldatei]</td><td>Sound Rekorder</td></tr>
<tr><td><a href="./cmd/dl/resizewindow.zip">resizewindow</a></td><td>[Titel] [X] [Y] [Breite] [H&ouml;he]</td><td>Fenstergr&ouml;&szlig;e &auml;ndern</td></tr>
<tr><td><a href="./cmd/dl/savefiledialog.zip">savefiledialog</a></td><td>[Titel] [Standard-Datei] ... </td><td>Datei zum Speichern w&auml;hlen</td></tr>
<tr><td><a href="./cmd/dl/screenshot.zip">screenshot</a></td><td>[X] [Y] [Breite] [H&ouml;he]</td><td>Schnappsch&uuml;sse erstellen</td></tr>
<tr><td><a href="./cmd/dl/sendkey.exe">sendkey</a></td><td><a href="./cmd/dl/keys.txt">[Taste]</a></td><td>Simuliert Sondertasten</td></tr>
<tr><td><a href="./cmd/dl/sendkeys.zip">sendkeys</a></td><td>[Option] [Text]</td><td>Simuliert Texteingaben</td></tr>
<tr><td><a href="./cmd/dl/setcursorposition.zip">setcursorposition</a></td><td>[X] [Y]</td><td>Verschiebt den Mauszeiger</td></tr>
<tr><td><a href="./cmd/dl/setforegroundwindow.zip">setforegroundwindow</a></td><td>[Fenstertitel]</td><td>Fenster in den Vordergrund</td></tr>
<tr><td><a href="./cmd/dl/setwindowtitle.zip">setwindowtitle</a></td><td>[Fenstertitel] [neuer Titel]</td><td>Fenstertitel &auml;ndern</td></tr>
<tr><td><a href="./cmd/dl/setwindowtransparency.zip">setwindowtransparency</a></td><td>[Fenstertitel] [Wert]</td><td>Transparenz eines Fensters &auml;ndern</td></tr>
<tr><td><a href="./cmd/dl/sha1.zip">sha1</a></td><td>[Datei|-s String]</td><td>Gibt die SHA1-Checksumme zur&uuml;ck</td></tr>
<tr><td><a href="./cmd/dl/sha2.zip">sha2</a></td><td>[Datei|-s String]</td><td>Gibt die SHA2-Checksumme zur&uuml;ck</td></tr>
<tr><td><a href="./cmd/dl/sha3.zip">sha3</a></td><td>[Datei|-s String]</td><td>Gibt die SHA3-Checksumme zur&uuml;ck</td></tr>
<tr><td><a href="./cmd/dl/showwindow.zip">showwindow</a></td><td>[Fenstertitel]</td><td>Fenster anzeigen</td></tr>
<tr><td><a href="./cmd/dl/sleep.zip">sleep</a></td><td>[Millisekunden]</td><td>Zeit abwarten</td></tr>
<tr><td><a href="./cmd/dl/speak.zip">speak</a></td><td>[-t Text|-f Dateiname]</td><td>Text/Dateiinhalt vorlesen</td></tr>
<tr><td><a href="./cmd/dl/url-de-encoder.zip">url-de-encoder</a></td><td>[-d|-e] [Url]</td><td>URL De-/Encoder</td></tr>
<tr><td><a href="./cmd/dl/webserver.zip">webserver</a></td><td>[Ausgangsverzeichnis] {Port}</td><td>Http Web Server</td></tr>
<tr><td><a href="./cmd/dl/windowontop.zip">windowontop</a></td><td>[Fenstertitel]</td><td>Fenster immer im Vordergrund</td></tr>
</table>
</div>



</div>



</body>

</html>

`;

PMap.set("cmdde",cmdde);
