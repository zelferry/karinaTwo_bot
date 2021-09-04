let Discord = require('discord.js');
let clientConfig = require('./database/client/config.json');
let client_bot = require("./handlers/index.js")
const Cluster = require("discord-hybrid-sharding");
const disbut = require('discord-buttons');
let mongoose = require("mongoose");

const dbOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

let client = new client_bot.client({bot:{/*
	shards: Cluster.data.SHARD_LIST, 
	shardCount: Cluster.data.TOTAL_SHARDS,*/
  	http: {
  		version: "9"
  	}
  }
});

const usev13 = false
let events = new client_bot.events(`${clientConfig.footer.root}/events`,client,"a","b")

//client.cluster = new Cluster.Client(client,usev13)
/*
mongoose.connection.on('connected', function() {
		console.log("db conectada! ");
	});*/

disbut(client);
require("./extenders/index.js")(client)
events.loadEVENTS()

mongoose.connect(process.env.MONGOOSE, dbOptions);
client.connect(process.env.TOKEN);