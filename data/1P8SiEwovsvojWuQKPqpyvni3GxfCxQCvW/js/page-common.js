/*
	Framework.js r1 | (c) 2014 - 2018 Plasmmer | https://plasnerd.github.io/Framework.js/LICENSE.md 
*/

if(!window.zeroPage) {
	zeroFrame = new ZeroFrame();
	zeroPage = new ZeroPage(zeroFrame);
}

var body = document.getElementsByTagName("BODY")[0];

/*Show features only for ZeroNet or only for clearnet*/
if (document.location.href.indexOf("wrapper_nonce") > 0) zeronet();
else clearnet();

function clearnet() {
body.innerHTML = '<style>zeronet{display:none}</style>' + body.innerHTML;
}

function zeronet() {
body.innerHTML = '<style>clearnet{display:none}</style>' + body.innerHTML;
}

/*Get hash links working (for endnotes, etc.)*/
var elements = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < elements.length; i++) {
    var hash = elements[i].hash;
    elements[i].href = window.location.pathname + hash;
}

/*Clones FrameworkJS and opens your own project*/
function clone() {
    return zeroPage.getSiteInfo().then(function(siteInfo){zeroPage.cmd("siteClone", [siteInfo.address])});
}

/*Clones the zite you want. You can use this as model to create your own clonning functions*/
function cloneselect() {
return zeroPage.cmd("siteClone", ["1Fmwk685eaX7GjoQ7JKo3QvywizGfnYRCB"]);
}

/*Detect ZeroNet theme and apply the style according to it*/
zeroFrame.cmd("serverInfo", {}, (server_info) => {
    // Print server_info to the console
    console.log("Server info:", server_info)

    // Retrieve the document body
    const body = document.body
	
    // Check user_settings exists
    if (!server_info.user_settings) {
        // Exit this function if it doesn't
        return
    }

    // Depending on user theme settings, set the theme
    switch(server_info.user_settings.theme) {
    case "light":
        body.innerHTML += ''
        break
    case "dark":
        body.innerHTML += '<link rel="stylesheet" type="text/css" href="css/dark-common.css">'
        break
    default:
        console.log("Theming not supported. Please upgrade your ZeroNet version.")
    }
})