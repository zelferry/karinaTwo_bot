let comando = require("../../frameworks/commando/command.js");
let {configs} = require("../../mongoDB/ini.js").guild

let Discord = require("discord.js"); 
///ADMINISTRATOR
class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "antiraid",
            description: "configure the ANTIRAID module",
            category: "management",
            deferReply: true,
            dscordPermissions: 8,
            permissions: {
                user: ["ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    type: 1,
                    name: "on",
                    description: "[ 👩‍⚖️management ] activate the ANTIRAID module"
                },
                {
                    type: 1,
                    name: "off",
                    description: "[ 👩‍⚖️management ] disable the ANTIRAID module"
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        let stats = await configs.getConfig(interaction.guild, true);
        if(stats.error) await configs.newGuild(interaction.guild);

        if(subCOMMAND === "on"){
            if(stats.antiraid){
                interaction.followUp({
                    content: t("commands:antiraid.error.activated")
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: true
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: t("commands:antiraid.success.ativated")
                    })
                });
                return {}
            }
        } else if(subCOMMAND === "off"){
            if(!stats.antiraid){
                interaction.followUp({
                    content: t("commands:antiraid.error.disabled")
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: false
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: t("commands:antiraid.success.disabled")
                    })
                });
                return {}
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "antiraid",
                description: "configurar o módulo ANTIRAID",
                permissions: {
                    bot: [],
                    user: ["ADMINISTRATOR"]
                },
                category: "administração",
                usage: "<off/on>",
                subCommands: []
            },
            en: {
                name: "antiraid",
                description: "configure the ANTIRAID module",
                permissions: {
                    bot: [],
                    user: ["ADMINISTRATOR"]
                },
                category: "management",
                usage: "<off/on>",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `administrador`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `administrador`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** I need the following permissions: `administrator`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `administrator`"
            }
        }
    }
} 
module.exports = Command 