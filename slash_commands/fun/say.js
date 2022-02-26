let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "say",
            description: "[ 😂diversão ] faça eu falar alguma coisa!",
            category: "fun",
            deferReply: true,
            usage: "<texto> [canal]",
            commandOptions: [
                {
                    type: 3,
                    name: "args",
                    description: "oque eu vou dizer?",
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "enviar em um canal de texto em específico",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let args = interaction.options.getString("args");
        let channel = interaction.options.getChannel('channel') || interaction.channel;

        if(args.length >= 1500){
            interaction.followUp({
                content: "❌**|** MUITOS CARACTERES!\n⭕**|** o máximo de caracteres e de `1500` CARACTERES!",
                //ephemeral: true
            })
            return {}
        } else {
            channel.send({
                content: `${args}\n\n🦊 MENSAGEM enviada pelo(a) <@${interaction.user.id}>`
            });
            
            interaction.editReply({
                content: "ENVIADO COM SUCESSO!"
                //ephemeral: true
            });
            
            return {}
        }
    }
} 
module.exports = Command 
