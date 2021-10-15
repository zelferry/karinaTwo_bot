const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  try {
      if (!args[0]) return message.reply({content:'Você precisa inserir o texto para reverter!'});
      
      const str = args.join(' ');
      let msg = await message.reply({content: (str.split('').reverse().join('')).toString()});
    } catch (err) {
      message.reply({content:'Aconteceu um erro!'}).catch();
    }

};
exports.config = {
    test: false
}
exports.help = {
  name:"inverter",
  permisoes: "nenhuma",
  aliases: ["inverter-texto"],
  description: "inverta o seu OTXET",
  usage: "inverter <texto>"
}