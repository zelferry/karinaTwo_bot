let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

//et Canvas = require('canvas');

let { profile } = require("../../mongoDB/ini.js").user 

class Command extends comando {
    command_data = {
        name: "user",
        description: "(discord) commands that have to do with users",
        nameLocalizations: {
            "pt-BR": "usuário"
        },
        descriptionLocalizations: {
            "pt-BR": "(discord) comandos que têm a ver com usuários"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "avatar",
                description: "(utilities) you know that beautiful avatar you saw? see him clearly",
                descriptionLocalizations: {
                    "pt-BR": "(utilitários) sabe aquele avatar lindo que você viu? você pode vê-lo claramente"
                },
                options: [{
                    type: 6,
                    name: "user",
                    description: "user (@user/id) so you can see their avatar",
                    required: false,
                    nameLocalizations: {
                        "pt-BR": "usuário"
                    },
                    descriptionLocalizations: {
                        "pt-BR": "usuário (@usuário/id) para que você possa ver seu avatar"
                    }
                }]
            },
            {
                type: 1,
                name: "aboutme", 
                description: "(social) change your \"about me\" from \"/profile\"",
                nameLocalizations: {
                    "pt-BR": "sobremim"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) mude seu \"sobre mim\" do \"/profile\""
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "user",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await this[interaction.options.getSubcommand()](interaction, t)
    }

    /* avatar */
    async avatar(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


        let button_ = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(`${avatar}`).setLabel(t("commands:global.button.web"));
        let row = new Discord.ActionRowBuilder().addComponents(button_);
        
        let embed = new Discord.EmbedBuilder().setColor(`#4cd8b2`).setTitle(t("commands:user.avatar", { userName: user.username })).setImage(avatar);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    }

    /* about me */
    async aboutme(interaction, t){
        let value = await profile.find(interaction.user);
        
        let modal = new Discord.ModalBuilder().setCustomId("modal_aboutme").setTitle(t("components:modal.aboutme.title"));
        let aboutme_input1 = new Discord.TextInputBuilder().setCustomId("modal_aboutme_input").setLabel(t("components:modal.aboutme.label")).setStyle(Discord.TextInputStyle.Paragraph).setMaxLength(600).setMinLength(1).setRequired(true).setValue(value.usertext);
        
        let aboutme_input2 = new Discord.ActionRowBuilder().addComponents(aboutme_input1);
        modal.addComponents(aboutme_input2);
        await interaction.showModal(modal);
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "user",
                description: "comandos sobre usuários!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "avatar",
                        description: "ver o avatar de um usuário em HD!"
                    },
                    {
                        name: "aboutme",
                        description: "alterar o \"sobre mim\" do \"/profile\"!"
                    }
                ]
            },
            en: {
                name: "user",
                description: "commands on users!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "avatar",
                        description: "view a user's avatar in HD!"
                    },
                    {
                        name: "aboutme",
                        description: "change the \"about me\" of \"/profile\"!"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 