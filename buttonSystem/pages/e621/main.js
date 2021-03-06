const Discord = require('discord.js');
//const { MessageButton, MessageActionRow } = require('discord-buttons');

const ava9 = require("../../../database/client/blacklisted.json");
let blacklist = ava9.e6.blacklist
let {configs} = require("../../../mongoDB/ini.js").guild 

class ButtonPages {
	constructor(message, client) {
		this.message = message;
		this.client = client;
	}
	async buttonPages(posts, pos) {
		var { message, client } = this;
        let __configs = await configs.getConfig(message.guild,true);

		let sla = Math.floor(Math.random() * posts.length);

		let result = posts[sla];

		let id = result.id;
		let file = result.file.url;
		let extrafiles = result;
		let score = result.score.total;
		let cestis = `> **votos**: ${score} | **origem**: [original aqui](https://e621.net/post/show/${id})`;

		let avatar = message.author.avatarURL({
			dynamic: true,
			format: 'png',
			size: 1024
		});

		let tags = result.tags.general.concat(
			result.tags.species,
			result.tags.character,
			result.tags.copyright,
			result.tags.artist,
			result.tags.invalid,
			result.tags.lore,
			result.tags.meta
		);
	

	//	let blacklist = ['vore'];
		//retorna o texto
		function getOne(haystack, arr) {
			return arr.find(v => haystack.includes(v));
		}
		//buscar se contém um texto específico
		function findOne(haystack, arr) {
			return arr.some(v => haystack.includes(v));
		}

		if (tags) {
			if (findOne(blacklist, tags)) {
				file = 'https://static1.e621.net/data/a8/5e/a85ef1bf5f272c44cbcdd4405b5b94b6';
				cestis = `**tag(s) na blak-list!** - tag(s): \`${getOne(
					blacklist,
					tags
				)}\` | [**Link**](https://e621.net/posts/${id})`;
			}
		}

		if (file) {
			if (file.endsWith('.webm') || file.endsWith('.swf')) {
				cestis = `> **votos:** ${score} | **[Link](https://e621.net/post/show/${id})**\n> *arquivos em (webm/swf/mp3/mp4) não são compatíveis com embeds.*`;
			}
		}
		if (file == null) {
			cestis = `> **votos**:${score} | **[link](https://e621.net/posts/show/${id})*\n\n> **erro 500**\nvocê so pode ver a imagem com uma conta [logada](https://e621.net/users/new) na **e621**(\`so e possível ver no site com uma conta logada\`)`;
		}

		let ava = {
			embed: {
				color: '#C0C0C0',
				description: cestis,
				author: {
                    name: pos.join(' '),
                    icon_url: avatar 
                },
				image: {
					url: file
				},
				footer: {
					icon_url: 'http://i.imgur.com/RrHrSOi.png',
					text: `e621 · ${id}`
				}
			}
		};
        if(__configs.pagesBUTONS == true){
		let redVersion = {
			embed: {
				color: 'RED',
				description: cestis,
				image: {
					url: file
				}
			}
		};

		let buttonStop = new Discord.MessageButton().setCustomId("stop").setEmoji(`❌`).setStyle(`SECONDARY`);
            
		let buttonRandon = new Discord.MessageButton().setCustomId("random").setEmoji(`🔄`).setStyle(`SECONDARY`);

		let removed = false;

		let row = new Discord.MessageActionRow().addComponents(buttonRandon, buttonStop);

		let msg = await message.channel.send({
			embeds: [ava.embed],
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
				let sla = Math.floor(Math.random() * posts.length);

				let result = posts[sla];

				let id = result.id;
				let file = result.file.url;
				extrafiles = result;
				let score = result.score.total;
				let cestis = `> **votos**: ${score} | **origem**: [original aqui](https://e621.net/post/show/${id})`;

				let avatar = message.author.avatarURL({
					dynamic: true,
					format: 'png',
					size: 1024
				});

				let tags = result.tags.general.concat(
					result.tags.species,
					result.tags.character,
					result.tags.copyright,
					result.tags.artist,
					result.tags.invalid,
					result.tags.lore,
					result.tags.meta
				);

				//retorna o texto
				function getOne(haystack, arr) {
					return arr.find(v => haystack.includes(v));
				}
				//buscar se contém um texto específico
				function findOne(haystack, arr) {
					return arr.some(v => haystack.includes(v));
				}

				if (tags) {
					if (findOne(blacklist, tags)) {
						file = 'https://static1.e621.net/data/a8/5e/a85ef1bf5f272c44cbcdd4405b5b94b6';
						cestis = `**tag(s) na blak-list!** - tag(s): \`${getOne(
							blacklist,
							tags
						)}\` | [**Link**](https://e621.net/posts/${id})`;
					}
				}

				if (file) {
					if (file.endsWith('.webm') || file.endsWith('.swf')) {
						cestis = `> **votos:** ${score} | **[Link](https://e621.net/post/show/${id})**\n> *arquivos em (webm/swf/mp3/mp4) não são compatíveis com embeds.*`;
					}
				}
				if (file == null) {
					cestis = `> **votos**:${score} | **[link](https://e621.net/posts/show/${id})*\n\n> **erro 500**\nvocê so pode ver a imagem com uma conta [logada](https://e621.net/users/new) na **e621**(\`so e possível ver no site com uma conta logada\`)`;
				}

				ava = {
					embed: {
						color: '#C0C0C0',
						description: cestis,
						author: { name: pos.join(' '), icon_url: avatar },
						image: {
							url: file
						},
						footer: {
							icon_url: 'http://i.imgur.com/RrHrSOi.png',
							text: `e621 · ${id}`
						}
					}
				};
				redVersion = {
					embed: {
						color: 'RED',
						description: cestis,
				image: {
					url: file
				}
			}
		};
				
				msg.edit({
                    embeds: [ava.embed], 
                    components: msg.components
                }); //  message.channel.send(embed)
			}
			if (r.customId === 'stop') {
				let embed = new Discord.MessageEmbed().setColor('RED').setDescription('as páginas foram fechadas!').setTimestamp(Date.now());
				msg.components[0].components[0].setDisabled();
				msg.components[0].components[1].setDisabled();
				removed = true;
				msg.edit({
                    embeds: [redVersion.embed],
                    components: msg.components 
                });
                collector.stop(2)
				//  message.channel.send(embed)
			}
		});

		collector.on('end', () => {
			if (msg) {
				if (removed == false) {
					/*
					const embed = new Discord.MessageEmbed()
						.setImage(extrafiles.file.url)
						.setColor('RED')*/

					msg.components[0].components[0].setDisabled();
					msg.components[0].components[1].setDisabled();

					msg.edit({
                        embeds: [redVersion.embed],
                        components: msg.components
                    });
				} else {
					console.log('cu');
				}
			} else {
				console.log('1');
			}
		});
        //
        } else {
            message.channel.send({
                embeds: [ava.embed]
            })
        }
	}
}
module.exports = ButtonPages;
