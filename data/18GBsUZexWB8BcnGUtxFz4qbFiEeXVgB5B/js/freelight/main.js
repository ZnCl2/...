//跳转至其它模块
function gotoWebsite(url) {
  page.cmd("wrapperOpenWindow", [url, "_self"]);
}

/*
 *显示时间线某段详情.参数filepath为要显示的内容文档路径，title为标题
 */
function showContent(filepath, title) {
  //$("#content-heading").html(title);
  $(".modal-body").html("");
  $(".modal-title").html(title);
  page.cmd("fileGet", "sixfour/" + filepath, function(res) {
    //  $("#panel-content").html(res);
    $(".modal-body").html(res);
  });
}