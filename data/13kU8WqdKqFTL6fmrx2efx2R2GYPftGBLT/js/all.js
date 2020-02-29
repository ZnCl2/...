

window.addEventListener("load", function () {
  function sendData() {
    var $ = new XMLHttpRequest();
		var auth_key=document.getElementById("auth_key");
		var body=document.getElementById("body");
    var data="";
    // We define what will happen if the data are successfully sent
    $.addEventListener("load", function(event) {
      alert(event.target.responseText);
    });
    // We define what will happen if case of error
    $.addEventListener("error", function(event) {
      alert('Oups! Something goes wrong.');
    });
    // We setup our request
    $.open("POST", "https://zeroid.qc.to/ZeroBoard/add.php");
    $.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    // The data send are the one the user provide in the form
    data='body='+body.value+'&'+'auth_key='+auth_key.value+'&hash=sha512'
    $.send(data);
  }
  // We need to access the form element
  var $$ = document.getElementById("myForm");
  // to takeover its submit event.
  $$.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});