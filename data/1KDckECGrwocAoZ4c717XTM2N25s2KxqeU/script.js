var DEBUG_MESSAGES = false;
var DEBUG_WINDOWING = false;

function tryLoadGame() {
    console.log("Initializing main script");
    var GetGameUrl = function (l) {
        //var PATH = "/17aqJNrBjH63D5kgjLLfFi3FZVtW74JDxS/lib/";
        var PATH = "/lib/";
        var code = l;
        if (code && code.length > 1) {
            try {
                code = atob(code.replace(/\-/g, '='));
            } catch (ex) {
                console.error("Decoder Error. Value:", l, "Error:", ex);
                return null;
            }
        }
        if (code && code.length > 1) {
            //return PATH + code.substr(0, 1).toUpperCase() + "/" + encodeURIComponent(code).replace(/!/g,"%21");
            return PATH + code.substr(0, 1).toUpperCase() + "/" + code;
        }
        return null;
    };

    var startGame = function (game) {
        console.info("Starting", game);
        if (FileReader.prototype.readAsBinaryString) {
            windowingInitialize();
            if (game) {
                //load game and start
                getGame(game, function (data) {
                    if (data.length >= 32 * 1024) {
                        var name = data.substr(308, 16).replace(/[\x00\s]/g, " ");
                        console.log("Got ROM:", data.length, name);

                        //Set up download link
                        //var G = "data:application/octet-stream;base64," + btoa(data);
                        var G = game.substr(1);
                        var download = document.querySelector("#download_rom a");
                        download.href = G;
                        download.title = name;
                        //Use last name segment as file name
                        //download.download = game.split('/').pop();

                        initPlayer();
                        start(mainCanvas, data);
                    } else {
                        console.error("Invalid ROM! Content:", data);
                    }
                });
            } else {
                console.info("No ROM loaded. No valid game supplied");
            }
        } else {
            document.getElementById("GameBoy").style.display = "none";
            document.getElementById("notSupported").style.display = "block";
        }
    };

    document.querySelector("#browse_roms").addEventListener("click", function () {
        top.location.href = "games.html";
    });

    var game = GetGameUrl(location.hash.substr(1));
    console.log("Game is", game);
    if (game) {
        var G = game.substr(1);
        var download = document.querySelector("#download_rom a");
        download.href = G;
        download.title = "Unknown ROM";

        startGame(game);
    } else {
        top.location.href = "games.html";
    }
}
