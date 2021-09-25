const Discord = require('discord.js')

exports.run = async (bot, message) => { 
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("VOCÊ NÃO É ADM!")
    try {
      let output = '';
        let i = 0
          
        message.channel.send(`Você quer receber a lista de bans? Reaja com ✅ para confirmar o envio.`)
              .then(async (msg) => {
          await msg.react("✅")
          await msg.react("⏹")
            const filtro = (reaction, user) => ['✅', '⏹'].includes(reaction.emoji.name) && user.id === message.author.id
              const coletor = msg.createReactionCollector(filtro)
              
              coletor.on("collect", r => {
                
                switch (r.emoji.name) {
                  case '✅':
                    
                    msg.reactions.removeAll
                    message.guild.fetchBans().then(async (bans) => {
                     message.channel.send('Enviei a lista de bans no seu privado! \n(Caso não receba nenhuma mensagem no privado significa que não tem ninguem banido!)');
                      bans.forEach(async (ban) => {
                        i++;
                          
                          await message.author.send(i+ '.**Nome:**' + ban.user.username + ' | **ID:** ' + ban.user.id + ' | **bot:**' + ban.user.bot + '');
                      
                      })
                    })
                     break;
                    case '⏹': 
                     msg.reactions.removeAll
                    msg.delete().then(message.channel.send(`O envio foi cancelado.`));
                    break;
                } 
              })
        })
    } catch (err) {
      message.channel.send('Um erro aconteceu! \n' + err).catch();
    }
  message.delete().catch(O_o => {});
console.log(`comando f/banlist usado`);
}
exports.help = {
  name:"banlist",
  permisoes: "banir membros",
  aliases: ["lista-banidos","bannidoslista"],
  description: "veja a lista de banidoa do seu servidor",
  usage: "banlist"
}