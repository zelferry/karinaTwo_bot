const comando = require("../../../structures/commands/command.js");
const { economydb } = require("../../../data/ini.js").user 

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "panther_coins",
        description: "(economy) Everything that involves the information of panther-coins",
        description_localizations: {
            "pt-BR": "(economia) tudo que envolve as informações dos panther-coins"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "view",
                description: "(economy) see how many Panther-coins you have in my savings system!",
                name_localizations: {
                    "pt-BR": "ver"
                },
                description_localizations: {
                    "pt-BR": "(economia) veja quantos panther-coins você tem!"
                },
                options: [
                    {
                        type: 6,
                        name: "user",
                        description: "user (@user/id) for you to see how much this user has",
                        description_localizations: {
                            "pt-BR": "usuário (@usuário/id) para você ver quanto esse usuário tem"
                        }
                    }
                ]
            },
            {
                type: 1,
                name: "top",
                description: "(economy) see the global ranking of panther-coins!",
                description_localizations: {
                    "pt-BR": "(economia) ver o ranking global de panther-coins!"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "panther_coins",
            category: "economy"
        })
    }

    async interactionRun(interaction, t){
        let subCOMMAND = interaction.options.getSubcommand();
        
        if(subCOMMAND === "view"){
            let user = interaction.options.getUser('user') || interaction.user;

            let value = await economydb.fech(user);

            if(user.id == interaction.user.id){
                await interaction.deferReply({ ephemeral: false }).catch(() => { });
                return interaction.editReply({
                    content: `🪙**|** <@${interaction.user.id}>, ` + t("commands:panther_coins.view.me", { coins: (value.coins).toString() })
                });
            } else {
                await interaction.deferReply({ ephemeral: false }).catch(() => { });
                return interaction.editReply({
                    content: `🪙**|** <@${interaction.user.id}>, ` + t("commands:panther_coins.view.user", { userTag: user.username, coins: (value.coins).toString() })
                });
            }
        } else if (subCOMMAND === "top") {
            await interaction.deferReply({ ephemeral: false }).catch(() => { });
            let res = await economydb.top_();
            let position = parseInt((res.all).map(m => m.UserId).indexOf(interaction.user.id)) + 1;

            let i = 0;
            const embed = new Discord.EmbedBuilder()
                .setColor("#7A67EE")
                .setDescription(`🪙**|** ${t("commands:panther_coins.rank.you")} ${`${position}º` || 'Sad™'} ${t("commands:panther_coins.rank.position")}`)
                .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ extension: 'jpg' }) })
                .setTimestamp()

            for (i = 0; i < 10; i++) {
                let member =  await this.client.users.fetch(res.partial[i].UserId);

                if (member) {
                    embed.addFields({ name: `**${i + 1}**. @${member.username}`, value: `**panther-coins**: ${res.partial[i].coins}`, inline: true });
                } else {
                    embed.addFields({ name: `**${i + 1}**. @-/-`, value: `**panther-coins**: ${res.partial[i].coins}`, inline: true });
                }
            }

            interaction.editReply({ embeds: [embed] });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "panther_coins",
                description: "tudo que envolve as informações dos panther-coins",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                usage: "<sub comando>",
                subCommands: []
            },
            en: {
                name: "panther_coins",
                description: "Everything that involves the information of panther-coins",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "<sub command>",
                subCommands: []
            }
        }
    }
}

module.exports = Command