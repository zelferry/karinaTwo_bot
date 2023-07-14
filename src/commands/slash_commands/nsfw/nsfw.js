const comando = require("../../../structures/commands/command.js");
const { profile } = require('../../../data/ini.js').user;

const Discord = require("discord.js");
const mathRandom = (number) => ~~(Math.random() * number);
//let endpoint = require("../../dist/main.js").image.api()

class Command extends comando {
    command_data = {
        name: "nsfw",
        description: "(nsfw) nsfw commands",
        description_localizations: {
            "pt-BR": "(nsfw) comandos nsfw"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 1,
                name: "straight",
                description: "(nsfw) nsfw straight"
            },
            {
                type: 1,
                name: "yaoi",
                description: "(nsfw) nsfw yaoi"
            },
            {
                type: 1,
                name: "futa",
                description: "(nsfw) nsfw futa"
            },
            {
                type: 1,
                name: "femboy",
                description: "(nsfw + ⭐vip) nsfw femboy"
            },
            {
                type: 1,
                name: "bara",
                description: "(nsfw + ⭐vip) nsfw bara (may contain extraneous content)",
                description_localizations: {
                    "pt-BR": "(nsfw + ⭐vip) nsfw bara (pode conter conteúdo estranho)"
                }
            },
            {
                type: 1,
                name: "boobs",
                description: "(nsfw + ⭐vip) nsfw boobs"
            },
            {
                type: 1,
                name: "pussy",
                description: "(nsfw + ⭐vip) nsfw pussy"
            },
            {
                type: 1,
                name: "maid",
                description: "(nsfw) nsfw maid"
            },
            {
                type: 1,
                name: "succubus",
                description: "(nsfw + ⭐vip) succubus nsfw"
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "nsfw",
            category: "nsfw",
            nsfw: true
        })

        this.vip_args = ["femboy", "bara", "boobs", "pussy", "succubus"]
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let value = await profile.find(interaction.user);
        let subCOMMAND = interaction.options.getSubcommand();

        let url = await this.client.private_api.nekos[subCOMMAND]();
        
        if(url.success === false){
            interaction.followUp({
                content: t("commands:global.error.api_error")
            });
            return {}
        } else if(!url.url){
            interaction.followUp({
                content: t("commands:global.error.no_url")
            });
            return {}
        } else {
            if(this.vip_args.includes(subCOMMAND) && !value.config.vip.active){
                interaction.editReply({
                    content: t("commands:global.vip_user_arg", {
                        arg: (subCOMMAND).toString()
                    })
                });

                return {}
            } else {
                let button_1 = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(url.url).setLabel(t("commands:global.button.web"));
                let button_2 = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(`https://danbooru.donmai.us/post_flags/new?post_flag%5Bpost_id%5D=${url.data.id}`).setLabel(t("commands:global.button.report"));
                let row1 = new Discord.ActionRowBuilder().addComponents(button_1, button_2);

                let embed3 = new Discord.EmbedBuilder().setImage(url.url).setColor("#7B68EE");

                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "nsfw",
                description: "comandos *Not Safe For Work* se é que você me entende...",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "straight",
                        description: "nsfw straight"
                    },
                    {
                        name: "gay",
                        description: "nsfw gay"
                    },
                    {
                        name: "futa",
                        description: "nsfw futa"
                    },
                    {
                        name: "femboy",
                        description: "nsfw femboy"
                    },
                    {
                        name: "boobs",
                        description: "nsfw boobs"
                    },
                    {
                        name: "pussy",
                        description: "nsfw pussy"
                    }
                ]
            },
            en: {
                name: "nsfw",
                description: "*Not Safe For Work* commands if you know what I mean...",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "straight",
                        description: "nsfw straight"
                    },
                    {
                        name: "gay",
                        description: "nsfw gay"
                    },
                    {
                        name: "futa",
                        description: "nsfw futa"
                    },
                    {
                        name: "femboy",
                        description: "nsfw femboy"
                    },
                    {
                        name: "boobs",
                        description: "nsfw boobs"
                    },
                    {
                        name: "pussy",
                        description: "nsfw pussy"
                    }
                ]
            }
        }
    }
}

module.exports = Command