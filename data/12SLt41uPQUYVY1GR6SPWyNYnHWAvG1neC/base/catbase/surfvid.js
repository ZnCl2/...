// Случайное видео

var links = ["/13iJB1vWU6tdMkwmWtybpH6nHvYdmfEQ9x/pub/media/video1.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1603891828-starthree.mp4", "/19NTsC5seR14WDjfH4GPpCLeP49Rraf6UT/pub/2020/startwo/startwo.mp4", "/19NTsC5seR14WDjfH4GPpCLeP49Rraf6UT/pub/2019/startone/startone3.mp4", "/19NTsC5seR14WDjfH4GPpCLeP49Rraf6UT/pub/2019/startone/startone1.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1603891326-fsb.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1603890248-oneweb_works.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1614250232-starlink_mission_8.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1613282734-satellite2020.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1613096841-gmn_starlink.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/rms_es0002_starlink.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1612947267-startwo_starlink.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1612862343-starmission.mp4", "/1CiXRY9ATZSoZqBzwMfXEMsKtPRt2aQoF2/data/users/1CTXZrGJQiFjTappyJ3dJpuyb7Wecw7iSp/1612750746-paz.mp4"],
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
