let Discord = require("discord.js")

let { bansUsers } = require("../../../data/ini.js").user 

exports.run = async (client, message, args) => {
    if(!args.length > 0) return message.reply({
        content: "🚫**|** insira um ID!"
    });
    
    let member = await client.users.fetch(args[0], true);

    if (!member) return message.reply({
        content: 'você precisa mencionar um usuário!'
    });
    
    let bansSeek = await bansUsers.seekAndValidateBan(member);
    if(!bansSeek) return message.channel.send({content:"DATABASE ERROR: o usuário não existe!"});

    if(bansSeek.ready){
        await bansUsers.removeBan(member)
        message.channel.send({content:`o usuário <@${member.id}> foi desbanido de usar meus comandos!`});
        
        return {}
    } else {
        message.channel.send({content:`DATABASE ERROR: o usuário não foi banido!`});
        
        return {}
    }
}

exports.config = {
    test: false
}
exports.help = {
  name:"userurban",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "desbanir um usuário de usar meus comandos",
  usage: "userurban <usuario>"
}