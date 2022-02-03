let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "pay",
            description: "[ 💸economia ] dar panther-coins para um usuário!",
            category: "economy",
            usage: "<usuário> <quantidade> [mensagem]",
            commandOptions: [
                {
                    name: "user",
                    description: "um usuário para quem você quer pagar",
                    type: 6,
                    required: true
                },
                {
                    name: "amount",
                    description: "quantidade que você quer passar",
                    type: 10,
                    required: true
                },
                {
                    name: "message",
                    description: "uma MENSAGEM para ser enviada para o usuário",
                    type: 3,
                    required: false
                }
            ],
            buttonCommands: ["pay","cancel"]
        })
    }
    async interactionRun(interaction){
        let user = interaction.options.getUser('user');
        let message1 = interaction.options.getString("message");
        let amount = interaction.options.getNumber("amount"); 
        
        let value_1 = await economydb.fech(user);
        let value_2 = await economydb.fech(interaction.user);


        if(user === interaction.user){
            return interaction.followUp({
                content: "🚫**|** você não pode pagar você mesmo!",
                ephemeral: true
            })
        } else if(value_2.coins <= amount){
            return interaction.followUp({
                content: "🚫**|** você não tem PANTHER-COINS o suficientes!",
                ephemeral: true
            })
        } else if(amount <= 0){
            return interaction.followUp({
                content: "🚫**|** numeros neativos não comtam!",
                ephemeral: true
            })
        } else {
            let paybutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel("Pagar").setCustomId("pay");
            let cancelbutton = new Discord.MessageButton().setStyle("DANGER").setLabel("cancelar").setCustomId("cancel");
            let row = new Discord.MessageActionRow().addComponents(paybutton,cancelbutton);

            await interaction.followUp({
                content: `💸**|** você deseja mesmo transferir ${amount} panther-coins para **${user.username}**? \na equipe da karinaTwo **não se responsabiliza** pelos panther-coins perdidos, então certifique-se de estar transferindo para uma pessoa de confiança! \né proibido o comércio de conteúdo NSFW(+18) em troca de panther-coins!`,
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

                if(i.customId === "pay"){
                    await interaction.editReply({
                        content: `✅**|** Você transferiu **${amount}** ***panther-coins*** para o usuário ***${user.tag}***`,
                        ephemeral: true,
                        components: []
                    });
                    if(message1){
                        interaction.followUp({
                            content:"👍**|** e a MENSAGEM foi enviada com sucesso!",
                            ephemeral: true
                        })
                        user.send({
                            embeds: [new Discord.MessageEmbed().setDescription(`o ***${interaction.user.tag}*** te deu **${amount}** panther-coins!`).setColor("#be41f4").addField("uma MENSAGEM ele:",`${message1}`)]
                        })
                    }
                    await economydb.pay(interaction.user,user,amount);
                    collector.stop(80);
                }
                if(i.customId === "cancel"){
                    await interaction.editReply({
                        content: "👍**|** cancelado",
                        ephemeral: true,
                        components: []
                    })
                    collector.stop(82);
                }
            })
        }
    }
} 
module.exports = Command 