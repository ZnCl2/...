// Случайный клип

var links = ["/1uPLoaDwKzP6MCGoVzw48r4pxawRBdmQc/data/users/1GooUE19488nDwG3TdkM8seYAHct4gjkq4/Marko%20Vozelj%20%20Mojstri%20-%20Le%20en%20centimeter.mp4", "/1uPLoaDwKzP6MCGoVzw48r4pxawRBdmQc/data/users/1GooUE19488nDwG3TdkM8seYAHct4gjkq4/Tropico%20Band%20Feat.%20Mirza%20Soljanin%20-%20Sarajevo%20-%20Beograd%20-%20(Official%20Video%202015.)HD.mp4", "/1uPLoaDwKzP6MCGoVzw48r4pxawRBdmQc/data/users/1GooUE19488nDwG3TdkM8seYAHct4gjkq4/Jelena%20Tomasevic%20-%20Panta%20rei.mp4", "/1uPLoaDwKzP6MCGoVzw48r4pxawRBdmQc/data/users/1GooUE19488nDwG3TdkM8seYAHct4gjkq4/Exaited%20%20Maciej%20Smoliski%20-%20Zakochaj%20si%20we%20mnieOficjalny%20Teledysk%202015%20.mp4"],
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
