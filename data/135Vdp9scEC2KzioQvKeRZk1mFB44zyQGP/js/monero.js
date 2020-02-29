$(function () {
  $(".monero").hide();
  $(".monero-close").bind("click", function () {
    $(".monero").hide(100);        

    if ($(this).attr("class") == "monero-close")
    {
      $(".monero-open").show();
    }
  });
});

$(".monero-open").bind("click", function () {
    $(".monero").show(100);        
    if ($(this).attr("class") == "monero-open")
    {
      $(".monero-open").hide();
    }
  });