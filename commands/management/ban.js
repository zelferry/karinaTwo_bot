const Discord = require('discord.js');

exports.run = async(client, message, args) => {

if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({content:`💢| desculpe mas você nao tem um cargo com a função BANIR MENBROS ativada!`});

  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({content:'🚫**|** eu preciso de permissão para isso!\n🤔**|** e necessário que eu tenha a permissão BANIR MEMBROS pra isso'});

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        if (!member) return message.reply({content:'você precisa mencionar um usuário!'});
        if (member.id === message.member.id) return message.reply({content:'você não pode se banir!'});
        if (member.id === client.user.id) return message.reply({content:'você não pode me banir!'});
    
    if (!message.member.roles.highest > member.roles.highest) return message.reply({content:`você não pode punir esse membro, pois ele tem o cargo mais maior que o seu!`}); // 
    
        if (!message.guild.me.roles.highest > member.roles.highest) return message.reply({content:`eu não posso punir o membro, pois ele tem o cargo maior que o meu!`}); 
    
        if (!member.bannable) return message.reply({content:`você não pode punir o membro, pois esse membro não é **Banivel**`}); 
        

        let motivo = args.slice(1).join(" ") ?? "... não sei ._."
        if(!motivo) motivo =  "... não sei ._."

        message.reply({content:`😡| o usuário ${member} foi banido com sucesso por causa de: **${motivo}**`});
        member.ban({days: 7, reason: motivo});
}
exports.config = {
    test: false
}
exports.help = {
  name:"ban",
  permisoes: "banir membros",
  aliases: ["banir","chutar","martelo-poderoso"],
  description: "de um belo de um BAN em usuários que quebram regras",
  usage: "ban <usuario> [motivo]"
}