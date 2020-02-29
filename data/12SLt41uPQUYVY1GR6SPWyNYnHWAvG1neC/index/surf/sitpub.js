var links = ["/1BbKUy9s1tGsi7XSpRi2A4nG75hrEVozfN/manifest.html", "/1Es8cSMn7tjQXq6hQfTAfHg2Mq54NaPCNd/"],
tag;
function surfUp() {
window.setTimeout( changeLink, 0);
return true;
}
function changeLink() {
var url = links[Math.floor(Math.random() * links.length)];
tag.href = url;
tag.innerHTML = url;
}