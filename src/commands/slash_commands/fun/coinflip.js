const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "coinflip",
        description: "(fun) play heads or tails with me!",
        descriptionLocalizations: {
            "pt-BR": "(diversão) jogue cara ou coroa comigo!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "side",
                description: "which side will you choose?",
                nameLocalizations: {
                    "pt-BR": "lado"
                },
                descriptionLocalizations: {
                    "pt-BR": "qual será o lado que você ira escolher?"
                },
                choices: [
                    {
                        name: "face",
                        nameLocalizations: {
                            "pt-BR": "cara"
                        },
                        value: "cara"
                    },
                    {
                        name: "crown",
                        nameLocalizations: {
                            "pt-BR": "coroa"
                        },
                        value: "coroa"
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "coinflip",
            category: "fun"
        })
        
        this.coinflip_system = [
            {
                value: "cara",
                emoji: "<:heards:823247399040319498>"
            },
            {
                value: "coroa",
                emoji: "<:tails:823247556591091753>"
            }
        ]

        this.coinflip_txt = {
            "pt-BR": {
                cara: "cara",
                coroa: "coroa"
            },
            "en-US": {
                cara: "face",
                coroa: "crown"
            }
        }
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let data = interaction.options.getString("side");
        let array = this.coinflip_system[Math.floor(Math.random() * this.coinflip_system.length)];
        
        let text1 = this.coinflip_txt[t.lng]

        if(data == array.value){
            interaction.editReply({
                content: `${array.emoji}**|** ${t("commands:coinflip.normal.win", { value: text1[array.value] })}`
            });
            
            return {}
        } else if(data != array.value){
            interaction.editReply({
                content: `${array.emoji}**|** ${t("commands:coinflip.normal.loser", { value: text1[array.value] })}`
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "coinflip",
                description: "jogue cara ou coroa comigo!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<cara|coroa>",
                subCommands: []
            },
            en: {
                name: "coinflip",
                description: "play heads or tails with me!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<face|crown>",
                subCommands: []
            }
        }
    }
}

module.exports = Command 