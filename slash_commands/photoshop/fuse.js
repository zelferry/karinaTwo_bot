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
                    description: "mensão de um usuário 2",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        //console.log(interaction)
        let user_1 = interaction.options.getMember('user_1').displayAvatarURL({ dynamic: false, format: 'png' });
        let user_2 = interaction.options.getMember('user_2').displayAvatarURL({ dynamic: false, format: 'png' });
        
        let image = await canvacord.Canvas.fuse(user_1, user_2);
        let attachment = new Discord.MessageAttachment(image, `${this.name}.png`);
        
        interaction.editReply({
            files: [attachment]
        });
    }
} 
module.exports = Command 