let comando = require("../../frameworks/commando/command.js");
let { afk } = require("../../mongoDB/ini.js").user;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "afk",
            description: "[ 👤social ] ative o modo afk para os usuários saberem que você deu um tempo no teclado",
            category: "social",
            usage: "<motivo>",
            commandOptions: [
                {
                    type: 3,
                    name: "reason",
                    description: "motivo do seu afk",
                    required: true 
                }
            ]
        })
    }
    async interactionRun(interaction){
        let reason = interaction.options.getString('reason');

        let value = await afk.find(interaction.user, true);

        if(value.afk.ready == false){
            interaction.editReply({
                content: "💤**|** afk ativado! \nos usuários irão saber que você esta `"+reason+"`\n\npara sua conivência, eu irei desativar o seu afk quando você falar algo no chat! 😉"
            });
            await afk.setAFK(interaction.user, reason);
            return {}
        } else if(value.afk.ready == true){
            interaction.editReply({
                content: `:x:**|** você ja esta com o afk ativo!`,
                ephemeral: true
            });
            return {}
        }
    }
} 
module.exports = Command 
