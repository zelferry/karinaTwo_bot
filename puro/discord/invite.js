let comando = require("../../frameworks/commando/command_slash.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "invite",
            description: "[ 📱 discord ] adiconar a karina!",
            commandOptions: []
        })
    }
    async interactionRun(interaction){
        let link = this.client.generateInvite({
            permissions: [...client.defautPermissions],
            scopes: ['bot','applications.commands']
        });
        await interaction.reply({
            content: `me adicione em seu servidor!\n${link}`
        })
    }
} 
module.exports = Command