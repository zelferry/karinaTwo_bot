const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  
var rand = Math.floor(Math.random() * (100 - 1)) + 1

//let user = message.mentions.users.first() || client.users.cache.get(args[0]);


message.channel.send({embed: {
  color: 3447003,
  description: `sua idiotice e de **` + (rand) + `**`
}});

}
exports.help = {
  name:"idiot",
  permisoes: "nenhuma",
  aliases: ["idiotamometro"],
  description: "qual e sua idiotice?",
  usage: "idiot"
}