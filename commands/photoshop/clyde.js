const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  if(!args.length > 0) return message.reply({content:"❌**|** insira um texto!"})
  
  let image = await canvacord.Canvas.clyde(args.join(" "));
  let attachment = new Discord.MessageAttachment(image, "clyde.png");
  return message.reply({files:[attachment]})
}
exports.config = {
    test: true
}
exports.help = {
  name:"clyde",
  permisoes: "nenhuma",
  aliases: [],
  description: "o clyde (o bot do discord) quer falar algo para vc!",
  usage: "clyde <texto>"
}