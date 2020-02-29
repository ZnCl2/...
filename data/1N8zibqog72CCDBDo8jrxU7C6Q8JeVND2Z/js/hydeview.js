function encodeJSON (obj) {
    return btoa(
	unescape(
	    encodeURIComponent(
		JSON.stringify(obj, undefined, ' ')
	    )
	)
    );
}

class Page extends ZeroFrame {
    followLink(s) {
        console.log(s);
        var target = s.replace(".html", ".md");
        this.cmd("wrapperPushState", [{"addr":target}, "", `?${target}`]);
        this.loadPage(target);
    }

    getRoot() {
        if (this.root == undefined)
            this.root = "";
        return this.root;
    }

    updateBlogDb() {
        if (this.loaded_posts !== undefined) {
            this.log("WARNING: Ignoring superfluous call to updateBlogDb");
            return;
        }
        this.log("updateBlogDb");
        // find files in _posts and generate posts.json that will then populate db
        this.loaded_posts = {
            "posts": [],
            "count": 0
        };
        this.cmd("fileList", [this.getRoot()+"/_posts"], function(list) {
            page.loaded_posts.count = list.length;
            for (var i = 0; i < list.length; ++i) {
                page.log("Found blog post: "+list[i]);
                // TODO: check if post exists..
                let fname = "/_posts/"+list[i];
                page.cmd("fileGet", [`${page.getRoot()}/${fname}`], function(post) {
                    var [header, content] = page.parsePage(post);
                    if (header.date === undefined)
                        header.date = "2001.01.01";
                    page.log(`Header.date is ${header.date}`);
                    var timestamp;
                    if (header.date instanceof Date) {
                        timestamp = header.date.getTime() / 1000;
                        header.date = header.date.toISOString();
                    } else {
                        var date = header.date.replace(/\./g, '-'); // yyyy.mm.dd or yyyy-mm-dd are both valid
                        page.log(new Date(date));
                        timestamp = (new Date(date)).getTime() / 1000;
                    }
                    page.log(`timestamp: ${timestamp}`);
		    var post = header;
                    Object.assign(post, {
                        "timestamp": isNaN(timestamp) ? 0 : timestamp,
                        "content": content,
                        "cut": content.split("<cut/>")[0],
                        "path": fname
                    });
		    page.loaded_posts.posts.push(post);
                    if (page.loaded_posts.posts.length >= page.loaded_posts.count) {
                        var json = JSON.stringify(page.loaded_posts);
                        //)_-) facepalm
                        json = encodeURIComponent(json)
                            .replace(/%7B/g, "{")
                            .replace(/%7D/g, "}")
                            .replace(/%22/g, '"')
                            .replace(/%27/g, "'")
                            .replace(/%3A/g, ":")
                            .replace(/%5B/g, "[")
                            .replace(/%5D/g, "]")
                            .replace(/%2C/g, ",")
                            .replace(/%20/g, " ")
                            .replace(/%2F/g, "/")
                            .replace(/%5C/g, "\\")
			    .replace(/%60/g, "`")
                        ;
                        page.cmd("fileWrite", ["data/posts.json", btoa(json)], function(res) {
                            page.log(`Response on file write: ${res}`);
                            page.updateLocation(window.location.search);
                        });
                    }
                });
            }
        });
    }

    loadLayouts() {
        var path = this.getRoot() + "/_layouts";
        this.cmd("fileList", [path], function(layouts) {
            page.log("loading layouts");
            page.layouts = {};
            for (var i = 0; i < layouts.length; ++i) {
                var fname = layouts[i];
                var parts = fname.split(".");
                if (parts.length > 1 && parts[parts.length-1] == "html") {
                    parts.pop();
                    let name = parts.join(".");
                    page.log(`layout ${name}..`);
                    page.cmd("fileGet", [`${path}/${fname}`], function(txt) {
                        if (txt !== null) {
                            page.layouts[name] = txt;
                            page.log(`layout ${name}.. loaded`);
                            page.updateLocation(window.location.search);
                        }
                    });
                }
            }
        });
    }

