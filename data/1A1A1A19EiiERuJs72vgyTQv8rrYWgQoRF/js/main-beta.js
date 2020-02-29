


var lastSearch = "";
var index = "";
var database;

var ziteCount = 0;
var peerCount = 0;

var page = 1;
var availablePages = 0;
var largestTagLen = 0;

var cacheDone = false;
var initDone = false;

var theme = 0;

var tags = [];
var verbosity = 0; // Should be 0 unless debugging.

function doSearch() {
    // Change layout!
    hideElement("search_home");
    hideElement("omnibox");
    hideElement("footer");
    showElement("search_results");
    document.getElementById("search-bar-results").focus();

    // Do the search!
    executeFind();
    page = 1;

}


function showSearch() {
    // Change layout!
    hideElement("search_home");
    hideElement("omnibox");
    hideElement("footer");
    showElement("search_results");
    document.getElementById("search-bar-results").value = document.getElementById("search-bar").value;
    document.getElementById("search-bar-results").focus();
    
    omniboxTesting(0);

    // Do the search!
    executeFind();
    page = 1;

}


function goHome() {
    // Change layout!
    hideElement("omnibox");
    hideElement("search_results");
    showElement("search_home");
    showElement("footer");
    document.getElementById("search-bar").focus();

    // Undo the search!
    document.getElementById("search-bar").value = "";
}


function onPageStart() {
    if (getUrlBool("nightmode"))
        setTheme(1);

    if (getUrlParam("theme") != undefined)
        setTheme(getUrlParam("theme"));

    if (getUrlParam("t") != undefined)
        setTheme(getUrlParam("t"));

    if (getUrlBool("debug"))
        verbosity = 10;

    debugLog("Highest verbosity should be used ONLY for debug purposes! It will cause significant slowdowns and perhaps crashes on low-end systems.", 10);    
    document.getElementById("search-bar").focus();
}

function setTheme(t) {
    // WARN: experimental

    // TODO: smooth transition
    // TODO: enum for themes <-- is this a good idea?
    // TODO: custom themes <-- cons outweigh the pros
    var root = document.getElementsByTagName("html")[0];
    root.classList = ["theme-" + t];
    theme = t;
}

function togglePrefs() {
    if (document.getElementById("preferences").style.display == "inline")
        document.getElementById("preferences").style.display = "none";
    else
        document.getElementById("preferences").style.display = "inline";
}

function showChangelog() {
    document.getElementById("changelog").style.display = "block";
}

function hideChangelog() {
    document.getElementById("changelog").style.display = "none";
}

function executeFind() {
    // TODO: more optimization, lower than 2ms if possible?
    // TODO: tags - support is there, update dexer < -- maybe not
    // TODO: aliases

    var operationStart = new Date();
    var resultsCount = 0;
    var resultsLimit = 10;
    var contentFilter = true;
    var result = "";
    var filteredSearch = true; // why is this here it's not even used!?

    var searchTerm = document.getElementById("search-bar-results").value.toLowerCase();

    if (stringContains(searchTerm, ":")) {
        resultsLimit = searchTerm.split(':')[1];
        if (resultsLimit <= 0)
            resultsLimit = 1;
        searchTerm = searchTerm.split(':')[0];
    }

    if (lastSearch != searchTerm)
        page = 1;
    lastSearch = searchTerm;
    for (var i in database.zites) {
        var site = database.zites[i];
        // TODO: make filter optional
        if (site.Name != "my new site" && site.Name != "MyZeroBlog") // Filter out incomplete zites 
        {
            if (stringContains(site.Description, searchTerm) || stringContains(site.Name, searchTerm)) {
                if (resultsCount < page * resultsLimit && resultsCount >= (page - 1) * resultsLimit) {
                    if (site.Description == "")
                        site.Description = "<i>No description.</i>";
                    result += addResult(site, ((stringContains(site.Description.toLowerCase(), "nsfw") || stringContains(site.Name.toLowerCase(), "nsfw"))) ||
                                stringContains(site.Description.toLowerCase(), "clearnet") || stringContains(site.Name.toLowerCase(), "clearnet"));
                }
                resultsCount++;
            }
        }
        availablePages = Math.ceil(resultsCount / resultsLimit);
    }

    document.getElementById("results").innerHTML = result;

    if (resultsCount > 0) {
        var operationEnd = new Date();
        document.getElementById("results").innerHTML = "已找到" + resultsCount + " 个结果 " + ((filteredSearch) ? "(filtered)" : "") + " 查询时间 " + (operationEnd.getTime() - operationStart.getTime()) / 1000 + "s.<div class=\"spacer-small\"></div>" + document.getElementById("results").innerHTML;
        logTime("Search", 10, 15, operationStart);
        var availPagesTemp = Math.round(availablePages);
        if (availPagesTemp == 0)
            availPagesTemp = 1;
        document.getElementById("results").innerHTML += "<div class=\"spacer-small\"></div><div id=\"page-selector\"><a onClick=\"pageDown()\" class=\"pageButton\" style=\"margin-right: 10px; cursor:pointer;\">< Prev</a><span style=\"font-size: 20pt;\">" + page + " of " + availPagesTemp + "</span><a onClick=\"pageUp()\" class=\"pageButton\" style=\"margin-left: 10px; cursor:pointer;\">Next ></a></div><div class=\"spacer\"></div>";
        
    } else {
        document.getElementById("results").innerHTML += "<h2>暂无结果</h2><br>";
    }
}

