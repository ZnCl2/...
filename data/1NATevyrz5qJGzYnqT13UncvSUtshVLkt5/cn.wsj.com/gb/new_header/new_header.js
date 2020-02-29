(function ($) {
	$(function () {
		function editionpicker() {
			$('#edition-picker-button')
				.click(function (evt) {
					$('#edition-picker').toggleClass('expanded');
					evt.stopPropagation();
				});
		}

		function languagetoggle() {
			$('#language-toggle-button')
				.click(function (evt) {
					$('#language-toggle').toggleClass('expanded');
					evt.stopPropagation();
					return false;
				});
				
			$('#languages li')
				.hover(function () {
					$(this).addClass('selected');
				}, function () {
					$(this).removeClass('selected');
				})
				.click(function (evt) {
					var $this = $(this);
					if ($this.hasClass('current')) {
						$('#language-toggle').removeClass('expanded');
						return false;
					}
					
					var url = window.location.href;
					if (/\/gb\//.test(url)) {
						window.location = url.replace(/\/gb\//i, '/big5/');
					} else {
						window.location = url.replace(/\/big5\//i, '/gb/');
					}
				});
		}
		
		function navigation() {
			var nav_width = $('#nav').width();
			$('#navigation li').each(function (index, li) {
				var $this = $(this);
				if (nav_width <= $this.offset().left + $this.width()) {
					$this.addClass('right-aligned');
				}
			});

			$('#navigation .dropdown')
				.click(function (evt) {
					var $li = $(this).parents('li');
					var isExpanded = $li.hasClass('expanded');

					$('.expanded').removeClass('expanded');
					if (!isExpanded) {
						$li.addClass('expanded');
					}
					
					evt.stopPropagation();
					evt.preventDefault();
					return false;
				});
		}

		function hoverfix() {
			$('#navigation li')
				.hover(function() {
					$(this).addClass('hoverfix');
				}, function () {
					$(this).removeClass('hoverfix');
				});
		}

		/* WSJ Live China ~ Video Module */
		function loadVideoModule(){
                url = getVideoURL();
                var $vslides = $('#vslides'),
                       $current = $('div', $vslides)
                       videos = [],
                       counter = 1,
                       videoTemplate = '<td style="line-height:17px;font-size:12px;padding:0px; width:135px;" valign="top"><a href="{{url}}" target="_blank"><img style="border-top:6px solid #000000; border-bottom:6px solid #000000;  width:115px; height:62px;;border:1px solid #DEDEDE" border="0" src="{{thumbnail}}"><br><img src="../pictures/format/video_play_button.jpg" border="0" style="margin-right:5px; margin-top:5px;">{{title}}</a></td>',
                       rowTemplate = '<div style="display: none;"><table border="0">{{videos}}</table></div>';

                if (!$vslides.length) return;

                $.getJSON(url, function (data) {
                       $.each(data.items, function (i, video) {
                             //alert("Json Call");
                             var html = videoTemplate
                                                  .replace('{{url}}', 'http://live.wsj.com/video/china/'+video.id.substring(1,video.id.length-1)+'.html')
                                                  .replace('{{thumbnail}}', video.thumbnailURL)
                                                  .replace('{{title}}', video.name);
                             videos.push(html);
                             if (videos.length === 3) {
                                    $vslides.append(rowTemplate.replace('{{videos}}', videos.join('')));
                                  videos = [], counter++;
                             }
                       });
                       if (videos.length) {
                             $vslides.append(rowTemplate.replace('{{videos}}', videos.join('')));
                       }

                       $current.remove();
                       $('#allvslides').html(counter);
                       displayslide('vslides', 0, 'thisvslide', 'allvslides');
                       $('#vid .titlelink').html("สำฦต &#187");
                       $('#vid .titlelink').attr("href", "http://live.wsj.com/china");
                       $('#vid').css("display","block");
              });
		}
		/* WSJ Live China ~ Video Module */		
		
	   function customizeForDevice(){
		  var ua = navigator.userAgent;
		  var checker = {
			iphone: ua.match(/(iPhone|iPod|iPad)/),
			blackberry: ua.match(/BlackBerry/),
			android: ua.match(/Android/)
		  };
		  if (checker.android){
			  //$('.android-only').show();
			  $('#gutter-ad-wrapper-left, #gutter-ad-wrapper-right').remove();
		  }
		  else if (checker.iphone){
			  //$('.idevice-only').show();
			  $('#gutter-ad-wrapper-left, #gutter-ad-wrapper-right').remove();
		  }
		  else if (checker.blackberry){
			  //$('.berry-only').show();
		  }
		  else {
			  //$('.unknown-device').show();
		  }
		}    				
		
		function getVideoURL(){
		  var pathName = window.location.pathname;
		  var page = pathName.split("/")[2];
		  var arrayExistKey = "";
		  var pageList = [
			//Index
			["index.asp"],
			
			//China
			["bch.asp", "checo.asp", "chinastock.asp", "chw.asp", "strhrd.asp", "ch.asp"],

			//World
			["globe.asp", "bus.asp", "bas.asp", "beu.asp", "ecm.asp", "japan.asp", "india.asp", "nkorea.asp", "russia.asp", "baf.asp", "blog.asp", "ahd.asp"],
			
			//Economy
			["economy.asp","checo.asp", "ecb.asp","ecoplt.asp","ecodata.asp", "labor.asp","ffe.asp", "mgt.asp", "mga.asp"],
			
			//Market
			["markets.asp","chinastock.asp","usstock.asp","hkstock.asp","strhrd.asp","forex.asp","cbk.asp","blk.asp","gold.asp","ma.asp","stk.asp","marketwatch.asp"],
			
			//Money
			["money.asp","roi.asp","inv.asp","iiv.asp","pal.asp","csi.asp","guw.asp"],
			
			//Column
			//["column.asp","cws.asp","edr.asp","arpt.asp","llw.asp","ygh.asp","wxh.asp","chy.asp","mst.asp","wes.asp","lxl.asp","shy.asp"],
			
			//Life
			["life.asp", "edu.asp", "read.asp", "spo.asp", "salon.asp", "msh.asp","fashion.asp","style.asp","trv.asp","movie.asp","wine.asp","ahd.asp","llw.asp","hea.asp","wvh.asp","ien.asp","czxt.asp"],
			
			//Lifestyle
			["luxmain.asp","luxfashion.asp","luxdesign.asp","luxjourney.asp","luxtravel.asp","luxfood.asp","luxjoy.asp"],
			
			//Industry
			["industry.asp","finance.asp","energy.asp","auto.asp","phar.asp","media.asp","consumer.asp","industrial.asp","smallbusiness.asp"],
			
			//Tech
			["tech.asp","atc.asp","mmb.asp","hpj.asp","luo.asp","eric.asp","ptk.asp","internet.asp","telecom.asp","computer.asp","software.asp","asiad.asp"]
		  ];
		  
		  var videoList = [
			'http://video-api.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-playlist&query=Editor%20Video%20Picks%20-%20China%20Simplified&callback=?', 
			/* China News - China */'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Chinese&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Top News - World*/ 
			'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=News&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Business News - Economy */ 'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Business&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Business News - Markets */ 'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Business&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Personal Finance - Personal Finance */ 'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Personal%20Finance&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Life & Culture News - Life & Culture */  'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Lifestyle&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Life & Culture News - Luxury */  'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Lifestyle&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?',  
			/* Business News - Industry */ 'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Business&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?', 
			/* Tech News */  
			'http://live.wsj.com/api-video/find_all_videos.asp?count=12&type=wsj-section&query=Tech&fields=id,name,thumbnailURL&groupid=350&lang=zh-cn&callback=?'
		  ];
		  
		  for(i=0; i < pageList.length; i++){
			if(jQuery.inArray( page, pageList[i]) == 0 ){
			  arrayExistKey = i;
			  break;
			}
		  }

		  if(arrayExistKey != ""){
			return videoList[arrayExistKey];
		  }else{
			return videoList[0];
		  }
		  
		}
		
		editionpicker();
		languagetoggle();
		navigation();
		hoverfix();
		customizeForDevice();		
		loadVideoModule();

		$('body')
			.click(function(evt) {
				$('.expanded').removeClass('expanded');
			});
	})
})(jQuery);