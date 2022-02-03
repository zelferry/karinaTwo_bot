let comando = require("../../frameworks/commando/command.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ping",
            description: "[ 📲discord ] ping e latência da bot!",
            category: "discord"
        })
    }
    async interactionRun(interaction){
       // awa""it interaction.deferReply();
       // console.log(interaction.guild)
        await interaction.editReply({
            content: `:ping_pong: **| Pong!** \n:watch: **| Gateway Ping:** \`${Math.round(this.client.ws.ping)}ms\` \n:zap: **| API Ping:** \`${Date.now() - interaction.createdTimestamp}ms\` \n🐱 **| cluster:** \`${Number(this.client.cluster.id) + 1}/${this.client.cluster.count}\``
        });
    }
} 
module.exports = Command 
