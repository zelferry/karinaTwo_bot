let clientConfig = require('../database/client/config.json');
let _guilds = clientConfig.adverts.guilds;
let automatic = clientConfig.adverts.auto;

exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {
	if (_guilds.includes(message.guild.id)) {
		if (message.channel.type == 'news') {
			if (!automatic == true) {
				let author = message.author;
				let msg = message;
				msg.react('✅');
				msg.react('❌');

				msg = await msg;
				const filter = (reaction, user) =>
					['✅', '❌'].includes(reaction.emoji.name) && user.id === author.id;
				const collector = await msg.createReactionCollector(filter, {
					time: 1000 * 60 * 60
				});
				collector.on('collect', async r => {
					let user = r.users.cache.last();
					user.id != client.user.id && r.users.remove(user);

					if (r.emoji.name === '✅') {
						message.crosspost();

						msg.reactions.removeAll();
					}
					if (r.emoji.name === '❌') {
						msg.reactions.removeAll();
					}
				});

				collector.on('end', () => {
					if (msg) {
						msg.reactions.removeAll();
					} else {
						console.log('inexistência da mensagem');
					}
				});
			} else {
				message.crosspost();
			}
		}
	}	
}