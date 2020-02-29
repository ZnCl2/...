$(document).ready(function(){
	window.zeroFrame = new ZeroFrame();

	var mode = 'index';
	var id = 0;
	var query = window.location.search.substring(1);
	var qParams = query.split('&');
	if (qParams.length>=2){
		var pParams = qParams[0].split(':');
		mode = pParams[0];
		id = pParams[1];
	}

	function fileRead(file, callback){
		zeroFrame.cmd('fileGet', [file, false], callback);
	}
	function fileWrite(file, content, callback){
		zeroFrame.cmd('fileWrite', [file, btoa(unescape(encodeURIComponent(content)))], callback);
	}
	function userAuth(){
		console.log('[FC] user auth');
		zeroFrame.cmd('certSelect', {
			accepted_domains: ['zeroid.bit']
		}, function() {
			userLoadData(userUpdateInfo);
		});
	}
	function userLoadData(callback){
		console.log('[FC] user load');
		try {
			zeroFrame.cmd('siteInfo', [], function(siteInfo){
				if (siteInfo.cert_user_id){
					console.log('[FC] saved userdata load');
					fileRead('data/users/'+siteInfo.auth_address+'/data.json', function(content){
						var createUserData = false;
						user.name = siteInfo.cert_user_id;
						user.address = siteInfo.auth_address;
						content = content||'';
						try {
							content = JSON.parse(content);
						} catch(e) {
							content = {'favoriteVideoList':[],'settings':{}};
							createUserData = true;
						} finally {
							user.data = content;
							if ((createUserData)&&(content.length==0)){
								userSaveData(function(){
									zeroFrame.cmd('wrapperNotification', ['done', 'Settings saved!', 5000]);
								});
							}
							callback();
						}
					});
				} else {
					console.log('[FC] default userdata load');
					user = {'name':'','address':'','data':{'favoriteVideoList':[],'settings':{}}};
					callback();
				}
			});
		} catch(e) {
			console.error('[FC] error loading user');
		}
	}
	function userSaveData(callback){
		if (user.name!=''){
			fileWrite('data/users/'+user.address+'/data.json', JSON.stringify(user.data), function(){
				zeroFrame.cmd('sitePublish', {inner_path:'data/users/'+user.address+'/content.json'}, function(){
					callback();
				});
			});
		} else {
			return false;
		}
	}
	function userUpdateInfo(){
		console.log('[FC] user info update');
		if (user.name!=''){
			$('#login').addClass('hidden');
			$('#user-name').html(user.name);
			$('#user-info').removeClass('hidden');
			if (user.data.favoriteVideoList.length>0){
				$.each(user.data.favoriteVideoList, function(index, value){
					curFavoriteVideoList.push(value.video_id);
				});
			}
		} else {
			$('#login').removeClass('hidden');
			$('#user-name').html('');
			$('#user-info').addClass('hidden');
			curFavoriteVideoList = [];
		}
		setFavorites();
	}

	var user = {'name':'','address':'','data':{'favoriteVideoList':[],'settings':{}}};
	var curFavoriteVideoList = [];
	function init(){
		console.log('[FC] init');
		userUpdateInfo();
		mainContentLoader();
	}
	userLoadData(init);
	$(document).on('click', '#login a', function(){
		userAuth();
		return false;
	}).on('click', '#settings-select-user', function(){
		userAuth();
		return false;
	});

	function videoPreview(item){
		var itemDate = new Date(item.date*1000);
		return '<a href="./?video:'+item.id+'" class="video-preview" data-id="'+item.id+'"><div class="video-preview-cover"><img class="lazyload" data-src="./data/site/cover/'+item.id+'.jpg" src="./images/empty.png" width="311" height="175" alt="'+item.title+'"></div><div class="video-preview-video"><video width="311" height="175" preload="metadata" loop muted poster="./data/site/cover/'+item.id+'.jpg"><source src="./data/site/preview/'+item.id+'.mp4" type="video/mp4"></video></div><div class="video-preview-length">'+item.length+'</div><div class="video-preview-favorite" title="Add to favorites"><div class="video-preview-favorite-icon"></div><div class="video-preview-favorite-count"></div></div><div class="video-preview-title" title="'+item.title+'">'+item.title+'</div><div class="video-preview-date">'+('0'+itemDate.getDate()).slice(-2)+'.'+('0'+(itemDate.getMonth()+1)).slice(-2)+'.'+itemDate.getFullYear()+'</div></a>';
	}
	function favoriteVideo(videoId){
		if (user.name!=''){
			var idIndex = curFavoriteVideoList.indexOf(videoId);
			if (idIndex!=-1){
				curFavoriteVideoList.splice(idIndex, 1);
				var tmpFavorites = [];
				$.each(user.data.favoriteVideoList, function(index, value){
					if (value.video_id!=videoId){
						tmpFavorites.push(value);
					}
				});
				user.data.favoriteVideoList = tmpFavorites;
				$('.video-preview[data-id='+videoId+']').removeClass('favorited').find('.video-preview-favorite').prop('title', 'Add to favorites');
				$('#favorite-video[data-id='+videoId+']').removeClass('active').prop('title', 'Add to favorites');
			} else {
				curFavoriteVideoList.push(videoId);
				user.data.favoriteVideoList.push( {'video_id':videoId,'added':Math.floor(Date.now()/1000)} );
				$('.video-preview[data-id='+videoId+']').addClass('favorited').find('.video-preview-favorite').prop('title', 'Remove from favorites');
				$('#favorite-video[data-id='+videoId+']').addClass('active').prop('title', 'Remove from favorites');
			}
			userSaveData(function(){
				zeroFrame.cmd('wrapperNotification', ['done', 'Settings saved!', 5000]);
			});
		} else {
			zeroFrame.cmd('wrapperNotification', ['info', 'You need to log in to use favorites', 5000]);
		}
	}
	function setFavorites(){
		if (user.name!=''){
			$('.video-preview').each(function(index){
				var curPreview = $(this);
				var videoId = curPreview.data('id');
				var idIndex = curFavoriteVideoList.indexOf(videoId);
				if (idIndex>-1){
					curPreview.addClass('favorited').find('.video-preview-favorite').prop('title', 'Remove from favorites');
				}
			});
			$('#favorite-video').each(function(index){
				var curPreview = $(this);
				var videoId = curPreview.data('id');
				var idIndex = curFavoriteVideoList.indexOf(videoId);
				if (idIndex>-1){
					curPreview.addClass('active').prop('title', 'Remove from favorites');
				}
			});			
		} else {
			$('.video-preview').each(function(index){
				var curPreview = $(this);
				var videoId = curPreview.data('id');
				curPreview.removeClass('favorited').find('.video-preview-favorite').prop('title', 'Add to favorites');
			});
			$('#favorite-video').each(function(index){
				var curPreview = $(this);
				var videoId = curPreview.data('id');
				var idIndex = curFavoriteVideoList.indexOf(videoId);
				if (idIndex>-1){
					curPreview.removeClass('active').prop('title', 'Add to favorites');
				}
			});	
		}
	}
	function loadLastAdded(){
		var retSection = '';
		zeroFrame.cmd('dbQuery', ["SELECT * FROM video ORDER BY date DESC LIMIT 0,10"], function(video){
			if((!video.error)&&(video.length>0)){
				retSection +=  '<div id="last-added"><h2>Last added</h2><div class="video-list">';
				$.each(video, function(index, item){
					retSection += videoPreview(item);
				});
				retSection +=  '<div class="clear"></div></div></div>';
				$('#index').append(retSection);
				$('.lazyload').Lazy({visibleOnly:true});
				setFavorites();
			}
		});
	}
	function loadRandomPick(){
		var retSection = '';
		zeroFrame.cmd('dbQuery', ["SELECT COUNT(id) AS cnt FROM video"], function(cnt){
			if((!cnt.error)&&(cnt.length>0)){
				var videoCnt = cnt[0].cnt - 10;
				if (videoCnt>=5){
					var videoList = '';
					var arr = [];
					while(arr.length < 5){
						var r = Math.floor(Math.random()*videoCnt) + 1;
						if(arr.indexOf(r) === -1){
							arr.push(r);
							videoList += r+',';
						}
					}
					videoList = videoList.replace(/,\s*$/, '');
					zeroFrame.cmd('dbQuery', ["SELECT * FROM video WHERE id IN ("+videoList+") LIMIT 0,5"], function(video){
						if((!video.error)&&(video.length>0)){
							retSection +=  '<div id="random-pick"><h2>Random pick</h2><div class="video-list">';
							$.each(video, function(index, item){
								retSection += videoPreview(item);
							});
							retSection +=  '<div class="clear"></div></div></div>';
							$('#index').append(retSection);
							$('.lazyload').Lazy({visibleOnly:true});
							setFavorites();
							loadDistributionHelp();
						}
					});
				}
			}
		});
	}
	function loadAllVideos(){
		var retSection = '';
		zeroFrame.cmd('dbQuery', ["SELECT * FROM video ORDER BY date DESC"], function(video){
			if((!video.error)&&(video.length>0)){
				retSection +=  '<h1>All videos</h1><div class="video-list">';
				$.each(video, function(index, item){
					retSection += videoPreview(item);
				});
				retSection +=  '<div class="clear"></div></div></div>';
				$('#all').html(retSection).removeClass('hidden');
				$('.lazyload').Lazy({visibleOnly:true});
				setFavorites();
			} else {
				$('#all').html('<div id="error">No result</div>').removeClass('hidden');
			}
		});
	}
	function loadFavoritesVideos(){
		if (user.name!=''){
			if (curFavoriteVideoList.length!=0){
				var retSection = '';
				zeroFrame.cmd('dbQuery', ["SELECT * FROM video ORDER BY date DESC"], function(video){
					if((!video.error)&&(video.length>0)){
						retSection +=  '<h1>Favorites</h1><div class="video-list">';
						$.each(video, function(index, item){
							if (curFavoriteVideoList.indexOf(item.id)>-1){
								retSection += videoPreview(item);
							}
						});
						retSection +=  '<div class="clear"></div></div></div>';
						$('#favorites').html(retSection).removeClass('hidden');
						$('.lazyload').Lazy({visibleOnly:true});
						setFavorites();
					} else {
						$('#favorites').html('<h1>Favorites</h1><div id="error">No result</div>').removeClass('hidden');
					}
				});
			} else {
				$('#favorites').html('<h1>Favorites</h1><div id="error">No result</div>').removeClass('hidden');
			}
		} else {
			$('#favorites').html('<div id="error">You need to log in to use favorites</div>').removeClass('hidden');
		}
	}
	function preloadBigfile(id){
		zeroFrame.cmd('dbQuery', ["SELECT * FROM video WHERE id="+id], function(video){
			if((!video.error)&&(video.length>0)){
				$.each(video, function(index, item){
					zeroFrame.cmd('fileNeed', ['./data/site/video/' + item.id + '.mp4'], function(result){
						if (result=='ok'){
							console.log('[FC] additional bigfile loaded');
						} else {
							console.log('[FC] bigfile loading error');
						}
					});
				});
			}
		});
	}
	function loadDistributionHelp(){
		zeroFrame.cmd('dbQuery', ["SELECT COUNT(id) AS cnt FROM video"], function(cnt){
			if((!cnt.error)&&(cnt.length>0)){
				var videoCnt = cnt[0].cnt;
				var r = Math.floor(Math.random()*videoCnt) + 1
				preloadBigfile(r);
			}
		});
	}

	function mainContentLoader(){
		console.log('[FC] content');
		switch(mode){
			case 'index':
				zeroFrame.cmd('dbQuery', ["SELECT t.id AS id, t.tag AS tag, count(tv.video_id) AS cnt FROM tag AS t, tag2video AS tv WHERE t.id=tv.tag_id GROUP BY tag ORDER BY cnt DESC, tag ASC"], function(tag){
					var result = '';
					if((!tag.error)&&(tag.length>0)){
						result +=  '<div id="tag-cloud"><h2>Tags</h2><div class="tag-list">';
						var showAll = false;
						$.each(tag, function(index, item){
							var displayClass = '';
							if (item.cnt<80){
								displayClass = ' hidden';
								showAll = true;
							}
							result +=  '<a href="./?tag:'+item.id+'" class="tag-item'+displayClass+'"><div class="tag-item-tag">'+item.tag+'</div><div class="tag-item-count">'+item.cnt+'</div></a>';
						});
						if (showAll){
							result +=  '<a href="#" id="show-all-tags">More...</a>';
						}
						result +=  '<div class="clear"></div></div></div>';
						$('#index').html(result).removeClass('hidden');
						$.when( loadLastAdded() ).then( loadRandomPick() );
					} else {
						result = '<div id="error">No result</div>';
						$('#index').html(result).removeClass('hidden');
						window.location.reload(false);
					}
				});
			break;
			case 'all':
				loadAllVideos();
			break;
			case 'favorites':
				loadFavoritesVideos();
			break;
			case 'video':
				zeroFrame.cmd('dbQuery', ["SELECT * FROM video WHERE `id`="+id], function(video){
					var result = '';
					if((!video.error)&&(video.length>0)){
						item = video[0];
						var tags = '';
						zeroFrame.cmd('dbQuery', ["SELECT t.* FROM tag AS t, tag2video AS tv WHERE tv.tag_id=t.id AND tv.video_id="+item.id+" ORDER BY t.tag ASC"], function(tag){
							var tagList = '';
							var tagCount = 0;
							if((!tag.error)&&(tag.length>0)){
								$.each(tag, function(tagIndex, tagItem){
									tags += '<a href="./?tag:'+tagItem.id+'" class="tag">'+tagItem.tag+'</a>';
									tagList += tagItem.id + ',';
									tagCount++;
								});
								tagList = tagList.replace(/(^,)|(,$)/g, '');
							}
							var prev = '';
							if (item.prev_id!=0){
								prev = '<a href="./?video:'+item.prev_id+'" id="prev-video" title="Previous video">&lt;</a>';
							}
							var next = '';
							if (item.next_id!=0){
								next = '<a href="./?video:'+item.next_id+'" id="next-video" title="Next video">&gt;</a>';
							}
							result += '<div id="player-wrapper">'+prev+'<div id="player"><video width="960" height="540" controls preload="auto" poster="./data/site/cover/'+item.id+'.jpg"><source src="./data/site/video/'+item.id+'.mp4" type="video/mp4"></video></div>'+next+'</div><div id="info"><h1>'+item.title+'</h1></div><div id="favorite-video" data-id="'+item.id+'" title="Add to favorites"></div><div id="tags">'+tags+'</div><div id="recommended"></div>';
							$('#video').html(result).removeClass('hidden');
							$("#player video").prop('volume', 0.5);
							setFavorites();
							if (tagList!=''){
								var recommendedVideoList = '';
								zeroFrame.cmd('dbQuery', ["SELECT v.*, count(*) AS cnt FROM video AS v, tag2video AS tv WHERE tv.video_id=v.id AND v.id!="+id+" AND v.next_id!="+id+" AND v.prev_id!="+id+" AND tv.tag_id IN ("+tagList+") GROUP BY v.id HAVING cnt>="+(Math.floor(tagCount/4))+" ORDER BY cnt DESC LIMIT 0,5"], function(recommendedVideo){
									$.each(recommendedVideo, function(recommendedVideoIndex, recommendedVideoItem){
										recommendedVideoList += videoPreview(recommendedVideoItem);
									});
									if (recommendedVideoList!=''){
										$('#recommended').html('<h2>Recommended</h2><div class="video-list">'+recommendedVideoList+'<div class="clear"></div></div>');
										$('.lazyload').Lazy({visibleOnly:true});
										setFavorites();
									}
								});
							}
						});
					} else {
						result = '<div id="error">Video not found</div>';
						$('#video').html(result).removeClass('hidden');
					}
				});
			break;
			case 'tag':
				zeroFrame.cmd('dbQuery', ["SELECT * FROM tag WHERE id="+id], function(tag){
					var result = '';
					if((!tag.error)&&(tag.length>0)){
						result += '<h1>Tag: '+tag[0].tag+'</h1>';
						zeroFrame.cmd('dbQuery', ["SELECT v.* FROM video AS v, tag2video AS tv WHERE v.id=tv.video_id AND tv.tag_id="+id+" ORDER BY date DESC"], function(video){
							if((!video.error)&&(video.length>0)){
								result += '<div class="video-list">';
								$.each(video, function(index, item){
									var itemDate = new Date(item.date*1000);
									result += videoPreview(item);
								});
								result +=  '<div class="clear"></div></div>';
							} else {
								result += '<div id="error">No result</div>';
							}
							$('#tag').html(result).removeClass('hidden');
							$('.lazyload').Lazy({visibleOnly:true});
							setFavorites();
						});
					} else {
						result = '<div id="error">Tag not found</div>';
						$('#tag').html(result).removeClass('hidden');
					}
				});
			break;
		}
		$('#loading').addClass('hidden');
	}

	$(document).on('mouseenter', '.video-preview', function(){
		var preview = $(this).find('.video-preview-video video').get(0);
		if (preview.paused){
			preview.play();
		}
		preloadBigfile($(this).data('id'));
		return false;
	}).on('mouseleave', '.video-preview', function(){
		var preview = $(this).find('.video-preview-video video').get(0);
		preview.pause();
		return false;
	}).on('click', '.video-preview-favorite', function(e){
		e.preventDefault();
		var videoId = $(this).closest('.video-preview').data('id');
		favoriteVideo(videoId);
		return false;
	});
	$(document).on('click', '#favorite-video', function(e){
		var videoId = $(this).data('id');
		favoriteVideo(videoId);
		return false;
	});
	$(document).on('click', '#show-all-tags', function(e){
		$('.tag-item.hidden').removeClass('hidden');
		$('#show-all-tags').hide();
		return false;
	});
});