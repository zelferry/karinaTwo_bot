const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require("./command.js");

class CommandRegister {
    constructor(bot, config){
        this.client = bot;
    };
    isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    };
    
    async loadSlash(){
        return glob(`${process.cwd()}/slash_commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`comando ${name} esta mau estruturado`);
                const command = new File(this.client);
                if (!(command instanceof Command)) throw new TypeError(`comando ${name} não pertence aos comandos.`);
                this.client.commands2.set(command.name, command);
            };
        });
    }

    async loadPrefix(){
        return glob(`${process.cwd()}/owners_commands/**/*.js`).then(commands => {
            for (const commandFile of commands){
                const File = require(commandFile);
                this.client.commands.set(File.help.name, File);

                this.client.commands.array.push({
                    name: File.help.name,
                    desc: File.help.desc,
                    permisoes: File.help.permisoes
                });
                
                if (File.help.aliases){
                    File.help.aliases.forEach(alias => {
                        this.client.aliases.set(alias, File.help.name, File);
                    });
                }
            }
        })
    }
}

module.exports = CommandRegister