let Discord = require("discord.js");
let comando = require("../../frameworks/commando/command.js");

let mathRandom = (number) => ~~(Math.random() * number);
//let endpoint = require("../../dist/main.js").image.api()

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nsfw",
            description: "comandos nsfw",
            category: "nsfw",
            nsfw: true,
            commandOptions: [
                {
                    type: 1,
                    name: "straight",
                    description: "[ 😈nsfw ] nsfw straight"
                },
                {
                    type: 1,
                    name: "gay",
                    description: "[ 😈nsfw ] nsfw gay"
                },
                {
                    type: 1,
                    name: "futa",
                    description: "[ 😈nsfw ] nsfw futa"
                },
                {
                    type: 1,
                    name: "femboy",
                    description: "[ 😈nsfw ] nsfw femboy"
                },
                {
                    type: 1,
                    name: "boobs",
                    description: "[ 😈nsfw ] nsfw boobs"
                },
                {
                    type: 1,
                    name: "pussy",
                    description: "[ 😈nsfw ] nsfw pussy"
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
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
            let button_1 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel(t("commands:global.button.web"));
            let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(`https://danbooru.donmai.us/post_flags/new?post_flag%5Bpost_id%5D=${url.data.id}`).setLabel(t("commands:global.button.report"));
            
            let row1 = new Discord.MessageActionRow().addComponents(button_1, button_2);
            let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
            interaction.editReply({
                embeds: [embed3],
                components: [row1]
            });
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