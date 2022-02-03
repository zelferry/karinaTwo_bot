let comando = require("../../frameworks/commando/command.js");
let {configs} = require("../../mongoDB/ini.js").guild

let Discord = require("discord.js"); 
///ADMINISTRATOR
class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "antiraid",
            description: "configurar o módulo ANTIRAID",
            category: "management",
            usage: "<sub comando>",
            permissions: {
                user: ["ADMINISTRATOR"]
            },
            subCommands: [
                {
                    name: "on",
                    description: "ativar o módulo ANTIRAID"
                },
                {
                    name: "off",
                    description: "desativar o módulo ANTIRAID"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "on",
                    description: "[ 👩‍⚖️administração ] ativar o módulo ANTIRAID"
                },
                {
                    type: 1,
                    name: "off",
                    description: "[ 👩‍⚖️administração ] desarivar o módulo ANTIRAID"
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        let stats = await configs.getConfig(interaction.guild, true);
        if(stats.error) await configs.newGuild(interaction.guild);

        if(subCOMMAND === "on"){
            if(stats.antiraid){
                interaction.followUp({
                    content: "❌**|**  O módulo já está ligado.",
                    ephemeral: true
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: true
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "✔️**|** o modulo foi ativado!\n❓**|** o seu servidor esta seguro contra raids"
                    })
                });
                return {}
            }
        } else if(subCOMMAND === "off"){
            if(!stats.antiraid){
                interaction.followUp({
                    content: "❌**|** o módulo já está desligado.",
                    ephemeral: true
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: false
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "⚠️**|** o módulo foi desativado\n❓**|** o seu servidor esta desprotegido contra raids!"
                    })
                });
                return {}
            }
        }
    }
} 
module.exports = Command 