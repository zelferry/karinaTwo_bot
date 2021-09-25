const Discord = require("discord.js");
const ne = require('nekos.life');
const neko = new ne();

exports.run = async (client, message, args) => {
  neko.sfw.catText().then((catText) =>{
    message.channel.send(catText.cat)
  });
}
exports.help = {
  name: "owo",
  permisoes: "nenhuma",
  aliases: ["catText"],
  description: "retorna uma CATTEXT aleatório!",
  usage: "owo"
}