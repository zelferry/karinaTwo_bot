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
		client.giveawaysManager = giveaways;*/

		this.client = client;
		this.foo = config.footer.root
	}
	loadingCommands() {
		let { client,foo } = this;
        fs.readdirSync(`${foo}/commands/`).forEach(dirs => {
    const commands = fs.readdirSync(`${foo}/commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`${foo}/commands/${dirs}/${file}`);
      command.help.category = dirs 
       // console.log(`-> Loaded command ${command.help.name.toLowerCase()}`);
        client.commands.set(command.help.name, command);
      if (!command.help.description) return console.log(`--- Comando ${file} sem a string "description"`);
      if (!command.help.permisoes) return console.log(`--- Comando ${file} sem a string "permisoes"`);
      client.commands.array.push({
        name: command.help.name,
        desc: command.help.desc,
        permisoes: command.help.permisoes
      });
      if (!command.help.aliases) return;
					command.help.aliases.forEach(alias => {
						client.aliases.set(alias, command.help.name, command);
					});
       // delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };
        })
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
		console.log('a');
/*
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
		});*/
	}
}
module.exports = cmds;
