//MSE buffering part

//shared variables
daemonLoadedIndex = -1;

daemonStopSignal = false;
daemonStopped = true;
daemonException = "n/a";

mediaSource = null;
sourceBuffer = null;

mp4Worker = null;

functionRefOpened = null;
functionRefUpdateEnd = null;




function prepareForMediaSource(contentType, codecs, moovPath, callback)
{
    var emptyMediaArgs = {"mediaSource": null, "sourceBuffer": null, "moovPath": null};
    
    if(mediaSource != null || sourceBuffer != null)
    {
        // check global variables
        console.log("Media Source: already running");
        
        callback("", emptyMediaArgs);
        return;
    }
    
    if(contentType.trim() == "" || codecs.trim() == "")
    {
        // check parameters
        console.log("Media Source: imcomplete codecs");
        
        // will not use MSE
        callback("", emptyMediaArgs);
        return;
    }
    
    var isChrome = navigator.userAgent.indexOf("Chrome/") >= 0;
    var isSandboxed = false;
    if(isChrome)
    {
        var result = sandblaster.detect();
        isSandboxed = (result == undefined || result == null || result.sandboxed);
    }
    

    if(isChrome && isSandboxed)
    {
        document.getElementById("chrome-bug").style.display = "table";
        
        // Chrome bug. Will not use MSE
        callback("", emptyMediaArgs);
        return;
    }
    
    var codecString = contentType + '; codecs="' + codecs + '"';
    
    if(!MediaSource.isTypeSupported(codecString))
    {
        console.error("Media Source: codec not supported.");
        
        // Codecs are not supported. Will not use MSE
        callback("", emptyMediaArgs);
        return;
    }
    
    /* Check MediaSource information availability */
    
    
    
    var isMoovSpecified = (moovPath != null && moovPath.trim() != "");
    
    
    console.log("Creating new mediaSource...");
    // global variable
    mediaSource = new MediaSource();
    
    
    //when mediaSouece is ready
    functionRefOpened = function opened(e)
    {   
        // global variable
        sourceBuffer = mediaSource.addSourceBuffer(codecString);
        // create source buffer
        
        // update end
        functionRefUpdateEnd = function()
        {
            if(isMoovSpecified)
            {
                // global variable
                mp4Worker.postMessage(["signal", "continue"]);
            }
            else
            {
                waitAndLoadSegment(daemonLoadedIndex+1, mediaSource, sourceBuffer);
            }
        };
        
        sourceBuffer.addEventListener("updateend", functionRefUpdateEnd);
        
        
        callback(mediaSourceUrl, 
                 {"mediaSource": mediaSource, "sourceBuffer": sourceBuffer, "moovPath": moovPath});
        
        // we can't load things now because we don't know the file size
    };
    
    mediaSource.addEventListener("sourceopen", functionRefOpened);
    
    
    var mediaSourceUrl = window.URL.createObjectURL(mediaSource);
    console.log("mediaSourceUrl created: " + mediaSourceUrl);
    
    // Load M.S.URL to player. Trigger `ms.sourceopen` event.
    loadMediaToPlayer(mediaSourceUrl, contentType, false, true);
    
    
}

function waitAndLoadSegment(toIndex, mediaSource, sourceBuffer, retry=50, worker=null)
{
    // coordinator
    
    daemonStopped = false; //alive
    daemonException = "unset";
    
    if(retry <= 0)
    {
        console.error("Daemon: I've waited for so long...");
        
        //daemonException = "exception";
        //daemonStopSignal = false;
        //daemonStopped = true;
        
        console.log("Daemon: back in 1 second");
        
        setTimeout(function()
        {
            waitAndLoadSegment(toIndex, mediaSource, sourceBuffer, 50, worker);
        }, 1000);
        
        return;
    }
    else if(toIndex > bufferReferences.length - 1)
    {
        console.info("Daemon: We are done. Calling endOfStream()...");
        
        if(worker != null)
        {
            worker.postMessage(["signal", "noData"]);
        }
        else
        {
            mediaSource.endOfStream();
        }
        
        
        daemonStopSignal = false;
        daemonStopped = true;
        
        return;
    }
    else if(daemonStopSignal)
    {
        console.error("Daemon: aborted.");
        
        daemonException = "exception";
        daemonStopSignal = false;
        daemonStopped = true;
        
        return;
    }
    
    
    assert(daemonLoadedIndex <= toIndex, 
           "DaemonLoadedIndex: " + daemonLoadedIndex + ", toIndex: " + toIndex);
    
    //console.log("loaded index, assigned task: " + daemonLoadedIndex+ " " + toIndex);
    
    //global: daemonLoadedIndex
    if(daemonLoadedIndex == toIndex)
    {
        console.log("Daemon: loaded all the way to index " + toIndex);
        console.log("Loading next index...");
        
        //let's load the next part
        setTimeout(function()
        {
            waitAndLoadSegment(toIndex+1, mediaSource, sourceBuffer, 50, worker);
        }, 500);
        return;
    }
    
    
    //now we are required to load things
    
    assert(daemonLoadedIndex + 1 == toIndex, 
       "DaemonLoadedIndex: " + daemonLoadedIndex + ", toIndex: " + toIndex);
    
    //global: cacheLatestAvailableIndex
    latestAvailableIndex = cacheLatestAvailableIndex;
    
    //console.log("latestAvailableIndex: " + latestAvailableIndex);
    
    if(latestAvailableIndex < toIndex)
    {
        //We are too fast, sleep.
        setTimeout(function()
        {
            waitAndLoadSegment(toIndex, mediaSource, sourceBuffer, retry-1, worker);
        }, 500 + 1000*(retry/50));
        return;
    }
    else
    {
        loadSegment(toIndex, mediaSource, sourceBuffer, worker);
    }
}

