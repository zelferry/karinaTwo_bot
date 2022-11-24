let Event = require("../../frameworks/event/event.js");
let util = require('../../utils/main.js');

let KariWebhooks = new util.webhooks1();
const Discord = require('discord.js');

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "guildCreate"
        })
    }
    
    async run(guild){
        KariWebhooks.exit({
            embeds: [new Discord.MessageEmbed().setColor('#FFFFF1').setTitle(`karina entrou em um servidor!`).addField('nome do server:', `${guild.name}`).addField('id do server:', `${guild.id}`)]
        });
    }
}

module.exports = event