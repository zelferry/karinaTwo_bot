const Discord = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

//let foo = "/home/runner/karinaTwo"

class cmds {
	constructor(client, config, giveaways) {
		this.client = client;
		this.foo = config.footer.root
	}
	loadingCommands() {
		let { client,foo } = this;
        fs.readdirSync(`${foo}/owners_commands/`).forEach(dirs => {
    const commands = fs.readdirSync(`${foo}/owners_commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`${foo}/owners_commands/${dirs}/${file}`);
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
	async loadingSlashCommands(guildprivateId) {
		
		let { client,foo } = this;
		let commands_slash = [] 
		const commandFiles = fs.readdirSync(''+foo+'/slash_comands').filter(file => file.endsWith('.js'));
        
		for (const file of commandFiles) {
			const command = require(`${foo}/slash_comands/${file}`);
            
			if (command.global == true) {
				commands_slash.push({
                    global: "yes",
                    data:{
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions
                    }
                })
			} else {
				commands_slash.push({
                    global: "no",
                    data:{
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions
                    }
                })
			}
            client.commands2.set(command.name, command);
		};
        let globalcmds = commands_slash.filter((x) => x.global == "yes").map((x) => {
            return {
                name: x.data.name,
                description: x.data.description,
                options: x.data.options ?? []
            }
        })
        let privatecmds = commands_slash.filter((x) => x.global == "no").map((x) => {
            return {
                name: x.name,
                description: x.description,
                options: x.commandOptions ?? []
            }
        })
        //console.log(globalcmds)

        try {
            await client.application?.commands.set(globalcmds);
            await rest.put(Routes.applicationCommands(client.user.id, guildprivateId), {
                body: globalcmds 
            },);
            
        //   await client.guilds.cache.get(guildprivateId)?.commands.set(privatecmds);
        } catch (err){
            console.log(err);
        }
	}
}
module.exports = cmds;
