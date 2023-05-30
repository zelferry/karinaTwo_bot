const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "support",
        description: "(discord) technical support the karinaTwo",
        nameLocalizations: {
            "pt-BR": "suporte"
        },
        descriptionLocalizations: {
            "pt-BR": "(discord) suporte técnico a karinaTwo"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "server",
                description: "(discord) support server of karinaTwo!",
                nameLocalizations: {
                    "pt-BR": "servidor"
                },
                descriptionLocalizations: {
                    "pt-BR": "(discord) servidor de suporte de karinaTwo!"
                }
            },
            {
                type: 1,
                name: "send",
                description: "(discord) send a private support to my developer!",
                nameLocalizations: {
                    "pt-BR": "enviar"
                },
                descriptionLocalizations: {
                    "pt-BR": "(discord) envie um suporte privado para o meu desenvolvedor!"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "support",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "server"){
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            
            return await interaction.editReply({
                content: `${t("commands:support.server")}\nhttps://discord.gg/Xmu7HrH3yy`
            })
        } else if(subCOMMAND === "send"){
            let modal = new Discord.ModalBuilder().setCustomId("modal_support").setTitle(t("components:modal.support.title"));
            let support_input1 = new Discord.TextInputBuilder().setCustomId("modal_support_input").setLabel(t("components:modal.support.label")).setStyle(Discord.TextInputStyle.Paragraph).setMaxLength(1000).setMinLength(10).setRequired(true);

            let support_input2 = new Discord.ActionRowBuilder().addComponents(support_input1);
            modal.addComponents(support_input2);
            await interaction.showModal(modal);
        }
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "support",
                description: "suporte técnico a karinaTwo!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "server",
                        description: "retornar o servidor de suporte"
                    },
                    {
                        name: "send",
                        description: "enviar um suporte privado para meu desenvolvedor"
                    }
                ]
            },
            en: {
                name: "support",
                description: "technical support to karinaTwo!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "server",
                        description: "return support server"
                    },
                    {
                        name: "send",
                        description: "send a private support to my developer"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 
