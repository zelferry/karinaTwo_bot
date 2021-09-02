var Discord = require("discord.js");

module.exports = (client,message) =>{
	let channels_ = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" )

    let embed_2 = new Discord.MessageEmbed().setColor("#FF7F50").setDescription(`:x:|o canal não tem a função **NSFW** ativada!`).setTimestamp()
        
	if(channels_.length > 0){
		embed_2.addFields({
		name: `tente novamente em:`,
		value: `${channels_}`
	});
	}else{}

	message.channel.send(embed_2);
}