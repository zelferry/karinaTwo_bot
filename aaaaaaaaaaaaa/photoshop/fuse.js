const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
 
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
  
  if (!user)return message.reply('lembre-se de mencionar um usuário válido para misturar os avatares!');

  let userf = user.displayAvatarURL({ dynamic: false, format: 'png' });
  
setTimeout(() => {
  message.channel.send("fusão ,HA!");
}, 2000)
 

  let image = await canvacord.Canvas.fuse(avatar, userf);
  let attachment = new Discord.MessageAttachment(image, "changemymind.png");
  return message.channel.send(attachment);
}
exports.help = {
  name:"fuse",
  permisoes: "nenhuma",
  aliases: ["fusao"],
  description: "funda-se com algum usuário!",
  usage: "fuse <usuário>"
}