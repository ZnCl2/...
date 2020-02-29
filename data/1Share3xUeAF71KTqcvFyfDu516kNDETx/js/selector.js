(function () {
    var Selector,
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
    Selector = (function (superClass) {
        extend(Selector, superClass);
        function Selector() {
            this.render = bind(this.render, this);
            this.preventEvent = bind(this.preventEvent, this);
            this.handleUploadClick = bind(this.handleUploadClick, this);
            this.handleBrowseClick = bind(this.handleBrowseClick, this);
            this.handleFileDrop = bind(this.handleFileDrop, this);
            this.uploadFile = bind(this.uploadFile, this);
            this.writeComment = bind(this.writeComment, this);
            this.handleUploadDone = bind(this.handleUploadDone, this);
            this.registerUpload = bind(this.registerUpload, this);
            this.registerComment = bind(this.registerComment, this);
            this.checkContentJson = bind(this.checkContentJson, this);
            
            this.writeVote = bind(this.writeVote, this);
            this.registerVote = bind(this.registerVote, this);
            
            this.file_info = {};
            document.body.ondragover = (function (_this) {
                return function (e) {
                    var ref;
                    if (((ref = e.dataTransfer.items[0]) != null ? ref.kind : void 0) === "file") {
                        document.body.classList.add("drag-over");
                    }
                    return _this.preventEvent(e);
                };
            })(this);
            document.body.ondragleave = (function (_this) {
                return function (e) {
                    if (!e.pageX) {
                        document.body.classList.remove("drag-over");
                    }
                    return _this.preventEvent(e);
                };
            })(this);
        }

        Selector.prototype.checkContentJson = function (cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/content.json";
            return Page.cmd("fileGet", [inner_path, false], (function (_this) {
                return function (res) {
                    var optional_pattern;
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    optional_pattern = "(?!data.json)";
                    if (res.optional === optional_pattern) {
                        return cb();
                    }
                    res.optional = optional_pattern;
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };
        Selector.prototype.registerUpload = function (title, type, description, image_link, is_featured, file_name, file_size, date_added, cb) {
            if (image_link == null || image_link == "")
                image_link = "img/nothumbpslider.png";
//            video = document.createElement("video");
//            while (video.childNodes.length > 0)
//                video.removeChild(video.childNodes[0]);
//            //video.setAttribute("autoplay", 'true');
//            //video.setAttribute("style","border: 1px solid ; display: inline-block;vertical-align: baseline;position: absolute;z-index: 1000;");
//            source = document.createElement("source");
//            source.setAttribute("src", "data/users/" + Page.site_info.auth_address + "/" + file_name);
//            source.setAttribute("type", "video/mp4");
//            video.appendChild(source);
//            video.currentTime = 5;
//            video.oncanplaythrough = function () {
//                var canvas = document.createElement("canvas");
//                context = canvas.getContext('2d');
//                context.drawImage(video, 0, 0, canvas.width, canvas.height);
//                //canvas.width = video.clientWidth;
//                //canvas.height = video.clientHeight;
//                var image = new Image(canvas.width,canvas.height);
//                canvas.crossorigin = "Anonymous";
//                image.crossOrigin = "Anonymous";
//                //parent.create(s, 'www');
//                setTimeout(function (canvas) {
//                    //toBase64(,s);
//
//                    console.log("pronto: " + canvas.toString());
//                    image.src = canvas.toDataURL("image/png");
//                    console.log(image.src);
//                },1000,canvas);
//                
//
//
//                image.src = canvas.toDataURL();
//                document.body.appendChild(image);
//                //video.style = "z-index : 0";
//            }

            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
            return Page.cmd("fileGet", [inner_path, false], (function (_this) {
                return function (res) {
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    if (res.file == null) {
                        res.file = {};
                    }
                    res.file[file_name] = {
                        title: title,
                        type: type,
                        description: description,
                        is_featured: is_featured,
                        image_link: image_link,
                        size: file_size,
                        date_added: date_added
                    };
                    //return;

                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };
        Selector.prototype.handleUploadDone = function (file) {
            console.log("pronto... " + file.name);


//            Page.cmd("fileGet", "data/users/" + Page.site_info.auth_address + "/data.json", (function (_this) {
//                return function (res) {
//                    var data;
//                    data = JSON.parse(res);
//                    data["file"][file.name]["title"] = document.getElementById("upload_video_title").value;
//                    //data["file"][_this.row.file_name]["image_link"] = document.getElementById("upload_video_title").value;
//                    data["file"][file.name]["description"] = document.getElementById("upload_video_description").value;
//                    _this.row.title = title;
//                    return Page.cmd("fileWrite", ["data/users/" + Page.site_info.auth_address + "/data.json", Text.fileEncode(data)], function (res) {
//                        if (res === "ok") {
//                            cb(true);
//                            return Page.cmd("sitePublish", {
//                                "inner_path": "data/users/" + Page.site_info.auth_address + "/content.json"
//                            });
//                        } else {
//                            return cb(false);
//                        }
//                    });
//                };
//            })(this));

            document.body.classList.remove("uploading");
            //Page.setUrl("?My");
            return this.log("Upload done", file);
        };
        // Write comment function. Use this in the video section.. remember to sign the comment, then publish it!
        Selector.prototype.registerComment = function (file_uri, body, date_added, cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
            return Page.cmd("fileGet", [inner_path, false], (function (_this) {
                return function (res) {
                    var _base, _name;
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    if (res.comment == null) {
                        res.comment = {};
                    }
                    if ((_base = res.comment)[_name = file_uri] == null) {
                        _base[_name] = [];
                    }

                    res.comment[file_uri].push({
                        body: body,
                        date_added: date_added
                    });
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };
        Selector.prototype.writeComment = function (file_date_added, file_directory, comment_body) {
            var file_uri = file_date_added + "_" + file_directory;
            return this.checkContentJson(function (_this) {
                return function (res) {
                    return _this.registerComment(file_uri, comment_body, Time.timestamp(), function (res) {
                        Page.videoPlayer.loadComments(file_date_added, file_directory);
                        return Page.cmd("siteSign", {
                            inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                        }, function (res) {
                            return Page.cmd("sitePublish", {
                                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                                "sign": false
                            });
                        });
                    });
                };
            }(this));
        };
        Selector.prototype.registerVote = function (file_uri, body, date_added, cb) {
            var inner_path;
            inner_path = "data/users/" + Page.site_info.auth_address + "/data.json";
            return Page.cmd("fileGet", [inner_path, false], (function (_this) {
                return function (res) {
                    var _base, _name;
                    if (res) {
                        res = JSON.parse(res);
                    }
                    if (res == null) {
                        res = {};
                    }
                    if (res.file_vote == null) {
                        res.file_vote = {};
                    }
                    if ((_base = res.file_vote)[_name = file_uri] == null) {
                        _base[_name] = [];
                    }

                    res.file_vote[file_uri] = {
                        vote: body
                    };
                    return Page.cmd("fileWrite", [inner_path, Text.fileEncode(res)], cb);
                };
            })(this));
        };
        Selector.prototype.writeVote = function (file_date_added, file_directory, comment_body) {
            var file_uri = file_date_added + "_" + file_directory;
            return this.checkContentJson(function (_this) {
                return function (res) {
                    return _this.registerVote(file_uri, comment_body, Time.timestamp(), function (res) {
                        Page.videoPlayer.loadVotes(file_date_added, file_directory);
                        return Page.cmd("siteSign", {
                            inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                        }, function (res) {
                            return Page.cmd("sitePublish", {
                                inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                                "sign": false
                            });
                        });
                    });
                };
            }(this));
        };
        Selector.prototype.uploadFile = function (file) {
            var ref;
            if (file.size > 10000 * 1024 * 1024) {
                Page.cmd("wrapperNotification", ["info", "Maximum file size on this site during the testing period: 2GB"]);
                return false;
            }
            if (file.size < 1 * 1024 * 1024) {
                Page.cmd("wrapperNotification", ["info", "Minimum file size: 1MB"]);
                return false;
            }
            if ((ref = file.name.split(".").slice(-1)[0]) !== "mp4" && ref !== "m4v" && ref !== "webm") {
                Page.cmd("wrapperNotification", ["info", "Only mp4, m4v and webm files allowed on this site"]);
                debugger;
                return false;
            }


            document.body.classList.remove("uploading");

            this.file_info = {};
            return this.checkContentJson((function (_this) {
                return function (res) {
                    var file_name = document.getElementById("hashed_name").innerHTML;

                    var file_thumbs = document.getElementById("upload_img_video_thumbs").src;

//                    file_name = file.name;
//                    if (file_name.replace(/[^A-Za-z0-9]/g, "").length < 20) {
//                        file_name = Time.timestamp() + "-" + file_name;
//                    }
                    var file_thumbs_name = "data/users/" + Page.site_info.auth_address + "/thumbs/" +
                            file_name.substring(0, file_name.lastIndexOf(".")) + ".png";

                    Page.cmd("fileWrite",
                            [file_thumbs_name, file_thumbs.substring(file_thumbs.indexOf(","))],
                            function (res) {
                                console.log(res);
                            });

                    //return;

                    return Page.cmd("bigfileUploadInit", ["data/users/" + Page.site_info.auth_address + "/" + file_name, file.size], function (init_res) {
                        var formdata, req;
                        formdata = new FormData();
                        formdata.append(file_name, file);
                        req = new XMLHttpRequest();
                        _this.req = req;
                        _this.file_info = {
                            size: file.size,
                            name: file_name,
                            type: file.type,
                            url: init_res.url
                        };
                        req.upload.addEventListener("loadstart", function (progress) {
                            _this.log("loadstart", arguments);
                            _this.file_info.started = progress.timeStamp;
                            return;
                            //return Page.setPage("uploader");
                        });
                        req.upload.addEventListener("loadend", function () {

                            var defaultType = "video";
                            var defaultImage = file_thumbs_name;
                            var defaultDescription = document.getElementById("upload_video_description").value;
                            var defaultFeatured = 0;
                            _this.log("loadend", arguments);
                            _this.file_info.status = "done";
                            // Register the uploaded file into the user folder data. This can be emulated for the comment function
                            return _this.registerUpload(document.getElementById("upload_video_title").value, defaultType, defaultDescription, defaultImage, defaultFeatured, init_res.file_relative_path, file.size, Time.timestamp(), function (res) {
                                return Page.cmd("siteSign", {
                                    inner_path: "data/users/" + Page.site_info.auth_address + "/content.json"
                                }, function (res) {
                                    return Page.cmd("sitePublish", {
                                        inner_path: "data/users/" + Page.site_info.auth_address + "/content.json",
                                        "sign": false
                                    }, function (res) {
                                        return _this.handleUploadDone(file);
                                    });
                                });
                            });
                        });
                        req.upload.addEventListener("progress", function (progress) {
                            _this.file_info.speed = 1000 * progress.loaded / (progress.timeStamp - _this.file_info.started);
                            _this.file_info.percent = progress.loaded / progress.total;
                            _this.file_info.loaded = progress.loaded;
                            _this.file_info.updated = progress.timeStamp;
                            return Page.projector.scheduleRender();
                        });
                        req.addEventListener("load", function () {
                            return _this.log("load", arguments);
                        });
                        req.addEventListener("error", function () {
                            return _this.log("error", arguments);
                        });
                        req.addEventListener("abort", function () {
                            return _this.log("abort", arguments);
                        });
                        req.withCredentials = true;
                        req.open("POST", init_res.url);
                        return req.send(formdata);
                    });
                };
            })(this));
        };
        Selector.prototype.handleFileDrop = function (e) {
            this.log("File drop", e);
            document.body.classList.remove("drag-over");
            if (!event.dataTransfer.files[0]) {
                return false;
            }
            this.preventEvent(e);
            if (Page.site_info.cert_user_id) {
                return this.uploadFile(event.dataTransfer.files[0]);
            } else {
                return Page.cmd("certSelect", [
                    ["zeroid.bit"]
                ], (function (_this) {
                    return function (res) {
                        return _this.uploadFile(event.dataTransfer.files[0]);
                    };
                })(this));
            }
        };
        Selector.prototype.handleBrowseClick = function (e) {
            if (Page.site_info.cert_user_id) {
                return this.handleUploadClick(e);
            } else {
                return Page.cmd("certSelect", [
                    ["zeroid.bit"]
                ], (function (_this) {
                    return function (res) {
                        return _this.handleUploadClick(e);
                    };
                })(this));
            }
        };
        Selector.prototype.handleUploadClick = function (e) {
            document.body.classList.add("uploading");
            var video = document.getElementById('upload_video_preview');
//            video.addEventListener('play', function () {
//                var $this = this; //cache
//                (function loop() {
//                    if (!$this.paused && !$this.ended) {
//                        ctx.drawImage($this, 0, 0);
//                        setTimeout(loop, 1000 / 30); // drawing at 30fps
//                    }
//                })();
//            }, 0);


            var input = document.getElementById("upload_input_video");
            var upload_button_send = document.getElementById("upload_button_send");
            input.onchange = function () {
                var input = document.getElementById("upload_input_video")
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onprogress = function (evt) {
                        // evt is an ProgressEvent.
                        if (evt.lengthComputable) {
                            var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                            // Increase the progress bar length.
                            if (percentLoaded < 100) {
                                console.log(percentLoaded);
                            }
                        }
                    };
                    reader.onload = function (e) {

                        var multiThumbs = false;

                        console.log(input.files[0].name);
                        document.getElementById("upload_video_title").value = input.files[0].name;

                        video.src = e.target.result;


                        var canvas = document.getElementById("upload_canvas_video_thumbs");
                        video.setAttribute("style", "");
                        canvas.setAttribute("style", "");


                        video.onloadeddata = function () {
                            var video = document.getElementById("upload_video_preview");
                            var maxFrames = video.length > 50 ? 5 : Math.trunc(video.duration / 10);
                            video.setAttribute("style", "width:" + video.videoWidth + "px;height:" + video.videoHeight + "px;");
                            var canvas = document.getElementById("upload_canvas_video_thumbs");
                            canvas.setAttribute("style", "width:" + Number(video.videoWidth * maxFrames > 0 && multiThumbs ? video.videoWidth * maxFrames : video.videoWidth) + "px;height:" + video.videoHeight + "px;");


                            //canvas.width = video.videoWidth * maxFrames > 0 && multiThumbs ? video.videoWidth * maxFrames : video.videoWidth;
                            //canvas.height = video.videoHeight;
                            canvas.width = 250;
                            canvas.height = 140;

                            if (video.duration > 10)
                                video.currentTime = 10;
                            else
                                video.currentTime = Math.trunc(video.duration / 2);
                        }
                        video.onseeked = function () {
                            var canvas = document.getElementById("upload_canvas_video_thumbs");
                            context = canvas.getContext('2d');

                            //context.drawImage(video, (video.videoWidth * (video.currentTime - 10) / 10)>0?(video.videoWidth * (video.currentTime - 10) / 10) : 0 , 0, video.videoWidth, video.videoHeight);
                            context.drawImage(video, 0, 0, 250, 140);


                            var image = document.getElementById("upload_img_video_thumbs");
                            canvas.crossorigin = "Anonymous";
                            image.crossOrigin = "Anonymous";
                            image.src = canvas.toDataURL();
                            var maxFrames = video.duration > 50 ? 50 : video.duration;
                            if (video.currentTime < maxFrames - 9 && multiThumbs) {
                                video.currentTime += 10;
                            } else {
                                video.setAttribute("style", "display:none");
                                canvas.setAttribute("style", "display:none");
                                document.getElementById("hash_progress").style.display = "";
                                reader = new FileReader();
                                var value = null;
                                method = sha256;
                                if (method.update) {
                                    var batch = 1024 * 1024 * 2;
                                    var start = 0;
                                    var total = input.files[0].size;
                                    var current = method;
                                    reader.onload = function (event) {
                                        try {
                                            current = current.update(event.target.result, value);
                                            asyncUpdate();
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    };
                                    var asyncUpdate = function () {
                                        if (start < total) {
                                            console.log('hashing...' + (start / total * 100).toFixed(2) + '%');
                                            document.getElementById("hashing_name").value = (start / total * 100).toFixed(2);
                                            var end = Math.min(start + batch, total);
                                            reader.readAsArrayBuffer(input.files[0].slice(start, end));
                                            start = end;
                                        } else {
                                            console.log(current.hex());
                                            document.getElementById("hashing_name").value = "100";
                                            document.getElementById("hashed_name").innerHTML = current.hex() + input.files[0].name.substring(input.files[0].name.lastIndexOf("."));
                                            document.getElementById("hash_progress").style.display = "none";
                                            document.getElementById("upload_button_send").removeAttribute("disabled");
                                        }
                                    };
                                    asyncUpdate();
                                } else {
                                    console.log('hashing...');
                                    reader.onload = function (event) {
                                        try {
                                            console.log(method(event.target.result, value));
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    };
                                    reader.readAsArrayBuffer(input.files[0]);
                                }
                            }




                        }



                        //video.src = this.result;
                        //$('#blah').attr('src', e.target.result);
                        //$(".apresentacao_imagem_mime").val(input.files[0].type);
                    }
                    reader.readAsDataURL(input.files[0]);
                    /*
                     reader.readAsDataURL(input.files[0]);
                     * 
                     */
                }
            }


            upload_button_send.onclick = (function (_this) {
                return function (e) {
                    var input = document.getElementById("upload_input_video");
                    return _this.uploadFile(input.files[0]);
                };
            })(this);
            //input.click();
            return false;
        };
        Selector.prototype.preventEvent = function (e) {
            e.stopPropagation();
            return e.preventDefault();
        };
        Selector.prototype.render = function () {
            return h("div#Selector.Selector", {
                classes: {
                    //hidden: Page.state.page !== "selector"
                }
            }, h("div.browse", [
                h("div.icon.icon-upload"), h("a.button", {
                    href: "#Browse",
                    onclick: this.handleBrowseClick
                }, "Select file from computer")
            ]), h("div.dropzone", {
                ondragenter: this.preventEvent,
                ondragover: this.preventEvent,
                ondrop: this.handleFileDrop
            }));
        };
        return Selector;
    })(Class);
    window.Selector = Selector;
}).call(this);
