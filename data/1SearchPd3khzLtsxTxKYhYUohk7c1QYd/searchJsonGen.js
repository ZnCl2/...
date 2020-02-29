#!/usr/local/bin/node
// load list of real zites
// make an object where the keys are the zite names
// indepdentantly can:
// add the domain information from the names.json file
// crawl through all the zites content.json and fill in the title and
// description
"use strict";
const fs = require('fs');
const zeroNetData = "/srv/zeronet/data/";
const knowledgeDir = "/home/vrenpces/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge/";
var zites = [];
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// load addresses. 
var realAddress = "realAddress.txt";
var address = 0;
var name = "";
function realAddressObjectCreate() {
  return new Promise((resolve,reject) => {
    fs.readFile(knowledgeDir + realAddress, "utf8", function (err, data) {
      if (err) {
        return reject(err);
      }
      //console.log(data);
      var lines = data.split("\n");
      resolve(lines.map(function(line) {
        var obj = {};
        name = line.replace(/.*\//,"");
        obj.name = name;
        obj.address = line;
        return obj;
      }));
      //console.log(zites);
    });
  });
}
//loadedAddresses.then((ziteList) => { loadIndexes(ziteList);})
//]).then((values) => {
//  console.log("all then");
//  console.log(values);
//  writeSearchJson(zites); 
//});

//var jsonReady = Promise.all([
//loadedAddresses.then((ziteList) => { loadNames(ziteList);}),
////loadedAddresses.then((ziteList) => { loadContent(ziteList);})
////loadedAddresses.then((ziteList) => { loadIndexes(ziteList);})
//])





// load names
function swapKeyValue(data) {
return Object.keys(data).reduce(function(obj,key){
     obj[ data[key] ] = key;
     return obj;
},{});
}
function loadNames(ziteList) {
  return new Promise((resolve, reject) => {
    const nameJson = "/1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F/data/names.json";
    fs.readFile(zeroNetData + "/" + nameJson, function(err, data)  {
      if (err) return reject(err);
      var json = JSON.parse(data);
      var dict = swapKeyValue(json);
      resolve(ziteList.map(function(elem) {
        var name = elem.name;
        if (dict[name] !== undefined) {
          elem.domain = dict[name];
        }
        return elem;
      }));
    });
  });
}
function loadPeers(ziteList) {
  return new Promise((resolve, reject) => {
    const peerList = "peerlist.txt";
    fs.readFile(knowledgeDir + peerList, "utf8", function(err, data)  {
      if (err) return reject(err);
      let lines = data.toString().split("\n").map((line) => { return line.split(" ") });
      let i = 0;
      resolve(ziteList.map(function(elem) {
        for (i = 0; i < lines.length; i++) {
          if (lines[i][0] === elem.name)  {
          elem.peers =  lines[i][1];
          break;
          }
        } 
        return elem;
      }));
    });
  });
}

function  loadContentFile(ziteListElem) {
  return new Promise((resolve, reject) => {
      var dir = ziteListElem.name;
      if (dir !== undefined && dir !== "") {
        try {
          //console.log("dir " + dir);
          fs.readFile(zeroNetData + dir + "/content.json", function (err, data) {
          //console.log("dir " + dir + " zd " + JSON.stringify(ziteList[dir]) + " boop ");
            if (err) {
              console.log("no content.json for " + dir); 
            }
            var content = JSON.parse(data); 
            ziteListElem.title = content.title;
            ziteListElem.description = content.description;
            if (content.domain) {
              ziteListElem.domain = content.domain;
            }
            resolve(ziteListElem);
          });
        } catch (err) {
          console.log(err);
          resolve(ziteListElem);
        }
      } else {
      resolve(ziteListElem);
      }
  });
}
function  loadIndexFile(ziteListElem) {
  return new Promise((resolve, reject) => {
      var dir = ziteListElem.name;
      if (dir !== undefined && dir !== "") {
        try {
          //console.log("dir " + dir);
          fs.readFile(zeroNetData + dir + "/index.html", function (err, data) {
            if (err) {
              console.log("no index.html for " + dir); 
            }
            var dom = new JSDOM(data);
            if (dom.window.document.body){
            ziteListElem.body = 
                dom.window.document.body.textContent
                .replace(/[$-/:-?{-~!"^_`\[\]]/g,' ') 
                .replace(/\s+/g,' ')
                .substring(0,1024);
              console.log(ziteListElem.body);
            }
            resolve(ziteListElem);
          });
        } catch (err) {
          console.log("catching index error " + err);
          resolve(ziteListElem);
        }
      } else {
      resolve(ziteListElem);
      }
  });
}
// load content information
function loadContent(ziteList) {
  return Promise.all(ziteList.map(function (elem) {
      return loadContentFile(elem);
  }));
}
function loadIndexes(ziteList) {
  return Promise.all(ziteList.map(function (elem) {
      return loadIndexFile(elem);
  }));
}
// load 0list titles
// load indexes.

function writeSearchJson(ziteList) {
  return new Promise((resolve, reject) => {
    fs.writeFile( knowledgeDir + "/search.json", 
      JSON.stringify(ziteList), function (err, data) {
        if (err) return reject(err);
        resolve("success");
    });
  });
}

function sortByPeers(ziteList) {
  return new Promise((resolve, reject) => {
    resolve( 
      ziteList.sort(function(a, b) {
        return b.peers - a.peers;
      }));
    });
}


let loadedAddresses = realAddressObjectCreate();
loadedAddresses
.then((ziteList) => loadPeers(ziteList))
.then((ziteList) => sortByPeers(ziteList))
.then((ziteList) => loadNames(ziteList))
.then((ziteList) => loadContent(ziteList))
.then((ziteList) => loadIndexes(ziteList))
.then((ziteList) => {writeSearchJson(ziteList) });
