let comando = require("../../frameworks/commando/command.js");
let wait = require('node:timers/promises').setTimeout;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "clean",
            description: "[ 👩‍⚖️managemen ] clear a text channel!",
            deferReply: true,
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"],
                bot: ["MANAGE_MESSAGES"]
            },
            usage: "<quantia> [canal]",
            commandOptions: [
                {
                    type: 10,
                    name: "size",
                    description: "number of messages to be deleted",
                    minValue: 1,
                    maxValue: 100,
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "text channel where i will clean",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let number = interaction.options.getNumber("size");
        let channel = interaction.options.getChannel('channel') || interaction.channel;

        if(!channel.isText()){
            return interaction.editReply({
                content: t("commands:clean.error.no_channel", { channelName: channel.name })
            })
        }
        channel.bulkDelete(number, true).then(async(x) => {
            let cout_result = (number - x.size);
            let STRING = t("commands:clean.success.two")
            if(cout_result > 0) STRING = t("commands:clean.success.one", { coutResult: cout_result });
            
            await wait(1500);
            interaction.editReply({
                content: t("commands:clean.success.main", { subError: STRING, size: (x.size).toString(), channelName: channel.name })
            })
        })
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "clean",
                description: "limpar um canal de texto!",
                permissions: {
                    bot: ["MANAGE_MESSAGES"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "administração",
                usage: "<quantia> [canal]",
                subCommands: []
            },
            en: {
                name: "clean",
                description: "clear a text channel!",
                permissions: {
                    bot: ["MANAGE_MESSAGES"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "management",
                usage: "<amount> [channel]",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `gerenciar mensagens`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar mensagens`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `manage messages`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `manage messages`"
            }
        }
    }
} 
module.exports = Command 
