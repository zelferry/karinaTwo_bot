let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "pay",
            description: "[ 💸economy ] donate panther-coins to a user!",
            category: "economy",
            usage: "<user> <the amount> [message]",
            commandOptions: [
                {
                    name: "user",
                    description: "user (@user/id) who you want to pay",
                    type: 6,
                    required: true
                },
                {
                    name: "amount",
                    description: "amount you want to spend",
                    type: 10,
                    required: true
                },
                {
                    name: "message",
                    description: "a MESSAGE to be sent to the user",
                    type: 3,
                    required: false
                }
            ],
            buttonCommands: ["pay","cancel"]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user');
        let message1 = interaction.options.getString("message");
        let amount = interaction.options.getNumber("amount"); 
        
        let value_1 = await economydb.fech(user);
        let value_2 = await economydb.fech(interaction.user);


        if(user === interaction.user){
            return interaction.followUp({
                content: t("commands:pay.error.isThatYou"),
                ephemeral: true
            })
        } else if(value_2.coins <= amount){
            return interaction.followUp({
                content: t("commands:pay.error.insufficient"),
                ephemeral: true
            })
        } else if(amount <= 0){
            return interaction.followUp({
                content: t("commands:pay.error.noNegative"),
                ephemeral: true
            })
        } else {
            let paybutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel(t("commands:pay.button.pay")).setCustomId("pay");
            let cancelbutton = new Discord.MessageButton().setStyle("DANGER").setLabel(t("commands:pay.button.canceled")).setCustomId("cancel");
            let row = new Discord.MessageActionRow().addComponents(paybutton,cancelbutton);

            await interaction.followUp({
                content: t("commands:pay.success.warn", { amount: amount.toString(), userName: user.username }),
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
                        content: t("commands:pay.success.transferred", { amount: amount.toString(), userTag: user.tag }),
                        ephemeral: true,
                        components: []
                    });
                    if(message1){
                        interaction.followUp({
                            content: t("commands:pay.success.sendMessage.success"),
                            ephemeral: true
                        })
                        user.send({
                            embeds: [new Discord.MessageEmbed().setDescription(t("commands:pay.success.sendMessage.label1", { authorTag: interaction.user.tag, amount: amount.toString() })).setColor("#fd9058").addField(t("commands:pay.success.sendMessage.label2"),`${message1}`)]
                        })
                    }
                    await economydb.pay(interaction.user,user,amount);
                    collector.stop(80);
                }
                if(i.customId === "cancel"){
                    await interaction.editReply({
                        content: t("commands:global.canceled"),
                        ephemeral: true,
                        components: []
                    })
                    collector.stop(82);
                }
            })
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "pay",
                description: "transferir panther-coins para um usuário!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                usage: "<usuário> <quantidade> [mensagem]",
                subCommands: []
            },
            en: {
                name: "pay",
                description: "transfer panther-coins to a user!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "<user> <the amount> [message]",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 