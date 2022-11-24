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
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "straight"){
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.straight();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error")
                })
                return {}
            } else {
                let button_1 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_1);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "gay"){
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.gay();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error")
                })
                return {}
            } else {
                let button_1 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_1);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "futa"){
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.futa();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error")
                })
                return {}
            } else {
                let button_1 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_1);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "femboy"){
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.femboy();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error"),
                    ephemeral: true
                })
                return {}
            } else {
                let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_2);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "boobs") {
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.boobs();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error"),
                    ephemeral: true
                })
                return {}
            } else {
                let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_2);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "pussy") {
            await interaction.deferReply({
                ephemeral: this.deferReply
            }).catch(() => {});
            
            let url = await this.client.private_api.nekos.pussy();
            if(url.success === false){
                interaction.followUp({
                    content: t("commands:global.error.api_error"),
                    ephemeral: true
                })
                return {}
            } else {
                let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_2);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE").setURL(url.url);
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
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