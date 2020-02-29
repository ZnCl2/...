"use stricit";
jsonfile = require("jsonfile");

var old_file = jsonfile.readFileSync("data.json");


var removeList=[];

old_data.post.filter(function(p){
  if (p.body=="") {
    removeList.push(p.post_id);
  }
});

old_data.tag=old_data.tag.filter(function(t){
  return removeList.indexOf(t.post_id)==-1;
});


jsonfile.writeFileSync("new_data.json",old_data,{spaces:2});

