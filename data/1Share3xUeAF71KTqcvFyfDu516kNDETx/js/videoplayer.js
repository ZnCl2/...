(function () {
    var VideoPlayer,
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

    VideoPlayer = (function (superClass) {
        extend(VideoPlayer, superClass);

        function VideoPlayer() {
            this.render = bind(this.render, this);
            this.loadComments = bind(this.loadComments, this);
            this.loadVotes = bind(this.loadVotes, this);
            this.loadSubs = bind(this.loadSubs, this);
        }

        // Open video player, close video list
        VideoPlayer.prototype.render = function
                (/*nameHash, nameTitle, nameDescription,*/ nameDateAdded, nameDirectory) {

            /*nameHash = "vidnamehash";
             nameTitle = "vidnametitle";
             nameDescription = "vidnamedescription";*/


            query = "SELECT * FROM file LEFT JOIN json USING (json_id) WHERE date_added='" + nameDateAdded + "' AND directory='" + nameDirectory + "'";
            Page.cmd("dbQuery", [query], (res) => {
                my_row = res[0];
                nameHash = my_row["file_name"];
                nameTitle = my_row["title"];
                nameDescription = my_row["description"];
                nameDirectory = my_row["directory"]
                fullFile = "data/users/" + nameDirectory + "/" + nameHash;

                // Shortened variables
                $main = document.getElementsByTagName('main')[0];
                $menuLeftContainer = document.getElementsByTagName("nav")[0];
                $listContainer = document.getElementById('listavideos');
                $mainContainer = document.getElementsByTagName('main')[0];
                //$AdvertisingContainer = document.getElementById('advertising');
                $videoPlayer = document.getElementById('videoplayer');
                menu_state = 0;



                // Render video player
                //$main.width = "100%";
                //$menuLeftContainer.style.display = "none";
                $menu_scrim.style.width = '100%';
                $mainContainer.className = "main main-scope"
                //$listContainer.className = "style-scope";
                //$AdvertisingContainer.className = "style-scope ytd-browse";
                //$videoPlayer.style.display = "block";


                titlebox = document.createElement("div");
                titlebox.classList.add("titleBox");


                closebox = document.createElement("div");
                closebox.classList.add("closebox");
                closebox.onclick = closeVideo;
                closebox.innerHTML = "X";

                titlebox.appendChild(closebox);

                video = document.createElement("video");
                video.setAttribute("preload", "metadata");
                video.id = "mainvideotag";
                video.classList.add("videoBox");
                video.controls = "true";

                source = document.createElement("source");
                source.src = fullFile;

                video.appendChild(source);

                div1 = document.createElement("div");
                div2 = document.createElement("div");
                div1.appendChild(div2);
                div2.classList.add("video_title");
                h1 = document.createElement("h1");
                h1.innerHTML = nameTitle;
                div2.appendChild(h1);


                div_vote_counters_container = document.createElement("div");
                div2.appendChild(div_vote_counters_container);
                div_vote_counters_container.classList.add("vote_counters_container");
                video_vote_container = document.createElement("div");
                video_vote_container.id = "video_vote_container";
                div_line = document.createElement("div");

                span_posbar = document.createElement("span");
                span_posbar.id = 'video_vote_posbar';
                span_posbar.classList.add("pos");
                span_negbar = document.createElement("span");
                span_negbar.id = 'video_vote_negbar';
                span_negbar.classList.add("neg");

                div_line.classList.add("line");
                div_line.appendChild(span_posbar);
                div_line.appendChild(span_negbar);

                video_vote_container.appendChild(div_line);


                div_btncontainer = document.createElement("div");
                div_video_votebtn_up = document.createElement("div");
                div_video_votebtn_down = document.createElement("div");

                div_video_votebtn_up.id = "video_votebtn_up";
                div_video_votebtn_down.id = "video_votebtn_down";
                div_video_votebtn_up.innerHTML = "⮝";
                div_video_votebtn_down.innerHTML = "⮟";

                div_btncontainer.appendChild(div_video_votebtn_up);
                div_btncontainer.appendChild(document.createElement("div"));
                div_btncontainer.appendChild(div_video_votebtn_down);



                video_vote_container.appendChild(div_btncontainer);
                div_vote_counters_container.appendChild(video_vote_container);

                div_vote_counters = document.createElement("div");
                div_vote_counters.classList.add("vote_counters");

                video_votecount_up = document.createElement("div");
                video_votecount_up.id = "video_votecount_up";
                video_votecount_down = document.createElement("div");
                video_votecount_down.id = "video_votecount_down";

                div_vote_counters.appendChild(video_votecount_up);
                div_vote_counters.appendChild(video_votecount_down);

                div_vote_counters_container.appendChild(div_vote_counters);



                yt_img_avatar = document.createElement("div");
                yt_img_avatar.classList.add("yt-img-avatar")
                yt_img_avatar.innerHTML = '<img class="yt-simple-endpoint"><svg height="47px" viewBox="0 0 24 24" width="47px"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>';
                div2.appendChild(yt_img_avatar);


                video_description = document.createElement("div");
                video_description.classList.add("video_description");
                video_description.innerHTML = nameDescription;
                div2.appendChild(video_description);


                comment_input_wrapper = document.createElement("div");
                comment_input_wrapper.classList.add("comment_input_wrapper");
                div2.appendChild(comment_input_wrapper);

                video_comment = document.createElement("input");
                video_comment.classList.add("video_comment");
                video_comment.id = "video_comment";
                video_comment.placeholder = "Add a public comment...";
                comment_input_wrapper.appendChild(video_comment);



                video_comment_box = document.createElement("div");
                video_comment_box.classList.add("video_comment_box");
                video_comment_box.id = "video_comment_box";
                div2.appendChild(video_comment_box);




                $videoPlayer.appendChild(titlebox);
                titlebox.appendChild(video);
                titlebox.appendChild(div1);
                /***/

                $videoComment = video_comment;
                $videoCommentBox = video_comment_box;
                $videoVoteBtnUp = div_video_votebtn_up;
                $videoVoteBtnDown = div_video_votebtn_down;


                $videoVoteBtnUp.addEventListener('click', function (evt) {
                    if (Page.site_info.cert_user_id) {
                        return Page.selector.writeVote(nameDateAdded, nameDirectory, 1);
                    } else {
                        return Page.cmd("certSelect", [
                            ["zeroid.bit"]
                        ], (function (_this) {
                            return function (res) {
                                return Page.selector.writeVote(nameDateAdded, nameDirectory, 1);
                            };
                        })(this));
                    }
                });
                $videoVoteBtnDown.addEventListener('click', function (evt) {
                    if (Page.site_info.cert_user_id) {
                        return Page.selector.writeVote(nameDateAdded, nameDirectory, -1);
                    } else {
                        return Page.cmd("certSelect", [
                            ["zeroid.bit"]
                        ], (function (_this) {
                            return function (res) {
                                return Page.selector.writeVote(nameDateAdded, nameDirectory, -1);
                            };
                        })(this));
                    }
                });
                $videoComment.addEventListener('keypress', function (evt) {
                    var comment_body = this.value;
                    if (evt.which == 13) {
                        /*Page.selector.writeComment(nameDateAdded, nameCertUserId, comment_body);*/

                        if (Page.site_info.cert_user_id) {
                            return Page.selector.writeComment(nameDateAdded, nameDirectory, comment_body);
                        } else {
                            return Page.cmd("certSelect", [
                                ["zeroid.bit"]
                            ], (function (_this) {
                                return function (res) {
                                    return Page.selector.writeComment(nameDateAdded, nameDirectory, comment_body);
                                };
                            })(this));
                        }

                    }
                });


            });

            this.loadSubs(nameDateAdded, nameDirectory);
            this.loadComments(nameDateAdded, nameDirectory);
            this.loadVotes(nameDateAdded, nameDirectory);

            return this;
        };

        VideoPlayer.prototype.loadComments = function (nameDateAdded, nameDirectory) {

            video_name = nameDateAdded + "_" + nameDirectory;
            query = "SELECT * FROM comment LEFT JOIN json USING (json_id) WHERE file_uri='" + video_name + "' ORDER BY date_added DESC";
            Page.cmd("dbQuery", [query], (res) => {
                var comment, comment_uri, elem, i, len;

                $videoCommentBox = document.getElementById('video_comment_box');

                if (res.error || res.length == 0) {
                    return;
                } else {
                    $videoCommentBox.innerHTML = "";
                }


                for (i = 0, len = res.length; i < len; i++) {

                    comment = res[i];
                    comment_body = comment["body"];
                    comment_date_added = comment["date_added"];
                    comment_directory = comment["directory"];
                    comment_user_id = comment["cert_user_id"].split("@")[0];
                    comment_id = "comment_" + comment_date_added + "_" + comment_directory;

                    /*var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];*/
                    var date = new Date(comment_date_added * 1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();
                    // Day part from the timestamp
                    var day = date.getDate();
                    // Month part from the timestamp
                    var month = date.getMonth() + 1;
                    // Year part from the timestamp
                    var year = date.getFullYear();

                    // Will display time in dd/mm/yy, 10:30:23 format
                    var comment_formatted_date = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    divComment = document.createElement("div");
                    divComment.setAttribute("class", "video_comment_single");
                    divComment.setAttribute("id", comment_id);
                    divComment.innerHTML = "<div class='ytd-comment-renderer'></div><div class='ytd-comment'><div class='ytd-header-author'>" + comment_user_id + "</div><div class='ytd-header-time'>" + comment_formatted_date + "</div><div class='ytd-header-content'>" + comment_body + "</div>";
                    $videoCommentBox.appendChild(divComment);

                }
                ;
            });

            return this;
        };

        VideoPlayer.prototype.loadVotes = function (nameDateAdded, nameDirectory) {

            video_name = nameDateAdded + "_" + nameDirectory;
            query = "SELECT * FROM file_vote LEFT JOIN json USING (json_id) WHERE file_uri='" + video_name + "'";
            Page.cmd("dbQuery", [query], (res) => {


                document.getElementById("video_votecount_up").innerHTML = "0";
                document.getElementById("video_votecount_down").innerHTML = "0";

                for (i = 0, len = res.length; i < len; i++) {
                    if (res[i].vote > -1) {
                        document.getElementById("video_votecount_up").innerHTML = Number(document.getElementById("video_votecount_up").innerHTML) + 1;
                    } else
                        document.getElementById("video_votecount_down").innerHTML = Number(document.getElementById("video_votecount_down").innerHTML) + 1;
                }
                document.getElementById("video_vote_posbar").style.width = Number(document.getElementById("video_votecount_up").innerHTML) * 100 / res.length + "%";
                document.getElementById("video_vote_negbar").style.width = Number(document.getElementById("video_votecount_down").innerHTML) * 100 / res.length + "%";
            });

            return this;
        };
        VideoPlayer.prototype.loadSubs = function (nameDateAdded, nameDirectory) {

            video_name = nameDateAdded + "_" + nameDirectory;
            query = "SELECT * FROM subtitles LEFT JOIN json USING (json_id) WHERE file_uri='" + video_name + "'";
            Page.cmd("dbQuery", [query], (res) => {
                
                //console.log("Loading Subs");
                console.log(res);
                for (i = 0; i < res.length; i++) {
                    var loadSubs_lang = res[i].lang;
                    var loadSubs_srclang = res[i].srclang;
                    Page.cmd("fileGet", [res[i].subfile, true, 'base64'], (file) => {
                        video = document.getElementById("mainvideotag");
                        console.log("Reading File");
                        console.log(file);
                        track = document.createElement("track");
                        track.setAttribute("kind", "subtitles");
                        track.setAttribute("label", loadSubs_lang);
                        track.setAttribute("src", "data:text/vtt;base64," + file);
                        track.setAttribute("srclang", loadSubs_srclang);
                        track.setAttribute("default", "");
                        video.appendChild(track);
                    });
                }

            });

            return this;
        };

        return VideoPlayer;

    })(Class);

    window.VideoPlayer = VideoPlayer;

}).call(this);
