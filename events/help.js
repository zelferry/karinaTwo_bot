const Discord = require("discord.js")

exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {
	if (!message.guild) return;
	mention(client, message)
}

async function mention (client, message) {

  const servers = [
    `<@!${client.user.id}>`,
    `<@${client.user.id}>`,
    `karinaTwo prefix`,
    `karinaTwo prefix?`,
    `KarinaTwo#5954`
  ];
  if (servers.includes(message.content)) {

    let {prefix} = require("../mongoDB/ini.js").guild 

	const prefixoAtual = await prefix.findPrefix(message.guild,message,false)

    const embed = await new Discord.MessageEmbed()
        .addField(`Meu Prefixo Neste Servidor:`, "`" + prefixoAtual + "`")
        .setColor("#ff47ec")

    message.channel.send(embed) 
  }
}