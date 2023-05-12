process.env.TZ = "America/Sao_Paulo";
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

let Cluster = require("discord-hybrid-sharding");
let dbconnect = require("./mongoDB/connect.js");
let dist = require("./dist/main.js");
let teste = require("./plugins/index.js");

let condittion_web = process.env.CONDITION_WEBCLIENT === "true";
let condittion_databotslist = process.env.CONDITION_BOTLISTPOSTDATA === "true";

let manager = new Cluster.ClusterManager("./index.js", {
	totalClusters: "auto",
	totalShards: "auto",
	token: process.env.TOKEN,
	mode: "process"
});

if (condittion_databotslist) {
	let bot_lists = teste.autoTopGgPost(manager);

	bot_lists.on("posted", data => {
		console.log(`[${new Date().toString().split(' ', 5).join(' ')}] status Postado na top.gg!`);
	});
}

manager.on("clusterCreate", cluster => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${cluster.id}] iniciado!`);
});
manager.on("debug", data => {
	console.log(data);
});

require("./dist/anti_crash.js").cluster();
manager.spawn({ timeout: -1 }).catch(console.error);
dbconnect("cluster");

if (condittion_web) dist.modules.webclient();
