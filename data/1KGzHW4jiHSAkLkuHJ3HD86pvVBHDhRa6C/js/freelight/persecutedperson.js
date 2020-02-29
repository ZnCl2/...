/**
 * 列出所有被迫害者名称。
 * 从persecuted/persecuted_person.json配置文件中读取被迫害者信息，并将其显示到页面中。
 */

$(document).ready(function() {
  var personStr = "";
  var personjson = "";
  page.cmd("fileGet", "persecuted/persecuted_person.json", function(res) {
    personjson = eval('(' + res + ')');
    var index = 0;

    $.each(personjson, function(infoIndex, info) {
      index++;
      if (index == 1) {
        personStr += "<div class=\"row\">";
      }

      personStr += "<div class=\"col-md-6 col-sm-6\"><div class=\"panel\"><div class=\"panel-body\">";
      personStr += "<h2>" + info["name"] + "<span class=\"text-muted small\"> - " + info["roles"] + "</span></h2>";
      personStr += "<div class=\"media\"><a class=\"pull-left\" onClick=\"openPerson('" + info["url"] + "')\" style=\"cursor:pointer\"><img class=\"thumb media-object\" width=\"100%\" src=\"" + info["url"] + "/person.png\" alt=\"\"></a><div class=\"media-body\">" + info["introduce"];
      personStr += "</div></div></div></div></div>";

      if (index == 2) {
        personStr += "</div>";
        index = 0;
      }
    });

    if (index == 1) {
      personStr += "</div>";
    }
    $("#person-list").html(personStr);
  });

});