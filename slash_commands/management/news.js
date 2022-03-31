let comando = require("../../frameworks/commando/command.js");
let { adverts } = require("../../database/client/config.json")

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "adverts",
            description: "[ 👩‍⚖️administração ] adicionar meus canais de anúncios em seu servidor!",
            deferReply: true,
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"],
                bot: [
                    "MANAGE_MESSAGES",
                    "MANAGE_CHANNELS",
                    "ADMINISTRATOR"
                ]
            },
            usage: "[canal]",
            commandOptions: [
                {
                    type: 7,
                    name: "channel",
                    description: "canal de texto",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let channel = interaction.options.getChannel('channel') || interaction.channel

        if(!channel.isText()){
            return interaction.editReply({
                content: `:x:**|** *${channel.name}* não e um canal de texto!`
            })
        } else {
            interaction.editReply({
                content: "um momento..."
            }).then(async() => {
                try {
                    this.client.channels.cache.get(adverts.news).addFollower(channel.id);
                    this.client.channels.cache.get(adverts.upgrades).addFollower(channel.id);
                    this.client.channels.cache.get(adverts.status).addFollower(channel.id);
                    this.client.channels.cache.get(adverts.no_topic).addFollower(channel.id);
                    interaction.editReply({
                        content: "🔔**|** canais seguidos com sucesso!"
                    })
                    return {}
                } catch(error) {
                    interaction.editReply({
                        content: "❌**|** ACONTECEU um erro estranho!\n📎**|** tente novamente mais tarde."
                    });
                    console.log(error);
                    
                    return {}
                } 
            })
        }
    }
} 
module.exports = Command 
