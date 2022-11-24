let comando = require("../../frameworks/commando/command.js");
let adverts = require(`${process.cwd()}/dist/primary_configuration.js`).adverts();
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "adverts",
            description: "[ 👩‍⚖️management ] add my ad placements on your server!",
            deferReply: true,
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"],
                bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    type: 7,
                    name: "channel",
                    description: "text channel",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let channel = interaction.options.getChannel('channel') || interaction.channel

        if(!channel.isText()){
            return interaction.editReply({
                content: t("commands:global.error.channel.text", { channelName: channel.name })
            })
        } else {
            interaction.editReply({
                content: t("commands:news.wait")
            }).then(async() => {
                try {
                    for (const property in adverts) {
                        this.client.channels.cache.get(adverts[property]).addFollower(channel.id);
                    }
                    
                    interaction.editReply({
                        content: t("commands:news.success")
                    })
                    return {}
                } catch(err) {
                    interaction.editReply({
                        content: t("commands:global.error.commands", { error: err })
                    });
                    
                    console.log(err);
                    return {}
                } 
            })
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "news",
                description: "receba anúncios e novidades sobre mim em seu servidor!",
                permissions: {
                    bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "administração",
                usage: "[canal]",
                subCommands: []
            },
            en: {
                name: "news",
                description: "receive announcements and news about me on your server!",
                permissions: {
                    bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "management",
                usage: "[channel]",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `gerenciar mensagens`, `gerenciar canais` e `administrador`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar mensagens`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `manage messages`, `manage channels` and `admin`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `manage messages`"
            }
        }
    }
} 
module.exports = Command 
