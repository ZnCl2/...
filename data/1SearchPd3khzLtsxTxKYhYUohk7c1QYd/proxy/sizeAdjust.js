"use strict";
const fs = require('fs');

const sitesUrl = "/srv/zeronet/data/sites.json"

function readSitesJson(sitesURL) {
  return new Promise((resolve, reject) => {
    fs.readFile(sitesURL, "utf8", function(err, data) {
      if (err) {reject(err);}
      let sites = JSON.parse(data); 
      resolve(sites);
    });
  });
}

const firstSizeCutoff = 1000*1000*8;
const firstSizeExtension = 20;
const secondSizeCutoff = 1000*1000*17;
const secondSizeExtension = 50;
function changeSizeLimit(sitesObj) {
  Object.keys(sitesObj).forEach(function(siteKey)  {
    let size =  sitesObj[siteKey].size;
    if (size > secondSizeCutoff) {
      sitesObj[siteKey].size_limit = secondSizeExtension;
    } else if (size > firstSizeCutoff) {
      sitesObj[siteKey].size_limit = firstSizeExtension;
    }
  });
  return sitesObj;
}

function writeSitesJson(sitesUrl, sitesObj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(sitesUrl, JSON.stringify(sitesObj), function (err) {
	if (err) reject(err);
	resolve ("");
    });
  });

}

readSitesJson(sitesUrl)
  .then((sitesObj) => changeSizeLimit(sitesObj))
  .then((sitesObj) => writeSitesJson(sitesUrl, sitesObj));