    initialize(root) {
        document.onclick = function (ev) {
            ev = ev || window.event;
            var e = ev.target || ev.srcElement;

            console.log(e);

            if (e.tagName === 'A') {
                var target = e.attributes.href.value;
                page.log(target);
                // maybe rather check force-link property... who knows?
                // just rewrite everything!
                if (target.search("//") !== -1) {
                    return true;
                } else if (target.search("javascript:") !== -1) {
		    return false;
		} else {
                    page.followLink(target);
                    return false;
		}
            }
        };
        Mustache.escape = function (text) { return text; };
        this.root = root || "";
        this.loadLayouts();
        this.updateBlogDb();
        page.updateLocation(window.location.search);
    }

    flipFollow() {
	page.cmd("feedListFollow", [], function(res) {
	    console.log(res);
	    if (res && res.Posts && res.Posts.length !== undefined && res.Posts.length !== 0 && res.Posts[0] !== "") {
		page.unfollowPosts();
	    } else {
		page.followPosts();
	    }
	});
    }

    unfollowPosts() {
	this.cmd("feedFollow", [{
            "Posts": ["", []]
        }], function(res) {})
    }

    followPosts() {
        var query = `SELECT
            'post' as type,
            timestamp as date_added,
            title as title,
            content as body,
            '?' || path as url
            FROM posts
        `;
        this.cmd("feedFollow", [{
            "Posts": [query, []]
        }], function(res) {
            page.log(`Feed follow response: ${res}`);
            page.cmd("feedListFollow", [], function(res) {
                page.log("feedListFollow");
                console.log(res);
		page.cmd("wrapperNotification", ["info", "Subscribed to posts feed", 3400]);
            });
        });
    }

    parsePage(txt) {
        if (txt === null) {
            this.warning(`Cannot load page`);
            return;
        }
        var header_splitter = '---\n';
        var arr = txt.split(header_splitter);
        var header = jsyaml.load(arr[1]);
        arr.splice(0, 2);
        var rest = arr.join(header_splitter);
        return [header, rest]
    }

    maybeGoTo(path) {
	if (this.feedClickToJump === true)
	    this.followLink(path);
    }

    getPostsMd() {
        var posts = this.loaded_posts.posts;
        // new first; TODO: customize..
        posts.sort(function(a, b){ return b.timestamp - a.timestamp; });
        var md = "\n";
        for (var i = 0; i < posts.length; ++i) {
            var post = posts[i];
	    if (post.timestamp > (new Date()).getTime() / 1000) {
		continue;
	    }
            // TODO: customize
            var ts = new Date(post.timestamp*1000);
	    var date = ""+ts.getFullYear()+"."+(ts.getMonth()+1+"").padStart(2,'0')+"."+(ts.getDate()+"").padStart(2,'0');
            md += `
<div class="postpreview" onclick="page.maybeGoTo('${post.path}')">
  <div class="meta">${date}</div>
  <h2>[${post.title}](${post.path})</h2>

    ${post.cut}

  <p class="read_more">[Read more..](${post.path})</p>
</div>
`;
        }
        return md;
    }

