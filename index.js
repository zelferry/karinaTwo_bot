const kariModu = require('./KariModules/index.js');
let util = require('./utils/main.js');
const Discord = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');
const clientConfig = require('./database/client/config.json');

let client_bot = require("./handlers/index.js")
const client = new client_bot.client({bot:clientConfig.client});
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
});
const bansUsers = require('./database/IDs/bansUsers/bans.json');
const cooldowns = new Discord.Collection();
const db = require('megadb');
const dbfunc = require('./KariModules/ban.js');
let blacklist = require('./database/client/blacklisted.json');
const dblow = dbfunc.dblow;
const ms = require('ms');
let commands__ = new util.commands(client, clientConfig, _giveaway);
let KariWebhooks = new util.webhooks();

let bans = new util.bans()

client.on('message', async message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;

	let PrefixDB = new db.crearDB('Prefix');

	if (!PrefixDB.tiene(`${message.guild.id}`))
		PrefixDB.establecer(`${message.guild.id}`, {
			prefix: 'f/'
		});

	let prefixoAtualp_ = await PrefixDB.obtener(`${message.guild.id}.prefix`);

	const prefixoAtual = message.content.includes(prefixoAtualp_)
		? prefixoAtualp_
		: 'f/';

	const banimentos = bans.find(message.author)

	let prefix = prefixoAtual;

	if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

	if (
		message.content.startsWith(`<@!${client.user.id}>`) ||
		message.content.startsWith(`<@${client.user.id}>`)
	)
		return;

	if (banimentos) return message.reply({
			content: '',
			embed: {
				description: ':no_entry_sign: você foi banido de usar meus comandos!',
				color: 389301,
				fields: [
					{
						name: 'com o motivo',
						value: '**' + banimentos.motive + '**'
					}
				]
			}
		});

	const args = message.content
		.trim()
		.slice(prefix.length)
		.split(/ +/g);

	const comando = args.shift().toLowerCase();
	let command = comando;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	var now = Date.now();
	var timestamps = cooldowns.get(command.name);
	var cooldownAmount = 5 * 1000;

	if (timestamps.has(message.author.id)) {
		var expTime = timestamps.get(message.author.id) + cooldownAmount;
	}
	if (now < expTime) {
		var timeLeft = (expTime - now) / 1000;
		return message.reply(
			`Espere mais **${timeLeft.toFixed(
				1
			)}** segundos para executar este comando novamente.`
		);
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		const atsn = require(`./KariModules/anti-fuck.js`);

		//let commandFile = require(`./commands/${comando}.js`);

		var cmd =
			client.commands.get(comando.slice(prefix.lenght)) ||
			client.commands.get(client.aliases.get(comando.slice(prefix.lenght)));

		const test = atsn.findOne(
			(ops = {
				listPalvroes: blacklist.words,
				ignoreUsers: clientConfig.functions.ignoredUsers
			}),
			message
		);

		if (test) {
			message.channel.send('🙍| EI!,\nmodere sua linguagem!');
		} else {
			//console.log(cmd.run)
			/*
			if(cmf == undefined){
				message.c
			}*/
			cmd.run(client, message, args);
		}

		KariWebhooks.commands(
			new Discord.MessageEmbed()
				.setDescription(
					`✅| o **${message.author.username}** ussou **${prefix}${comando} **${
						args[0]
							? `com **${message.content.split(`${comando}`)[1]}**`
							: `sem argumentos`
					}, no canal **${message.channel.name}**`
				)
				.setColor('#EE82EE')
		);
	} catch (err) {
		console.error(err);

		message.channel.send({
			embed: {
				color: '#FF0000',
				description:
					'🚫 o comando `' +
					comando +
					'` não **existe**.\n\nuse `' +
					prefix +
					'help` para ver meus comandos **listados** e **categorizados**! :3'
			}
		});

		KariWebhooks.commands(
			new Discord.MessageEmbed()
				.setDescription(
					`❌| o **${message.author.username}** ussou **${prefix}${comando} **${
						args[0]
							? `com **${message.content.split(`${comando}`)[1]}**`
							: `sem argumentos`
					}, no canal **${message.channel.name}**`
				)
				.setColor('#FF0000')
				.addField('mas deu erro devido a:', '```js ' + err + '```')
		);
	}
});

function status() {
	let shardID = client.shard.ids[0];

	client.user.setActivity(
		`f/help | guilds: ${client.guilds.cache.size + 1} | V${
			require('./package.json').version
		} | shard[${shardID}]`,
		{ type: 'WATCHING' }
	);
}
client.on('ready', async () => {
	let shards = client.shard.ids[0];

	status();
	setInterval(status, 5000);

	client.user.setStatus('online').catch(console.error);
	console.log(`${client.user.tag} online!`);

	commands__.loadingSlashCommands();
});
new client_bot.events(`${clientConfig.footer.root}/events`,client)
/*
client.on('message', message => require('./events/help.js')(client, message));
client.on('message', message => require('./events/afk.js')(client, message));
client.on('message', message => require('./events/owo.js')(client, message));
client.on('message', message =>
	require('./antiRaid/index.js')(client, message, kariModu)
)*/

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
});

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
});

client.on('message', async message => {
	if (message.channel.type === 'dm') return;

	let _guilds = clientConfig.adverts.guilds;
	let automatic = clientConfig.adverts.auto;

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
});

/*
client.on("debug", console.log)
client.on("warn", console.log)
*/

client.on('rateLimit', ratelimit => {
	console.error(`Client is being rate limited.\n
    Timeout: ${ms(ratelimit.timeout)} ms
    Limit: ${ratelimit.limit}
    Method: ${ratelimit.method}
    Path: ${ratelimit.path}
    Route: ${ratelimit.route}`);
});

commands__.loadingCommands();
client.connect(process.env.TOKEN);