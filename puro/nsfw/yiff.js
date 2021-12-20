let comando = require("../../frameworks/commando/command_slash.js");

var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

var yiff = require("yiff_api")

var Discord = require("discord.js")
var yiff_ = new yiff.yiff()


class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "yiff",
            description: "[ 😈 nsfw ] yiff booru(?)",
            commandOptions: [
                {
			type: 3,
            name: "type_image",
            description: "qual sera o tipo? 7-7",
            required: true,
            choices:[
            	{
            		name:"gay",
            		value:"gay"
            	},
            	{
            		name:"straight",
            		value:"straight"
            	},
            	{
            		name:"lesbian",
            		value:"lesbian"
            	},
            	{
            		name:"synormorph",
            		value:"synormorph"
            	},
            	{
            		name:"bulge",
            		value:"bulge"
            	},
            	{
            		name:"andromorph",
            		value:"andromorph"
            	}
            ]
		}
            ]
        })
    }
    async interactionRun(interaction){
        let data = interaction.options.getString('type_image')//.split(" ")
		let channel = this.client.channels.cache.get(interaction.channelId)
		
		let text = data_2.map(x => `\`${x}\``).slice(0, -1).join(", ") + ` e \`${data_2[data_2.length -1]}\``;
        if (!channel.nsfw) return await interaction.reply({
            content: `🚫| esse canal não e um canal com a função **nsfw** ativada\ne nem posso mostrar quais canais são canais com função **nsfw** ativada por que isso e um comando de **/barra**!`,
            ephemeral: true
        });
		
	if(!data_2.includes(data)){
        await interaction.reply({
            content: `🚫| tag invalida!\ntags disponíveis: ${text}`
        });
	} else {
	var json = await yiff_[`${data}`]()
	let embed = new Discord.MessageEmbed().setImage(json.url).setColor("#7B68EE").setDescription([					`[[ShortURL]](${json.shortURL})`,					`[[Reporta imagem?]](${json.reportURL})`,					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[sem source]` : `[[source]](${json.sources[0]})`}`].join("\n"));
        
        await interaction.reply({
            embeds:[embed]
        })
    }
    }
} 
module.exports = Command 