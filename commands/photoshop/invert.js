const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  //let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let avatar = client.images.displayURL(message,args,0);
  let image = await canvacord.Canvas.invert(avatar);
  let attachment = new Discord.MessageAttachment(image, "triggered.png");
  return message.reply({files:[attachment]})
}
exports.config = {
    test: true
}
exports.help = {
  name:"invert",
  permisoes: "nenhuma",
  aliases: ["imagem-invertida"],
  description: "inverta as cores da imagem(avatar) de alguém!",
  usage: "invert [imagem]"
}