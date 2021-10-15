const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const sayMessage = args.join(' ');
  //message.delete().catch(O_o => {});
  message.reply({content:`█████████ 
█▄█████▄█ 
█▼▼▼▼▼ 
█    ` + (sayMessage) + `!!!
█▲▲▲▲▲
█████████ 
 ██ ██  \n - ${message.author}`});
};
exports.config = {
    test: false
}
exports.help = {
  name:"dino",
  permisoes: "nenhuma",
  aliases: ["dinossauro-fala"],
  description: "fassa o DINO falar algo!",
  usage: "dino <texto>"
}