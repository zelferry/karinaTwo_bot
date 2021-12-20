const Discord = require('discord.js');
const fs = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const Command = require("./command_slash.js") 

const rest = new REST({
    version: '9'
}).setToken(process.env.TOKEN);

let footercommands = "puro";

class clientSlash43 {
    constructor(bot, config){
        this.client = bot;
        this.footer = config.footer.root
    };
    isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    };
    async slashCmd(){
        let { client, footer } = this;
        let commands_slash = [];
        fs.readdirSync(`${footer}/${footercommands}/`).forEach(dirs => {
            const commands = fs.readdirSync(`${footer}/${footercommands}/${dirs}`).filter(files => files.endsWith('.js'));
            for (const file of commands) {
                const File = require(`${footer}/${footercommands}/${dirs}/${file}`);
                if (!this.isClass(File)) throw new TypeError(`o comando de barra ${file} NÃO e uma classe.`);
                
                let COMMAND = new File(client);
                
                if (!(COMMAND instanceof Command)) throw new TypeError(`o COMANDO de barra ${COMMAND.name ?? file} esta mal estruturado`);

                client.commands2.set(COMMAND.name, COMMAND);

                commands_slash.push({
                    name: COMMAND.name,
                    description: COMMAND.description,
                    options: COMMAND.commandOptions
                });
            }
        })

        try {
            await client.application?.commands.set(commands_slash);
        } catch(err) {
            
        }
    }
}
module.exports = clientSlash43