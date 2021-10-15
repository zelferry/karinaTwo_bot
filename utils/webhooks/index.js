const Discord = require('discord.js');
let { webhooks } = require('../../database/client/config.json');
let commands_ = webhooks.commands;
let topgg_ = webhooks.topgg;
let suports_ = webhooks.suport;
let exit_ = webhooks.exit_;

class WEBHOOK {
	constructor() {
		this.hook = {
			commands: new Discord.WebhookClient({
                id: commands_.id,
                token: commands_.token
            }),
			topgg: new Discord.WebhookClient({
                id: topgg_.id,
                token: topgg_.token
            }),
			suport: new Discord.WebhookClient({
                id: suports_.id, 
                token: suports_.token
            }),
			_exit_: new Discord.WebhookClient({
                id: exit_.id,
                token: exit_.token
            })
		};
	}

	commands(c) {
		let { hook } = this;
		new Discord.WebhookClient({
                id: commands_.id,
                token: commands_.token
            }).send({
            embeds: [c]
        });
	}
	topgg(c) {
		let { hook } = this;
		hook.topgg.send({embeds:[c]});
	}
	suport(c) {/*
		let hook = thqis.hook
		hook.suport.send(c);*/
        new Discord.WebhookClient({
            id: suports_.id,
            token: suports_.token
        }).send({embeds: [c]})
	}
	_exit(c) {
		let { hook } = this;
		hook._exit_.send({embeds:[c]});
	}
    webhookTest(c){
        
    }
}

module.exports = WEBHOOK