/*
(function($){
	$(function(){
//		$("form").on("submit", submit_check);
		$("#submitButton").on("click", submit_check);
	});
})(jQuery);	
*/

function commentsubmit()
{
	if ($("#CommentMessage").val() == "" || $("#CommentName").val() == "" )
	{
		$("#CommentStatus").html("评论或签名未填写");
		return false;
	}
	else
	{
		$.post("/gb/comments/create.php",
			{
				message:$("#CommentMessage").val(),
				name:$("#CommentName").val(),
				subject:$("#CommentSubject").val()
			},
			function(data,status){
				if (status == 'success')
				{
//					commentMessage  = "编辑在香港时间每个工作日9-17点查阅并发布读者评论，以下为您的评论全文：<p>&nbsp;</p><p>" + escape($("#CommentMessage").val())+"</p>";
					commentMessage  = "编辑在香港时间每个工作日9-17点查阅并发布读者评论，以下为您的评论全文：<p>&nbsp;</p><p>" + escapeHtml($("#CommentMessage").val()) +"</p>";
					$("#CommentStatus").html(commentMessage);
					$("#CommentMessage").val("");
					
					//setTimeout(function(){ $("#CommentStatus").html(""); }, 10000);
				}
//				alert(status);
			}
		);
		
	}
	
}

function escapeHtml(text) {
    'use strict';
    return text.replace(/[\"&'\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        }[a];
    });
}