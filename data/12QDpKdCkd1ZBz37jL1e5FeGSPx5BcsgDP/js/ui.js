progressBar = document.getElementById('progress-bar');

retry = 3;


cacheIsPlayerShown = false;
cacheLatestAvailableIndex = -1;

//MSE buffering
bufferReferences = null;


(function()
{
    main();
})();

function main()
{
    var locationHash = "#" +
        (location.search.startsWith("?") ? location.search.substring(1) : location.search);

    if (!locationHash.includes("json="))
    {
        locationHash = "#type=video/mp4&codecs=avc1.640028,mp4a.40.2&json=files/yrc_ed_mp4/file.json&moov=files/yrc_ed_mp4/yrcedmoov.dat&poster=files/yrc_ed_mp4/poster.jpg";
    }

    console.log("location.search:  " + location.search);
    console.log("constructed hash: " + locationHash);

    var hashObj = parseLocationHash(locationHash);

    console.log(hashObj);


    // show poster (async)
    showPosterRecursion(hashObj.poster, 3);


    // stop daemon
    stopDaemon(callback, failure);

    function callback()
    {
        prepareForMediaSource(hashObj.contentType, hashObj.codecs, hashObj.moovPath,
        function(msUrl, mediaArgs)
        {
            console.log("Got media url: " + msUrl);
            uiDownload(hashObj.jsonPath, hashObj.contentType, msUrl, mediaArgs);
        });
    }

    function failure()
    {
        throw "Daemon does not stop, ****!";
    }
}

function parseLocationHash(locationHash)
{
    var hashInfo = {jsonPath: "", contentType: "", codecs: "", moovPath: "", poster: ""};

    hash = locationHash.trim();

    if(!hash.startsWith("#") || hash.indexOf("=") < 0)
    {
        return hashInfo;
    }

    paramList = hash.substring(1).split("&");

    for(var param of paramList)
    {
        if(hashInfo.jsonPath != ""
           && hashInfo.contentType != "" && hashInfo.codecs != "" && hashInfo.moovPath != ""
           && hashInfo.poster != "")
        {
            break;
        }

        if(param.startsWith("json="))
        {
            hashInfo.jsonPath = decodeURIComponent(param.substring("json=".length));
        }
        else if(param.startsWith("type="))
        {
            hashInfo.contentType = decodeURIComponent(param.substring("type=".length));
        }
        else if(param.startsWith("codecs="))
        {
            hashInfo.codecs = decodeURIComponent(param.substring("codecs=".length));
        }
        else if(param.startsWith("moov="))
        {
            hashInfo.moovPath = decodeURIComponent(param.substring("moov=".length));
        }
        else if(param.startsWith("poster="))
        {
            hashInfo.poster = decodeURIComponent(param.substring("poster=".length));
        }
    }

    return hashInfo;
}




function showPoster(posterPath)
{
    showPoster(posterPath, 1);
}

function showPosterRecursion(posterPath, retry)
{
    if(retry <= 0)
    {
        console.error("Poster cannot be downloaded...");
        return;
    }
    if(posterPath.trim() == "")
    {
        console.log("No poster available.");
        return;
    }

    console.log("Downloading poster...");

    requestBinary(posterPath + "?_r="+Math.random(), "arraybuffer", function(xmlHttp)
    {
        if(xmlHttp.status == 200)
        {
            showPosterCallback(posterPath);
        }
        else
        {
            console.error("Poster: got a " + xmlHttp.status);
        }
    }, function(xmlHttp, reason)
    {
        setTimeout(function()
        {
            showPosterRecursion(posterPath, retry - 1);
        }, 1000);
    });
}

function showPosterCallback(posterPath)
{
    document.getElementById("poster").src = posterPath;
    document.getElementById("video-player").poster = posterPath;
}







function uiDownload(jsonPath, contentType, msUrl, mediaArgs)
{
    //use it in this way:
    //register events
    events = initEventObj();

    events.onjsonload = generateOnJsonLoad(mediaArgs); // generate function
    events.onjsonerror = jsonerror;

    events.onadding = adding;
    events.onadded = generateOnAdded(contentType, msUrl); // generate function
    events.onpieceerror = pieceerror;

    events.onblobbuilding = blobbuilding;
    events.onfinish = generateOnFinish(contentType); //content type
    events.onbuilderror = builderror;

    events.otherParams = {"blobType": "application/force-download"};

    downloadBigFile(jsonPath, events); //json path
}



