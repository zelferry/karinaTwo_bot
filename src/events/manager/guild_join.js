const Event = require("../../structures/events/event.js");
const util_webhook = require('../../utils/webhooks.js');
const Discord = require('discord.js');
const webhooks = new util_webhook();

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "guildCreate"
        })
    }
    
    async run(guild){
        webhooks.exit({
            embeds: [new Discord.MessageEmbed().setColor('#FFFFF1').setTitle(`karina entrou em um servidor!`).addField('nome do server:', `${guild.name}`).addField('id do server:', `${guild.id}`)]
        });
    }
}

module.exports = event