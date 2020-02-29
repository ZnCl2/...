function randi(a, b){
  return Math.round(Math.random()*(b-a)+a);
}

var imgs = []
function preloadImgs(list)
{
  for(var i = 0; i < list.length; i++){
    var img = new Image();
    img.src = list[i];
    imgs.push(img);
  }
}

preloadImgs([
    "ccircle.png",
    "su_logo.png"
    ]);

$(document).ready(function(){
  $("#logo").hide();
});

$(window).load(function(){
  /* COMMON */

  var logo = $("#logo");
  logo.show();
  var circles = $("#circles");
  circles.fadeTo(0, 0);
  circles.fadeTo(2000, 1.0);
  
  //build circles
  var cs = [];
  var factor = 1.0;
  var size = Math.min(circles.width(),circles.height());
  for(var i = 0; i < 4; i++){
    var c = document.createElement("img");
    c.src = "ccircle.png";
    c.width = size*factor;
    c.height = size*factor;
    c.style.position = "absolute";
    c.style.left = (circles.width()/2-c.width/2)+"px";
    c.style.top = (circles.height()/2-c.height/2)+"px";
    c.rotspeed = randi(10,25)*(i%2==0?1:-1);
    c.angle = randi(0,180)*(randi(0,1)==0?-1:1);
    c.style.zIndex = (i%2==0?3:1);
    circles.append($(c));
    cs.push(c);
    factor *= 0.75;
  }

  function replace(){
    if(circles.css("position") != "fixed"){
      logo.css("left",(circles.width()/2-logo.width()/2)+"px");
      logo.css("top",(circles.height()/2-logo.height()/2)+"px");

      for(var i = 0; i < cs.length; i++){
        var c = cs[i];
        c.style.left = (circles.width()/2-c.width/2)+"px";
        c.style.top = (circles.height()/2-c.height/2)+"px";
      }
    }
  }

  replace();
  $(window).resize(replace);

  //start animation
  setInterval(function(){
    for(var i = 0; i < cs.length; i++){
      var c = cs[i];
      c.angle += c.rotspeed*0.04;
      c.style.transform = "rotate("+c.angle+"deg)";
    }
  }, 40);

  //add menu events
  $("#menu a").each(function(index){
    var mlink = $(cs[index%cs.length]);
    $(this).mouseenter(function(){
      mlink.finish().fadeTo(1000,0.0);
    });
    $(this).mouseout(function(){
      mlink.finish().fadeTo(1000,1.0);
    });
  });

  /* SCREENSHOTS */
  var vshot = $("#vshot");
  var mvshot = $("#mvshot");
  var mask = $("#mask");

  var freg = /screenshots\/m_(.+)\.([a-zA-Z]+)/;
  function fregr(match, file, ext, offset, string){
    return "screenshots/"+file+"."+ext;
  }

  vshot.click(function(){
    //max size image view
    mvshot.attr("src",vshot.attr("src"));
    mvshot.fadeIn(500);
    mask.fadeTo(800,0.8);

    circles.css("position","fixed");
    //keep circles and logo on if possible
    if(mvshot.offset().top >= circles.offset().top+circles.height()/2.0){
      circles.css("zIndex","100");
      $("#logospace").show();
    }
    else
      circles.css("position","relative");
  });

  function closeshot(){
    if(mvshot.css("display") != "none"){
      mvshot.fadeOut(200);
      //replace logo
      $("#logospace").hide();
      circles.css("position","relative");
      mask.finish().fadeOut(350, function(){
        circles.css("zIndex","0");
      });
    }
  }

  mvshot.click(closeshot);
  mask.click(closeshot);

  //set screenshots indexes
  var nshots = 0;
  $(".shot").each(function(i){
    this.screenindex = i;
    nshots++;
  });

  var current_shot = 0;
  var shot_interval = 0;

  vshot.load(function(){
    vshot.fadeTo(500,1.0);
  });

  $(".shot").click(function(){
    //preview image
    var shot = $(this);
    var path = shot.attr("src").replace(freg, fregr);

    //disable reclick
    if(path != vshot.attr("src")){
      vshot.finish();
      $(".shot").fadeTo(200,0.4);
      current_shot = this.screenindex;
      shot.finish().fadeTo(200,1.0);
      vshot.fadeTo(200,0.0001, function(){
        vshot.attr("src",path);
      });

      //interval
      clearInterval(shot_interval);
      shot_interval = setInterval(function(){
        if($("#mvshot").css("display") == "none")
          $($(".shot").get((current_shot+1)%nshots)).trigger("click");
      }, 7500);
    }
  });

  $($(".shot").get(0)).trigger("click");

  /* VIDEOS */
  var mvideo = $("#mvideo");
  var vreg = /.*\/vi\/(.*)\/default\.jpg.*/;
  function vregr(match, vid, offset, string){
    return "https://www.youtube.com/embed/"+vid;
  }

  $(".video").click(function(){
    //pop video view
    var url = $(this).find("img").attr("src").replace(vreg,vregr);
    $(".video").removeClass("active");
    $(this).addClass("active");
    mvideo.attr("src",url);
  });

  mvideo.load(function(){
    if(mvideo.attr("src") != "black.html"){
      mvideo.fadeIn(500);
      mask.fadeTo(800,0.8);

      circles.css("position","fixed");
      //keep circles and logo on if possible
      if(mvideo.offset().top >= circles.offset().top+circles.height()/2.0){
        circles.css("zIndex","100");
        $("#logospace").show();
      }
      else
        circles.css("position","relative");
    }
  });


  function closevideo(){
    if(mvideo.css("display") != "none"){
      mvideo.fadeOut(200);
      mvideo.attr("src","black.html");

      $(".video").removeClass("active");

      //replace logo
      $("#logospace").hide();
      circles.css("position","relative");
      mask.finish().fadeOut(350, function(){
        circles.css("zIndex","0");
      });
    }
  }

  //bind closevideo events
  $(document).keydown(function(e){
    if(e.which == 27){
      closevideo();
      closeshot();
    }
  });

  mask.click(closevideo);
});
