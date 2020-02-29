var sites = document.getElementById("banners");

var li = [];
li[0] = "<a href='http://127.0.0.1:43110/1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D/'>ZeroHello</a>";
li[1] = "<a href='http://127.0.0.1:43110/Blog.ZeroNetwork.bit/'>ZeroBlog</a>";
li[2] = "<a href='http://127.0.0.1:43110/186THqMWuptrZxq1rxzpguAivK3Bs6z84o/'>0list</a>";
li[3] = "<a href='http://127.0.0.1:43110/1PLAYgDQboKojowD3kwdb3CtWmWaokXvfp/'>Play</a>";
li[4] = "<a href='http://127.0.0.1:43110/1Mr5rX9TauvaGReB4RjCaE6D37FJQaY5Ba/'>Kaffeine Search</a>";
li[5] = "<a href='http://127.0.0.1:43110/Sites.ZeroNetwork.bit/'>ZeroSites</a>";

for (i = 0; i < li.length; i++) {
 
    var newbtn = document.createElement('div');
    newbtn.innerHTML = li[i];
    
    sites.appendChild(newbtn);
    
}
 
