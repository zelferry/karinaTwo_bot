process.env.TZ = "America/Sao_Paulo";
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const Cluster = require("discord-hybrid-sharding");
const dbconnect = require("./mongoDB/connect.js");
const dist = require("./dist/main.js");
const bot_list_client = require("./dist/cluster/bot_lists/index.js");

const condittion_web = process.env.CONDITION_WEBCLIENT === "true";
const condittion_databotslist = process.env.CONDITION_BOTLISTPOSTDATA === "true";

const manager = new Cluster.ClusterManager("./index.js", {
	totalClusters: "auto",
	totalShards: "auto",
	token: process.env.TOKEN,
	mode: "process"
});

manager.on("clusterCreate", cluster => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${cluster.id}] iniciado!`);
});
manager.on("debug", data => {
	console.log(data);
});

if (condittion_databotslist) {
	const bot_lists = new bot_list_client(manager, {});

	bot_lists.on("posted", data => {
		console.log(`[${new Date().toString().split(' ', 5).join(' ')}] status postado na top.gg!`);
	});
}

require("./dist/anti_crash.js").cluster();
manager.spawn({ timeout: -1 }).catch(console.error);
dbconnect("cluster");

if (condittion_web) dist.modules.webclient();