const comando = require("../../../structures/commands/command.js");
const { afk } = require("../../../data/ini.js").user;

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "afk",
        description: "(social) turn on afk mode for users to know that you've taken a break from the keyboard",
        descriptionLocalizations: {
            "pt-BR": "(social) ative o modo afk para os usuários saberem que você deu uma pausa no teclado"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "reason",
                description: "reason for your afk",
                nameLocalizations: {
                    "pt-BR": "reação"
                },
                descriptionLocalizations: {
                    "pt-BR": "motivo do seu afk"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "afk",
            category: "social"
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
