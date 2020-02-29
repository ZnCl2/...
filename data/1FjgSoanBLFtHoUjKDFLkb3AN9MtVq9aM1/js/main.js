//NOTES:
//timestamp unit is 5 minutes

TravelType = {
  ATTACK: 0,
  DEFEND: 1,
  TRANSPORT: 2,
  RETURN: 3
}

class Page extends ZeroFrame {
  setSiteInfo(site_info) {
    this.site_info = site_info;
    this.game_chain.handleSiteInfo(this.site_info); //handle site_info event

    //listen to config changes
    if(this.site_info.event){
      if(this.site_info.event[0] == "file_done" && this.site_info.event[1] == "config.json")
        this.loadConfig();
    }

    //detect login change
    if(this.login == null || this.login != site_info.cert_user_id){
      this.login = site_info.cert_user_id;

      if(this.site_info.cert_user_id)
        this.e_user.innerHTML = this.site_info.cert_user_id;
      else
        this.e_user.innerHTML = "login...";

      this.refresh();
    }
  }

  loadConfig(){
    var _this = this;
    this.cmd("fileGet", { inner_path: "config.json" }, function(data){
      if(data){
        _this.cfg = JSON.parse(data);
        _this.game_chain.to_build = true; //rebuild chain when the config changes
      }
    });
  }

