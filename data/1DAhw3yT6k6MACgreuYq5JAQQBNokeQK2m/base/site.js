var item = new Array();
c=0; item[c]=new Array("","","","","");
// PutinProvod.bit
c++; item[c]=new Array("","site/putin_provod/provody.html","Проводы в места не столь отдалённые","","/1Es8cSMn7tjQXq6hQfTAfHg2Mq54NaPCNd/<br><tt>PutinProvod.bit</tt>");
// Cipher Dogs
c++; item[c]=new Array("","site/cipher_dogs/manifest.html","Cipher Dogs. Manifest","","/1BbKUy9s1tGsi7XSpRi2A4nG75hrEVozfN/manifest.html<br><tt>2018 | Cipher Dogs (Asocio) | asocio@</tt>");

page="<html><head><link rel='stylesheet' href='css/global.css'><title>Архив сайтов</title></head><body><header><a href='index.html'><img src='img/logo.png' width='55'></a><br>ChronCache</header><nav><hr><p><a href='site.html'>&#8592; назад</a> <tt>|</tt> резервные страницы:</p><hr></nav><br><div>";
function search(frm) {
win = window.open("","_self","scrollbars");
win.document.write(page);
txt = frm.srchval.value.toLowerCase().split(" ");
fnd = new Array(); total=0;
for (i = 0; i < item.length; i++) {
fnd[i] = 0; order = new Array(0, 4, 2, 3);
for (j = 0; j < order.length; j++)
for (k = 0; k < txt.length; k++)
if (item[i][order[j]].toLowerCase().indexOf(txt[k]) > -1 && txt[k] != "")
fnd[i] += (j+1);
}
for (i = 0; i < fnd.length; i++) {
n = 0; w = -1;
for (j = 0;j < fnd.length; j++)
if (fnd[j] > n) { n = fnd[j]; w = j; };
if (w > -1) total += show(w, win, n);
fnd[w] = 0;
}
win.document.write("</div><p style='text-align:center;margin:1em'>Найдено страниц: "+total+"</p></body></html>");
win.document.close();
}
function show(which,wind,num) {
link = item[which][1] + item[which][0]; 
line = "<div class='linkbox'><a href='"+link+"'>"+item[which][2]+"</a> <span style='display:none'>"+num+"</span><br>";
line += item[which][4] + "<br><span style='display:none'>"+link+"</span></div>";
wind.document.write(line);
return 1;
}
