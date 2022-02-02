let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "triggered",
            description: "[ 📷photoshop ] \"PISTOLA!\"",
            category: "photoshop",
            usage: "[usuário]",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "mensão de um usuário",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply();
       // console.log(interaction)
        let url = (interaction.options.getUser('user') ?? interaction.user).displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });
        let image = await canvacord.Canvas.trigger(url);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.gif`);
        
        interaction.editReply({
            files: [ attachment ]
        });
    }
} 
module.exports = Command 