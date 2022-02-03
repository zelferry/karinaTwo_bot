var Discord = require("discord.js");

module.exports = (client,interaction) =>{
    let channels_ = interaction.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">");
    let embed_2 = new Discord.MessageEmbed().setColor("#FF7F50").setDescription(`:x:|o canal não tem a função **NSFW** ativada!`).setTimestamp();
    let text = channels_.map(x => `${x}`).slice(0, -1).length > 1 ? channels_.map(x => `${x}`).slice(0, -1).join(", ") + ` ou em ${channels_[channels_.length -1]}` : channels_.map(x => `${x}`).join(", ")
	
	if(channels_.length > 0){
		embed_2.addFields({
            name: `tente novamente em:`,
            value: `${text}.`
        });
	}
	interaction.editReply({ embeds: [embed_2], ephemeral: true });
}