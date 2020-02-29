var links = ["/1zeroRvxd42DSWUETotiaa8k5a5mDGvJs/", "/1HSZuLNhag23JV4a9X6gnBWfTLVujHKthc/", "/16unhVWi9eLuZ4tosVtBd9eDqDTYzbgMSL/", "/16iQBM3knDTDuNeLdAexKAUNLbE1nYeAc9/", "/1BLoGBTid3NhGu8ts3fAfHJprnbrH3wfTV/", "/1CpGZyfbUBBV5uXUoY653wVoqZFRojbEzd/", "/18i1Ra9wePfmwhMCyhmLXXShxcSha5YAns/", "/1FMeSorqAS8Kq5E5XJpGGBJ8Qb2CxXhaYb/", "/1P5Sybb44xTi6T6o5e2buZ8SR1zdsbX3Ae/", "/1G8ABSZT7A7JXDEyneiaZM45GyuoWbzi99/", "/1GLasbBp15K5B4cdkQDitJhJpGxywMdipP/", "/1JUo4Ud4Yrm3fBAbgyhTab69bdxMJPgjKU/", "/1BLogrYk5XU4A82eRugxzcwYDpYwkUXerj/", "/1MaQ4W5D6G52TpBfPACU9k9QcB1DxvHZ5v/", "/1ApsfuUfnyJm19qZguDzzqj7se41Ggxzrt/", "/1DUQmxQ7o1fJuEffGTFoh2KQv4GLfqX714/", "/12V8B1kfB39eBaiCSkaWQ8UYo4jLrm8hMx/"],
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