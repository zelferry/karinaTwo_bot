let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "beautiful",
            description: "[ 📷photoshop ] \"ohh isso, ISO E LINDO\"",
            category: "photoshop",
            usage: "[usuário]",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "usuário (@user/id) a ser elogiado",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let url = (interaction.options.getUser('user') ?? interaction.user).displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });
        let image = await canvacord.Canvas.beautiful(url);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.png`);
        
        interaction.editReply({
            files: [attachment]
        });
    }
} 
module.exports = Command 