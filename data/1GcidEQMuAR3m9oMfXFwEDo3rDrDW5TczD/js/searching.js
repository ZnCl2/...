class DictionarySearch extends ZeroFrame {
    search() {
        // get ZeroFrame to read in our file with website data
        // TODO if we read the file once, we should just save it into RAM instead of reading it again
        const searchFilePath = "dictionary.json";
        let messages =  document.getElementById("messages");
        let searchBox = document.getElementById("search-box");
        let term = searchBox.value;
        messages.innerHTML = "search for " + term;
        this.cmd("fileGet", searchFilePath, function (data, err) {
            if (err) {return console.log(err);}
            const dictionary = JSON.parse(data);
            searchBox.innerHTML = "";
            if (dictionary[term]) {
              if (dictionary[term][0].substring(0,3) === "___") {
                term = dictionary[term][0].substring(3);
              }
            messages.innerHTML = "<h4>"+term+"</h4><ol><li>" + 
            dictionary[term].join("</li><li>") + "</li></ol>";
            } else {
            messages.innerHTML = "Not found.";
            }
            console.log("print finished");
        });
    }
}


page = new DictionarySearch();
    console.log("reached end");


//window.onload = page.translation;
