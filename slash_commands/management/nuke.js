let comando = require("../../frameworks/commando/command.js");
//let wait = require('node:timers/promises').setTimeout;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nuke",
            description: "[ 👩‍⚖️management ] completely clear a text channel",
            category: "management",
            usage: "[canal]",
            permissions: {
                user: ["MANAGE_CHANNELS"],
                bot: ["MANAGE_CHANNELS","ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    name: "channel",
                    description: "text channel to take a NUKE",
                    type: 7,
                    required: false
                }
            ],
            //deferReply: true,
            buttonCommands: ["submit","cancel"]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let old_channel = interaction.options.getChannel('channel') || interaction.channel;

        let subbutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel(t("commands:global.button.execute")).setCustomId("submit");
        
        let cancelbutton = new Discord.MessageButton().setStyle("DANGER").setLabel(t("commands:global.button.cancel")).setCustomId("cancel");
        let row = new Discord.MessageActionRow().addComponents(subbutton,cancelbutton);

        await interaction.followUp({
            content: t("commands:nuke.warn", { oldchannel: old_channel.name }),
            ephemeral: true,
            components: [row]
        });

        const buttonFilter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector(buttonFilter, {
            componentType: 'BUTTON',
            time: 900000
        });

        collector.on("collect", async(i) => {
            i.deferUpdate();
            
            if(i.customId === "submit"){
                await interaction.editReply({
                    content: t("commands:nuke.wait"),
                    ephemeral: true,
                    components: []
                });

                let position = old_channel.position;
                let new_channel = await old_channel.clone();
                await old_channel.delete();
                new_channel.setPosition(position);

                if(new_channel.isText()){
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
