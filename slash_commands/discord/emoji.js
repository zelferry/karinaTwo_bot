let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/emoji.big.json");
let subCommand2 = require("../../database/slash_commands/sub_commands/emoji.send.json");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "emoji",
            description: "[ 📲discord ] tudo que tem aver com emojis!",
            category: "discord",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "big",
                    description: "nunca mais ira precisar de uma lupa para ver os emojis!"
                },
                {
                    name: "send",
                    description: "enviar um emoji no chat"
                }
            ],
            commandOptions: [
                {
                    name: "big",
                    description: "[ 📲discord ] nunca mais ira precisar de uma lupa para ver os emojis!",
                    type: 1,
                    options: [...subCommand1]
                },
                {
                    name: "send",
                    description: "[ 😂diversão + 📲discord ] enviar um emoji no chat",
                    type: 1,
                    options: [...subCommand2]
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "big"){
            let emojiNAME = interaction.options.getString('emoji');
            let emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === emojiNAME.split(":")[1]);

            if(!emoji){
                return interaction.reply({
                    content: `🚫**|** o emoji \`${emojiNAME}\` não e um emoji válido!`,
                    ephemeral: true
                });
            } else {
                return interaction.reply({
                    embeds: [
                        {
                            description: `${emojiNAME.split(":")[1]}`,
                            color: "#7289DA",
                            image:{
                                url: `${emoji.url}`
                            }
                        }
                    ]
                })
                //fim
            }
        } else if(subCOMMAND === "send"){
            let emoginame2 = interaction.options.getString('emoji_name');

            let emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === emoginame2);

            if(!emoji){
                interaction.followUp({
                    content: `\`${emoginame2}\`**não ** e um emoji ddesse servidor!`,
                    ephemeral: true
                })
                return {} 
            } else if(emoji.animated === true){
                interaction.editReply({
                    content: "✅**|** enviado com sucesso!",
                    ephemeral: true
                })
                interaction.channel.send({
                    content: `<a:${emoginame2}:${emoji.id}>`
                })
                return {}
            } else {
                interaction.editReply({
                    content: "✅**|** enviado com sucesso!",
                    ephemeral: true
                });
                interaction.channel.send({
                   content: `<:${emoginame2}:${emoji.id}>`
                })
                return {}
            }
        }
    }
} 
module.exports = Command 