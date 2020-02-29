if (ZeroFrame.prototype.getQueryVariable==null) ZeroFrame.prototype.getQueryVariable = function(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

if (ZeroFrame.prototype.fillRule==null) ZeroFrame.prototype.fillRule = function(o,card_data) {
	var p,c
	c = o.childNodes
	for (var j=0; j < c.length; j++){
		if (c[j].className == "card_header"){
			ch= c[j].childNodes
			for (var n=0; n < ch.length; n++){
				if (ch[n].className == "card_title"){
					if(card_data.card_id<999 && window.location.href.indexOf("_r.html") > -1){
					  ch[n].innerHTML = "<b>"+(842-card_data.card_id)+": "+card_data.rule_title+"</b>"
					}else{
					  ch[n].innerHTML = "<b>"+card_data.rule_title+"</b>"
					}
				} 
			}
		}
		if (c[j].className == "rule_body"){
			c[j].innerHTML = card_data.rule
		}
	}
}

if (ZeroFrame.prototype.fillCard==null) ZeroFrame.prototype.fillCard = function(card_div_o,card_data){
	var j=0
	var z=0
	var o,c,ch,buffer1,buffer2,buffer3
	card_div_o.style.backgroundImage = "url('data/img_cards/" + card_data.color +"_back.jpg')"
	card_div_o.style.borderColor=this.BorderColor(card_data.color)
	//card_div_o.innerHTML+='<span style="position: absolute;top: 0px;"><img src="data/img/frame.png"></img></span>'
	c = card_div_o.childNodes
	for (var m=0; m < c.length; m++){
		if (c[m].className == "card_header"){
			ch= c[m].childNodes
			for (var n=0; n < ch.length; n++){
				if (ch[n].className == "card_title"){
					ch[n].innerHTML = "<b>"+card_data.title+"</b>"
  			  if(card_data.color.indexOf("rueckseite") > -1) ch[n].style.display = "none"
				} else if (ch[n].className == "card_cost"){
					buffer1=card_data.cost.replace(/[^0-9XY]/g,"")
					buffer2=this.ManaReplace(card_data.cost.replace(/[0-9XY]/g,""),true)
					ch[n].innerHTML = buffer1 + buffer2
  			  if(card_data.color.indexOf("rueckseite") > -1) ch[n].style.display = "none"
				}
			}
		}
		if (c[m].className == "card_type"){
			c[m].innerHTML = card_data.type
		} else if (c[m].className == "card_pic"){
			if (card_data.pic){
				c[m].style.backgroundImage = 'url(data/img_cards/img_' + card_data.card_id.toString() + '.jpg)'
			}else{
				c[m].style.backgroundImage = 'url(data/img_cards/img_skizze_' + card_data.card_id.toString() + '.jpg)'
			}
  		if(card_data.color.indexOf("rueckseite") > -1) c[m].style.display = "none"
		}else if (c[m].className == "card_body"){
			c[m].innerHTML = this.ManaReplace(card_data.body)						 
		}else if (c[m].className == "card_extra"){
			c[m].innerHTML = card_data.extra
		}else if (c[m].className == "card_cost"){
			c[m].innerHTML = card_data.cost
		}else if (c[m].className == "card_strength"){
			c[m].innerHTML = card_data.strength
		}
	}
}

if (ZeroFrame.prototype.BorderColor==null) ZeroFrame.prototype.BorderColor = function(color){
	var buffer
	if (color=="blue") buffer="#3b4381";
	else if (color=="green") buffer="#4a813b";
	else if (color=="red") buffer="#81433b";
	else if (color=="black") buffer="#000000";
	else if (color=="white") buffer="#60c4b5";
	else buffer="#bdc3c2";
	return(buffer);
}

if (ZeroFrame.prototype.ManaReplace==null) ZeroFrame.prototype.ManaReplace = function(textvar,cost=false){
	if(cost)textvar=textvar.replace(/G/g, "_G_").replace(/W/g, "_W_").replace(/S/g, "_S_").replace(/R/g, "_R_").replace(/B/g, "_B_")
	else textvar=textvar.replace(/->/g, "&#8631;").replace(/_1_/g, "&#10112;").replace(/_2_/g, "&#10113;").replace(/_3_/g, "&#10114;").replace(/_4_/g, "&#10115;").replace(/_5_/g, "&#10116;").replace(/_6_/g, "&#10117;")
	return(textvar.replace(/_G_/g, '<img  class="mana_img_cost"  src="data/img/mana_green.gif"></img>').replace(/_S_/g, '<img  class="mana_img_cost"  src="data/img/mana_black.gif"></img>').replace(/_R_/g, '<img  class="mana_img_cost"  src="data/img/mana_red.gif"></img>').replace(/_B_/g, '<img  class="mana_img_cost"  src="data/img/mana_blue.gif"></img>').replace(/_W_/g, '<img  class="mana_img_cost"  src="data/img/mana_white.gif"></img>'));
}

if (ZeroFrame.prototype.loadCards_byname==null) ZeroFrame.prototype.loadCards_byname = function() {
	var all
	var o
	var to_print = []
	var j=0
	var o,buffer1,buffer2,buffer3
	var ids=this.getQueryVariable("ids").split(",").sort(function (a, b) {	return a - b;	 })
	this.cmd("dbQuery", ["SELECT * FROM cards ORDER BY card_id ASC"], (cards) => {
		cards.forEach(function(element){
			while(element.card_id==ids[j]){
				to_print[j]=element
				j++;
			}
		})
		//***
		all=document.getElementsByClassName("card_div_print")
		for(var l=0; l<all.length; l++){
			if(l>to_print.length-1 ||to_print[l].card_id==0 ){
				all[l].innerHTML=""
				all[l].style.backgroundColor = "#ffffff"
				all[l].style.backgroundImage = ""
				}else this.fillCard(all[l],to_print[l]);
			}
		//***
		})
}

if (ZeroFrame.prototype.loadRules_byname==null) ZeroFrame.prototype.loadRules_byname = function() {
	var all
	var o
	var to_print = []
	var j=0
	var o,buffer1,buffer2,buffer3
	var ids=this.getQueryVariable("ids").split(",").sort(function (a, b) {	return b -a ;	 })
	this.cmd("dbQuery", ["SELECT * FROM cards ORDER BY card_id ASC"], (cards) => {
		cards.forEach(function(element){
			while(element.card_id == 842-ids[j]){
				to_print[j]=element
				j++;
			}
		})
		//***
		all=document.getElementsByClassName("rule_div_print")
		for(var l=0; l<all.length; l++){
			if(l>to_print.length-1 ||to_print[l].card_id==0 ){
				all[l].innerHTML=""
				all[l].style.backgroundColor = "#ffffff"
				all[l].style.backgroundImage = ""
				}else this.fillRule(all[l],to_print[l]);
			}
		//***
		})
}

if (ZeroFrame.prototype.loadCards_byid==null) ZeroFrame.prototype.loadCards_byid = function() {
	var o,p
	this.cmd("dbQuery", ["SELECT * FROM cards"], (cards) => {
		for (var i=0; i < cards.length; i++) {
			if (o = document.getElementById("rule_" + cards[i].card_id.toString())){
				if(cards[i].rule_title != ""){
					this.fillRule(o,cards[i])
				}else{
					o.style.display="none"
				}
			}
			if (o = document.getElementById("card_" + cards[i].card_id.toString())){
				this.fillCard(o,cards[i])
				if(p=document.getElementById("card_tab"+cards[i].card_id.toString())){
					p.innerHTML='<b>'+cards[i].card_id+'</b>'
					if(cards[i].taken){
						p.innerHTML+='<img align="right" class="info" src="data/img/icon_taken.gif"></img>'
					}
					if(cards[i].token){
						p.innerHTML+='<img align="right" class="info" src="data/img/icon_crypto.gif"></img>'
					}
					if(!cards[i].pic){
						p.innerHTML+='<img align="right" class="info" src="data/img/icon_info.gif"></img>'
					}
				}
				if(p=document.getElementById("rule_tab"+cards[i].card_id.toString())){
					p.innerHTML='<b>'+(842-cards[i].card_id)+'</b>'
				}
			}
		}
	})
}

if (ZeroFrame.prototype.dump_all_cards==null) ZeroFrame.prototype.dump_all_cards = function() {
	var o,c,ch,buffer1
	buffer1 = '<table>'
	this.cmd("dbQuery", ["SELECT * FROM cards"], (cards) => {
		for (var i=cards.length-1; i >= 0; i--) {
			if(cards[i].rule_title && cards[i].card_id < 841 && cards[i].title){
				buffer1 +=	'<tr><td width="325"><div class="card_tab" id="rule_tab'+cards[i].card_id+'">..</div><div id="rule_'+cards[i].card_id+'" class="rule_div">	<div class="card_header"><span class="card_title"></span></div><div class="rule_body">..</div>		</div>	</td>		<td width="325">	<div class="card_tab" id="card_tab'+cards[i].card_id+'">..</div><a href="einzel.html?ids='+cards[i].card_id+'" class="cardlink">	 <div id="card_'+cards[i].card_id+'" class="card_div"><div class="card_header"> <span class="card_title"></span><span class="card_cost">..</span></div>			<div class="card_pic" style="background-image: url(data/img_cards/img_blank.jpg);"></div><div class="card_type"></div>		<div class="card_body"></div>		<div class="card_extra"></div>		<div class="card_strength"></div>	 </div>	 </a>	 </td></tr>'
			}
		}
	buffer1 += '</table>'
	o = document.getElementById("card_dump");
	o.innerHTML = buffer1
	})
}

if (ZeroFrame.prototype.dump_all_cards_vert==null) ZeroFrame.prototype.dump_all_cards_vert = function() {
	var o,c,ch,buffer1,query
	var counter=0
	var qv=this.getQueryVariable("filter")
	var filter=qv
	if (filter=='legende'){
		query="SELECT * FROM cards where type like '%Legende%' "
	}else if (filter=='krypto'){
		query="SELECT * FROM cards where token!='' "
	}else if (filter=='green'){
		query="SELECT * FROM cards where color='green' "
	}else if (filter=='blue'){
		query="SELECT * FROM cards where color='blue' "
	}else if (filter=='red'){
		query="SELECT * FROM cards where color='red' "
	}else if (filter=='black'){
		query="SELECT * FROM cards where color='black' or color='light_black' "
	}else if (filter=='white'){
		query="SELECT * FROM cards where color='white' or color='dark_white' or color='light_white' "
	}else if (filter=='none'){
		query="SELECT * FROM cards where color='artifact' or color='sky' or color='land' or color='light_grey' "
	}else{
		query="SELECT * FROM cards "
	}
	buffer1 = '<table><tr>'
	this.cmd("dbQuery", [query], (cards) => {
		for (var i=0; i<cards.length; i++) {
			if(cards[i].card_id < 841 && cards[i].title && cards[i].type){
				buffer1 +=	'<td><span class="tab_div">id=<b>'+cards[i].card_id+'</b></span>&nbsp;<span onClick="increase('+cards[i].card_id+');" class="tab_div_b">+</span><span onClick="decrease('+cards[i].card_id+');" class="tab_div_b">-</span>&nbsp;<span id="card_counter_'+cards[i].card_id+'" class="tab_div_b">0</span>	<div style="margin-top: 1px;" id="card_'+cards[i].card_id+'" class="card_div"><div class="card_header"> <span class="card_title"></span><span class="card_cost">..</span></div>			<div class="card_pic" style="background-image: url(data/img_cards/img_blank.jpg);"></div><div class="card_type"></div>		<div class="card_body"></div>		<div class="card_extra"></div>		<div class="card_strength"></div>	 </div>	</td>'
				counter++
				if (counter==4){
					buffer1+='</tr><tr>'
					counter=0
				}
			}
		}
	buffer1 += '</tr></table>'
	o = document.getElementById("card_dump");
	o.innerHTML = buffer1
	})
}
