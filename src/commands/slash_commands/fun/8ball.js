const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "fleur",
        description: "(fun) fleufurr has the answer to your question!",
        description_localizations: {
            "pt-BR": "(diversão) fleufurr tem a resposta para sua pergunta!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                name: "question",
                description: "what's the question?",
                required: true,
                name_localizations: {
                    "pt-BR": "questão"
                },
                description_localizations: {
                    "pt-BR": "qual é a questão?"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "fleur",
            category: "fun"
        })
    }
    async interactionRun(interaction, t) {
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => { });

        const args1 = interaction.options.getString('question');
        const attachment = new Discord.AttachmentBuilder(`./assets/content/fleur.png`, { name: "fleur.png" });

        if (!args1) {
            await interaction.followUp({
                content: t("commands:eight_ball.error")
            });

            return {}
        } else {
            await interaction.editReply({
                embeds: [
                    {
                        title: "fleur",
                        description: `${t("commands:eight_ball.asks.label_" + (Math.floor(Math.random() * 13) + 1) + "")}`,
                        thumbnail: {
                            url: "attachment://fleur.png"
                        }
                    }
                ],
                files: [attachment]
            });

            return {}
        }
    }

    command_info(){
        return {
            activated: false,
            pt: {
                name: "fleur",
                description: "fleufurr tem a resposta para sua pergunta!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<pergunta>",
                subCommands: []
            },
            en: {
                name: "fleur",
                description: "fleufurr has the answer to your question!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<question>",
                subCommands: []
            }
        }
    }
}
module.exports = Command