function generateOnJsonLoad(mediaArgs)
{
    // responsible for starting daemon
    var f = function(infoArgs)
    {
        jsonload(infoArgs, mediaArgs);
    }
    return f;
}

function generateOnAdded(contentType, mediaSourceUrl)
{
    // resp. for showing player with correct src URL
    var f = function(eventArgs)
    {
        added(eventArgs, mediaSourceUrl, contentType);
    }

    return f;
}

function generateOnFinish(contentType)
{
    var f = function(blob)
    {
        finish(blob, contentType);
    }

    return f;
}



function jsonload(infoArgs, mediaArgs)
{
    var nParts = infoArgs.filePartInfo.length;
    bufferReferences = Array(nParts);
    initProgressBar(progressBar, nParts);

    document.getElementById("progress-prompt-text").style.display = "none";
    //hide prompt text

    var fileName = infoArgs.bigFileInfo["fileName"];
    document.getElementById("download").setAttribute("data-download", fileName);

    var fileNameElement = document.getElementById("file-name");
    fileNameElement.innerText = fileName;
    fileNameElement.style.display = "table";


    //MSE Buffering
    var mediaSource  = mediaArgs.mediaSource;
    var sourceBuffer = mediaArgs.sourceBuffer;
    var moovPath     = mediaArgs.moovPath;
    if(mediaSource != null && sourceBuffer != null)
    {
        //resetDaemonVariables();
        bufferReferences = Array(nParts);

        startDaemon(mediaSource, sourceBuffer, moovPath, nop, nop);
    }

}

function jsonerror(e)
{
    setProgressBarColor(progressBar, "yellow");

    if(retry > 0)
    {
        retry = retry - 1;
        setTimeout(main, 1000);
    }
    else
    {
        setProgressBarColor(progressBar, "red");

        document.getElementById("progress-prompt-text").textContent =
            "Failed. Please reload this page.";
    }

}

function adding(index)
{
    setBlockColor(progressBar, index, "yellow");
}

function added(eventArgs, url, contentType)
{
    var index = eventArgs.index;
    var bytes = eventArgs.pieceBytes;


    setBlockColor(progressBar, index, "green");


    if(!url.startsWith("mediasource:") && !url.startsWith("blob:"))
    {
        //if we don't need to do MSE streaming
        return;
    }

    //MSE streaming
    assert(bufferReferences[index] == null, "Buffer References [" + index + "] in use.");


    bufferReferences[index] = bytes;
    // load bytes into buffer, for MSE


    latestAvailableIndex = lastInFirstSequence(bufferReferences);
    //last item in the first continuous seqence.

    if(latestAvailableIndex > 0)
    {
        assert(bufferReferences[latestAvailableIndex] != null,
           "Buffer References [" + latestAvailableIndex + "] is null.");
    }


    cacheLatestAvailableIndex = latestAvailableIndex;
    //cache latest available index

    if(!cacheIsPlayerShown)
    {
        cacheIsPlayerShown = isPlayerShown();
        //cache player state for better performance
    }

    if(!cacheIsPlayerShown)
    {
        if(latestAvailableIndex >= 2)
        {
            console.log("UI OnAdded: Time to show the player.")
            showPlayer(url, contentType);
        }
    }
}

function pieceerror(index)
{
    //when a "PieceError" happens, download.js returns.

    setBlockColor(progressBar, index, "yellow");

    if(retry > 0)
    {
        retry = retry - 1;
        setTimeout(main, 1000);
    }
    else
    {
        setProgressBarColor(progressBar, "red");
    }
}

function blobbuilding(e)
{
    setProgressBarColor(progressBar, "yellow");
}

function finish(blob, contentType)
{
    retry = 3;
    setProgressBarColor(progressBar, "green");

    var url = URL.createObjectURL(blob);
    showPlayer(url, contentType, true);
    showFinishedLook(url);
}