    loadPage(file) {
        this.log("Loading '"+file+"'");
        if (!file)
            file = "/";
        if (file[file.length-1] === "/")
            file += "index.md";
        let path = this.getRoot() + file;
        this.log(path);
	this.path = path;
        let self = this;
        this.cmd("fileGet", [path], function(txt) {
            if (txt === null || txt === undefined) {
                self.warning(`Cannot load page ${path}`);
                return;
            }
            var [header, rest] = self.parsePage(txt);

            // TODO: load dynamically
            var xxx = {
                'page': header,
                'site': {
                    'name': 'HydeView demo',
		    'baseurl': ''
                },
                'hydeview': {
                    // TODO; reload on update
                    'blog': self.getPostsMd()
                }
            };
            self.cmd("wrapperSetTitle", [Mustache.render(document.title, xxx)]);

            // TODO: get rid of this dirty workaround
            rest = rest.replace("{% include posts.html %}", "{{ hydeview.blog }}");
	    // argh
	    rest = rest.replace("{% post_url ", "/_posts/");
	    rest = rest.replace(" %}", ".md");
            var page_md = Mustache.render(rest, xxx);
            var page_html = marked(page_md);

            if (header.layout === undefined) {
                header.layout = "default";
            }

            self.log(`Trying to load layout ${header.layout}...`);
            // TODO: support nested layouts properly
            if (self.layouts === undefined) {
                throw "Layouts not loaded yet";
            }
            var layout = self.layouts[header.layout];
            if (layout === undefined) {
                self.log(`Layout ${header.layout} not found`);
            } else {
		xxx.commentadd = '\
                    <div>\
                      <span onclick="return page.selectUser()">reply as\
                        <span class="hydeview_login">'+page.site_info.cert_user_id+'</span>\
                      </span>\
                    </div>\
                    <textarea id="hydeview_comment_post" onkeypress="page.commentKeyPress(event)"></textarea>\
                    <input type="button" class="hydeview_comment_publish" onclick="page.postComment()" value="Post (ctrl-enter)"/>';

                var [layout_header, layout_content] = self.parsePage(layout);
                if (layout_header && layout_header.layout && layout_content) {
                    // XXX: ugh..
                    var parent = self.layouts[layout_header.layout];
                    xxx.content = layout_content;
                    layout = Mustache.render(parent, xxx);
                }

                xxx.content = page_html;

                page_html = Mustache.render(layout, xxx);

                page_html = page_html.replace(
                    /(href|src)="\/(.*\.(css|png))"/g,
                    function(_, tag, href) {
                        page.log(tag, href);
                        return `${tag}="/${self.site_info.address}/${self.getRoot()}/${href}"`;
                    }
                );
            }

            var wrapper = $("#hydeview_wrapper");
            var wrapper_template = $("#hydeview_wrapper_template");
            var wrapper_c = Mustache.render(wrapper_template.html(), {
                "content" : page_html
            });
            wrapper.html(wrapper_c);

	    page.updateComments();

            $(".title").each(function(i, el) {
                el.innerHTML = Mustache.render(el.innerHTML, xxx);
            });
        });
    }

    updateComments(comments) {
	page.cmd(
	    "dbQuery",
	    [
		"SELECT * FROM hv_comment WHERE path = :path ORDER BY timestamp",
		{"path": page.path}
	    ], function(comments) {
		page.cmd(
		    "dbQuery",
		    [
			"SELECT json_id, cert_user_id FROM json"
		    ], function(userlist) {
			var users = {};
			for (var i = 0; i < userlist.length; ++i) {
			    users[userlist[i].json_id] = userlist[i].cert_user_id;
			}
			for (var i = 0; i < comments.length; ++i) {
			    comments[i].author = users[comments[i].json_id];
			}
			var comments_el = $("#hydeview_comments");
			comments_el.html(page.renderComments(comments));
		    }
		);
	    }
	);
    }

    renderComments(comments) {
	page.log(comments);
	var result = "";
	// TODO: load template
	var tmplt = '<div class="comment">\
           <div class="comment_author">{{ author }}</div>\
           <div class="comment_date">{{ date }}</div>\
           <div class="comment_body">{{ comment }}</div>\
        </div>';
	for (var i = 0; i < comments.length; ++i) {
	    var c = comments[i];
	    result += Mustache.render(tmplt, {
		comment: marked(c.body),
		date: (new Date(c.timestamp)).toISOString(),
		author: c.author
	    });
	}
	return result;
    }

