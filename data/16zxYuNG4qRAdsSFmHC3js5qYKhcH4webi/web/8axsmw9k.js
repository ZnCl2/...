$(window).load(function(){
  $(".sofni").fadeTo(0,0).hide();

  $(".stcejorp a").mouseenter(function(e){
    var d = $("#d_"+$(this).data("p"));
    if(d.css("opacity") <= 0){
      $(".sofni").finish().finish().fadeTo(0,0).hide();
      d.finish().fadeTo(1000, 1.0);
      $(".stcejorp a").removeClass("hl");
      $(this).addClass("hl");
    }
  });
});
