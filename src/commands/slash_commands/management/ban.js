const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "ban",
        description: "(administration) ban members who are breaking the rules!",
        descriptionLocalizations: {
            "pt-BR": "(administração) banir membros que estão quebrando as regras!"
        },
        dmPermission: false,
        nsfw: false,
        //defaultMemberPermissions: Discord.PermissionFlagsBits.BanMembers,
        options: [
            {
                type: 6,
                required: true,
                name: "user",
                description: "user (@user/id) to be punished",
                nameLocalizations: {
                    "pt-BR": "usuário"
                },
                descriptionLocalizations: {
                    "pt-BR": "usuário (@usuário/id) a ser punido"
                }
            },
            {
                type: 3,
                required: false,
                name: "reason",
                description: "reason for punishment",
                nameLocalizations: {
                    "pt-BR": "razão"
                },
                descriptionLocalizations: {
                    "pt-BR": "motivo da punição"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "ban",
            category: "management",
            permissions: {
                user: ["BanMembers"],
                bot: ["BanMembers"]
            },
            deferReply: true
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.guild.members.cache.get(interaction.options.getUser('user').id)
        let reason = interaction.options.getString('reason') ?? "punição não especificada";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: t("commands:ban.error.is_me")
            });
            
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: t("commands:ban.error.is_bot")
            });
            
            return {}
        } else if(user.id === interaction.guild.ownerId){
            interaction.followUp({
                content: t("commands:ban.error.is_owner"),
            });
            
            return {}
        } else if(user.roles.highest.position >= interaction.member.roles.highest.position){
            interaction.followUp({
                content: t("commands:ban.error.is_role1")
            });

            return {}
        } else if(user.roles.highest.position >= this.client.guilds.cache.get(interaction.guild.id).members.cache.get(this.client.user.id).roles.highest.position){
            interaction.followUp({
                content: t("commands:ban.error.is_role2")
            });

            return {}
        } else {
            interaction.editReply({
                content: t("commands:ban.success", { userTag: interaction.options.getUser('user').username, reason_: reason })
            });
            
            user.ban({ deleteMessageSeconds: 604800, reason });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "ban",
                description: "banir aquele membro chato que esta quebrando as regras!",
                permissions: {
                    bot: ["BAN_MEMBERS"],
                    user: ["BAN_MEMBERS"]
                },
                category: "administração",
                usage: "<usuário> [motivo]",
                subCommands: []
            },
            en: {
                name: "ban",
                description: "ban that annoying member who is breaking the rules!",
                permissions: {
                    bot: ["BAN_MEMBERS"],
                    user: ["BAN_MEMBERS"]
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
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `banir membros`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `banir membros`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `ban members`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `ban members`"
            }
        }
    }
} 

module.exports = Command