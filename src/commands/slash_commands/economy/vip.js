const comando = require("../../../structures/commands/command.js");
const { economydb } = require("../../../data/ini.js").user 

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "vip",
        description: "(economy) buy vip-user and get all my benefits!",
        description_localizations: {
            "pt-BR": "(economia) compre o vip-user e ganhe todos os meus benefícios!"
        },
        dmPermission: true,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "vip",
            deferReply: true,
            category: "economy"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({
            ephemeral: this.deferReply
        }).catch(() => {});
        
        await interaction.editReply({
            content: t("commands:buy.vip")
        });
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "vip",
                description: "compre vip!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                subCommands: []
            },
            en: {
                name: "vip",
                description: "buy vip!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                subCommands: []
            }
        }
    }
}

module.exports = Command 