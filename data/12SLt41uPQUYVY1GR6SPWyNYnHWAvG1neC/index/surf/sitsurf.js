var links = ["/1Q9LVNLD1ghusGxpiwjYnVjPsxD5xGTGc7/", "/1BbKUy9s1tGsi7XSpRi2A4nG75hrEVozfN/", "/1Es8cSMn7tjQXq6hQfTAfHg2Mq54NaPCNd/", "/1B3azCFYNPkkbCtczGUGMrxBWX6yEMJEbd/index.html", "/Zaphods.bit/"],
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