const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 
const user_data = {
    type: 6,
    required: true,
    name: "user",
    description: "user (@user/id)",
    nameLocalizations: {
        "pt-BR": "usuário"
    },
    descriptionLocalizations: {
        "pt-BR": "usuário (@usuário/id)"
    }
}

class Command extends comando {
    command_data = {
        name: "actions",
        description: "(social) do some kind of action with some user!",
        nameLocalizations: {
            "pt-BR": "ações"
        },
        descriptionLocalizations: {
            "pt-BR": "(social) fazer algum tipo de ação com algum usuário!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "attack",
                description: "(social) attack a user!",
                nameLocalizations: {
                    "pt-BR": "atacar"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) um usuário esqueceu de pagar os panther-coins da paçoca? tire um x1 com ele!"
                },
                options: [user_data]
            },
            {
                type: 1,
                name: "hug",
                description: "(social) give someone a hug!",
                nameLocalizations: {
                    "pt-BR": "abraço"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) dê um abraço em alguém!"
                },
                options: [user_data]
            },
            {
                type: 1,
                name: "dance",
                description: "(social) dance with some user!",
                nameLocalizations: {
                    "pt-BR": "dança"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) dance com algum usuário!"
                },
                options: [user_data]
            },
            {
                type: 1,
                name: "kiss",
                description: "(social) kiss some user :)",
                nameLocalizations: {
                    "pt-BR": "beijo"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) beijar algum usuário :)"
                },
                options: [user_data]
            },
            {
                type: 1,
                name: "slap",
                description: "(social) of a slap on a user!",
                nameLocalizations: {
                    "pt-BR": "tapa"
                },
                descriptionLocalizations: {
                    "pt-BR": "(social) de um tapa em um usuário!"
                },
                options: [user_data]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "actions",
            category: "social"
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
                    user1: interaction.user.username,
                    user2: user.username
                }),
                url: this.client.private_api.roleplay.sfw[interaction.options.getSubcommand()]()
            });

            interaction.editReply({
                embeds: [Discord.EmbedBuilder.from(embed).setColor("#836FFF")]
            });

            return {}
        }
    }

    embed_maker_(data){
        return {
            title: data.title,
            description: data.description,
            image: {
                url: data.url
            }
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