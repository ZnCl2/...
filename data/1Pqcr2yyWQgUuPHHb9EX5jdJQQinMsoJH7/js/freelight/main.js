//跳转至其它模块
function gotoWebsite(url) {
  page.cmd("wrapperOpenWindow", [url, "_self"]);
}

/**
 * 此文件包含了本站点所需的各种方法，包含打开书等方法。
 */

var bookjsonobj = null; //本书信息json对象
var bookDir = ""; //当前书籍所在上级目录，如book
//打开指定书，参数url为指定书籍目录,如“books/1984”
function openTheBook(url) {
  bookDir = url;
  var bookchaptersstr = "";
  //用于判断是否有章节
  var hasSection = false;
  //缺省章节标题
  var defaulttitle = "";
  //缺省页码
  var defaultPageNumber = 0;

  //获取阅读书籍的html页面
  page.cmd("fileGet", "book.html", function(res) {
    $(".wrapper").html(res);
  });

  //从书籍目录中book.json获取书籍信息
  page.cmd("fileGet", url + "/book.json", function(bookjson) {
    bookjsonobj = eval('(' + bookjson + ')');

    $("#book-name").html(bookjsonobj["name"]); //书名
    $("#book-author").html("作者：" + bookjsonobj["author"]); //作者
    $("#book-location").html(bookjsonobj["name"]); //路径


    //获取章节信息---开始
    $.each(bookjsonobj.chapters, function(infoIndex, info) {
      //生成章节信息html代码
      //-----生成章信息
      bookchaptersstr += "<li class=\"dd-item dd3-item\" data-id=\"" + String(infoIndex) + "\"><div class=\"dd-handle dd3-handle\"></div><div class=\"dd3-content\">" +
        (info["filename"] == "" ? info["name"] : "<a onClick=\"openTheChapter('" + url + "/" + info["filename"] + "','" + info["name"] + "'," + info["pagenumber"] + ")\" style=\"cursor:pointer\">" +
          info["name"] + "</a>") + "</div>";

      //判断此章是否为缺省打开章
      if (info["isdefault"] != undefined) {
        if (info["isdefault"] == "true") {
          defaulttile = info["name"];

          //缺省页码设置
          if (info["pagenumber"] != undefined) {
            defaultPageNumber = info["pagenumber"];
          }
        }
      }

      if (info["sections"] != undefined) {
        $.each(info["sections"], function(sectionIndex, section) {
          //循环生成节信息
          if (sectionIndex == 0) {
            bookchaptersstr += "<ol class=\"dd-list\">";
            hasSection = true;
          }

          if (section["isdefault"] != undefined) {
            if (section["isdefault"] == "true") {
              defaulttile += "/" + section["name"];

              //缺省页码设置
              if (section["pagenumber"] != undefined) {
                defaultPageNumber = section["pagenumber"];
              }
            }
          }


          bookchaptersstr += "<li class=\"dd-item dd3-item\" data-id=\"" + String(infoIndex) + "-" + String(sectionIndex) + "\"><div class=\"dd-handle dd3-handle\"></div><div class=\"dd3-content\">" +
            (section["filename"] == "" ? section["name"] : "<a onClick=\"openTheChapter('" + url + "/" + section["filename"] + "','" + info["name"] + "/" + section["name"] + "'," + section["pagenumber"] + ")\" style=\"cursor:pointer\">" +
              section["name"] + "</a>") + "</div></li>"
        });
        if (hasSection) {
          bookchaptersstr += "</ol>"
        }
      }

      bookchaptersstr += "</li>";
    });

    $("#chapters_list_items").html(bookchaptersstr);
    //获取章节信息---结束


    //打开缺省章节
    openTheChapter(url + "/" + bookjsonobj["defaultfile"], defaulttile, defaultPageNumber);

  });

}

//打开章节文件,filename为要打开的章节文件名，titlename为要打开的章节文件标题,pangenumber为当前的页数
function openTheChapter(filename, titlename, pagenumber) {
  page.cmd("fileGet", filename, function(res) {
    $("#section-title").html(titlename);

    $("#section-content").html(res);
    //生成上一篇按钮
    $(".panel-footer").html("");
    if (pagenumber > 1) {
      $(".panel-footer").html("<button class=\"btn btn-primary\" onClick=\"openChapterByPageNumber(" + (pagenumber - 1) + ")\" type=\"button\">上一页</button>&nbsp;&nbsp;");
    }
    if (pagenumber > 1 & pagenumber < bookjsonobj.bookpagenumber) {
      $(".panel-footer").html($(".panel-footer").html() + "&nbsp;&nbsp;");
    }
    if (pagenumber < bookjsonobj.bookpagenumber) {
      $(".panel-footer").html($(".panel-footer").html() + "<button class=\"btn btn-primary\" onClick=\"openChapterByPageNumber(" + (pagenumber + 1) + ")\" type=\"button\">下一页</button>&nbsp;&nbsp;");
    }
  });
}

//根据制定的页码数打开页面 pagenumber为指定的页码数
function openChapterByPageNumber(pagenumber) {
  $.each(bookjsonobj.chapters, function(infoIndex, info) {
    if (info["pagenumber"] != undefined) {
      if (info["pagenumber"] == pagenumber) {
        openTheChapter(bookDir + "/" + info["filename"], info["name"], pagenumber);
        //跳转至页面书名标题处
        $("html,body").animate({
          scrollTop: $("#section-title").offset().top
        }, 10);
        return;
      }
    }

    if (info["sections"] != undefined) {
      $.each(info["sections"], function(sectionIndex, section) {
        if (section["pagenumber"] != undefined) {
          if (section["pagenumber"] == pagenumber) {
            openTheChapter(bookDir + "/" + section["filename"], section["name"], pagenumber);
            $("html,body").animate({
              scrollTop: $("#section-title").offset().top
            }, 10);
            return;
          }
        }
      });
    }
  });
}
