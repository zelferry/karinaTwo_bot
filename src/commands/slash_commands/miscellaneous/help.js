const comando = require("../../../structures/commands/command.js");
const devs_treat = require("../../../utils/treat_devs.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "help",
        description: "(miscellaneous) need help?",
        name_localizations: {
            "pt-BR": "ajuda"
        },
        description_localizations: {
            "pt-BR": "(diversos) precisa de uma ajuda?"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "devs",
                description: "(miscellaneous) about my developers",
                name_localizations: {
                    "pt-BR": "desenvolvedores"
                },
                description_localizations: {
                    "pt-BR": "(diversos) sobre meus desenvolvedores"
                }
            },
            {
                type: 1,
                name: "commands",
                description: "(miscellaneous) over existing commands",
                name_localizations: {
                    "pt-BR": "comandos"
                },
                description_localizations: {
                    "pt-BR": "(diversos) sobre comandos existentes"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "help",
            category: "miscellaneous"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();
        
        if(subCOMMAND === "devs"){
            let embed_object = {
                description: t("commands:help.devs"),
                fields: devs_treat(t.lng)
            };
            let embed = Discord.EmbedBuilder.from(embed_object).setColor("#007ACC");
            
            interaction.editReply({
                embeds: [embed]
            });
            
            return {}
        } else if(subCOMMAND === "commands"){
            let commands1 = this.client.commands2//.filter((cmd) => cmd.category);

            let dataCMDs = [
                {
                    label: `${t("commands:help.commands.categorys.discord")}(${commands1.filter((cmd) => cmd.category == "discord").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "discord").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.economy")}(${commands1.filter((cmd) => cmd.category == "economy").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "economy").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.fun")}(${commands1.filter((cmd) => cmd.category == "fun").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "fun").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.management")}(${commands1.filter((cmd) => cmd.category == "management").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "management").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.miscellaneous")}(${commands1.filter((cmd) => cmd.category == "miscellaneous").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "miscellaneous").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.social")}(${commands1.filter((cmd) => cmd.category == "social").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "social").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.utility")}(${commands1.filter((cmd) => cmd.category == "utility").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "utility").map((x) => "`"+x.name+"`").join(", ")
                }
            ];
            let frields = [];
            //utility
            let channels_ = interaction.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">");
            
            if(channels_.length > 0){
                dataCMDs.push({
                    label: `😈 nsfw(${commands1.filter((cmd) => cmd.category == "nsfw").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "nsfw").map((x) => "`"+x.name+"`").join(", ")
                })
            }

            for(let i in dataCMDs){
                let data = dataCMDs[i]
                frields.push({
                    name: `${data.label}`,
                    value: `${data.commands.toString()}`
                })
            }

            let embed_object = {
                title: t("commands:help.commands.title"),
                fields: frields,
                footer: {
                    text: t("commands:help.commands.footer")
                }
            };
            
            let embed = Discord.EmbedBuilder.from(embed_object).setColor("#7A67EE");
            interaction.editReply({
                embeds: [embed]
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "help",
                description: "comandos de ajuda",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "micelanea",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "devs",
                        description: "sobre meus devs"
                    },
                    {
                        name: "commands",
                        description: "sobre os comandos existentes"
                    }
                ]
            },
            en: {
                name: "help",
                description: "help commands",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "devs",
                        description: "about my devs"
                    },
                    {
                        name: "commands",
                        description: "over existing commands"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 
