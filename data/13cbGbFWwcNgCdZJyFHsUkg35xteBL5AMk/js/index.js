let progress = 0;

function loadPage(num) {
    document.getElementById("page").innerHTML = pages[num];
    document.getElementById("pagenum").innerHTML = (num + 1) + "/" + pages.length
}
document.getElementById("author").innerHTML = author;
document.getElementById("title").innerHTML = title;
loadPage(progress)

function toIndex() {
   loadPage(0)
}

function previous() {
    if (progress == 0) {
        progress = pages.length - 1
        loadPage(progress);
    } else {
        progress = progress - 1
        loadPage(progress);
    }
}

function next() {
    if (progress == pages.length - 1) {
        progress = 0
        loadPage(progress);
    } else {
        progress++
        loadPage(progress);
    }
    
}