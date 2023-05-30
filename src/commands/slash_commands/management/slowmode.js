const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "slowmode",
        description: "(administration) set the slow mode of a text channel",
        descriptionLocalizations: {
            "pt-BR": "(administração) definir o modo lento de um canal de texto"
        },
        dmPermission: false,
        //defaultMemberPermissions: Discord.PermissionFlagsBits.ManageChannels,
        nsfw: false,
        options: [
            {
                type: 4,
                minValue: 1,
                maxValue: 21600,
                required: true,
                name: "time",
                description: "time for slow mode",
                nameLocalizations: {
                    "pt-BR": "tempo"
                },
                descriptionLocalizations: {
                    "pt-BR": "tempo para o modo lento"
                }
            },
            {
                type: 7,
                required: false,
                name: "channel",
                description: "text channel to activate slow mode",
                nameLocalizations: {
                    "pt-BR": "canal"
                },
                descriptionLocalizations: {
                    "pt-BR": "canal de texto para ativar o modo lento"
                }
            }
        ]
    }
    
    #emoji = [
        "🕛",
        "🕧",
        "🕐",
        "🕜",
        "🕑",
        "🕝",
        "🕒",
        "🕞",
        "🕓",
        "🕟",
        "🕔",
        "🕠",
        "🕕",
        "🕡",
        "🕖",
        "🕢",
    ]
    constructor(...args) {
        super(...args, {
            name: "slowmode",
            category: "management",
            permissions: {
                user: ["ManageChannels"],
                bot: ["ManageChannels"]
            },
            deferReply: true
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let channel =  interaction.options.getChannel("channel") || interaction.channel;
        let timer_ = interaction.options.getNumber("time");

        if(!channel.isText()){
            interaction.followUp({
                content: t("commands:global.error.channel.text", { channelName: channel.name })
            })
        } else {
            channel.edit({ rateLimitPerUser: timer_ });
            interaction.editReply({
                content: t("commands:slowmode", {
                    channelName: channel.name,
                    timer: timer_.toString(),
                    emoji: (this.#emoji[Math.floor(Math.random() * this.#emoji.length)])
                })
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "slowmode",
                description: "ativar o modo LENTO no canal de texto",
                permissions: {
                    bot: ["MANAGE_CHANNELS"],
                    user: ["MANAGE_CHANNELS"]
                },
                category: "administração",
                usage: "<tempo> [canal]",
                subCommands: []
            },
            en: {
                name: "slowmode",
                description: "activate SLOW mode on the text channel",
                permissions: {
                    bot: ["MANAGE_CHANNELS"],
                    user: ["MANAGE_CHANNELS"]
                },
                category: "management",
                usage: "<time> [channel]",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `gerenciar canais`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar canais`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `manage channels`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `manage channels`"
            }
        }
    }
}
module.exports = Command 