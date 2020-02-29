var contentPage = $("#contentPage");
var jsonList = null;

function loadAlphabets(val) {

    contentPage.html('<ul id="alphabetListing"></ul>');

    var alphabets = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    var htmlVal = '<div id="list"><ul>';

    if (val == 'SERIES') {
        jsonList = seriesList;
    } else if (val == 'MOVIES') {
        jsonList = moviesList;
    } else if (val == 'CARTOONS') {
        jsonList = cartoonList;
    } else if (val == 'ANIME') {
        jsonList = animeList;
    }

    $.each(alphabets, function (index, alphabet) {
        htmlVal += '<li><a href="#" onclick="loadJson(\'' + alphabet + '\',\'' + val + '\')">';
        htmlVal += '<span class="tag">['+val+']</span><span>FOLDER ' + alphabet + '</span>';
        htmlVal += '</a></li>';
    });

    htmlVal += '<li> <a href="index.html"> <span class="tag">[HOME]</span>BACK<span></span> </a> </li>';

    htmlVal += '</ul></div>';

    contentPage.append(htmlVal);

}

function loadJson(alphabet, val) {

    contentPage.html('<div id="list"><ul id="contentLsting"></ul></div>');

    var contentLsting = $('#contentLsting');
    var htmlVal = '';

    $.each(jsonList, function (index, content) {

        if (content.name.charAt(0) == alphabet) {

            htmlVal += '<li><a href="#" onclick="loadContent(' + index + ',\'' + val + '\')">';
            htmlVal += '<span class="tag">['+val+' / ' + alphabet + ']</span>';
            htmlVal += '<span>' + content.name + '</span>';
            htmlVal += '</a></li>';

        }

    });

    htmlVal += '<li><a href="#" onclick="loadAlphabets(\'' + val + '\')">';
    htmlVal += '<span class="tag">['+val+']</span>BACK<span></span>';
    htmlVal += '</a></li>';

    contentLsting.append(htmlVal);

}

function loadContent(index, val) {

    var content = jsonList[index];
    contentPage.html('');

    var htmlVal = '<div id="list"><p>' + content.name + '</p>';
    htmlVal += '<img src="' + content.poster + '" height="399" width="280"></br>';
    htmlVal += '<p class="description">';

    if (content.imdb != null && content.imdb != "") {
        htmlVal += ' - <a href="https://anon.to/?' + content.imdb + '" target="_blank">IMDB</a></br>';
    }

    if (content.anidb != null && content.anidb != "") {
        htmlVal += ' - <a href="https://anon.to/?' + content.anidb + '" target="_blank">ANIDB</a></br>';
    }

    if (content.myanimelist != null && content.myanimelist != "") {
        htmlVal += ' - <a href="https://anon.to/?' + content.myanimelist + '" target="_blank">MYANIMELIST</a></br>';
    }

    if (content.trakt != null && content.trakt != "") {
        htmlVal += ' - <a href="https://anon.to/?' + content.trakt + '" target="_blank">TRAKTV</a></br>';
    }

    if (content.trailer != null && content.trailer != "") {
        htmlVal += ' - <a href="https://anon.to/?' + content.trailer + '" target="_blank">TRAILER</a></p>';
    }

    if (content.description != null && content.description != "") {
        htmlVal += '<p class="description">DESCRIPTION<br><br>' + content.description + '</p>';
    }

    if (val == 'MOVIES'){

        htmlVal += '<p>T O R R E N T S</p>';
        htmlVal += '<ul>';

        htmlVal += '<li><a href="#" onclick="loadTorrents(' + index + ',0,\''+val+'\')">';
        htmlVal += ' - TORRENTS';
        htmlVal += '</a></li>';

        htmlVal += '</ul><br>';

    } else {

        htmlVal += '<p>S E A S O N S</p>';
        htmlVal += '<ul>';

        $.each(content.seasons, function (seasonIndex, seasons) {
            htmlVal += '<li><a href="#" onclick="loadTorrents(' + index + ',' + seasonIndex + ',\'' + val + '\')">';
            htmlVal += ' - ' + seasons.name;
            htmlVal += '</a></li>';
        });

        htmlVal += '</ul><br>';

    }

    htmlVal += '<a href="#" onclick="loadJson(\'' + content.name.charAt(0) + '\',\'' + val + '\')">';
    htmlVal += '<span class="tag">['+val+']</span>BACK<span></span>';
    htmlVal += '</a></div>';

    contentPage.append(htmlVal);

}

