const Discord = require("discord.js");


let util = require("../utils/main.js")
let KariWebhooks = new util.webhooks()

exports.run = async (client, message, args) => {
message.delete();
const content = args.join(" ");

if (!args[0]) {
  return message.channel.send(`${message.author.username}, escreva o relatorio após o comando`)
} else if (content.length > 1000) {
  return message.channel.send(`${message.author.username}, forneça um relatorio de no máximo 1000 caracteres.`);
} else {
  KariWebhooks.suport(
    new Discord.MessageEmbed()
    .setColor("#FFFFF1")
    .addField("Autor:", message.author)
    .addField("Conteúdo", content)
    .setFooter(`suporte por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
  );
  await message.channel.send({embed: {
  color: 3547013,
  description: `${message.author} relatorio enviado com suseso no meu servidor de suporte!`
}}).then(msg => msg.delete({ timeout: 5000 }))

  
}
}
exports.help = {
  name:"relatorio",
  permisoes: "nenhuma",
  aliases: ["bug-report","report","sugestao","sugestion"],
  description: "encontrou algum bug ou quer dar alguam sugestão? usse esse comando",
  usage: "relatorio <texto>"
}