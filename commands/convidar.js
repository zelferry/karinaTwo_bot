const Discord = require('discord.js');
const convite = process.env.LINK_ADD;

module.exports.run = async (client, message, args) => {
    message.inlineReply(new Discord.MessageEmbed({
    "color": 40447,
    "fields": [
      {
        "name": "adiciona-me",
        "value": "me adicione em seu servidor [clicando aqui]("+convite+")!"
      },
      {
        "name": "suporte?",
        "value": "a algo de errado?\nnão estou respondendo certos comandos?\nquer dar sugestões de comandos novos ou de melhorias?\n\nentre em meu servidor de suporte!\n[discord.gg/Xmu7HrH3yy](https://discord.gg/Xmu7HrH3yy)"
      },
      {
        "name": "donate",
        "value": "me manter ativa não e uma tarefa fácil, principalmente com as contas de luz *ai ai*...\n\nque tal você me apoiar e ainda ganhar recompensas!?\nvisite algum dos links abaixo para me apoiar!\n• https://donatebot.io/checkout/853111207954874379"
      }
    ]
  }))/*
  message.channel.send({embed: {
  color: 3447003,
  description: `oi ${message.author} você quer me chamar no seu servidor? \n [clique aqui para me convidar para seu servidor](${convite})`
}}); 
message.delete().catch(O_o => {});*/
console.log(`comando f/convidar usado`);
}
exports.help = {
  name:"convidar",
  permisoes: "nenhuma",
  aliases: ["add-karina","kariinvite","invite"],
  description: "me adicione em seu servidor!",
  usage: "convidar"
}