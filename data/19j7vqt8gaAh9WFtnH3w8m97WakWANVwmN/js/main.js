class Page extends ZeroFrame {
  setSiteInfo(site_info) {
    this.site_info = site_info;
    this.chain.handleSiteInfo(this.site_info); //handle site_info event

    var user = document.getElementById("user");
    if(this.site_info.cert_user_id)
      user.innerHTML = this.site_info.cert_user_id;
    else
      user.innerHTML = "login...";

    this.refresh(); //refresh display
  }

  onOpenWebsocket() {
    this.cmd("siteInfo", [], function(site_info) {
      page.setSiteInfo(site_info)
    })

    // init data
    var _this = this;

    this.user = document.getElementById("user");
    this.users = document.getElementById("users");
    this.money = document.getElementById("money");
    this.bet = document.getElementById("bet");
    this.info = document.getElementById("info");
    this.stats = document.getElementById("stats");
    this.history = document.getElementById("history");

    this.user.onclick = function(e){
      e.preventDefault();
      _this.cmd("certSelect", {"accepted_domains": ["zeroid.bit"]});
    }

    this.bet.onclick = function()
    {
      // bet money
      var amount = parseInt(_this.money.value);
      if(_this.site_info.cert_user_id){
        if(amount > 0 && amount <= _this.getMoney(_this.site_info.auth_address))
          _this.chain.push({act: "bet", amount: amount});
        else
        _this.cmd("wrapperNotification", ["error", "money should be > 0 and <= "+_this.getMoney(_this.site_info.auth_address)]);
      }
      else
        _this.cmd("wrapperNotification", ["error", "not logged"]);
    }

    document.getElementById("cleanup").onclick = function(e){ e.preventDefault(); if(_this.site_info.cert_user_id) _this.chain.cleanup(); }
    document.getElementById("purge").onclick = function(e){ e.preventDefault(); if(_this.site_info.cert_user_id) _this.chain.cleanup(true); }

    //create game chain
    this.chain = new zchain("bet", this);

    this.chain.addBuildCallback(function(state, pre){
      if(pre){ //prebuild
        state.users = {}
        _this.history.innerHTML = "";
        _this.users.innerHTML = "";
        _this.stats.innerHTML = "build: ";
        state.history = []
        state.rng = new alea("zchain");
        state.wages = Math.ceil((new Date().getTime()-1517426881197)/(1000*3600*24)); //one salary per day
      }
      else{ //postbuild
        _this.refresh();

        //history
        for(var i = 0; i < state.history.length; i++){
          var entry = state.history[i];
          if(entry[1] == 0) //double bet (1/3)
            _this.history.innerHTML += "<span class=\"user\">"+_this.chain.getCertUserId(entry[0])+"</span> win bet (dice "+entry[1]+", + "+entry[2]+" coins) money => "+(entry[3]+entry[2])+"\n";
          else //2/3, loose money
            _this.history.innerHTML += "<span class=\"user\">"+_this.chain.getCertUserId(entry[0])+"</span> loose bet (dice "+entry[1]+", - "+entry[2]+" coins) money => "+(entry[3]-entry[2])+"\n";
        }

        //stats
        var total_size = 0;
        var total_compressed_size = 0;
        var total_blocks = 0;
        var total_valid_blocks = 0;
        var total_used_blocks = 0;

        //- users
        for(var auth in _this.chain.stats.users){
          var ustats = _this.chain.stats.users[auth];
          total_size += ustats.data_size;
          total_compressed_size += ustats.data_compressed_size;
          total_blocks += ustats.blocks;
          total_valid_blocks += ustats.valid_blocks;
          total_used_blocks += ustats.used_blocks;

          _this.users.innerHTML += "<span class=\"user\" "+(_this.site_info.auth_address == auth ? "style=\"color: blue;\"" : "")+">"+_this.chain.getCertUserId(auth)+"</span> => "+ustats.blocks+" blocks | "+Math.round(100-ustats.valid_blocks/ustats.blocks*100)+"% invalid | "+Math.round(100-ustats.used_blocks/ustats.valid_blocks*100)+"% unused | "+ustats.data_size+" bytes ("+Math.round(100-ustats.data_compressed_size/ustats.data_size*100)+"% compressed)\n";

        }

        //- build
        _this.stats.innerHTML += "<br/>- hash = "+_this.chain.stats.built_hash;
        _this.stats.innerHTML += "<br/>- time = "+(_this.chain.stats.build_graph_time+_this.chain.stats.build_check_process_time)+" ms ("+_this.chain.stats.build_graph_time+" + "+_this.chain.stats.build_check_process_time+")";
        _this.stats.innerHTML += "<br/>- built blocks = "+_this.chain.stats.built_blocks;
        _this.stats.innerHTML += "<br/>- total blocks = "+total_blocks+" | "+Math.round(100-total_valid_blocks/total_blocks*100)+"% invalid | "+Math.round(100-total_used_blocks/total_valid_blocks*100)+"% unused";
        _this.stats.innerHTML += "<br/>- total size = "+total_size+" bytes ("+Math.round(100-total_compressed_size/total_size*100)+"% compressed)\n";

      }
    });

    //register game logic (block check)
    this.chain.addCheckCallback(function(state, block){
      if(block.data.act == "bet"){
        var user_money = _this.getMoney(block.owner);
        if(block.data.amount > 0 && block.data.amount <= user_money)
          return true; //valid block
      }
    });

    //register game logic (block processing)
    this.chain.addProcessCallback(function(state, block){
      if(block.data.act == "bet"){ //process bet
        var n = Math.round(state.rng.double()*10)%3;
        var user_money = _this.getMoney(block.owner);
        state.history.push([block.owner, n, block.data.amount, user_money]);

        if(n == 0) //double bet (1/3)
          state.users[block.owner] = user_money+block.data.amount;
        else //2/3, loose money
          state.users[block.owner] = user_money-block.data.amount;
      }
    });

    //load
    this.chain.load();

    //rebuild chain every 1.5 seconds (if no files has been updated, it's a boolean check).
    setInterval(function(){ 
      _this.chain.build();
    }, 1500); 
  }

  onRequest(cmd, message) {
    if (cmd == "setSiteInfo")
      this.setSiteInfo(message.params)
    else
      this.log("Unknown incoming message:", cmd)
  }

  //get one user money
  getMoney(auth_address){
    if(this.chain.state.users){
      var amount = this.chain.state.users[auth_address];
      if(amount != null)
        return amount;
    }
    
    return 10000+1000*this.chain.state.wages; //10000 coins + 1000 per wage
  }

  refresh(){
    var _this = this;
    //refresh display data
    if(this.site_info.cert_user_id){
      this.info.innerHTML = "your balance: "+this.getMoney(this.site_info.auth_address)+" coins";
      var ustats = this.chain.stats.users[this.site_info.auth_address];

      this.cmd("fileGet",["data/users/"+this.site_info.auth_address+"/content.json",false],function(data){
        var tsize = 0;
        data = JSON.parse(data);
        for(var k in data.files)
          tsize += data.files[k].size;

        _this.info.innerHTML += " (size used: "+Math.floor(tsize/10000*100)+"%)";
      });
    }
    else
      this.info.innerHTML = "no account";
  }
}

page = new Page(); //init page

