let comando = require("../../frameworks/commando/command.js");
//let wait = require('node:timers/promises').setTimeout;

let Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "nuke",
        description: "(administration) completely clear a text channel",
        descriptionLocalizations: {
            "pt-BR": "(administração) limpar completamente um canal de texto"
        },
        dmPermission: false,
        //defaultMemberPermissions: Discord.PermissionFlagsBits.ManageChannels,
        nsfw: false,
        options: [
            {
                type: 7,
                required: false,
                name: "channel",
                description: "text channel to take a NUKE",
                nameLocalizations: {
                    "pt-BR": "canal"
                },
                descriptionLocalizations: {
                    "pt-BR": "canal de texto para tomar um NUKE"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "nuke",
            category: "management",
            permissions: {
                user: ["ManageChannels"],
                bot: ["ManageChannels","Administrator"]
            },
            buttonCommands: ["submit","cancel"]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let old_channel = interaction.options.getChannel('channel') ?? interaction.channel;

        let subbutton = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Success).setLabel(t("commands:global.button.execute")).setCustomId("submit");
        
        let cancelbutton = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Danger).setLabel(t("commands:global.button.cancel")).setCustomId("cancel");
        let row = new Discord.ActionRowBuilder().addComponents(subbutton,cancelbutton);

        await interaction.followUp({
            content: t("commands:nuke.warn", { oldchannel: old_channel.name }),
            ephemeral: true,
            components: [row]
        });

        let filter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;

        let collector = interaction.channel.createMessageComponentCollector({ filter, time: 900000 });

        collector.on("collect", async(i) => {
            i.deferUpdate();
            
            if(i.customId === "submit"){
                await interaction.deleteReply();
                let position = old_channel.position;
                let id = old_channel.id;
                let new_channel = await old_channel.clone();
                await old_channel.delete();
                new_channel.setPosition(position);

                if(new_channel.isTextBased()){
                    new_channel.send({
                        content: t("commands:nuke.success", { userTag: interaction.user.tag })
                    });
                }
                
                collector.stop(80);
            }
            
            if(i.customId === "cancel"){
                await interaction.editReply({
                    content: t("commands:global.canceled"),
                    ephemeral: true,
                    components: []
                });
                collector.stop(82);
            }
        })
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "nuke",
                description: "limpar por completo um canal de texto",
                permissions: {
                    bot: ["MANAGE_CHANNELS","ADMINISTRATOR"],
                    user: ["MANAGE_CHANNELS"]
                },
                category: "administração",
                usage: "[canal]",
                subCommands: []
            },
            en: {
                name: "nuke",
                description: "completely clear a text channel",
                permissions: {
                    bot: ["MANAGE_CHANNELS","ADMINISTRATOR"],
                    user: ["MANAGE_CHANNELS"]
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
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `gerenciar canais` e `administrador`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar canais`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `manage channels` and `admin`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `manage channels`"
            }
        }
    }
} 
module.exports = Command 
