let { Client, Intents } = require('discord.js');
let { REST } = require('@discordjs/rest');
let { Routes } = require('discord-api-types/v9');
let config = require('./database/client/config.json');
let fs = require('fs');

let client_bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})

let public_cmds = true;

//let Command = require("./command.js");
let rest = new REST({
    version: '9'
}).setToken(process.env.TOKEN);

(async () => {
    console.log("[SLASH MANAGER] carregando os comandos");
    let commands_slash = [];

    fs.readdirSync(`${config.footer.root}/slash_commands/`).forEach(dirs => {
        let commands = fs.readdirSync(`${config.footer.root}/slash_commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands){
            let File = require(`${config.footer.root}/slash_commands/${dirs}/${file}`);
            let COMMAND = new File(client_bot);

            commands_slash.push({
                name: COMMAND.name,
                description: COMMAND.description,
                options: COMMAND.commandOptions
            })
        }
    });
    
    try {
        console.log("[SLASH MANAGER] registrando os comandos");

        if(public_cmds){
            await rest.put(Routes.applicationCommands(config.client_id), {
                body: commands_slash
            });
        } else {
            await rest.put(Routes.applicationGuildCommands(config.client_id, config.guildId), {
                body: commands_slash
            })
        }
        console.log("[SLASH MANAGER] comandos registrados com sucesso!");
    } catch(err) {
        console.error(err)
    }
})()