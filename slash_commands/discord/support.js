let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/support.send.json");

let util = require("../../utils/main.js")
let KariWebhooks = new util.webhooks()

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "support",
            description: "[ 📲discord ] suporte técnico da karinaTwo",
            category: "discord",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "server",
                    description: "servidor de suporte da karinaTwo!"
                },
                {
                    name: "send",
                    description: "emviar um suporte privado!"
                }
            ],
            commandOptions: [
                {
                    name: "server",
                    description: "[ 📲discord ] servidor de suporte da karinaTwo!",
                    type: 1
                },
                {
                    name: "send",
                    description: "[ 📲discord ] emviar um suporte privado!",
                    type: 1,
                    options: [...subCommand1]
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "server"){
            return await interaction.editReply({
                content: "😁**|** meu servidor de suporte!\nhttps://discord.gg/Xmu7HrH3yy",
                ephemeral: true
            })
        } else if(subCOMMAND === "send"){
            let support1 = interaction.options.getString('support_args');

            if(support1.length >= 1001){
                return await interaction.followUp({
                    content:"🚫**|** forneça um relatorio de no máximo 1000 caracteres.",
                    ephemeral: true
                })
            } else {
                let suport_ = new Discord.MessageEmbed();

                suport_.setColor("#FFFFF1");
                suport_.addField("autor:",`tag: \`${interaction.user.tag}\`\nid: \`${interaction.user.id}\``);
                suport_.addField("suporte:", `${support1}`);
                
                KariWebhooks.suport(suport_);

                return await interaction.editReply({
                    content: "✅**|** enviado com sucesso!",
                    ephemeral: true
                })
            }
        }
    }
} 
module.exports = Command 
