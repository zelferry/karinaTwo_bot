var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

var yiff = require("yiff_api")

var Discord = require("discord.js")
var yiff_ = new yiff.yiff()

module.exports = {
	name: 'yiff',
	description: '《😈nsfw》yiff 7w7',
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
    ],
	global: true,
	async execute(interaction,client){
		
		let data = interaction.data.options[0].value//.split(" ")
		let channel = client.channels.cache.get(interaction.channel_id)
		
		let text = data_2.map(x => `\`${x}\``).slice(0, -1).join(", ") + ` e \`${data_2[data_2.length -1]}\``

		
  if (!channel.nsfw) return client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `🚫| esse canal não e um canal com a função **nsfw** ativada\ne nem posso mostrar quais canais são canais com função **nsfw** ativada por que isso e um comando de **/barra**!`
				}
			}
		});
		
	if(!data_2.includes(data)){
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `🚫| tag invalida!\ntags disponíveis: ${text}`
				}
			}
		});
	} else {
	var json = await yiff_[`${data}`]()
	let embed = new Discord.MessageEmbed().setImage(json.url).setColor("#7B68EE").setDescription([					`[[ShortURL]](${json.shortURL})`,					`[[Reporta imagem?]](${json.reportURL})`,					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[sem source]` : `[[source]](${json.sources[0]})`}`].join("\n"))


client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [embed]
                    }
                }
            })

	}
	}
}