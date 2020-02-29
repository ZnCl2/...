var btns=document.querySelectorAll('.copybtn');for(var i=0;i<btns.length;i++){btns[i].addEventListener('mouseleave',function(e){e.currentTarget.setAttribute('class','copybtn');e.currentTarget.removeAttribute('aria-label');});}
var btns=document.querySelectorAll('.minibtn');for(var i=0;i<btns.length;i++){btns[i].addEventListener('mouseleave',function(e){e.currentTarget.setAttribute('class','minibtn');e.currentTarget.removeAttribute('aria-label');});}
function showTooltip(elem,msg){elem.setAttribute('class','tooltipped tooltipped-s');elem.setAttribute('aria-label',msg);}
function fallbackMessage(action){var actionMsg='';var actionKey=(action==='cut'?'X':'C');if(/iPhone|iPad/i.test(navigator.userAgent)){actionMsg='No support :(';}
else if(/Mac/i.test(navigator.userAgent)){actionMsg='Press ⌘-'+ actionKey+' to '+ action;}
else{actionMsg='Press Ctrl-'+ actionKey+' to '+ action;}
return actionMsg;}
