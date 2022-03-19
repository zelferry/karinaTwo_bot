let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

let backup = require('discord-backup');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "backup",
            description: "criar/carregar um backup de um servidor",
            category: "management",
            usage: "<sub comando>",
            permissions: {
                user: ["MANAGE_MESSAGES"]
            },
            subCommands: [
                {
                    name: "create",
                    description: "criar um backup de seu servidor"
                },
                {
                    name: "load",
                    description: "carregar um backup de seu servidor!"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "create",
                    description: "[ 👩‍⚖️administração ] criar um backup de seu servidor!"
                },
                {
                    type: 1,
                    name: "load",
                    description: "[ 👩‍⚖️administração ] carregar um backup de seu servidor!",
                    options: [
                        {
                            type: 3,
                            name: "id",
                            description: "id do backup fornecido pela karina após você ter criado",
                            required: true
                        }
                    ]
                }
            ],
            buttonCommands: ["submit","cancel"]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "create"){
            backup.create(interaction.guild, {
                maxMessagesPerChannel: 0,
                doNotBackup: [ "emojis", "bans" ]
            }).then((backupData) => {
                interaction.editReply({
                    content: "📲**|** backup criado!\n💽**|** use `/backup load id:"+backupData.id+"` em um outro servidor para carregar o backup!!"
                });
            }).catch(() => {
                interaction.editReply({
                    content: "aconteceu um erro estranho d+ ao criar o backup, tente novamente mais tarde\n\nse persistir entre em suporte usando `/suport`"
                })
            })
            return;
        } else if(subCOMMAND === "load"){
            let backupID = interaction.options.getString("id");

            let paybutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel("confirmar").setCustomId("submit");
            let cancelbutton = new Discord.MessageButton().setStyle("DANGER").setLabel("cancelar").setCustomId("cancel");
            let row = new Discord.MessageActionRow().addComponents(paybutton,cancelbutton);

            backup.fetch(backupID).then(async() => {
                await interaction.editReply({
                    content: "😵**|** tem certeza?\ntodos os **canais de texto/voz/anúncios**, **cargos** e **ícone do servidor** seram deletados e substituídos pelos que estam no backup\n🤔**|** quer realmente fazer isso?",
                    components: [row]
                });

                const buttonFilter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;

                const collector = interaction.channel.createMessageComponentCollector(buttonFilter, { componentType: 'BUTTON', time: 900000 });
                collector.on("collect", async(i) => {
                    i.deferUpdate();

                    if(i.customId === "submit"){
                        backup.load(backupID, interaction.guild, {
                            clearGuildBeforeRestore: true,
                            maxMessagesPerChannel: 0
                        }).catch(async(err) => {
                            if (err === 'No backup found'){
                                await interaction.editReply({
                                    content: "o ID do backup fornecido não existe!"
                                })
                            } else {
                                interaction.user?.send({
                                    content: "aconteceu um erro estranho d+ :c"
                                })
                            }
                        })
                        collector.stop(80)
                    } else if(customId === "cancel"){
                        await interaction.editReply({
                            content: "👍**|** cancelado!"
                        });
                        collector.stop(80)
                    }
                })
            })
        }
    }
} 

module.exports = Command