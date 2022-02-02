let Cluster = require("discord-hybrid-sharding");
let dbconnect = require("./mongoDB/connect.js");
let dist = require("./dist/main.js")

let manager = new Cluster.Manager("./index.js",{
    totalClusters: 'auto',
    token: process.env.TOKEN,
    mode: 'process'/*
    keepAlive: {
        interval: 2000,
        maxMissedHeartbeats: 5,        maxClusterRestarts: 3
    }
*/});

manager.on('clusterCreate', cluster => {
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${cluster.id}] iniciado!`);
});

manager.on("debug", (data) =>{ console.log(data) });

process.on('unhandledRejection', error => { console.error(error) });

manager.spawn();
dbconnect("cluster");
dist.modules.webclient();