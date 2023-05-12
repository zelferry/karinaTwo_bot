let comando = require("../../frameworks/commando/command.js");
let config = require(`${process.cwd()}/dist/primary_configuration.js`).urls()
let Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "donate",
        description: "(discord) support karinaTwo so she can continue to be the best bot!",
        nameLocalizations: {
            "pt-BR": "doar"
        },
        descriptionLocalizations: {
            "pt-BR": "(discord) apoie karinaTwo para que ela continue sendo a melhor bot!"
        },
        dmPermission: false,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "donate",
            category: "discord",
            deferReply: true
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        
        let button_1 = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(config.pix).setLabel(t("commands:donate.button")).setEmoji("😊");
        let row1 = new Discord.ActionRowBuilder().addComponents(button_1);
        
        await interaction.editReply({
            components: [row1],
            embeds: [
                {
                    description: t("commands:donate.description"),
                    author: {
                        name: t("commands:donate.author"),
                        url: config.pix
                    },
                    footer: {
                        text: t("commands:donate.footer")
                    },
                    color: 0x0099ff
                }
            ]
        })
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "donate",
                description: "apoie a karinaTwo para ela continuar a sendo a melhor bot!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            },
            en: {
                name: "donate",
                description: "support karinaTwo so she can continue to be the best bot!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            }
        }
    }
} 
module.exports = Command