const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const { GiveawaysManager } = require('discord-giveaways');

const clientConfig = require('../../database/client/config.json');

class _client extends Discord.Client {
	constructor(opts) {
		super(opts.bot);

		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.commands.array = [];
		this.commands2 = new Discord.Collection();
		this.cooldown = new Discord.Collection()
	}
	 connect(token) {
	 	this.on("ready",()=>{
	 		
	 		
	 		let channels_ = this.channels.cache.filter((channel) => channel.name.includes("spam")).map(x => x.id)
	 	
	 		let channels_2 = this.channels.cache.filter((channel) => channel.name.includes("contagem")).map(x => x.id)
	 	
		this.antiSpam = new AntiSpam({
			warnThreshold: 3, 
			muteThreshold: 4,
			kickThreshold: 7,
			banThreshold: 7, 
			maxInterval: 5000,
			warnMessage: '{@user}, Por Favor Pare De Spamar/flooda nesse servidor.',
			kickMessage: '😠|**{user_tag}** Foi Kicado do Server por **raid/flood**.',
			banMessage: '🔨| **{user_tag}** Foi BANIDO Por **raid/flood**.',
			muteMessage: '🔇|**{user_tag}** foi silenciado por Spamar/floodar nesse servidor.',
			maxDuplicatesWarning: 6,
			maxDuplicatesKick: 10,
			maxDuplicatesBan: 12,
			maxDuplicatesMute: 8,
			ignoreBots: true,
			verbose: true,
			muteRoleName: "antiraid_role",
			removeMessages: false,
			ignoredUsers: [],
			ignoredPermissions: ['ADMINISTRATOR'],
			ignoredChannels:[...channels_,...channels_2],
			errorMessages:  true,
			kickErrorMessage: 'não foi possível expulsar o **{user_tag}** por conta que eu não tenho a permissão **expulsar membros** em meu cargo principal.',
			banErrorMessage: 'não foi possível banir o  **{user_tag}** por conta que eu não tenho a permissão **banir membros** em meu cargo principal.',
			muteErrorMessage: 'Não foi possível silenciar **{user_tag}** devido a permissões impróprias ou a função mudo não pôde ser encontrada',
			debug: true,
		});

	 	})
		this.login(token);
	}
	disconnectBOT() {}
}

module.exports = _client; 