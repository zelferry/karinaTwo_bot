let Discord = require('discord.js');
let config = require(`${process.cwd()}/dist/primary_configuration.js`).webhook();

class webhooks1 {
    constructor(){
        this.hook = {
            commands: new Discord.WebhookClient({
                url: config.commands
            }),
            topgg: new Discord.WebhookClient({
                url: config.topgg
            }),
            suport: new Discord.WebhookClient({
                url: config.support
            }),
            exit_: new Discord.WebhookClient({
                url: config.manager
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