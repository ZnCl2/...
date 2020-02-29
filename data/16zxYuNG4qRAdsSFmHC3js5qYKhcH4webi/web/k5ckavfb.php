<?xml version="1.0" encoding="utf-8"?>
<!-- generator="FeedCreator 1.7.2-ppt DokuWiki" -->
<?xml-stylesheet href="http://shinsekai.archzenvald.com/lib/exe/css.php?s=feed" type="text/css"?>
<rdf:RDF
    xmlns="http://purl.org/rss/1.0/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel rdf:about="http://shinsekai.archzenvald.com/feed.php">
        <title>Shinsekai dev:tutorials</title>
        <description></description>
        <link>http://shinsekai.archzenvald.com/</link>
        <image rdf:resource="http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico" />
       <dc:date>2017-07-11T01:42:58+00:00</dc:date>
        <items>
            <rdf:Seq>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:basic&amp;rev=1491233867&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:localserver&amp;rev=1491231381&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff"/>
            </rdf:Seq>
        </items>
    </channel>
    <image rdf:about="http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico">
        <title>Shinsekai</title>
        <link>http://shinsekai.archzenvald.com/</link>
        <url>http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico</url>
    </image>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:basic&amp;rev=1491233867&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T15:37:47+00:00</dc:date>
        <title>dev:tutorials:basic</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:basic&amp;rev=1491233867&amp;do=diff</link>
        <description>Basic EntityScript

	*  A script load some resources and define some entity scripts.
	*  The context is not shared with other scripts, so global variables are only available for this script.
	*  Each lua script is executed when the lua threads are created (so the script can be executed 8 times if there are 8 threads).</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:localserver&amp;rev=1491231381&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T14:56:21+00:00</dc:date>
        <title>dev:tutorials:localserver</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:localserver&amp;rev=1491231381&amp;do=diff</link>
        <description>Local server setup

To easily test your scripts, starting a local server is a necessity.

Installation

GNU/Linux

Same setup, see server setup.

Windows

	*  install docker for windows
	*  when the VM is up, type docker-machine ip to get the VM server ip
	*  create a directory somewhere for the server</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:52:51+00:00</dc:date>
        <title>dev:tutorials:repository</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff</link>
        <description>Setting up a repository

A shinsekai repository is a direct-link http directory containing two manifest files (client.manifest and server.manifest). 
A manifest file is a list of files, one per line : “&lt;relative_path&gt; &lt;signature&gt;“ (folders or files with space in the name will not work properly).</description>
    </item>
</rdf:RDF>
