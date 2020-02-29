/**
 * 列出所有书籍名称。
 * 从config/books.json配置文件中读取书籍信息，并将其按分类列表显示到页面中。
 */

$(document).ready(function() {
  var bookStr = "";
  var booksjson = "";
  page.cmd("fileGet", "books/books.json", function(res) {
    booksjson = eval('(' + res + ')');
    $.each(booksjson.books, function(infoIndex, info) {
      bookStr += "<section id=\"" + info["divid"] + "\">";
      bookStr += "<h2 class=\"page-header\">" + info["type"] + "</h2><div class=\"row fontawesome-icon-list\">";
      $.each(info["book"], function(objIndex, obj) {
        bookStr += "<div class=\"fa-lg col-md-3 col-sm-4\"><a onClick=\"openTheBook('" + obj["url"] + "')\" style=\"cursor:pointer\"> " + obj["name"] + "<span class=\"text-muted\">(" + obj["author"] + ")</a></div>";
      });
      bookStr += "</div></section>";
    });
    $("#books-list").html(bookStr);
  });

});