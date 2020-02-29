(function () {
    var File,
            bind = function (fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

    File = (function () {

        function File(row, item_list) {
            this.item_list = item_list;
            this.handleOpenClick = bind(this.handleOpenClick, this);
            this.handleVideoClick = bind(this.handleVideoClick, this);
            this.handleNeedClick = bind(this.handleNeedClick, this);
            this.handleTitleSave = bind(this.handleTitleSave, this);
            this.handleImageSave = bind(this.handleImageSave, this);
            this.handleBriefSave = bind(this.handleBriefSave, this);
            this.handleDelete = bind(this.handleDelete, this);
            this.deleteFromDataJson = bind(this.deleteFromDataJson, this);
            this.deleteFromContentJson = bind(this.deleteFromContentJson, this);
            this.deleteFile = bind(this.deleteFile, this);
            this.editable_title = null;
            this.editable_image = null;
            this.editable_brief = null;
            this.status = "unknown";
            this.setRow(row);
        }

        File.prototype.getRatioColor = function (ratio) {
            var ratio_h, ratio_l, ratio_s;
            ratio_h = Math.min(ratio * 50, 145);
            ratio_s = Math.min(ratio * 100, 60);
            ratio_l = 80 - Math.min(ratio * 5, 30);
            return "hsl(" + ratio_h + ", " + ratio_s + "%, " + ratio_l + "%)";
        };

        File.prototype.setRow = function (row1) {
            var ref;
            this.row = row1;
            this.owned = Page.site_info.auth_address === this.row.directory;

            if (true) {
                
                if (this.owned && !this.editable_title) {
                    this.editable_title = new Editable("div.body", this.handleTitleSave, this.handleDelete);
                    this.editable_title.empty_text = " ";
                }

                if (this.owned && !this.editable_image) {
                    this.editable_image = new Editable("div.body", this.handleImageSave, this.handleDelete);
                    this.editable_image.empty_text = " ";
                }

                if (this.owned && !this.editable_brief) {
                    this.editable_brief = new Editable("div.body", this.handleBriefSave, this.handleDelete);
                    this.editable_brief.empty_text = " ";
                }
            }

            if (this.row.stats.bytes_downloaded >= this.row.size) {
                return this.status = "seeding";
            } else if (this.row.stats.is_downloading) {
                return this.status = "downloading";
            } else if ((0 < (ref = this.row.stats.bytes_downloaded) && ref < this.row.size)) {
                return this.status = "partial";
            } else {
                return this.status = "inactive";
            }
        };

        File.prototype.deleteFile = function (cb) {
            str = this.row.inner_path;
            str = str.substring(0, str.lastIndexOf(".")) + ".png";
            str = str.substring(0, str.lastIndexOf("/")) + "/thumbs" + str.substring(str.lastIndexOf("/"));
            Page.cmd("optionalFileDelete", str);
            return Page.cmd("optionalFileDelete", this.row.inner_path, (function (_this) {
                return function () {
                    return Page.cmd("optionalFileDelete", _this.row.inner_path + ".piecemap.msgpack", function () {
                        return typeof cb === "function" ? cb(true) : void 0;
                    });
                };
            })(this));
        };

        File.prototype.deleteFromContentJson = function (cb) {
            return Page.cmd("fileGet", this.row.content_inner_path, (function (_this) {
                return function (res) {
                    var data;
                    data = JSON.parse(res);
                    delete data["files_optional"][_this.row.file_name];
                    delete data["files_optional"][_this.row.file_name + ".piecemap.msgpack"];
                    return Page.cmd("fileWrite", [_this.row.content_inner_path, Text.fileEncode(data)], function (res) {
                        return typeof cb === "function" ? cb(res) : void 0;
                    });
                };
            })(this));
        };

        File.prototype.deleteFromDataJson = function (cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function (_this) {
                return function (res) {
                    var data;
                    data = JSON.parse(res);
                    delete data["file"][_this.row.file_name];
                    delete data["file"][_this.row.file_name + ".piecemap.msgpack"];
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function (res) {
                        return typeof cb === "function" ? cb(res) : void 0;
                    });
                };
            })(this));
        };

        File.prototype.handleDelete = function (cb) {
            return this.deleteFile((function (_this) {
                return function (res) {
                    return _this.deleteFromContentJson(function (res) {
                        if (!res === "ok") {
                            return cb(false);
                        }
                        return _this.deleteFromDataJson(function (res) {
                            if (res === "ok") {
                                Page.cmd("sitePublish", {
                                    "inner_path": _this.row.content_inner_path
                                });
                                Page.list.update();
                                return cb(true);
                            }
                        });
                    });
                };
            })(this));
        };

        File.prototype.handleTitleSave = function (title, cb) {
            console.log(this.row.data_inner_path);
            return Page.cmd("fileGet", this.row.data_inner_path, (function (_this) {
                return function (res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["title"] = title;
                    _this.row.title = title;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function (res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleImageSave = function (image_link, cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function (_this) {
                return function (res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["image_link"] = image_link;
                    _this.row.image_link = image_link;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function (res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleBriefSave = function (description, cb) {
            return Page.cmd("fileGet", this.row.data_inner_path, (function (_this) {
                return function (res) {
                    var data;
                    data = JSON.parse(res);
                    data["file"][_this.row.file_name]["description"] = description;
                    _this.row.description = description;
                    return Page.cmd("fileWrite", [_this.row.data_inner_path, Text.fileEncode(data)], function (res) {
                        if (res === "ok") {
                            cb(true);
                            return Page.cmd("sitePublish", {
                                "inner_path": _this.row.content_inner_path
                            });
                        } else {
                            return cb(false);
                        }
                    });
                };
            })(this));
        };

        File.prototype.handleNeedClick = function () {
            this.status = "downloading";
            Page.cmd("fileNeed", this.row.inner_path + "|all", (function (_this) {
                return function (res) {
                    return console.log(res);
                };
            })(this));
            return false;
        };

        File.prototype.handleVideoClick = function () {
            Page.setUrl("?watch=" + this.row.date_added + "_" + this.row.directory);
            /*Page.setUrl("?watch=" + this.row.date_added + "_" + this.row.cert_user_id);*/
            Page.videoPlayer.render(this.row.inner_path, this.row.title, this.row.description, this.row.date_added, this.row.directory);
            return false;
        }

        File.prototype.handleOpenClick = function () {
            Page.cmd("serverShowdirectory", ["site", this.row.inner_path]);
            return false;
        };

        File.prototype.render = function () {
            var ext, low_seeds, peer_num, ratio, ratio_color, ref, ref1, ref2, ref3, style, type;
            if (this.row.stats.bytes_downloaded) {
                ratio = this.row.stats.uploaded / this.row.stats.bytes_downloaded;
            } else {
                ratio = 0;
            }
            ratio_color = this.getRatioColor(ratio);
            if ((ref = this.status) === "downloading" || ref === "partial") {
                style = "box-shadow: inset " + (this.row.stats.downloaded_percent * 2.5) + "px 0px 0px #ff0000";
            } else {
                style = "";
            }
            ext = this.row.file_name.toLowerCase().replace(/.*\./, "");
            if (ext === "m4v" || ext === "mp4" || ext === "webm" || ext === "ogm") {
                type = "video";
            } else {
                type = "other";
            }

            if (this.row.is_featured === 1) {
                peer_num = Math.max((this.row.stats.peer_seed + this.row.stats.peer_leech) - 1000000 || 0, this.row.stats.peer || 0);
            } else {
                peer_num = Math.max((this.row.stats.peer_seed + this.row.stats.peer_leech) || 0, this.row.stats.peer || 0);
            }
            ;

            low_seeds = this.row.stats.peer_seed <= peer_num * 0.1 && this.row.stats.peer_leech >= peer_num * 0.2;

            // Build file div
            return h("div.file." + type, {
                key: this.row.id,
            }, h("div.stats", [
                h("div.stats-col.peers", {
                    title: "Seeder: " + this.row.stats.peer_seed + ", Leecher: " + this.row.stats.peer_leech
                }, [
                    h("span.value", peer_num), h("span.icon.icon-profile", {
                        style: low_seeds ? "background: #cccccc" : "background: #666"
                    })
                ]), h("div.stats-col.ratio", {
                    title: "Hash id: " + this.row.stats.hash_id
                }, h("span.value", {
                    "style": "background-color: " + ratio_color
                }, ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1))), h("div.stats-col.uploaded", "\u2BA5 " + (Text.formatSize(this.row.stats.uploaded)))
            ]),
                    // Video Link
                    h("div.linkJoiner.videoimage", [
                        h("a.playVideo", {
                            href: "?watch=" + this.row.date_added + "_" + this.row.directory,
                            /*onclick: Page.handleLinkClick,*/
                            style: ""
                        }, [h("div.video_empty", {
                                style: 'background-image: url("' + this.row.image_link + '")'
                            })]), h("span.size", {
                            classes: {
                                downloading: this.status === "downloading",
                                partial: this.status === "partial",
                                seeding: this.status === "seeding"
                            },
                            style: style
                        }, [this.status === "seeding" || this.status === "downloading" || this.status === "partial" ? [h("span.downloaded"/*, Text.formatSize(this.row.stats.bytes_downloaded)*/)/*, " of "*/] : void 0/*, Text.formatSize(this.row.size)*/])
                    ]),
                    h("div.left-info", [h("div.linkJoiner.title", [h("div.linkSeparator", {
                                style: ""
                            }, [
                                ((ref1 = this.editable_title) != null ? ref1.editing : void 0) ? this.editable_title.render(this.row.title) : h("a.title.link.header", {
                                    href: "?watch=" + this.row.date_added + "_" + this.row.directory,
                                    enterAnimation: Animation.slideDown
                                }, ((ref2 = this.editable_title) != null ? ref2.render(this.row.title) : void 0) || this.row.title)


                            ])

                        ]),

                        h("div.details", [h("div.linkSeparator", [
                                h("span.detail.uploader", [
                                    h("a.link.username", {
                                        href: "?Channel=" + this.row.directory,
                                        title: this.row.directory
                                    }, this.row.cert_user_id.split("@")[0]),
                                    h("span.detail.added", {
                                        title: Time.date(this.row.date_added, "long")
                                    }, Time.since(this.row.date_added))
                                ])]), h("div.linkSeparator", [(ref3 = this.status) === "inactive" || ref3 === "partial" ? h("a.add", {
                                    href: "#Add",
                                    title: "Download and seed",
                                    onclick: this.handleNeedClick
                                }, "+ seed") : void 0,
                                h("span.detail.size-counter", [this.status === "downloading" || this.status === "partial" ? [Text.formatSize(this.row.stats.bytes_downloaded) + " / "] : void 0, Text.formatSize(this.row.size)])]),
                            h("div.linkSeparator.ytd-compact-thumbnail", [
                                ((ref1 = this.editable_image) != null ? ref1.editing : void 0) ? this.editable_image.render(this.row.image_link) : h("a.title.link.imgy", {
                                    href: "#",
                                    style: "font-size: 13px; overflow: hidden",
                                    enterAnimation: Animation.slideDown
                                }, ((ref2 = this.editable_image) != null ? ref2.render("Custom thumbnail") : void 0) || this.row.image_link)
                            ]),
                            h("div.linkSeparator.ytd-compact-description", [
                                ((ref1 = this.editable_brief) != null ? ref1.editing : void 0) ? this.editable_brief.render(this.row.description) : h("a.title.link.briefy", {
                                    href: "#",
                                    style: "font-size: 13px; overflow: hidden;",
                                    enterAnimation: Animation.slideDown
                                }, ((ref2 = this.editable_brief) != null ? ref2.render("Basic info") : void 0) || this.row.description)
                            ])
                        ])
                    ]));

        };

        return File;

    })();

    window.File = File;

}).call(this);
