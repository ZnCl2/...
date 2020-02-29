base.href = document.location.href.replace("/media", "").replace("index.html", "").replace(/[&?]wrapper=False/, "").replace(/[&?]wrapper_nonce=[A-Za-z0-9]+/, "");

function showHideMenu() {
    document.body.classList.toggle("showmenu");
    console.log("toggled menu");
}

function closeVideo() {
    document.getElementById('videoplayer').innerHTML = "";
}
