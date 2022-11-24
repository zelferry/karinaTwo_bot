let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "actions",
            description: "[ 👤social ] do some kind of action with some user!",
            category: "social",
            commandOptions: [
                {
                    type: 1,
                    name: "attack",
                    description: "[ 👤social ] a user forgot to pay paçoca panther-coins? shoot at x1 with him!",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "user (@user/id) to be attacked",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "hug",
                    description: "[ 👤social ] give someone a hug!",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "user (@user/id) to be hugged",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "dance",
                    description: "[ 👤social ] dance with some user!",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "user (@user/id) to dance with you",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "kiss",
                    description: "[ 👤social ] kiss some user :)",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "user (@user/id) to be kissed",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "slap",
                    description: "[ 👤social ] of a slap on a user!",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "user (@user/id) to be slapped",
                            required: true
                        }
                    ]
                }
            ]
        })
    }

    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser("user");

        if (user.id === interaction.user.id) {
            interaction.followUp({
                content: t(`commands:actions.${interaction.options.getSubcommand()}.error`),
                ephemeral: true
            });
            return {}
        } else {
            let embed = this.embed_maker_({
                title: t(`commands:actions.${interaction.options.getSubcommand()}.success.title`),
                description: t(`commands:actions.${interaction.options.getSubcommand()}.success.description`, {
                    user1: interaction.user.tag,
                    user2: user.tag
                })/*,
                url: social[interaction.options.getSubcommand()]()*/
            });

            interaction.editReply({
                embeds: [embed]
            });

            return {}
        }
    }

    embed_maker_(data){
        return {
            title: data.title,
            description: data.description,
            color: "#836FFF"/*,
            image: {
                url: data.url
            }*/
        }
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "actions",
                description: "comandos de roleplay!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "attack",
                        description: "sabe aquele usuário que não paga uma paçoca pra você? cobre ele na base da violência"
                    },
                    {
                        name: "hug",
                        description: "de um abraço em alguém! 🫂"
                    },
                    {
                        name: "dance",
                        description: "dance com alguém!\ncoloca a JBL no volume máximo!!!!"
                    },
                    {
                        name: "kiss",
                        description: "de um beijinho em alguém 🥰"
                    },
                    {
                        name: "slap",
                        description: "de um TAPA NA GOSTO... digo, em um usuário"
                    }
                ]
            },
            en: {
                name: "actions",
                description: "roleplay commands!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "attack",
                        description: "you know that user who doesn't pay you a cookie? cover him in the base of violence"
                    },
                    {
                        name: "hug",
                        description: "give someone a hug! 🫂"
                    },
                    {
                        name: "dance",
                        description: "dance with someone!"
                    },
                    {
                        name: "kiss",
                        description: "give someone a kiss 🥰"
                    },
                    {
                        name: "slap",
                        description: "of a slap on a user!"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 