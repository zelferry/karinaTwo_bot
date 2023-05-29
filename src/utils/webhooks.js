const Discord = require('discord.js');

class webhooks1 {
    constructor(){
        this.hook = {
            commands: new Discord.WebhookClient({
                url: process.env.WEBHOOK_COMMANDS
            }),
            topgg: new Discord.WebhookClient({
                url: process.env.WEBHOOK_TOPGG
            }),
            suport: new Discord.WebhookClient({
                url: process.env.WEBHOOK_SUPPORT
            }),
            exit_: new Discord.WebhookClient({
                url: process.env.WEBHOOK_MANAGER
            })
        }
    }
    commands(c, objetc = {}){
        this.hook.commands.send(c);
    }
    topgg(c, objetc = {}){
        this.hook.topgg.send(c);
    }
    suport(c, objetc = {}){
        this.hook.suport.send(c);
    }
    exit(c, objetc = {}){
        this.hook.exit_.send(c);
    }
}

module.exports = webhooks1