let desktop = document.getElementById('bg');

function processData(projects) {
  let arr = projects;
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];

    let data = document.createElement('div');
    data.setAttribute('ondrop',"drop(event);");
    data.setAttribute('ondragover',"allowDrop(event,this);");
    data.innerHTML="\
      <a class=\"icon\" href=\""+item.url+"\" id=\""+item.name+"\" target=\""+item.frame+"\" onclick=\"open"+item.frame+"(this);\" draggable=\"true\" ondragstart=\"drag(event)\">\
        <img src=\""+item.icon+"\" draggable=\"false\" width=\"48\" height=\"48\">\
  			<br><span>"+item.name+"</span>\
      </a>";
    desktop.appendChild(data);
	}
	for (var i=0;i<160-arr.length-1;i++){
    let data = document.createElement('div');
    data.setAttribute('ondrop',"drop(event);");
    data.setAttribute('ondragover',"allowDrop(event,this);");
    desktop.appendChild(data);
	}
}

function openIE(e) {
  $('.window.active').removeClass('active');
  $('#IE').removeClass('hidden');
	$('#IE').addClass('active');
	document.getElementById('IEtab').href = e.href;
	document.getElementById('IEtitle').textContent = e.id;
}
function closeIE() {
	document.getElementById('IE').className = 'IE window hidden';
}

function openwin32(e) {
  $('.window.active').removeClass('active');
  $('#win32').removeClass('hidden');
	$('#win32').addClass('active');
	document.getElementById('win32title').textContent = e.id;
	resize(document.getElementById('win32frame'));
}
function closewin32() {
	document.getElementById('win32').className = 'win32 window hidden';
}

function resize(frame) {
  var b = frame.contentWindow.document.body || frame.contentDocument.body,
    cHeight = $(b).height();

  if( frame.oHeight !== cHeight ) {
    $(frame).height( 0 );
    frame.style.height = 0;

    $(frame).height( cHeight );
    frame.style.height = cHeight + "px";

    frame.oHeight = cHeight;
  }
  if( frame.oWidth !== cWidth ) {
    $(frame).width( 0 );
    frame.style.width = 0;

    $(frame).width( cWidth);
    frame.style.width = cWidth + "px";

    frame.oHeight = cHeight;
    frame.oWidth = cWidth;
  }

  // Call again to check whether the content height has changed.
  if(frame.offsetParent !== null) setTimeout( function() { resize( frame ); }, 250 );
}

let xhttp = new XMLHttpRequest();
xhttp.addEventListener('readystatechange', checkState);

function checkState() {
  if (this.readyState == 4 && this.status == 200) {
    processData(JSON.parse(xhttp.responseText));
  }
}
xhttp.open("GET", "js/items.json", true);
xhttp.send();