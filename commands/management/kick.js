const Discord = require('discord.js');

exports.run = async(client, message, args) => {

if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply({content:`💢| desculpe mas você nao tem um cargo com a função EXPULSAR MEMBROS ativada!`});

  if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({content:'🚫**|** eu preciso de permissão para isso!\n🤔**|** e necessário que eu tenha a permissão EXPULSAR MEMBROS pra isso'});

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        if (!member) return message.reply({content:'você precisa mencionar um usuário!'});
        if (member.id === message.member.id) return message.reply({content:'você não pode se expulsar!'});
        if (member.id === client.user.id) return message.reply({content:'você não pode me expulsar!'});
    
    if (!message.member.roles.highest > member.roles.highest) return message.reply({content:`você não pode punir esse membro, pois ele tem o cargo mais maior que o seu!`}); // 
    
        if (!message.guild.me.roles.highest > member.roles.highest) return message.reply({content:`eu não posso punir o membro, pois ele tem o cargo maior que o meu!`}); 
    
        if (!member.kickable) return message.reply({content:`você não pode punir o membro, pois esse membro não é **expulsavel**`}); 
        

        let motivo = args.slice(1).join(" ");
        if (!motivo) motivo =  "... não sei ._."

        message.reply({content:`😠| o usuário ${member} foi expulso com sucesso por causa de: **${motivo}**`});
        member.kick(motivo);
}
exports.config = {
    test: false
}
exports.help = {
  name:"kick",
  permisoes: "expulsar membros",
  aliases: ["expulsar"],
  description: "expulse aquele membro chato do seu servidor",
  usage: "kick <usuario> [motivo]"
}