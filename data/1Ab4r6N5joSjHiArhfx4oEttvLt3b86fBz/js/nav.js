var nav = document.getElementById("navig");

var btn = [];
btn[0] = "<a href='index.html'>Home</a>";
btn[1] = "<a href='blog.html'>Blog</a>";
btn[2] = "Link2";
btn[3] = "Link3";
btn[4] = "Link4";
btn[5] = "Link5";


for (i = 0; i < btn.length; i++) {
 
    var newbtn = document.createElement('div');
    newbtn.classList.add('nav-btn');
    newbtn.innerHTML = btn[i];
    
    nav.appendChild(newbtn);
    
}

