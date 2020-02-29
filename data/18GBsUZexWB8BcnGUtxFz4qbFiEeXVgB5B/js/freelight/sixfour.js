/**
 * 列出所有时间线内容。
 * 从64/timeline.json配置文件中读取作者信息，并将其显示到页面中。
 */
$(document).ready(function() {
  var htmlStr = "";
  var tljson = ""; //时间线json对象
  page.cmd("fileGet", "sixfour/timeline.json", function(res) {
    tljson = eval('(' + res + ')');
    $.each(tljson, function(infoIndex, info) {
      if (info.sort % 2 == 1) {
        htmlStr += "<article class=\"timeline-item alt\">"
      } else {
        htmlStr += "<article class=\"timeline-item\">"
      }
      htmlStr += "<div class=\"timeline-desk\"><div class=\"panel\"><div class=\"panel-body\">";

      if (info.sort % 2 == 1) {
        htmlStr += "<span class=\"arrow-alt\"></span>";
      } else {
        htmlStr += "<span class=\"arrow\"></span>";
      }
      htmlStr += "<span class=\"timeline-icon\"></span><span class=\"timeline-date\" >" + info["date"] + "</span>";
      if (info.sort % 2 == 1) {
        htmlStr += "<h1 class=\"red\">" + info.title + "</h1>";
      } else {
        htmlStr += "<h1 class=\"green\">" + info.title + "</h1>";
      }
      htmlStr += info.introduce;
      if (info.contentfile != "") {
        //htmlStr += "<p class=\"text-right\"><a onClick=\"showContent('" + info.contentfile + "','" + info.title + "')\" style=\"cursor:pointer\">详情</a></p>";
        htmlStr += "<p class=\"text-right\"><a href=\"#myModal\" data-toggle=\"modal\" onClick=\"showContent('" + info.contentfile + "','" + info.title + "')\" style=\"cursor:pointer\">详情</a></p>";
      }
      htmlStr += "</div> </div> </div> </article>";

      //如果为第一条，缺省显示到详情中
      if (info.sort == 1) {
        //showContent(info.contentfile, info.title);
      }

    });

    $(".timeline").html(htmlStr);
  });
});