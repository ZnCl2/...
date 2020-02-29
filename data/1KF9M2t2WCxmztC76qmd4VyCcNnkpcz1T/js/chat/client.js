var messages = 0;
var socket = io('http://localhost:4000/');
var scrollHeightBefore = 0;
var needCheck = true;
socket.on('connect', function () {
});
socket.emit("con",1);
$("#new_message").keyup(function(e) {
    if(window.event) {
        var keyCode = window.event.keyCode;
    }
    else {
        var keyCode = e.keyCode || e.which;
    }
    if( (!e.shiftKey && (keyCode == 13)) ) {
        if($(this).val()==="" || $(this).val()===" " || $(this).val()==="  " || $(this).val()==="   " || $(this).val()==="\n" || $(this).val()=== "\n\n" || $(this).val()===" \n")
            return;
        var message = $(this).val().replaceAll("\n","<br/>");
        send_message(message);
    }
});
function send_message(msg)
{
    var message = msg.replace( regex, function(s) {
        var i = 0;
        var asterisks = "";
        while (i < s.length) {
            asterisks += "*";
            i++;
        }

        return asterisks;
    });
    $("#limit").hide();
    message = $.emoticons.replace(message);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/send/message/check",
        data: {
            "_token":$("#_token").val(),
            "message":message
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        success: function(result){
            if(result.length>0)
            {
                var data = {
                    "id":id,
                    "username":result[0],
                    "profile_picture":result[1],
                    "message":result[2],
                    "message_time":result[3]
                };
                socket.emit("new_message",data);
                $("#new_message").val("");
            }
            else
            {
                $("#limit").show();
            }
        }
    });
}
$("#send").click(function(){
    send_message($("#new_message").val().replaceAll("\n","<br/>"));
});
String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
socket.on("receive_new_message",function(data){
    messages++;
    if(data.id==id)
    {
        var row = document.createElement("div");
        var col = document.createElement("div");
        var img = document.createElement("img");
        $(img).attr("src","/images/users/"+data.profile_picture).addClass("img-round");
        $(col).addClass("col-md-3").append(img);
        $(row).addClass("row").append(col).addClass("msg-row");
        col = document.createElement("div");
        var span = document.createElement("span");
        $(span).addClass("time_my").append(data.message_time);
        var name = document.createElement("span");
        $(name).addClass("time_my").append(data.username);
        var msg = document.createElement("div");
        $(msg).addClass("msg").append(data.message);
        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
        $(row).append(col);
        $("#chat").append(row);
    }
    else
    {
        var row = document.createElement("div");
        var col = document.createElement("div");
        var img = document.createElement("img");
        var span = document.createElement("span");
        $(span).addClass("time_other").append(data.message_time);
        var name = document.createElement("span");
        $(name).addClass("time_other").append(data.username);
        var msg = document.createElement("div");
        $(msg).addClass("msg").append(data.message);
        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
        $(row).append(col);
        col = document.createElement("div");
        $(img).attr("src","/images/users/"+data.profile_picture).addClass("img-round");
        $(col).addClass("col-md-3").append(img);
        $(row).addClass("row").append(col).addClass("msg-row");
        $("#chat").append(row);
        $('#chatSound').get(0).play();
    }
    var chatMessages = document.getElementById("chat");
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
function getMessages(indicator)
{
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/get/messages",
        data: {
            "_token":$("#_token").val(),
            "messages":messages
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        success: function(result){
            if(result.length==0)
                needCheck = false;
            messages+=result.length;
            if(parseInt(indicator)==1)
            {
                for(var i =result.length-1; i> -1;i--)
                {
                    if(result[i].id==id)
                    {
                        var row = document.createElement("div");
                        var col = document.createElement("div");
                        var img = document.createElement("img");
                        $(img).attr("src","/images/users/"+result[i].profile_picture).addClass("img-round");
                        $(col).addClass("col-md-3").append(img);
                        $(row).addClass("row").append(col).addClass("msg-row");
                        col = document.createElement("div");
                        var span = document.createElement("span");
                        $(span).addClass("time_my").append(result[i].message_time);
                        var name = document.createElement("span");
                        $(name).addClass("time_my").append(result[i].username);
                        var msg = document.createElement("div");
                        $(msg).addClass("msg").append(result[i].message);
                        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
                        $(row).append(col);
                        $("#chat").append(row);
                    }
                    else
                    {
                        var row = document.createElement("div");
                        var col = document.createElement("div");
                        var img = document.createElement("img");
                        var span = document.createElement("span");
                        $(span).addClass("time_other").append(result[i].message_time);
                        var name = document.createElement("span");
                        $(name).addClass("time_other").append(result[i].username);
                        var msg = document.createElement("div");
                        $(msg).addClass("msg").append(result[i].message);
                        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
                        $(row).append(col);
                        col = document.createElement("div");
                        $(img).attr("src","/images/users/"+result[i].profile_picture).addClass("img-round");
                        $(col).addClass("col-md-3").append(img);
                        $(row).addClass("row").append(col).addClass("msg-row");
                        $("#chat").append(row);
                    }
                    var chatMessages = document.getElementById("chat");
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }
            else
            {
                for(var i = 0 ; i< result.length;i++)
                {
                    if(result[i].id==id)
                    {
                        var row = document.createElement("div");
                        var col = document.createElement("div");
                        var img = document.createElement("img");
                        $(img).attr("src","/images/users/"+result[i].profile_picture).addClass("img-round");
                        $(col).addClass("col-md-3").append(img);
                        $(row).addClass("row").append(col).addClass("msg-row");
                        col = document.createElement("div");
                        var span = document.createElement("span");
                        $(span).addClass("time_my").append(result[i].message_time);
                        var name = document.createElement("span");
                        $(name).addClass("time_my").append(result[i].username);
                        var msg = document.createElement("div");
                        $(msg).addClass("msg").append(result[i].message);
                        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
                        $(row).append(col);
                        $("#chat").prepend(row);
                    }
                    else
                    {
                        var row = document.createElement("div");
                        var col = document.createElement("div");
                        var img = document.createElement("img");
                        var span = document.createElement("span");
                        $(span).addClass("time_other").append(result[i].message_time);
                        var name = document.createElement("span");
                        $(name).addClass("time_other").append(result[i].username);
                        var msg = document.createElement("div");
                        $(msg).addClass("msg").append(result[i].message);
                        $(col).addClass("col-md-9").append(name).append("<br>").append(span).append("<br>").append(msg);
                        $(row).append(col);
                        col = document.createElement("div");
                        $(img).attr("src","/images/users/"+result[i].profile_picture).addClass("img-round");
                        $(col).addClass("col-md-3").append(img);
                        $(row).addClass("row").append(col).addClass("msg-row");
                        $("#chat").prepend(row);
                    }
                    var chatMessages = document.getElementById("chat");
                    chatMessages.scrollTop = chatMessages.scrollHeight - scrollHeightBefore;
                }
                $("#spinner").hide();
            }

        }

    });
}
getMessages(1);
$("#chat").on('scroll', function(){
    if($(this).scrollTop() == 0) {
        if(needCheck)
        {
            var loaderAnimation = '<center><div class="spinner" id="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div></center>';
            $(this).prepend(loaderAnimation);
            scrollHeightBefore = this.scrollHeight;
            getMessages(2);
        }
    }
});