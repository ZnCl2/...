
(function () {
    var List,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            },
            extend = function (child, parent) {
                for (var key in parent) {
                    if (hasProp.call(parent, key))
                        child[key] = parent[key];
                }

                function ctor() {
                    this.constructor = child;
                }
                ctor.prototype = parent.prototype;
                child.prototype = new ctor();
                child.__super__ = parent.prototype;
                return child;
            },
            hasProp = {}.hasOwnProperty;

    List = (function (superClass) {
        extend(List, superClass);

        function List() {
            this.render = bind(this.render, this);
            this.handleMoreClick = bind(this.handleMoreClick, this);
            this.update = bind(this.update, this);
            this.needFile = bind(this.needFile, this);
            this.item_list = new ItemList(File, "id");
            this.files = this.item_list.items;
            this.need_update = true;
            this.loaded = false;
            this.type = "Home";
            this.limit = 50;
            this.channelMode = false;
        }

        // Opens video channel, after retrieving userId
        List.prototype.openVideoChannel = function () {
            this.channelMode = true;
            this.type = "Latest";
            Page.menuAll.type = "Latest";
            this.update();
        };

        List.prototype.needFile = function () {
            this.log(args);
            return false;
        };

        List.prototype.update = function () {
            var order;
            var order_mode;
            var search_query;
            var search_field;
            /*var topic_sticky_uris;*/
            var certUserId = document.getElementById('debugger1').innerHTML;
            this.log("update");
            this.loaded = false;

            if (this.type === "Home") {
                this.channelMode = false;
                order = "peer";
                order_mode = "featured";

            } else if (this.type === "Trending") {
                this.channelMode = false;
                order = "peer";
                order_mode = "none";

            } else {
                order = "date_added";
                order_mode = "none";
            }

            // List of subqueries
            search_field = document.getElementById('searchTerm').value;
            search_field_no_space = search_field.replace(/\s/g, '%');

            if (this.channelMode == true) {
                search_query = 'WHERE directory="' + certUserId + '" AND file.title LIKE "%' + search_field_no_space + '%"';
            } else {
                search_query = 'WHERE file.title LIKE "%' + search_field_no_space + '%"';
            }
            ;

            // Start querying the database with the given parameters!
            return Page.cmd("dbQuery", "SELECT * FROM file LEFT JOIN json USING (json_id) " + search_query + " ORDER BY date_added DESC", (function (_this) {
                return function (files_res) {
                    var orderby;
                    orderby = "time_downloaded DESC, peer DESC";
                    if (_this.type === "My") {
                        orderby = "is_downloaded DESC";
                    } else if (_this.type === "Latest") {
                        orderby = "time_added DESC";
                    }
                    return Page.cmd("optionalFileList", {
                        filter: "",
                        limit: 1000,
                        orderby: orderby
                    }, function (stat_res) {
                        var base, base1, base2, file, i, j, len, len1, stat, stats;
                        var topic_sticky_uris = Page.site_info.content.settings.topic_sticky_uris;
                        stats = {};

                        /*document.getElementById('debugger2').innerHTML = "Sticky uris : " + Page.site_info.content.settings.topic_sticky_uris;*/

                        for (i = 0, len = stat_res.length; i < len; i++) {
                            stat = stat_res[i];
                            stats[stat.inner_path] = stat;
                        }
                        for (j = 0, len1 = files_res.length; j < len1; j++) {
                            file = files_res[j];
                            file.id = file.directory + "_" + file.date_added;
                            file.inner_path = "data/users/" + file.directory + "/" + file.file_name;
                            file.data_inner_path = "data/users/" + file.directory + "/data.json";
                            file.content_inner_path = "data/users/" + file.directory + "/content.json";
                            file.stats = stats[file.inner_path];
                            file_date_added = file["date_added"];
                            file_directory = file["directory"];
                            file_size = file["size"];
                            video_string = file_date_added + "_" + file_directory;

                            if (file.stats == null) {
                                file.stats = {};
                            }

                            if ((base = file.stats).peer == null) {
                                base.peer = 0;
                            }
                            if ((base1 = file.stats).peer_seed == null) {
                                base1.peer_seed = 0;
                            }
                            if ((base2 = file.stats).peer_leech == null) {
                                base2.peer_leech = 0;
                            }

                            // If one of the files is a sticky Uri, then add 1000000 peers to it.. keep it top!
                            if (order_mode === "featured") {
                                if (topic_sticky_uris.indexOf(video_string) >= 0) {
                                    /*document.getElementById('debugger3').innerHTML = video_string;*/
                                    file.stats["peer_seed"] = file.stats["peer_seed"] + 1000000;
                                    /*document.getElementById('debugger3').innerHTML = file.stats["peer_seed"];*/
                                    file["is_featured"] = 1;
                                }
                            } //else if (order_mode === "")

                        }

                        if (order === "peer") {
                            files_res.sort(function (a, b) {
                                return Math.min(5, b.stats["peer_seed"]) + b.stats["peer"] - a.stats["peer"] - Math.min(5, a.stats["peer_seed"]);
                            });
                        }
                        if (_this.type === "Seeding") {
                            files_res = (function () {
                                var k, len2, results;
                                results = [];
                                for (k = 0, len2 = files_res.length; k < len2; k++) {
                                    file = files_res[k];
                                    if (file.stats.bytes_downloaded > 0) {
                                        results.push(file);
                                    }
                                }
                                return results;
                            })();
                        }
                        if (_this.type === "My") {
                            files_res = (function () {
                                var k, len2, results;
                                results = [];
                                for (k = 0, len2 = files_res.length; k < len2; k++) {
                                    file = files_res[k];
                                    if (file.directory === Page.site_info.auth_address) {
                                        results.push(file);
                                    }
                                }
                                return results;
                            })();
                        }

                        _this.item_list.sync(files_res);
                        _this.loaded = true;
                        return Page.projector.scheduleRender();
                    });
                };
            })(this));

        };

        List.prototype.handleMoreClick = function () {
            this.limit += 50;
            return false;
        };

        List.prototype.render = function () {
            if (this.need_update) {
                this.update();
                this.need_update = false;
            }

            // Listen to search box
            document.getElementById('searchButton').addEventListener('click', function (evt) {
                evt.preventDefault();
                Page.list.update();
            });

            document.getElementById('searchTerm').addEventListener('keypress', function (evt) {
                if (evt.which == 13) {
                    Page.list.update();
                }
            });

            return h("div#listavideos", {
                ondragenter: document.body.ondragover,
                ondragover: document.body.ondragover,
                ondrop: Page.selector.handleFileDrop,
                classes: {
                    hidden: Page.state.page !== "list"
                }
            }, [
                /* File list starts */
                this.files.length ? h("div.videos.grid", [
                    h("div.video.header",
                    h("div.stats", 
                    [h("div.stats-col.peers", "Peers"),
                        h("div.stats-col.ratio", "Ratio"), 
                        h("div.stats-col.downloaded", "Uploaded")])),
                    this.files.slice(0, +this.limit + 1 || 9e9).map((function (_this) {
                        return function (file) {
                            return file.render();
                        };
                    })(this))
                ]) : void 0, this.loaded && !this.files.length ? this.type === "Seeding" ? h("h2", "Not seeded files yet :(") : h("h2", "No files submitted yet") : void 0, this.files.length > this.limit ? h("a.more.link", {
                    href: "#",
                    onclick: this.handleMoreClick
                }, "SHOW MORE") : void 0
            ]);
        };

        return List;

    })(Class);

    window.List = List;

}).call(this);
