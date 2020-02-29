var parsedJSON = require('../data/names.json');


var domains = 0;
var counters = new Object();
counters["zeronet"] = 0;
counters["freenet"] = 0;
counters["i2p"] = 0;
counters["tor"] = 0;
for (domain in parsedJSON) {
	domains++;
	if(parsedJSON[domain]["zeronet"]) counters["zeronet"]++;
	if(parsedJSON[domain]["freenet"]) counters["freenet"]++;
	if(parsedJSON[domain]["i2p"]) counters["i2p"]++;
	if(parsedJSON[domain]["tor"]) counters["tor"]++;
}
console.log("Domains:" + domains);
console.log("ZeroNet:" + counters["zeronet"]);
console.log("Freenet:" + counters["freenet"]);
console.log("I2P:" + counters["i2p"]);
console.log("Tor:" + counters["tor"]);