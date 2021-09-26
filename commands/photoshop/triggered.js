const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
 // let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let avatar = client.get_images(message,args);
  let image = await canvacord.Canvas.trigger(avatar);
  let attachment = new Discord.MessageAttachment(image, "triggered.gif");
  return message.channel.send(attachment);
}
exports.help = {
  name:"triggered",
  permisoes: "nenhuma",
  aliases: ["pistola","bravo","raiva"],
  description: "PISTOLA!",
  usage: "triggered [imagem anexada ou usuário]"
}