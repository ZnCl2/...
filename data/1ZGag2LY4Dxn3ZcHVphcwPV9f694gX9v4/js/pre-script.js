base.href = document.location.href.replace("/media", "").replace("index.html", "").replace(/[&?]wrapper=False/, "").replace(/[&?]wrapper_nonce=[A-Za-z0-9]+/, "")

function toggleNight () {
    document.getElementsByTagName("body")[0].classList.toggle("night");
}