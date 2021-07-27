const Discord = require('discord.js');
class _client extends Discord.Client {
	constructor(opts) {
		super(opts.bot);

		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.commands.array = [];
		this.commands2 = new Discord.Collection();
		this.cooldown = new Discord.Collection();
	}
	 connect(token) {
		this.login(token);
	}
	disconnectBOT() {}
}

module.exports = _client; 