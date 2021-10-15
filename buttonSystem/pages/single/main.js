const Discord = require('discord.js');
//const { MessageButton, MessageActionRow } = require('discord-buttons');

class ButtonPages {
	constructor(message, client) {
		this.message = message;
		this.client = client;
	}
	async buttonPages(database) {
		var { message, client } = this;

		var randNumerViaDatabase = Math.floor(Math.random() * database.length);
		var arr = database;
		var numberViaDatabase = randNumerViaDatabase;
		var embed_ = new Discord.MessageEmbed().setImage(database[randNumerViaDatabase]).setColor('#7B68EE').setFooter(`${randNumerViaDatabase + 1} / ${arr.length}`);

		let buttonStop = new Discord.MessageButton().setCustomId('stop').setEmoji(`❌`).setStyle(`DANGER`);
        
		let buttonRandon = new Discord.MessageButton().setCustomId('random').setEmoji(`🔄`).setStyle(`SUCCESS`);

		let removed = false;

		let row = new Discord.MessageActionRow().addComponents(buttonRandon, buttonStop);
		let msg = await message.channel.send({
            embeds: [embed_],
            components: [row]
        });
        
		const filter_ = (interaction) => {
        return (interaction.customId === 'stop' || interaction.customId === 'random') && interaction.user.id === message.author.id 
    };
        
		const collector = msg.createMessageComponentCollector({
            filter: filter_,
            componentType: 'BUTTON',
            idle: 1000 * 60
        });

		collector.on('collect', async r => {
            r.deferUpdate()
			//r.reply.defer();

			if (r.customId === 'random') {
				randNumerViaDatabase = Math.floor(Math.random() * database.length);
				arr = database;
				numberViaDatabase = randNumerViaDatabase;
				const embed = new Discord.MessageEmbed().setImage(arr[randNumerViaDatabase]).setColor('#7B68EE').setFooter(`${numberViaDatabase + 1} / ${arr.length}`);
                
				msg.edit({
                    embeds: [embed],
                    components: r.message.components 
                });
			}
			if (r.customId === 'stop') {
				collector.stop(200);
			}
		});

		collector.on('end', (pingaa, p) => {
			/*
			if (msg) {
                const embed = new Discord.MessageEmbed().setImage(arr[numberViaDatabase]).setColor('RED');

				if (removed == false) {
					
					msg.components[0].components[0].setDisabled();
					msg.components[0].components[1].setDisabled();

					msg.edit(embed, { components: msg.components });
				} else {
					console.log('cu');
				}
			} else {
				console.log('1');
			}*/
			if (msg) {
				//	console.log(p)
				const embed = new Discord.MessageEmbed().setImage(arr[numberViaDatabase]); //.setColor("RED");

				if (p === 200) {
					embed.setColor('#FFF0F5');
					msg.edit({
                        embeds:[embed],
                        components: [] 
                    });
				} else {
					//	console.log("cu")
                    msg.components[0].components[0].setDisabled();
					msg.components[0].components[1].setDisabled();

					embed.setColor('RED');
					embed.setFooter('desativado por inatividade');

					msg.edit({
                        embeds:[embed],
                        components: msg.components
                    });
				}
			} else {
				console.log('1');
			}
		});
	}
}
module.exports = ButtonPages;