  onOpenWebsocket() {
    var _this = this;

    //init page

    this.e_user = document.getElementById("user");
    this.e_user.onclick = function(e){
      e.preventDefault();
      _this.cmd("certSelect", {});
    }

    this.e_resources = document.getElementById("resources");
    this.e_city = document.getElementById("city");
    this.e_pop = document.getElementById("pop");
    this.e_buildings = document.getElementById("buildings");
    this.e_units = document.getElementById("units");
    this.e_travels = document.getElementById("travels");

    //init 
    this.cmd("siteInfo", [], function(site_info) {
      _this.setSiteInfo(site_info)
    })

    this.loadConfig();

    //game data
    this.buildings = {
      city_hall: { 
        display_name: "City hall",
        description: "The city hall allow you to upgrade the city (other buildings have their level clamped to the city hall level).",
        max_lvl: 5, //other buildings have a max_lvl of the city_hall lvl
        build_factor: 4, //time/resources base factor (factor^(target_lvl-1)*required to build)
        build_time: 1,
        build_resources: {
          wood: 200
        }
      },
      sawmill: {
        display_name: "Sawmill",
        description: "Wood production.",
        build_factor: 2,
        build_time: 1,
        build_resources: {
          wood: 100
        },
        produce_resources: { //resource produced per time unit
          wood: 10
        }
      },
      farm: {
        display_name: "Farm",
        description: "Food production (population).",
        build_factor: 2,
        build_time: 1,
        build_resources: {
          wood: 100
        }
      },
      barrack: {
        display_name: "Barrack",
        description: "Units training.",
        build_factor: 2,
        build_time: 2,
        build_resources: {
          wood: 200
        }
      }
    }

    this.units = {
      soldier: {
        display_name: "Soldier",
        description: "Simple unit to attack and defend.",
        trainer: "barrack",
        trainer_lvl: 1,
        train_time: 1,
        train_resources: {
          wood: 10
        },
        pop: 1, //population units
        travel_time: 1, 
        travel_capacity: 10, //unit of resources to carry
        attack: 2,
        defense: 2
      },
      soldier2: {
        display_name: "Soldier2",
        description: "Simple unit to attack and defend.",
        trainer: "barrack",
        trainer_lvl: 1,
        train_time: 1,
        train_resources: {
          wood: 10
        },
        pop: 1, //population units
        travel_time: 1, 
        travel_capacity: 10, //unit of resources to carry
        attack: 2,
        defense: 2
      }

    }

    //setup chain
    this.game_chain = new zchain("game", this);

    this.check_acts = {
      build: function(state, block, player_data, data){
        //build order
        var base = _this.buildings[data.building || ""];
        if(base){
          var building = state.computeBuilding(block.owner, data.building, block.data.timestamp);

          //check in construction
          if(building.in_construction)
            return false;

          //check maxlvl
          if(base.max_lvl != null){
            if(building.lvl+1 > base.max_lvl)
              return false;
          }
          else{ //or based on city hall
            var city_hall = state.computeBuilding(block.owner, "city_hall", block.data.timestamp);
            if(building.lvl+1 > city_hall.lvl)
              return false;
          }

          //check resource cost
          var factor = Math.pow(base.build_factor,building.lvl); //+1-1
          for(var resource in base.build_resources){
            if(state.computeResource(block.owner, resource, block.data.timestamp) < base.build_resources[resource]*factor)
              return false;
          }

          return true;
        }
      },
      unbuild: function(state, block, player_data, data){
        //unbuild order (deconstruction, cancel construction)
        var base = _this.buildings[data.building || ""];
        if(base){
          var building = state.computeBuilding(block.owner, data.building, block.data.timestamp);

          //check in construction
          if(building.in_construction || building.lvl > 0)
            return true;
        }
      },
      train: function(state, block, player_data, data){
        //build order
        var unit = _this.units[data.unit || ""];
        if(unit){
          var base = _this.buildings[unit.trainer];
          var building = state.computeBuilding(block.owner, unit.trainer, block.data.timestamp);

          if(base){
            //check amount
            if(!Number.isInteger(data.amount) || data.amount <= 0)
              return false;

            //check population
            var cpop = state.computePopulation(block.owner, block.data.timestamp);
            if(cpop.population+unit.pop*data.amount > cpop.max)
              return false;

            //check resources
            for(var resource in unit.train_resources){
              if(state.computeResource(block.owner, resource, block.data.timestamp) < unit.train_resources[resource]*data.amount)
                return false;
            }

            //final check trainer
            if(building.lvl > 0 && building.lvl >= unit.trainer_lvl)
              return true;
          }
        }
      },
      stop_training: function(state, block, player_data, data){
        return true;
      },
      travel: function(state, block, player_data, data){
        //check units
        if(!data.units)
          return false;

        var capacity = 0;
        for(var unit in data.units){
          var base_unit = _this.units[unit];
          if(!base_unit)
            return false;

          capacity += base_unit.travel_capacity;

          var t_amount = data.units[unit];
          var a_amount = state.computeUnits(block.owner, unit, block.data.timestamp, true);
          if(t_amount <= 0 || t_amount > a_amount)
            return false;
        }

        //check resources
        var total = 0;
        if(data.resources && (data.type == TravelType.DEFEND || data.type == TravelType.TRANSPORT)){
          for(var resource in data.resources){
            var t_amount = data.resources[resource];
            var a_amount = state.computeResource(block.owner, resource, block.data.timestamp);

            total += t_amount;

            if(t_amount <= 0 || t_amount > a_amount)
              return false;
          }
        }
        
        //check capacity
        if(total > capacity)
          return false;

        //final check target
        if(data.target && state.players[data.target] && data.target != block.owner)
          return true;
      },
      cancel_travel: function(state, block, player_data, data){
        var id = data.id;
        var travel = player_data.travels[id];
        if(travel){
          if(travel.type != TravelType.RETURN && (travel.timestamp+travel.time > block.data.timestamp || travel.type == TravelType.DEFEND)) //can cancel first phase and parked units (can't cancel returning travels)
            return true;
        }
      }
    }

    this.process_acts = {
      build: function(state, block, player_data, data){
        var base = _this.buildings[data.building];
        var building = state.computeBuilding(block.owner, data.building, block.data.timestamp);

        //consume build resources
        var factor = Math.pow(base.build_factor, building.lvl); //+1-1
        for(var resource in base.build_resources)
          state.varyResource(block.owner, resource, -base.build_resources[resource]*factor);

        //add previously generated resources (remember production)
        if(building.order_timestamp != null && building.lvl > 0){
          var sfactor = Math.pow(base.build_factor,building.lvl-1); 
          for(var resource in base.produce_resources){
            var amount = base.produce_resources[resource];
            if(amount > 0)
              state.varyResource(block.owner, resource, sfactor*amount*(block.data.timestamp-building.order_timestamp));
          }
        }

        //change building entry
        player_data.buildings[data.building] = {lvl: building.lvl, order_timestamp: block.data.timestamp+factor*base.build_time};
      },
      unbuild: function(state, block, player_data, data){
        var base = _this.buildings[data.building];
        var building = state.computeBuilding(block.owner, data.building, block.data.timestamp);

        var new_lvl = building.lvl-(building.in_construction ? 0 : 1);

        //add previously generated resources (remember production)
        if(!building.in_construction && building.lvl > 0 && building.order_timestamp != null){
          var sfactor = Math.pow(base.build_factor,building.lvl-1); 
          for(var resource in base.produce_resources){
            var amount = base.produce_resources[resource];
            if(amount > 0)
              state.varyResource(block.owner, resource, sfactor*amount*(block.data.timestamp-building.order_timestamp));
          }
        }

        //refund building cost
        var sfactor = Math.pow(base.build_factor,new_lvl); 
        for(var resource in base.build_resources){
          var amount = base.build_resources[resource];
          if(amount > 0)
            state.varyResource(block.owner, resource, sfactor*amount);
        }

        //change building entry
        player_data.buildings[data.building] = {lvl: new_lvl-1, order_timestamp: block.data.timestamp};

        //stop unit training
        if(data.building == "farm") //every trainer
          state.stopTraining(block.owner, null, block.data.timestamp);
        else //only the current building (trainer)
          state.stopTraining(block.owner, data.building, block.data.timestamp);
      },
      train: function(state, block, player_data, data){
        //build order
        var unit = _this.units[data.unit];

        var p_unit = player_data.units[data.unit] || {amount: 0};

        //modify order
        if(p_unit.order_timestamp != null && p_unit.order_timestamp > block.data.timestamp){
          //increase already present order timestamp
          p_unit.ordered += data.amount;
          p_unit.order_timestamp += data.amount*unit.train_time;
        }
        else{
          //save last order training, create new one
          if(p_unit.ordered != null)
            p_unit.amount += p_unit.ordered;
          p_unit.ordered = data.amount;
          p_unit.order_timestamp = block.data.timestamp+data.amount*unit.train_time;
        }
        player_data.units[data.unit] = p_unit;

        //increase pop
        player_data.population += data.amount*unit.pop;

        //consume resources
        for(var resource in unit.train_resources)
          state.varyResource(block.owner, resource, -unit.train_resources[resource]*data.amount);
      },
      stop_training: function(state, block, player_data, data){
        state.stopTraining(block.owner, null, block.data.timestamp);
      },
      travel: function(state, block, player_data, data){
        var travel = {
          type: data.type, 
          units: data.units, 
          resources: data.resources,
          target: data.target,
          from: block.owner
        }

        //consume resources
        if(data.resources && (data.type == TravelType.DEFEND || data.type == TravelType.TRANSPORT)){
          for(var resource in data.resources)
            state.varyResource(block.owner, resource, -data.resources[resource]);
        }
 
        //compute travel time
        var max_travel_time = 0;
        for(var unit in data.units){
          var time = _this.units[unit].travel_time;

          if(time > max_travel_time)
            max_travel_time = time;
        }

        travel.time = max_travel_time;
        travel.timestamp = block.data.timestamp;
        travel.id = player_data.travels.length;

        //player record
        player_data.travels.push(travel);
        //target record
        state.players[data.target].in_travels.push(travel);
      },
      cancel_travel: function(state, block, player_data, data){
        var travel = player_data.travels[data.id];

        var time_done = block.data.timestamp-travel.timestamp;
        if(time_done < travel.time){ //return travel (units/resources)
          travel.type = TravelType.RETURN;
          travel.time = time_done;
          travel.timestamp = block.data.timestamp;
        }
        else{ //TravelType.DEFEND, cancel parked units
          travel.type = TravelType.RETURN;
          travel.timestamp = block.data.timestamp;
          delete travel.resources;
        }
      }
    }

    this.check_types = {
      snapshot: function(state, block){
        if(!block.prev_block){ //check chain origin
          return true;
        }
      },
      register: function(state, block){
        if(!state.players[block.owner])
          return (typeof block.data.city_name == "string"
            && block.data.city_name.length > 0 
            && block.data.city_name.length <= 50);
      },
      actions: function(state, block){
        // process actions
        var player_data = state.players[block.owner];

        var acts = block.data.actions;
        if(player_data && Array.isArray(acts)){
          for(var i = 0; i < acts.length; i++){
            var act = acts[i];
            if(act.length != 2)
              return false;

            var cb = _this.check_acts[act[0]];
            if(cb){
              var ok = cb(state, block, player_data, act[1]);
              if(!ok)
                return false;
            }
            else
              return false;
          }

          return true;
        }
      }
    }

    this.process_types = {
      snapshot: function(state, block){
      },
      register: function(state, block){
        //init player data
        state.players[block.owner] = {
          city_name: block.data.city_name, 
          register_timestamp: block.data.timestamp,
          resources: {
            wood: 500
            //...
          },
          buildings: {},
          units: {},
          travels: [],
          in_travels: [],
          reports: [],
          population: 0
        }
      },
      actions: function(state, block){
        var player_data = state.players[block.owner];
        var acts = block.data.actions;
        for(var i = 0; i < acts.length; i++){
          var act = acts[i];
          _this.process_acts[act[0]](state, block, player_data, act[1]);
        }
      }
    }

    //prechecks
    this.game_chain.addPreCheckCallbacks(function(auth_address){
      //precheck user
      
      //check banned users
      if(_this.cfg && _this.cfg.bans[auth_address])
        return false;
      
      return true;
    }, null);

    //build
    this.game_chain.addBuildCallback(function(state, pre){
      if(pre){ //pre build
        //init data/state
        state.players = {}

        //state API
        //return {lvl: current lvl, in_construction: true/false, order_timestamp: next or previous build timestamp}
        state.computeBuilding = function(user, name, timestamp){
          var player = this.players[user];
          var r = {lvl: 0, in_construction: false}
          if(player){
            var building = player.buildings[name];
            var base = _this.buildings[name];
            if(building){
              r.lvl = building.lvl;
              if(building.order_timestamp != null){
                r.order_timestamp = building.order_timestamp;
                if(timestamp >= building.order_timestamp)
                  r.lvl++;
                else
                  r.in_construction = true;
              }
            }
          }

          return r;
        }

        state.computeResource = function(user, resource, timestamp){
          var player = this.players[user];
          var amount = 0;
          if(player){
            //compute production
            for(var name in player.buildings){
              var base = _this.buildings[name];
              if(base.produce_resources){
                var produced = base.produce_resources[resource];
                if(produced > 0){
                  var building = this.computeBuilding(user, name, timestamp);
                  var factor = Math.pow(base.build_factor,building.lvl-1);
                  if(!building.in_construction)
                    amount += factor*produced*(timestamp-building.order_timestamp);
                }
              }
            }

            //add balance
            if(player.resources[resource] != null)
              amount += player.resources[resource];

            //add incoming transports
            for(var i = 0; i < player.in_travels.length; i++){
              var travel = player.in_travels[i];

              if(travel.timestamp+travel.time >= timestamp
                && travel.resources && (travel.type == TravelType.DEFEND || travel.type == TravelType.TRANSPORT)){
                var t_amount = travel.resources[resource];
                if(t_amount)
                  amount += t_amount;
              }
            }

            //add returning transports
            for(var i = 0; i < player.travels.length; i++){
              var travel = player.travels[i];

              if(travel.timestamp+travel.time < timestamp
                && travel.resources && travel.type == TravelType.RETURN){
                var t_amount = travel.resources[resource];
                if(t_amount){
                  amount += t_amount;
                }
              }
            }
          }

          return amount;
        }

        state.varyResource = function(user, resource, amount){
          var player = this.players[user];
          player.resources[resource] = (player.resources[resource] ? player.resources[resource] : 0)+amount;
        }

        //return {population: , max: }
        state.computePopulation = function(user, timestamp){
          var player = this.players[user];
          var building = this.computeBuilding(user, "farm", timestamp);
          var r = {population: player.population, max: 0}
          if(building.lvl > 0)
            r.max = 25*Math.pow(2, building.lvl-1); //max population formula

          return r;
        }

        //return number of owner units 
        //only_available: true to only get available units
        state.computeUnits = function(user, unit, timestamp, only_available){
          var player = this.players[user];
          var base_unit = _this.units[unit];
          var amount = 0;
          if(player){
            var p_unit = player.units[unit];
            if(p_unit){
              amount = p_unit.amount;
              if(p_unit.order_timestamp != null){
                if(p_unit.order_timestamp > timestamp) //add trained
                  amount += p_unit.ordered-(p_unit.order_timestamp-timestamp)/base_unit.train_time;
                else //all done
                  amount += p_unit.ordered;
              }
            }

            if(only_available){
              //remove parked/travelling units
              for(var i = 0; i < player.travels.length; i++){
                var travel = player.travels[i];
                var u_amount = travel.units[unit];
                if(u_amount != null){
                  if(travel.type == TravelType.DEFEND ||
                    travel.timestamp+travel.time > timestamp ||
                    (travel.type != TravelType.RETURN && travel.timestamp+travel.time*2 > timestamp))
                  amount -= u_amount;
                }
              }
            }
          }

          return amount;
        }

        //stop training orders for a specific trainer (confirm already trained)
        //if trainer == null, will stop every training
        state.stopTraining = function(user, trainer, timestamp){
          var player = this.players[user];
          for(var name in _this.units){ //every unit type
            var base_unit = _this.units[name];

            if(!trainer || base_unit.trainer == trainer){
              var amount = 0;
              var p_unit = player.units[name];
              if(p_unit){
                amount = p_unit.amount;
                if(p_unit.order_timestamp != null){
                  var trained = 0;
                  if(p_unit.order_timestamp > timestamp) //add trained
                    trained = p_unit.ordered-(p_unit.order_timestamp-timestamp)/base_unit.train_time;
                  else //all done
                    trained = p_unit.ordered;

                  amount += trained;

                  //refund the rest
                  var rest = p_unit.ordered-trained;
                  if(rest > 0){
                    //refund resources
                    for(var resource in base_unit.train_resources)
                      state.varyResource(user, resource, base_unit.train_resources[resource]*rest);

                    //refund population
                    player.population -= base_unit.pop*rest
                  }
                }
              }

              //set amount, remove previous order
              player.units[name] = {amount: amount}
            }
          }
        }

        //process the attacks (called after every processed block and at the end of the build)
        state.processAttacks = function(timestamp){
          for(var user in state.players){
            var player = state.players[user];

            for(var i = 0; i < player.travels.length; i++){
              var travel = player.travels[i];
              var tplayer = state.players[travel.target];
              var attack_timestamp = travel.timestamp+travel.time;

              if(travel.type == TravelType.ATTACK && !travel.attack_processed 
                && timestamp >= attack_timestamp){ //process attack

                travel.attack_processed = true;

                //compute defense
                var defense_units = {}
                for(var unit in _this.units) //owned
                  defense_units[unit] = this.computeUnits(travel.target, unit, attack_timestamp, true);
                for(var dtravel in tplayer.in_travels){
                  if(dtravel.type == TravelType.DEFEND && timestamp >= dtravel.timestamp+dtravel.time){
                    for(var unit in dtravel.units)
                      defense_units[unit] += dtravel.units[unit];
                  }
                }

                var total_defense = 0;
                var total_attack = 0;
                for(var unit in _this.units){
                  total_defense += _this.units[unit].defense*(defense_units[unit] || 0);
                  total_attack += _this.units[unit].attack*(travel.units[unit] || 0);
                }

                if(total_attack > 0 && total_defense > 0){ //decimate units
                  //decimate attack units
                  var defense = total_defense;
                  var units = [];

                  //sort by attack DESC
                  for(var unit in travel.units)
                    units.push([unit, travel.units[unit], _this.units[unit].attack]); //name, amount
                  units.sort(function(a,b){
                    return b[2]-a[2];
                  });

                  var i = 0;
                  while(defense > 0 && i < units.length){
                    var amount = units[i][1];
                    var unit_attack = units[i][2];
                    var n = Math.min(Math.floor(defense/unit_attack), amount);
                    if(n > 0){ //consume units
                      defense -= n*unit_attack;
                      var unit = units[i][0];
                      var base_unit = _this.units[unit];

                      player.population += base_unit.pop*n;
                      player.units[unit].amount -= n;
                      travel.units[unit] -= n;
                    }

                    i++;
                  }

                  //decimate defense units
                  var attack = total_attack;
                  units = [];

                  //sort by defense DESC
                  for(var unit in defense_units)
                    units.push([unit, defense_units[unit], _this.units[unit].defense]); //name, amount
                  units.sort(function(a,b){
                    return b[2]-a[2];
                  });

                  var i = 0;
                  while(attack > 0 && i < units.length){
                    var amount = units[i][1];
                    var unit_defense = units[i][2];
                    var n = Math.min(Math.floor(attack/unit_defense), amount);
                    if(n > 0){ //consume units
                      attack -= n*unit_defense;
                      var unit = units[i][0];
                      var base_unit = _this.units[unit];

                      //consume owned
                      var owned_amount = this.computeUnits(travel.target, unit, attack_timestamp, true);
                      var owned_n = Math.min(n, owned_amount);
                      n -= owned_n;
                      tplayer.units[unit].amount -= owned_n;
                      tplayer.population -= owned_n*base_unit*pop;

                      //consume parked
                      for(var dtravel in tplayer.in_travels){
                        if(n == 0) //stop consuming
                          break;

                        if(dtravel.type == TravelType.DEFEND && timestamp >= dtravel.timestamp+dtravel.time){
                          var parked_amount = dtravel.units[unit] || 0;
                          var parked_n = Math.min(n, parked_amount);
                          if(parked_n > 0){
                            var pplayer = this.players[dtravel.from];
                            pplayer.units[unit].amount -= parked_n;
                            dtravel.units[unit] -= parked_n;
                            pplayer.population -= parked_n*base_unit.pop;
                          }
                        }
                      }
                    }

                    i++;
                  }
                }

                console.log("attack from "+travel.from+" to "+travel.target+" "+total_attack+" | "+total_defense);

                if(total_attack > total_defense){ //steal resources
                  //return travel
                  travel.type = TravelType.RETURN;
                  travel.resources = {}
                  travel.timestamp = attack_timestamp;

                  //compute capacity
                  var capacity = 0;
                  for(var unit in travel.units){
                    var base_unit = _this.units[unit];
                    capacity += travel.units[unit]*base_unit.travel_capacity;
                  }

                  //take resources
                  for(var resource in tplayer.resources){
                    var take = Math.min(capacity, this.computeResource(travel.target, resource, attack_timestamp));
                    state.varyResource(travel.target, resource, -take); //consume resource
                    travel.resources[resource] = take;
                    capacity -= take;
                  }
                }
              }
            }
          }
        }
      }
      else{ //post build
        state.processAttacks(_this.current_timestamp);
        _this.refresh();
      }
    });

    //check block
    this.game_chain.addCheckCallback(function(state, block){
      //check chain origin
      if(!block.prev_block && _this.cfg && block.hash == _this.cfg.chain_origin)
        return true;

      //timestamp check (blocks must have a valid timestamp)
      if(block.data.timestamp == null 
        || block.data.timestamp > _this.current_timestamp 
        || (block.prev_block.data.timestamp != null && block.data.timestamp < block.prev_block.data.timestamp))
        return false;

      //type checks
      if(block.data.type){
        var cb = _this.check_types[block.data.type];
        if(cb)
          return cb(state, block);
      }
    });

    //process block
    this.game_chain.addProcessCallback(function(state, block){
      //type process
      var cb = _this.process_types[block.data.type];
      cb(state, block);

      if(block.data.timestamp)
        state.processAttacks(block.data.timestamp);
    });

    this.game_chain.load();

    //rebuild chain every 1.5 seconds (if no files has been updated, it's a boolean check).
    setInterval(function(){ 
      _this.current_timestamp = Math.floor(new Date().getTime()/300000);
      _this.game_chain.build();
    }, 1500); 

    //force refresh every minute
    setInterval(function(){
      _this.game_chain.state.processAttacks(_this.current_timestamp);
      _this.refresh();
    }, 60000);
  }

