let comando = require("../../frameworks/commando/command.js");
let {configs} = require("../../mongoDB/ini.js").guild

let Discord = require("discord.js"); 
///ADMINISTRATOR
class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "antiraid",
            description: "configurar o m贸dulo ANTIRAID",
            category: "management",
            usage: "<sub comando>",
            deferReply: true,
            permissions: {
                user: ["ADMINISTRATOR"]
            },
            subCommands: [
                {
                    name: "on",
                    description: "ativar o m贸dulo ANTIRAID"
                },
                {
                    name: "off",
                    description: "desativar o m贸dulo ANTIRAID"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "on",
                    description: "[ 馃懇鈥嶁殩锔廰dministra莽茫o ] ativar o m贸dulo ANTIRAID"
                },
                {
                    type: 1,
                    name: "off",
                    description: "[ 馃懇鈥嶁殩锔廰dministra莽茫o ] desarivar o m贸dulo ANTIRAID"
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
            if(stats.antiraid){
                interaction.followUp({
                    content: "鉂?**|**  O m贸dulo j谩 est谩 ligado."
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: true
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "鉁旓笍**|** o modulo foi ativado!\n鉂?**|** o seu servidor esta seguro contra raids"
                    })
                });
                return {}
            }
        } else if(subCOMMAND === "off"){
            if(!stats.antiraid){
                interaction.followUp({
                    content: "鉂?**|** o m贸dulo j谩 est谩 desligado."
                });
                return {}
            } else {
                configs.setConfig({
                    antiraid: false
                }, interaction.guild).then((x) => {
                    interaction.editReply({
                        content: "鈿狅笍**|** o m贸dulo foi desativado\n鉂?**|** o seu servidor esta desprotegido contra raids!"
                    })
                });
                return {}
            }
        }
    }
}鈥?
module.exports = Command鈥?