function addResult(site, siteWarn) {
    // TODO: show warning when a site needs a warning
    return "<div class=\"result\"><h3><a style=\"color:var(--primary-color)\" href=\"/" + site.Address + "\"/>" + site.Name + "</a>" + "</h3><h5>" +
        site.Address + "</h5><h5>" + site.Description + "</h5><br></div>";
}

function pageUp() {
    if (page < availablePages)
        page++;
    executeFind();
}

function pageDown() {
    if (page > 1)
        page--;
    executeFind();
}

function omniboxTesting(e) {
    // TODO: make highlighting prettier
    
    if (e.keyCode == 13) {
        doSearch();
        return;
    }

    document.getElementById("omnibox").innerHTML = "";
    var searchTerm = document.getElementById("search-bar-results").value.toLowerCase();
    var results = [];
    var count = 0;
    if (searchTerm == "") {
        document.getElementById("omnibox").style.display = "none";
        return;
    }
    document.getElementById("omnibox").style.display = "inline-block";
    for (var a in database.tags) {
        if (results.length < 5) {
            var tag = database.tags[a];
            if (whereInString(tag, searchTerm) == 0) {
                if (results.length < 5)
                    results.push(["<b>", tag.slice(0, searchTerm.length), "</b>", tag.slice(searchTerm.length)].join(''));
            }
        } else {
            break;
        }
    }
    for (var r in results)
        document.getElementById("omnibox").innerHTML += results[r] + "<br>";

    if (results.length == 0)
        document.getElementById("omnibox").style.display = "none";
}

function openSite(url) {
    page.cmd("wrapperOpenWindow");
}

function updateSearch(e) {
    omniboxTesting(e);    
    executeFind();
}

function showWarning(url) {
    // WARN: experimental
    showNotification("Warning", "The zite '" + url + "' has been detected as being possibly malicious or may deliver malicious content, such as NSFW images or may link to the clearnet.  Click <a href=\"/" + url + "\">here</a> to continue.");
}

function showNotification(title, body) {
    // WARN: experimental

    // TODO: use this for suspicious links! i.e. known nsfw/clearnet zites
    // much better than using a whole new page and looks neat too
    
    document.getElementById("notification-header").innerHTML = title.toUpperCase();
    document.getElementById("notification-body").innerHTML = body;
    showElement("notification-wrap");
}
function hideNotification(title, body) {
    hideElement("notification-wrap");
}

function hideOmnibox() {
    document.getElementById("omnibox").style.display = "none";
}

function saveSettings() {
    showNotification("你的设置已生效", "下一次访问请使用： <a href=\"http://127.0.0.1:43110/lingdu.bit?t=" + theme + "\">Lingdu.bit?t=" + theme + "</a> 地址。");
}