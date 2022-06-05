let Cluster = require("discord-hybrid-sharding");
let { RatelimitManager } = require("discord-cross-ratelimit");
let dbconnect = require("./mongoDB/connect.js");
let dist = require("./dist/main.js");
let teste = require("./plugins/index.js");

let manager = new Cluster.Manager("./index.js",{
    totalClusters: 'auto',
    totalShards: 'auto',
    token: process.env.TOKEN,
    mode: 'process'
});
new RatelimitManager(manager);
/*let ara = teste.autoTopGgPost(manager)

ara.on("posted", (data) => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Status Postado na top.gg!`);
})*/

manager.on('clusterCreate', cluster => {
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${cluster.id}] iniciado!`);
});

manager.on("debug", (data) =>{ console.log(data) });

process.on('unhandledRejection', async (bb, aa) => {
    console.log(bb)
});

global.clusterManager = manager;
manager.spawn({ timeout: -1 }).catch(console.error)
dbconnect("cluster");
dist.modules.webclient();