const comando = require("../../../structures/commands/command.js");
const { economydb } = require("../../../data/ini.js").user 

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "panther_coins",
        description: "(economy) see how many Panther-coins you have in my savings system!",
        description_localizations: {
            "pt-BR": "(economia) veja quantos Panther-coins você tem!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 6,
                name: "user",
                description: "user (@user/id) for you to see how much this user has",
                description_localizations: {
                    "pt-BR": "usuário (@usuário/id) para você ver quanto esse usuário tem" 
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "panther_coins",
            category: "economy"
        })
    }
    async interactionRun(interaction, t){
        let user = interaction.options.getUser('user') || interaction.user;

        let value = await economydb.fech(user);

        if(user.id == interaction.user.id){
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            return interaction.editReply({
                content: t("commands:panther_coins.me", { coins: (value.coins).toString() })
            })
        } else {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            return interaction.editReply({
                content: t("commands:panther_coins.user", { userTag: user.username, coins: (value.coins).toString() })
            })
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "panther_coins",
                description: "exibir a quantidade de *panther coins* de um usuário!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                usage: "[usuário]",
                subCommands: []
            },
            en: {
                name: "panther_coins",
                description: "display a user's *panther coins* amount!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "[user]",
                subCommands: []
            }
        }
    }
} 

module.exports = Command 