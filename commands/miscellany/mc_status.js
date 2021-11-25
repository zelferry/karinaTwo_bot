const Discord = require('discord.js');
const fs = require('fs');
var request = require('request');
const send = require('quick.hook');

module.exports.run = async (client, message, args) => {
    let serverr = args[0];
    let url = "http://mcapi.us/server/status?ip=" + serverr;
    request(url, function (err, response, body) {

        if (body.status === "error" || !serverr) return message.reply({content:"🚫**|** um erro aconteceu, insira um ip valido!"})
        var status = "Offline";
        if (body.online) {
            status = "Online";
        }
        //onsole.log(body)
        // PC Ping
        body = JSON.parse(body);

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${serverr}`, `https://mcapi.de/api/image/favicon/${serverr.favicon}`)
            .setThumbnail(`https://mcapi.de/api/image/favicon/${serverr.favicon}`)
            .addField("🎲 Versão:", `${body.server.name}`)
            .addField("🚀 Motd:", `\`\`\`\n${body.motd}\n\`\`\``)
            .addField("🥊 Status:", `${body.online ? "online" : "offline"}`)
            .addField("🏵 Jogadores online:", `${body.players.now} / ${body.players.max}`)
            .setTimestamp()

        message.channel.send({embeds:[embed]})
    })
}

exports.config = {
    test: false
}
exports.help = {
  name:"mcstatus",
  permisoes: "nenhuma",
  aliases: [],
  description: "veja informações de um servidor de minecraft!!",
  usage: "mcstatus <ip>"
}