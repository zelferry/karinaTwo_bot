let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
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
            description: "[ 👩‍⚖️management ] set the slow mode of a text channel",
            category: "management",
            permissions: {
                user: ["MANAGE_CHANNELS"],
                bot: ["MANAGE_CHANNELS"]
            },
            deferReply: true,
            usage: "<tempo> [canal]",
            commandOptions: [
                {
                    type: 10,
                    name: "time",
                    description: "time for slow mode",
                    minValue: 1,
                    maxValue: 21600,
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "text channel to activate slow mode",
                    required: false
                }
            ]
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