const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  //let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let avatar = client.images.displayURL(message,args,0);
  let image = await canvacord.Canvas.affect(avatar);
  let attachment = new Discord.MessageAttachment(image, "triggered.png");
  return message.reply({files:[attachment]});
}
exports.config = {
    test: true
}
exports.help = {
  name:"affect",
  permisoes:"nenhuma",
  aliases: ["afetar","afetara","álcool"],
  description: "\"não não, isso não afetara o bebe\"",
  usage: "affect [imagem]"
}