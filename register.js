let { Client, Intents, REST, Routes, GatewayIntentBits } = require('discord.js');
let config = require(`${process.cwd()}/dist/primary_configuration.js`);
let fs = require('fs');

let client_bot = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

let public_cmds = (process.env.CONDITION_PRIVATE_COMMANDS === "true");
let rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    console.log("[SLASH MANAGER] carregando os comandos");
    let commands_slash = [];

    fs.readdirSync(`${process.cwd()}/slash_commands/`).forEach(dirs => {
        let commands = fs.readdirSync(`${process.cwd()}/slash_commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands){
            let File = require(`${process.cwd()}/slash_commands/${dirs}/${file}`);
            let COMMAND = new File(client_bot);
            
            commands_slash.push(COMMAND.command_data)
        }
    });
    
    try {
        console.log("[SLASH MANAGER] registrando os comandos");
        console.log(commands_slash.map((x,y) => `${y} ${x.name}`))
        if(public_cmds){
            console.log("[SLASH MANAGER => CONFIRM] comandos selecionados: públicos");
            
            await rest.put(Routes.applicationCommands(config.client().id), {
                body: commands_slash
            });
        } else {
            console.log("[SLASH MANAGER => CONFIRM] comandos selecionados: privados");
            
            await rest.put(Routes.applicationGuildCommands(config.client().id, config.guild().test), {
                body: commands_slash
            })
        }
        console.log("[SLASH MANAGER] comandos registrados com sucesso!");
    } catch(err) {
        console.error(err)
    }
})()