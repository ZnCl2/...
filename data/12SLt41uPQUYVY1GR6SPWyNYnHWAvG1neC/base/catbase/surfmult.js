// Случайный мультфильм

var links = ["//127.0.0.1:43110/big.kopykate.bit/?Video=1524922707_17yxw1nenctXqn6BaoR5zx6M1QJSijsoMY"],
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
