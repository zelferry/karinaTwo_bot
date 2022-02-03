let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "slowmode",
            description: "[ 👩‍⚖️administração ] definir o \"modo lento\" de um canal de texto",
            category: "management",
            permissions: {
                user: ["MANAGE_CHANNELS"],
                bot: ["MANAGE_CHANNELS"]
            },
            deferReply: true,
            usage: "<tempo> [canal]",
            commandOptions: [
                {
                    type: 10,
                    name: "time",
                    description: "tempo para o \"modo lento\"",
                    minValue: 1,
                    maxValue: 21600,
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "canal de texto a ser editado para o \"modo lento\" (opcional)",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        let channel =  interaction.options.getChannel("channel") || interaction.channel;
        let timer = interaction.options.getNumber("time");

        if(!channel.isText()){
            interaction.followUp({
                content: `:x:**|** ***${channel.name}*** não e um canal de texto!`
            })
        } else {
            channel.edit({
                rateLimitPerUser: timer
            });
            interaction.editReply({
                content: `🕥**|** o tempo do Slowmode foi alterado com sucesso para **${timer} segundos**!`
            });
            return {}
        }
    } 
}
module.exports = Command 