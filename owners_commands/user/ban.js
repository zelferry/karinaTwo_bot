let Discord = require("discord.js")

let { bansUsers } = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {
    if(!args.length > 0) return message.reply({
        content: "🚫**|** insira um ID!"
    });
    
    let member = await client.users.fetch(args[0], true);

    if (!member) return message.reply({
        content: 'você precisa mencionar um usuário!'
    });
    
    let bansSeek = await bansUsers.seekAndValidateBan(member);

    if(!bansSeek.ready){
       await bansUsers.addban(member, args.slice(1).join(' '));
        message.channel.send({content:`o usuário <@${member.id}> foi banido de usar meus comandos!`});
        
        return {}
    } else {
        message.channel.send({content:`DATABASE ERROR: O Membro já tem registro na DataBase.`});
        
        return {}
    }
}

exports.config = {
    test: false
}
exports.help = {
  name:"userban",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "banir um usuário de usar meus comandos",
  usage: "userban <usuario>"
}