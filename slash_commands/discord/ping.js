let comando = require("../../frameworks/commando/command.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ping",
            description: "[ 📲discord ] ping, bot latency, api latency, and database latency",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
       // awa""it interaction.deferReply();
       // console.log(interaction.guild)
        await interaction.editReply({
            content: `:ping_pong: **Pong!** \n- :watch: **|** Gateway Ping: \`${Math.round(this.client.ws.ping)}ms\` \n- :zap: **|** API Ping: \`${Date.now() - interaction.createdTimestamp}ms\` \n- 💽 **|** database ping: \`${Math.round(await this.client.db.ping())}ms\`\n- 🐱 **|** cluster: \`${Number(this.client.cluster.id) + 1}/${this.client.cluster.count}\``
        });
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "ping",
                description: "ping do meu sistema",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            },
            en: {
                name: "ping",
                description: "ping my system",
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