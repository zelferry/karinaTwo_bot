let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "fuse",
            description: "[ 📷photoshop ] funda-se com algum usuário",
            category: "photoshop",
            usage: "<texto>",
            commandOptions: [
                {
                    type: 6,
                    name: "user_1",
                    description: "menção de um usuário",
                    required: true
                },
                {
                    type: 6,
                    name: "user_2",
                    description: "mensão de um usuário",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        console.log(interaction)
        let user_1 = interaction.options.getMember('user_1').displayAvatarURL({ dynamic: false, format: 'png' });
        let user_2 = interaction.options.getMember('user_2').displayAvatarURL({ dynamic: false, format: 'png' });
        
        let image = await canvacord.Canvas.fuse(user_1, user_2);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.png`);
        
        interaction.reply({
            files: [attachment]
        });
    }
} 
module.exports = Command 