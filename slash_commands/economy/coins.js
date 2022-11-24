let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "panther_coins",
            description: "[ 💸economy ] see how many Panther-coins you have in my savings system!",
            category: "economy",
            usage: "[user]",
            commandOptions: [
                {
                    name: "user",
                    description: "user mention (@user/id)",
                    type: 6,
                    required: false
                }
            ]
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
                content: t("commands:panther_coins.user", { userTag: user.tag, coins: (value.coins).toString() })
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