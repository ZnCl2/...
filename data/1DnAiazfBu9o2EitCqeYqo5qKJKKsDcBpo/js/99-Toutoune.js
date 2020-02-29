
class Page extends ZeroFrame {
}

var toutounePage = new Page();
var toutouneFileList;

toutouneInit();

function toutouneInit() {

    toutounePage.cmd("wrapperNotification", ["info", "Chargement de liste...", 3000]);

    toutounePage.cmd("optionalFileList", [null, "inner_path", 1000, "bigfile"], function (fileList) {

        for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].inner_path.substr(fileList[i].inner_path.length - 7, 7) !== "msgpack" && fileList[i].inner_path.substr(0, 13) !== "files/1DnAiaz") {

                $("#tbListe tbody").append("<tr><td><a href=\"" + fileList[i].inner_path + "\">" + fileList[i].inner_path.replace("files/", "") + "</ahref></td></tr>");

            }
        }

    });

}