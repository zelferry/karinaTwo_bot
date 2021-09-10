const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const { GiveawaysManager } = require('discord-giveaways');
const clientConfig = require('../../database/client/config.json');
const Cluster = require('discord-hybrid-sharding');
const usev13 = false;

class _client extends Discord.Client {
	constructor(opts) {
		super({
			shards: Cluster.data.SHARD_LIST,
			shardCount: Cluster.data.TOTAL_SHARDS,
			...opts.bot
		});

		this.cluster = new Cluster.Client(this, usev13);
		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.commands.array = [];
		this.config = clientConfig;
		this.commands2 = new Discord.Collection();
		this.cooldown = new Discord.Collection();
		this.extra = {};
		this.extra.utils = require('../../utils/main.js');
		this.shard = process.env.CLUSTER_MANAGER
			? Discord.ShardClientUtil.singleton(this, process.env.CLUSTER_MANAGER_MODE) : null;
	}
	connect(token) {
		this.on('ready', () => {
			let channels_1 = this.channels.cache
				.filter(channel => channel.name.includes('spam'))
				.map(x => x.id);

			let channels_2 = this.channels.cache
				.filter(channel => channel.name.includes('contagem'))
				.map(x => x.id);

			this.antiSpamGlobalCofig = {
				ignoredCannels: [...channels_1, ...channels_2]
			};

			this.antiSpam = new AntiSpam({
				warnThreshold: 3,
				muteThreshold: 4,
				kickThreshold: 7,
				banThreshold: 7,
				maxInterval: 5000,
				warnMessage: '{@user}, Por Favor Pare De Spamar/flooda nesse servidor.',
				kickMessage:
					'😠|**{user_tag}** Foi Kicado do Server por **raid/flood**.',
				banMessage: '🔨| **{user_tag}** Foi BANIDO Por **raid/flood**.',
				muteMessage:
					'🔇|**{user_tag}** foi silenciado por Spamar/floodar nesse servidor.',
				maxDuplicatesWarning: 6,
				maxDuplicatesKick: 10,
				maxDuplicatesBan: 12,
				maxDuplicatesMute: 8,
				ignoreBots: true,
				verbose: true,
				muteRoleName: 'antiraid_role',
				removeMessages: true,
				ignoredUsers: [],
				ignoredPermissions: ['ADMINISTRATOR'],
				ignoredChannels: this.antiSpamGlobalCofig.ignoredCannels,
				errorMessages: true,
				kickErrorMessage:
					'🚫| não foi possível expulsar o **{user_tag}** por conta que eu não tenho a permissão **expulsar membros** em meu cargo principal.',
				banErrorMessage:
					'🚫| não foi possível banir o  **{user_tag}** por conta que eu não tenho a permissão **banir membros** em meu cargo principal.',
				muteErrorMessage:
					'🚫| não foi possível silenciar **{user_tag}** devido a permissões impróprias ou a função mudo não pôde ser encontrada',
				debug: true
			});
		});
		this.login(token);
	}
	disconnectBOT() {}
}

module.exports = _client;
