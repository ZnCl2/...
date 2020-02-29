$.fn.autotype = function() {
     var timer=null;
      var _this=$(this);
      var str=_this.html();
      // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
      str=str.replace(/(\s){2,}/g,"$1");
        var index = 0;
        $(this).html('');
        var printer = function() {
            var args=arguments;
            var current = str.slice(index, index+1);
            // html标签完整输出,如：<p>
            if (current == '<'){
                index = str.indexOf('>', index) + 1;
            }
            else{
            index++;
            }
           timer= setTimeout(args.callee,70);
            //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
            if (index < str.length-1){ //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
            }else{
                _this.html(str.substring(0, index));
                clearTimeout(timer);
            };
        };
        // 延迟1s开始
        setTimeout(printer,1000);
    };
    $("#autotype").autotype();