let comando = require("../../frameworks/commando/command.js");
//let wait = require('node:timers/promises').setTimeout;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nuke",
            description: "[ 👩‍⚖️administração ] limpar por completo um canal de texto",
            category: "management",
            usage: "[canal]",
            permissions: {
                user: ["MANAGE_CHANNELS"],
                bot: ["MANAGE_CHANNELS","ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    name: "channel",
                    description: "canal de texto a levar um NUKE",
                    type: 7,
                    required: false
                }
            ],
            //deferReply: true,
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
            content: "🚫**|** espera ai!\ndeseja mesmo que eu faça isso?\n\neu estarei fazendo o seguinte:\n`1 - clonar o canal "+old_channel.name+"`\n`2 - deletar o canal "+old_channel.name+"`\n\ndeseja que eu faça isso?",
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
                    content: "🔥**|** NUKE iniciado",
                    ephemeral: true,
                    components: []
                });

                let position = old_channel.position;
                let new_channel = await old_channel.clone();
                await old_channel.delete();
                new_channel.setPosition(position);

                if(new_channel.isText()){
                    new_channel.send({
                        content: "🗿🤙**|** canal ***100***% limpo pelo ***"+interaction.user.tag+"***"
                    });
                }
                collector.stop(80);
            }
            
            if(i.customId === "cancel"){
                await interaction.editReply({
                    content: "👍**|** cancelado",
                    ephemeral: true,
                    components: []
                });
                collector.stop(82);
            }
        })
    }
} 
module.exports = Command 