function loadTorrents(seriesIndex, seasonIndex, val) {

    var content = jsonList[seriesIndex];
    var season = [];

    if (val == 'MOVIES'){
        season.torrents = content.torrents;
    }
    else {
        season = content.seasons[seasonIndex];
    }

    contentPage.html('');

    var htmlVal = '<div id="list"><a href="#" onclick="loadContent(' + seriesIndex + ',\'' + val + '\')">' + content.name + '</a>';
    if (val != 'MOVIES'){
        htmlVal += '<p align="center">' + season.name + '</p>';
    }

    $.each(season.torrents, function (torrentIndex, torrent) {
        htmlVal += '<p align="center">' + torrent.name + '</p>';
        htmlVal += '<p class="description">DOWNLOAD MIRRORS<br><br>';

        if (torrent.info_hash != null && torrent.info_hash != "") {
            htmlVal += 'INFOHASH: [' + torrent.info_hash + ']<br>';
        }

        if (torrent.magnet != null && torrent.magnet != "") {
            htmlVal += ' - <a href="' + torrent.magnet + '" target="_blank">MAGNET LINK</a><br>';
        }

        if (torrent.torrent != null && torrent.torrent != "") {
            htmlVal += ' - <a href="https://anon.to/?http://extra.to/download/' + torrent.torrent + '" target="_blank">TORRENT</a></p>';
        }

        htmlVal += '<p class="description">INFO<br><br>';

        if (torrent.resolution != null && torrent.resolution != "") {
            htmlVal += 'RESOLUTION: ' + torrent.resolution + '<br>';
        }

        if (torrent.over_all_bitrate != null && torrent.over_all_bitrate != "") {
            htmlVal += 'OVER ALL BITRATE: ' + torrent.over_all_bitrate + '<br>';
        }

        if (torrent.bit_depth != null && torrent.bit_depth != "") {
            htmlVal += 'BIT DEPTH: ' + torrent.bit_depth + '<br>';
        }

        if (torrent.audio != null && torrent.audio != "") {
            htmlVal += 'AUDIO: ' + torrent.audio + '<br>';
        }

        if (torrent.size != null && torrent.size != "") {
            htmlVal += 'SIZE: ' + torrent.size + '<br>';
        }

        if (torrent.language != null && torrent.language != "") {
            htmlVal += 'LANGUAGE: ' + torrent.language + '<br>';
        }

        if (torrent.subtitles != null && torrent.subtitles != "") {
            htmlVal += 'SUBTITLES: ' + torrent.subtitles + '<br>';
        }

        if (torrent.source != null && torrent.source != "") {
            htmlVal += 'SOURCE: ' + torrent.source + '</p>';
        }

        if ( torrent.images != [] ){

            $.each(torrent.images, function (imageIndex, image) {

                if (imageIndex == 0) {
                    htmlVal += '<p>SCREENSHOTS<br><br>';
                }

                var imageNum = imageIndex+1;

                if (image != null && image != "") {
                     htmlVal += ' - <a href="https://anon.to/?' + image + '" target="_blank">IMAGE '+imageNum+'</a></br>';
                }

            });

        }
        htmlVal += '</p><p> --- </p>';

    });

    htmlVal += '</ul></br>';

    htmlVal += '<a href="#" onclick="loadContent(' + seriesIndex + ',\'' + val + '\')">';
    htmlVal += '<span class="tag">['+val+']</span>BACK<span></span>';
    htmlVal += '</a></div>';

    contentPage.append(htmlVal);

}