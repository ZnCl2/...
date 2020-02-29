                function setDjSessionVar(cname,cvalue)
                {
                                var x = getDjSession();
                                x[cname]=cvalue;
                                var sessionStrs=[];
                                for (s in x) sessionStrs.push(s+'='+x[s]);
                                document.cookie= "DJSESSION=" + encodeURIComponent(sessionStrs.join('||')) + ";expires=0;domain=.wsj.com;path=/";
                }
                function getDjSessionVar(cname){
                                return getDjSession()[cname];
                }
                function getDjSession(){
								if(typeof String.prototype.trim !== 'function') 
								{
									String.prototype.trim = function() 
									{
										return this.replace(/^\s+|\s+$/g, ''); 
									}
								}				
                                var ca = document.cookie.split(';');
                                var sessionStr="";
                                var session={};
                                for(var i=0; i<ca.length; i++) 
                                {
                                                var c = ca[i].trim();
                                                if (c.indexOf("DJSESSION=")==0) sessionStr=c.replace("DJSESSION=","");
                                }
                                sessionStr=decodeURIComponent(sessionStr);
                                if (sessionStr) {
                                                sessionStr.split('||').forEach(function(x){
                                                                if (x && x.indexOf('=')>0)
                                                                session[x.split('=')[0]]=x.split('=')[1];
                                                })
                                }
                                return session;
                }
                var checkMobileArticle=function(){
                                var linkRegex=/http:\/\/(.+)\/(gb)\/([0-9]{8})\/([A-Z]{3})([A-Z])?\-?([0-9]{8})?([A-Z]{1,3})?([0-9]{6})([0-9]{1,3})?.asp(\?.{0,})?/i;
                                var navRegex=
                                /http:\/\/(.+)\/(big5|gb)\/(.+\.asp)/;
                                if (document.location.pathname.split('/')[1].toLowerCase()!='gb') return;
                                
                                var host='http://m.cn.wsj.com';
                                var navMap={
                                  "index.asp": "/",
                                  "2013forecast.asp": "/",
                                  "plenary.asp": "/",
                                  "boxilai.asp": "/",
                                  "snowden.asp": "/",
                                  "gold.asp": "/",
                                  "rtchome.asp": "/",
                                  "population.asp": "/",
                                  "luxdesign.asp": "/",
                                  "bch.asp": "/china-news",
                                  "checo.asp": "/china-news",
                                  "chinastock.asp": "/china-news",
                                  "chw.asp": "/china-news",
                                  "strhrd.asp": "/china-news",
                                  "ch.asp": "/china-news",
                                  "hkmain.asp": "/china-news",
                                  "and.asp": "/china-news",
                                  "globe.asp": "/china-news-world",
                                  "bus.asp": "/china-news-world",
                                  "bas.asp": "/china-news-world",
                                  "beu.asp": "/china-news-world",
                                  "ecm.asp": "/china-news-world",
                                  "japan.asp": "/china-news-world",
                                  "india.asp": "/china-news-world",
                                  "nkorea.asp": "/china-news-world",
                                  "economy.asp": "/china-economy",
                                  "ecb.asp": "/china-economy",
                                  "ecoplt.asp": "/china-economy",
                                  "ecodata.asp": "/china-economy",
                                  "labor.asp": "/china-economy",
                                  "ffe.asp": "/china-economy",
                                  "mgt.asp": "/china-economy",
                                  "mga.asp": "/china-economy",
                                  "markets.asp": "/china-markets",
                                  "usstock.asp": "/china-markets",
                                  "hkstock.asp": "/china-markets",
                                  "forex.asp": "/china-markets",
                                  "cbk.asp": "/china-markets",
                                  "blk.asp": "/china-markets",
                                  "ma.asp": "/china-markets",
                                  "stk.asp": "/china-markets",
                                  "marketwatch.asp": "/china-markets",
                                  "arpt.asp": "/china-markets",
                                  "marketdata_home.asp": "/china-markets",
                                  "money.asp": "/china-personal-finance",
                                  "roi.asp": "/china-personal-finance",
                                  "inv.asp": "/china-personal-finance",
                                  "iiv.asp": "/china-personal-finance",
                                  "pal.asp": "/china-personal-finance",
                                  "csi.asp": "/china-personal-finance",
                                  "guw.asp": "/china-personal-finance",
                                  "column.asp": "/china-column",
                                  "cws.asp": "/china-column",
                                  "edr.asp": "/china-column",
                                  "llw.asp": "/china-column",
                                  "ygh.asp": "/china-column",
                                  "wxh.asp": "/china-column",
                                  "hjm.asp": "/china-column",
                                  "chy.asp": "/china-column",
                                  "wes.asp": "/china-column",
                                  "brf.asp": "/china-column",
                                  "lxl.asp": "/china-column",
                                  "shy.asp": "/china-column",
                                  "life.asp": "/china-life-style",
                                  "inno2013.asp": "/china-life-style",
                                  "msh.asp": "/china-life-style",
                                  "sceneasia.asp": "/china-life-style",
                                  "fashion.asp": "/china-life-style",
                                  "style.asp": "/china-life-style",
                                  "trv.asp": "/china-life-style",
                                  "movie.asp": "/china-life-style",
                                  "wine.asp": "/china-life-style",
                                  "ahd.asp": "/china-life-style",
                                  "hea.asp": "/china-life-style",
                                  "wvh.asp": "/china-life-style",
                                  "ien.asp": "/china-life-style",
                                  "czxt.asp": "/china-life-style",
                                  "luxmain.asp": "/china-luxury",
                                  "luxfashion.asp": "/china-luxury",
                                  "luxjourney.asp": "/china-luxury",
                                  "luxtravel.asp": "/china-luxury",
                                  "luxfood.asp": "/china-luxury",
                                  "luxjoy.asp": "/china-luxury",
                                  "management.asp": "/china-career-management",
                                  "eoe.asp": "/china-career-management",
                                  "mba.asp": "/china-career-management",
                                  "powerlist.asp": "/china-career-management",
                                  "yet.asp": "/china-career-management",
                                  "yal.asp": "/china-career-management",
                                  "industry.asp": "/",
                                  "finance.asp": "/",
                                  "energy.asp": "/",
                                  "auto.asp": "/",
                                  "phar.asp": "/",
                                  "media.asp": "/",
                                  "consumer.asp": "/",
                                  "industrial.asp": "/",
                                  "smallbusiness.asp": "/",
                                  "realestate.asp": "/",
                                  "tech.asp": "/china-technology",
                                  "atc.asp": "/china-technology",
                                  "ptk.asp": "/china-technology",
                                  "mmb.asp": "/china-technology",
                                  "cgq.asp": "/china-technology",
                                  "hpj.asp": "/china-technology",
                                  "ljs.asp": "/china-technology",
                                  "shj.asp": "/china-technology",
                                  "internet.asp": "/china-technology",
                                  "telecom.asp": "/china-technology",
                                  "computer.asp": "/china-technology",
                                  "software.asp": "/china-technology",
                                  "asiad.asp": "/china-technology",
                                  "opinion.asp": "/china-opinion",
                                  "ggl.asp": "/china-opinion",
                                  "djl.asp": "/china-opinion",
                                  "yxz.asp": "/china-opinion",
                                  "lhb.asp": "/china-opinion",
                                  "zqf.asp": "/china-opinion",
                                  "yma.asp": "/china-opinion",
                                  "ljn.asp": "/china-opinion",
                                  "xug.asp": "/china-opinion",
                                  "hyf.asp": "/china-opinion",
                                  "opn.asp": "/china-opinion",
                                  "col.asp": "/china-opinion",
                                  "let.asp": "/china-opinion",
                                  "dis.asp": "/china-opinion"
                                }
                                var getIdFromLink=function(link){
                                                var self=this;
                                                if (linkRegex.test(link)){
                                                                var id=link.replace(linkRegex,function(str, www, encoding, date, code, opt, date2, opt2, time, t, query){
                                                                                var sDate='20140131';
                                                                                var excludeTypes=['VOT','DIS','CAR','PHO','ATG']
                                                                                if ((date > sDate) && (excludeTypes.indexOf(code)<0)){
                                                                                                return ('CN-' + code + '-' + (opt||'') + (date2||'') + (opt2||'') + (t||'') + date + time)
                                                                                }
                                                                                else {
                                                                                                return '';
                                                                                }
                                                                });
                                                                return id.toUpperCase();
                                                }
                                                else return '';
                                };
                                var id=getIdFromLink(window.location.href);
                                var redirToMobile=getDjSessionVar('mcookie')=='force-mobile';
                                //var mobileAgents=['Android','iPhone','iPod','BlackBerry','BB10']; 
                                //mobileAgents.forEach(function(agent){
                                //              if (navigator.userAgent.indexOf(agent)>=0){redirToMobile=true;}
                                //});
                                var USER_AGENTS = [
                                  new RegExp('iPhone OS [4-8]', 'i')
                                , new RegExp('Android [3-8].*Mobile', 'i')
                                , new RegExp('\\(BB10;.*\\)', 'i')
                                , new RegExp('Tizen.*Mobile', 'i')
                                ];
                                
                                for (var i = 0;i < USER_AGENTS.length; i++) {
                                                if (navigator.userAgent.match(USER_AGENTS[i])) {
                                                  redirToMobile=true;
                                                }
                                }
                                
                                var navPage=document.location.href.replace(navRegex,function(str,www,enc,page){return page.toLowerCase()})
                                navPage=navMap[navPage];
                                
                                if ((redirToMobile && getDjSessionVar('mcookie')!='force-desktop')) {

                                                var query = 'mod=desktop';
                                                if(window.location.href.indexOf('?') != '-1'){
                                                                query = query + '&' + window.location.href.slice(window.location.href.indexOf('?') + 1);
                                                }
                                                if (id){
                                                                window.location=(host+'/articles/'+id+'?'+query);
                                                }
                                                else if (navPage){
                                                                window.location=(host+navPage+'?'+query);
                                                }
                                }
                }();
