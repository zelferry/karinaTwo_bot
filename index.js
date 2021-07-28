const kariModu = require('./KariModules/index.js');
let util = require('./utils/main.js');
const Discord = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');
const clientConfig = require('./database/client/config.json');

let client_bot = require("./handlers/index.js")

const client = new client_bot.client({bot:clientConfig.client});/*
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
	async refreshStorage() {
		return client.shard.broadcastEval(() =>
			this.giveawaysManager.getAllGiveaways()
		);
	}
};
const _giveaway = new GiveawayManagerWithShardSupport(client, {
	storage: './database/giveaway/data.json',
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		embedColor: '#87CEFA',
		embedColorEnd: '#000000',
		reaction: '🎉'
	}
});*/
const bansUsers = require('./database/IDs/bansUsers/bans.json');
const cooldowns = new Discord.Collection();
const db = require('megadb');
const dbfunc = require('./KariModules/ban.js');
let blacklist = require('./database/client/blacklisted.json');
const dblow = dbfunc.dblow;
const ms = require('ms');

//let commands__ = new util.commands(client, clientConfig, _giveaway);

let KariWebhooks = new util.webhooks();

//let bans = new util.bans()

new client_bot.events(`${clientConfig.footer.root}/events`,client,"a","b")
/*
client.on('guildCreate', function(guild) {
	KariWebhooks._exit(
		new Discord.MessageEmbed()
			.setColor('#FFFFF1')
			.setTitle(`karina entrou em um server!`)
			.addField('nome do server:', guild.name)
			.addField('id do server:', guild.id)
	);
});

client.on('guildDelete', function(guild) {
	if (guild.id === '810990219281039391' || guild.id === '803456484369367081')
		return;

	require('./database/controllers/delete/megaDB.js')(guild);

	client.giveawaysManager.giveaways
		.filter(g => g.guildID === guild.id)
		.forEach(g => client.giveawaysManager.delete(g.messageID));

	KariWebhooks._exit(
		new Discord.MessageEmbed()
			.setColor('#FFFFF1')
			.setTitle(`karina saiu de um server!`)
			.addField('nome do server:', guild.name)
			.addField('id do server:', guild.id)
	);
});*/
/*
client.ws.on('INTERACTION_CREATE', async interaction => {
	if (!client.commands2.has(interaction.data.name)) return;

	try {
		client.commands2.get(interaction.data.name).execute(interaction, client);
	} catch (error) {
		console.log(
			`erro no comando de barra ${interaction.data.name} : ${error.message}`
		);
		console.log(`${error.stack}\n`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `ops!\ndeu um erro\"estranho\" ao executar o comando!`
				}
			}
		});
	}
});*/

/*
client.on("debug", console.log)
client.on("warn", console.log)
*/

//commands__.loadingCommands();
client.connect(process.env.TOKEN);