let comando = require("../../frameworks/commando/command.js");
let { afk } = require("../../mongoDB/ini.js").user;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "afk",
            description: "[ 👤social ] turn on afk mode for users to know that you've taken a break from the keyboard",
            category: "social",
            usage: "<motivo>",
            commandOptions: [
                {
                    type: 3,
                    name: "reason",
                    description: "reason for your afk",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let reason = interaction.options.getString('reason');

        let value = await afk.find(interaction.user, true);

        if(value.afk.ready == false){
            interaction.editReply({
                content: t("commands:afk.activated", { reasonn: (reason).toString() })
            });

            await afk.setAFK(interaction.user, reason);
            return {}
        } else if(value.afk.ready == true){
            interaction.editReply({
                content: t("commands:afk.error"),
                ephemeral: true
            });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "afk",
                description: "ativar o modo afk para os usuários saberem que você fez uma pausa do teclado",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<motivo>",
                subCommands: []
            },
            en: {
                name: "afk",
                description: "turn on afk mode for users to know that you've taken a break from the keyboard",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<reason>",
                subCommands: []
            }
        }
    }
}

module.exports = Command
