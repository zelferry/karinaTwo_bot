const Discord = require('discord.js');
const fs = require('fs');
//let foo = "/home/runner/karinaTwo"

class cmds {
	constructor(client,config,giveaways) {/*
		client.commands = new Discord.Collection();
		client.aliases = new Discord.Collection();
		client.commands.array = [];
		client.commands2 = new Discord.Collection();
		client.cooldown = new Discord.Collection();
	*/	client.giveawaysManager = giveaways;

		this.client = client;
		this.foo = config.footer.root
	}
	loadingCommands() {
		let { client,foo } = this;

		fs.readdir(""+foo+"/commands", async function(err, files) {
			if (err) console.log(err);
			var jsf = files.filter(f => f.split('.').pop() === 'js');
			if (jsf <= 0)
				return console.log(
					'Pasta commands não existe, ou está sem arquivos .js'
				);
			jsf.forEach(f => {
				try {
					var cmd = require(""+foo+"/commands/"+f+"");
					client.commands.set(cmd.help.name, cmd);
					if (!cmd.help.description)
						return console.log(`--- Comando ${f} sem a string "description"`);
					if (!cmd.help.permisoes)
						return console.log(`--- Comando ${f} sem a string "permisoes"`);
					client.commands.array.push({
						name: cmd.help.name,
						desc: cmd.help.desc,
						permisoes: cmd.help.permisoes
					});
					if (!cmd.help.aliases) return;
					cmd.help.aliases.forEach(alias => {
						client.aliases.set(alias, cmd.help.name, cmd);
					});
				} catch (e) {
					console.error('ERROR: ' + e);
				}
			});
		});
	}
	async loadingSlashCommands() {
		
		let { client,foo } = this;
		
		const commandFiles = fs
			.readdirSync(''+foo+'/slash_comands')
			.filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`${foo}/slash_comands/${file}`);

			if (command.global == true) {
				client.api.applications(client.user.id).commands.post({
					data: {
						name: command.name,
						description: command.description,
						options: command.commandOptions
					}
				});
			} else {
				client.api
					.applications(client.user.id)
					.guilds('831611383233249381')
					.commands.post({
						data: {
							name: command.name,
							description: command.description,
							options: command.commandOptions
						}
					});
			}
			client.commands2.set(command.name, command);
			console.log(
				`--- comando postado : ${command.name}  em ${file} (${
					command.global ? 'global' : 'guild'
				})`
			);
		}
		console.log('');

		let cmdArrGlobal = await client.api
			.applications(client.user.id)
			.commands.get();
		let cmdArrGuild = await client.api
			.applications(client.user.id)
			.guilds('831611383233249381')
			.commands.get();
		cmdArrGlobal.forEach(element => {
			console.log(
				'--- comando global caregado : ' + element.name + ' (' + element.id + ')'
			);
		});
		console.log('');
		cmdArrGuild.forEach(element => {
			console.log(
				'--- comando privado caregado : ' +
					element.name +
					' (' +
					element.id +
					')'
			);
		});
	}
}
module.exports = cmds;
