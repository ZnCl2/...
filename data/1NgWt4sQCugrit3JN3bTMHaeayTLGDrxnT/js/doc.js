// ==============================================
// Copyright 2003 by jsCode.com
// Source: jsCode.com
// Author: etLux
// Free for all; but please leave in the header.
// ==============================================

// Set up the image files to be used.
var theImages = new Array() // do not change this
// To add more image files, continue with the
// pattern below, adding to the array. Rememeber
// to increment the theImages[x] index!

theImages[0] = 'images/boxers_of_america.png'
theImages[1] = 'images/moo_XD.png'

// ======================================
// do not change anything below this line
// ======================================

var j = 0
var p = theImages.length;

var preBuffer = new Array()
for (i = 0; i < p; i++){
   preBuffer[i] = new Image()
   preBuffer[i].src = theImages[i]
}

var whichImage = Math.round(Math.random()*(p-1));
function showImage(){
document.write('<img src="'+theImages[whichImage]+'">');
}

$(document).ready(function () {
    $(".doc_comic").on("click", function (e) {


        var target = $(this).attr("href");
        $(target).show();
        $(".comic_parent").not(target).hide();
        e.preventDefault();
    });
});