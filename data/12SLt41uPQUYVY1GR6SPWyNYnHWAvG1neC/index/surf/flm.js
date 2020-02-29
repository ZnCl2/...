var links = ["/1kino8s8jT8TfbW1kSMoNL4sqqu6kut28/?Video=1532276122_1DDrZXzLsyuk2zrdwd3eQWUP7eypt6L5tQ", "/1kino8s8jT8TfbW1kSMoNL4sqqu6kut28/?Video=1532284537_1PDgHdqhvPyVZrhVAumHcWp5pr4wPckcc6"],
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