const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "converse",
        description: "(fun) a nice chat between you and me (not available in english)",
        description_localizations: {
            "pt-BR": "(diversão) um papo legal entre mim e você"
        },
        name_localizations: {
            "pt-BR": "conversar"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                name: "text",
                description: "your text",
                required: true,
                name_localizations: {
                    "pt-BR": "texto"
                },
                description_localizations: {
                    "pt-BR": "seu texto"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "converse",
            category: "fun",
            vip: true,
            deferReply: false
        })
    }
    
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});

        if (t.lng !== "pt-BR") {
            await interaction.followUp({
                content: t("commands:ia.error")
            });

            return {}
        } else {
            await interaction.editReply({
                embeds: [
                    {
                        title: "karinaTwo + ia",
                        description: `\`\`\`toml\n${t("commands:ia.wait")}\`\`\``
                    }
                ]
            });

            try {
                let res = await this.client.ia(interaction.options.getString("text"));

                await interaction.editReply({
                    embeds: [
                        {
                            title: "karinaTwo + ia",
                            description: `${res}`,
                            url: "https://openai.com/",
                            footer: {
                                text: "powered by OpenAi"
                            }
                        }
                    ]
                });

                return {}
            } catch(err) {
                await interaction.editReply({
                    embeds: [
                        {
                            title: "karinaTwo + ia",
                            description: `${t("commands:global.error.api_error")}`
                        }
                    ]
                });

                console.log(err);

                return {}
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "conversar",
                description: "um papo legal entre mim e você",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<texto>",
                subCommands: []
            },
            en: {
                name: "converse",
                description: "a nice chat between you and me",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<text>",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: ",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: "
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: ",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: "
            }
        }
    }
}

module.exports = Command