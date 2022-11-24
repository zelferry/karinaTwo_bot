let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/commands.info.json");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "command",
            description: "[ 📲discord ] about COMMANDS!",
            category: "discord",
            commandOptions: [
                {
                    name: "info",
                    description: "[ 📲discord ] get information about a specific command!",
                    type: 1,
                    options: [
                        ...subCommand1,
                        {
                            type: 3,
                            name: "lang",
                            description: "command language",
                            required: true,
                            choices: [
                                {
                                    name: "Portuguese (br)",
                                    value: "pt"
                                },
                                {
                                    name: "English",
                                    value: "en"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            let commandNAME = interaction.options.getString('cmd');
            let command1 = this.client.commands2.get(commandNAME)
            let embed = new Discord.MessageEmbed() 

            if(!command1){
                return await interaction.followUp({
                    content: t("commands:command.info.noCommand", {
                        commandName: commandNAME
                    }),
                    ephemeral: true
                });
            } else {
                let command2 = command1.command_info()[interaction.options.getString("lang")]
                let name1 = command2.name;
                let subCommands1 = command2.subCommands.length > 0 ? command2.subCommands.map((x) => t("commands:command.info.success.subCommands.labelOne", { nameOne: name1, nameTwo: x.name, description: x.description })).join("\n\n") : t("commands:command.info.success.subCommands.labelTwo")
                let description1 = command2.description;
                let category1 = command2.category || "???";
                let usage1 = `/${name1} ${command2.usage ?? ""}`;
                let permissions1 = await this.client.extra.utils.permissions.maked(command2.permissions);
                //console.log(permissions1)
                embed.addField(t("commands:command.info.success.name"),`${name1}`);
                embed.addField(t("commands:command.info.success.description"),`${description1}`);
                embed.addField(t("commands:command.info.success.category"),`${category1}`);
                embed.addField(t("commands:command.info.success.howToUse"),`\`${usage1}\``);
                embed.addField(t("commands:command.info.success.permissions"),`${permissions1}`);
                embed.addField(t("commands:command.info.success.subCommands.title"), `${subCommands1}`)
                return await interaction.editReply({
                    embeds: [embed]
                })
            }
        } else {
            
        }
        //fim do COMANDO
    }
    command_info(){
        return {
            activated: true,
            pt: {
                name: "command",
                description: "um comando sobre comandos!",
                permissions: {
                    bot: [],
                    user: []
                },
                usage: "<sub comando>",
                category: "discord",
                subCommands: [
                    {
                        name: "info",
                        description: "ver informações de um comando em específico"
                    }
                ]
            },
            en: {
                name: "command",
                description: "a command over commands! ",
                permissions: {
                    bot: [],
                    user: []
                },
                usage: "<sub command>",
                category: "discord",
                subCommands: [
                    {
                        name: "info",
                        description: "see information for a specific command"
                    }
                ]
            }
        }
    }//
} 
module.exports = Command 
