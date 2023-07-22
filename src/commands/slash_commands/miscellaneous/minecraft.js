const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js");
const fetch = require('node-fetch');


class Command extends comando {
    command_data = {
        name: "mc",
        description: "BLOCKSSSSSS",
        descriptionLocalizations: {
            "pt-BR": "BLOCOSSSSSSS"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "achievement",
                description: "(miscellaneous) create an achievement board!",
                nameLocalizations: {
                    "pt-BR": "conquista"
                },
                descriptionLocalizations: {
                    "pt-BR": "(diversos) crie uma placa de conquista!"
                },
                options: [
                    {
                        type: 3,
                        required: true,
                        name: "description",
                        description: "description of the conquest",
                        name_localizations: {
                            "pt-BR": "descrição"
                        },
                        description_localizations: {
                            "pt-BR": "descrição da conquista"
                        }
                    },
                    {
                        type: 3,
                        required: false,
                        name: "title",
                        description: "title of the conquest",
                        name_localizations: {
                            "pt-BR": "titulo"
                        },
                        description_localizations: {
                            "pt-BR": "título da conquista"
                        }
                    }
                ]
            },
            {
                type: 1,
                name: "server",
                description: "(miscellaneous) view status of a server",
                nameLocalizations: {
                    "pt-BR": "servidor"
                },
                descriptionLocalizations: {
                    "pt-BR": "(diversos) exibir status de um servidor"
                },
                options: [
                    {
                        type: 3,
                        required: true,
                        name: "ip",
                        description: "server IP",
                        description_localizations: {
                            "pt-BR": "IP do servidor"
                        }
                    }/*,
                    {
                        type: 3,
                        required: false,
                        name: "port",
                        description: "server PORT",
                        name_localizations: {
                            "pt-BR": "porta"
                        },
                        description_localizations: {
                            "pt-BR": "PORTA do servidor"
                        }
                    }*/
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "mc",
            category: "miscellaneous"
        })
    }

    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "achievement"){
            let args_description = interaction.options.getString("description");
            let args_title = interaction.options.getString("title") ?? t("commands:mc.achievement.defaut.title");
            let rnd = Math.floor((Math.random() * 39) + 1);

            if(args_description.includes("burn")) rnd = 38;
            if(args_description.includes("cookie")) rnd = 21;
            if(args_description.includes("cake")) rnd = 10;
            if(args_title.includes("burn")) rnd = 38;
            if(args_title.includes("cookie")) rnd = 21;
            if(args_title.includes("cake")) rnd = 10;

            if(args_title.length > 24){
                await interaction.followUp({
                    content: t("commands:mc.achievement.error.title"),
                    ephemeral: true
                });

                return {}
            } else if(args_description.length > 22){
                await interaction.followUp({
                    content: t("commands:mc.achievement.error.description"),
                    ephemeral: true
                });

                return {}
            } else {
                let url = `https://skinmc.net/en/achievement/${rnd}/${encodeURIComponent(args_title)}/${encodeURIComponent(args_description)}`;
                let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } });

                await interaction.editReply({
                    files: [
                        { attachment: res.body }
                    ]
                });

                return {}
            }
        } else if(subCOMMAND === "server"){
            let ip = interaction.options.getString("ip");
            //let port = interaction.options.getString("port") ?? "";
            let url = `https://mcapi.us/server/status?ip=${ip}`;
            let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } });

            if(!res.ok){
                interaction.followUp({
                    content: t("commands:global.error.no_url")
                });

                return {}
            } else {
                let result = await res.json();
                //console.log(result);

                if(result.status !== "success"){
                    interaction.followUp({
                        content: t("commands:mc.server.error.ip")
                    });
    
                    return {}
                } else {
                    await interaction.editReply({
                        embeds: [
                            {
                                color: 0x0099ff,
                                author: {
                                    name: ip
                                },
                                thumbnail: {
                                    url: `https://mcapi.de/api/image/favicon/${ip}`
                                },
                                image: {
                                    url: `https://mcapi.de/api/image/favicon/${ip}`
                                },
                                fields: [
                                    {
                                        name: t("commands:mc.server.success.version"),
                                        value: result.server.name,
                                        inline: true,
                                    },
                                    {
                                        name: "motd",
                                        value: result.motd,
                                        inline: true,
                                    },
                                    {
                                        name: "status",
                                        value: `${result.online ? "online" : "offline"}`,
                                        inline: true,
                                    },
                                    {
                                        name: t("commands:mc.server.success.players"),
                                        value: result.players.now + "/" + result.players.max,
                                        inline: true,
                                    }
                                ]
                            }
                        ]
                    });

                    return {}
                } 
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "mc",
                description: "BLOCKSSSSSSSSSSSSSSS",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "micelanea",
                usage: "<sub comando>",
                subCommands: []
            },
            en: {
                name: "mc",
                description: "BLOCOSSSSSSSSSSSSS",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<sub command>",
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