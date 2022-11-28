let comando = require("../../frameworks/commando/command.js");
let config = require(`${process.cwd()}/dist/primary_configuration.js`).urls()
let Discord = require("discord.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "donate",
            description: "[ 📲discord ] support karinaTwo so she can continue to be the best bot!",
            category: "discord",
            deferReply: true,
            commandOptions: []
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        //config.pix

        let button_1 = new Discord.MessageButton().setStyle('LINK').setURL(config.pix).setLabel(t("commands:donate.button")).setEmoji("😊");
        let row1 = new Discord.MessageActionRow().addComponents(button_1);
        
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
                    color: "#F975EB"
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