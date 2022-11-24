let Event = require("../../frameworks/event/event.js");
let util = require('../../utils/main.js');

let KariWebhooks = new util.webhooks1();
let Discord = require('discord.js');

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "guildDelete"
        })
    }
    
    async run(guild){
        if(!guild) return;
        if(!guild.name) return;
        if (guild.id === '810990219281039391' || guild.id === '803456484369367081') return;
        await require('../../mongoDB/ini.js').guild.deleteGuild(guild);
        client.giveawaysManager.giveaways.filter(g => g.guildID === guild.id).forEach(g => client.giveawaysManager.delete(g.messageID));
        
        KariWebhooks.exit({
            embeds: [new Discord.MessageEmbed().setColor('#FFFFF1').setTitle(`karina saiu de um servidor!`).addField('nome do server:', `${guild.name}`).addField('id do server:', `${guild.id}`)]
        });
    }
}

module.exports = event