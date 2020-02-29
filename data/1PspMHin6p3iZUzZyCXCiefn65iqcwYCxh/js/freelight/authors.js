/**
 * 列出所有作者名称。
 * 从authors/authors.json配置文件中读取作者信息，并将其显示到页面中。
 */

$(document).ready(function() {
  var authorsStr = "";
  var authorsjson = "";
  page.cmd("fileGet", "authors/authors.json", function(res) {
    authorsjson = eval('(' + res + ')');
    $.each(authorsjson.authors, function(infoIndex, info) {
      authorsStr += "<div class=\"fa-lg col-md-2 col-sm-4\"><a onClick=\"openAuthor('" + info["url"] + "','" + info["name"] + "')\" style=\"cursor:pointer\"> " + info["name"] + "</a></div>";

    });
    $("#authors-list").html(authorsStr);
  });

});