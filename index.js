let Discord = require('discord.js');
let clientConfig = require('./database/client/config.json');
let client_bot = require("./handlers/index.js")
const Cluster = require("discord-hybrid-sharding");


let client = new client_bot.client({bot:{
	shards: Cluster.data.SHARD_LIST, 
	shardCount: Cluster.data.TOTAL_SHARDS,
  	http: {
  		version: "7"
  	}
  }
});

let events = new client_bot.events(`${clientConfig.footer.root}/events`,client,"a","b")

client.cluster = new Cluster.Client(client)

events.loadEVENTS()
client.connect(process.env.TOKEN);