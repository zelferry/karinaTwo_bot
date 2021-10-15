const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

var list = [
  'ele tem tnt?',
  'CORRE!!!!!!!!!!!!!!!!!!!!!.',
  'pera! vou pegar minha espada de diamande aqui meu.',
  'a não vey, DE NOVO!!!!',
  'catapinbas ._.',
  'eu cuido disso!',
  'vou testar minha nova flexa nele!',
  'AAAAAHH!!!!!!!!!! E SO JOGAR UMA TNT NELE!!',
  'AWWW MEN!!!!!!!!!!!!!!!',
  'ja sei!... vou assar um bolo!',
  'mano :V',
  ':V'
];
var rand = list[Math.floor(Math.random() * list.length)];

message.reply({content:[rand]});

    
}
exports.config = {
    test: false
}
exports.help = {
  name:"creeper?",
  permisoes: "nenhuma",
  aliases: ["mine-creeper","creeper"],
  description: "\"AHHW MEN!\"",
  usage: "creeper?"
}