let comando = require("../../frameworks/commando/command.js");
const Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "avatar",
            description: "[ ❓utilitários ] sabe aquele avatar lindo que você viu? veja ele por completo!",
            category: "utility",
            usage: "[usuário]",
            commandOptions: [
                {
                    name: "user",
                    description: "usuário (@user/id) para você ver o avatar dele(a)",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


        let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel('ver na web');
        let row = new Discord.MessageActionRow().addComponents(button_);
        
        let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(`Avatar de ${user.username}`).setImage(avatar);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    }
} 
module.exports = Command 
