$(document).ready(function()
{
   $("a[href*='#about']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_about').offset().top }, 600, 'linear');
   });
   $("a[href*='#services']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_services').offset().top }, 600, 'linear');
   });
   $("a[href*='#top']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_top').offset().top }, 600, 'linear');
   });
   $("a[href*='#contact']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_contact').offset().top }, 600, 'linear');
   });
   $("a[href*='#portfolio']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_portfolio').offset().top }, 600, 'linear');
   });
   $("#wb_CssMenu1").affix({offset:{top: $("#wb_CssMenu1").offset().top}});
});