  onRequest(cmd, message) 
  {
    if (cmd == "setSiteInfo")
      this.setSiteInfo(message.params)
    else
      this.log("Unknown incoming message:", cmd)
  }

  displayResource(state, user, resource)
  {
    var el = document.createElement("div");
    var img = document.createElement("img");
    img.src = "images/resources/"+resource+".png";
    img.title = resource;

    var span = document.createElement("span");
    span.innerText = state.computeResource(user, resource, this.current_timestamp);

    el.appendChild(img);
    el.appendChild(span);

    this.e_resources.appendChild(el);
  }

  displayBuilding(state, user, building)
  {
    var _this = this;

    var info = state.computeBuilding(user, building, this.current_timestamp);
    var base = this.buildings[building];

    var el = document.createElement("div");
    var img = document.createElement("img");
    img.src = "images/buildings/"+building+".png";
    img.title = base.display_name;

    var ul = document.createElement("ul");
    
    var li = document.createElement("li");
    li.innerText = base.description;
    ul.appendChild(li);

    li = document.createElement("li");
    li.innerText = "lvl "+info.lvl;
    ul.appendChild(li);


    if(info.in_construction){
      li.innerText += " ETA "+(info.order_timestamp-this.current_timestamp);
      ul.appendChild(li);
    }

    //buttons

    li = document.createElement("li");
    var button = document.createElement("span");
    button.classList.add("button");
    button.innerText = "upgrade";
    button.onclick = function(){
      _this.game_chain.push({ type: "actions", timestamp: _this.current_timestamp, actions: [["build", {building: building}]]});
    }
    li.appendChild(button);
      
    button = document.createElement("span");
    button.classList.add("button");
    if(info.in_construction)
      button.innerText = "cancel";
    else
      button.innerText = "downgrade";
    button.onclick = function(){
      _this.game_chain.push({ type: "actions", timestamp: _this.current_timestamp, actions: [["unbuild", {building: building}]]});
    }
    li.appendChild(button);
    ul.appendChild(li);

    el.appendChild(img);
    el.appendChild(ul);
    this.e_buildings.appendChild(el);
  }

