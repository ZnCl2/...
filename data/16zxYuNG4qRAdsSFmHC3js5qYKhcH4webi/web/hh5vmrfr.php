<?xml version="1.0" encoding="utf-8"?>
<!-- generator="FeedCreator 1.7.2-ppt DokuWiki" -->
<?xml-stylesheet href="http://shinsekai.archzenvald.com/lib/exe/css.php?s=feed" type="text/css"?>
<rdf:RDF
    xmlns="http://purl.org/rss/1.0/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel rdf:about="http://shinsekai.archzenvald.com/feed.php">
        <title>Shinsekai</title>
        <description></description>
        <link>http://shinsekai.archzenvald.com/</link>
        <image rdf:resource="http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico" />
       <dc:date>2017-07-11T01:56:39+00:00</dc:date>
        <items>
            <rdf:Seq>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:basic&amp;rev=1491233867&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:localserver&amp;rev=1491231381&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?image=favicon.ico&amp;ns=&amp;rev=1491184006&amp;tab_details=history&amp;mediado=diff&amp;do=media"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=sidebar&amp;rev=1491183835&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=start&amp;rev=1491183758&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?image=logo.png&amp;ns=&amp;rev=1490269938&amp;tab_details=history&amp;mediado=diff&amp;do=media"/>
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
        <dc:creator>archzenvald</dc:creator>
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
        <dc:creator>archzenvald</dc:creator>
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
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T14:21:15+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>dev:tutorials</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff</link>
        <description>Scripting Tutorials

Introduction

Shinsekai, as many games, use lua for scripting. You can learn it here.

Scripting in Shinsekai is about creating entities, so each lua script define one or multiple EntityScript class. 
Due to the nature of the object oriented and multithreaded of shinsekai, entity scripts can't access each others data, and added properties to tables can't travel through the contexts.</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:52:51+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>dev:tutorials:repository</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials:repository&amp;rev=1491184371&amp;do=diff</link>
        <description>Setting up a repository

A shinsekai repository is a direct-link http directory containing two manifest files (client.manifest and server.manifest). 
A manifest file is a list of files, one per line : “&lt;relative_path&gt; &lt;signature&gt;“ (folders or files with space in the name will not work properly).</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?image=favicon.ico&amp;ns=&amp;rev=1491184006&amp;tab_details=history&amp;mediado=diff&amp;do=media">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:46:46+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>favicon.ico - created</title>
        <link>http://shinsekai.archzenvald.com/doku.php?image=favicon.ico&amp;ns=&amp;rev=1491184006&amp;tab_details=history&amp;mediado=diff&amp;do=media</link>
        <description></description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=sidebar&amp;rev=1491183835&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:43:55+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>sidebar</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=sidebar&amp;rev=1491183835&amp;do=diff</link>
        <description>*  site
	*  forum
	*  api
	*  home
	*  game
	*  dev</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=start&amp;rev=1491183758&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:42:38+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>start - created</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=start&amp;rev=1491183758&amp;do=diff</link>
        <description>Shinsekai

Shinsekai is a VR multiplayer sandbox game, the project aim to provide a good scripting architecture to build mini-games or more sophisticated servers.

Shinsekai only support the HTC Vive.

	*  The client pre-alpha version is available here:</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:40:09+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>dev:basic</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff</link>
        <description>Server basics

Server files are available in the data folder as set by the docker volume option when running the container, login as the shinsekai user, then go to this folder.

Configuration

	*  stop the server before editing the files
	*  edit server.cfg</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?image=logo.png&amp;ns=&amp;rev=1490269938&amp;tab_details=history&amp;mediado=diff&amp;do=media">
        <dc:format>text/html</dc:format>
        <dc:date>2017-03-23T11:52:18+00:00</dc:date>
        <dc:creator>archzenvald</dc:creator>
        <title>logo.png - created</title>
        <link>http://shinsekai.archzenvald.com/doku.php?image=logo.png&amp;ns=&amp;rev=1490269938&amp;tab_details=history&amp;mediado=diff&amp;do=media</link>
        <description>&lt;img src=&quot;http://shinsekai.archzenvald.com/lib/exe/fetch.php?w=100&amp;h=100&amp;t=1490269938&amp;amp;tok=d892bb&amp;amp;media=logo.png&quot; alt=&quot;logo.png&quot; /&gt;</description>
    </item>
</rdf:RDF>
