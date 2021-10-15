const Discord = require('discord.js');

let {economydb} = require("../../mongoDB/ini.js").user 


module.exports.run = async (client, message, args) => {
    let value = await economydb.fech(message.author);
    
    message.reply({content:`voce tem **${value.coins}** Panther-coins!`});
};
exports.config = {
    test: false
}
exports.help = {
  name:"furcoins",
  permisoes: "nenhuma",
  aliases: ["panther-coins","moedas","my-money"],
  description: "veja quantos Panther-coins você tem em meu sistema de economia!",
  usage: "furcoins"
}