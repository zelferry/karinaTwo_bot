const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let avatar = user.avatarURL({ dynamic: false, format: 'png', size: 1024 });
  let image = await canvacord.Canvas.beautiful(avatar);
  let attachment = new Discord.MessageAttachment(image, "beautiful.png");
  return message.channel.send(attachment);
}
exports.help = {
  name:"beautiful",
  permisoes: "nenhuma",
  aliases: ["lindo","bonito"],
  description: "\"ohh isso, ISO E LINDO\"",
  usage: "beautiful [usuario]"
}