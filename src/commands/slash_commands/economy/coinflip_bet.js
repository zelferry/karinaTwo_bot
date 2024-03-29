const comando = require("../../../structures/commands/command.js");
const { economydb } = require("../../../data/ini.js").user;

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "coinflip_bet",
        description: "(economy + ⭐vip) play heads or tails with me! (panther-coins betting version)",
        description_localizations: {
            "pt-BR": "(economia + ⭐vip) jogue cara ou coroa comigo! (versão de aposta de panther-coins)"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "side",
                description: "which side will you choose?",
                name_localizations: {
                    "pt-BR": "lado"
                },
                description_localizations: {
                    "pt-BR": "qual será o lado que você ira escolher?"
                },
                choices: [
                    {
                        name: "face",
                        name_localizations: {
                            "pt-BR": "cara"
                        },
                        value: "cara"
                    },
                    {
                        name: "crown",
                        name_localizations: {
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
            name: "coinflip_bet",
            vip: true,
            category: "economy"
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
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data = interaction.options.getString("side");
        let value = await economydb.fech(interaction.user);
        let array = this.coinflip_system[Math.floor(Math.random() * this.coinflip_system.length)];
        let text1 = this.coinflip_txt[t.lng]

        if(value.coins <= 49){
            return interaction.followUp({
                content: t("commands:coinflip.bet.error")
            })
        } else if(data == array.value){
            await economydb.addmoney(interaction.user, 50, false);
            interaction.editReply({
                content: `${array.emoji}**|** ${t("commands:coinflip.bet.win", { value: text1[array.value] })}`
            });
            
            return {}
        } else if(data != array.value){
            await economydb.removemoney(interaction.user, 50);
            interaction.editReply({
                content: `${array.emoji}**|** ${t("commands:coinflip.bet.loser", { value: text1[array.value] })}`
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "coinflip_bet",
                description: "jogue cara ou coroa comigo! (versão de aposta de panther-coins)",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<cara|coroa>",
                subCommands: []
            },
            en: {
                name: "coinflip_bet",
                description: "play heads or tails with me! (panther-coins betting version)",
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