  displayUnit(state, user, unit)
  {
    var _this = this;
    var base = this.units[unit];
    var player = state.players[user];
    var units = state.computeUnits(user, unit, this.current_timestamp, true);
    var tunits = state.computeUnits(user, unit, this.current_timestamp);
    var p_unit = player.units[unit] || {amount: 0};

    var el = document.createElement("div");
    var img = document.createElement("img");
    img.src = "images/units/"+unit+".png";
    img.title = base.display_name;

    var span = document.createElement("span");
    span.innerText = units+" ("+tunits+")";

    if(p_unit.order_timestamp != null && p_unit.order_timestamp > this.current_timestamp)
      span.innerText += " training "+p_unit.ordered+" ETA "+(p_unit.order_timestamp-this.current_timestamp);

    var i_order = document.createElement("input");
    i_order.type = "text";
    i_order.value = "0";

    var b_order = document.createElement("span");
    b_order.classList.add("button");
    b_order.innerText = "train";
    b_order.onclick = function(){
      _this.game_chain.push({ type: "actions", timestamp: _this.current_timestamp, actions: [["train", {unit: unit, amount: parseInt(i_order.value)}]]});
    }

    var span_desc = document.createElement("span");
    span_desc.innerText = base.description;

    el.appendChild(img);
    el.appendChild(span);
    el.appendChild(i_order);
    el.appendChild(b_order);
    el.appendChild(span_desc);

    this.e_units.appendChild(el);
  }

