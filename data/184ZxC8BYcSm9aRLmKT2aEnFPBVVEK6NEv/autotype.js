$.fn.autotype = function() {
     var timer=null;
      var _this=$(this);
      var str=_this.html();
      // �����滻������֮����ӵĶ���ո񣬲�ȥ����������������Ե�ͣ�٣�ʵ�������������ո�
      str=str.replace(/(\s){2,}/g,"$1");
        var index = 0;
        $(this).html('');
        var printer = function() {
            var args=arguments;
            var current = str.slice(index, index+1);
            // html��ǩ�������,�磺<p>
            if (current == '<'){
                index = str.indexOf('>', index) + 1;
            }
            else{
            index++;
            }
           timer= setTimeout(args.callee,70);
            //λ�����: ����setInterval������ż�����ж��Ƿ�����»����ַ���_����ʹ����Ч��������
            if (index < str.length-1){ //��ӡ�ַ�������2���ַ���ʼ�������»����ַ����Է�ֹ���������ܻ�����һ�»����ַ�
                _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
            }else{
                _this.html(str.substring(0, index));
                clearTimeout(timer);
            };
        };
        // �ӳ�1s��ʼ
        setTimeout(printer,1000);
    };
    $("#autotype").autotype();