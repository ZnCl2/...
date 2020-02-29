/*global jQuery*/

var cos = Math.cos;
var sin = Math.sin;
var displayText = String.fromCharCode(0x272E) + "Fuck ICANN";

(function ($) {


  var timeout = 0;


  $(function() {

    function changeDemo(context, hash) {
      document.body.style.background = "#000";
      window.onmousedown = false;
      window.onmousemove = false;
      if (window.timeout) window.clearTimeout(timeout);
      context.strokeStyle = "#000";
      context.fillStyle = "#000";
      context.lineWidth = 1;
      context.globalCompositeOperation = "source-over"; 
      context.globalAlpha = 1;
      if (document.getElementById("spaceage")) 
        document.getElementById("spaceage").style.display = "none";
      if (hash == "spaceage") {
        canvas.width = window.innerWidth;
        canvas.height = 700;
        // spaceage text-demo
        textcontrol = spaceAgeEffect(context, {
          text: displayText,
          color: 110,
          x: 360,
          y: 170,
          definition: 0.25,
          start: 50,
          end: 1000,
          alpha: 0.19,
          cosA: 110,
          cosB: -1.0,
          sinA: 58,
          sinB: -0.6,
          size: 120
        });
        textcontrol.draw();
      } else if (hash == "pattern+gradient+reflect") {
        document.getElementById("patterngradientreflect").selected = true;
        context.canvas.height = 400;
        context.canvas.width = 1100;
        sleekZebraEffect();
      } else if (hash == "neon+rainbow+jitter") {
        document.getElementById("neonrainbowjitter").selected = true;
        context.canvas.height = 700;
        context.canvas.width = 700;
        neonLightEffect();
      } else if (hash == "innershadow+pattern+gradient") {	
        document.getElementById("innershadowpatterngradient").selected = true;
        document.body.style.background = "url('"+op_8x8.data+"') fixed";
        context.canvas.height = 400;
        context.canvas.width = 500;
        innerShadow();
      } else {
        document.getElementById("shadow").selected = true;
        context.canvas.height = 820;
        context.canvas.width = 490;
        demoShadowEffects();
      }
    }

    var canvas = document.createElement('canvas'),
        context  = canvas.getContext("2d"),
        $effectsContainer = $('.effects');
      
      $effectsContainer.append(canvas);

    




    var createInterlace = function (size, color1, color2) {
      var proto = document.createElement("canvas").getContext("2d");
      proto.canvas.width = size * 2;
      proto.canvas.height = size * 2;
      proto.fillStyle = color1; // top-left
      proto.fillRect(0, 0, size, size);
      proto.fillStyle = color2; // top-right
      proto.fillRect(size, 0, size, size);
      proto.fillStyle = color2; // bottom-left
      proto.fillRect(0, size, size, size);
      proto.fillStyle = color1; // bottom-right
      proto.fillRect(size, size, size, size);
      var pattern = proto.createPattern(proto.canvas, "repeat");
      pattern.data = proto.canvas.toDataURL();
      return pattern;
    };

    var op_8x8 = createInterlace(8, "#FFF", "#eee");

    /// get text-metrics from DOM, to use with <canvas>


    var image = document.createElement("img");
    image.width = 42;
    image.height = 1;
    image.src = op_8x8.data;
    image.style.cssText = "display: inline";

    getMetrics = function(text, font) {
      var metrics = document.getElementById("metrics"),
          parent;
      if (metrics) {	
        metrics.style.cssText = "display: block";
        parent = metrics.firstChild;
        parent.firstChild.textContent = text;
      } else {
        // setting up html used for measuring text-metrics
        parent = document.createElement("span");
        parent.appendChild(document.createTextNode(text));
        parent.appendChild(image);
        metrics = document.createElement("div");
        metrics.id = "metrics";
        metrics.appendChild(parent);
        document.body.insertBefore(metrics, document.body.firstChild);
      }
      
      // direction of the text
      var direction = window.getComputedStyle(document.body, "")["direction"];

      // getting css equivalent of context.measureText()
      parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
      var width = parent.offsetWidth;
      var height = parent.offsetHeight;

      // capturing the "top" and "bottom" baseline
      parent.style.cssText = "font: " + font + "; white-space: nowrap; display: block;";
      var top = image.offsetTop;
      var bottom = top - height;

      // capturing the "middle" baseline
      parent.style.cssText = "font: " + font + "; white-space: nowrap; line-height: 0; display: block;";
      var middle = image.offsetTop + 1;
      
      // capturing "1em"
      parent.style.cssText = "font: " + font + "; white-space: nowrap; height: 1em; display: block;";
      parent.firstChild.textContent = "";
      var em = parent.offsetHeight;
      
      // cleanup
      metrics.style.display = "none";

      return {
        direction: direction,
        top: top,
        em: em,
        middle: middle,
        bottom: bottom,
        height: height,
        width: width
      };
    };

    changeDemo(context, 'spaceage');

  });

})(jQuery);

