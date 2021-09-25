const Discord = require('discord.js');
var list = require("../../database/imagens/memes.json") 
module.exports.run = async (client, message, args) => {
    let {pages} = require("../../buttonSystem/init.js");
    let button_2 = new pages.normal(message,client);
    await button_2.buttonPages(list.all)
}
exports.help = {
  name:"gerarmeme",
  permisoes: "nenhuma",
  aliases: ["random-meme","memes"],
  description: "gere algum meme(como uma seed do mine)",
  usage: "gerarmeme"
}