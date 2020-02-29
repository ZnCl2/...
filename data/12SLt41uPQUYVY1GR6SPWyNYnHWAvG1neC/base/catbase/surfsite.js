// Случайный сайт

var links = ["/13iJB1vWU6tdMkwmWtybpH6nHvYdmfEQ9x/", "/1NU7fYcfJ1YoPHBYsiFEY3Zd6ZFyJng4oP/", "/19NTsC5seR14WDjfH4GPpCLeP49Rraf6UT/", "/16aw823Ct6qqkFFDykDCKWs7QrGR1Cgzzh/"],
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
