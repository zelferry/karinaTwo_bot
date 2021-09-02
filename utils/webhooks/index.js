const Discord = require('discord.js');
let { webhooks } = require('../../database/client/config.json');
let commands_ = webhooks.commands;
let topgg_ = webhooks.topgg;
let suports_ = webhooks.suport;
let exit_ = webhooks.exit_;

class WEBHOOK {
	constructor() {
		this.hook = {
			commands: new Discord.WebhookClient(commands_.id, commands_.token),
			topgg: new Discord.WebhookClient(topgg_.id, topgg_.token),
			suport: new Discord.WebhookClient(suports_.id, suports_.token),
			_exit_: new Discord.WebhookClient(exit_.id, exit_.token)
		};
	}

	commands(c) {
		let { hook } = this;
		hook.commands.send(c);
	}
	topgg(c) {
		let { hook } = this;
		hook.topgg.send(c);
	}
	suport(c) {
		let { hook } = this;
		hook.suport.send(c);
	}
	_exit(c) {
		let { hook } = this;
		hook._exit_.send(c);
	}
    webhookTest(c){
        
    }
}

module.exports = WEBHOOK