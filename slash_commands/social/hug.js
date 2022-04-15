let comando = require("../../frameworks/commando/command.js");
let { social } = require("../../database/images/sfw/gifs/controllers.js");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "hug",
            description: "[ 👤social ] abrace alguém!",
            category: "social",
            usage: "<usuário>",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "usuário (@user/id) a receber um abraço",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser("user");
        let gif = social.hug();
        let avatar = user.displayAvatarURL({
            format: 'png'
        }) ?? null
        let embed = new Discord.MessageEmbed().setTitle(`${this.name}`).setColor('#000000').setDescription(`<@${interaction.user.id}> acaba de abraçar <@${user.id}>`).setImage(`${gif}`).setAuthor({ name: `${user.tag}`, iconURL: `${avatar}`});
        
        interaction.editReply({
            embeds: [ embed ]
        })
    }
} 

module.exports = Command 