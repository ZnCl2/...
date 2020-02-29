"use strict";

const fs = require('fs');
const shell = require('shelljs');
console.log(process.env.HOME);
var address_list=process.env.HOME + 
  "/ZeroNet/data/1SearchPd3khzLtsxTxKYhYUohk7c1QYd/knowledge/address_list.txt";
var zeronet_data_dir="/srv/zeronet/data/"

function addressListRead() { 
  return new Promise((resolve, reject) => {
    fs.readFile(address_list, "utf8",  function (err, data) { 
      if (err) { reject(err); } 
      //console.log(" address list " + data);
      var addressList = data.split('\n');
      resolve (addressList);
    });
  });
}

function loadUrl(url) {
  return new Promise((resolve, reject) => {
    resolve(shell.exec("lynx -dump "+ url, function (exitCode, stdout, stderr) {
      console.log(exitCode + " " + url );
      resolve(exitCode);
    }));
  });
}

function loadAll(addressList) {
  return Promise.all(addressList.map(function(url) {
    return loadUrl(url);
  }));
}

addressListRead()
  .then((addressList) => loadAll(addressList));
