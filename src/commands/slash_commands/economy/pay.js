const comando = require("../../../structures/commands/command.js");
const { economydb } = require("../../../data/ini.js").user 

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "pay",
        description: "(economy) transfer panther-coins to another user",
        nameLocalizations: {
            "pt-BR": "pagar"
        },
        descriptionLocalizations: {
            "pt-BR": "(economia) transferir panther-coins para outro usuário"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 6,
                name: "user",
                description: "user (@user/id) who you want to pay",
                required: true,
                nameLocalizations: {
                    "pt-BR": "usuário"
                },
                descriptionLocalizations: {
                    "pt-BR": "usuário (@usuário/id) que você deseja pagar"
                }
            },
            {
                type: 10,
                name: "amount",
                description: "amount you want to send",
                required: true,
                nameLocalizations: {
                    "pt-BR": "quantia"
                },
                descriptionLocalizations: {
                    "pt-BR": "valor que deseja enviar"
                }
            },
            {
                type: 3,
                name: "message",
                description: "a MESSAGE to be sent to the user",
                required: false,
                nameLocalizations: {
                    "pt-BR": "mensagem"
                },
                descriptionLocalizations: {
                    "pt-BR": "uma MENSAGEM a ser enviada ao usuário"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "pay",
            category: "economy",
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
            let paybutton = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Success).setLabel(t("commands:pay.button.pay")).setCustomId("pay");
            let cancelbutton = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Danger).setLabel(t("commands:pay.button.canceled")).setCustomId("cancel");
            let row = new Discord.ActionRowBuilder().addComponents(paybutton,cancelbutton);

            await interaction.followUp({
                content: t("commands:pay.success.warn", { amount: amount.toString(), userName: user.username }),
                ephemeral: true,
                components: [row]
            });

            const filter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 900000 });

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
                            embeds: [new Discord.EmbedBuilder().setDescription(t("commands:pay.success.sendMessage.label1", { authorTag: interaction.user.tag, amount: amount.toString() })).setColor("#fd9058").addFields({ name: t("commands:pay.success.sendMessage.label2"), value: `${message1}` })]
                        })
                    }
                    await economydb.pay(interaction.user, user, amount);
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