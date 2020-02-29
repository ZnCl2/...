/*Copyright (c) 2017 Kevin Froman Https://ChaosWebs.net/. MIT License */

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


$('#scan').click(function(){
  $('#output').html('');
  $('#output').append('<h2>Scan Results:</h2>');
  document.location.href = '#output';
  var sites = ['1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D/css/all.css', '1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F/css/all.css', 'Talk.ZeroNetwork.bit/css/all.css', 'Blog.ZeroNetwork.bit/css/all.css', 'zeroid.bit/css/all.css', 'Mail.ZeroNetwork.bit/css/all.css', '12MVkvYGcRW6u2NYbpfwVad1oQeyG4s9Er/assets/lib/bootstrap/css/bootstrap.min.css', 'Me.ZeroNetwork.bit/css/all.css', 'hub.kaffie.bit/css/all.css', 'Board.ZeroNetwork.bit/css/all.css', '1Gif7PqWTzVWDQ42Mo7np3zXmGAo3DXc7h/css/all.css', 'Sites.ZeroNetwork.bit/css/all.css', '1CHAoSM19s4nwGjvpiyVGyvpHZQCzDR84M/theme.css'];

sites.forEach(function test(x){
if (x.endsWith('.css')){

}
})

/*
  sites.forEach(function testt(x){
    var jqxhr = $.ajax( "http://127.0.0.1:43110/raw/" + x, {timeout: 1500, cache: false} )
      .done(function() {
        console.log( "success: " + x);
        $('#output').append('<li><a href="http://127.0.0.1:43110/' + x.substring(0, x.indexOf('/')) + '">' + x.substring(0, x.indexOf('/')) + '</a>: <span style="color: green;">Present in Client</span></li>');
      })
      .fail(function() {
        console.log( "error " + x);
        $('#output').append('<li><a href="http://127.0.0.1:43110/' + x.substring(0, x.indexOf('/')) + '">' + x.substring(0, x.indexOf('/')) + '</a>: <span style="color: red;">Not present/failed to load</span></li>');

      })
  });
*/

});
