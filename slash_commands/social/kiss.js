let comando = require("../../frameworks/commando/command.js");
let { social } = require("../../database/images/sfw/gifs/controllers.js");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "kiss",
            description: "[ 👤social ] beije alguem que você ama!",
            category: "social",
            usage: "<usuário>",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "mensão de usuário",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        let user = interaction.options.getUser("user");
        let gif = social.kiss();
        let avatar = user.displayAvatarURL({
            format: 'png'
        }) ?? null
        let embed = new Discord.MessageEmbed().setTitle(`${this.name}`).setColor('#000000').setDescription(`<@${interaction.user.id}> acaba de beijar <@${user.id}>`).setImage(`${gif}`).setAuthor({ name: `${user.tag}`, iconURL: `${avatar}`});
        
        interaction.editReply({
            embeds: [ embed ]
        })
    }
} 

module.exports = Command 