const Discord = require('discord.js');
const Sharder = require('discord.js-cluster').Master;

const sharder = new Sharder(process.env.TOKEN, 'client_clusters/clientBaseCluster.js', {
  client: require("./client_clusters/clientBase.js"), 
  stats: true,
  debug: true,
shards: 1,
  guildsPerShard: 1500,
  name: 'karinaTwo',
  clientOptions: {
      messageCacheMaxSize: 500
  }
});

sharder.on("stats", stats => {
  console.log(stats);
});