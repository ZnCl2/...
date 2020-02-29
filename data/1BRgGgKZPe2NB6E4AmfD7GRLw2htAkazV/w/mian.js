var site_info,isPhone=false;
class Page extends ZeroFrame {
  selectUser(){
    page.cmd("certSelect", [["zeroid.bit"]]);
    return false
  }
  setSiteInfo(info) {
    site_info=info;
      $("h1").html(info.content.title)
    if(info.cert_user_id==undefined){
      document.getElementById("select_user").innerHTML="选择用户"
    }
    else {
      document.getElementById("select_user").innerHTML=info.cert_user_id
    }
  }
  onOpenWebsocket() {
    this.cmd("siteInfo", [], function(info) {
      page.setSiteInfo(info)
    })
  }
  onRequest(cmd, message) {
    if (cmd == "setSiteInfo")
      this.setSiteInfo(message.params)
    else if (message.params.event[0] == "file_done")
      showall($(this).width())
    else
      this.log("Unknown incoming message:", cmd)
  }
  addMessage(){
    if(!site_info.cert_user_id){
      page.cmd("wrapperNotification", ["info", "请选择您的账户"]);
      return false;
    }
    var inner_path = "data/users/"+site_info.auth_address+"/data.json"
    page.cmd("fileGet", {"inner_path": inner_path, "required": false}, function(data){
      if(data)
        data = JSON.parse(data)
      else
        data = { "message": [] }
      data.message.push({
        "body": document.getElementById("message").value,
        "date_added": (+new Date)
      })
      var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
      page.cmd("fileWrite", [inner_path, btoa(json_raw)], (res) =>{
        if(res=="ok"){
          page.cmd("sitePublish", {"inner_path": inner_path}, function(res){
            addEle(document.getElementById("message").value);
            document.getElementById("message").value = "";
          })
        }
        else{
          page.cmd("wrapperNotification", ["error", "文件写入错误: #{res}"])
        }
      })
    })
  }
}
page = new Page()

var columnsNumber=0;
var columnsHeight=[];
function addEle(ele,userid){
  var tar=1;
  for(i in columnsHeight){
    if(columnsHeight[i]<columnsHeight[tar]) tar=i;
  }
  columnsHeight[tar]=$('#column'+tar).append('<div class="elements">'+marked(ele)+((userid!=undefined)?('<hr /><p>By '+userid+'</p></div>'):'</div>')).height();
  $("#columnHeight"+tar).text('本列高度：'+columnsHeight[tar]+' px');
}
function showall(width){
  var number=Math.round(width/(isPhone?500:350));
  if(isPhone){
    $("p").css("font-size","1.5em");
    $("h2").css("font-size","2.0em");
    $("h1").css("font-size","2.5em");
    
  }
  if (number<1)number=1;
  $("#widd").text("页面宽度："+width+"，摆放 "+number+" 列")
  if(columnsNumber!=number){
    columnsNumber=number;
    columnsHeight=[];
    $("#theBody").empty();
    for(var i=1;i<=columnsNumber;i++){
      $("#theBody").append('<div class="columns" id="column'+i+'"></div>');
      columnsHeight[i]=0;
    }
    $(".columns").css("width",100/columnsNumber-0.01+"%")
    for(var i=1;i<=columnsNumber;i++)
      addEle('<p class="columnHeights" id="columnHeight'+i+'"></p>')
    var query = "\
            SELECT message.*, keyvalue.value AS cert_user_id FROM message\n\
            LEFT JOIN json AS data_json USING (json_id)\n\
            LEFT JOIN json AS content_json ON (\n\
                data_json.directory = content_json.directory AND content_json.file_name = 'content.json'\n\
            )\n\
            LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)\n\
            ORDER BY date_added\n\
            "
    page.cmd("dbQuery",[query],(messages)=>{
      for(x in messages){
        addEle(messages[x].body,messages[x].cert_user_id);
      }
    })
  }
}
$(document).ready(function(){
  showall($(this).width());
});
$(window).resize(function(){
  showall($(this).width())
});
isPhone = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 || !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);