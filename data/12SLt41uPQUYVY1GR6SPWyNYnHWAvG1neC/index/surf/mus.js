var links = ["/1GLasbBp15K5B4cdkQDitJhJpGxywMdipP/?Post:2", "/1GLasbBp15K5B4cdkQDitJhJpGxywMdipP/?Post:3"],
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