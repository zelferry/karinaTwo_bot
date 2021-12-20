let comando = require("../../frameworks/commando/command_slash.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ping",
            description: "[ 📱 discord ] ping!",
            commandOptions: []
        })
    }
    async interactionRun(interaction){
        await interaction.reply({
            content: `:ping_pong: Pong: ${this.client.ws.ping}ms!`
        });
    }
} 
module.exports = Command 
