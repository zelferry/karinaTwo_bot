const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const sayMessage = args.join(' ');
  message.delete().catch(O_o => {});
  message.channel.send(`█████████ 
█▄█████▄█ 
█▼▼▼▼▼ 
█    ` + (sayMessage) + `!!!
█▲▲▲▲▲
█████████ 
 ██ ██  \n - ${message.author}`);
};
exports.help = {
  name:"dino",
  permisoes: "nenhuma",
  aliases: ["dinossauro-fala"],
  description: "fassa o DINO falar algo!",
  usage: "dino <texto>"
}