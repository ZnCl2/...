var net_name;//string type "ZeroNet"; "TOR"; "file"; "other"
var current_page;//current page file name without extension
var zeronet_address;
var forum_address;
var tor_address;
var freenet_address;
var bool_write_comment_zeronet;
var art_comment_address;
var use_tor;//boolean to show tor address or not

function write_forum_board(){
if (bool_write_forum_board==1){
	var line1="<img src='img/zeronet_small.png' class='forum_img1'><img src='img/zeronet_small.png' class='forum_img2'>";
	line1=line1+"<a href='"+forum_address+"'>forum on zeronet</a>";
	document.getElementById('board_forum').innerHTML=line1;
}
}

function write_art_comment_link(){
if (net_name=="ZeroNet"){
if (bool_write_comment_zeronet==1){
	if (bool_write_comment_zeronet==1){
	var line1;
	line1="<div  class='l_forum'><a href='"+forum_address+art_comment_address+"'><img src='../img/write.png'> write comment...</a></div><hr>";
	document.getElementById('art_comment_link').innerHTML=line1;
	document.getElementById('art_comment_link_bottom').innerHTML=line1;
	}
}
}
}

function write_comment_link(){
if (net_name=="ZeroNet"){
	if (bool_write_comment_zeronet==1){
	var line1;
	line1="<div  class='l_forum'><a href='"+forum_address+"?Topic:1546075098_19s3iztHV7i3fBN9wyiMhiXECoZvyNjLhr/Shared+links'><img src='img/write.png'> write comment...</a></div><hr>"
	document.getElementById('comment_link').innerHTML=line1;
	}
}
}

function write_footer1(){
if (net_name=="ZeroNet"){
document.getElementById('board_footer1').innerHTML="";
}
}

function write_sticker1(){
var line1;

if (net_name=="ZeroNet"){
line1="<img src='img/pin.jpg'>";
if (use_tor==true){
	line1=line1+"Site on TOR: <a href='";
	line1=line1+tor_address+"'>(link)</a><br>";
}
line1=line1+"Address on Freenet: <a href='";
line1=line1+freenet_address+"'>(link)</a><br>";
document.getElementById('board_sticker1').innerHTML=line1;
}
if (net_name=="file"){
line1="<img src='img/pin.jpg'>";
if (use_tor==true){
	line1=line1+"Address on TOR: <a href='";
	line1=line1+tor_address+"'>(link)</a><br>";
}
line1=line1+"ZeroNet address: <a href='";
line1=line1+zeronet_address;
line1=line1+"'>(link)</a><br>";
line1=line1+"Address on Freenet: <a href='";
line1=line1+freenet_address+"'>(link)</a><br>";
document.getElementById('board_sticker1').innerHTML=line1;
}
if (net_name=="TOR"){
line1="<img src='img/pin.jpg'>";
line1=line1+"Address on Freenet: <a href='";
line1=line1+freenet_address+"'>(link)</a><br>";
line1=line1+"ZeroNet address: <a href='";
line1=line1+zeronet_address;
line1=line1+"'>(link)</a>";
document.getElementById('board_sticker1').innerHTML=line1;
}
}

function js_initiation(){
use_tor=true;
zeronet_address="http://127.0.0.1:43110/1P7pSTTcqp9hghyLNuRLxQMeojjv2uTvuz/";
forum_address="http://127.0.0.1:43110/19PQhGu5QbyrH5EpfmqWaRAXciA6HAsb57/";
tor_address="http://ht4y6rvjwvdjaygs4t5brflbrkfh6iakzxcn7ilrtx4j367lsalhl5qd.onion/";
freenet_address="http://127.0.0.1:8888/USK@YNXb3jnhfNYW7I8WxrAGIhOT2hZz7HTUjDHyKhgTSZ4,g2kZ3Ky~ayXEqhWKFKaNJjKmjrhtkBYjSkFZe6p5Geo,AQACAAE/rpwc/33/"
bool_write_comment_zeronet=1;
//bool_block_comment_notzeronet=1;//if comment allowed, limit it allowing only on zeronet
bool_write_forum_board=1;
}

function get_net_name() {
net_name="0";
var zeronet_sign=0, tor_sign=0, file_sign=0;
var site_address=document.URL;
var site_address_length=site_address.length;
var first_slash=site_address.indexOf("/");
var zeronetpos = site_address.indexOf("http://127.0.0.1:43110/");
if (zeronetpos==0) zeronet_sign=1;
var point_pos = site_address.indexOf(".");
var http_pos = site_address.indexOf("http://");
var onion_pos = site_address.indexOf(".onion");
var first_slash_pos = site_address.indexOf("/");
if ((point_pos==onion_pos) && (point_pos>1) && (http_pos==0)) tor_sign=1;
var file_pos = site_address.indexOf("file:");
if (file_pos==0) file_sign=1;
var signs=0;
if (zeronet_sign==1){ signs++; net_name="ZeroNet";}
if (tor_sign==1){ signs++;  net_name="TOR";}
if (file_sign==1){ signs++; net_name="file";}
if (signs!=1) net_name="other";
}

function form_menu() {
var current_page_found=0;
var site_address=document.URL;
var last_point_pos = site_address.lastIndexOf(".");
var site_address_length=site_address.length;
var last_slash=site_address.lastIndexOf("/");
var filename="*0";
if ((last_slash<last_point_pos) && (last_slash>0) && (last_point_pos>0)){
	filename=site_address.substring(last_slash+1,last_point_pos);
}else{
	if (last_slash>last_point_pos) filename="*1";
}
switch (filename){
case "*1":
	document.getElementById('blog').style.background="brown";
	break;
case "index":
	document.getElementById('blog').style.background="brown";
	break;
case "links":
	document.getElementById('links').style.background="brown";
	break;
case "contacts":
	document.getElementById('contacts').style.background="brown";
	break;
case "support":
	document.getElementById('support').style.background="brown";
	break;
case "about":
	document.getElementById('about').style.background="brown";
	break;
}


}
