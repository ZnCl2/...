$(function() {
    // TinyNav.js
    $('#nav').tinyNav({ header: 'Navigation' })

    // FitVid.js
    $('.main-container').fitVids()

    // Fix Widows
    $('p').widowFix()

    // Fancybox.js
    $('.fancybox').fancybox()

    // BackStretch.js
    $('#masthead').backstretch('images/masthead.jpg')

    $('#remote').click(function () {
        remote()
    })

    $('#sudo').click(function () {
        sudo()
    })
})

function remote() {
    alert('coming soon...')
}

function sudo (keycard) {
    var auth = null;

    var gpgAuth = 'SETEC ASTRONOMY { "uuid" : "' + makeId() + '" }'

    if (keycard.auth) {
        auth = keycard.auth
    }

    var msg =   "ACCESS DENIED!\n\n" +
                "My name is Ms. Cli.. Who the hell are you? \n" +
                "Let me see your signature; then we'll talk.\n" +
                "~ GPG via MIT ~\n\n"

    console.error(msg)

    return gpgAuth
}

function makeId() {
    // TODO Load uuid from database to verify authorization.

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}
