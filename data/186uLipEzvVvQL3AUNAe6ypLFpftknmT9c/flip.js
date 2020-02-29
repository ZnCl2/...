/*
I'm foo at ZeroMail
*/
var flip = Math.random();
if (flip > 0.5) {
    document.getElementById("content").innerHTML = "Heads";
} else {
    document.getElementById("content").innerHTML = "Tails";
}
var out = document.getElementById("content");
flipper.addEventListener("click", function () {
    out.innerHTML = "&nbsp;";
    var flip = Math.random();
    setTimeout(function () {
        if (flip > 0.5) {
            out.innerHTML = "Heads";
        } else {
            out.innerHTML = "Tails";
        }
    }, 30);
});
