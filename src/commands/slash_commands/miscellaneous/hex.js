const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js");
const fetch = require('node-fetch');

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
    command_data = {
        name: "color_info",
        description: "(miscellaneous) see information about a color, such as its variations, etc",
        description_localizations: {
            "pt-BR": "(diversos) veja informações sobre uma cor, como suas variações e etc"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "color_hex",
                description: "color in hexadecimal (ex: FF0000, #FF0000)",
                description_localizations: {
                    "pt-BR": "cor em hexadecimal (ex: FF0000, #FF0000)"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "color_info",
            category: "miscellaneous"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let hex_color = interaction.options.getString('color_hex');

        if(!validate(hex_color)){
            interaction.editReply({
                content: t("commands:colors.error.color")
            });
            
            return {}
        } else {
            hex_color = hex_color.replace('#', '');
            let res = await fetch(`https://www.thecolorapi.com/id?hex=${hex_color}`);
            let body = await res.json();

            if(body.code || !res || !body){
                interaction.editReply({
                    content: t("commands:colors.error.api")
                });

                return {}
            } else {
                let { rgb, hsl, hsv, cmyk, XYZ } = body;
                let { hex, name, image } = body;
                
                let colors = { rgb, hsl, hsv, cmyk, XYZ };
                let colors_array = [ "rgb", "hsl", "hsv", "cmyk", "XYZ" ];
                let embed = new Discord.EmbedBuilder().setColor(hex.value).setDescription(t("commands:colors.embed.description", { cname: name.value, exactly: name.exact_match_name ? t("commands:global.label.yes") : t("commands:global.label.no") }))//.setThumbnail(image.named);

                embed.addFields({
                    name: t(`commands:colors.hex.title`),
                    value: t(`commands:colors.hex.field`, {
                        value: (hex.value).toString()
                    })
                });
                for (let i = 0; i < colors_array.length; i++){
                    let color_data = colors[colors_array[i]];
                    
                    embed.addFields({
                        name: t(`commands:colors.${colors_array[i]}.title`),
                        value: t(`commands:colors.${colors_array[i]}.field`, {
                            value: (color_data.value).toString(),
                            fraction: JSON.stringify(color_data.fraction)
                        })
                    })
                }
                
                await interaction.editReply({
                    embeds: [embed]
                });
                return {}
            }
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
