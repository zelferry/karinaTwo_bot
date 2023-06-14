const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "server",
        description: "(discord) servers stuff for you!",
        description_localizations: {
            "pt-BR": "(discord) coisas de servidores para você!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "info",
                description: "(discord) see server information",
                description_localizations: {
                    "pt-BR": "(discord) veja as informações do servidor"
                }
            },
            {
                type: 1,
                name: "icon",
                description: "(discord) see the server icon",
                description_localizations: {
                    "pt-BR": "(discord) veja o ícone do servidor"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "server",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            let fields = [
                {
                    name: t("commands:server.info.id"),
                    value: (interaction.guild.id).toString()
                },
                {
                    name: t("commands:server.info.name"),
                    value: interaction.guild.name
                },
                {
                    name: t("commands:server.info.owner"),
                    value: `<@${interaction.guild.ownerId}>`
                },
                {
                    name: t("commands:server.info.members"),
                    value: (interaction.guild.memberCount).toString()
                },
                {
                    name: t("commands:server.info.date_create"),
                    value: `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`
                },
                {
                    name: t("commands:server.info.date_join"),
                    value: `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`
                }
            ]
            
            let embed = new Discord.EmbedBuilder().setColor("#fd9058").setTitle(t("commands:server.info.title")).setThumbnail(interaction.guild.iconURL()).addFields(...fields);
            
            await interaction.editReply({
                embeds: [embed]
            });
            
            return {}
        } else if(subCOMMAND === "icon"){
            let avatar = interaction.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });

            let button_ = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(`${avatar}`).setLabel(t("commands:global.button.web"));
            let row = new Discord.ActionRowBuilder().addComponents(button_);
            let embed = new Discord.EmbedBuilder().setColor(`#fd9058`).setTitle(t("commands:server.icon")).setImage(avatar);

            await interaction.editReply({
                embeds: [embed],
                components: [row]
            });

            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "server",
                description: "comandos sobre servidor",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "info",
                        description: "retornar informações sobre seu servidor"
                    },
                    {
                        name: "icon",
                        description: "retorna o ícone do servidor"
                    }
                ]
            },
            en: {
                name: "server",
                description: "server commands",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "info",
                        description: "return information about your server"
                    },
                    {
                        name: "icon",
                        description: "return server icon"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 