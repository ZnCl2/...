var collection = '';
var loadvideo = '';

function videolookup(hash) {

    console.log('Looking up video with hash: ' + hash);

    switch (hash) {
        case '':
            var videoinfo = [
                "Black Bullet - Ep01", //title
                "", //video ipfs hash
                "", //poster ipfs hash
                "",
                "", //previous video hash (if nothing don't show button)
                "" //next video hash (if nothing don't show button)
            ];
            break;
        default:
            console.log('Didn\'t find video in switch array');
            return;
            break;
    }
    drawhash(videoinfo);


}