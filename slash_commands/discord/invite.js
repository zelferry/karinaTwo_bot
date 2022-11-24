let comando = require("../../frameworks/commando/command.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "invite",
            description: "[ 📲discord ] invite karinaTwo to your server!",
            category: "discord",
            commandOptions: []
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply}).catch(() => {});
        
        let link = this.client.generateInvite({
            permissions: [...this.client.defautPermissions],
            scopes: ['bot','applications.commands']
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