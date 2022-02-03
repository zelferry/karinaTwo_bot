let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let validate = (color) => {
    if (!color || typeof color !== 'string') return false;
    color = color.replace('#', '');

    switch (color.length) {
        case 3:
            return /^[0-9A-F]{3}$/i.test(color);
        case 6:
            return /^[0-9A-F]{6}$/i.test(color);
        case 8:
            return /^[0-9A-F]{8}$/i.test(color);
        default:
            return false;
    }
};

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "hex",
            description: "[ 🤪miscelânea ] veja uma pequena informação sobre uma cor HEX",
            category: "miscellaneous",
            usage: "<cor em HEX>",
            commandOptions: [
                {
                    type: 3,
                    name: "color",
                    description: "cor em HEX",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        let hex = interaction.options.getString('color');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        if(!validate(hex)){
            interaction.editReply({
                content: "❌**|** isto não e uma cor HEX válida!"
            })
            return {}
        } else {
            interaction.editReply({embeds:[new Discord.MessageEmbed().setColor(hex).setThumbnail(`http://placehold.it/500/${hex}/${hex}`).addField(`**HEX**: #${hex}`, `**RGB**: rgb(${r},${g},${b})`).setTimestamp()]});
            return {}
        }
    }
} 
module.exports = Command 
