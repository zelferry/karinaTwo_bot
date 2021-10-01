const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  
const avatar = args.join(' ');

if (!avatar) return message.reply('Você precisa inserir o texto!');
  let image = await canvacord.Canvas.changemymind(avatar);
  let attachment = new Discord.MessageAttachment(image, "changemymind.png");
  return message.inlineReply(attachment);
}
exports.help = {
  name:"changemymind",
  permisoes: "nenhuma",
  aliases: ["opinião","minha-opinião"],
  description: "\"mude a minha opinião\"",
  usage: "changemymind <texto>"
}