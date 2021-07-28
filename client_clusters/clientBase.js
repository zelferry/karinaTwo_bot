const Discord = require('discord.js');

const Config_ = require('../database/client/config.json');

let {events} = require("../handlers/index.js")

//let commands_ = new util.commands(this, Config_, _giveaway);

class _client extends Discord.Client {
	constructor(args) {
		super(args);

		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.commands.array = [];
		this.commands2 = new Discord.Collection();
		this.cooldown = new Discord.Collection();
		
		
//new events(`${Config_.footer.root}/events`,this, "", "")
	}
}

module.exports = _client; 