//var DISCORD = require('discord.js');
const Cluster = require("discord-hybrid-sharding");

class ClusterCLIENT extends Cluster.Manager {
	constructor(file, opts) {
		super(file, opts);
	}
	start(ara,ara2) {
        this.spawn(ara, ara2)
    }
    
}
module.exports = ClusterCLIENT;