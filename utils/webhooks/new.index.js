let Discord = require('discord.js');
let { webhooks } = require('../../database/client/config.json');


class webhooks1 {
    constructor(){
        this.hook = {
            commands: new Discord.WebhookClient({
                url: webhooks.commands
            }),
            topgg: new Discord.WebhookClient({
                url: webhooks.topgg
            }),
            suport: new Discord.WebhookClient({
                url: webhooks.suport
            }),
            exit_: new Discord.WebhookClient({
                url: webhooks._exit
            })
        }

        this.payload = function(object1, object2){
            
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