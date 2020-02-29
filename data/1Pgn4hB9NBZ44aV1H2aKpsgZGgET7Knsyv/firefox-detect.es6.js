/* Configurazione */

var MESSAGE = "<div align='center'><img border='0' src='http://www.paginaradio.it/img/Immagine4.png' width='438' height='217'><br><br>Attenzione! Il browser in uso non supporta questo sito web.<br>E' necessario scaricare Mozilla Firefox.<br></div>";
var BUTTON_TEXT = "Procedi"
var BUTTON_LINK = "https://www.mozilla.org/";

/* Fine configurazione */





function ready(callback){
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function() {

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (!isFirefox) {

        var css = `
        html, body { overflow: hidden !important; }
        #firefox-warning {
            display: block;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            color: black;
            font-size: 20px;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #firefox-warning-wrapper {
            padding: 40px;
            text-align: center;
        }

        #firefox-warning-button {
            background-color: #FFFF99;
            border-radius: 4px;
            display: inline-block;
            margin: 24px;
            padding: 16px;
            font-weight: bold;
            color: BLUE;
            text-decoration: none;
        }
        `;

        var htmlDiv = document.createElement('div');
        htmlDiv.innerHTML = '<style>' + css + '</style>';
        document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);

        var warningDiv = document.createElement('div');
        warningDiv.innerHTML = `
            <div id="firefox-warning">
                <div id="firefox-warning-wrapper">
                    <div id="firefox-warning-message">${ MESSAGE }</div>
                    <a id="firefox-warning-button" href="${ BUTTON_LINK }">${ BUTTON_TEXT }</a>
                </div>
            </div>
        `;
        document.getElementsByTagName('body')[0].appendChild(warningDiv);

    }

});