DefaultMaxRetry = 3;


function initEventObj()
{
    var events = {
        onjsonload: nop,
        onjsonerror: nop,

        onadding: nop,
        onadded: nop,
        onpieceerror: nop,

        onblobbuilding: nop,
        onfinish: nop,
        onbuilderror: nop,
        
        otherParams: {},
    };
    return events;
}

function downloadBigFile(jsonPath, events)
{
    callback = function(xmlHttp)
    {
        handleJsonData(xmlHttp, events)
    };
    
    failure = function(xmlHttp, reason)
    {
        events.onjsonerror(null);
        requestFailed(xmlHttp, reason);
    }
    
    requestText(jsonPath, "application/json", callback, failure)
}


    
function handleJsonData(xmlHttp, events)
{   
    var a = null;
    try
    {
        a = readFileJson(xmlHttp.responseText);
    }
    catch(e)
    {
        console.log(e);
        events.onjsonerror(null);
        
        return;
    }
    
    var bigFileInfo = a[0], filePartInfo = a[1];
    var infoArgs = {"bigFileInfo": bigFileInfo, "filePartInfo": filePartInfo};
    
    events.onjsonload(infoArgs);
    
    var fileParts = Array(filePartInfo.length);
    
    //var index = getEmptySlot(fileParts);
    var index = 0;
    secureAdd(infoArgs, index, fileParts, events, DefaultMaxRetry);
}

function requestFailed(xmlHttp, reason)
{
    console.error("Failed!!!");
    console.log(reason);
}



function secureAdd(infoArgs, index, array, events, retry)
{
    if(retry <= 0)
    {
        console.error("Download piece " + index + " failed.");
        events.onpieceerror(index);
        
        return;
    }
    
    if (getEmptySlot(array) == -1)
    {
        console.log("Finished. Now merging files");
        events.onblobbuilding(null);
        
        buildBlob(infoArgs.bigFileInfo, array, events);
        return;
    }
    
    if(array[index] != null)
    {
        throw "Redownloading [" + index + "] ???";
    }
    
    var pieceInfo = infoArgs.filePartInfo[index];
    
    console.log("Downloading piece " + index);
    events.onadding(index);
    
    requestBinary(pieceInfo["path"]+"?_r="+Math.random(), "arraybuffer", 
    function(xmlHttp)
    {
        handlePiece(infoArgs, index, array, events, DefaultMaxRetry, xmlHttp.response);
    },
    function(xmlHttp, reason)
    {
        var newRetry = retry;
        if(reason.type == "abort")
        {
            console.log("Download: Aborted");
            
            newRetry = 0;
        }
        else if(reason.type == "timeout")
        {
            console.log("Download: Timeout");
            
            newRetry -= 0.5;
        }
        else
        {
            console.log("Download: Error");
            
            newRetry -= 1;
        }
        
        setTimeout(function()
        {
            secureAdd(infoArgs, index, array, events, newRetry);
        }, 2000);
        
    });
}

function handlePiece(infoArgs, index, array, events, retry, pieceBytes)
{
    var pieceInfo = infoArgs.filePartInfo[index];
    
    var valid = checkPiece(pieceInfo, pieceBytes);
    
    if(valid)
    {
        console.log("Piece looks valid, saving...");
        array[index] = pieceBytes;
        
        events.onadded({"index": index, "pieceBytes": pieceBytes});
        
        //Next piece
        secureAdd(infoArgs, getEmptySlot(array), array, events, DefaultMaxRetry);
    }
    else
    {
        console.log("Piece is corrupted. Retrying... " + index);
        setTimeout(function()
        {
            secureAdd(infoArgs, index, array, event, retry-1)
        }, 2000);
    }
}

function checkPiece(pieceInfo, pieceBytes)
{
    var correctSize = pieceInfo["size"];
    var actualSize = pieceBytes.byteLength;
    
    console.log("correct: " + correctSize + " bytes");
    console.log("received " + actualSize + " bytes");
    
    if (correctSize != actualSize)
    {
        return false;
    }
    
    var algorithm = convert(pieceInfo["hashingAlgorithm"]);
    var correctHash = pieceInfo["hash"];
    
    startTime = new Date().getTime();

    
    var actualHash = algorithm(pieceBytes);
    
    endTime = new Date().getTime();
    
    console.log(endTime - startTime);
    
    console.log("Correct: " + correctHash);
    console.log("Actual:  " + actualHash);
    
    if(correctHash != actualHash)
    {
        return false;
    }
    
    return true;
}

function convert(algorithmString)
{
    switch(algorithmString)
    {
        case "sha512":
            return asmCrypto.SHA512.hex;
        
        case "sha256":
            return asmCrypto.SHA256.hex;
        
        default:
            throw "Unsupported hashing algorithm.";
    }
}

function buildBlob(bigFileInfo, array, events)
{
    blobType = "application/octet-stream";
    if(events.otherParams["blobType"] != undefined)
    {
        blobType = events.otherParams["blobType"];
    }
    
    var blob = new Blob(array, {type: blobType});
    
    console.log("using blob type "+blobType);
    
    var correctSize = bigFileInfo["size"];
    var actualSize = blob.size;
    
    if (correctSize != actualSize)
    {
        console.error("incorrect big file size");
        events.onbuilderror(null);
        
        return;
    }
    
    var reader = new FileReader();
    reader.addEventListener("loadend", function()
    {
        // reader.result contains the contents of blob as a typed array
        
        // async hash check
        //var hashWorker = new Worker("js/async-hash.js");
        
        requestBinary("js/asmcrypto.js", "arraybuffer", function(xmlHttp)
        {
            library = new Blob([xmlHttp.response]);
            
            
            checkHashAsync(bigFileInfo, reader.result, library, function(e)
            {
                var correctHash = bigFileInfo["hash"];
                var actualHash = e.data;

                console.log("Correct: " + correctHash);
                console.log("Actual:  " + actualHash);

                if (correctHash != actualHash)
                {
                    console.error("incorrect big file HASH");
                    events.onbuilderror(null);

                    return;
                }
                else
                {
                    console.log("Saving Big File...");
                    events.onfinish(blob);
                }
            });

        }, function(xmlHttp, reason)
        {
            console.error("async hash: cannot get asmCrypto.js");
        });
    });
    reader.readAsArrayBuffer(blob);
    
}

function checkHashAsync(bigFileInfo, bytes, library, onWorkerDone)
{
    simplerWorker("js/async-hash.js", function(hashWorker)
    {
        hashWorker.onmessage = onWorkerDone;
        hashWorker.postMessage([bigFileInfo["hashingAlgorithm"], bytes, library]);
    });
}