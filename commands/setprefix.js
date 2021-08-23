
const Discord = require("discord.js");
let {prefix} = require("../mongoDB/ini.js").guild 

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("🚫 | Você não tem permissão para executar esse comando! Permissão necessária: `Administrador`");

  
  const newPrefix = args[0]

  const embedError = await new Discord.MessageEmbed()
    .setTitle('Erro')
    .setDescription("**Prefixos com +5 caracteres não são permitidos, assim, evitarei bugs.**")
    .setColor("#e0000f")

  if(newPrefix.length >= 5) return message.channel.send(embedError);
  message.guild.me.setNickname(`[${newPrefix}] ${client.user.username}`,"prefixo alterado via comando")

prefix.setPrefix(message.guild,newPrefix)
  const embed = await new Discord.MessageEmbed()
    .setDescription("**Configurações Atualizadas**")
    .addField("Novo Prefixo:", '`' + newPrefix + '`')
    .setColor("#e0000f")

  message.channel.send(embed);
};
exports.help = {
  name:"setprefix",
  permisoes: "administrador",
  aliases: ["mudar-prefixo","prefixo","newprefix","prefix"],
  description: "troque meu Prefixo",
  usage: "setprefix <novo prefixo>"
}