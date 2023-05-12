let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "command",
        description: "(discord) about commands!",
        nameLocalizations: {
            "pt-BR": "comando"
        },
        descriptionLocalizations: {
            "pt-BR": "(discord) sobre comandos!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "info",
                description: "(discord) get information about a specific command!",
                nameLocalizations: {
                    "pt-BR": "sobre"
                },
                descriptionLocalizations: {
                    "pt-BR": "(discord) obter informações sobre um comando específico!"
                },
                options: [
                    {
                        type: 3,
                        name: "cmd",
                        description: "command name",
                        nameLocalizations: {
                            "pt-BR": "nome"
                        },
                        descriptionLocalizations: {
                            "pt-BR": "nome do comando"
                        },
                        required: true
                    },
                    {
                        type: 3,
                        name: "lang",
                        description: "command language",
                        nameLocalizations: {
                            "pt-BR": "linguagem"
                        },
                        descriptionLocalizations: {
                            "pt-BR": "linguagem do comando"
                        },
                        required: true,
                        choices: [
                            {
                                name: "Portuguese (br)",
                                nameLocalizations: {
                                    "pt-BR": "português (br)"
                                },
                                value: "pt"
                            },
                            {
                                name: "English",
                                nameLocalizations: {
                                    "pt-BR": "inglês"
                                },
                                value: "en"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "command",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            let commandNAME = interaction.options.getString('cmd');
            let command1 = this.client.commands2.get(commandNAME)
            let embed = new Discord.EmbedBuilder() 

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
                
                embed.addFields(
                    {
                        name: t("commands:command.info.success.name"),
                        value: `${name1}`
                    },
                    {
                        name: t("commands:command.info.success.description"),
                        value: `${description1}`
                    },
                    {
                        name: t("commands:command.info.success.category"),
                        value: `${category1}`
                    },
                    {
                        name: t("commands:command.info.success.howToUse"),
                        value: `\`${usage1}\``
                    },
                    {
                        name: t("commands:command.info.success.permissions"),
                        value: `${permissions1}`
                    },
                    {
                        name: t("commands:command.info.success.subCommands.title"),
                        value: `${subCommands1}`
                    }
                );
                
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
