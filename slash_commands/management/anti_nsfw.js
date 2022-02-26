let comando = require("../../frameworks/commando/command.js");
let {configs} = require("../../mongoDB/ini.js").guild

let Discord = require("discord.js"); 
///ADMINISTRATOR
class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "antinsfw",
            description: "configurar o módulo ANTINSFW",
            category: "management",
            usage: "<sub comando>",
            deferReply: true,
            permissions: {
                user: ["ADMINISTRATOR"]
            },
            subCommands: [
                {
                    name: "on",
                    description: "ativar o módulo ANTINSFW"
                },
                {
                    name: "off",
                    description: "desativar o módulo ANTINSFW"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "on",
                    description: "[ 👩‍⚖️administração ] ativar o módulo ANTINSFW"
                },
                {
                    type: 1,
                    name: "off",
                    description: "[ 👩‍⚖️administração ] desarivar o módulo ANTINSFW"
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        let stats = await configs.getConfig(interaction.guild, true);
        if(stats.error) await configs.newGuild(interaction.guild);

        if(subCOMMAND === "on"){
            if(stats.antiNsfw){
                interaction.followUp({
                    content: "❌**|**  O módulo já está ligado."
                });
                return {}
            } else {
                configs.setConfig({
                    antiNsfw: true
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "✔️**|** o modulo foi ativado!\n❓**|** o seu servidor esta seguro contra conteúdo nsfw e gore"
                    })
                });
                return {}
            }
        } else if(subCOMMAND === "off"){
            if(!stats.antiNsfw){
                interaction.followUp({
                    content: "❌**|** o módulo já está desligado."
                });
                return {}
            } else {
                configs.setConfig({
                    antiNsfw: false
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "⚠️**|** o módulo foi desativado\n❓**|** o seu servidor esta desprotegido contra conteúdo nsfw e gore!"
                    })
                });
                return {}
            }
        }
    }
} 
module.exports = Command 