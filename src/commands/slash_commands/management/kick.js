const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "kick",
        description: "(administration) kick out annoying members who keep breaking the rules",
        name_localizations: {
            "pt-BR": "expulsar"
        },
        description_localizations: {
            "pt-BR": "(administração) expulsar membros irritantes que continuam quebrando as regras!"
        },
        dmPermission: false,
        nsfw: false,
        //defaultMemberPermissions: Discord.PermissionFlagsBits.KickMembers,
        options: [
            {
                type: 6,
                required: true,
                name: "user",
                description: "user (@user/id) to be punished",
                name_localizations: {
                    "pt-BR": "usuário"
                },
                description_localizations: {
                    "pt-BR": "usuário (@usuário/id) a ser punido"
                }
            },
            {
                type: 3,
                required: false,
                name: "reason",
                description: "reason for punishment",
                name_localizations: {
                    "pt-BR": "razão"
                },
                description_localizations: {
                    "pt-BR": "motivo da punição"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "kick",
            category: "management",
            permissions: {
                user: ["KickMembers"],
                bot: ["KickMembers"]
            },
            deferReply: true
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.guild.members.cache.get(interaction.options.getUser('user').id)
        //onsole.log(user.kickable)
        let reason = interaction.options.getString('reason') || "?¿";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: t("commands:kick.error.is_me")
            });
            
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: t("commands:kick.error.is_bot")
            });
            
            return {}
        } else if(user.id === interaction.guild.ownerId){
            interaction.followUp({
                content: t("commands:kick.error.is_owner"),
            });
            
            return {}
        } else if(user.roles.highest.position >= interaction.member.roles.highest.position){
            interaction.followUp({
                content: t("commands:kick.error.is_role1")
            });

            return {}
        } else if(user.roles.highest.position >= this.client.guilds.cache.get(interaction.guild.id).members.cache.get(this.client.user.id).roles.highest.position){
            interaction.followUp({
                content: t("commands:kick.error.is_role2")
            });

            return {}
        } else {
            interaction.editReply({
                content: t("commands:kick.success", { userTag: interaction.options.getUser('user').username, reason_: reason })
            });
            
            user.kick(reason)
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "kick",
                description: "expulsar membros chatos que vivem quebrando as regras",
                permissions: {
                    bot: ["KICK_MEMBERS"],
                    user: ["KICK_MEMBERS"]
                },
                category: "administração",
                usage: "<usuário> [motivo]",
                subCommands: []
            },
            en: {
                name: "??",
                description: "kick out annoying members who keep breaking the rules",
                permissions: {
                    bot: ["KICK_MEMBERS"],
                    user: ["KICK_MEMBERS"]
                },
                category: "management",
                usage: "<user> [reason]",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `expulsar membros`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `expulsar membros`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `kick members`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `kick members`"
            }
        }
    }
} 
module.exports = Command 