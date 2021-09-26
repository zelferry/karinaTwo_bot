const Discord = require('discord.js');
const convite = process.env.LINK_ADD;

module.exports.run = async (client, message, args) => {
    message.inlineReply(new Discord.MessageEmbed({
    "color": 40447,
    "fields": [
      {
        "name": "adiciona-me",
        "value": "me adicione em seu servidor [clicando aqui](https://discord.com/api/oauth2/authorize?client_id="+process.env.BOT_ID+"&permissions=805317758&scope=bot%20applications.commands)!"
      },
      {
        "name": "suporte?",
        "value": "a algo de errado?\nnão estou respondendo certos comandos?\nquer dar sugestões de comandos novos ou de melhorias?\n\nentre em meu servidor de suporte!\n[discord.gg/Xmu7HrH3yy](https://discord.gg/Xmu7HrH3yy)"
      },
      {
        "name": "donate",
        "value": "em breve!..."
      }
    ]
  }))/*
  message.channel.send({embed: {
  color: 3447003,
  description: `oi ${message.author} você quer me chamar no seu servidor? \n [clique aqui para me convidar para seu servidor](${convite})`
}}); 
message.delete().catch(O_o => {});*/

}
exports.help = {
  name:"convidar",
  permisoes: "nenhuma",
  aliases: ["add-karina","kariinvite","invite"],
  description: "me adicione em seu servidor!",
  usage: "convidar"
}