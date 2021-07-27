const Discord = require('discord.js');
const botID = process.env.BOT_ID;

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`💢| desculpe mas você nao tem um cargo com a função BANIR MENBROS ativada!`);


  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('eu preciso de permissão para isso!');

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('você precisa mencionar um usuário!');
        if (member === message.member) return message.reply('você não pode se banir!');
        if (member.id === botID) return message.reply('você não pode me banir!');

        let motivo = args.slice(1).join(" ");
        if (!motivo) return message.reply('você precisa dar um motivo!');

        message.channel.send(`😡| o usuário ${member} foi banido com sucesso por causa de: \n**${motivo}**`);
        member.ban();
}
exports.help = {
  name:"ban",
  permisoes: "banir membros",
  aliases: ["banir","chutar","martelo-poderoso"],
  description: "de um belo de um BAN em usuários que quebram regras",
  usage: "ban <usuario> <motivo>"
}