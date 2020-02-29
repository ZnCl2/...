$('#bg').on('click',function(){$('.window.active').removeClass('active');});

var mydragg = function(){
    return {
        move : function(divid,xpos,ypos){
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving : function(divid,container,evt){
            $('.window.active').removeClass('active');
            divid.className+=' active';
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
            divTop = divid.style.top,
            divLeft = divid.style.left,
    		eWi = parseInt(divid.style.width),
    		eHe = parseInt(divid.style.height),
    		cWi = parseInt(document.getElementById(container).style.width),
    		cHe = parseInt(document.getElementById(container).style.height);
    		if(posY<parseInt('0'+divTop.replace('px',''))+30){
        		document.getElementById(container).style.cursor='move';
                divTop = divTop.replace('px','');
                divLeft = divLeft.replace('px','');
                var diffX = posX - divLeft,
                    diffY = posY - divTop;
                document.onmousemove = function(evt){
                    evt = evt || window.event;
                    var posX = evt.clientX,
                        posY = evt.clientY,
                        aX = posX - diffX,
                        aY = posY - diffY;
        				if (aX < 0) aX = 0;
        				if (aY < 0) aY = 0;
        				if (aX + eWi > cWi) aX = cWi - eWi;
        				if (aY + eHe > cHe) aY = cHe -eHe;
                    mydragg.move(divid,aX,aY);
                }
    		}
        },
        stopMoving : function(container){
            var a = document.createElement('script');
    		document.getElementById(container).style.cursor='default';
            document.onmousemove = function(){}
        },
    }
}();

function allowDrop(ev,el) {
    if(!$.trim($(el).html())){
        ev.preventDefault();
    }
}

function drag(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function nine8alert(event,msg){
    let box=document.createElement('div');
    $('.window.active').removeClass('active');
    box.setAttribute('class','window active');
    box.setAttribute('onmousedown','mydragg.startMoving(this,"windows",event);');
    box.setAttribute('onmouseup','mydragg.stopMoving("windows");');
    $(box).css({'top':event.pageY+'px','left':(event.pageX-120)+'px'});
    let tbar=document.createElement('div');
    tbar.setAttribute('class','titlebar');
    tbar.innerHTML='Alert<a class="button-close" onclick="nine8alertclose(this);return false;"></a>';
    let bod=document.createElement('p');
    bod.innerHTML=msg;
    
    box.appendChild(tbar);
    box.appendChild(bod);
    document.getElementById('windows').appendChild(box);
}
function nine8alertclose(el){
    $(el).parent().parent().remove();
}