const Discord = require('discord.js');
const convite = process.env.LINK_ADD;

module.exports.run = async (client, message, args) => {
  message.channel.send({embed: {
  color: 3447003,
  description: `oi ${message.author} você quer me chamar no seu servidor? \n [clique aqui para me convidar para seu servidor](${convite})`
}}); 
message.delete().catch(O_o => {});
console.log(`comando f/convidar usado`);
}
exports.help = {
  name:"convidar",
  permisoes: "nenhuma",
  aliases: ["add-karina","kariinvite","invite"],
  description: "me adicione em seu servidor!",
  usage: "convidar"
}