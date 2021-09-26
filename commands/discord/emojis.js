const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	
	let ata_ = message.guild.emojis.cache.filter((c) => c.animated === true).map((c) => `<a:${c.name}:${c.id}>`)
	let _ata_ = message.guild.emojis.cache.filter((c) => c.animated === false).map((c) => `<:${c.name}:${c.id}>`)

	
	let ata = [...ata_,..._ata_].join("\u2006\u2006")
	
  let emotes = new Discord.MessageEmbed().setTitle("Emojis").setDescription(_ata_.join("\u2006\u2006")).setColor("RED");

    let emotes_ = new Discord.MessageEmbed().setTitle("Emojis").setDescription(ata_.join("\u2006\u2006")).setColor("RED");
    
let allemotes = new Discord.MessageEmbed().setTitle("Emojis").setDescription(ata).setColor("RED");
    

var embeds = [emotes,emotes_,allemotes]
		var menu = {
            id:"emojis",
            placeholder:"filtrar...",
            selects:[
                {
                    id:"normal_emojis",
                    label:"emojis normais",
                    description:"apenas emojis não animados"
                },
                {
                    id:"animated_emojis",
                    label:"emojis animados",
                    description:"apenas emojis animados"
                },{
id:"all_emojis", 
label:"todos os emojis",
description:"todos os emojis do servidor"}
            ]
        };
		
      
    
		message.channel.menu(message.author.id, {
			embeds: embeds,
			menu: menu
		});
    
//setThumbnail("https://i.imgur.com/KGmBrSk.png")
 // message.channel.send(emotes);
};

exports.help = {
  name: "emojis",
  permisoes: "nenhuma",
  aliases: [],
  description: "Lista todos os emojis existentes no server",
  usage: "emojis",
};