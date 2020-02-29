//跳转至其它模块
function gotoWebsite(url) {
  page.cmd("wrapperOpenWindow", [url, "_self"]);
}

/**
 * 此文件包含了本站点所需的各种方法，包含打开作家信息等方法。
 */

var authorjsonobj = null; //作家信息json对象
var authorDir = ""; //当前作家信息及作品所在上级目录，如authors/lihuaping
//打开作家信息，参数url为指定书籍目录,如“authors/lihuaping”,docsname为文集名称，如：李华平文集
function openAuthor(url, docsname) {
  authorDir = url;

  //获取查看作家信息的html页面
  page.cmd("fileGet", "author.html", function(res) {
    $(".wrapper").html(res);
  });

  //从作家目录中author.json获取文章信息
  page.cmd("fileGet", url + "/author.json", function(authorjson) {
    authorjsonobj = eval('(' + authorjson + ')');

    $(".profile-pic").html("<img alt=\"\" src=\"" + url + "/" + authorjsonobj.image + "\">"); //头像
    setIntroduce(url + "/" + authorjsonobj.introduceFile);
    $("#docsname").html("<div class=\"text-right\"><button onClick=\"setDocsList('" + authorDir + "/docs.json')\" id=\"topBackListBtn\" style=\"display:none\" class=\"btn btn-post\">返回文章列表</button>&nbsp;&nbsp;<button onClick=\"$(location).prop('href', '/1PspMHin6p3iZUzZyCXCiefn65iqcwYCxh')\" class=\"btn btn-post\">返回作者列表</button></div><h1>" + docsname + "</h1>");
    setDocsList(url + "/docs.json");
  });

}


//获取作家简介信息
function setIntroduce(url) {
  page.cmd("fileGet", url, function(introduce) {
    $(".p-info").html(introduce);
  });
}

//获取作品列表
function setDocsList(url) {
  $("#topBackListBtn").hide();

  page.cmd("fileGet", url, function(data) {
    var books = eval('(' + data + ')');
    var bookStr = "";
    $.each(books, function(infoIndex, info) {
      bookStr += "<li><div class=\"activity-desk\"><h4>";
      bookStr += "<a onClick=\"showDoc('" + authorDir + "/" + info.filename + "','" + info.subject + "')\" style=\"cursor:pointer\">" + info.subject + "</a></h4>";
      //获取类型标签
      var typeStr = "<div class=\"doc-tags\">";
      $.each(info.doctype, function(typeIndex, type) {
        typeStr += "<a>" + type.typename + "</a>";
      });
      bookStr += typeStr + "</div>";
      bookStr += "</div></li>";
    });

    $("#docs-list").html(bookStr);
  });
}

//显示作者文章,file为要打开的文章,subject为文章标题
function showDoc(file, subject) {
  page.cmd("fileGet", file, function(doc) {
    $("#topBackListBtn").toggle();
    $("#docs-list").html("");
    $("#docs-list").html("<div class=\"panel\"><div class=\"panel-header\"><h1 class=\"text-center mtop35\">" + subject + "</h1></div><div class=\"panel-body\">");
    $("#docs-list").html($("#docs-list").html() + doc);
    $("#docs-list").html($("#docs-list").html() + "</div></div><div class=\"panel-footer text-right\"><button onClick=\"setDocsList('" + authorDir + "/docs.json')\" class=\"btn btn-post\">返回文章列表</button>&nbsp;&nbsp;<button onClick=\"$(location).prop('href', '/1PspMHin6p3iZUzZyCXCiefn65iqcwYCxh')\" class=\"btn btn-post\">返回作者列表</button></div>");
  });

}
