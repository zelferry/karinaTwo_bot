let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/commands.info.json");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "command",
            description: "[ 📲discord ] sobre COMANDOS!",
            category: "discord",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "info",
                    description: "obter informações sobre um comando em específico!"
                }
            ],
            commandOptions: [
                {
                    name: "info",
                    description: "[ 📲discord ] obter informações sobre um comando em específico!",
                    type: 1,
                    options: [...subCommand1]
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            let commandNAME = interaction.options.getString('cmd');
            let command2 = this.client.commands2.get(commandNAME);
            let embed = new Discord.MessageEmbed() 

            if(!command2){
                return await interaction.followUp({
                    content: `🚫**|** o comando ${commandNAME} não existe ou esta com defeito :p`,
                    ephemeral: true
                });
            } else {
                let name1 = command2.name;
                let subCommands1 = command2.subCommands.length > 0 ? command2.subCommands.map((x) => `nome: **${x.name}**\ndescrição: **${x.description}**\ncomo usar: \`/${name1} ${x.name}\``).join("\n\n") : "não tem :/"
                let description1 = command2.description;
                let category1 = command2.category;
                let usage1 = `/${name1} ${command2.usage ?? ""}`;
                let permissions1 = await this.client.extra.utils.permissions.maked(command2.permissions);
                //console.log(permissions1)
                embed.addField("nome do comando:",`${name1}`);
                embed.addField("descrição:",`${description1}`);
                embed.addField("categoria:",`${category1}`);
                embed.addField("como usar?",`\`${usage1}\``);
                embed.addField("permissões necessárias:",`${permissions1}`);
                embed.addField("sub comandos:", `${subCommands1}`)
                return await interaction.editReply({
                    embeds: [embed]
                })
            }
        } else {
            
        }
        //fim do COMANDO
    }
} 
module.exports = Command 
