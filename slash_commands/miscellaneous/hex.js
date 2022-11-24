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
            description: "[ 🤪miscellaneou ] see a little information about a HEX color",
            category: "miscellaneous",
            usage: "<cor em HEX>",
            commandOptions: [
                {
                    type: 3,
                    name: "color",
                    description: "color in hexadecimal (ex: FF0000, #FF0000)",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let hex = interaction.options.getString('color');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        if(!validate(hex)){
            interaction.editReply({
                content: t("commands:hex.error")
            })
            return {}
        } else {
            interaction.editReply({embeds:[new Discord.MessageEmbed().setColor(hex).setThumbnail(`http://placehold.it/500/${hex}/${hex}`).addField(`**HEX**: #${hex}`, `**RGB**: rgb(${r},${g},${b})`).setTimestamp()]});
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "hex",
                description: "exibir informações de uma cor em HEXADECIMAL",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscelânea",
                usage: "<cor em HEX>",
                subCommands: []
            },
            en: {
                name: "hex",
                description: "display color information in HEXADECIMAL",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<gex color>",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 
