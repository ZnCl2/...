var database;
var resultsLimit = 30;

function stringContains(s, c) {
    return (s.toLowerCase().indexOf(c) > -1);
}

class Page extends ZeroFrame {
    selectUser() {
        this.cmd("certSelect", {accepted_domains: ["zeroid.bit"]});
        return false;
    }

    setSiteInfo(site_info) {
        var peers = document.getElementById("peers");
        var user_button = document.getElementById("select_user");
        peers.innerHTML = "Peers: " + site_info.peers +
			" Size: " + Math.floor(site_info.settings.size / 10000) / 100 +"MB";
        if (site_info.cert_user_id)
            user_button.innerHTML = site_info.cert_user_id;
        else
            user_button.innerHTML = "Login";
        this.site_info = site_info;
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function(site_info) {
            page.setSiteInfo(site_info);
        })
        this.cmd("fileGet", "data.json", function(data) {
            database = JSON.parse(data);
        });
    }

    onRequest(cmd, message) {
        if (cmd == "setSiteInfo") {
            this.setSiteInfo(message.params);
        }
        else
            this.log("Unknown incoming message:", cmd);
    }

    constructResult(site) {
        return '\
        <div class="card">\
            <div class="card-body">\
                <h4 class="card-title"><a href="/'+site.Address+'">'+site.Name+'</a></h4>\
                <h6 class="card-subtitle mb-2 text-muted">'+site.Address+'</h6>\
                <p class="card-text">'+site.Description+'</p>\
			</div>\
        </div>';
    }

	search() {
		var search = $('#search').val().toLowerCase();
        if (search.trim().length === 0) {
			$('header').css('min-height', '100vh');
            $('#resume').empty();
            $('#results').empty();
            $('#pagination').empty();
            return;
        }
        var page = 1;
        var resultsCount = 0;
        var operationStart = new Date();
        var availablePages = 0;
        var results = '';
        for (var i in database.zites) {
            var site = database.zites[i];
            if (site.Name != "my new site" && site.Name != "MyZeroBlog") {
                if (stringContains(site.Description, search) || stringContains(site.Name, search)) {
                    if (resultsCount < page * resultsLimit && resultsCount >= (page - 1) * resultsLimit) {
                        results += this.constructResult(site, ((stringContains(site.Description.toLowerCase(), "nsfw") || stringContains(site.Name.toLowerCase(), "nsfw"))) ||
                            stringContains(site.Description.toLowerCase(), "clearnet") || stringContains(site.Name.toLowerCase(), "clearnet"));
                    }
                    resultsCount++;
                }
            }
            availablePages = Math.ceil(resultsCount / resultsLimit);
        }

        if (resultsCount > 0) {
            var operationEnd = new Date();
			$('header').css('min-height', '25rem');
            $('#resume').html(resultsCount + ' results in ' + (operationEnd.getTime() - operationStart.getTime()) / 1000 + 's');
            $('#results').html(results);
            var temp = Math.round(availablePages);
            if (temp == 0)
                temp = 1;
            $('#pagination').html('\
            <nav aria-label="Page navigation example">\
                <ul class="pagination">\
                    <li class="page-item">\
                        <a class="page-link" href="#" aria-label="Previous" onClick="page.lastPage()">\
                            <span aria-hidden="true">&laquo;</span>\
                            <span class="sr-only">Previous</span>\
                        </a>\
                    </li>\
                    <li class="page-item">\
                        <a class="page-link" href="#" aria-label="Next" onClick="page.nextPage()">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="sr-only">Next</span>\
                        </a>\
                    </li>\
                </ul>\
                <p class="lead">' + page + ' of ' + temp + '</p>\
            </nav>');
        }
        else {
            $('#resume').empty();
            $('#results').html('<div class="alert alert-danger" role="alert">Search returned no results.</div>');
            $('#pagination').empty();
        }
	}
}
page = new Page();
