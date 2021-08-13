const Discord = require('discord.js');

let {economydb} = require("../mongoDB/ini.js").user 


module.exports.run = async (client, message, args) => {
  
  let user = message.author;

	let value = await economydb.fech(user)

  message.channel.send(`voce tem **${value.coins}** Panther-coins!`);
};
exports.help = {
  name:"furcoins",
  permisoes: "nenhuma",
  aliases: ["panther-coins","moedas","my-money"],
  description: "veja quantos Panther-coins você tem em meu sistema de economia!",
  usage: "furcoins"
}