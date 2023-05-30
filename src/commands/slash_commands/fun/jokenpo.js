const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "jokenpo",
        description: "(fun) ROCK, PAPER AND SCISSOR!",
        descriptionLocalizations: {
            "pt-BR": "(diversão) PEDRA, PAPEL E TESOURA!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                name: "choice",
                description: "rock, paper or scissors?",
                required: true,
                nameLocalizations: {
                    "pt-BR": "escolha"
                },
                descriptionLocalizations: {
                    "pt-BR": "pedra, papel ou tesoura?"
                },
                choices: [
                    {
                        name: "rock",
                        nameLocalizations: {
                            "pt-BR": "pedra"
                        },
                        value: "pedra"
                    },
                    {
                        name: "paper",
                        nameLocalizations: {
                            "pt-BR": "papel"
                        },
                        value: "papel"
                    },
                    {
                        name: "scissor",
                        nameLocalizations: {
                            "pt-BR": "tesoura"
                        },
                        value: "tesoura"
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "jokenpo",
            category: "fun"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data = interaction.options.getString("choice");
        let rng = Math.floor((Math.random() * 100) + 1);
        
        if(data === "pedra"){
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: t("commands:jokenpo.rock.we_tie")
                })
                return {}
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: t("commands:jokenpo.rock.loser")
                })
                return {}
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: t("commands:jokenpo.rock.win")
                })
                return {}
            }
        } else if(data === "papel") {
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: t("commands:jokenpo.paper.we_tie")
                })
                return {}
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: t("commands:jokenpo.paper.loser")
                })
                return {}
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: t("commands:jokenpo.paper.win")
                })
                return {}
            }
        } else if(data === "tesoura") {
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: t("commands:jokenpo.scissor.we_tie")
                })
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: t("commands:jokenpo.scissor.loser")
                })
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: t("commands:jokenpo.scissor.win")
                })
            }
        }
        //fim
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "jokenpo",
                description: "pedra papel tesoura!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<pedra | papel | tesoura>",
                subCommands: []
            },
            en: {
                name: "jokenpo",
                description: "ROCK, PAPER AND SCISSORS!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<stone | paper | scissor>",
                subCommands: []
            }
        }
    }
} 

module.exports = Command 