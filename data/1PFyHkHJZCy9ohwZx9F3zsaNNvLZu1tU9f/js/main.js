(function ($){
    var $tiles = $('#tiles'),
        $handler = $('li', $tiles),
        $main = $('#main'),
        $window = $(window),
        $document = $(document),
        options = {
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: $main, // Optional, used for some extra CSS styling
            offset: 20, // Optional, the distance between grid items
            itemWidth:280 // Optional, the width of a grid item
        };

    var showcell = $('#show-cell')
    var show_cell = showcell.clone();
    showcell.remove();



    function htmlDialogShow(info){
        var $shadow = $('#shadow');
        //var $iframe = $shadow.find('iframe');
        //$iframe.attr('src', href);

        $shadow.addClass("shadow");
        $shadow.removeClass("hide");


        $("#movie-title").text(info.title);
        $("#cover").attr("title", info.title);
        $("#cover").attr("src", "data/" + info.coverImage);

        $("#link-dynamic-add").remove();


        for (var link in info.download_links)
        {
            var link_template = '<li id="link-dynamic-add"><a href="<<<ed2k>>>"><<<ed2k>>></a></li>';
            link_obj = link_template.replace(/<<<ed2k>>>/g, info.download_links[link]);
            $("#link-list").append(link_obj)
        }
        $("#link-list").click(function () {
            return true;
        });
        if (info.thumbnail && info.thumbnail.length >0){

        }
        else{
            $("thumbnail").remove()
        }
    }

    function htmlDialogHide(){
        $('#shadow').removeClass("shadow");
        $('#shadow').addClass("hide");
    }


//                $('#logo').click(function (obj) {
//                    $('#shadow').addClass("shadow");
//                    $('#shadow').removeClass("hide");
//                });

    $('#shadow').click(function (obj) {
        var target = obj.target;
        var ss = "";
        if ($('.single-page').find(target).length == 0) {
            htmlDialogHide();
        }

    });


    function load_masterlu_data(data) {
        $.each(data, function (infoIndex, info) {
            var $cell = show_cell.clone();
            if (info.coverImage) {
                $imageCover = $cell.find("img");
                $imageCover.load(function () {
                    console.log("image load");
                    $imageCover = $cell.find("img");
                    $imageCover.removeClass("hide");
                    //$imageCover.attr("src", "data/" + info.coverImage);
                    $loading = $cell.find(".loading3");
                    $loading.remove();
                    applyLayout();
                });
                $imageCover.attr("src", "data/" + info.coverImage);
            }
            if (info.title) {
                $cell.find("h3").text(info.title);
            }

            $a = $cell.find("a");
            $a.attr("href", "");
            $a.click(function () {
                htmlDialogShow(info);
                return false;
            });

            $tiles.append($cell);
        });
        applyLayout();
    }

    load_masterlu_data(masterlu_data);

    /**
     * Reinitializes the wookmark handler after all images have loaded
     */
    function applyLayout() {
        $tiles.imagesLoaded(function() {
            // Destroy the old handler
            if ($handler.wookmarkInstance) {
                $handler.wookmarkInstance.clear();
            }

            // Create a new layout handler.
            $handler = $('li', $tiles);
            $handler.wookmark(options);
        });
    }


    // Call the layout function for the first time
    applyLayout();

    // Capture scroll event.
    //$window.bind('scroll.wookmark', onScroll);
})(jQuery);