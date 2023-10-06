const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 
const user_data = {
    type: 6,
    name: "user",
    description: "user (@user/id)",
    name_localizations: {
        "pt-BR": "usuário"
    },
    description_localizations: {
        "pt-BR": "usuário (@usuário/id)"
    },
    required: true
}

class Command extends comando {
    command_data = {
        name: "actions_nsfw",
        description: "(social + nsfw + ⭐vip) do some kind of action with some user! (nsfw version)",
        description_localizations: {
            "pt-BR": "(social + nsfw + ⭐vip) fazer algum tipo de ação com algum usuário! (versão nsfw)"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 1,
                name: "assfuck",
                description: "(social + nsfw + ⭐vip) well... we already know where this is going...",
                description_localizations: {
                    "pt-BR": "(social + nsfw + ⭐vip) bem... já sabemos aonde isso vai dar..."
                },
                options: [
                    user_data,
                    {
                        type: 5,
                        required: false,
                        name: "use_furr_images",
                        description: "when enabled (in \"true\") I will use images of furries(random images via e621.net)",
                        description_localizations: {
                            "pt-BR": "quando habilitado (em \"true\") irei usar imagens de furries(imagens aleatórias via e621.net)"
                        }
                    }
                ]
            },
            {
                type: 1,
                name: "cum",
                description: "(social + nsfw + ⭐vip) well, milk is very good for health, isn't it?",
                description_localizations: {
                    "pt-BR": "(social + nsfw + ⭐vip) bom, leite faz muito bem pra saúde, né?"
                },
                options: [user_data]
            },
            {
                type: 1,
                name: "blowjob",
                description: "(social + nsfw + ⭐vip) \"be careful licking your friend's popsicle, if you know what I mean hehe\"",
                description_localizations: {
                    "pt-BR": "(social + nsfw + ⭐vip) \"cuidado ao lamber o picolé do seu amigo, se é que você me entende hehe\""
                },
                options: [user_data]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "actions_nsfw",
            category: "nsfw",
            nsfw: true,
            vip: true
        })
    }

    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let user = interaction.options.getUser("user");
        let fur_images = interaction.options.getBoolean("use_furr_images") || false;

        if (user.id === interaction.user.id) {
            interaction.followUp({
                content: t(`commands:actions_nsfw.${interaction.options.getSubcommand()}.error`),
                ephemeral: true
            });
            return {}
        } else {
            let image_url = await this.client.private_api.roleplay.nsfw[interaction.options.getSubcommand()](fur_images);
            let embed = this.embed_maker_({
                title: t(`commands:actions_nsfw.${interaction.options.getSubcommand()}.success.title`),
                description: t(`commands:actions_nsfw.${interaction.options.getSubcommand()}.success.description`, {
                    user1: interaction.user.username,
                    user2: user.username
                }),
                url: image_url
            });

            interaction.editReply({
                embeds: [Discord.EmbedBuilder.from(embed).setColor("#836FFF")]
            });

            return {}
        }
    }

    embed_maker_(data){
        return {
            title: data.title == "none" ? null : data.title,
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
                name: "actions_nsfw",
                description: "comandos de roleplay! (versão nsfw)",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social + nsfw",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "assfuck",
                        description: "bom... ja sabemos aonde isso vai..."
                    }
                ]
            },
            en: {
                name: "actions_nsfw",
                description: "roleplay commands! (nsfw version)",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social + nsfw",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "assfuck",
                        description: "well... we already know where this is going..."
                    }
                ]
            }
        }
    }
} 
module.exports = Command 