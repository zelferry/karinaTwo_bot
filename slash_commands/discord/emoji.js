let comando = require("../../frameworks/commando/command.js");
let subCommand1 = require("../../database/slash_commands/sub_commands/emoji.big.json");
let subCommand2 = require("../../database/slash_commands/sub_commands/emoji.send.json");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "emoji",
            description: "[ 📲discord ] everything to do with emojis!",
            category: "discord",
            commandOptions: [
                {
                    name: "big",
                    description: "[ 📲discord ] You'll never need a magnifying glass to see emojis again!",
                    type: 1,
                    options: [...subCommand1]
                },
                {
                    name: "send",
                    description: "[ 😂fun + 📲discord ] send an emoji in chat",
                    type: 1,
                    options: [...subCommand2]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        //await interaction.deferReply({ ephemeral:  this.deferReply }).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "big"){
            let emojiNAME = interaction.options.getString('emoji');
            let emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === emojiNAME.split(":")[1]);

            if(!emoji){
                await interaction.deferReply({ ephemeral: true }).catch(() => {});
                return interaction.followUp({
                    content: t("commands:emoji.big.error", { emojiName: emojiNAME })
                });
            } else {
                await interaction.deferReply({ ephemeral: false }).catch(() => {});
                return interaction.followUp({
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
            }
        } else if(subCOMMAND === "send"){
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            let emoginame2 = interaction.options.getString('emoji_name');

            let emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === emoginame2);

            if(!emoji){
                interaction.followUp({
                    content: t("commands:emoji.send.noEmoji", { emojiName: emoginame2 }),
                    ephemeral: true
                })
                return {} 
            } else if(emoji.animated === true){
                interaction.editReply({
                    content: t("commands:emoji.send.success"),
                    ephemeral: true
                })
                interaction.channel.send({
                    content: `<a:${emoginame2}:${emoji.id}>`
                })
                return {}
            } else {
                interaction.editReply({
                    content: t("commands:emoji.send.success"),
                    ephemeral: true
                });
                interaction.channel.send({
                   content: `<:${emoginame2}:${emoji.id}>`
                })
                return {}
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "emoji",
                description: "tudo sobre emojis!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "big",
                        description: "sabe aquele emoji lindo que você viu? AGORA NÃO PRECISARÁ USAR UMA LUPA PARA VER-LO!"
                    },
                    {
                        name: "send",
                        description: "faça eu enviar um emoji no chat!"
                    }
                ]
            },
            en: {
                name: "??",
                description: "all about emojis!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "big",
                        description: "you know that cute emoji you saw? NOW YOU DON'T NEED TO USE A MAGNIFYING GLASS TO SEE IT!"
                    },
                    {
                        name: "send",
                        description: "make me send an emoji in chat!"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 