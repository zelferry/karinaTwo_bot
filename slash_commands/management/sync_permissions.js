let comando = require("../../frameworks/commando/command.js");
//let wait = require('node:timers/promises').setTimeout;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "synchronize_permissions",
            description: "[ 👩‍⚖️administração ] sincronizaras permissões de um canal de texto a partir de sua categoria",
            category: "management",
            usage: "[canal]",
            permissions: {
                user: ["MANAGE_CHANNELS"],
                bot: ["MANAGE_CHANNELS","ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    name: "channel",
                    description: "canal de texto",
                    type: 7,
                    required: false
                }
            ],
            deferReply: true,
            buttonCommands: ["submit","cancel"]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let old_channel = interaction.options.getChannel('channel') || interaction.channel;

        let subbutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel("sim, executar").setCustomId("submit");
        let cancelbutton = new Discord.MessageButton().setStyle("DANGER").setLabel("cancelar").setCustomId("cancel");
        let row = new Discord.MessageActionRow().addComponents(subbutton,cancelbutton);

        await interaction.followUp({
            content: "🚫**|** espera ai!\ndeseja mesmo que eu faça isso?\n\neu estarei sinconando as permissões de "+old_channel.name+" com a sua categoria de origem",
            //ephemeral: true,
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
                    content: "🔥**|** sincronizando...",
                    //ephemeral: true,
                    components: []
                });
                
                old_channel.lockPermissions().then(async() => {
                    await interaction.editReply({
                        content: "😁**|** sincronizado com sucesso!"
                    });
                    collector.stop(80);
                }).catch(async(err) => {
                    await interaction.editReply({
                        content: "❌**|** aconteceu um erro ao executar o comando!"
                        //ephemeral: true
                    });
                    console.log(err);
                    collector.stop(80)
                })
            }
            
            if(i.customId === "cancel"){
                await interaction.editReply({
                    content: "👍**|** cancelado",
                    //ephemeral: true,
                    components: []
                });
                collector.stop(82);
            }
        })
    }
} 
module.exports = Command 