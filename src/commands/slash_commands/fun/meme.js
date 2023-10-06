const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 
const mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    command_data = {
        name: "meme",
        description: "(fun) memes",
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "knuckles",
                description: "(fun) \"meme?\"",
                description_localizations: {
                    "pt-BR": "(diversão) \"meme?\""
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "meme",
            category: "fun"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "knuckles"){
            let data = [
                "approved",
                "illegal",
                "paralyzed"
            ];
            
            let attachment = new Discord.AttachmentBuilder(`./assets/knuckles/${t.lng}/knuckles_${data[mathRandom(data.length)]}.png`, { name: "knuckles.png" });

            interaction.editReply({
                embeds: [
                    {
                        title: t("commands:meme.knuckles"),
                        color: 1639005,
                        image: {
                            url: `attachment://knuckles.png`
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
            activated: true,
            pt: {
                name: "meme",
                description: "comandos só para memes!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "generate",
                        description: "gerar um meme aleatório"
                    },
                    {
                        name: "knuckles",
                        description: "\"meme?\""
                    }
                ]
            },
            en: {
                name: "meme",
                description: "commands only for memes!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "generate",
                        description: "generate a random meme"
                    },
                    {
                        name: "knuckles",
                        description: "\"meme?\""
                    }
                ]
            }
        }
    }
}

module.exports = Command