function loadSegment(index, mediaSource, sourceBuffer, worker=null)
{
    // append to buffer
    console.log("Daemon: latestAvailableIndex=" + latestAvailableIndex);
    console.log("Daemon: loading index " + index);
    
    daemonLoadedIndex = index;
    
    if(worker != null) // we are using the muxer
    {
        // append to MP4 Muxer
        worker.postMessage(["mp4", bufferReferences[index]]);
        // then wait for `wantMore` signal handler to call waitAndLoadSegment(...)
    }
    else
    {
        // append to SourceBuffer
        sourceBuffer.appendBuffer(bufferReferences[index]);
        
        //then wait for "updateend" event handler to call waitAndLoadSegment(...)
    }
}

function startDaemon(mediaSource, sourceBuffer, moovPath, callback, failure)
{
    if(!daemonStopped)
    {
        callback();
        return;
    }
    
    if(retry <= 0)
    {
        console.error("Daemon does not start!");
        
        failure();
        return;
    }
    
    //resetDaemonVariables();
    
    daemonStopped = false;
    
    var isMoovSpecified = (moovPath != null && moovPath.trim() != "");
    // we can use MP4Worker
    if(isMoovSpecified)
    {
        requestBinary(moovPath, "arraybuffer", function(xmlHttp)
        {
            var moov = xmlHttp.response;
            
            requestBinary("js/mp4worker.js", "blob", function(x)
            {
                var workerUrl = window.URL.createObjectURL(x.response);
                // spawn worker
                mp4Worker = new Worker(workerUrl);
                
                registerWorkerEvents(mp4Worker, moov, mediaSource, sourceBuffer);
                
                // initialize worker
                var jsUrls = ["js/mp4parser.js", "js/mp4alg.js", "js/mp4builder.js"];
                
                var absJsUrls = jsUrls.map(function(item)
                {
                    var a = document.createElement("a");
                    a.href = item;
                    
                    var result = a.href;
                    return result;
                });
                
                console.warn("absJSURLs");
                console.warn(absJsUrls);
                
                mp4Worker.postMessage(["import", absJsUrls]);
                
                // then wait for worker to emit signals
                
            }, function(x, r)
            {
                console.warn("Failed to download mp4worker. Using fallback.");
                //waitAndLoadSegment(0, mediaSource, sourceBuffer);
                daemonException = "exception";
            });
            
        }, function(xmlHttp, reason)
        {
            console.warn("Failed to download moov. Using fallback.");
            //waitAndLoadSegment(0, mediaSource, sourceBuffer);
            daemonException = "exception";
        });
    }
    else
    {
        //load [0] first
        waitAndLoadSegment(0, mediaSource, sourceBuffer);
        //call the coordinator
    }
}

function stopDaemon(callback, failure, retry=10)
{
    if(daemonStopped)
    {
        console.log("DAEMON is reported to be STOPPED");
        
        resetDaemonVariables();
        
        callback();
        return;
    }
    
    if(retry <= 0)
    {
        console.error("Daemon does not stop!");
        
        failure();
        return;
    }
    
    daemonStopSignal = true;
    
    setTimeout(function()
    {
        stopDaemon(callback, failure, retry-1);
    }, 500);
}

function resetDaemonVariables()
{
    if(mediaSource != null)
    {
        mediaSource.removeEventListener("sourceopen", functionRefOpened);
    }
    
    if(sourceBuffer != null)
    {
        sourceBuffer.removeEventListener("updateend", functionRefUpdateEnd);
    }
    
    if(mp4Worker != null)
    {
        mp4Worker.terminate();
        //mp4Worker.removeEventListener("message", functionRefOnMessage)
    }
    
    
    bufferReferences = null;

    cacheIsPlayerShown = false;
    cacheLatestAvailableIndex = -1;

    daemonLoadedIndex = -1;

    daemonStopSignal = false;
    daemonStopped = true;
    daemonException = "unset";

    mediaSource = null;
    sourceBuffer = null;
    
    mp4Worker = null;
    
    functionRefOpened = null;
    functionRefUpdateEnd = null;
    //functionRefOnMessage = null;
    
}


function registerWorkerEvents(worker, moovAb, mediaSource, sourceBuffer)
{
    worker.onerror = function(e)
    {
        console.error(
            "WorkerError: Line " + e.lineno + " in " + e.filename + ": " + e.message);
        
        daemonException = "exception";
    };
    
    worker.onmessage = function(e)
    {
        var cmd = e.data[0];
        var args = e.data[1];
        
        switch(cmd)
        {
            case "mp4":
                handleMp4Cmd(args, sourceBuffer);
                break;
            
            case "signal":
                handleSignalCmd(args, worker, moovAb, mediaSource, sourceBuffer);
                break;
            
            default:
                console.warn("unrecognized worker signal cmd=" + cmd);
                break;
        }
    };
}

function handleMp4Cmd(args, sourceBuffer)
{
    sourceBuffer.appendBuffer(args);
}

function handleSignalCmd(args, worker, moovAb, mediaSource, sourceBuffer)
{
    if(args == "imported")
    {
        mp4Worker.postMessage(["moov", moovAb]);
    }
    else if(args == "samplesLoaded")
    {
        waitAndLoadSegment(0, mediaSource, sourceBuffer, 50, worker);
    }
    else if(args == "wantMore")
    {
        waitAndLoadSegment(daemonLoadedIndex+1, mediaSource, sourceBuffer, 50, worker);
    }
    else if(args == "done")
    {
        mediaSource.endOfStream();
    }
    else
    {
        console.warn("unrecognized worker signal sig=" + args);
    }
}