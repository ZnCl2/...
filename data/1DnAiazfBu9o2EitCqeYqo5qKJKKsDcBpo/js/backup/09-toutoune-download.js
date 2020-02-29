
class ToutounePage extends ZeroFrame {
}
var toutounePage = new ToutounePage();
var toutounePartsByPack = 800;
var toutouneSite;
var toutouneParts;
var toutounePartsDownloaded;
var toutouneFile;

toutouneInit();

function toutouneInit() {

    var params = new Array();
    var urlParams = window.location.search.split('?')[1].split('&');
    for (var i = 0; i < urlParams.length; i++) {
        var key = urlParams[i].split('=')[0];
        var value = decodeURIComponent(urlParams[i].split('=')[1]);
        params[key] = value;
    }

    toutouneParts = parseInt(params["parts"]);
    toutouneFile = params["file"];
    toutouneSite = params["site"];

    $("#banner").attr("src", "merged-ChezToutoune/" + toutouneSite + "/images/banner.jpg");
    $("#title1-1").text(params["title1"]);
    $("#title1-2").text(params["title1"]);
    $("#title2").text(params["title2"]);
    switch (Math.round(toutouneParts / toutounePartsByPack)) {
        case 1:
            $("#download2").hide();
            $("#download3").hide();
            $("#download4").hide();
            $("#download5").hide();
            $("#download6").hide();
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 2:
            $("#download3").hide();
            $("#download4").hide();
            $("#download5").hide();
            $("#download6").hide();
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 3:
            $("#download4").hide();
            $("#download5").hide();
            $("#download6").hide();
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 4:
            $("#download5").hide();
            $("#download6").hide();
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 5:
            $("#download6").hide();
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 6:
            $("#download7").hide();
            $("#download8").hide();
            break;
        case 7:
            $("#download8").hide();
            break;
    }

}

function toutouneDownload(packNumber) {

    toutounePage.cmd("wrapperNotification", ["info", "V\351rification...", 30000]);

    toutouneAsyncDownload(packNumber);

}

async function toutouneAsyncDownload(packNumber) {

    toutounePartsDownloaded = 0;

    for (var i = 1; i < toutouneParts + 1; i++) {
        var partString = i < 10 ? "00" + i.toString() : i < 100 ? "0" + i.toString() : i.toString();
        var fileString = toutouneFile + ".zip." + partString + ".b64";
        await toutouneGetPromiseFileInfo(fileString);
    }

    if (toutounePartsDownloaded === toutouneParts) {

        toutounePage.cmd("wrapperNotification", ["info", "Tous les blocs sont t\351l\351charg\351s, assemblage du fichier ZIP (1 minute environ)...", 60000]);
        var zip = new JSZip();
        var partMin = (packNumber - 1) * toutounePartsByPack + 1;
        var partMax = packNumber * toutounePartsByPack < toutouneParts ? packNumber * toutounePartsByPack : toutouneParts;
        var promiseFileGetArray = [];
        for (var i = partMin; i < partMax + 1; i++) {
            var partString = i < 10 ? "00" + i.toString() : i < 100 ? "0" + i.toString() : i.toString();
            var fileString = toutouneFile + ".zip." + partString + ".b64";
            promiseFileGetArray.push(toutouneGetPromiseFileGet(fileString, partString, zip));
        }

        Promise.all(promiseFileGetArray).then(function () {

            zip.generateAsync({type: "blob"})
                    .then(function (blob) {

                        saveAs(blob, toutouneFile + "_" + packNumber + ".zip");
                        toutounePage.cmd("wrapperNotification", ["done", "Assemblage termin\351 ! Vous pouvez enregistrer le fichier ZIP !", 30000]);
                    }).catch(function () {

                toutounePage.cmd("wrapperNotification", ["error", "Erreur lors de l'assemblage du fichier ZIP !", 30000]);
            });
        }).catch(function (partString) {

            toutounePage.cmd("wrapperNotification", ["error", "Bloc " + partString + " en erreur !", 30000]);
        });

    } else {

        toutounePage.cmd("wrapperNotification", ["info", toutounePartsDownloaded + " blocs sur " + toutouneParts + " sont t\351l\351charg\351s. ZeroNet s'occupe de terminer le travail. Vous pouver aller prendre un caf\351 (ou deux...) et r\351essayer plus tard l'enregistrement.", 30000]);

    }



}

function toutouneGetPromiseFileInfo(fileString) {

    return new Promise(function (resolve, reject) {

        toutounePage.cmd("optionalFileInfo", "merged-ChezToutoune/" + toutouneSite + "/files/" + fileString, function (fileInfo) {

            if (fileInfo.is_downloaded === 1) {
                toutounePartsDownloaded = toutounePartsDownloaded + 1;
            } else {
                toutounePage.cmd("fileGet", ["merged-ChezToutoune/" + toutouneSite + "/files/" + fileString, true, "base64", 1], function () {});
            }

            resolve();

        });

    });

}

function toutouneGetPromiseFileGet(fileString, partString, zip) {

    return new Promise(function (resolve, reject) {

        toutounePage.cmd("fileGet", ["merged-ChezToutoune/" + toutouneSite + "/files/" + fileString, true, "base64"], function (data64) {

            if (data64 === null) {
                reject(partString);
            } else {
                zip.file(toutouneFile + "/" + toutouneFile + ".zip." + partString, Base64Binary.decode(data64), {binary: true});
                resolve();
            }

        });
    });
}

