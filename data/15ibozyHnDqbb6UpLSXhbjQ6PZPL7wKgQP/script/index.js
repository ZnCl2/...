//更具ID获取DOM
function $$(id) {
    return document.getElementById(id);
}

//百度分享
(function () {
    var body = document.body;
    var s1 = document.createElement("SCRIPT");
    s1.id = 'bdshare_js';
    s1.setAttribute('data', 'type=tools');
    var s2 = document.createElement("SCRIPT");
    s2.id = 'bdshell_js';
    body.appendChild(s1);
    body.appendChild(s2);
    document.getElementById("bdshare").innerHTML = '<a class="bds_qzone"></a><a class="bds_tsina"></a><a class="bds_tqq"></a><a class="bds_renren"></a><span class="bds_more">更多</span><a class="shareCount"></a>';
    s2.src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
})();

//复制功能
(function () {
    ZeroClipboard.config( { moviePath: '../plugins/ZeroClipboard/ZeroClipboard.swf' } );
    function success(opacity) {
        div.style.display = 'block';
        var opacity = opacity - 0.1;
        div.style.opacity = opacity;
        div.style.filter = 'alpha(opacity='+opacity*100+');';
        if (opacity >= 0) {
            setTimeout(function () {
                success(opacity);
            }, 100);
        } else {
            div.style.display = 'none';
        }
    }

    //创建复制成功DIV
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.className = 'mod-copy';
    div.innerHTML = '复制成功';
    body.appendChild(div);

    var obj = document.getElementById('panels').getElementsByTagName('p');
    var text=document.getElementById('text');
    var clip = new ZeroClipboard(obj);
    clip.on('complete', function (e,args) {
        success(1);
    });
    clip.on('mouseover',function(){
        if(this.parentNode){
            this.parentNode.style.background = '#c8e8fd';    
        }
    });
    clip.on('mouseout',function(){
        if(this.parentNode){
            this.parentNode.style.background = '';
        }
    });
    for (var i = 0, len = obj.length; i < len; i++) {
        obj[i].setAttribute('data-clipboard-target', 'content' + i);
        obj[i].setAttribute('id', 'content' + i);
        if(window.clipboardData){
            window.clipboardData.clearData();
            document.getElementById('content' + i).onclick = function(){
                window.clipboardData.setData('text',this.innerHTML);
                success(1);
            };
        }
    }

    //复制网址
    var copy = new ZeroClipboard(document.getElementById("clip_button"));
    document.getElementById("fe_text").value = location.href;
    copy.on('dataRequested', function (client, args) {
        copy.setText(location.href);
        success(1);
    }); 

    if(window.clipboardData){
        window.clipboardData.clearData();
        var copyBtn = document.getElementById("clip_button");
        copyBtn.onclick = function(){
            window.clipboardData.setData('text',location.href); 
            success(1);
        }
    }

})();

//图片切换
(function(){
    var o=$$('download');
    if(o){
        var img=o.getElementsByTagName('img')[0];
        o.onmouseover=function(){
            img.src='/image/download_h.png'
        }
        o.onmouseout=function(){
            img.src='/image/download.png'
        }
    }
})();