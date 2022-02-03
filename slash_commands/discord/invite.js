let comando = require("../../frameworks/commando/command.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "invite",
            description: "[ 📲discord ] adiconar a karina!",
            category: "discord",
            commandOptions: []
        })
    }
    async interactionRun(interaction){
        let link = this.client.generateInvite({
            permissions: [...client.defautPermissions],
            scopes: ['bot','applications.commands']
        });
        await interaction.editReply({
            content: `me adicione em seu servidor!\n${link}`
        })
    }
} 
module.exports = Command