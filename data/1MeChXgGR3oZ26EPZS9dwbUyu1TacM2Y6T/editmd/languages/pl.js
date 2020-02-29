(function(){
    var factory = function (exports) {
        var lang = {
            name : "pl",
            description : "Open source online Markdown editor.",
            tocTitle    : "Table of Contents",
            toolbar : {
                undo             : "Cofnij(Ctrl+Z)",
                redo             : "Ponów(Ctrl+Y)",
                bold             : "Pogrubiona",
                del              : "Przekreślona",
                italic           : "Kursywa",
                quote            : "Block quote",
                ucwords          : "Zamiana pierwszej litery w dużą",
                uppercase        : "Zamiana zaznaczenia w duże litery",
                lowercase        : "Zamiana zaznaczenia w małe litery",
                h1               : "Nagłówek 1",
                h2               : "Nagłówek 2",
                h3               : "Nagłówek 3",
                h4               : "Nagłówek 4",
                h5               : "Nagłówek 5",
                h6               : "Nagłówek 6",
                "list-ul"        : "Lista niepunktowana",
                "list-ol"        : "Lista punktowana",
                hr               : "Pozioma linia",
                link             : "Link",
                "reference-link" : "Reference link",
                image            : "Obraz",
                code             : "Linijka kodu",
                "preformatted-text" : "Preformatted text / Code block (Tab indent)",
                "code-block"     : "Code block (Multi-languages)",
                table            : "Tables",
                datetime         : "Datetime",
                emoji            : "Emoji",
                "html-entities"  : "HTML Entities",
                pagebreak        : "Page break",
                watch            : "Zamknij podgląd",
                unwatch          : "Podgląd",
                preview          : "HTML Preview (Press Shift + ESC exit)",
                fullscreen       : "Pełny ekran (Naciśnij ESC by wyjść)",
                clear            : "Wyczyść wszystko",
                search           : "Search",
                help             : "Pomoc",
                info             : "Informacje " + exports.title
            },
            buttons : {
                enter  : "Akceptuj",
                cancel : "Anuluj",
                close  : "Zamknij"
            },
            dialog : {
                link : {
                    title    : "Link",
                    url      : "Adres",
                    urlTitle : "Tytuł",
                    urlEmpty : "Error: Uzupełnij adres."
                },
                referenceLink : {
                    title    : "Reference link",
                    name     : "Name",
                    url      : "Address",
                    urlId    : "ID",
                    urlTitle : "Title",
                    nameEmpty: "Error: Reference name can't be empty.",
                    idEmpty  : "Error: Please fill in reference link id.",
                    urlEmpty : "Error: Please fill in reference link url address."
                },
                image : {
                    title    : "Obraz",
                    url      : "Adres do obrazu",
                    link     : "Link po klinknięciu na obraz",
                    alt      : "Tytuł",
                    uploadButton     : "Wstaw",
                    imageURLEmpty    : "Error: picture url address can't be empty.",
                    uploadFileEmpty  : "Error: upload pictures cannot be empty!",
                    formatNotAllowed : "Error: only allows to upload pictures file, upload allowed image file format:"
                },
                preformattedText : {
                    title             : "Preformatted text / Codes", 
                    emptyAlert        : "Error: Please fill in the Preformatted text or content of the codes."
                },
                codeBlock : {
                    title             : "Code block",         
                    selectLabel       : "Languages: ",
                    selectDefaultText : "select a code language...",
                    otherLanguage     : "Other languages",
                    unselectedLanguageAlert : "Error: Please select the code language.",
                    codeEmptyAlert    : "Error: Please fill in the code content."
                },
                htmlEntities : {
                    title : "HTML Entities"
                },
                help : {
                    title : "Help"
                }
            }
        };
        
        exports.defaults.lang = lang;
    };
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}
    
})();
