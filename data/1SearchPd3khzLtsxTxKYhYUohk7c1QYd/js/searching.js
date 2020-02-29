function linkify(text){
    // linkify from http://rickyrosario.com/blog/converting-a-url-into-a-link-in-javascript-linkify-function/ 
    if (text) {
        text = text.replace(
                /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
                function(url){
                    let full_url = url;
                    if (!full_url.match('^https?:\/\/')) {
                        full_url = 'http://' + full_url;
                    }
                    return '<a href="' + full_url + '">' + url + '</a>';
                }
                );
    }
    return text;
}

// code to remove html tags and other sanitization
// https://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side
var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
        '<(?:'
            // Comment body.
            + '!--(?:(?:-*[^->])*--+|-?)'
            // Special "raw text" elements whose content should be elided.
            + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
            + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
            // Regular name
            + '|/?[a-z]'
            + tagBody
            + ')>',
        'gi');
function removeTags(html) {
    var oldHtml;
    do {
        oldHtml = html;
        html = html.replace(tagOrComment, '');
    } while (html !== oldHtml);
    return html.replace(/</g, '&lt;');
}

class AutomatedSearch extends ZeroFrame {

translation() {
     document.getElementById("title").innerHTML = "zronhweplyottsocmlic";
}
    search() {                                                                   
        const searchFilePath = "knowledge/0list.json";
        this.cmd("fileGet", searchFilePath, function (data) {              
            let websiteList = JSON.parse(data).websiteList;                          
            let term = document.getElementById("search-box").value ;                    
            let regular_expression = new RegExp(term,"i");                           
            let results = websiteList.map(function (elem) {                          
                if (elem.body === "" || /\//.test(elem.body) != true) { return; }      
                    if (regular_expression.test(elem.title) || regular_expression.test(elem.body)) {
                        //console.log(elem);                                                   
                        return "<dt> " + elem.title+ " </dt><dd> " + elem.body + " </dd>"; 
                    }                                                                      
            });                                                                      
            results = results.join("");                                              
            results = linkify(results);                                              
            document.getElementById("messages").innerHTML = results;                 
        });                                                                        
    }               

    search2() {
        // get ZeroFrame to read in our file with website data
        // TODO if we read the file once, we should just save it into RAM instead of reading it again
        const searchFilePath = "knowledge/search.json";
        let messages =  document.getElementById("messages");
        let searchBox = document.getElementById("search-box");
        const term = searchBox.value;
        messages.innerHTML = "search for (搜索)" + term;
        this.cmd("fileGet", searchFilePath, function (data, err) {
            if (err) {return console.log(err);}
            const websiteList = JSON.parse(data);

            searchBox.innerHTML = "";

            const regular_expression = new RegExp(term,"i");
            const filtered = websiteList.filter((elem) => {
                // we filter out things that dont have a name or addres and don't match the regex
                return elem.name !=="" && 
                    elem.address!=="" && 
                    (regular_expression.test(elem.title) ||
                     regular_expression.test(elem.name) ||
                     regular_expression.test(elem.body) ||
                     regular_expression.test(elem.domain) ||
                     regular_expression.test(elem.description));
            });
            let output = [];
            let outputCounter = 0;
            filtered.forEach((elem) => {
                let domain = "";
                if (elem.domain) { 
                    const url = "http://127.0.0.1:43110/" + elem.domain;
                    domain = linkify(url) + " <br/> ";
                }
                output[outputCounter] = 
                    "<dt><strong>" + elem.title+ "</strong></dt>" + 
                    "<dd>" +
                    elem.description + "<br/> " +
                    domain + 
                    linkify(elem.address) + " <br/>" +
                    "👪" + elem.peers  +  " <br/>" +
                    "<p> " + removeTags(elem.body) + "</p>" + 
                    "</dd>";
                outputCounter++;
                messages.innerHTML = output.join("");
            });
            if (outputCounter === 0) {
              messages.innerHTML = "Nothing found, consider " +
                ' <a href="http://127.0.0.1:43110/1HP65eGEEMPbyzH3mkaoQ7eCMKd9P8G61W/using_zeronet/create_new_site/index.html">adding.</a>' +
                "没有找到，考虑添加。"
            }
            console.log("print finished");
        });
    }
}


page = new AutomatedSearch()
    console.log("reached end");


//window.onload = page.translation;
