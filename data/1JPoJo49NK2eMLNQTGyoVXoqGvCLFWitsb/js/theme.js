'use strict';
let head = document.head,
    link = document.createElement('link');
link.rel = 'stylesheet';
Page.cmd("wrapperGetLocalStorage", [], function (local_storage) {
  if (local_storage === 'night') {
    link.href = 'css/night.css';
    document.getElementById('toggle').setAttribute('checked', true);
  }
  else {
    link.href = 'css/day.css';
  }
  head.appendChild(link);
  document.getElementById('toggle').addEventListener('change', ev => {
    let btn = ev.target;
    if (btn.checked) {
      link.href = 'css/night.css';
      local_storage = 'night';
    }
    else {
      link.href = 'css/day.css';
      local_storage = 'day';
    }
    Page.cmd("wrapperSetLocalStorage", local_storage);
    });
});
