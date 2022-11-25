let Cluster = require("discord-hybrid-sharding");
let { RatelimitManager } = require("discord-cross-ratelimit");
let dbconnect = require("./mongoDB/connect.js");
let dist = require("./dist/main.js");
let teste = require("./plugins/index.js");

let condittion_web = (process.env.CONDITION_WEBCLIENT === "true");
let condittion_databotslist = (process.env.CONDITION_BOTLISTPOSTDATA === "true");

const i18next = require('i18next')
const Backend = require('i18next-fs-backend')

let manager = new Cluster.Manager("./index.js",{
    totalClusters: 'auto',
    totalShards: 'auto',
    token: process.env.TOKEN,
    mode: 'process'
});
new RatelimitManager(manager);

if(condittion_databotslist){
    let bot_lists = teste.autoTopGgPost(manager);

    bot_lists.on("posted", (data) => {
        console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Status Postado na top.gg!`);
    })
}

manager.on('clusterCreate', cluster => {
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${cluster.id}] iniciado!`);
});
manager.on("debug", (data) =>{
    console.log(data);
});

global.clusterManager = manager;
require("./dist/anti_crash.js").cluster();
manager.spawn({ timeout: -1 }).catch(console.error)
dbconnect("cluster");

if(condittion_web) {
    dist.modules.webclient();
}