const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	
	let ata_ = message.guild.emojis.cache.filter((c) => c.animated === true).map((c) => `<a:${c.name}:${c.id}>`)
	let _ata_ = message.guild.emojis.cache.filter((c) => c.animated === false).map((c) => `<:${c.name}:${c.id}>`)

	
	let ata = [...ata_,..._ata_].join("\u2006\u2006")
	
  let emotes = new Discord.MessageEmbed().setTitle("Emojis").setDescription(ata).setColor("RED");
  
//setThumbnail("https://i.imgur.com/KGmBrSk.png")
  message.channel.send(emotes);
};

exports.help = {
  name: "emojis",
  permisoes: "nenhuma",
  aliases: [],
  description: "Lista todos os emojis existentes no server",
  usage: "emojis",
};