const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({content: "🚫|sem permisão, requer um cargo com a funsão `GERENSIAR MENSAGENS` ativado para usar esse comando."});
    
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 100) return message.reply({content: "forneça um número de até **100 mensagens** a serem excluídas"});

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount
  })
  message.channel.bulkDelete(fetched,true).then((c)=> {
      let cout_result = (c.size - args[0]);
      let STRING = `\u200B`
      if(cout_result > 0) STRING = `porém, **${cout_result}** massagens não foram deletadas por terem mais de 2 semanas`;
      
      message.channel.send({content:`**${c.size} mensagens limpas nesse chat!**\n${STRING}`})
  }).catch(error => console.log(error));
};
exports.config = {
    test: false
}
exports.help = {
  name:"clean",
  permisoes: "gerenciar mensagens",
  aliases: ["limpar","clear"],
  description: "limpar mensagens em um canal de texto",
  usage: "clean <numero>"
}