  refresh(){
    var _this = this;
    var state = this.game_chain.state;

    this.e_resources.innerHTML = "";
    this.e_buildings.innerHTML = "";
    this.e_units.innerHTML = "";
    this.e_travels.innerHTML = "";

    if(this.game_chain.stats.built_hash){
      if(this.site_info.cert_user_id){
        var user = this.site_info.auth_address;
        var player = state.players[user];
        if(player){
          this.e_city.innerText = player.city_name;

          //display resources/pop
          this.displayResource(state, user, "wood");
          this.displayResource(state, user, "stone");
          this.displayResource(state, user, "iron");

          var pop = state.computePopulation(user, this.current_timestamp);
          this.e_pop.innerText = pop.population+" / "+pop.max+" pop";

          //building
          this.displayBuilding(state, user, "city_hall");
          this.displayBuilding(state, user, "sawmill");
          this.displayBuilding(state, user, "barrack");
          this.displayBuilding(state, user, "farm");

          //units
          this.displayUnit(state, user, "soldier");
          this.displayUnit(state, user, "soldier2");

          //stop training button
          var b_stoptraining = document.createElement("span");
          b_stoptraining.classList.add("button");
          b_stoptraining.innerText = "stop all training";
          b_stoptraining.onclick = function(){
            _this.game_chain.push({ type: "actions", timestamp: _this.current_timestamp, actions: [["stop_training", {}]]});
          }

          this.e_units.appendChild(b_stoptraining);

          //display travels
          var travels = [];
          for(var i = 0; i < player.travels.length; i++)
            travels.push(player.travels[i]);
          for(var i = 0; i < player.in_travels.length; i++)
            travels.push(player.in_travels[i]);

          //sort by arrival DESC
          travels.sort(function(a,b){
            return (b.timestamp+b.time)-(a.timestamp+a.time);
          });

          for(var i = 0; i < travels.length; i++){
            (function(i){ //js scope trick
              var travel = travels[i];

              if(travel.timestamp+travel.time > _this.current_timestamp || true){
                var el = document.createElement("div");
                
                var e_type = document.createElement("span");
                e_type.innerText = ((travel.type == TravelType.RETURN && travel.from == user) || (travel.type != TravelType.RETURN && travel.from != user) ? "<=" : "=>");
                e_type.classList.add(travel.type == TravelType.ATTACK ? "hostile" : "friendly");

                var e_info = document.createElement("span");
                e_info.innerText = _this.game_chain.getCertUserId(travel.from)+" > "+_this.game_chain.getCertUserId(travel.target)+" ETA "+((travel.timestamp+travel.time)-_this.current_timestamp);

                var b_cancel = document.createElement("span");
                b_cancel.classList.add("button");
                b_cancel.innerText = "cancel";
                b_cancel.onclick = function(){
                  _this.game_chain.push({ type: "actions", timestamp: _this.current_timestamp, actions: [["cancel_travel", {id: travel.id}]]});
                }

                el.appendChild(e_type);
                el.appendChild(e_info);
                el.appendChild(b_cancel);
                _this.e_travels.appendChild(el);
              }
            })(i);
          }
        }
        else{
          //city creation (TODO)
          var e_name = document.createElement("input");
          e_name.type = "text";
          e_name.placeholder = "city name (0-50)";
          var e_valid = document.createElement("span");
          e_valid.classList.add("button");
          e_valid.innerText = "create city";
          e_valid.onclick = function(){
            if(e_name.value.length > 0 && e_name.value.length <= 50)
              _this.game_chain.push({type: "register", timestamp: _this.current_timestamp, city_name: e_name.value});
            else
              alert("Invalid number of characters.");
          }

          this.e_units.appendChild(e_name);
          this.e_units.appendChild(e_valid);
        }
      }
      else
        this.e_units.appendChild(document.createTextNode("Not logged."));
    }
    else
      this.e_units.appendChild(document.createTextNode("Chain not loaded."));
  }
}

page = new Page(); //init page
