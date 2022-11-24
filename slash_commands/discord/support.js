let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/support.send.json");

let util = require("../../utils/main.js")
let KariWebhooks = new util.webhooks1()

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "support",
            description: "[ 📲discord ] technical support the karinaTwo",
            category: "discord",
            usage: "<sub command>",
            subCommands: [
                {
                    name: "server",
                    description: "support server of karinaTwo!"
                },
                {
                    name: "send",
                    description: "send a private support to my developer!"
                }
            ],
            commandOptions: [
                {
                    name: "server",
                    description: "[ 📲discord ] support server of karinaTwo!",
                    type: 1
                },
                {
                    name: "send",
                    description: "[ 📲discord ] send a private support to my developer!",
                    type: 1,
                    options: [...subCommand1]
                }
            ]
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
            await interaction.deferReply({ ephemeral:  true }).catch(() => {});
            let support1 = interaction.options.getString('support_args');

            if(support1.length >= 1001){
                return await interaction.followUp({
                    content: t("commands:support.send.error")
                })
            } else {
                let suport_ = new Discord.MessageEmbed();

                suport_.setColor("#FFFFF1");
                suport_.addField("autor:",`tag: \`${interaction.user.tag}\`\nid: \`${interaction.user.id}\``);
                suport_.addField("suporte:", `${support1}`);
                
                KariWebhooks.suport({
                    embeds: [suport_]
                });

                return await interaction.editReply({
                    content: t("commands:support.send.success")
                })
            }
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
                        description: "retornar o servidor de suporte"
                    },
                    {
                        name: "send",
                        description: "enviar um suporte privado para meu desenvolvedor"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 
