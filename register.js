let { Client, Intents } = require('discord.js');
let { REST } = require('@discordjs/rest');
let { Routes } = require('discord-api-types/v9');
let config = require(`${process.cwd()}/dist/primary_configuration.js`);
let fs = require('fs');

let client_bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})

let public_cmds = (process.env.CONDITION_PRIVATE_COMMANDS === "true");
let rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    console.log("[SLASH MANAGER] carregando os comandos");
    let commands_slash = [];

    fs.readdirSync(`${process.cwd()}/slash_commands/`).forEach(dirs => {
        let commands = fs.readdirSync(`${process.cwd()}/slash_commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands){
            let File = require(`${process.cwd()}/slash_commands/${dirs}/${file}`);
            let COMMAND = new File(client_bot);
            let data = {
                name: COMMAND.name,
                description: COMMAND.description,
                options: COMMAND.commandOptions
            }
            
            if(COMMAND.dscordPermissions){
                data.default_member_permissions = COMMAND.dscordPermissions
            }
            
            commands_slash.push(data)
        }
    });
    
    try {
        console.log("[SLASH MANAGER] registrando os comandos");

        if(public_cmds){
            await rest.put(Routes.applicationCommands(config.client().id), {
                body: commands_slash
            });
        } else {
            await rest.put(Routes.applicationGuildCommands(config.client().id, config.guild().test), {
                body: commands_slash
            })
        }
        console.log("[SLASH MANAGER] comandos registrados com sucesso!");
    } catch(err) {
        console.error(err)
    }
})()