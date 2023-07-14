const e6_autopost = require("../../../data/models/e6_autopost.js");
const comando = require("../../../structures/commands/command.js");
const { e621_autopost } = require("../../../data/ini.js").guild; 

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "e621_autopost",
        description: "(administration + nsfw) send E621 posts automatically in a text channel!",
        description_localizations: {
            "pt-BR": "(administração + nsfw) envie postagens da e621 automaticamente em um canal de texto!"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 1,
                name: "create",
                description: "(administration + nsfw) create a webhook to send E621 posts automatically in a text channel!",
                name_localizations: {
                    "pt-BR": "criar"
                },
                description_localizations: {
                    "pt-BR": "(administração + nsfw) crie um webhook para enviar posts E621 automaticamente em um canal de texto!"
                },
                options: [
                    {
                        type: 7,
                        required: true,
                        channelTypes: ["GUILD_TEXT"],
                        name: "channel",
                        description: "channel where I will send the images",
                        description_localizations: {
                            "pt-BR": "canal aonde irei enviar as imagens"
                        }
                    },
                    {
                        type: 3,
                        required: true,
                        name: "tags",
                        description: "single tag or space-separated tags",
                        description_localizations: {
                            "pt-BR": "tag única ou tags separadas por espaço"
                        }
                    },
                    {
                        type: 5,
                        required: false,
                        name: "auto_ignore_webm_swf",
                        description: "when enabled (in \"true\") I will ignore posts with videos and swf",
                        description_localizations: {
                            "pt-BR": "quando habilitado (em \"true\") irei ignorar postagens com videos e swf"
                        }
                    },
                    {
                        type: 3,
                        required: false,
                        name: "rating",
                        description: "filter posts by their censorship level (by default is random)",
                        description_localizations: {
                            "pt-BR": "filtrar postagens por seu nível de censura (por padrão é aleatório)"
                        },
                        choices: [
                            {
                                name: "safe (sfw)",
                                name_localizations: {
                                    "pt-BR": "seguro (sfw)"
                                },
                                value: "rating:safe"
                            },
                            {
                                name: "questionable (not so sfw)",
                                name_localizations: {
                                    "pt-BR": "questionável (não tão sfw)"
                                },
                                value: "rating:questionable"
                            },
                            {
                                name: "explicit (nsfw)",
                                name_localizations: {
                                    "pt-BR": "explícito (nsfw)"
                                },
                                value: "rating:explicit"
                            }
                        ]
                    }
                ]
            },
            {
                type: 1,
                name: "delete",
                description: "(administration + nsfw) delete webhook from e621",
                name_localizations: {
                    "pt-BR": "deletar"
                },
                description_localizations: {
                    "pt-BR": "(administração + nsfw) deletar webhook da e621"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "e621_autopost",
            category: "management",
            permissions: {
                user: ["ManageMessages", "Administrator"],
                bot: ["ManageMessages", "ManageChannels", "Administrator"]
            },
            nsfw: true,
            deferReply: false
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if (subCOMMAND == "create") {
            if(await e621_autopost.validate(interaction.guild)){
                interaction.editReply({
                    content: t("commands:e621_autopost.create.error_guild"),
                    ephemeral: true
                });

                return {}
            } else {
                let tags = interaction.options.getString('tags').trim().split(/ +/g);
                let channel = interaction.options.getChannel('channel');
                if (tags && !Array.isArray(tags)) tags = tags.split(' ');

                if (interaction.options.getString('rating')) tags.push(interaction.options.getString('rating'));
                if (interaction.options.getBoolean('auto_ignore_webm_swf')) {
                    tags.push("-webm");
                    tags.push("-flash");
                }

                let url = await this.client.private_api.POST(`api/e621/posts`, { tags });
                if (url.ok === false) {
                    interaction.editReply({
                        content: t("commands:e621_autopost.error"),
                        ephemeral: true
                    });

                    return {}
                } else {
                    let posts = url.data.posts;

                    if (!posts.length) {
                        interaction.editReply({
                            content: t("commands:e621_autopost.create.no_post", { tags: (tags.join(" ")).toString() })
                        });

                        return {}
                    } else if (!channel.nsfw) {
                        interaction.editReply({
                            content: t("commands:e621_autopost.create.no_nsfw")
                        });

                        return {}
                    } else {
                        await channel.fetchWebhooks().then(async (webhook) => {
                            let hook = webhook.find(h => h.name === "e621-client");

                            if (!hook) {
                                await interaction.guild.channels.createWebhook({
                                    channel: channel.id,
                                    name: "e621-client",
                                    avatar: "https://e621.net/main-logo.png"
                                }).then(async (webhook_data) => {
                                    await e621_autopost.new_data({
                                        guild: interaction.guild,
                                        webhook: webhook_data,
                                        e6_tags: tags
                                    });
                                });
                            } else {
                                await e621_autopost.new_data({
                                    guild: interaction.guild,
                                    webhook: webhook.first(),
                                    e6_tags: tags
                                });
                            }
                        });

                        interaction.editReply({
                            content: t("commands:e621_autopost.create.success")
                        });
                    }
                }

                return {}
            }
        } else if(subCOMMAND == "delete"){
            if(!await e621_autopost.validate(interaction.guild)){
                interaction.editReply({
                    content: t("commands:e621_autopost.delete.error")
                });

                return {}
            } else {
                await e621_autopost.delete(interaction.guild);

                interaction.editReply({
                    content: t("commands:e621_autopost.delete.success")
                });
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "e621_autopost",
                description: "envie postagens da e621 automaticamente em um canal de texto!",
                permissions: {
                    bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES", "ADMINISTRATOR"]
                },
                category: "administração",
                usage: "<sub comando>",
                subCommands: []
            },
            en: {
                name: "e621_autopost",
                description: "send E621 posts automatically in a text channel!",
                permissions: {
                    bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES", "ADMINISTRATOR"]
                },
                category: "management",
                usage: "<sub command>",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `gerenciar mensagens`, `gerenciar canais` e `administrador`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar mensagens` e `gerenciar canais`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `MANAGE MESSAGES`, `MANAGE CHANNELS` and `ADMINISTRATOR`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `MANAGE MESSAGES` and `MANAGE CHANNELS`"
            }
        }
    }
}

module.exports = Command