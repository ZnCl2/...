//跳转至其它模块
function gotoWebsite(url) {
  page.cmd("wrapperOpenWindow", [url, "_self"]);
}

/**
 * 此文件包含了本站点所需的各种方法，包含打开作家信息等方法。
 */

var personjsonobj = null; //人员信息json对象

//打开作家信息，参数url为指定目录,如"persecuted/huangqi"
function openPerson(url) {
  //获取查看人员信息的html页面
  page.cmd("fileGet", "person.html", function(res) {
    $(".wrapper").html(res);
  });

  //从目录中persecuted_person.json获取文章信息
  page.cmd("fileGet", url + "/person.json", function(authorjson) {
    personjsonobj = eval('(' + authorjson + ')');

    $(".profile-pic").html("<img alt=\"\" src=\"" + url + "/person.png\"><h1>" + personjsonobj.name + "</h1>"); //头像
    setIntroduce(url);
    $("#docsname").html("<div class=\"text-right\"><button onClick=\"setDocsList('" + url + "')\" id=\"topBackListBtn\" style=\"display:none\" class=\"btn btn-post\">返回文章列表</button>&nbsp;&nbsp;<button onClick=\"$(location).prop('href', '/1KGzHW4jiHSAkLkuHJ3HD86pvVBHDhRa6C')\" class=\"btn btn-post\">返回被迫害者列表</button></div><h1>相关资料</h1>");
    setDocsList(url);
  });

}


//获取简介信息
function setIntroduce(url) {
  page.cmd("fileGet", url + "/baseinfo.txt", function(introduce) {
    $(".p-info").html(introduce);
  });
  page.cmd("fileGet", url + "/introduce.txt", function(introduce) {
    $("#introduce").html(introduce);
  });
  page.cmd("fileGet", url + "/persecutor.txt", function(introduce) {
    $("#persecutor").html(introduce);
  });
}

//获取作品列表
function setDocsList(url) {
  $("#topBackListBtn").hide();

  page.cmd("fileGet", url + "/person.json", function(data) {
    var books = eval('(' + data + ')');
    var bookStr = "";
    $.each(books.docs, function(infoIndex, info) {
      bookStr += "<li><div class=\"activity-desk\"><h4>";
      bookStr += "<a onClick=\"showDoc('" + url + "/" + info.filename + "','" + info.subject + "')\" style=\"cursor:pointer\">" + info.subject + "</a></h4>";
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
    $("#docs-list").html($("#docs-list").html() + "</div></div><div class=\"panel-footer text-right\"><button onClick=\"setDocsList('" + url + "')\" class=\"btn btn-post\">返回文章列表</button>&nbsp;&nbsp;<button onClick=\"$(location).prop('href', '/1KGzHW4jiHSAkLkuHJ3HD86pvVBHDhRa6C')\" class=\"btn btn-post\">返回作者列表</button></div>");
  });

}