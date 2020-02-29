<?xml version="1.0" encoding="utf-8"?>
<!-- generator="FeedCreator 1.7.2-ppt DokuWiki" -->
<?xml-stylesheet href="http://shinsekai.archzenvald.com/lib/exe/css.php?s=feed" type="text/css"?>
<rdf:RDF
    xmlns="http://purl.org/rss/1.0/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel rdf:about="http://shinsekai.archzenvald.com/feed.php">
        <title>Shinsekai dev</title>
        <description></description>
        <link>http://shinsekai.archzenvald.com/</link>
        <image rdf:resource="http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico" />
       <dc:date>2017-07-11T01:56:55+00:00</dc:date>
        <items>
            <rdf:Seq>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:setup&amp;rev=1491155873&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:start&amp;rev=1491143418&amp;do=diff"/>
                <rdf:li rdf:resource="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff"/>
            </rdf:Seq>
        </items>
    </channel>
    <image rdf:about="http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico">
        <title>Shinsekai</title>
        <link>http://shinsekai.archzenvald.com/</link>
        <url>http://shinsekai.archzenvald.com/lib/exe/fetch.php?media=favicon.ico</url>
    </image>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T01:40:09+00:00</dc:date>
        <title>dev:basic</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:basic&amp;rev=1491183609&amp;do=diff</link>
        <description>Server basics

Server files are available in the data folder as set by the docker volume option when running the container, login as the shinsekai user, then go to this folder.

Configuration

	*  stop the server before editing the files
	*  edit server.cfg</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:setup&amp;rev=1491155873&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-02T17:57:53+00:00</dc:date>
        <title>dev:setup</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:setup&amp;rev=1491155873&amp;do=diff</link>
        <description>Server setup

To simplify the distribution, the server is installed through docker. If you don't know what docker is, take time to learn it before continuing this tutorial.

	*  first, you need a GNU/Linux machine with docker support (a recent kernel is needed for that, KVM VPS or a dedicated server will do).</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:start&amp;rev=1491143418&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-02T14:30:18+00:00</dc:date>
        <title>dev:start</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:start&amp;rev=1491143418&amp;do=diff</link>
        <description>*  server setup
	*  server basics
	*  scripting tutorials</description>
    </item>
    <item rdf:about="http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff">
        <dc:format>text/html</dc:format>
        <dc:date>2017-04-03T14:21:15+00:00</dc:date>
        <title>dev:tutorials</title>
        <link>http://shinsekai.archzenvald.com/doku.php?id=dev:tutorials&amp;rev=1491229275&amp;do=diff</link>
        <description>Scripting Tutorials

Introduction

Shinsekai, as many games, use lua for scripting. You can learn it here.

Scripting in Shinsekai is about creating entities, so each lua script define one or multiple EntityScript class. 
Due to the nature of the object oriented and multithreaded of shinsekai, entity scripts can't access each others data, and added properties to tables can't travel through the contexts.</description>
    </item>
</rdf:RDF>
