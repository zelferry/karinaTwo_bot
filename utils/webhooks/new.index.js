let Discord = require('discord.js');
let { webhooks } = require('../../database/client/jj.json');


class webhooks {
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
    commands(c, objetc){
        
    }
    topgg(c, objetc){
        
    }
    suport(c, objetc){
        
    }
    exit(c, objetc){
        
    }
}