function builderror(e)
{
    setProgressBarColor(progressBar, "red");
}

function whichPlayer(contentType)
{
    var playerType = contentType.startsWith("audio/") ? "audio-player" : "video-player";
    var player = document.getElementById(playerType);
    return player;
}

function loadMediaToPlayer(url, contentType, showPlayer=false, override=false)
{
    player = whichPlayer(contentType);

    if(override)
    {
        //reconstruct player
        player.removeAttribute("src");
        player.innerHtml = "";

        var newPlayer = document.createElement(player.tagName);
        for(var attr of player.attributes)
        {
            newPlayer.setAttribute(attr.name, attr.value);
        }

        newPlayer.setAttribute("data-new", "true");

        player.parentElement.replaceChild(newPlayer, player);

        player = newPlayer;

    }

    //var noVideoLoaded = player.getElementsByTagName('source').length == 0;
    var noVideoLoaded = player.src == "";

    if(noVideoLoaded)
    {
        //var source = document.createElement("source");
        //source.src = url;
        //source.type = contentType;
        //player.appendChild(source);

        player.src = url;
    }

    if(showPlayer)
    {
        player.style.display = "block";
    }
}

function showPlayer(url, contentType, beSmart=false)
{
    if(!beSmart && isPlayerShown())
    {
        console.log("Player shown!!!");
        return;
        //when "onadded" calls us, don't be smart.
    }

    //when "onfinish" calls us, be smart.

    var override = beSmart && daemonException != "unset";
    //if daemon exited ungracefully, reload the player

    var currentTime = whichPlayer(contentType).currentTime;

    loadMediaToPlayer(url, contentType, true, override);
    //load media and display player -- true for displaying the player

    if(override)
    {
        console.warn("It seems that daemon exited ungracefully.");

        var newPlayer = whichPlayer(contentType);
        newPlayer.currentTime = currentTime - 0.5;
        newPlayer.play();
    }


    document.getElementById("chrome-bug").style.display = "none";

    document.getElementById("poster-container").style.display = "none";
    //hide poster


}

function showFinishedLook(url)
{
    document.getElementById("progress-bar").style.display = "none";
    //hide progress bar



    var download = document.getElementById("download");
    var fileNameLink = document.getElementById("file-name");

    download.href = url;
    fileNameLink.href = url;


    fileName = download.getAttribute("data-download");


    isFirefox = navigator.userAgent.indexOf("Gecko/") >= 0;
    isSandboxed = false;
    if(isFirefox)
    {
        var result = sandblaster.detect();
        isSandboxed = (result == undefined || result == null || result.sandboxed);
    }


    if(isFirefox && isSandboxed)
    {
        document.getElementById("firefox-bug").style.display = "block";
    }
    else
    {
        download.download = fileName;
        fileNameLink.download = fileName;
    }

    //show download link and Firefox bug message
    document.getElementById("fallback").style.display = "block";
}

function isPlayerShown()
{
    var audioPlayer = document.getElementById("audio-player");
    var videoPlayer = document.getElementById("video-player");

    var audioShown = audioPlayer.style.display == "block";
    var videoShown = videoPlayer.style.display == "block";

    return (audioShown || videoShown);
}

function initProgressBar(progressBar, numberParts)
{
    progressBar.innerHTML = "";

    for(var i = 0; i < numberParts; i++)
    {
        var span = document.createElement("span");

        span.setAttribute("class", "progress-block white");
        span.setAttribute("id", progressBlockId(i));

        span.innerHTML = "&nbsp;&nbsp;";

        progressBar.appendChild(span);
    }

}

function progressBlockId(index)
{
    return "b"+index;
}

function setBlockColor(progressBar, index, style)
{
    var id = progressBlockId(index);

    var spanCollection = progressBar.getElementsByClassName("progress-block");

    for(span of spanCollection)
    {
        if(span.id == id)
        {
            span.setAttribute("class", "progress-block " + style);
            return;
        }
    }
}

function setProgressBarColor(progressBar, style)
{
    var spanCollection = progressBar.getElementsByClassName("progress-block");

    for(span of spanCollection)
    {
        span.setAttribute("class", "progress-block " + style);
    }
}
