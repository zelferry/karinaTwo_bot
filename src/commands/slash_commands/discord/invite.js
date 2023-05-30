const comando = require("../../../structures/commands/command.js");

class Command extends comando {
    command_data = {
        name: "invite",
        description: "(discord) invite karinaTwo to your server!",
        nameLocalizations: {
            "pt-BR": "convidar"
        },
        descriptionLocalizations: {
            "pt-BR": "(discord) convide karinaTwo para o seu servidor!"
        },
        dmPermission: true,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "invite",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        
        let link = this.client.generateInvite({
            permissions: [...this.client.defautPermissions],
            scopes: [Discord.OAuth2Scopes.Bot, Discord.OAuth2Scopes.ApplicationsCommands]
        });
        await interaction.editReply({
            content: `${t("commands:invite")}\n${link}`
        })
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "invite",
                description: "convidar a karinaTwo para seu servidor!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            },
            en: {
                name: "invite",
                description: "invite karinaTwo to your server!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            }
        }
    }
} 
module.exports = Command