    commentKeyPress(ev) {
	if (ev.ctrlKey && ev.code == "Enter") {
	    postComment();
	}
    }
    
    postComment(ev) {
	if (!this.site_info || !this.site_info.cert_user_id) {
	    page.warning("Please select account first");
	    page.selectUser();
	    return;
	}
	
	let area = $("#hydeview_comment_post")[0];
	let comment_text = area.value;
	page.log(comment_text);
	let data_path = `data/hvcomment/${page.site_info.auth_address}/data.json`;
	let content_path = `data/hvcomment/${page.site_info.auth_address}/content.json`;
	page.cmd(
	    "fileGet",
	    {inner_path: data_path, required: false},
	    function(comments) {
		if (!comments) {
		    comments = { "hv_comment": [] }
		} else {
		    comments = JSON.parse(comments);
		}
		comments.hv_comment.push({
		    "path": page.path,
		    "body": comment_text,
		    "timestamp": Date.now()
		});
		var json_raw = encodeJSON(comments);
		page.cmd(
		    "fileWrite",
		    [data_path, json_raw],
		    function(result) {
			if (result != "ok") {
			    page.warning("Can't write comment");
			    return;
			}
			page.log("write successful");
			page.cmd(
			    "siteSign",
			    {"inner_path":content_path},
			    function(result) {
				page.log("sign");
				console.log(result);
				if (result != "ok") {
				    page.warning("Can't sign comment");
				    // remove comment from file so as to not confuse user
				    // ideally, this should be handled better
				    comments.hv_comment.pop();
				    var json_raw = encodeJSON(comments);
				    page.cmd(
					"fileWrite",
					[data_path, json_raw],
					function(result) {}
				    );
				    return;
				}
				page.cmd(
				    "sitePublish",
				    {"inner_path":content_path, sign: false},
				    function() {
					area.value = "";
					page.updateComments();
				    }
				);
			    }
			);
		    }
		);
	    }
	);
    }

    selectUser() {
	// bah, this shouldn't be hardcoded...
        this.cmd("certSelect", {accepted_domains: [
            "zeroid.bit",
            "kaffie.bit",
	    "cryptoid.bit",
	    "nanasi.bit",
	    "zeroverse.bit"
        ]});
        return false;
    }

    selectUserIfNone() {
        if (this.site_info && !this.site_info.cert_user_id) {
            this.selectUser();
        }
    }

    onOpenWebsocket() {
        this.cmd("siteInfo", [], function(site_info) {
            page.setSiteInfo(site_info);
        })
    }

    onRequest(cmd, message) {
        if (cmd == "setSiteInfo") {
            this.setSiteInfo(message.params);
        } else if (cmd == "wrapperPopState") {
            console.log("PopSTATE");
            if (message.params.state)
                page.loadPage(message.params.state.addr);
            else
                page.log("Warning: cannot restore state");
        } else {
            this.log("Unknown incoming message:", cmd);
        }
    }

    setSiteInfo(site_info) {
        this.site_info = site_info;
	page.log(site_info);
	var login_els = $(".hydeview_login");
	page.log("kekekekekekekekekekekekeke");
	page.log(login_els[0]);
	for (var i = 0; i < login_els.length; ++i) {
	    login_els[i].innerHTML = site_info.cert_user_id;
	}
    }

    updateLocation(location) {
        this.log("UPDATE LOCATION??");
        var good = location.split("?")[1];
        var args = good.split("&");
        var results = {};
        var addr = "";
        for (var i = 0; i < args.length; ++i) {
            var arg = args[i].split('=');
            if (arg.length == 1) {
                addr = arg[0];
            } else if (arg.length == 2) {
                results[arg[0]] = arg[1];
            } else {
                this.log("cannot parse!");
            }
        }
        this.loadPage(addr);
    }

    warning(s) {
        this.cmd("wrapperNotification", ["error", s, 3400]);
    }
};

page = new Page();
page.selectUserIfNone();
