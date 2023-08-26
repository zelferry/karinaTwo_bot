process.env.TZ = "America/Sao_Paulo";
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const Cluster = require("discord-hybrid-sharding");
const dbconnect = require("./src/data/connect.js");
const bot_list_client = require("./src/utils/bot_lists/index.js");
const config = require("./src/config/config.js");

const condittion_web = process.env.CONDITION_WEBCLIENT === "true";
const condittion_databotslist = process.env.CONDITION_BOTLISTPOSTDATA === "true";

const manager = new Cluster.ClusterManager("./src/index.js", {
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
        
        if(config.system.debug_all_data) {
            console.log(`[DEBUG] ${data}`);
        }
	});
}

require("./src/utils/anti_crash.js").cluster();
manager.spawn({ timeout: -1 }).catch(console.error);
dbconnect("cluster");

if (condittion_web) require("./src/utils/web_client/index.js")();