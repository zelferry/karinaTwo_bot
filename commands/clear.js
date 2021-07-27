const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "🚫|sem permisão, requer um cargo com a funsão  `GERENSIAR MENSAGENS` ativano para usar esse comando."
    );
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 100)
    return message.reply(
      "forneça um número de até **100 mensagens** a serem excluídas"
    );

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount
  })
  message.channel.bulkDelete(fetched,true).then((c)=> console.log(c.size))
  message.channel
    .send(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({ timeout: 5000 }))
    .catch(error =>
      message.channel.send(`DEU ERRO!!!, devido a: ${error}`)
    );
};
exports.help = {
  name:"clear",
  permisoes: "{MANAGE.MESSAGES}",
  aliases: ["limpar"],
  description: "limpar mensagens em um canal de texto",
  usage: "clear <numero>"
}